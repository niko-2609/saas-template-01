/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useEffect, useRef, useState } from 'react';
import { streamAIResponse } from "@/features/itenary-generator/server/openai";
import { readStreamableValue } from "ai/rsc";
import parse from 'html-react-parser';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { formSchema } from '@/features/itenary-generator/schemas';
import TripSummary from '@/features/itenary-generator/_components/tripSummary';



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
   // const [pending, setGeneratingResponse] = useState<boolean>(false);
    const router = useRouter();
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
      
        // Start the generation immediately when component mounts
    startTransition(async () => {
        try {
             (async () => {
                try {

                    const validatedValues = formSchema.parse(data)
                    const { output } = await streamAIResponse(validatedValues);
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


    return (
        <div className="p-6">
            <TripSummary 
                tripDetails={data}
                onGenerateItinerary={generateResponse}
                onEditDetails={() => router.back()}
            />
            {error && <p className="text-red-500 mt-10">{error}</p>}
             {/* Itinerary Content Section */}
         {!pending && !error && (
            <div className="border p-4 rounded-md bg-gray-50">
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
        </div>
    );
}