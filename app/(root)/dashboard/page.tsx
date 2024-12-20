import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle, Calendar, MapPin, Clock } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Dashboard | TravelPlan',
  description: 'Manage your travel itineraries and plan new adventures.',
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome back, John!</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Itineraries
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Trips
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Next trip in 2 weeks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Days Traveled
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37</div>
              <p className="text-xs text-muted-foreground">
                This year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Favorite Destination
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Paris</div>
              <p className="text-xs text-muted-foreground">
                3 trips this year
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">

  <Card>
    <CardHeader>
      <CardTitle>Start a New Adventure</CardTitle>
      <CardDescription>
        Create a new itinerary based on your preferences.
      </CardDescription>
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
            {[
              { title: "Summer in Rome", date: "Aug 15 - Aug 22, 2023" },
              { title: "Tokyo Adventure", date: "Oct 1 - Oct 10, 2023" },
              { title: "New York City Trip", date: "Dec 23 - Dec 30, 2023" },
            ].map((itinerary, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{itinerary.title}</CardTitle>
                  <CardDescription>{itinerary.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}



