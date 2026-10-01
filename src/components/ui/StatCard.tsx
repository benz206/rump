import type { ReactNode } from "react";
export function StatCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: ReactNode;
  caption?: string;
}) {
  return (
    <div className="panel">
      <p className="label">{label}</p>
      <div className="my-5 text-4xl font-medium">{value}</div>
      {caption && <p className="text-sm text-muted">{caption}</p>}
    </div>
  );
}
