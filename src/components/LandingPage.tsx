"use client";

import AudioPlayer from "@/components/AudioPlayer";

const infoChannels = [
  { label: "Spond", color: "coral" },
  { label: "E-Mail", color: "teal" },
  { label: "WhatsApp", color: "purple" },
  { label: "Spieler-Plus", color: "coral" },
  { label: "Ranzenpost", color: "teal" },
  { label: "Briefe", color: "purple" },
  { label: "Plakate", color: "coral" },
  { label: "Notizen", color: "teal" },
  { label: "Einladungen", color: "purple" },
  { label: "Aushänge", color: "coral" },
  { label: "Eltern-Apps", color: "teal" },
] as const;

const canDo = [
  "Eure Aufgaben und Termine zuverlässig wiedergeben",
  "Euch mit einem Morning Stand-up und Abend-Closing einen klaren Überblick über den Tag geben",
  "Ranzenpost und andere Infos als Foto über die Teilen-Funktion verarbeiten und interpretieren",
  "Loben, motivieren und mit Charme durch den Alltag begleiten",
];

const mustLearn = [
  "Aktiv auf Basis der Terminlage beraten – z.B. Konflikte erkennen oder Vorschläge machen",
  "Vor der Fälligkeit eines Termins eigenständig eine Erinnerung aussprechen",
  "Fotos und Dokumente noch zuverlässiger als jetzt schon interpretieren – wir bilden sie hier gerade weiter aus",
  "Fragen zu beliebigen Terminen und Aufgaben beantworten",
  "Und noch einiges mehr – unser Product Backlog ist lang",
];

const tagColors: Record<string, string> = {
  coral: "bg-[var(--coral-soft)] text-[var(--coral-dark)]",
  teal: "bg-[var(--teal-soft)] text-[var(--teal-dark)]",
  purple: "bg-[var(--purple-soft)] text-[var(--purple-dark)]",
};

