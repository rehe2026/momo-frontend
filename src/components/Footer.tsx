"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 md:py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Thank you note */}
        <div className="mb-12 pb-12 border-b border-slate-700/50">
          <h2 className="font-display text-2xl md:text-3xl mb-6">
            Ein großes Danke
          </h2>
          <p className="text-slate-300 leading-relaxed text-[17px] mb-6">
            An Stefan, Kai und Sonja von Syndicats, die Momo in den letzten
            Monaten zum Leben erweckt haben. Ihr seid nicht nur technisch
            brillant, sondern auch menschlich genau die Sparringspartner, von
            denen man als Gründerin nur träumen kann. Ohne euch wäre diese
            Vision noch immer nur eine Idee.
          </p>
          <p className="text-slate-300 leading-relaxed text-[17px]">
            Ich bin gespannt, wohin diese Reise führt. Aber zuerst geht es
            darum, euch und euren Familien das Leben mit Momo hoffentlich etwas
            leichter zu machen.
          </p>
        </div>

        {/* Signature */}
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="text-slate-400 text-sm mb-1">
              Ganz viel Spaß beim Testen!
            </p>
            <p className="font-display text-xl text-white">
              Rebecca{" "}
              <span className="text-slate-400 font-body text-base">
                & das Momo-Team
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-momo-500 fill-momo-500" />
            <span>in Hamburg</span>
          </div>
        </div>

        {/* Legal links placeholder */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-6 text-sm text-slate-500">
          <span className="font-display text-lg text-momo-500">Momo</span>
          <div className="flex gap-6 ml-auto">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
