
export function PricingCardSkeleton() {
  return (
    <div className="w-full md:w-[75%] rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-6 flex flex-col h-full w-full space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
            <div className="h-8 w-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
          </div>
          <div className="h-4 w-[80%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
        </div>

        {/* Features */}
        <div className="space-y-3 flex-grow">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              <div className="h-4 w-[80%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-6">
          <div className="h-10 w-full rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
        </div>
      </div>
    </div>
  );
} 