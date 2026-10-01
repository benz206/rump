import { cn } from "@/lib/cn";
import { ui } from "@/config/content";
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label={ui.loading}
      className={cn("shimmer h-5 w-full rounded-md", className)}
    />
  );
}
