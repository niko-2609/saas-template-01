/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';
import { streamAIResponse } from "@/features/itenary-generator/server/openai";
import { readStreamableValue } from "ai/rsc";
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { formSchema } from '@/features/itenary-generator/schemas';
import TripSummary from '@/features/itenary-generator/_components/tripSummary';
import { saveItinerary } from "@/features/itenary-generator/server/itineraryService";
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useAppDispatch } from "@/features/store/hooks"
import { fetchDashboardStats } from "@/features/store/slices/dashboardSlice"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { protectedAction } from "@/features/itenary-generator/server/rateLimitAction"



const StyledItinerary = ({ content }: { content: string }) => (
    <div className="itinerary-wrapper">
        <div 
            className="prose prose-lg max-w-none
                       prose-h2:text-blue-600 
                       prose-h3:text-gray-700
                       prose-p:text-gray-600
                       prose-strong:text-gray-800"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </div>
);

export default function ItineraryDisplayPage() {
    const messagesRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const [itinerary, setItinerary] = useState<string>('');
    const [pending, setPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [htmlContent, setHtmlContent] = useState('');
    const [extraParagraph, setExtraParagraph] = useState('');
    const router = useRouter();
    const [ isSaving, setIsSaving] = useState<boolean | null>(null);
    const [ isDownloading, setIsDownloading] = useState<boolean | null>(null);
    const [ validatedValues, setValidatedValues] = useState<any>(null);
    const { data: session} = useSession()
    const userId = session?.user?.id
    const dispatch = useAppDispatch();
    const [rateLimit, setRateLimit] = useState<{
        remaining: number;
        total: number;
        error?: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    if (!userId) {
        throw new Error("No user found")
    }

    // Decode the URL-encoded data string and parse it
    let data;

    try {
        data = JSON.parse(
            decodeURIComponent(searchParams.get('data') || '{}')
        );
        // Convert string dates to Date objects
        if (data.travel_dates) {
            data.travel_dates = {
                from: new Date(data.travel_dates.from),
                to: new Date(data.travel_dates.to)
            };
        }
    } catch (e) {
        console.error('Error parsing URL data:', e);
        data = {};
    }

   const { messages, input, handleInputChange, handleSubmit } = useChat({
     onResponse(response: any) {
         if (response) {
             setPending(false)
         }
     },
     onError(error: any) {
         if (error) {
             setPending(false)
         }
     }
 });

    const generateResponse = async () => {
        setHtmlContent('')
        setItinerary('')
        setError(null)

        startTransition(async () => {
            try {
                 (async () => {
                    try {
    
                        const validatedValuesFromParams = formSchema.parse(data)
                        setValidatedValues(validatedValuesFromParams);
                        const { output } = await streamAIResponse(validatedValuesFromParams);
                        for await (const delta of readStreamableValue(output)) {
                            setItinerary(itinerary => `${itinerary}${delta}`);
                        }
                    } catch (error) {
                        console.error('Error during itinerary generation:', error);
                        setError('Failed to generate itinerary. Please try again.');
                    } finally {
                        setPending(false);
                    }
                })()
            } catch (error) {
                console.error('Error during itinerary generation:', error);
                setError('Failed to generate itinerary. Please try again.');
            } finally {
                setPending(false);
            }
        });
        }   


        const saveItineraryToCloud = async () => {
            if (htmlContent !== '') {
                try {
                    setIsSaving(true);
                    const response = await saveItinerary(userId, validatedValues, htmlContent);
                    console.log("RESPONSE FROM DB SAVE", response);
                    dispatch(fetchDashboardStats(userId));
                } catch (error) {
                    console.error("Error saving itinerary:", error);
                    setError("Failed to save itinerary");
                } finally {
                    setIsSaving(false);
                }
            } else {
                setError("Nothing to save, please generate an itinerary first.");
            }
        };

        const downloadItinerary = async () => {
            if (htmlContent !== '') {
                try {
                    setIsDownloading(true);
                    await saveItinerary(userId, validatedValues, htmlContent);
                } catch (error) {
                    console.error("Error downloading itinerary:", error);
                    setError("Failed to download itinerary");
                } finally {
                    setIsDownloading(false);
                }
            } else {
                setError("Nothing to download, please generate an itinerary first.");
            }
        };
      

    useEffect(() => {
        const htmlEndIndex = itinerary.indexOf('</html>');
        
        if (htmlEndIndex !== -1) {
            // Remove markdown code block markers and get clean HTML
            const cleanHtml = itinerary
                .replace(/^```html\n?/, '') // Remove opening ```html
                .replace(/```$/, '')        // Remove closing ```
                .slice(0, htmlEndIndex + 7);
                
            const extraText = itinerary.slice(htmlEndIndex + 7).trim();
            
            setHtmlContent(cleanHtml);
            setExtraParagraph(extraText);
        } else {
            // If no </html> found, still clean the markdown markers
            setHtmlContent(
                itinerary
                    .replace(/^```html\n?/, '')
                    .replace(/```$/, '')
            );
        }

        return () => {
            setHtmlContent('')
        }
    }, [itinerary]);

      useEffect(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, [messages]);


    const handleGenerateItinerary = async () => {
        if (!userId) return;

        try {
            setIsLoading(true);
            const rateLimitCheck = await protectedAction(userId);
            
            if (!rateLimitCheck.success) {
                setRateLimit({
                    remaining: rateLimitCheck.remaining,
                    total: rateLimitCheck?.total,
                    error: rateLimitCheck.error
                });
                return;
            }

            setRateLimit({
                remaining: rateLimitCheck.remaining,
                total: rateLimitCheck.total
            });

            // Call your existing generate response function
            await generateResponse();

        } catch (error) {
            setError("Failed to generate itinerary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <TripSummary 
                tripDetails={data}
                onGenerateItinerary={handleGenerateItinerary}
                onEditDetails={() => router.back()}
            />
            {error && <p className="text-red-500 mt-10">{error}</p>}
             {/* Itinerary Content Section */}
         {!pending && !error && (
            <div className="border p-4 rounded-md bg-gray-50 mt-10">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        )}
        <style jsx global>{`
            /* Custom CSS for generated content */
            .itinerary-container h2 {
                color: #2563eb;
                margin-bottom: 1.5rem;
            }
            .day-container {
                border-left: 4px solid #e5e7eb;
                padding-left: 1rem;
                margin-bottom: 2rem;
            }
            .activity-time {
                color: #4b5563;
                font-weight: 600;
            }
        `}</style>

       {htmlContent !== '' && (
         <div className="flex justify-evenly mt-8">
         <Button 
            onClick={() => void saveItineraryToCloud()} 
            disabled={isSaving || !htmlContent}
         >
            {isSaving ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Itinerary...
                </>
            ) : (
                'Save Itinerary'
            )}
         </Button>
         <Button onClick={downloadItinerary} disabled={!!isDownloading}>
           {isDownloading ? (
             <>
               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
               Downloading Itinerary...
             </>
           ) : (
             'Download as pdf'
           )}
         </Button>
         </div>
       )}

            {rateLimit?.error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Rate Limit Reached</AlertTitle>
                    <AlertDescription>{rateLimit.error}</AlertDescription>
                </Alert>
            )}

            {rateLimit && !rateLimit.error && (
                <Alert className="mb-4">
                    <AlertTitle>Usage</AlertTitle>
                    <AlertDescription>
                        You have {rateLimit.remaining} out of {rateLimit.total} generations remaining today.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}