"use client"

import GeneratorForm from "@/features/itenary-generator/_components/generator-form"

export default function ItineraryGeneratorPage() {

  {/** LATEST FORM STARTS HERE */}
  return(
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <main className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#019992] mb-2">Plan Your Dream Trip</h2>
        <h3 className="text-lg text-gray-600">Fill out the form below to let us know your travel preferences.</h3>
      </div>
    {/** FORM STARTS HERE */}
    <GeneratorForm />
    </main>

    <footer className="mt-8 text-white text-sm">
      <small>
        <a href="/privacy-policy" className="hover:text-[#fb475e] transition duration-300 ease-in-out">
          Privacy Policy
        </a>{" "}
        •
        <a href="/terms-of-service" className="hover:text-[#fb475e] transition duration-300 ease-in-out ml-2">
          Terms of Service
        </a>
      </small>
    </footer>
  </div>  
  )
}