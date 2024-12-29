import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GetStarted() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4 text-blueGreen">Ready to Start Planning?</h3>
      <p className="text-gray-600 mb-4">
        Create an account to start generating AI-powered itineraries for your next adventure.
      </p>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-blueGreen">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" className="border-blueGreen focus:ring-mint" />
        </div>
        <div>
          <Label htmlFor="password" className="text-blueGreen">Password</Label>
          <Input id="password" type="password" placeholder="Create a password" className="border-blueGreen focus:ring-mint" />
        </div>
        <Button className="w-full bg-orange text-white hover:bg-opacity-90">Create Account</Button>
      </div>
      <p className="text-sm text-center text-gray-600">
        By signing up, you agree to our <span className="text-red">Terms of Service</span> and <span className="text-red">Privacy Policy</span>.
      </p>
    </div>
  )
}

