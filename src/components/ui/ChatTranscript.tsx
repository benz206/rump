"use client";
import { useEffect, useState } from "react";
import { timing } from "@/config/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChatBubble, type Message } from "./ChatBubble";
import { TypingDots } from "./TypingDots";
export function ChatTranscript({
  messages,
  delayMs = timing.messageMs,
}: {
  messages: Message[];
  delayMs?: number;
}) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const timer = setInterval(
      () => setCount((value) => Math.min(value + 1, messages.length)),
      delayMs,
    );
    return () => clearInterval(timer);
  }, [messages.length, delayMs]);
  const visible = reduced ? messages.length : count;
  return (
    <div className="space-y-3" role="log" aria-live="polite">
      {messages.slice(0, visible).map((message) => (
        <ChatBubble key={message.id} {...message} />
      ))}
      {visible < messages.length && <TypingDots />}
    </div>
  );
}
