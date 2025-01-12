import { Card, CardContent} from "@/components/ui/card"

export default function MagicLinkConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-9 px-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#019992] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-gray-900">Check your email</h1>
            <p className="text-gray-600 mb-6">
            A sign in link has been sent your email address
            </p>
            <div className="flex justify-center space-x-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#ffb001]"></div>
              <div className="w-2 h-2 rounded-full bg-[#019992]"></div>
              <div className="w-2 h-2 rounded-full bg-[#fb475e]"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

