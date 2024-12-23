'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import BackToHomeButton from '@/components/shared/backToHomeButton'

export default function AboutUs() {
  return (
   <>
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <header className="relative bg-cover bg-center py-32 px-6 text-center text-white" style={{backgroundImage: 'url("/images/hero-bg.jpg")'}}>
        <div className="absolute inset-0 bg-[#019992] opacity-80"></div>
        <div className="relative z-10 font-semibold">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover who we are, our mission, and what drives us to create the best experience for our users.
          </motion.p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6 font-semibold">
          <motion.h2 
            className="text-4xl font-bold text-[#019992]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Founded in 2024, our company was born from the idea that travel planning should be simple, personalized, and stress-free. 
            With a passion for exploring new places and making memories, we've built a platform that combines the power of AI with the expertise of seasoned travelers.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            We believe in the magic of travel and the joy of discovering new experiences. Our mission is to make planning your perfect journey as easy as a few clicks.
          </motion.p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-gradient-to-b from-[#44ee77] to-[#019992] py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <h2 className="text-4xl font-bold text-white">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-[#019992]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-800">
              To empower travelers with personalized recommendations, making every journey memorable and helping them discover effortlessly.
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#019992]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-gray-800">
              To be the go-to platform for seamless travel planning, making every journey truly memorable and every adventure uniquely yours.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10 text-center">
          <h2 className="text-4xl font-bold text-[#019992]">Meet the Team</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-semibold">
            Our team is made up of passionate travelers, tech enthusiasts, and problem solvers dedicated to making your travel planning as smooth as possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { name: 'Jane Doe', role: 'CEO & Co-Founder', image: '/images/team1.jpg' },
              { name: 'John Smith', role: 'CTO & Co-Founder', image: '/images/team2.jpg' },
              { name: 'Emily Johnson', role: 'Head of Product', image: '/images/team3.jpg' },
            ].map((member, index) => (
              <Card key={index} className="bg-white shadow-lg overflow-hidden transition-all hover:shadow-xl border-t-4 border-[#ffb001]">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <CardContent className="text-center p-6">
                  <h3 className="text-xl font-semibold text-[#019992]">{member.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <a href="#" className="text-[#019992] hover:text-[#ffb001] transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="text-[#019992] hover:text-[#ffb001] transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="text-[#019992] hover:text-[#ffb001] transition-colors">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-cover bg-fixed bg-center py-32 px-6 text-center text-white" style={{backgroundImage: 'url("/images/cta-bg.jpg")'}}>
        <div className="absolute inset-0 bg-[#019992] opacity-90"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Join Us on Our Journey</h2>
          <p className="text-xl max-w-2xl mx-auto mt-4 mb-8 font-semibold">
            Ready to plan your next adventure with us? Sign up today and discover a new way to travel.
          </p>
          <Button 
            variant="default" 
            size="lg" 
            className="text-lg px-8 py-6 bg-[#ffb001] hover:bg-[#fb475e] text-white transition-colors duration-300"
          >
            Get Started
          </Button>
        </div>
      </section>
    </div>
    <BackToHomeButton />
   </>
  )
}

