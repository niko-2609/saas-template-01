/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import * as z from 'zod'
import { PromptSchema } from '@/features/itenary-generator/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { useChat } from 'ai/react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input';
import { addDays, format } from "date-fns"
import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useState, useRef, useTransition } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { CalendarIcon } from 'lucide-react';
import { googlePlacesAutoComplete } from '@/features/itenary-generator/server/googlePlaces';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import { readStreamableValue } from 'ai/rsc';

import { formatSuggestions } from '@/features/itenary-generator/utils/string';
import { streamAIResponse } from '@/features/itenary-generator/server/openai';
import { ImSpinner } from 'react-icons/im';



const libraries: Libraries = ["places"];



export default function GeneratorForm() {
    const messagesRef = useRef<HTMLDivElement>(null);
    const [sourceCity, setSourceCity] = useState("");
    const [destCity, setDestCity] = useState("");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
    const [error, setError] = useState<any>();
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [pending, startTransition] = useTransition();
    const [position, setPosition] = React.useState("");
    const [searchSourceCitystring, setSearchSourceCityString] = useState("")
    const [searchDestCitystring, setSearchDestCityString] = useState("")
    const [sourceCityPredictions, setSourceCityPredictions] = useState<PlaceAutocompleteResult[] | null>([])
    const [destCityPredictions, setDestCityPredictions] = useState<PlaceAutocompleteResult[] | null>([])
    const [generation, setGeneration] = useState<string>('');



    const { messages, input, handleInputChange, handleSubmit } = useChat({
        onResponse(response) {
            if (response) {
                setIsGenerating(false)
            }
        },
        onError(error) {
            if (error) {
                setIsGenerating(false)
            }
        }
    });

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 11, 20),
        to: addDays(new Date(2024, 0, 20), 20),
    });
    const onSubmit = async (values: z.infer<typeof PromptSchema>) => {
        setHtmlContent("")
        if (position !== null && position !== "") {
            values.travel_type = position
        }
        values.source_city = sourceCity
        values.destination_city = destCity
        console.log(JSON.stringify(values));



        //CALL OPENAI API HERE
        startTransition(() => {
            try {
                // streamAIResponse(values).then((response: any) => {
                //     setComponent(response)
                // });
                (async () => {
                    const { output } = await streamAIResponse(values);
                    for await (const delta of readStreamableValue(output)) {
                        setGeneration(currentGeneration => `${currentGeneration}${delta}`);
                    }
                })()
            } catch (error: any) {
                console.error(error);
                setError(error)
            }
        })
    };
    const [htmlContent, setHtmlContent] = useState('');
    const [extraParagraph, setExtraParagraph] = useState('');

    useEffect(() => {
        // Step 1: Split the content by </html> to separate the valid HTML and extra text
        const htmlEndIndex = generation.indexOf('</html>');

        if (htmlEndIndex !== -1) {
            const htmlPart = generation.slice(0, htmlEndIndex + 7).replace(/```html|```/g, '')// Get the HTML document
            const extraText = generation.slice(htmlEndIndex + 7).trim(); // Capture the text after </html>

            // const finalhtml = htmlPart.replace(/```html|```/g, '')

            setHtmlContent(htmlPart);
            setExtraParagraph(extraText); // Store extra paragraph
        } else {
            setHtmlContent(generation); // If no </html> is found, treat the entire content as HTML
        }
    }, [generation]);

    useEffect(() => {
        const fetchPredictions = async () => {
            const predictions = await googlePlacesAutoComplete(searchSourceCitystring);
            setSourceCityPredictions(predictions || []);
        }
        fetchPredictions()
    }, [searchSourceCitystring])


    useEffect(() => {
        const fetchPredictions = async () => {
            const predictions = await googlePlacesAutoComplete(searchDestCitystring);
            setDestCityPredictions(predictions || []);
        }
        fetchPredictions()
    }, [searchDestCitystring])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const [travel_type, setSelectedTravelType] = React.useState("")

    const form = useForm<z.infer<typeof PromptSchema>>({
        resolver: zodResolver(PromptSchema),
        defaultValues: {
            travel_dates: date,
            source_city: "",
            destination_city: "",
            travel_type: travel_type,
            ecological: false,
            mass_tourism: false,
            diving: false,
            surfing: false,
            hiking: false,
            climbing: false,
            sightseeing: false,
            stops_inbetween: "0"
        }
    })

    const handleSuggestionSelect = (value: any) => {
        console.log("SUGGESTION SELECTED", value)
    }

    return (
        <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Source and Destination Section */}
                    <div className="flex gap-2 justify-between w-full border-red-400 border-2">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="source_city"
                                render={({ field }) => (
                                    <div className="relative">
                                        <FormItem>
                                            <FormLabel className='font-semibold text-lg text-slate-500'>From</FormLabel>
                                            <FormControl>
                                                <Input
                                                    value={sourceCity || searchSourceCitystring}
                                                    onChange={(e) => setSearchSourceCityString(e.target.value)}
                                                    placeholder="Starting from..."
                                                    onSelect={handleSuggestionSelect}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        {sourceCityPredictions !== null && sourceCityPredictions?.length > 0 && (
                                            <div className='absolute mt-2 w-full bg-white shadow-lg rounded-md z-10'>
                                                {sourceCityPredictions?.map((item) => {
                                                    const suggestion = formatSuggestions(item.description)
                                                    return (
                                                        <p key={item.place_id} className='p-2 hover:bg-slate-50 cursor-pointer' onClick={() => {
                                                            setSourceCityPredictions(null)
                                                            setSourceCity(suggestion)
                                                        }}>{suggestion}</p>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="destination_city"
                                render={({ field }) => (
                                    <div className="relative">
                                        <FormItem>
                                            <FormLabel className='font-semibold text-lg text-slate-500'>To</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={destCity || searchDestCitystring}
                                                    onChange={(e) => setSearchDestCityString(e.target.value)}
                                                    placeholder="Travelling to..."
                                                    onSelect={handleSuggestionSelect}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        {destCityPredictions !== null && destCityPredictions?.length > 0 && (
                                            <div className='absolute mt-2 w-full bg-white shadow-lg rounded-md z-10'>
                                                {destCityPredictions?.map((item) => {
                                                    const suggestion = formatSuggestions(item.description)
                                                    return (
                                                        <p key={item.place_id} className='p-2 hover:bg-slate-50 cursor-pointer' onClick={() => {
                                                            setDestCityPredictions(null)
                                                            setDestCity(suggestion)
                                                        }}>{suggestion}</p>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    {/* Date Selection */}
                    <FormField
                        control={form.control}
                        name="travel_dates"
                        render={({ field }) => (
                            <FormItem className='space-y-2'>
                                <FormLabel className='text-lg font-semibold text-slate-700'>Travel Dates</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className='w-full p-3 border-2 border-slate-200 hover:border-blue-400 transition-colors'
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "LLL dd, y")
                                                    )
                                                ) : (
                                                    <span>Pick your travel dates</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                                className="rounded-lg border border-slate-200"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Travel Type and Preferences */}
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-slate-700 mb-4">Travel Preferences</h3>
                            <div className="flex flex-wrap gap-6">
                                <FormField
                                    control={form.control}
                                    name="hiking"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-blue-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium text-slate-600">Hiking</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="climbing"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-blue-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium text-slate-600">Climbing</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="diving"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-blue-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium text-slate-600">Diving</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="surfing"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-blue-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium text-slate-600">Surfing</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="sightseeing"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-blue-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="font-medium text-slate-600">Sightseeing</FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        className="w-full"
                        disabled={pending}
                    >
                        {pending ? (
                            <div className="flex items-center justify-center gap-2">
                                <ImSpinner className="animate-spin h-4 w-4" />
                                Generating...
                            </div>
                        ) : (
                            'Generate Itinerary'
                        )}
                    </Button>
                </form>
            </Form>

            {/* Results Section */}
            {htmlContent && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            )}
        </div>
    )
}