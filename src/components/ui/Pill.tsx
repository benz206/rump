import { ui } from "@/config/content";
import { cn } from "@/lib/cn";
export type Status = keyof typeof ui.status;
export function Pill({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        status === "saved"
          ? "border-positive/20 bg-positive/10 text-positive"
          : "bg-bg text-ink",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full bg-current",
          status === "running" && "animate-pulse",
        )}
      />
      {ui.status[status]}
    </span>
  );
}
