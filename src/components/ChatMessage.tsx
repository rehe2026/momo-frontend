"use client";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

/**
 * Simple markdown-like rendering:
 * - **bold** → <strong>
 * - *italic* → <em>
 * - Newlines → <br>
 * - Lines starting with - or • → list items
 */
function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

export default function ChatMessage({
  role,
  content,
  isStreaming,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} animate-fade-in-up`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] ${
          isAssistant
            ? "bg-white border border-gray-100 shadow-sm"
            : "bg-momo-500 text-white"
        } rounded-2xl ${
          isAssistant ? "rounded-tl-md" : "rounded-tr-md"
        } px-5 py-3.5`}
      >
        {isAssistant && (
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 bg-momo-100 rounded-lg flex items-center justify-center">
              <span className="font-display text-[10px] text-momo-600">M</span>
            </div>
            <span className="text-xs font-medium text-momo-600">Momo</span>
          </div>
        )}

        <div
          className={`chat-message text-[15px] leading-relaxed ${
            isAssistant ? "text-gray-700" : "text-white"
          }`}
          dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
        />

        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-momo-400 rounded-sm ml-0.5 animate-pulse-soft" />
        )}
      </div>
    </div>
  );
}
