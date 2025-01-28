import { z } from "zod";

// Schema for logistical information
export const LogisticalInfoSchema = z.object({
  category: z.string(),
  details: z.string()
});

// Schema for a location/stop
export const LocationSchema = z.object({
  name: z.string(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  }),
  activities: z.array(z.string()),
  transportationMode: z.string().optional(),
  duration: z.string().optional()
});

// Schema for a day in the itinerary
export const DaySchema = z.object({
  dayNumber: z.number(),
  locations: z.array(LocationSchema),
  description: z.string().optional()
});

// Main itinerary schema
export const ItinerarySchema = z.object({
  userId: z.string(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  tripDetails: z.object({
    destinationCity: z.string(),
    travelDates: z.object({
      from: z.date(),
      to: z.date()
    }),
    noOfTravellers: z.number(),
    specialPreferences: z.string().optional()
  }),
  logisticalInfo: z.array(LogisticalInfoSchema),
  days: z.array(DaySchema),
  rawHtmlContent: z.string(), // Store original HTML response
  advice: z.string().optional()
});

// Type inference
export type Itinerary = z.infer<typeof ItinerarySchema>; 