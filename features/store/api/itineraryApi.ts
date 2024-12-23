/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchDashboardStats } from '@/features/store/slices/dashboardSlice';

export const itineraryApi = createApi({
  reducerPath: 'itineraryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Itinerary'],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: (userId) => `/itineraries/stats/${userId}`,
      providesTags: ['Itinerary'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(fetchDashboardStats(data));
        } catch (err) {
          // Error handling will be done by the component using the query
        }
      },
    }),
    saveItinerary: builder.mutation({
      query: (payload) => ({
        url: '/itineraries',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Itinerary'],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useSaveItineraryMutation } = itineraryApi; 