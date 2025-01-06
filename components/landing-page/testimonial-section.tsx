import Image from 'next/image'

const testimonials = [
  {
    name: "Sarah L.",
    location: "New York, USA",
    quote: "Tripsy made planning my European adventure a breeze! The AI recommendations were spot-on and saved me hours of research.",
    avatar: "/assets/avatar-1.jpg"
  },
  {
    name: "James T.",
    location: "London, UK",
    quote: "I discovered hidden gems I never would have found on my own. Tripsy truly enhanced my travel experience!",
    avatar: "/assets/avatar-2.jpg"
  },
  {
    name: "Mia C.",
    location: "Sydney, Australia",
    quote: "The personalized itinerary was perfect for my family trip. Tripsy understood our needs and delivered beyond expectations.",
    avatar: "/assets/avatar-3.jpg"
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Image src={testimonial.avatar} alt={testimonial.name} width={60} height={60} className="rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">`{testimonial.quote}`</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

