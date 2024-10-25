
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


// pages/index.js
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircleIcon } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-background border-b shadow-sm">
        <h1 className="text-xl font-semibold">Tripsy</h1>
        <div className="flex space-x-4">
          <Link href="/about">
            <Button variant="ghost">About Us</Button>
          </Link>
          <Link href="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-grow flex flex-col justify-center items-center text-center px-6 py-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">
          Plan your perfect journey, one click away.
        </h2>
        <p className="text-muted-foreground text-base max-w-lg">
          Personalized picks for activities, stays, and more—just for you.
        </p>

        {/* Input Section */}
        <div className="flex items-center mt-6 space-x-2 w-full max-w-md">
          <div className="relative w-full">
            <HelpCircleIcon className="absolute left-3 top-2.5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Where do you want to go?"
              className="pl-10"
            />
          </div>
          <Button variant="default">Start planning!</Button>
        </div>
      </header>

      {/* Steps Section */}
      <section className="bg-background py-16 px-6 text-center space-y-6">
        <h3 className="text-sm text-muted-foreground">3 STEPS TO THE PERFECT TRIP</h3>
        <div className="space-y-2">
          <p className="text-3xl md:text-4xl font-bold">
            FIND TRAVEL PERFECTION, WITH THE WISDOM OF AI
          </p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Step 1: Share Your Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              Let us know your travel style, interests, and must-see places to tailor recommendations.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Step 2: Get Personalized Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              Receive curated picks for activities, stays, and local experiences that match your profile.
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md p-4">
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
      <section className="bg-background py-16 px-6 text-center space-y-6">
        <h3 className="text-sm text-muted-foreground">TRAVEL MADE EASY</h3>
        <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
          Discover the world with tailored travel insights
        </p>

        {/* Content with Image on Right */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          <div className="text-left space-y-4 max-w-md">
            <h4 className="text-xl font-semibold">Explore Hidden Gems</h4>
            <p className="text-base">
              Uncover unique destinations and experiences that match your travel style, from bustling cities to serene retreats.
            </p>
          </div>
          <img src="/images/destination1.jpg" alt="Destination" className="w-full md:w-1/2 rounded-lg shadow-md" />
        </div>

        {/* Content with Image on Left */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 mt-8">
          <div className="text-left space-y-4 max-w-md">
            <h4 className="text-xl font-semibold">Plan Effortlessly</h4>
            <p className="text-base">
              With our AI-powered suggestions, you can focus on what matters most—enjoying the journey.
            </p>
          </div>
          <img src="/images/destination2.jpg" alt="Planning" className="w-full md:w-1/2 rounded-lg shadow-md" />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-16 px-6 text-center space-y-4">
        <h3 className="text-2xl font-bold">Newsletter</h3>
        <p className="text-base text-muted-foreground">
          Subscribe to our newsletter for the latest updates and travel insights.
        </p>
        <div className="flex items-center justify-center mt-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-md"
          />
          <Button variant="default" className="ml-2">
            Subscribe
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-16 px-6 text-center space-y-6">
        <h3 className="text-sm text-muted-foreground">WHAT OUR USERS SAY</h3>
        <p className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
          Real experiences from happy travelers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-md p-4">
            <CardContent>
              <p className="text-base">
                “This app made planning my vacation so easy! The suggestions were spot on and saved me so much time.”
              </p>
              <p className="mt-4 font-semibold">- Alex M.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md p-4">
            <CardContent>
              <p className="text-base">
                “I discovered places I never would have found on my own. Truly an amazing experience thanks to this app!”
              </p>
              <p className="mt-4 font-semibold">- Priya K.</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-md p-4">
            <CardContent>
              <p className="text-base">
                “A must-have for anyone looking to explore the world with personalized recommendations.”
              </p>
              <p className="mt-4 font-semibold">- John D.</p>
            </CardContent>
          </Card>
        </div>
      </section>

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



