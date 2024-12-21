/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.js
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircleIcon } from 'lucide-react';
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Image from 'next/image';

import contentImage1 from "@/public/assets/travel-16.png";
import contentImage2 from "@/public/assets/travel-14.webp";
import  contentImage3 from "@/public/assets/travel-17.webp";


/** 
 * This is typescript specific. 
 * This allows the client-side (browser) window to recognize the razorpay object that will be used for payments.
 * Typescript now recognizes the Razorpay object and will not throw errors.
 * 
*/
declare global {
  interface Window {
    Razorpay: any;
  }
}


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      {/* <div className="bg-center bg-[url('/assets/travel-5.jpeg')] min-h-[100vh] bg-cover flex flex-col"> */}
      <div className="bg-slate-800 text-white">
        <nav className="flex justify-between items-center px-6 py-8 mb-16">
          <h1 className="text-5xl font-bold font-sans">TRIPSY</h1>
          <div className="flex space-x-4">
            <Link href="/about">
              <Button variant="ghost">About Us</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="primary">Sign In</Button>
            </Link>
          </div>
        </nav>
        {/* Hero/Header Section */}
        <header className="flex-grow flex flex-col justify-center items-center text-center px-4 py-8 space-y-4 min-h-[50px]">
          <h2 className="mb-4">
            <TypewriterEffect staticText="PLAN YOUR PERFECT JOURNEY" dynamicWords={["WITH POWER OF AI", "ONE CLICK AWAY."]} />
          </h2>
          <p className="text-white text-base max-w-lg">
            Personalized picks for activities, routes and more—just for you.
          </p>

          {/* Input Section */}
          <div className="flex items-center space-x-2 w-full max-w-md">
            <div className="relative w-full">
              <HelpCircleIcon className="absolute left-3 top-1.5 text-white" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                className="pl-12 text-md text-white border-white-500 placeholder:text-white"
              />
            </div>
            <Button variant="primary">Start planning!</Button>
          </div>
        </header>
      </div>


      {/* Steps Section */}
      <section className="my-24 py-4 px-6 text-center space-y-6">
        <div className="space-y-2">
          <p className="text-sm md:text-base uppercase tracking-wide font-semibold">
            Hassle-Free Travel
          </p>
          <p className="text-3xl md:text-3xl font-bold">
            Plan Your Perfect Trip in Three Simple Steps
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-slate-800 text-white shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Step 1: Share Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              Let us know your travel style, interests, and must-see places to tailor recommendations.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Step 2: Get Personalized Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              Receive curated picks for activities, stays, and local experiences that match your profile.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Step 3: Enjoy Stress-Free Planning</CardTitle>
            </CardHeader>
            <CardContent>
              Save time and focus on the fun with our AI-powered trip planning and easy-to-follow itinerary.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alternating Content and Image Section */}
      <section className="bg-background py-16 px-6 text-center space-y-6 mb-8 rounded-md">
        {/* <h3 className="text-sm md:text-base text-gray-300 uppercase tracking-wide font-semibold">TRAVEL MADE EASY</h3> */}
        <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
          Discover the world with tailored travel insights
        </p>

        {/* Content with Image on Right */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 rounded-lg  bg-slate-800 text-white">
          <div className="text-left space-y-4 max-w-md mr-4 pr-24">
            <h4 className="text-xl font-semibold">Explore Hidden Gems</h4>
            <p className="text-base">
              Uncover unique destinations and experiences that match your travel style. Whether you&apos;re an adventurer, a foodie, or a culture enthusiast, our suggestions are designed to inspire your next journey. Dive deeper into lesser-known attractions, meet locals, and discover the stories that make each place truly unforgettable.
            </p>

           <div className="mt-16">
           <Link href="/sign-in">
              <Button variant="primary">Get Started</Button>
            </Link>
           </div>
          </div>
          <div className='py-12'>
            <Image src={contentImage1} alt="Destination" width={350} height={300} className="rounded-lg" />
          </div>
         
        </div>

        {/* Content with Image on Left */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 mt-8">
          <div className="text-left space-y-4 max-w-md ml-24 pl-20">
            <h4 className="text-xl font-semibold">Plan Effortlessly</h4>
            <p className="text-base">
              With our AI-powered suggestions, you can focus on what matters most—enjoying the journey. From customized itineraries to time-saving tips, we make planning your trip simple and stress-free. Stay ahead with real-time updates, local recommendations, and expert advice tailored just for you, so you never miss a moment of excitement.
            </p>
            <div className="mt-16">
           <Link href="/sign-in">
              <Button variant="primary">Get Started</Button>
            </Link>
           </div>
          </div>
          {/* <Image src={contentImage2} alt="Destination" width={350} height={400} className="rounded-lg" /> */}
          <div className='items-center flex py-12'>
            <Image src={contentImage2} alt="Destination" width={350} height={300} className="rounded-lg" />
          </div>
        </div>

        {/* Content with Image on Right */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 rounded-lg bg-slate-800 text-white">
          <div className="text-left space-y-4 max-w-md mr-4 pr-24">
            <h4 className="text-xl font-semibold">Embrace Local Culture</h4>
            <p className="text-base">
              Dive into the heart of every destination by experiencing its vibrant culture, traditions, and flavors. From local festivals and authentic cuisine to hidden markets and traditional crafts, immerse yourself in the unique charm of every place you visit, creating unforgettable memories along the way.
            </p>
            <div className="mt-16">
           <Link href="/sign-in">
              <Button variant="primary">Get Started</Button>
            </Link>
           </div>
          </div>
          <div className="py-12">
            <Image src={contentImage3} alt="Local Culture" width={350} height={300} className="rounded-lg" />
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-16 mb-12 px-6 text-center">
        <h3 className="text-2xl md:text-4xl font-bold mb-6">Why choose Tripsy?</h3>
        <p className="text-base max-w-2xl mx-auto mb-12">
          At Tripsy, we redefine travel planning with cutting-edge AI, user-centric design, and personalized recommendations, making every journey a seamless adventure.
        </p>

        {/* Features Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center max-w-md space-y-4">
            <div className="bg-orange-200 text-orange-600 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21H9m0 0V3m0 18a8 8 0 1012-6h-3m-7 6h4"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold">AI-Powered Insights</h4>
            <p className="text-sm text-gray-600">
              Harness the power of AI to get tailored travel suggestions based on your interests and preferences.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center  max-w-md space-y-4">
            <div className="bg-blue-200 text-blue-600 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v5a2 2 0 002 2h3l3 3V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold">Effortless Planning</h4>
            <p className="text-sm text-gray-600">
              Our user-friendly interface simplifies the trip planning process, so you can focus on the adventure.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center  max-w-md space-y-4">
            <div className="bg-green-200 text-green-600 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5-5 5m-6-5h6"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold">Seamless Experience</h4>
            <p className="text-sm text-gray-600">
              From curated recommendations to organized itineraries, enjoy hassle-free travel from start to finish.
            </p>
          </div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-16 px-6 text-center space-y-4 bg-slate-800 text-white rounded-lg">
        <h3 className="text-4xl font-bold">Newsletter</h3>
        <p className="text-base text-white">
          Subscribe to our newsletter for the latest updates and travel insights.
        </p>
        <div className="flex items-center justify-center mt-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-md placeholder:text-white"
          />
          <Button variant="primary" className="ml-2">
            Subscribe
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="bg-background py-16 px-6 text-center space-y-6 my-12">
        <h3 className="text-md text-bold text-slate-500">WHAT OUR USERS SAY</h3>
        <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
          Real experiences from happy travelers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-md p-4 bg-slate-800 text-white">
            <CardContent>
              <p className="text-base">
                “This app made planning my vacation so easy! The suggestions were spot on and saved me so much time.”
              </p>
              <p className="mt-4 font-semibold">- Alex M.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white shadow-md p-4">
            <CardContent>
              <p className="text-base">
                “I discovered places I never would have found on my own. Truly an amazing experience thanks to this app!”
              </p>
              <p className="mt-4 font-semibold">- Priya K.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white shadow-md p-4">
            <CardContent>
              <p className="text-base">
                “A must-have for anyone looking to explore the world with personalized recommendations.”
              </p>
              <p className="mt-4 font-semibold">- John D.</p>
            </CardContent>
          </Card>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-background py-6  border-t">
        <div className="max-w-sm mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
          <Link href="/contact-us" className="text-muted-foreground hover:text-primary">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}






