export function PricingCardSkeleton() {
  return (
    <div className="w-full md:w-[45%] rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-24 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
            <div className="h-8 w-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
          </div>
          <div className="h-4 w-[80%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
        </div>

        {/* Features */}
        <div className="space-y-3 flex-grow mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              <div className="h-4 w-[80%] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer rounded" />
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8">
          <div className="h-11 w-full rounded-md bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
        </div>
      </div>
    </div>
  );
} 