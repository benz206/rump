import { ArrowUpRight } from "lucide-react";
import { brand, sidebarNav, steps, ui } from "@/config/content";
export function Sidebar({
  active,
  goTo,
}: {
  active: string;
  goTo: (id: string) => void;
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-surface p-6 xl:flex">
      <div className="mb-14 flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-tight">
          {brand.name}
          <span className="text-muted">.</span>
        </span>
        <ArrowUpRight size={20} />
      </div>
      <p className="label mb-4">{ui.nav}</p>
      <nav className="space-y-1">
        {sidebarNav.map((item) => {
          const target =
            steps.find((step) => step.nav === item)?.id ??
            (item === "Wrapped" ? "wrapped" : undefined);
          return (
            <button
              key={item}
              disabled={!target}
              onClick={() => target && goTo(target)}
              aria-current={active === item ? "page" : undefined}
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm disabled:opacity-50 ${active === item ? "bg-bg font-medium" : "text-muted"}`}
            >
              {item}
            </button>
          );
        })}
      </nav>
      <p className="mt-auto pt-12 text-xs text-muted">{brand.tagline}</p>
    </aside>
  );
}
