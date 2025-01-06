/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header({ session }: { session: any }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">TRIPSY</Link>
          <div className="flex space-x-4">
            <Link href="/about">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600 font-semibold">About Us</Button>
            </Link>
            {!session && (
              <Link href="/sign-in">
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700 border-none font-semibold">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

