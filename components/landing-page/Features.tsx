'use client'

import { motion } from 'framer-motion'
import { Zap, Globe, Clock } from 'lucide-react'

const features = [
  { icon: Zap, title: "Instant Planning", description: "Get your itinerary in seconds, not hours." },
  { icon: Globe, title: "Global Coverage", description: "Plan trips to any destination worldwide." },
  { icon: Clock, title: "Real-time Updates", description: "Stay informed with live travel information." },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          The Future of Travel Planning
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 text-center shadow-md"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(1,153,146)" }}
            >
              <motion.div 
                className="bg-[#019992] rounded-full p-4 inline-block mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

