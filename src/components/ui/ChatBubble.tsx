import { cn } from "@/lib/cn";
export type Message = { id: string; text: string; side: "left" | "right" };
export function ChatBubble({ text, side }: Omit<Message, "id">) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
        side === "right" ? "ml-auto bg-ink text-surface" : "bg-bg text-ink",
      )}
    >
      {text}
    </div>
  );
}
