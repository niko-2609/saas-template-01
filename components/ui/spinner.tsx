import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12"
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[100px]">
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
    </div>
  );
} 