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


import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Libraries } from "@react-google-maps/api";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { googlePlacesAutoComplete } from '@/features/itenary-generator/server/googlePlaces';
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { formSchema } from "../schemas";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";




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
    no_of_travellers: 1,
    special_preferences: '',
    // travel_type: '',
    // stops_inbetween: '',
    // mass_tourism: false,
    // ecological: false,
    // hiking: false,
    // diving: false,
    // climbing: false,
    // sightseeing: false
};

export default function GeneratorForm() {
    const [destCityPredictions, setDestCityPredictions] = useState<any>(null);
    const [destCity, setDestCity] = useState<string>("");
    const [searchDestCitystring, setSearchDestCityString] = useState<string>("");
    const [date, setDate] = useState<{ from: Date | null; to: Date | null } | null>(
        null
    );
    const router = useRouter();
    const [pending, setPending] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    });




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPending(true);
        console.log(values);
        try {
            // Simulate API call
            const updatedValues = {
                ...values,
                destination_city: destCity,
                travel_dates: date,
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Location Details Section */}
                    <div className="space-y-8">
                        <div>
                                <FormField
                                    control={form.control}
                                    name="destination_city"
                                    render={({ field }) => (
                                        <FormItem className="relative w-full">
                                            <FormLabel className="text-base font-semibold text-md text-[#019992]">Destination</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={destCity || searchDestCitystring}
                                                    onChange={handleDestCityChange}
                                                    placeholder="Where do you want to go?"
                                                    className="w-full bg-white focus:ring-2 focus:ring-[#019992] rounded-md hover:bg-gray-50  placeholder:text-slate-400"
                                                />
                                            </FormControl>
                                            {destCityPredictions !== null && destCityPredictions?.length > 0 && (
                                                <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-slate-200">
                                                    {destCityPredictions?.map((item: any) => (
                                                        <div
                                                            key={item.place_id}
                                                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-[#019992]"
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
                        <div>
                            {/* Date Selection */}
                            <FormField
                                control={form.control}
                                name="travel_dates"
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='font-semibold text-md text-[#019992]'>Travel Dates</FormLabel>
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
                                                            <span>MM/DD/YYYY - MM/DD/YYYY</span>
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
                        <FormField
                                    control={form.control}
                                    name="no_of_travellers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-semibold text-md text-[#019992]">Number of Travellers</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="How many travellers?"
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                                                        field.onChange(value);
                                                    }}
                                                    className="w-full bg-white focus:ring-2 focus:ring-[#019992] rounded-md hover:bg-gray-50"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                        </div>

                        <div>
                        <FormField
                                    control={form.control}
                                    name="special_preferences"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-base font-semibold text-md text-[#019992]">Special Preferences</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Let us know your preferences (e.g., beach, mountains, city exploration, etc.)"
                                                    className="w-full bg-white focus:ring-2 focus:ring-[#019992] rounded-md hover:bg-gray-50"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#019992] hover:bg-[#019992] text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                        disabled={pending}
                    >
                        {pending ? (
                            <div className="flex items-center space-x-2">
                                <span className="animate-spin">⏳</span>
                                <span>Submitting details...</span>
                            </div>
                        ) : (
                            "Submit Preferences"
                        )}
                    </Button>
                </form>
            </Form>
        </>

    )
}


// OUTED FORM STARTS HERE


                            {/* <h2 className="text-2xl font-semibold text-slate-800 mb-6">Travel Preferences</h2>
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

                              
                            </div> */}

                            {/* Activities Section */}
                            {/* <div className="space-y-4">
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
                            </div> */}