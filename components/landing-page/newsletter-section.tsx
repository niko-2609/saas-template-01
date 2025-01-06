import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Inspired</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest travel insights, destination guides, and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 mb-4 sm:mb-0 sm:mr-4 text-gray-800 placeholder:text-gray-500"
          />
          <Button className="w-full sm:w-auto bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-semibold">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

