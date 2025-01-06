import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: "Explore Hidden Gems",
    content: "Uncover unique destinations and experiences that match your travel style. Our AI-powered suggestions are designed to inspire your next journey, whether you're an adventurer, a foodie, or a culture enthusiast.",
    image: "/assets/hidden-gems.jpg"
  },
  {
    title: "Plan Effortlessly",
    content: "Focus on enjoying your journey with our AI-powered suggestions. From customized itineraries to time-saving tips, we make planning your trip simple and stress-free, allowing you to make the most of every moment.",
    image: "/assets/effortless-planning.jpg"
  },
  {
    title: "Embrace Local Culture",
    content: "Immerse yourself in the heart of every destination. Experience vibrant cultures, traditions, and flavors with our curated suggestions for local festivals, authentic cuisine, hidden markets, and traditional crafts.",
    image: "/assets/local-culture.jpg"
  }
]

export default function FeatureSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Discover the World with Tailored Travel Insights
        </h2>
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12 mb-20`}>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-2xl font-bold text-blue-600">{feature.title}</h3>
              <p className="text-gray-600 text-lg">
                {feature.content}
              </p>
              <Link href="/sign-in">
                <Button className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 rounded-full py-2 px-6 text-lg font-semibold transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <Image src={feature.image} alt={feature.title} width={600} height={400} className="rounded-lg shadow-xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

