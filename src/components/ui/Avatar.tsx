import { theme } from "@/config/theme";
export function Avatar({
  name,
  color = theme.bg,
}: {
  name: string;
  color?: string;
}) {
  return (
    <span
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-medium"
      style={{ backgroundColor: color, color: theme.ink }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
