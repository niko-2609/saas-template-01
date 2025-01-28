import mongoose, { Schema, Document } from 'mongoose';

// Interfaces
interface ILocation {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  activities: string[];
  transportationMode?: string;
}

interface IDay {
  dayNumber: number;
  locations: ILocation[];
  description?: string;
}

interface ILogisticalInfo {
  category: string;
  details: string;
}

export interface IItinerary extends Document {
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  tripDetails: {
    destinationCity: string;
    travelDates: {
      from: Date;
      to: Date;
    };
    noOfTravellers: number;
    specialPreferences: string;
  };
  logisticalInfo: ILogisticalInfo[];
  days: IDay[];
  rawHtmlContent: string;
  advice?: string;
}

// Schemas
const LocationSchema = new Schema({
  name: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  activities: [String],
  transportationMode: String
});

const DaySchema = new Schema({
  dayNumber: { type: Number, required: true },
  locations: [LocationSchema],
  description: String
});

const LogisticalInfoSchema = new Schema({
  category: { type: String, required: true },
  details: { type: String, required: true }
});

const ItinerarySchema = new Schema({
  userId: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  tripDetails: {
    destinationCity: { type: String, required: true },
    travelDates: {
      from: { type: Date, required: true },
      to: { type: Date, required: true }
    },
    noOfTravellers: { type: Number, required: true },
    specialPreferences: { type: String, required: false }
  },
  logisticalInfo: [LogisticalInfoSchema],
  days: [DaySchema],
  rawHtmlContent: { type: String, required: true },
  advice: String
}, {
  timestamps: true
});

export default mongoose?.models?.Itinerary || mongoose.model<IItinerary>('Itinerary', ItinerarySchema); 