import BackToHomeButton from "@/components/shared/backToHomeButton";

export default function TermsOfService() {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#019992]">Terms of Service</h1>
        <div className="space-y-4">
          <p>
            By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>
          <h2 className="text-2xl font-semibold mt-4 text-[#ffb001]">Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Tripsy&apos;website for personal, non-commercial transitory viewing only.
          </p>
          <h2 className="text-2xl font-semibold mt-4 text-[#ffb001]">Disclaimer</h2>
          <p>
            The materials on Tripsy website are provided on an &apos;as is&apos; basis. Tripsy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>
        <div className="mt-8 p-4 bg-[#fb475e] bg-opacity-20 rounded-lg">
          <p className="text-[#fb475e] font-semibold">
            By using our services, you agree to these terms. Please read them carefully.
          </p>
        </div>
        <BackToHomeButton />
      </div>
    )
  }
  
  