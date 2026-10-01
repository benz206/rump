import { cn } from "@/lib/cn";
export function PipelineDiagram({
  nodes,
  active,
}: {
  nodes: string[];
  active: string;
}) {
  return (
    <ol className="space-y-2">
      {nodes.map((node, index) => (
        <li
          key={node}
          aria-current={node === active ? "step" : undefined}
          className={cn(
            "flex items-center gap-4 rounded-lg border p-3 text-sm",
            node === active ? "border-accent bg-accent" : "bg-surface",
          )}
        >
          <span className="font-mono text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          {node}
        </li>
      ))}
    </ol>
  );
}
