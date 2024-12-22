import { Skeleton } from "@/components/ui/skeleton";

export function PricingCardSkeleton() {
  return (
    <div className="w-full md:w-[45%] rounded-xl border border-slate-700/50 bg-slate-200 shadow-sm">
      <div className="p-6">
        {/* Header */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-8 w-28" />
          </div>
          <Skeleton className="h-4 w-[80%]" />
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-[140px]" />
            </div>
          ))}
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
} 