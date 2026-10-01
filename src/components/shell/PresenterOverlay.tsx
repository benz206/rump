import { nextLine, scriptForScreen, timing, ui } from "@/config/content";
import { clock } from "@/lib/format";
import { cn } from "@/lib/cn";
export function PresenterOverlay({
  screen,
  elapsed,
}: {
  screen: string;
  elapsed: number;
}) {
  const lines = scriptForScreen(screen);
  const current = lines.findLast((line) => line.at <= elapsed) ?? lines[0];
  const next = nextLine(elapsed);
  const behind =
    current &&
    elapsed > (nextLine(current.at)?.at ?? Infinity) + timing.behindSeconds;
  return (
    <aside
      className={cn(
        "fixed bottom-24 left-6 z-[60] w-80 rounded-xl border p-5 text-xs shadow-sm",
        behind ? "border-negative bg-bg text-negative" : "bg-surface",
      )}
    >
      <div className="mb-4 flex justify-between font-mono">
        <span>{screen}</span>
        <span>{clock(elapsed)}</span>
      </div>
      <p className="label">{ui.current}</p>
      <p className="mt-1 leading-5">{current?.line ?? ui.finished}</p>
      {current?.action && <p className="mt-2 italic">{current.action}</p>}
      <p className="label mt-4">{ui.upcoming}</p>
      <p className="mt-1 leading-5 text-muted">{next?.line ?? ui.finished}</p>
    </aside>
  );
}
