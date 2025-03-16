// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { HelpCircleIcon } from 'lucide-react';
// import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Image from 'next/image';
// import { useSession } from "next-auth/react";

// import contentImage1 from "@/public/assets/travel-16.png";
// import contentImage2 from "@/public/assets/travel-14.webp";
// import contentImage3 from "@/public/assets/travel-17.webp";
// import travelBackground2 from "@/public/assets/travel-5.jpeg";
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useEffect, useState } from 'react';

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }
// const dynamicWords = ["WITH POWER OF AI", "ONE CLICK AWAY"];


// export default function LandingPage() {
//   // const [staticTextVar, setStaticTextVar] = useState<string>("");
//   const [dynamicTextVar, setDynamicTextVar] = useState<string[]>([]);
//   useEffect(() => {
//     setDynamicTextVar(dynamicWords);
//     console.log("LandingPage mounted");
//   }, []);

//   const { data: session } = useSession();
//   return (
//     <div className="min-h-screen flex flex-col font-sans bg-white">
//       {/* Updated Header Section */}
//       <div className="relative bg-[#019992] text-white overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <Image
//             src={travelBackground2}
//             alt="Travel Background"
//             layout="fill"
//             objectFit="cover"
//             quality={100}
//           />
//           <div className="absolute inset-0 bg-[#019992] opacity-70"></div>
//         </div>

//         <div className="relative z-10">
//           <nav className="flex justify-between items-center px-6 py-8">
//             <h1 className="text-5xl font-bold font-sans">TRIPSY</h1>
//             <div className="flex space-x-4">
//               <Link href="/about">
//                 <Button variant="ghost" className="text-white hover:text-[#ffb001] border border-white hover:border-[#ffb001] font-semibold">About Us</Button>
//               </Link>
//               {session ? null : (
//                     <Link href="/sign-in">
//                         <Button variant="outline" className="bg-[#ffb001] text-white hover:bg-[#fb475e] border-none font-semibold">Sign In</Button>
//                     </Link>
//                 )}
//             </div>
//           </nav>

//           <header className="flex flex-col justify-center items-center text-center px-4 py-20 space-y-8">
//             <TypewriterEffect
//               dynamicWords={dynamicTextVar}
//               className="text-5xl md:text-6xl font-bold mb-4 text-white"
//               cursorClassName="bg-[#ffb001]"
//             />
//             <p className="text-white text-xl md:text-2xl max-w-2xl">
//               Discover breathtaking destinations and create unforgettable memories with personalized travel recommendations.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md">
//               <div className="relative w-full">
//                 <HelpCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#019992]" />
//                 <Input
//                   type="text"
//                   placeholder="Where do you want to go?"
//                   className="pl-12 py-6 text-md text-[#019992] border-[#44ee77] placeholder:text-[#019992] bg-white rounded-full w-full"
//                 />
//               </div>
//               {session ? (
//                             <Link href="/generator">
//                                 <Button className="bg-[#ffb001] text-white hover:bg-[#fb475e] rounded-full py-6 px-8 text-lg font-semibold transition-all duration-300">
//                                     Start Your Adventure
//                                 </Button>
//                             </Link>
//                         ) : (
//                             <Link href="/sign-in">
//                                 <Button className="bg-[#ffb001] text-white hover:bg-[#fb475e] rounded-full py-6 px-8 text-lg font-semibold transition-all duration-300">
//                                     Start Your Adventure
//                                 </Button>
//                             </Link>
//                         )}
//             </div>
//           </header>

//           <div className="flex justify-center pb-12">
//             <div className="flex space-x-8">
//               {['Personalized Itineraries', 'AI-Powered Recommendations', 'Local Experiences'].map((feature, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <svg className="w-6 h-6 text-[#ffb001]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span className="text-white font-semibold">{feature}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Steps Section */}
//       <section className="my-24 py-12 px-6 text-center space-y-12 bg-[#44ee77] bg-opacity-10">
//         <div className="space-y-4">
//           <p className="text-sm md:text-base uppercase tracking-wide font-semibold text-[#019992]">
//             Hassle-Free Travel
//           </p>
//           <p className="text-3xl md:text-4xl font-bold text-[#019992]">
//             Plan Your Perfect Trip in Three Simple Steps
//           </p>
//         </div>

//         {/* Step Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//           {[
//             { title: "Share Your Preferences", content: "Let us know your travel style, interests, and must-see places to tailor recommendations." },
//             { title: "Get Personalized Suggestions", content: "Receive curated picks for activities, stays, and local experiences that match your profile." },
//             { title: "Enjoy Stress-Free Planning", content: "Save time and enjoy the fun with our easy itinerary and AI-powered trip planning." }
//           ].map((step, index) => (
//             <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#ffb001]">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-[#019992]">Step {index + 1}: {step.title}</CardTitle>
//               </CardHeader>
//               <CardContent className="text-gray-700">
//                 {step.content}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Alternating Content and Image Section */}
//       <section className="py-16 px-6 text-center space-y-16 mb-8">
//         <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto text-[#019992]">
//           Discover the world with tailored travel insights
//         </p>

