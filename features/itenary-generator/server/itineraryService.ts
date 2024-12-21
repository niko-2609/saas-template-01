"use server"

import dbConnect from '@/features/db/mongoose';
import ItineraryModel, { IItinerary } from '../models/itinerary.model';
import { TripDetails } from '../schemas';

export async function saveItinerary(
  userId: string,
  tripDetails: TripDetails,
  htmlContent: string
): Promise<Omit<IItinerary, keyof Document>> {
  await dbConnect();

  const coordinates = extractCoordinates(htmlContent);
  const logisticalInfo = extractLogisticalInfo(htmlContent);
  const days = extractDays(htmlContent, coordinates);

  const itinerary = await ItineraryModel.create({
    userId,
    tripDetails: {
      sourceCity: tripDetails.source_city,
      destinationCity: tripDetails.destination_city,
      travelDates: {
        from: tripDetails.travel_dates?.from,
        to: tripDetails.travel_dates?.to
      },
      travelType: tripDetails.travel_type,
      preferences: {
        massTourism: tripDetails.mass_tourism,
        ecological: tripDetails.ecological,
        hiking: tripDetails.hiking,
        diving: tripDetails.diving,
        climbing: tripDetails.climbing,
        sightseeing: tripDetails.sightseeing
      }
    },
    logisticalInfo,
    days,
    rawHtmlContent: htmlContent
  });

  // Convert to plain object and remove Mongoose-specific fields
  const plainItinerary = JSON.parse(JSON.stringify(itinerary));
  return plainItinerary;
}

function extractCoordinates(html: string): Array<{ latitude: number; longitude: number }> {
  const coordPattern = /!!(-?\d+\.\d+),\s*(-?\d+\.\d+)!!/g;
  const matches = [...html.matchAll(coordPattern)];
  return matches.map(match => ({
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  }));
}

function extractLogisticalInfo(html: string) {
  // Extract from the table in the HTML
  const logisticalInfo = [];
  const tableRegex = /<tr>[\s\S]*?<td[^>]*>(.*?)<\/td>[\s\S]*?<td[^>]*>(.*?)<\/td>[\s\S]*?<\/tr>/g;
  
  let match;
  while ((match = tableRegex.exec(html)) !== null) {
    logisticalInfo.push({
      category: match[1].replace(/<[^>]*>/g, '').trim(),
      details: match[2].replace(/<[^>]*>/g, '').trim()
    });
  }
  
  return logisticalInfo;
}

function extractDays(html: string, coordinates: Array<{ latitude: number; longitude: number }>) {
  const days = [];
  const dayRegex = /<h3[^>]*>Day (\d+)<\/h3>([\s\S]*?)(?=<h3|$)/g;
  let coordIndex = 0;
  
  let match;
  while ((match = dayRegex.exec(html)) !== null) {
    const dayNumber = parseInt(match[1]);
    const dayContent = match[2];
    
    // Extract locations and activities
    const locations = [];
    const locationRegex = /<strong>(.*?)<\/strong>/g;
    let locationMatch;
    
    while ((locationMatch = locationRegex.exec(dayContent)) !== null) {
      if (coordIndex < coordinates.length) {
        locations.push({
          name: locationMatch[1].trim(),
          coordinates: coordinates[coordIndex],
          activities: extractActivities(dayContent),
          transportationMode: extractTransportationMode(dayContent)
        });
        coordIndex++;
      }
    }
    
    days.push({
      dayNumber,
      locations,
      description: dayContent.replace(/<[^>]*>/g, '').trim()
    });
  }
  
  return days;
}

function extractActivities(content: string): string[] {
  // Extract activities from the day content
  const activities = [];
  const activityPattern = /activities?:([^.]*)/i;
  const match = content.match(activityPattern);
  
  if (match) {
    activities.push(...match[1].split(',').map(a => a.trim()));
  }
  
  return activities;
}

function extractTransportationMode(content: string): string | undefined {
  const transportPattern = /by\s+(train|bus|car|airplane|bicycle|van)/i;
  const match = content.match(transportPattern);
  return match ? match[1].toLowerCase() : undefined;
}

export async function getUserItineraries(userId: string) {
  await dbConnect();
  const itineraries = await ItineraryModel.find({ userId })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(itineraries));
}

export async function getItineraryById(id: string) {
  await dbConnect();
  const itinerary = await ItineraryModel.findById(id).lean();
  return JSON.parse(JSON.stringify(itinerary));
} 