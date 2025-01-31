'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import contentImage1 from "@/public/assets/travel-16.png";
import contentImage2 from "@/public/assets/travel-14.webp";
import contentImage3 from "@/public/assets/travel-17.webp";

const highlights = [
  {
    title: "Discover Hidden Gems",
    description: "Our AI analyzes millions of data points to recommend off-the-beaten-path locations that match your interests.",
    image: contentImage1,
  },
  {
    title: "Personalized Experiences",
    description: "From food tours to adventure sports, we curate experiences that align with your unique preferences and travel style.",
    image: contentImage3,
  },
  {
    title: "Smart Budgeting",
    description: "Our intelligent system helps you make the most of your budget, suggesting the best value options without compromising on quality.",
    image: contentImage2,
  },
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export default function Highlights() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Elevate Your Travel Experience
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlights.map((highlight, index) => (
            <motion.div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-24 last:mb-0`}
              variants={itemVariants}
            >
              <motion.div 
                className="w-full md:w-1/2 mb-8 md:mb-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </motion.div>
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <motion.h3 
                  className="text-3xl font-semibold mb-4 text-gray-800"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {highlight.title}
                </motion.h3>
                <motion.p 
                  className="text-xl text-gray-600"
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {highlight.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

