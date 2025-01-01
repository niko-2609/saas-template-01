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
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAppDispatch } from "@/features/store/hooks"
import { fetchDashboardStats } from "@/features/store/slices/dashboardSlice"
import { protectedAction } from "@/features/itenary-generator/server/rateLimitAction"
import { toast } from "sonner"



export default function ItineraryDisplayPage() {
    const messagesRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const [itinerary, setItinerary] = useState<string>('');
    const [pending, setPending] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [htmlContent, setHtmlContent] = useState('');
    const router = useRouter();
    const [ isSaving, setIsSaving] = useState<boolean | null>(null);
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
    const [isSaved, setIsSaved] = useState(false);
    
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
        setPending(true)

        startTransition(async () => {
            try {
                const validatedValuesFromParams = formSchema.parse(data)
                setValidatedValues(validatedValuesFromParams);
                const { output } = await streamAIResponse(validatedValuesFromParams);
                for await (const delta of readStreamableValue(output)) {
                    setItinerary(itinerary => `${itinerary}${delta}`);
                }
                setPending(false);
            } catch (error) {
                console.error('Error during itinerary generation:', error);
                setError('Failed to generate itinerary. Please try again.');
                setPending(false);
            }
        });
    }


        const saveItineraryToCloud = async () => {
            if (htmlContent !== '' && !isSaved) {
                try {
                    setIsSaving(true);
                    const response = await saveItinerary(userId, validatedValues, htmlContent);
                    console.log("RESPONSE FROM DB SAVE", response);
                    dispatch(fetchDashboardStats(userId));
                    toast.success('Itinerary saved successfully!');
                    setIsSaved(true);
                } catch (error) {
                    console.error("Error saving itinerary:", error);
                    setError("Failed to save itinerary");
                    toast.error("Failed to save itinerary. Please try again.");
                } finally {
                    setIsSaving(false);
                }
            } else if (isSaved) {
                toast.error("Itinerary already saved!");
            } else {
                setError("Nothing to save, please generate an itinerary first.");
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

            setHtmlContent(cleanHtml);
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

    useEffect(() => {
        if (!pending && htmlContent && rateLimit) {
            if (rateLimit.error) {
                toast.error(`Rate Limit Reached: ${rateLimit.error}`);
            } else {
                toast.success(`You have ${rateLimit.remaining} generations remaining today.`);
            }
        }
    }, [pending, htmlContent, rateLimit]);

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
                isLoading={isLoading}
            />
            {error && <p className="text-red-500 mt-10">{error}</p>}
            
            {/* Show content while streaming */}
            <div className="border p-4 rounded-md bg-gray-50 mt-10">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

            {/* Save to cloud button */}
            {!pending && htmlContent && (
                <>
                    <div className="flex justify-evenly mt-8">
                        <Button 
                            onClick={() => void saveItineraryToCloud()} 
                            disabled={isSaving || !htmlContent || isSaved}
                            className="flex items-center space-x-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving Itinerary...
                                </>
                            ) : isSaved ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                                    Saved
                                </>
                            ) : (
                                'Save Itinerary'
                            )}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}