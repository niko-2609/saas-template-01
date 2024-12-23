import BackToHomeButton from "@/components/shared/backToHomeButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactUs() {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-[#019992]">Contact Us</h1>
      <p className="mb-6">
        We&apos;d love to hear from you. Please fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input type="text" id="name" name="name" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <Input type="email" id="email" name="email" required className="mt-1" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <Textarea id="message" name="message" rows={4} required className="mt-1" />
        </div>
        <Button type="submit" className="bg-[#ffb001] hover:bg-[#019992] text-white">
          Send Message
        </Button>
      </form>
      <div className="mt-8 p-4 bg-[#44ee77] bg-opacity-20 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-[#019992]">Our Office</h2>
        <p>123 Main Street</p>
        <p>Anytown, ST 12345</p>
        <p>Email: info@yourcompany.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <BackToHomeButton />
    </div>
  )
}

