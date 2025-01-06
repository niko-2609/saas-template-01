'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
}

export default function EmailCapture() {
  return (
    <div className="py-24 bg-gradient-to-b from-black to-[#019992]/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ffb001] to-[#44ee77]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Stay Updated on New Features
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sign up for our newsletter to receive travel tips and be the first to know about new TravelPlan features.
        </motion.p>
        <motion.form 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div animate={floatingAnimation}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 bg-white/10 text-white placeholder-gray-400 border-[#019992]"
              required
            />
          </motion.div>
          <motion.div animate={floatingAnimation}>
            <Button type="submit" className="bg-[#ffb001] hover:bg-[#ffb001]/80 text-black">
              Subscribe
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

