'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CallToAction() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Plan Your Dream Trip?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start your journey now and get a personalized itinerary in seconds.
        </motion.p>
        <motion.button
          className="inline-flex items-center bg-[#019992] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#019992]/90 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your Itinerary
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}

