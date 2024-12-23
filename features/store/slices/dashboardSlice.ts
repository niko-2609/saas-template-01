/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserItineraries } from '@/features/itenary-generator/server/itineraryService';

export interface DashboardState {
  totalItineraries: number;
  upcomingTrips: number;
  daysPlanned: number;
  favoriteDestination: string;
  recentItineraries: any[];
  error: string | null;
  isLoading: boolean;
}

const initialState: DashboardState = {
  totalItineraries: 0,
  upcomingTrips: 0,
  daysPlanned: 0,
  favoriteDestination: 'None',
  recentItineraries: [],
  error: null,
  isLoading: true,
};

const calculateFavoriteDestination = (itineraries: any[]) => {
  const destinations = itineraries.map(it => it.tripDetails.destinationCity);
  return destinations.length > 0
    ? destinations.reduce((a, b) =>
        destinations.filter(v => v === a).length >= destinations.filter(v => v === b).length ? a : b
      )
    : 'None';
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (userId: string) => {
    try {
      const allItineraries = await getUserItineraries(userId);
      const now = new Date();
      
      return {
        totalItineraries: allItineraries.length,
        upcomingTrips: allItineraries.filter((itinerary: { tripDetails: { travelDates: { from: string | number | Date; }; }; }) => 
          new Date(itinerary?.tripDetails?.travelDates.from) > now).length,
        daysPlanned: allItineraries.reduce((acc: number, itinerary: any) => {
          const from = new Date(itinerary?.tripDetails?.travelDates.from);
          const to = new Date(itinerary?.tripDetails?.travelDates.to);
          const diffTime = Math.abs(to.getTime() - from.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          return acc + diffDays;
        }, 0),
        favoriteDestination: calculateFavoriteDestination(allItineraries),
        recentItineraries: allItineraries.slice(0, 3)
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch dashboard stats');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalItineraries = action.payload.totalItineraries;
        state.upcomingTrips = action.payload.upcomingTrips;
        state.daysPlanned = action.payload.daysPlanned;
        state.favoriteDestination = action.payload.favoriteDestination;
        state.recentItineraries = action.payload.recentItineraries;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      });
  },
});

export default dashboardSlice.reducer; 