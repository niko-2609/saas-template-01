import { Skeleton } from "@/components/ui/skeleton";

export function PricingCardSkeleton() {
  return (
    <div className="w-full md:w-[45%] rounded-xl border border-slate-700/50 bg-slate-800 shadow-sm h-full">
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 bg-slate-700/50" />
            <Skeleton className="h-8 w-28 bg-slate-700/50" />
          </div>
          <Skeleton className="h-4 w-[80%] bg-slate-700/50" />
        </div>

        {/* Features - This will take up the flexible space */}
        <div className="space-y-3 flex-grow">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full bg-slate-700/50" />
              <Skeleton className="h-4 w-[140px] bg-slate-700/50" />
            </div>
          ))}
        </div>

        {/* Button - This will stay at the bottom */}
        <div className="mt-6">
          <Skeleton className="h-10 w-full rounded-md bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
} 