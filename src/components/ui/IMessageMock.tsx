import { ui } from "@/config/content";
import { ChatTranscript } from "./ChatTranscript";
import type { Message } from "./ChatBubble";
export function IMessageMock({ messages }: { messages: Message[] }) {
  return (
    <div className="mx-auto self-start min-h-80 max-w-72 rounded-[32px] border-4 border-ink bg-surface p-5">
      <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-ink" />
      <p className="mb-6 border-b pb-4 text-center text-xs text-muted">
        {ui.phone}
      </p>
      <ChatTranscript messages={messages} />
    </div>
  );
}
