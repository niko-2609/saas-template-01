/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/features/store/hooks"
import { DashboardState, fetchDashboardStats } from "@/features/store/slices/dashboardSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, PlusCircle, AlertCircle, Compass, Plane } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { FaSuitcase } from "react-icons/fa"

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { 
    totalItineraries, 
    upcomingTrips, 
    daysPlanned, 
    favoriteDestination,
    recentItineraries,
    isLoading,
    error 
  } = useAppSelector((state: { dashboard: DashboardState }) => state.dashboard);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchDashboardStats(session.user.id));
    }
  }, [dispatch, session]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Spinner size="lg" />
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-[60vh] text-destructive">
            <AlertCircle className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  const viewItinerary = (id: string) => {
    router.push(`/itinerary/${id}`);
  };

  return (
    // <div className="flex flex-col min-h-screen">
    //   <main className="flex-grow container mx-auto px-4 py-8">
    //     <h1 className="text-3xl font-bold mb-8">
    //       Welcome back, {session?.user?.name?.split(' ')[0] || 'Traveler'}!
    //     </h1>

    //     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Total Itineraries</CardTitle>
    //           <Calendar className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">{totalItineraries}</div>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
    //           <MapPin className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">{upcomingTrips}</div>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Days Planned</CardTitle>
    //           <Clock className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">{daysPlanned}</div>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">Favorite Destination</CardTitle>
    //           <MapPin className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">{favoriteDestination}</div>
    //         </CardContent>
    //       </Card>
    //     </div>

    //     <div className="mb-8">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Start a New Adventure</CardTitle>
    //           <CardDescription>Create a new itinerary based on your preferences.</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <Link href="/generator">
    //             <Button className="w-full sm:w-auto">
    //               <PlusCircle className="mr-2 h-4 w-4" /> Create New Itinerary
    //             </Button>
    //           </Link>
    //         </CardContent>
    //       </Card>
    //     </div>

    //     <div>
    //       <h2 className="text-2xl font-bold mb-4">Recent Itineraries</h2>
    //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    //         {recentItineraries?.map((itinerary: { _id: string; tripDetails: { destinationCity: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; travelDates: { from: string | number | Date; to: string | number | Date } } }) => (
    //           <Card key={itinerary._id}>
    //             <CardHeader>
    //               <CardTitle>{itinerary.tripDetails.destinationCity}</CardTitle>
    //               <CardDescription>
    //                 {format(new Date(itinerary.tripDetails.travelDates.from), 'MMM dd, yyyy')} - 
    //                 {format(new Date(itinerary.tripDetails.travelDates.to), 'MMM dd, yyyy')}
    //               </CardDescription>
    //             </CardHeader>
    //             <CardContent>
    //               <Button 
    //                 variant="outline" 
    //                 className="w-full"
    //                 onClick={() => viewItinerary(itinerary?._id)}
    //               >
    //                 View Details
    //               </Button>
    //             </CardContent>
    //           </Card>
    //         ))}
    //       </div>
    //     </div>
    //   </main>
    // </div>

    <div className="min-h-screen bg-gray-50">
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome back, {session?.user?.name?.split(' ')[0] || 'Traveler'}!
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {[
          { title: 'Total Itineraries', value: totalItineraries, icon: Calendar },
          { title: 'Upcoming Trips', value: upcomingTrips, icon: Plane },
          { title: 'Days Planned', value: daysPlanned, icon: Clock },
          { title: 'Favorite Destination', value: favoriteDestination, icon: MapPin },
        ].map((item, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-[#019992]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Start a New Adventure</CardTitle>
            <CardDescription>Create a new itinerary based on your preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generator">
              <Button className="w-full sm:w-auto bg-[#019992] text-white hover:bg-[#018880]">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Itinerary
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Itineraries</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentItineraries?.map((itinerary) => (
            <Card key={itinerary._id} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Compass className="mr-2 h-5 w-5 text-[#019992]" />
                  {itinerary.tripDetails.destinationCity}
                </CardTitle>
                <CardDescription>
                  {format(new Date(itinerary.tripDetails.travelDates.from), 'MMM dd, yyyy')} - 
                  {format(new Date(itinerary.tripDetails.travelDates.to), 'MMM dd, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full text-[#019992] border-[#019992] hover:bg-[#019992] hover:text-white"
                  onClick={() => viewItinerary(itinerary._id)}
                >
                  <FaSuitcase className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  </div>
  );
}



