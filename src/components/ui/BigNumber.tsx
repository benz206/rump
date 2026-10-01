import { Counter } from "./Counter";
export function BigNumber({
  value,
  caption,
  source,
}: {
  value: string | number;
  caption: string;
  source?: string;
}) {
  return (
    <div>
      <div className="text-6xl font-medium tracking-tight lg:text-8xl">
        <mark className="bg-accent px-2 text-ink">
          {typeof value === "number" ? <Counter value={value} /> : value}
        </mark>
      </div>
      <p className="mt-6 text-lg">{caption}</p>
      {source && <p className="mt-4 text-xs text-muted">{source}</p>}
    </div>
  );
}
