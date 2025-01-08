'use client'

import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter();
  return (
    <motion.header 
      className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-[#019992]" />
          <span className="text-2xl font-bold text-gray-800">Tripsy</span>
        </Link>
        <nav>
          <motion.button
            className="bg-[#019992] text-white px-4 py-2 rounded-full font-medium hover:bg-[#019992]/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push('/sign-in')
            }}
          >
            Get Started
          </motion.button>
        </nav>
      </div>
    </motion.header>
  )
}

