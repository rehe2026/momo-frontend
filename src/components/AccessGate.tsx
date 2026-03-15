"use client";

import { useState } from "react";
import { ArrowRight, Lock } from "lucide-react";

interface AccessGateProps {
  onAccessGranted: () => void;
}

export default function AccessGate({ onAccessGranted }: AccessGateProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();

    if (!trimmed) {
      setError("Bitte gib den Zugangscode ein.");
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });

      const data = await res.json();

      if (data.valid) {
        onAccessGranted();
      } else {
        setError("Der Zugangscode ist leider nicht korrekt.");
      }
    } catch {
      setError("Verbindungsfehler. Bitte versuche es erneut.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-warm-50">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-momo-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-sage-50/60 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-8">
          <span className="font-display text-5xl text-momo-600 tracking-tight">
            Momo
          </span>
        </div>

        {/* Lock icon */}
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-6 h-6 text-slate-400" />
        </div>

        <h1 className="font-display text-2xl text-slate-900 mb-2">
          Geschützter Bereich
        </h1>
        <p className="text-slate-500 mb-8 text-[15px]">
          Momo ist aktuell nur für eingeladene Familien zugänglich.
          Gib deinen Zugangscode ein, um fortzufahren.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="Zugangscode eingeben"
              disabled={isChecking}
              autoFocus
              className="w-full px-5 py-4 pr-14 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-momo-400 focus:ring-4 focus:ring-momo-100 transition-all duration-200 disabled:opacity-60 text-center text-lg tracking-wider"
            />
            <button
              type="submit"
              disabled={isChecking || !code.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-momo-500 hover:bg-momo-600 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}
        </form>

        <p className="text-xs text-slate-400 mt-6">
          Du hast den Code per E-Mail erhalten.
        </p>
      </div>
    </div>
  );
}