//         {[
//           {
//             title: "Explore Hidden Gems",
//             content: "Uncover unique destinations and experiences that match your travel style. Whether you're an adventurer, a foodie, or a culture enthusiast, our suggestions are designed to inspire your next journey.",
//             image: contentImage1
//           },
//           {
//             title: "Plan Effortlessly",
//             content: "With our AI-powered suggestions, you can focus on what matters most—enjoying the journey. From customized itineraries to time-saving tips, we make planning your trip simple and stress-free.",
//             image: contentImage2
//           },
//           {
//             title: "Embrace Local Culture",
//             content: "Dive into the heart of every destination by experiencing its vibrant culture, traditions, and flavors. From local festivals and authentic cuisine to hidden markets and traditional crafts, immerse yourself in the unique charm of every place you visit.",
//             image: contentImage3
//           }
//         ].map((item, index) => (
//           <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 mt-8`}>
//             <div className="text-left space-y-8 max-w-md">
//               <h4 className="text-2xl font-bold text-[#019992]">{item.title}</h4>
//               <p className="text-gray-600 font-semibold">
//                 {item.content}
//               </p>
//               <div>
//               {session ? (
//                             <Link href="/generator">
//                                 <Button className="bg-[#ffb001] text-white hover:bg-[#fb475e] rounded-full py-6 px-8 text-lg font-semibold transition-all duration-300">
//                                     Get Started
//                                 </Button>
//                             </Link>
//                         ) : (
//                             <Link href="/sign-in">
//                                 <Button className="bg-[#ffb001] text-white hover:bg-[#fb475e] rounded-full py-6 px-8 text-lg font-semibold transition-all duration-300">
//                                     Get Started
//                                 </Button>
//                             </Link>
//                         )}
//               </div>
//             </div>
//             <div className='py-12'>
//               <Image src={item.image} alt={item.title} width={450} height={400} className="rounded-lg" />
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="py-16 mb-12 px-6 text-center bg-[#44ee77] bg-opacity-10">
//         <h3 className="text-2xl md:text-4xl font-bold mb-6 text-[#019992]">Why choose Tripsy?</h3>
//         <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-600 font-semibold">
//           At Tripsy, we redefine travel planning with cutting-edge AI, user-centric design, and personalized recommendations, making every journey a seamless adventure.
//         </p>

//         {/* Features Section */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-8">
//           {[
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               ),
//               title: "AI-Powered Insights",
//               description: "Harness the power of AI to get tailored travel suggestions based on your interests and preferences."
//             },
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//                 </svg>
//               ),
//               title: "Effortless Planning",
//               description: "Our user-friendly interface simplifies the trip planning process, so you can focus on the adventure."
//             },
//             {
//               icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
//                 </svg>
//               ),
//               title: "Seamless Experience",
//               description: "From curated recommendations to organized itineraries, enjoy hassle-free travel from start to finish."
//             }
//           ].map((feature, index) => (
//             <div key={index} className="flex flex-col items-center text-center max-w-sm space-y-4">
//               <div className="bg-[#ffb001] text-white rounded-full p-4">
//                 {feature.icon}
//               </div>
//               <h4 className="text-xl font-semibold text-[#019992]">{feature.title}</h4>
//               <p className="text-gray-600 font-semibold">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter Section */}
//       <section className="py-16 px-6 text-center space-y-8 bg-[#019992] text-white rounded-lg mx-6">
//         <h3 className="text-4xl font-bold">Stay Inspired</h3>
//         <p className="text-xl font-semibold">
//           Subscribe to our newsletter for the latest updates and travel insights.
//         </p>
//         <div className="flex items-center justify-center mt-4">
//           <Input
//             type="email"
//             placeholder="Enter your email"
//             className="max-w-md text-[#019992] placeholder:text-[#019992] bg-white placeholder:font-semibold"
//           />
//           <Button className="ml-2 bg-[#ffb001] text-white hover:bg-[#fb475e] font-semibold">
//             Subscribe
//           </Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#019992] text-white py-8 mt-12">
//         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-6">
//           <div className="text-2xl font-bold">TRIPSY</div>
//           <div className="flex space-x-6">
//             <Link href="/privacy-policy" className="hover:text-[#ffb001] font-semibold">
//               Privacy Policy
//             </Link>
//             <Link href="/terms-of-service" className="hover:text-[#ffb001] font-semibold">
//               Terms of Service
//             </Link>
//             <Link href="/contact-us" className="hover:text-[#ffb001] font-semibold">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




import Header from '@/components/landing-page/header'
import Hero from '@/components/landing-page/Hero'
import Features from '@/components/landing-page/Features'
import HowItWorks from '@/components/landing-page/HowItWorks'
import CallToAction from '@/components/landing-page/CallToAction'
import Footer from '@/components/landing-page/footer'
import Highlights from '@/components/landing-page/Highlights'
import FeatureDemo from '@/components/landing-page/FeatureDemo'
// import TryItNowSection from '@/components/landing-page/TryItNowSection'
// import EmailCapture from '@/components/landing-page/EmailCapture'

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <main>
        <Hero />
        <FeatureDemo />
        {/* <TryItNowSection /> */}
        <Features />
        <Highlights />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}


