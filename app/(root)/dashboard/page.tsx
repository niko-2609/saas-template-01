/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserItineraries } from "@/features/itenary-generator/server/itineraryService"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalItineraries: number;
  upcomingTrips: number;
  daysPlanned: number;
  favoriteDestination: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalItineraries: 0,
    upcomingTrips: 0,
    daysPlanned: 0,
    favoriteDestination: ''
  });
  const [recentItineraries, setRecentItineraries] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchItineraries = async () => {
      if (session?.user?.id) {
        const allItineraries = await getUserItineraries(session.user.id);
        // Take only the first 3 itineraries since they're already sorted by date
        setRecentItineraries(allItineraries.slice(0, 3));
        
        // Calculate dashboard stats using all itineraries
        const now = new Date();
        const stats = {
          totalItineraries: allItineraries.length,
          upcomingTrips: allItineraries.filter((it: { tripDetails: { travelDates: { from: string | number | Date } } }) => 
            new Date(it.tripDetails.travelDates.from) > now).length,
          daysPlanned: allItineraries.reduce((acc: any, it: { days: string | any[] }) => acc + it.days.length, 0),
          favoriteDestination: calculateFavoriteDestination(allItineraries)
        };
        setStats(stats);
      }
    };

    fetchItineraries();
  }, [session]);

  const calculateFavoriteDestination = (itineraries: any[]) => {
    const destinations = itineraries.map((it: { tripDetails: { destinationCity: any } }) => it.tripDetails.destinationCity);
    return destinations.length > 0
      ? destinations.reduce((a: any, b: any) =>
          destinations.filter((v: any) => v === a).length >= destinations.filter((v: any) => v === b).length ? a : b
        )
      : 'None';
  };

  const viewItinerary = (id: string) => {
    router.push(`/itinerary/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Welcome back, {session?.user?.name?.split(' ')[0] || 'Traveler'}!
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Itineraries</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItineraries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Trips</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingTrips}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Days Planned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.daysPlanned}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favorite Destination</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.favoriteDestination}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Start a New Adventure</CardTitle>
              <CardDescription>Create a new itinerary based on your preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/generator">
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Itinerary
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Itineraries</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentItineraries.map((itinerary) => (
              <Card key={itinerary._id}>
                <CardHeader>
                  <CardTitle>{itinerary.tripDetails.destinationCity}</CardTitle>
                  <CardDescription>
                    {format(new Date(itinerary.tripDetails.travelDates.from), 'MMM dd, yyyy')} - 
                    {format(new Date(itinerary.tripDetails.travelDates.to), 'MMM dd, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => viewItinerary(itinerary._id)}
                  >
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



