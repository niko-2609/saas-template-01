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

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
    source_city: z.string().optional(),
    destination_city: z.string().optional(),
    travel_dates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }).optional(),
    travel_type: z.string().optional(),
    stops_inbetween: z.number().optional(),
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

export default function Page() {
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
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&types=(cities)&key=YOUR_API_KEY`
            );
            const data = await response.json();
            setSourceCityPredictions(data.predictions);
        } else {
            setSourceCityPredictions(null);
        }
    };

    const handleDestCityChange = async (e: any) => {
        setSearchDestCityString(e.target.value);
        if (e.target.value.length > 2) {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&types=(cities)&key=YOUR_API_KEY`
            );
            const data = await response.json();
            setDestCityPredictions(data.predictions);
        } else {
            setDestCityPredictions(null);
        }
    };

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
                                                type="number"
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

