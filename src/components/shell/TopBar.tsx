import { Search } from "lucide-react";
import { ui } from "@/config/content";
export function TopBar({ connected }: { connected: number }) {
  return (
    <header className="flex h-20 items-center justify-between gap-6 border-b bg-surface px-8">
      <label className="flex items-center gap-3 text-muted">
        <Search size={16} />
        <input
          aria-label={ui.search}
          placeholder={ui.search}
          className="w-48 bg-transparent text-sm outline-none"
        />
      </label>
      <span className="rounded-full border px-3 py-1.5 text-xs">
        {ui.connected} {connected} {ui.sources}
      </span>
    </header>
  );
}
