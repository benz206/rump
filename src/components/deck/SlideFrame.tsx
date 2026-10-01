import type { ReactNode } from "react";
import { brand, ui } from "@/config/content";
export function SlideFrame({
  children,
  index,
  total,
}: {
  children: ReactNode;
  index: number;
  total: number;
}) {
  return (
    <section className="relative flex min-h-screen flex-col px-[7vw] pb-28 pt-12">
      <header className="mb-14 flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-tight">
          {brand.name}.
        </span>
        <span className="label">{ui.template}</span>
        <span className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </header>
      {children}
    </section>
  );
}
