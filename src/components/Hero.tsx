"use client";

import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-momo-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sage-50/80 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-warm-200/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="font-display text-5xl md:text-6xl text-momo-600 tracking-tight">
            Momo
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-3xl md:text-[2.75rem] lg:text-5xl text-slate-900 leading-tight mb-5 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Eurem digitalen
          <br />
          <span className="text-momo-500">Familienbegleiter.</span>
        </h1>

        {/* Subline */}
        <p
          className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          Endlich Schluss mit dem Mental-Load-Wahnsinn. Momo organisiert euren
          Familienalltag – mit Charme, Witz und viel Herz.
        </p>

        {/* CTA */}
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="#chat"
            className="inline-flex items-center gap-2 bg-momo-500 hover:bg-momo-600 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-momo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-momo-500/30 hover:-translate-y-0.5"
          >
            Onboarding starten
          </a>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <a href="#willkommen" aria-label="Nach unten scrollen">
            <ChevronDown className="w-6 h-6 text-slate-400 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
