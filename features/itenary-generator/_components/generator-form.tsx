/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { googlePlacesAutoComplete } from '@/features/itenary-generator/server/googlePlaces';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';
import React , { useEffect, useState,  useRef, useTransition  } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useChat } from 'ai/react';
import { streamAIResponse } from "../server/openai";
import { readStreamableValue } from "ai/rsc";

const formSchema = z.object({
    source_city: z.string().optional(),
    destination_city: z.string().optional(),
    travel_dates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    travel_type: z.string().optional(),
    stops_inbetween: z.string().optional(),
    mass_tourism: z.boolean().optional(),
    ecological: z.boolean().optional(),
    hiking: z.boolean().optional(),
    diving: z.boolean().optional(),
    climbing: z.boolean().optional(),
    sightseeing: z.boolean().optional(),
});

function formatSuggestions(str: string) {
    return str.split(',')[0];
}


const libraries: Libraries = ["places"];
export default function GeneratorForm() {
    const [sourceCityPredictions, setSourceCityPredictions] = useState<any>(null);
    const [destCityPredictions, setDestCityPredictions] = useState<any>(null);
    const [sourceCity, setSourceCity] = useState<string>("");
    const [destCity, setDestCity] = useState<string>("");
    const [searchSourceCitystring, setSearchSourceCityString] = useState<string>("");
    const [searchDestCitystring, setSearchDestCityString] = useState<string>("");
    const [date, setDate] = useState<{ from: Date | null; to: Date | null } | null>(
        null
    );
    const [position, setPosition] = useState<string>("");
    const [pending, setPending] = useState(false);

    // const form = useForm({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         source_city: "",
    //         destination_city: "",
    //         travel_dates: null,
    //         travel_type: "",
    //         stops_inbetween: 0,
    //         mass_tourism: false,
    //         ecological: false,
    //         hiking: false,
    //         diving: false,
    //         climbing: false,
    //         sightseeing: false,
    //     },
    // });


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            source_city: "",
            destination_city: "",
            travel_dates: { from: undefined, to: undefined }, // Changed from null to match schema
            travel_type: "",
            stops_inbetween: 0,
            mass_tourism: false,
            ecological: false,
            hiking: false,
            diving: false,
            climbing: false,
            sightseeing: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log(values);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setPending(false);
        }
    };

    const handleSourceCityChange = async (e: any) => {
        setSearchSourceCityString(e.target.value);
        if (e.target.value.length > 2) {
            const predictions = await googlePlacesAutoComplete(searchSourceCitystring);
            setSourceCityPredictions(predictions);
        } else {
            setSourceCityPredictions(null);
        }
    };

    const handleDestCityChange = async (e: any) => {
        setSearchDestCityString(e.target.value);
        if (e.target.value.length > 2) {
            const predictions = await googlePlacesAutoComplete(searchDestCitystring);
            setDestCityPredictions(predictions);
        } else {
            setDestCityPredictions(null);
        }
    };

//     const messagesRef = useRef<HTMLDivElement>(null);
//     const [sourceCity, setSourceCity] = useState("");
//     const [destCity, setDestCity] = useState("");
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
//     const [gptResponse, setGPTResponse] = useState<any>();
//     const [error, setError] = useState<any>();
//     const [isGenerating, setIsGenerating] = useState<boolean>(false);
//     const [pending, startTransition] = useTransition();
//     const [position, setPosition] = React.useState("");
//     const [searchSourceCitystring, setSearchSourceCityString] = useState("")
//     const [searchDestCitystring, setSearchDestCityString] = useState("")
//     const [sourceCityPredictions, setSourceCityPredictions] = useState<PlaceAutocompleteResult[] | null>([])
//     const [destCityPredictions, setDestCityPredictions] = useState<PlaceAutocompleteResult[] | null>([])
//    const [generation, setGeneration] = useState<string>('');



//     const { messages, input, handleInputChange, handleSubmit } = useChat({
//         onResponse(response) {
//             if (response) {
//                 setIsGenerating(false)
//             }
//         },
//         onError(error) {
//             if (error) {
//                 setIsGenerating(false)
//             }
//         }
//     });

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: apiKey,
//         libraries,
//     });
//     const [date, setDate] = React.useState<DateRange | undefined>({
//         from: new Date(2024, 11, 20),
//         to: addDays(new Date(2024, 0, 20), 20),
//     });
//     const onSubmit = async (values: z.infer<typeof PromptSchema>) => {
//         setHtmlContent("")
//         if (position !== null && position !== "") {
//             values.travel_type = position
//         }
//         values.source_city = sourceCity
//         values.destination_city = destCity
//         console.log(JSON.stringify(values));

     

//         //CALL OPENAI API HERE
//         startTransition(() => {
//             try {
//                 // streamAIResponse(values).then((response: any) => {
//                 //     setComponent(response)
//                 // });
//                 (async () => {
//                     const { output }  = await streamAIResponse(values as any);
//                     for await (const delta of readStreamableValue(output as any)) { 
//                         setGeneration(currentGeneration => `${currentGeneration}${delta}`);
//                     }
//                 })()
//             } catch (error: any) {
//                 console.error(error);
//                 setError(error)
//             }
//         })
//     };
//     const [htmlContent, setHtmlContent] = useState('');
//     const [extraParagraph, setExtraParagraph] = useState('');
  
//     useEffect(() => {
//       // Step 1: Split the content by </html> to separate the valid HTML and extra text
//       const htmlEndIndex = generation.indexOf('</html>');
      
