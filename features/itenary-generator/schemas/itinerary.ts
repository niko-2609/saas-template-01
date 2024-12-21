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
    sourceCity: z.string(),
    destinationCity: z.string(),
    travelDates: z.object({
      from: z.date(),
      to: z.date()
    }),
    travelType: z.string(),
    preferences: z.object({
      massTourism: z.boolean().optional(),
      ecological: z.boolean().optional(),
      hiking: z.boolean().optional(),
      diving: z.boolean().optional(),
      climbing: z.boolean().optional(),
      sightseeing: z.boolean().optional()
    })
  }),
  logisticalInfo: z.array(LogisticalInfoSchema),
  days: z.array(DaySchema),
  rawHtmlContent: z.string(), // Store original HTML response
  advice: z.string().optional()
});

// Type inference
export type Itinerary = z.infer<typeof ItinerarySchema>; 