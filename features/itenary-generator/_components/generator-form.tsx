/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

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
import { format } from "date-fns"
import { Libraries } from "@react-google-maps/api";
import { CalendarIcon, ChevronDownCircle } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { googlePlacesAutoComplete } from '@/features/itenary-generator/server/googlePlaces';
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "../schemas";
import { useRouter } from "next/navigation";




function formatSuggestions(str: string) {
    return str.split(',')[0];
}


const libraries: Libraries = ["places"];
const defaultValues = {
    source_city: '',
    destination_city: '',
    travel_dates: {
        from: undefined,
        to: undefined
    },
    travel_type: '',
    stops_inbetween: '',
    mass_tourism: false,
    ecological: false,
    hiking: false,
    diving: false,
    climbing: false,
    sightseeing: false
};

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
    const router = useRouter();
    const [error, setError] = useState<any>();
    const [position, setPosition] = useState<string>("");
    const [pending, setPending] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    });




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        try {
            // Simulate API call
            const updatedValues = {
                ...values,
                source_city: sourceCity,
                destination_city: destCity,
                travel_dates: date,
                travel_type: position,
            };

            // Redirect to the itinerary display page with the entire object as a query parameter
            router.push(`/itinerary?data=${encodeURIComponent(JSON.stringify(updatedValues))}`);


            console.log(updatedValues);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setPending(false);
        }
    };


    const handleSourceCityChange = async (e: any) => {
        const value = e.target.value;
        setSearchSourceCityString(value);
        setSourceCity(value); // Update the sourceCity state with the current input value

        if (value.length > 2) {
            const predictions = await googlePlacesAutoComplete(value);
            setSourceCityPredictions(predictions);
        } else {
            setSourceCityPredictions(null);
        }
    };

    const handleDestCityChange = async (e: any) => {
        const value = e.target.value;
        setSearchDestCityString(value);
        setDestCity(value); // Update the destCity state with the current input value

        if (value.length > 2) {
            const predictions = await googlePlacesAutoComplete(value);
            setDestCityPredictions(predictions);
        } else {
            setDestCityPredictions(null);
        }
    };


    return (
        <>
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
                                                        defaultMonth={date?.from}
                                                        selected={date}
                                                        onSelect={setDate}
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
                                                        <Button variant="outline" className="w-full justify-between text-base">
                                                            {position || "Select travel type"}
                                                            <ChevronDownCircle />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-full">
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
                                <div className="flex items-center justify-between gap-4">
                                    {['hiking', 'diving', 'climbing', 'sightseeing'].map((activity) => (
                                        <FormField
                                            key={activity}
                                            control={form.control}
                                            name={activity.toLowerCase() as keyof z.infer<typeof formSchema>}
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2 flex-1">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value as boolean}
                                                            onCheckedChange={field.onChange}
                                                            className="flex p-2 mt-2"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-medium text-slate-700 capitalize m-0">
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
                                <span>Submitting details...</span>
                            </div>
                        ) : (
                            "Submit details"
                        )}
                    </Button>
                </form>
            </Form>
            {error && <p className='text-destructive'>Unexpected error occured, please try again</p>}
        </>

    )
}

