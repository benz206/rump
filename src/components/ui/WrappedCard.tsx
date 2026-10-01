export function WrappedCard({
  title,
  value,
  body,
}: {
  title: string;
  value: string;
  body: string;
}) {
  return (
    <article className="flex min-h-[58vh] flex-col justify-between rounded-2xl border bg-surface p-10">
      <h2 className="text-2xl">{title}</h2>
      <div className="my-12 text-6xl font-medium tracking-tight lg:text-8xl">
        <mark className="bg-accent px-2 text-ink">{value}</mark>
      </div>
      <p className="text-muted">{body}</p>
    </article>
  );
}
