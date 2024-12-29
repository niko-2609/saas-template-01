import { Brain, Clock, Map } from 'lucide-react'

export default function AIExplanation() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4 text-blueGreen">The Power of AI in Your Travel Planning</h3>
      <p className="text-gray-600 mb-4">
        Our advanced AI technology revolutionizes the way you plan your trips. Here&apos;s how:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-orange bg-opacity-10 rounded-lg">
          <Brain className="w-12 h-12 text-orange mx-auto mb-2" />
          <h4 className="font-semibold text-red">Smart Recommendations</h4>
          <p className="text-sm text-gray-600">Suggests activities based on your unique preferences and past trips.</p>
        </div>
        <div className="text-center p-4 bg-mint bg-opacity-10 rounded-lg">
          <Clock className="w-12 h-12 text-mint mx-auto mb-2" />
          <h4 className="font-semibold text-red">Time Optimization</h4>
          <p className="text-sm text-gray-600">Creates efficient schedules to make the most of your travel time.</p>
        </div>
        <div className="text-center p-4 bg-blueGreen bg-opacity-10 rounded-lg">
          <Map className="w-12 h-12 text-blueGreen mx-auto mb-2" />
          <h4 className="font-semibold text-red">Local Insights</h4>
          <p className="text-sm text-gray-600">Uncovers hidden gems and local favorites for an authentic experience.</p>
        </div>
      </div>
    </div>
  )
}