export default function LandingPage() {
  return (
    <main>
      {/* Floating Audio Player – always visible */}
      <AudioPlayer />

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-[900px] mx-auto">
        <span
          className="text-[28px] font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--coral)" }}
        >
          Momo
        </span>
      </nav>

      {/* OPENER */}
      <section className="pt-[72px] pb-10 px-6 text-center">
        <h1
          className="text-[36px] leading-[1.2] font-bold mb-3 max-sm:text-[28px]"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
        >
          Kennst du das?
        </h1>
        <p
          className="text-[17px] max-w-[500px] mx-auto mb-8"
          style={{ color: "var(--text-mid)" }}
        >
          Jeden Tag die gleichen Diskussionen, Ansagen und Erinnerungen.
        </p>

        {/* Dezenter Song-Hinweis */}
        <div
          className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mx-auto"
          style={{
            background: "linear-gradient(135deg, var(--coral-light), var(--purple-light))",
            border: "1px solid var(--coral-soft)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "var(--coral)" }}
          />
          <span className="text-[14px] font-medium" style={{ color: "var(--text-mid)" }}>
            Hör mal rein: <span style={{ color: "var(--coral)" }}>Der Eltern Song</span>
          </span>
          <span className="text-[12px]" style={{ color: "var(--text-soft)" }}>
            ↗ Play-Button rechts unten
          </span>
        </div>

        <p className="text-[15px] italic mt-8" style={{ color: "var(--text-soft)" }}>
          Wenn du dich wiederfindest – lies weiter.
        </p>
      </section>

      {/* DIE INFORMATIONS-LAWINE */}
      <Section>
        <SectionTitle>Die Informations-Lawine</SectionTitle>
        <P>
          Es beginnt harmlos. Eine E-Mail von der Schule. Eine WhatsApp aus der
          Elterngruppe. Ein Zettel im Ranzen. Und dann hört es nicht mehr auf:
        </P>
        <div className="flex flex-wrap gap-2 my-5">
          {infoChannels.map((ch) => (
            <span
              key={ch.label}
              className={`px-[15px] py-[7px] rounded-[20px] text-[13px] font-medium ${tagColors[ch.color]}`}
            >
              {ch.label}
            </span>
          ))}
        </div>
        <P>
          Und zwischendurch noch schnell ein Update. Neue Uhrzeit. Anderer
          Treffpunkt. Doch abgesagt.
        </P>
        <HighlightBox color="coral">
          Am Ende immer dasselbe: Das Gehirn, das nie abschaltet.{" "}
          <Em color="coral">
            Wo war die Info nochmal? Welche Startzeit war das?
          </Em>{" "}
          Ein endloser Suchprozess – zwischen Apps, Zetteln und dem eigenen Kopf.
        </HighlightBox>
      </Section>

      {/* 70% DURCHSAGEN */}
      <Section>
        <SectionTitle>70 % Durchsagen, 30 % echte Gespräche</SectionTitle>
        <P>
          Ich habe irgendwann angefangen, mir selbst zuzuhören. Und erschrocken
          festgestellt: Der Großteil meiner Unterhaltungen mit meinen Kindern
          besteht aus Ansagen.
        </P>
        <P>
          <em>
            Mach bitte dies. Hast du daran gedacht? Vergiss nicht, dass
            morgen...
          </em>
        </P>
        <P>
          Die Wirksamkeit: mittelmäßig. Mein Frust: wahnsinnig hoch. Und vor
          allem – das sind nicht die Gespräche, die ich mit meinen Kindern führen
          möchte.
        </P>
        <HighlightBox color="teal">
          Ich wünsche mir Unterhaltungen über ihren Tag, ihre Träume, ihre
          Sorgen. Nicht eine endlose Wiederholungsschleife aus{" "}
          <Em color="teal">organisatorischen Durchsagen</Em>.
        </HighlightBox>
      </Section>

      {/* DAS MUSS AUCH BESSER GEHEN */}
      <Section>
        <SectionTitle>Das muss auch besser gehen!</SectionTitle>
        <P>
          Seit Jahren berate ich Unternehmen dabei, ihre digitalen Prozesse
          besser zu machen. Seit drei Jahren tauche ich tief in die Welt der KI
          ein. Irgendwann war klar: Was ich beruflich für andere löse, braucht
          meine eigene Familie genauso dringend.
        </P>
        <P>
          Erst habe ich improvisiert – mit Tools, Tabellen, allem was ging. Dann
          habe ich Sonja, Stefan und Kai von Syndicats kennengelernt. Drei
          Entwickler, die als Eltern selber in diesem System leben und sofort
          verstanden haben, worum es geht. Gemeinsam haben wir Momo in den
          letzten Monaten von einer Idee in ein lebendiges System verwandelt.
          Dafür danke ich euch sehr.
        </P>
        <P>
          Es gibt Zusammenarbeit, die funktioniert. Und es gibt Zusammenarbeit,
          bei der man merkt: Hier stimmt alles – die Haltung, die Kompetenz, der
          Spaß an und bei der Arbeit. Genau so fühlt sich das an.
        </P>
      </Section>

      {/* DAS IST MOMO */}
      <Section>
        <SectionTitle>Das ist Momo</SectionTitle>
        <P>
          Momo ist so etwas wie das Gedächtnis unserer Familie. Sie hat zwei
          Jobs.
        </P>
        <P>
          Der erste: <Em color="coral">alles aufnehmen.</Em> Ranzenpost,
          Vereins-Terminen, Einladungen – Momo sammelt, was sonst in zehn
          verschiedenen Apps und Zettelwirtschaften untergeht.
        </P>
        <P>
          Der zweite: <Em color="coral">alles weitergeben.</Em> Sie erinnert an
          Termine und Aufgaben, freundlich und geduldig. Auch beim achten Mal.
          Sie lobt, sie motiviert, sie bleibt entspannt.
        </P>
        <P>
          Und das Schönste: Wenn Momo und wir mal aneinander vorbeireden, bringt
          sie Charme und Witz in unseren Orga-Alltag, der früher viel zu kurz
          gekommen ist.
        </P>
        <DarkBox title="Warum Momo funktioniert">
          <p className="text-[#b8b0d0] text-[15px] mb-2.5">
            Hinter Momo steckt eine einfache Erkenntnis aus der
            Motivationsforschung: Menschen funktionieren am besten, wenn sie
            selbst entscheiden dürfen, sich zugehörig fühlen und merken, dass sie
            etwas können. Das gilt für Erwachsene genauso wie für Kinder.
          </p>
          <p className="text-[#b8b0d0] text-[15px]">
            Deshalb gibt Momo keine Befehle. Sie schlägt vor, erinnert, feiert
            Erfolge. Ein System, das miteinander arbeitet – nicht von oben herab.
          </p>
        </DarkBox>
      </Section>

      {/* MOMO IST NOCH JUNG */}
      <section className="py-12 px-6">
        <div className="max-w-[640px] mx-auto">
          <SectionTitle>Momo ist noch jung</SectionTitle>
          <p className="text-[16px] mb-7" style={{ color: "var(--text-mid)" }}>
            Technologisch gesprochen bewegt sich Momo irgendwo zwischen Proof of
            Concept und Beta-Version. Sie kann schon erstaunlich viel – aber eben
            noch nicht alles. Damit ihr wisst, worauf ihr euch einlasst, hier ein
            ehrlicher Blick:
          </p>

          {/* Can do */}
          <div
            className="rounded-[16px] p-6 mb-4"
            style={{ background: "var(--teal-light)" }}
          >
            <h3 className="text-[17px] font-bold mb-3" style={{ color: "var(--teal-dark)" }}>
              Was Momo schon richtig gut kann
            </h3>
            <ul className="space-y-1.5">
              {canDo.map((item) => (
                <li
                  key={item}
                  className="text-[15px] pl-6 relative leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  <span
                    className="absolute left-0 font-bold"
                    style={{ color: "var(--teal)" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Must learn */}
          <div
            className="rounded-[16px] p-6 mb-4"
            style={{ background: "var(--coral-light)" }}
          >
            <h3 className="text-[17px] font-bold mb-3" style={{ color: "var(--coral-dark)" }}>
              Was Momo noch lernen muss
            </h3>
            <ul className="space-y-1.5">
              {mustLearn.map((item) => (
                <li
                  key={item}
                  className="text-[15px] pl-6 relative leading-relaxed"
                  style={{ color: "var(--text-mid)" }}
                >
                  <span
                    className="absolute left-0 font-bold"
                    style={{ color: "var(--coral)" }}
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Outro */}
          <div
            className="rounded-[16px] p-6 mt-6"
            style={{
              background: "var(--purple-light)",
              borderLeft: "4px solid var(--purple)",
            }}
          >
            <p className="text-[16px]" style={{ color: "var(--text-mid)" }}>
              Kurz gesagt: Momo ist kein fertiges Produkt. Sie ist ein Anfang.
              Und genau deshalb ist{" "}
              <span className="font-semibold" style={{ color: "var(--purple)" }}>
                euer Feedback so wertvoll
              </span>
              . Jede Rückmeldung – egal ob Lob, Frust oder Wunsch – hilft uns,
              Momo besser zu machen. Für eure Familie und für alle, die nach euch
              kommen.
            </p>
          </div>
        </div>
      </section>

      {/* EINLADUNG + FORMULAR */}
      <section className="py-12 px-6" id="formular">
        <div
          className="rounded-[20px] p-7 sm:p-9 max-w-[620px] mx-auto"
          style={{
            background:
              "linear-gradient(160deg, var(--coral-light), var(--teal-light), var(--purple-light))",
          }}
        >
          <h2
            className="text-[26px] font-semibold text-center mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ihr seid eingeladen
          </h2>

          <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: "var(--text-mid)" }}>
            Die schlechte Nachricht zuerst: Du erhältst diese Nachricht, weil
            ich in deinem Leben ein ähnliches Chaos vermute wie in meinem.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: "var(--text-mid)" }}>
            Die gute Nachricht: Als handverlesene Auswahl meiner Freunde seid
            ihr eingeladen, Momo mit eurer Familie kennenzulernen.
          </p>

          <h3
            className="text-[18px] font-semibold mt-6 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Warum das Ganze?
          </h3>
          <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: "var(--text-mid)" }}>
            <strong className="font-semibold" style={{ color: "var(--text)" }}>
              Erstens:
            </strong>{" "}
            Ich hoffe natürlich, dass Momo euch genauso gut unterstützen kann,
            wie sie es bei uns schon tut.
          </p>
          <p className="text-[15px] leading-[1.7] mb-3.5" style={{ color: "var(--text-mid)" }}>
            <strong className="font-semibold" style={{ color: "var(--text)" }}>
              Zweitens:
            </strong>{" "}
            Aus euren Erfahrungen möchte ich herausfinden, ob Momo es verdient,
            aus dieser Beta-Phase herauszuwachsen und künftig noch mehr Familien
            im Alltag zu begleiten. Das ist eine so grundlegende Frage, dass mir
            euer ehrliches Feedback dafür unglaublich wichtig ist.
          </p>

          <h3
            className="text-[18px] font-semibold mt-6 mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Lust dabei zu sein?
          </h3>
          <p className="text-[15px] leading-[1.7] mb-2" style={{ color: "var(--text-mid)" }}>
            Dann lasst uns bald einen Onboarding-Termin verabreden. Damit ich
            alles für euch vorbereiten kann, brauche ich nur eure Apple-ID
            E-Mail-Adressen.
          </p>
          <p
            className="text-[13px] italic mb-5"
            style={{ color: "var(--text-soft)" }}
          >
            Um Momo zu nutzen, benötigt ihr nur ein Apple iPad oder iPhone –
            egal welcher Generation.
          </p>

          {/* FORM */}
          <form
            action="https://formspree.io/f/xeerlwao"
            method="POST"
          >
            <div className="mb-4">
              <label className="block text-[14px] font-medium mb-1.5">
                Vorname
              </label>
              <input
                type="text"
                name="vorname"
                placeholder="Anna"
                required
                className="w-full px-3.5 py-2.5 border border-[#d4ccc4] rounded-[11px] text-[15px] bg-white outline-none focus:border-[var(--coral)] transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14px] font-medium mb-1.5">
                Apple-ID E-Mail (deine)
              </label>
              <input
                type="email"
                name="apple_id_1"
                placeholder="anna@icloud.com"
                required
                className="w-full px-3.5 py-2.5 border border-[#d4ccc4] rounded-[11px] text-[15px] bg-white outline-none focus:border-[var(--coral)] transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14px] font-medium mb-1.5">
                Apple-ID E-Mail (anderes Elternteil)
              </label>
              <input
                type="email"
                name="apple_id_2"
                placeholder="partner@icloud.com"
                className="w-full px-3.5 py-2.5 border border-[#d4ccc4] rounded-[11px] text-[15px] bg-white outline-none focus:border-[var(--coral)] transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-[14px] font-medium mb-1.5">
                Nachricht (optional)
              </label>
              <textarea
                name="nachricht"
                placeholder="Fragen, Wünsche, Anmerkungen..."
                className="w-full px-3.5 py-2.5 border border-[#d4ccc4] rounded-[11px] text-[15px] bg-white outline-none focus:border-[var(--coral)] transition-colors resize-y min-h-[72px]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-[14px] text-[16px] font-semibold text-white cursor-pointer transition-colors mt-1.5"
              style={{ background: "var(--coral)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--coral-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--coral)")
              }
            >
              Anmeldung absenden
            </button>
          </form>

          <p
            className="text-[15px] leading-[1.7] mt-6"
            style={{ color: "var(--text-mid)" }}
          >
            Ich bin unfassbar neugierig und aufgeregt zu hören, welche Wirkung
            Momo auf euch und eure Familien hat. Danke euch vorab und viele
            Grüße,
          </p>
          <p className="text-[16px] font-semibold mt-2" style={{ color: "var(--coral)" }}>
            Becci
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center py-8 px-6 mt-10"
        style={{ borderTop: "1px solid var(--coral-soft)" }}
      >
        <p className="text-[13px]" style={{ color: "var(--text-faint)" }}>
          © 2026 Momo · Von Rebecca, Sonja, Stefan & Kai – mit Herz gebaut.
        </p>
      </footer>
    </main>
  );
}

