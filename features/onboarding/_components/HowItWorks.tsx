import { ClipboardList, Sliders, Sparkles } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4 text-blueGreen">How TripPlanner AI Works</h3>
      <div className="flex items-start space-x-4">
        <Sliders className="w-8 h-8 text-orange flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red">1. Set Your Preferences</h4>
          <p className="text-gray-600">Tell us about your travel style, interests, and any specific requirements.</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Sparkles className="w-8 h-8 text-mint flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red">2. AI Generation</h4>
          <p className="text-gray-600">Our AI analyzes your preferences and creates a tailored itinerary.</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <ClipboardList className="w-8 h-8 text-blueGreen flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red">3. Review and Customize</h4>
          <p className="text-gray-600">Fine-tune your itinerary to make it perfect for your trip.</p>
        </div>
      </div>
    </div>
  )
}

