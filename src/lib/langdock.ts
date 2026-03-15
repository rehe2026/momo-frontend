const LANGDOCK_API_URL = "https://api.langdock.com/agent/v1/chat/completions";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  parts: { type: "text"; text: string }[];
}

interface LangdockResponse {
  messages?: { id: string; role: string; content: string }[];
  result?: any[];
}

function extractText(data: LangdockResponse): string {
  // Primär: messages[0].content (Agents API Format)
  if (data.messages && Array.isArray(data.messages)) {
    for (const msg of data.messages) {
      if (msg.role === "assistant" && typeof msg.content === "string" && msg.content.trim()) {
        return msg.content;
      }
    }
  }
  // Fallback: Text aus result-Array
  if (data.result && Array.isArray(data.result)) {
    for (const entry of data.result) {
      if (entry.role === "assistant" && Array.isArray(entry.content)) {
        for (const block of entry.content) {
          if (block.type === "text" && typeof block.text === "string" && block.text.trim()) {
            return block.text;
          }
        }
      }
      if (entry.role === "assistant" && typeof entry.content === "string" && entry.content.trim()) {
        return entry.content;
      }
    }
  }
  return "";
}

async function callApi(agentId: string, messages: ChatMessage[]): Promise<LangdockResponse> {
  const apiKey = process.env.LANGDOCK_API_KEY;
  if (!apiKey) throw new Error("LANGDOCK_API_KEY not configured");
  const response = await fetch(LANGDOCK_API_URL, {
    method: "POST",
    headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ agentId, messages, stream: false, maxSteps: 10 }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("Langdock API error " + response.status + ": " + errorText);
  }
  return response.json();
}

// Kein Retry mehr - ein Call, Text zurückgeben was da ist
async function callOnce(agentId: string, messages: ChatMessage[]): Promise<string> {
  const data = await callApi(agentId, messages);
  const text = extractText(data);
  console.log("LANGDOCK text_len=" + text.length + " text=" + (text || "(empty)").slice(0, 150));
  return text;
}

export async function sendToLangdock(agentId: string, messages: ChatMessage[]): Promise<string> {
  return callOnce(agentId, messages);
}

export async function streamFromLangdock(agentId: string, messages: ChatMessage[]): Promise<string> {
  return callOnce(agentId, messages);
}

export function generateMessageId(): string {
  return "msg_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}
