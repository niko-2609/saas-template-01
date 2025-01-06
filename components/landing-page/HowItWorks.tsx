'use client'

import { motion } from 'framer-motion'
import { MapPin, Sliders, Calendar } from 'lucide-react'

const steps = [
  { icon: MapPin, title: "Choose Your Destination", description: "Select where you want to go and for how long." },
  { icon: Sliders, title: "Set Your Preferences", description: "Tell us what you like: adventure, culture, food, etc." },
  { icon: Calendar, title: "Get Your Itinerary", description: "Receive a personalized day-by-day plan instantly." },
]

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function HowItWorks() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          How It Works
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg p-6 text-center shadow-md"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,176,1)" }}
            >
              <motion.div 
                className="bg-[#ffb001] rounded-full p-4 inline-block mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <step.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