//       if (htmlEndIndex !== -1) {
//         const htmlPart = generation.slice(0, htmlEndIndex + 7).replace(/```html|```/g, '')// Get the HTML document
//         const extraText = generation.slice(htmlEndIndex + 7).trim(); // Capture the text after </html>

//        // const finalhtml = htmlPart.replace(/```html|```/g, '')
  
//         setHtmlContent(htmlPart);
//         setExtraParagraph(extraText); // Store extra paragraph
//       } else {
//         setHtmlContent(generation); // If no </html> is found, treat the entire content as HTML
//       }
//     }, [generation]);
  
//     useEffect(() => {
//         const fetchPredictions = async () => {
//             const predictions = await googlePlacesAutoComplete(searchSourceCitystring);
//             setSourceCityPredictions(predictions || []);
//         }
//         fetchPredictions()
//     }, [searchSourceCitystring])


//     useEffect(() => {
//         const fetchPredictions = async () => {
//             const predictions = await googlePlacesAutoComplete(searchDestCitystring);
//             setDestCityPredictions(predictions || []);
//         }
//         fetchPredictions()
//     }, [searchDestCitystring])

//     useEffect(() => {
//         if (messagesRef.current) {
//           messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
//         }
//       }, [messages]);

//     const [travel_type, setSelectedTravelType] = React.useState("")

//     const form = useForm<z.infer<typeof PromptSchema>>({
//         resolver: zodResolver(PromptSchema),
//         defaultValues: {
//             travel_dates: date,
//             source_city: "",
//             destination_city: "",
//             travel_type: travel_type,
//             ecological: false,
//             mass_tourism: false,
//             diving: false,
//             surfing: false,
//             hiking: false,
//             climbing: false,
//             sightseeing: false,
//             stops_inbetween: "0"
//         }
//     })

    // const handleSuggestionSelect = (value: any) => {
    //     console.log("SUGGESTION SELECTED", value)
    // }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                {/* Location Details Section */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Location Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <FormField
                                control={form.control}
                                name="source_city"
                                render={({ field }) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel className="text-base font-medium text-slate-700">From</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={sourceCity || searchSourceCitystring}
                                                onChange={handleSourceCityChange}
                                                placeholder="Starting from..."
                                                className="h-11 text-base w-full"
                                            />
                                        </FormControl>
                                        {sourceCityPredictions !== null && sourceCityPredictions?.length > 0 && (
                                            <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-slate-200">
                                                {sourceCityPredictions?.map((item: any) => (
                                                    <div
                                                        key={item.place_id}
                                                        className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-slate-700"
                                                        onClick={() => {
                                                            setSourceCityPredictions(null);
                                                            setSourceCity(formatSuggestions(item.description));
                                                        }}
                                                    >
                                                        {formatSuggestions(item.description)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
    
                            <FormField
                                control={form.control}
                                name="destination_city"
                                render={({ field }) => (
                                    <FormItem className="relative w-full">
                                        <FormLabel className="text-base font-medium text-slate-700">To</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={destCity || searchDestCitystring}
                                                onChange={handleDestCityChange}
                                                placeholder="Travelling to..."
                                                className="h-11 text-base w-full"
                                            />
                                        </FormControl>
                                        {destCityPredictions !== null && destCityPredictions?.length > 0 && (
                                            <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-slate-200">
                                                {destCityPredictions?.map((item: any) => (
                                                    <div
                                                        key={item.place_id}
                                                        className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-slate-700"
                                                        onClick={() => {
                                                            setDestCityPredictions(null);
                                                            setDestCity(formatSuggestions(item.description));
                                                        }}
                                                    >
                                                        {formatSuggestions(item.description)}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                    {/* Date Selection */}
                        <FormField
                            control={form.control}
                            name="travel_dates"
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel className='font-semibold text-lg text-slate-600'>Travel Dates</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full h-12 justify-start text-left font-normal border-slate-200",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-3 h-5 w-5" />
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "LLL dd, y")} -{" "}
                                                                {format(date.to, "LLL dd, y")}
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
                                                    defaultMonth={date?.from as any}
                                                    selected={date as any}
                                                    onSelect={setDate as any}
                                                    numberOfMonths={2}
                                                    className="rounded-md border"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Travel Preferences Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">Travel Preferences</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <FormField
                                control={form.control}
                                name="travel_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-slate-700">Travel Type</FormLabel>
                                        <FormControl>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="w-full h-11 justify-start text-base">
                                                        {position || "Select travel type"}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[200px]">
                                                    <DropdownMenuLabel>Choose your travel type</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                                        <DropdownMenuRadioItem value="Solo">Solo Travel</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="Group">Group Travel</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="">No Preference</DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
    
                            <FormField
                                control={form.control}
                                name="stops_inbetween"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium text-slate-700">Number of Stops</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="How many stops?"
                                                className="h-11 text-base w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
    
                        {/* Activities Section */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Preferred Activities</h3>
                            <div className="flex justify-between items-center w-full gap-4">
                                {['hiking', 'diving', 'climbing', 'sightseeing'].map((activity) => (
                                    <FormField
                                        key={activity}
                                        control={form.control}
                                        name={activity as any}
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-medium text-slate-700 capitalize">
                                                    {activity}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
    
                <Button
                    type="submit"
                    className="w-full mt-8 h-11 text-base font-medium"
                    disabled={pending}
                >
                    {pending ? (
                        <div className="flex items-center space-x-2">
                            <span className="animate-spin">⏳</span>
                            <span>Generating itinerary...</span>
                        </div>
                    ) : (
                        "Generate Itinerary"
                    )}
                </Button>
            </form>
        </Form>
    )
}

