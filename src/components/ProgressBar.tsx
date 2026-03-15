"use client";

import { getProgress } from "@/lib/agentSequence";

interface ProgressBarProps {
  currentStepKey: string;
}

const stepLabels = ["Kennenlernen", "Terminierung", "Planung", "Go Live"];

export default function ProgressBar({ currentStepKey }: ProgressBarProps) {
  const { current, total } = getProgress(currentStepKey);

  if (current === 0) return null;

  return (
    <div className="px-5 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          Schritt {current} von {total}
        </span>
        <span className="text-xs font-medium text-momo-600">
          {stepLabels[current - 1] || ""}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-momo-400 to-momo-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
