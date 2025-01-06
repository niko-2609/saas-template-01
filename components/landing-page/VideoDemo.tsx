'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export default function VideoDemo() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <div className="py-24 bg-gradient-to-b from-black to-[#019992]/20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#ffb001] to-[#44ee77]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          See TravelPlan in Action
        </motion.h2>
        <motion.div 
          className="aspect-w-16 aspect-h-9"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
        >
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="TravelPlan Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </div>
  )
}

