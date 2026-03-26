'use client';

import { useState, useEffect } from 'react';

/* ─── Reusable Helper Components (matching LandingPage.tsx style) ─── */

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`max-w-3xl mx-auto px-6 py-12 md:py-16 ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-4xl font-bold mb-6"
      style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base md:text-lg leading-relaxed mb-4"
      style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </p>
  );
}

function Em({ children, color = 'coral' }: { children: React.ReactNode; color?: 'coral' | 'teal' | 'purple' }) {
  return <span style={{ color: `var(--${color})`, fontWeight: 600 }}>{children}</span>;
}

function HighlightBox({
  children,
  color = 'coral',
}: {
  children: React.ReactNode;
  color?: 'coral' | 'teal' | 'purple';
}) {
  return (
    <div
      className="rounded-2xl p-6 my-8"
      style={{
        backgroundColor: `var(--${color}-soft)`,
        borderLeft: `4px solid var(--${color})`,
      }}
    >
      {children}
    </div>
  );
}

function StepItem({
  letter,
  children,
  image,
  imageAlt,
}: {
  letter: string;
  children: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex gap-4 items-start">
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: 'var(--teal)', fontFamily: "'DM Sans', sans-serif" }}
        >
          {letter}
        </div>
        <div className="flex-1">
          <div
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}
          >
            {children}
          </div>
          {image && (
            <div className="mt-4 rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: 'var(--text-faint)' }}>
              <img
                src={image}
                alt={imageAlt || ''}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Password Gate (reuses sessionStorage logic from LandingPage) ─── */

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Ranzenpost') {
      sessionStorage.setItem('momo_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, var(--coral-soft) 0%, var(--teal-soft) 50%, var(--purple-soft) 100%)' }}
    >
      <div
        className={`bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md text-center ${shake ? 'animate-shake' : ''}`}
      >
        <div className="text-5xl mb-4">🔒</div>
        <h1
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}
        >
          Momo Onboarding
        </h1>
        <p
          className="mb-8 text-sm"
          style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}
        >
          Bitte gib das Passwort ein, um fortzufahren.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Passwort"
            className="w-full px-4 py-3 rounded-xl border-2 text-center text-lg outline-none transition-colors mb-4"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderColor: error ? 'var(--coral)' : 'var(--text-faint)',
              color: 'var(--text)',
            }}
            autoFocus
          />
          {error && (
            <p className="text-sm mb-4" style={{ color: 'var(--coral)' }}>
              Das Passwort ist leider falsch. Versuch es nochmal!
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--coral)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Weiter
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

/* ─── Main Onboarding Page ─── */

export default function OnboardingPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isUnlocked = sessionStorage.getItem('momo_unlocked') === 'true';
    setUnlocked(isUnlocked);
    setChecking(false);
  }, []);

  if (checking) {
    return <div className="min-h-screen" style={{ backgroundColor: 'var(--coral-soft)' }} />;
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: '#FFFBF8', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Hero */}
      <div
        className="text-center px-6 pt-16 pb-12"
        style={{ background: 'linear-gradient(180deg, var(--coral-soft) 0%, #FFFBF8 100%)' }}
      >
        <p className="text-base mb-3" style={{ color: 'var(--coral)' }}>
          🎉 Willkommen bei Momo
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}
        >
          Deine Momo Journey<br />startet hier
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-mid)' }}>
          Eine kurze Anleitung für dein Familien-Onboarding
        </p>
      </div>

      {/* Intro Text */}
      <Section>
        <P>Liebe Testfamilien,</P>
        <P>
          manchmal klappen AI-Wege (noch) nicht so, wie man sich das vorstellt.
          Eigentlich hätte euch ein Komitee an Onboarding Agenten auf{' '}
          <a href="http://www.momo-app.de" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>
            www.momo-app.de
          </a>{' '}
          begrüßen sollen. Aber am Ende dieser Umsetzung musste ich feststellen, dass
          mein KI-Tool das noch nicht hergibt. Steht aber im Backlog – großartig.
        </P>
        <P>
          Daher müsst ihr nun ein klein wenig mit in meinen Maschinenraum gehen und über
          eines meiner favorisierten AI-Tools in das Onboarding einsteigen. Nicht so
          hübsch, aber wirksam. Sehr wahrscheinlich wird euch noch eine weitere Hürde mit
          einer <Em color="purple">2-Faktor-Authentifizierung</Em> in den Weg gelegt.
        </P>

        <HighlightBox color="teal">
          <p
            className="text-base font-semibold mb-2"
            style={{ color: 'var(--teal-dark)', fontFamily: "'DM Sans', sans-serif" }}
          >
            📱 Bitte vorher kurz Bescheid geben!
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
            Schreibt mir kurz vor eurem geplanten Onboarding-Zeitfenster eine WhatsApp,
            damit ich mein Handy griffbereit habe und die 2-Faktor-Authentifizierung
            bestätigen kann. Meine Nummer:{' '}
            <span style={{ fontWeight: 600, color: 'var(--teal)' }}>0151-50682633</span>
          </p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--text-soft)', fontFamily: "'DM Sans', sans-serif" }}>
            Das Onboarding dauert ca. 30–40 Minuten. Die Wahrscheinlichkeit, dass sich
            zwei Familien gleichzeitig einloggen, ist gering – aber falls doch, gebe ich
            euch Bescheid.
          </p>
        </HighlightBox>
      </Section>

      {/* Step by Step */}
      <div style={{ backgroundColor: 'var(--teal-soft)', borderTop: '1px solid var(--teal-light)' }}>
        <Section>
          <SectionTitle>Step-by-Step Anleitung</SectionTitle>

          <StepItem
            letter="a"
            image="/onboarding/langdock-homepage.png"
            imageAlt="Langdock Homepage mit Log in Button"
          >
            Gehe auf{' '}
            <a
              href="https://langdock.com/de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'underline' }}
            >
              www.langdock.com/de
            </a>{' '}
            und wähle <Em color="teal">„Log in"</Em>.
          </StepItem>

          <StepItem
            letter="b"
            image="/onboarding/langdock-login-email.png"
            imageAlt="Langdock Login – E-Mail eingeben"
          >
            Gib die E-Mail-Adresse{' '}
            <Em color="teal">momo-app@destineo.com</Em> ein.
          </StepItem>

          <StepItem
            letter="c"
            image="/onboarding/langdock-login-password.png"
            imageAlt="Langdock Login – Passwort eingeben"
          >
            Gib das <Em color="teal">Passwort</Em> ein, welches ich dir separat geschickt habe.
          </StepItem>

          <StepItem letter="d">
            Eventuell wirst du aufgefordert, einen Code für die{' '}
            <Em color="purple">2-Faktor-Authentifizierung</Em> anzugeben. In diesem Fall
            erhalte ich eine Benachrichtigung auf meinem Handy und kann dir den Code per
            WhatsApp übermitteln. (Lass mich bitte vorher kurz wissen, dass du jetzt starten
            möchtest.)
          </StepItem>

          <StepItem
            letter="e"
            image="/onboarding/langdock-agenten.png"
            imageAlt="Langdock Oberfläche mit den Momo-Agenten in der Seitenleiste"
          >
            In Langdock eingeloggt triffst du auf die <Em color="teal">Momo Agenten</Em>.
          </StepItem>

          <StepItem
            letter="f"
            image="/onboarding/langdock-agent-start.png"
            imageAlt="Momo Agent 1 starten und Base-ID eingeben"
          >
            Wähle <Em color="teal">Agent „Momo – Agent 1"</Em> und gib deine{' '}
            <Em color="coral">Base-ID</Em> ein. Die habe ich dir separat übermittelt.
          </StepItem>

          <StepItem letter="g">
            Du bist am Ende des Onboardings angekommen, wenn du das Ende von{' '}
            <Em color="teal">Agent Nr. 4</Em> erreicht hast. Sollte die Weitergabe von
            Agent zu Agent mal nicht reibungslos funktionieren, kannst du den jeweils
            nächsten Agenten in der Seitenleiste aufrufen.
          </StepItem>

          <StepItem letter="h">
            Ehe du Langdock verlässt und mit Momo als App startest,{' '}
            <Em color="coral">lösche deine eigenen Chats</Em> auf der linken
            Navigationsleiste.
          </StepItem>
        </Section>
      </div>

      {/* Hints */}
      <Section>
        <SectionTitle>Noch ein paar Hinweise</SectionTitle>

        <P>
          Ich habe in den letzten Tagen recht intensiv an den Agenten gefeilt. Und ich muss
          ehrlich sagen – die Agenten hatten mal stabilere Tage. Manchmal verschlimmbessert
          man KI-Agenten, wenn man es mit dem Finetuning übertreibt. Daher – und weil
          Sprachmodelle nicht rein nach Schema F ablaufen, sondern gewisse Freiheitsgrade
          genießen – besteht eine gewisse Gefahr, dass das Onboarding nicht ganz so
          reibungslos läuft, wie ich es mir vorgestellt habe.
        </P>

        <HighlightBox color="coral">
          <p
            className="text-base font-semibold mb-2"
            style={{ color: 'var(--coral-dark)', fontFamily: "'DM Sans', sans-serif" }}
          >
            🔧 Falls etwas schiefgeht
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
            Sollte das Onboarding nicht rund laufen, kann ich im Anschluss auf Wunsch den
            entstandenen Datensalat in eurer Familien-Datenbank überprüfen und für euch
            richten. Sind wir aber mal optimistisch, dass alles rund läuft!
          </p>
        </HighlightBox>

        <HighlightBox color="purple">
          <p
            className="text-base font-semibold mb-2"
            style={{ color: 'var(--purple-dark)', fontFamily: "'DM Sans', sans-serif" }}
          >
            💡 Wichtig
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)', fontFamily: "'DM Sans', sans-serif" }}>
            Lauft alle Agenten von Anfang bis Ende durch. Sollte ein Agent mal nicht von
            alleine weiter machen, stupst ihn ruhig an mit{' '}
            <span style={{ fontWeight: 600 }}>„weiter geht&apos;s"</span>. Eigentlich gibt
            jeder Agent am Ende bekannt, dass ihr fertig seid, und leitet euch zum nächsten
            Agenten weiter.
          </p>
        </HighlightBox>
      </Section>

      {/* Video Section */}
      <div style={{ backgroundColor: 'var(--purple-soft)', borderTop: '1px solid var(--purple-light)' }}>
        <Section className="text-center">
          <SectionTitle>Was kann Momo eigentlich?</SectionTitle>
          <P>
            Vielleicht denkt ihr euch jetzt: Sollte ich das auch wirklich machen? Worauf
            lasse ich mich eigentlich ein? Dann schaut euch doch dieses kurze Video zu
            den Funktionen von Momo an.
          </P>
          <div className="mt-8 rounded-2xl overflow-hidden shadow-xl">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full"
              style={{ backgroundColor: '#000' }}
            >
              <source src="/onboarding/momo-video.mp4" type="video/mp4" />
              Dein Browser unterstützt das Video-Format leider nicht.
            </video>
          </div>
        </Section>
      </div>

      {/* Closing */}
      <Section className="text-center pb-20">
        <P>
          Meldet euch bitte jederzeit per WhatsApp, wenn ihr unsicher seid oder
          Rückfragen habt.
        </P>
        <p
          className="text-2xl mt-8 mb-2 font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text)' }}
        >
          Viel Spaß und Erfolg beim Start! 🚀
        </p>
        <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
          Eure Rebecca
        </p>
      </Section>

      {/* Footer */}
      <footer
        className="text-center py-6 text-xs"
        style={{ color: 'var(--text-faint)', borderTop: '1px solid var(--text-faint)' }}
      >
        <a href="/" style={{ color: 'var(--text-soft)', textDecoration: 'underline' }}>
          ← Zurück zur Hauptseite
        </a>
      </footer>
    </main>
  );
}
