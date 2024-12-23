import BackToHomeButton from "@/components/shared/backToHomeButton";

export default function PrivacyPolicy() {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#019992]">Privacy Policy</h1>
        <div className="space-y-4">
          <p>
            Your privacy is important to us. It is Tripsy&apos; policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <h2 className="text-2xl font-semibold mt-4 text-[#ffb001]">Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.
          </p>
          <h2 className="text-2xl font-semibold mt-4 text-[#ffb001]">How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
          </ul>
        </div>
        <div className="mt-8 p-4 bg-[#44ee77] bg-opacity-20 rounded-lg">
          <p className="text-[#019992] font-semibold">
            If you have any questions about our Privacy Policy, please contact us.
          </p>
        </div>
        <BackToHomeButton />
      </div>
    )
  }
  
  