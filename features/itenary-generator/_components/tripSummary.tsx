"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowLeft, Loader2, AlertTriangle, Plane, Train, Car, Ship, MapPin, Navigation, Compass, Leaf, Mountain, Waves, FootprintsIcon as ClimbingShoe, Camera, UserRoundIcon } from 'lucide-react'
import { useState } from "react"
import { TripSummaryProps } from "../schemas"
import { format } from "date-fns";
import { saveItinerary } from "../server/itineraryService"
import { useSession } from "next-auth/react"



const formatDate = (date: Date | undefined) => {
    if (date === undefined ) {
        return "Please provide valid dates"
    }

  return format(date, 'MM/dd/yyyy');
};

const TravelTypeIcon = ({ type }: { type?: string }) => {
  switch (type?.toLowerCase()) {
    case 'plane':
      return <Plane className="w-5 h-5" />;
    case 'train':
      return <Train className="w-5 h-5" />;
    case 'car':
      return <Car className="w-5 h-5" />;
    case 'ship':
      return <Ship className="w-5 h-5" />;
    default:
      return <Compass className="w-5 h-5" />;
  }
};

const PreferenceBadge = ({ label, value, icon: Icon }: { label: string; value?: boolean; icon: any }) => (
  <Badge variant={value ? "default" : "secondary"} className="mr-2 mb-2">
    <Icon className="w-3 h-3 mr-1" />
    {label}
  </Badge>
);

export default function TripSummary({ 
  tripDetails, 
  onGenerateItinerary = () => {}, 
  onEditDetails, 
}: TripSummaryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSavingToCloud, setIsSavingToCloud ] = useState(false)
  const { data: session } = useSession()
  const userId = session?.user?.id

  console.log(tripDetails)

  const handleGenerateItinerary = () => {
    setIsGenerating(true);
    if (typeof onGenerateItinerary === 'function') {
      onGenerateItinerary();
    } else {
      console.error('onGenerateItinerary is not a function');
    }
    setIsGenerating(false);
  };


  if (!tripDetails?.source_city || !tripDetails?.destination_city || !tripDetails?.travel_dates?.from || !tripDetails?.travel_dates?.to || !tripDetails?.travel_type) {
    return (
      <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100">
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-center text-gray-700 max-w-md">
          No trip details available. Please go back and enter your trip information.
        </p>
      </CardContent>
      <CardFooter className="p-6 bg-gray-50 border-t border-gray-200">
        <Button 
          onClick={onEditDetails} 
          className="w-full bg-[#019992] hover:bg-[#018880] text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Enter Trip Details
        </Button>
      </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trip Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">From:</span>
          <span>{tripDetails.source_city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">To:</span>
          <span>{tripDetails.destination_city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">Dates:</span>
          <span>{formatDate(tripDetails.travel_dates?.from)} to {formatDate(tripDetails.travel_dates?.to)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TravelTypeIcon type={tripDetails.travel_type} />
          <span className="font-medium">Travel Type:</span>
          <span>{tripDetails.travel_type}</span>
        </div>
        {tripDetails.stops_inbetween && (
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Stops In-between:</span>
            <span>{tripDetails.stops_inbetween}</span>
          </div>
        )}
        <div>
          <span className="font-medium font-bold mb-2 block">Preferences:</span>
          <div className="flex flex-1 justify-between mt-5">
            {/* <PreferenceBadge label="Mass Tourism" value={tripDetails?.mass_tourism} icon={Users} /> */}
            {/* <PreferenceBadge label="Ecological" value={tripDetails?.ecological} icon={Leaf} /> */}
            <PreferenceBadge label="Hiking" value={tripDetails?.hiking} icon={Mountain} />
            <PreferenceBadge label="Diving" value={tripDetails?.diving} icon={Waves} />
            <PreferenceBadge label="Climbing" value={tripDetails?.climbing} icon={ClimbingShoe} />
            <PreferenceBadge label="Sightseeing" value={tripDetails?.sightseeing} icon={Camera} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEditDetails}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
        <Button onClick={handleGenerateItinerary} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Itinerary...
            </>
          ) : (
            'Generate Itinerary'
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

{/* <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Trip Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="flex space-x-8">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">From:</span>
          <span>{tripDetails.source_city}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">To:</span>
          <span>{tripDetails.destination_city}</span>
        </div>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">Dates:</span>
          <span>{formatDate(tripDetails.travel_dates?.from)} to {formatDate(tripDetails.travel_dates?.to)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TravelTypeIcon type={tripDetails.travel_type} />
          <span className="font-medium">Travel Type:</span>
          <span>{tripDetails.travel_type}</span>
        </div>
        {tripDetails.stops_inbetween && (
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Stops In-between:</span>
            <span>{tripDetails.stops_inbetween}</span>
          </div>
        )}
        <div>
          <span className="font-medium font-bold mb-2 block">Preferences:</span>
          <div className="flex flex-1 justify-between mt-5">
  <PreferenceBadge label="Hiking" value={tripDetails?.hiking} icon={Mountain} />
            <PreferenceBadge label="Diving" value={tripDetails?.diving} icon={Waves} />
            <PreferenceBadge label="Climbing" value={tripDetails?.climbing} icon={ClimbingShoe} />
            <PreferenceBadge label="Sightseeing" value={tripDetails?.sightseeing} icon={Camera} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onEditDetails}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Edit Details
        </Button>
        <Button onClick={handleGenerateItinerary} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Itinerary...
            </>
          ) : (
            'Generate Itinerary'
          )}
        </Button>
      </CardFooter>
</Card> */}
