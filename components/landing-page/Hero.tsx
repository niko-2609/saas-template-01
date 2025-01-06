'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-gray-800"
          variants={itemVariants}
        >
          Your AI Travel Companion
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Experience the future of travel planning. Our AI creates personalized itineraries tailored to your preferences in seconds.
        </motion.p>
        <motion.button
          className="inline-flex items-center bg-[#019992] text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-[#019992]/90 transition-colors"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Plan Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}