/* ── Helper Components ── */

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-[640px] mx-auto">{children}</div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[26px] font-semibold mb-4 leading-[1.3] max-sm:text-[22px]"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] mb-3.5" style={{ color: "var(--text-mid)" }}>
      {children}
    </p>
  );
}

function Em({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "coral" | "teal" | "purple";
}) {
  const colors = {
    coral: "var(--coral)",
    teal: "var(--teal)",
    purple: "var(--purple)",
  };
  return (
    <em className="not-italic font-semibold" style={{ color: colors[color] }}>
      {children}
    </em>
  );
}

function HighlightBox({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "coral" | "teal" | "purple";
}) {
  const bg = {
    coral: "var(--coral-light)",
    teal: "var(--teal-light)",
    purple: "var(--purple-light)",
  };
  const border = {
    coral: "var(--coral)",
    teal: "var(--teal)",
    purple: "var(--purple)",
  };
  return (
    <div
      className="rounded-[16px] px-7 py-6 my-6"
      style={{
        background: bg[color],
        borderLeft: `4px solid ${border[color]}`,
      }}
    >
      <p className="text-[16px]" style={{ color: "var(--text)" }}>
        {children}
      </p>
    </div>
  );
}

function DarkBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[20px] px-7 py-8 my-6"
      style={{ background: "var(--slate-900)" }}
    >
      <h3
        className="text-[22px] font-semibold text-white mb-2.5"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}
