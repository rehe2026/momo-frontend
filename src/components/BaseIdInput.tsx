"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

interface BaseIdInputProps {
  onSubmit: (baseId: string) => void;
  isLoading: boolean;
}

export default function BaseIdInput({ onSubmit, isLoading }: BaseIdInputProps) {
  const [baseId, setBaseId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = baseId.trim();

    if (!trimmed) {
      setError("Bitte gib deine Base-ID ein.");
      return;
    }

    // Basic validation: Airtable Base IDs start with "app"
    if (!trimmed.startsWith("app")) {
      setError(
        'Die Base-ID beginnt normalerweise mit "app". Bitte prüfe deine Eingabe.'
      );
      return;
    }

    setError("");
    onSubmit(trimmed);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12">
      <div className="w-16 h-16 bg-momo-100 rounded-3xl flex items-center justify-center mb-6">
        <span className="font-display text-2xl text-momo-600">M</span>
      </div>

      <h3 className="font-display text-2xl text-gray-900 mb-2 text-center">
        Willkommen bei Momo!
      </h3>
      <p className="text-gray-500 text-center mb-8 max-w-sm">
        Gib deine persönliche Base-ID ein, um das Onboarding zu starten. Du hast
        sie per E-Mail erhalten.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="relative">
          <input
            type="text"
            value={baseId}
            onChange={(e) => {
              setBaseId(e.target.value);
              setError("");
            }}
            placeholder="z.B. appAFTtpa2IIPSf6r"
            disabled={isLoading}
            className="w-full px-5 py-4 pr-14 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-momo-400 focus:ring-4 focus:ring-momo-100 transition-all duration-200 disabled:opacity-60 font-mono text-sm"
          />
          <button
            type="submit"
            disabled={isLoading || !baseId.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-momo-500 hover:bg-momo-600 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-coral-500 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
