import * as z from 'zod'
// const DATE_REQUIRED_ERROR = "Date is required.";


export const formSchema = z.object({
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

export interface TripDetails {
    source_city?: string;
    destination_city?: string;
    travel_dates?: {
        from?: Date;
        to?: Date;
    };
    travel_type?: string;
    stops_inbetween?: string;
    mass_tourism?: boolean;
    ecological?: boolean;
    hiking?: boolean;
    diving?: boolean;
    climbing?: boolean;
    sightseeing?: boolean;
}


export interface TripSummaryProps {
    tripDetails?: TripDetails;
    onGenerateItinerary?: () => void;
    onEditDetails: () => void;
    isLoading?: boolean;
  }
  