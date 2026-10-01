import { ticker } from "@/config/content";
export function StatementTicker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-12 top-1/3 h-48 overflow-hidden opacity-10"
    >
      <div className="ticker space-y-8 font-mono text-sm">
        {[...ticker, ...ticker].map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}
