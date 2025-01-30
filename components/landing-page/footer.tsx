'use client'

import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2 mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Plane className="h-8 w-8 text-[#019992]" />
            <span className="text-2xl font-bold text-gray-800">Tripsy</span>
          </motion.div>
          <motion.nav 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
              About
            </Link>
            <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-800 transition-colors">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-gray-600 hover:text-gray-800 transition-colors">
              Terms
            </Link>
          </motion.nav>
        </div>
        <motion.div 
          className="mt-8 text-center text-gray-600 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          © {new Date().getFullYear()} TravelPlan. All rights reserved.
        </motion.div>
      </div>
    </footer>
  )
}

