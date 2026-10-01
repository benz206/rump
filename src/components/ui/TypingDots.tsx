import { ui } from "@/config/content";
export function TypingDots() {
  return (
    <span
      aria-label={ui.loading}
      role="status"
      className="inline-flex gap-1 rounded-xl bg-bg px-4 py-3"
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1.5 animate-pulse rounded-full bg-muted"
          style={{ animationDelay: `${index * 150}ms` }}
        />
      ))}
    </span>
  );
}
