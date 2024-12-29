import { Compass } from 'lucide-react'

export default function Welcome() {
  return (
    <div className="text-center">
      <Compass className="w-16 h-16 text-orange mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-blueGreen mb-4">Welcome to TripPlanner AI</h1>
      <p className="text-gray-600 mb-6">Your personal AI-powered itinerary generator</p>
      <div className="text-left">
        <h3 className="font-semibold mb-2 text-red">Discover how we can help you:</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-mint rounded-full mr-2"></span>
            Create personalized travel itineraries
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-orange rounded-full mr-2"></span>
            Save time on trip planning
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blueGreen rounded-full mr-2"></span>
            Discover hidden gems and local favorites
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-red rounded-full mr-2"></span>
            Optimize your travel schedule
          </li>
        </ul>
      </div>
    </div>
  )
}

