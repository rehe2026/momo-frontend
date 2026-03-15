import { NextRequest, NextResponse } from "next/server";
import { sendToLangdock, streamFromLangdock, type ChatMessage } from "@/lib/langdock";
import { AGENT_SEQUENCE } from "@/lib/agentSequence";

interface ChatRequestBody {
  agentKey: string;
  messages: ChatMessage[];
  stream?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { agentKey, messages, stream = true } = body;

    const step = AGENT_SEQUENCE.find((s) => s.key === agentKey);
    if (!step) {
      return NextResponse.json({ error: "Unknown agent key: " + agentKey }, { status: 400 });
    }
    if (!step.agentId) {
      return NextResponse.json({ error: "Agent ID not configured for: " + agentKey }, { status: 500 });
    }
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    if (!stream) {
      const content = await sendToLangdock(step.agentId, messages);
      return NextResponse.json({ content });
    }

    const content = await streamFromLangdock(step.agentId, messages);
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
