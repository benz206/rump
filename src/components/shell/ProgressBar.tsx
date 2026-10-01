import { ui } from "@/config/content";
export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      role="progressbar"
      aria-label={ui.progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className="fixed inset-x-0 top-0 z-40 h-1 bg-line"
    >
      <div
        className="h-full bg-ink transition-all"
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}
