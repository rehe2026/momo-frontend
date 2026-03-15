"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import ChatMessage from "./ChatMessage";
import BaseIdInput from "./BaseIdInput";
import TransitionScreen from "./TransitionScreen";
import ProgressBar from "./ProgressBar";
import { AGENT_SEQUENCE, getNextStep } from "@/lib/agentSequence";
import { generateMessageId } from "@/lib/langdock";
import type { ChatMessage as ChatMessageType } from "@/lib/langdock";

type Phase = "idle" | "initializing" | "chatting" | "transitioning" | "complete";

interface DisplayMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const AGENT_COMPLETE_TAG = "[AGENT_COMPLETE]";

export default function ChatInterface() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [baseId, setBaseId] = useState("");
  const [userName, setUserName] = useState("");
  const [currentStepKey, setCurrentStepKey] = useState("");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ChatMessageType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [transitionMessage, setTransitionMessage] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (phase === "chatting" && !isLoading) {
      inputRef.current?.focus();
    }
  }, [phase, isLoading]);

  const callAgent = useCallback(
    async (agentKey: string, history: ChatMessageType[]): Promise<string> => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentKey, messages: history, stream: true }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API-Fehler");
      }
      const data = await res.json();
      return data.content || "";
    },
    []
  );

  const callAgentNonStreaming = useCallback(
    async (agentKey: string, messageText: string): Promise<string> => {
      const msg: ChatMessageType = {
        id: generateMessageId(),
        role: "user",
        parts: [{ type: "text", text: messageText }],
      };
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentKey, messages: [msg], stream: false }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "API-Fehler");
      }
      const data = await res.json();
      return data.content || "";
    },
    []
  );

  const callAgentWithAutoRetry = useCallback(
    async (agentKey: string, history: ChatMessageType[], maxRetries: number = 2): Promise<string> => {
      let currentHistory = history;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const response = await callAgent(agentKey, currentHistory);

        if (response.trim().length > 0) {
          return response;
        }

        if (attempt < maxRetries) {
          console.log("Empty response, silent retry in 4s (attempt " + (attempt + 1) + ")");
          await new Promise(r => setTimeout(r, 4000));

          const silentMsg: ChatMessageType = {
            id: generateMessageId(),
            role: "user",
            parts: [{ type: "text", text: "." }],
          };
          currentHistory = [...currentHistory, silentMsg];
        }
      }

      return "Einen Moment, ich verarbeite die Daten... Schreib mir einfach nochmal, dann geht es weiter!";
    },
    [callAgent]
  );

  const handleAgentResponse = useCallback(
    async (content: string, stepKey: string) => {
      let displayContent = content;
      let shouldAdvance = false;

      if (content.includes(AGENT_COMPLETE_TAG)) {
        displayContent = content.replace(AGENT_COMPLETE_TAG, "").trim();
        shouldAdvance = true;
      }

      if (displayContent) {
        const assistantMsg: DisplayMessage = {
          id: generateMessageId(),
          role: "assistant",
          content: displayContent,
        };
        setMessages((prev) => [...prev, assistantMsg]);

        const historyMsg: ChatMessageType = {
          id: assistantMsg.id,
          role: "assistant",
          parts: [{ type: "text", text: displayContent }],
        };
        setConversationHistory((prev) => [...prev, historyMsg]);
      }

      if (shouldAdvance) {
        const nextStep = getNextStep(stepKey);
        if (nextStep) {
          await startAgent(nextStep.key, baseId);
        } else {
          await finishOnboarding();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseId]
  );

  const startAgent = useCallback(
    async (stepKey: string, overrideBaseId?: string) => {
      const effectiveBaseId = overrideBaseId || baseId;
      const step = AGENT_SEQUENCE.find((s) => s.key === stepKey);
      if (!step) return;

      setCurrentStepKey(stepKey);

      if (!step.interactive) {
        if (stepKey === "orchestrator_init") {
          setPhase("initializing");
          try {
            const response = await callAgentNonStreaming("orchestrator_init", "INIT base_id=" + effectiveBaseId);
            console.log("Orchestrator response:", response);

            const lowerResponse = response.toLowerCase();
            const isError = lowerResponse.includes("fehler") || lowerResponse.includes("error") || lowerResponse.includes("not found") || lowerResponse.includes("nicht gefunden") || lowerResponse.includes("existiert nicht");

            if (isError || response.trim().length === 0) {
              setError("Diese Base-ID wurde nicht erkannt. Bitte prüfe deine Eingabe oder kontaktiere Rebecca.");
              setPhase("idle");
              return;
            }

            const nameMatch = response.match(/user_name=(\S+)/);
            if (nameMatch) {
              setUserName(nameMatch[1]);
            }

            const nextStep = getNextStep(stepKey);
            if (nextStep) {
              await startAgent(nextStep.key, effectiveBaseId);
            }
          } catch (err) {
            setError("Die Base-ID konnte nicht überprüft werden. Bitte versuche es erneut.");
            setPhase("idle");
          }
        } else if (stepKey === "orchestrator_end") {
          await finishOnboarding();
        }
        return;
      }

      setPhase("transitioning");
      setTransitionMessage(step.description);
      setConversationHistory([]);
      setMessages([]);

      await new Promise((r) => setTimeout(r, 1500));

      setPhase("chatting");

      const initMsg: ChatMessageType = {
        id: generateMessageId(),
        role: "user",
        parts: [{ type: "text", text: "Base-ID: " + effectiveBaseId }],
      };
      setConversationHistory([initMsg]);
      setIsLoading(true);

      try {
        const response = await callAgentWithAutoRetry(stepKey, [initMsg], 2);
        await handleAgentResponse(response, stepKey);
      } catch (err) {
        setError("Fehler bei " + step.label + ": " + (err instanceof Error ? err.message : "Unbekannter Fehler"));
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseId, callAgentNonStreaming, callAgentWithAutoRetry]
  );

  const finishOnboarding = useCallback(async () => {
    setPhase("transitioning");
    setTransitionMessage("Momo schließt alles für euch ab…");

    try {
      await callAgentNonStreaming("orchestrator_end", "COMPLETE base_id=" + baseId);
    } catch (err) {
      console.error("Orchestrator end error:", err);
    }

    setPhase("complete");
  }, [baseId, callAgentNonStreaming]);

  const handleBaseIdSubmit = async (id: string) => {
    setBaseId(id);
    setError("");
    await startAgent("orchestrator_init", id);
  };

  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setInputValue("");
    setError("");

    const userMsg: DisplayMessage = {
      id: generateMessageId(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    const historyMsg: ChatMessageType = {
      id: userMsg.id,
      role: "user",
      parts: [{ type: "text", text }],
    };
    const updatedHistory = [...conversationHistory, historyMsg];
    setConversationHistory(updatedHistory);
    setIsLoading(true);

    try {
      const response = await callAgentWithAutoRetry(currentStepKey, updatedHistory, 2);
      await handleAgentResponse(response, currentStepKey);
    } catch (err) {
      setError("Nachricht konnte nicht gesendet werden: " + (err instanceof Error ? err.message : "Unbekannter Fehler"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="chat" className="py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-3">
            Bereit? Dann los!
          </h2>
          <p className="text-slate-500">
            Gib deine Base-ID ein und starte das Onboarding mit Momo.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          {phase !== "idle" && phase !== "complete" && (
            <ProgressBar currentStepKey={currentStepKey} />
          )}

          <div className="min-h-[400px] max-h-[600px] flex flex-col">
            {phase === "idle" && (
              <BaseIdInput onSubmit={handleBaseIdSubmit} isLoading={false} />
            )}

            {phase === "initializing" && (
              <div className="flex-1 flex items-center justify-center">
                <TransitionScreen message="Momo bereitet alles für dich vor…" />
              </div>
            )}

            {phase === "transitioning" && (
              <div className="flex-1 flex items-center justify-center">
                <TransitionScreen message={transitionMessage} />
              </div>
            )}

            {phase === "chatting" && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 chat-scroll">
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-md px-5 py-4">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
                          <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
                          <div className="w-2 h-2 bg-momo-300 rounded-full typing-dot" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {error && (
                  <div className="mx-5 mb-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="p-4 border-t border-slate-100">
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Schreib Momo eine Nachricht…"
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-momo-300 focus:ring-2 focus:ring-momo-100 transition-all duration-200 disabled:opacity-60 text-[15px]"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="w-11 h-11 bg-momo-500 hover:bg-momo-600 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {phase === "complete" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-3xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="font-display text-2xl text-slate-900 mb-3">
                  Geschafft{userName ? ", " + userName : ""}!
                </h3>
                <p className="text-slate-500 max-w-sm leading-relaxed">
                  Euer Onboarding ist abgeschlossen. Momo hat alles vorbereitet.
                  Viel Spaß beim Ausprobieren der App!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
