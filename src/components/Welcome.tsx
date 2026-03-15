"use client";

import { PartyPopper, CheckCircle2, Rocket, MessageCircleHeart } from "lucide-react";

const canDoNow = [
  "Aufgaben sammeln – über alle erdenklichen Wege, sogar mit AI-Unterstützung",
  "Termine organisieren – nie wieder vergessene Zahnarzttermine",
  "Den Tag moderieren – freundlich mit euch und den Kindern durch den Alltag",
  'Mental Load reduzieren – weniger "Hast du schon...?" und "Vergiss nicht..."',
];

export default function Welcome() {
  return (
    <section id="willkommen" className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Personal intro */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <PartyPopper className="w-7 h-7 text-momo-500 shrink-0" />
            <h2 className="font-display text-2xl md:text-3xl text-slate-900">
              Du bist dabei!
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed text-[17px]">
            <p>
              Cool, dass ihr Teil unserer exklusiven Testgruppe seid. Momo ist
              noch ein Proof of Concept – kein fancy fertiges Produkt, sondern
              der erste Schritt einer Vision, die mich seit drei Jahren umtreibt.
            </p>
            <p>
              Unsere Kinder erinnern mich jeden Tag daran, dass es eine Momo
              braucht. Und jetzt ist sie endlich da.
            </p>
          </div>
        </div>

        {/* What Momo can do now */}
        <div className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-8">
            Was Momo heute schon kann
          </h2>
          <div className="grid gap-4">
            {canDoNow.map((item) => (
              <div
                key={item}
                className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-slate-100 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-sage-500 shrink-0 mt-0.5" />
                <p className="text-slate-700 text-[15px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="mb-20 p-8 md:p-10 bg-slate-900 rounded-3xl text-white">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-momo-400" />
            <h2 className="font-display text-2xl md:text-3xl">
              Was Momo bald können wird
            </h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-[17px]">
            Die große Vision: AI, die euer Familienleben wirklich erleichtert.
            Jobs-to-be-done für alle moderiert. Ein sprechender
            Familienbegleiter, der euch den Rücken freihält.
          </p>
        </div>

        {/* Before you start */}
        <div className="mb-20">
          <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-8">
            Bevor ihr startet
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-momo-50 border border-momo-100 rounded-2xl">
              <h3 className="font-semibold text-slate-800 text-lg mb-3">
                Seid nachsichtig mit Momo
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Sie ist ein Proof of Concept – bewusst noch nicht perfekt.
                Zwischen dem, was sie heute kann und dem, was sie künftig können
                wird, liegt noch viel AI-Magie. Aber der Grundstein ist gelegt.
              </p>
            </div>
            <div className="p-6 bg-sage-50 border border-sage-100 rounded-2xl">
              <h3 className="font-semibold text-slate-800 text-lg mb-3">
                Euer Feedback ist Gold wert
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Fehlen euch wichtige Funktionen? Sagt es uns. Momo lebt von
                eurem Input – nur so wird sie zu dem Begleiter, den eure Familie
                wirklich braucht.
              </p>
            </div>
          </div>
        </div>

        {/* Yes, it starts with questions */}
        <div className="flex gap-5 items-start p-6 md:p-8 bg-warm-100 rounded-2xl border border-warm-200">
          <MessageCircleHeart className="w-7 h-7 text-momo-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-800 text-lg mb-2">
              Ja, es startet mit Fragen
            </h3>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              Und ja, die brauchen etwas Zeit. Aber: Ohne diese Infos kann Momo
              euch nur wenig helfen. Dafür könnt ihr danach den Repeat-Modus
              ausschalten – das macht dann Momo für euch. 😉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
