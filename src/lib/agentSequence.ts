export interface AgentStep {
  key: string;
  agentId: string;
  interactive: boolean;
  label: string;
  description: string;
}

export const AGENT_SEQUENCE: AgentStep[] = [
  {
    key: "orchestrator_init",
    agentId: process.env.AGENT_0_ID || "",
    interactive: false,
    label: "Initialisierung",
    description: "Momo bereitet alles für dich vor…",
  },
  {
    key: "onboarding",
    agentId: process.env.AGENT_2_ID || "",
    interactive: true,
    label: "Kennenlernen",
    description: "Erzähl Momo von deiner Familie",
  },
  {
    key: "terminierung",
    agentId: process.env.AGENT_3_ID || "",
    interactive: true,
    label: "Terminierung",
    description: "Wann passiert was?",
  },
  {
    key: "planung",
    agentId: process.env.AGENT_4_ID || "",
    interactive: true,
    label: "Planung",
    description: "Dein individueller Familienplan",
  },
  {
    key: "goLive",
    agentId: process.env.AGENT_5_ID || "",
    interactive: true,
    label: "Go Live",
    description: "Ab in die App!",
  },
  {
    key: "orchestrator_end",
    agentId: process.env.AGENT_0_ID || "",
    interactive: false,
    label: "Abschluss",
    description: "Fast geschafft…",
  },
];

export function getNextStep(currentKey: string): AgentStep | null {
  const currentIndex = AGENT_SEQUENCE.findIndex((s) => s.key === currentKey);
  if (currentIndex === -1 || currentIndex >= AGENT_SEQUENCE.length - 1) {
    return null;
  }
  return AGENT_SEQUENCE[currentIndex + 1];
}

export function getStepByKey(key: string): AgentStep | undefined {
  return AGENT_SEQUENCE.find((s) => s.key === key);
}

// Progress: only count interactive steps for display
export function getProgress(currentKey: string): {
  current: number;
  total: number;
} {
  const interactiveSteps = AGENT_SEQUENCE.filter((s) => s.interactive);
  const currentIndex = interactiveSteps.findIndex((s) => s.key === currentKey);
  return {
    current: Math.max(0, currentIndex + 1),
    total: interactiveSteps.length,
  };
}
