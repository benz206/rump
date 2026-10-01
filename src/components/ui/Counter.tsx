"use client";
import { useEffect, useState } from "react";
import { timing } from "@/config/content";
import { compact, money, pct } from "@/lib/format";
import { useReducedMotion } from "@/hooks/useReducedMotion";
export function Counter({
  value,
  format = "number",
  ms = timing.countMs,
}: {
  value: number;
  format?: "number" | "currency" | "percent" | "compact";
  ms?: number;
}) {
  const [shown, setShown] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / Math.max(1, ms));
      setShown(value * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, ms, reduced]);
  const current = reduced ? value : shown;
  return (
    <span>
      {format === "currency"
        ? money(current)
        : format === "percent"
          ? pct(current)
          : format === "compact"
            ? compact(current)
            : Math.round(current).toLocaleString("en-US")}
    </span>
  );
}
