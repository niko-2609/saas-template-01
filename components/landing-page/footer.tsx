import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">TRIPSY</h2>
            <p className="mt-2 text-gray-400">Your AI-powered travel companion</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link href="/about" className="hover:text-yellow-400 transition-colors">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact-us" className="hover:text-yellow-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Tripsy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

