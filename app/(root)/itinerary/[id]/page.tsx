"use client"

import { useEffect, useState } from 'react';
import { getItineraryById } from '@/features/itenary-generator/server/itineraryService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ItineraryPage({ params }: { params: { id: string } }) {
  const [itinerary, setItinerary] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchItinerary = async () => {
      const data = await getItineraryById(params.id);
      setItinerary(data);
    };
    fetchItinerary();
  }, [params.id]);

  if (!itinerary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>
            Trip to {itinerary.tripDetails.destinationCity}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: itinerary.rawHtmlContent }} 
          />
        </CardContent>
      </Card>
    </div>
  );
} 