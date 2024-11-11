// pages/about.js
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-background py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Us
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4">
          Discover who we are, our mission, and what drives us to create the best experience for our users.
        </p>
      </header>

      {/* Our Story Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Founded in 2024, our company was born from the idea that travel planning should be simple, personalized, and stress-free. 
            With a passion for exploring new places and making memories, we’ve built a platform that combines the power of AI with the expertise of seasoned travelers.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            We believe in the magic of travel and the joy of discovering new experiences. Our mission is to make planning your perfect journey as easy as a few clicks.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-muted-foreground">
                To empower travelers with personalized recommendations, helping them discover new destinations and experiences effortlessly.
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-base text-muted-foreground">
                To be the go-to platform for seamless travel planning, making every journey memorable and every adventure uniquely yours.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Our team is made up of passionate travelers, tech enthusiasts, and problem solvers dedicated to making your travel planning as smooth as possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white shadow-md">
              <img src="/images/team1.jpg" alt="Team Member 1" className="w-full h-40 object-cover rounded-t-md" />
              <CardContent className="text-center">
                <h3 className="text-lg font-semibold">Jane Doe</h3>
                <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <img src="/images/team2.jpg" alt="Team Member 2" className="w-full h-40 object-cover rounded-t-md" />
              <CardContent className="text-center">
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md">
              <img src="/images/team3.jpg" alt="Team Member 3" className="w-full h-40 object-cover rounded-t-md" />
              <CardContent className="text-center">
                <h3 className="text-lg font-semibold">Emily Johnson</h3>
                <p className="text-sm text-muted-foreground">Head of Product</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-background py-16 px-6 text-center">
        <h2 className="text-3xl font-bold">Join Us on Our Journey</h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-4">
          Ready to plan your next adventure with us? Sign up today and discover a new way to travel.
        </p>
        <Button variant="default" className="mt-6">
          Get Started
        </Button>
      </section>
    </div>
  );
}
