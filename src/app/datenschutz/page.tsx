import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-[640px] mx-auto">
        <Link
          href="/"
          className="text-[14px] mb-8 inline-block"
          style={{ color: "var(--coral)" }}
        >
          ← Zurück zur Startseite
        </Link>

        <h1
          className="text-[32px] font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-[15px] leading-[1.7]" style={{ color: "var(--text-mid)" }}>

          {/* Verantwortlicher */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              1. Verantwortlicher
            </h2>
            <p>
              destineo GmbH & Co. KG<br />
              Hegestraße 13, 20251 Hamburg<br />
              E-Mail: mail@destineo.com
            </p>
          </section>

          {/* Überblick */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              2. Überblick über die Datenverarbeitung
            </h2>
            <p>
              Momo ist eine KI-gestützte Familien-Organisations-App. Um euch den
              bestmöglichen Service zu bieten, setzen wir verschiedene technische
              Dienste ein. Im Folgenden erklären wir transparent, welche Dienste
              wir nutzen, welche Daten dabei verarbeitet werden und zu welchem
              Zweck.
            </p>
          </section>

          {/* Authentifizierung */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              3. Authentifizierung – Apple Sign In
            </h2>
            <p>
              Die Anmeldung bei Momo erfolgt über Apple Sign In. Dabei werden
              ausschließlich die von Apple freigegebenen Daten (E-Mail-Adresse,
              ggf. Name) an uns übermittelt. Apple bietet die Möglichkeit, eine
              private Relay-E-Mail-Adresse zu verwenden. Wir speichern keine
              Apple-Passwörter.
            </p>
          </section>

          {/* Backend & Datenbank */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              4. Backend & Datenbank – Supabase
            </h2>
            <p>
              Als Backend- und Authentifizierungsdienst nutzen wir Supabase.
              Supabase speichert eure Nutzerdaten, Sitzungsinformationen und
              Authentifizierungs-Tokens. Die Daten werden auf Servern von
              Supabase Inc. gehostet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
              DSGVO (Vertragserfüllung).
            </p>
          </section>

          {/* Datenverwaltung */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              5. Datenverwaltung – Airtable
            </h2>
            <p>
              Zur Verwaltung von Stammdaten, Aufgaben und Terminen nutzen wir
              Airtable. Airtable verarbeitet die Daten, die ihr in Momo eingebt
              (z.B. Termine, Aufgaben, Familienmitglieder). Anbieter ist
              Formagrid Inc. (Airtable), USA. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. b DSGVO.
            </p>
          </section>

          {/* KI & Sprachverarbeitung */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              6. Onboarding – Langdock
            </h2>
            <p>
              Für das Onboarding neuer Familien nutzen wir Langdock. Dabei
              werden Eingaben zu Familienmitgliedern, Aufgaben und
              Tagesabläufen verarbeitet, um Momo für eure Familie
              einzurichten. Langdock ist ein deutscher Anbieter mit Sitz in
              Hamburg. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          {/* Echtzeit-Kommunikation */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              7. Echtzeit-Kommunikation – LiveKit
            </h2>
            <p>
              Für die Sprach- und Echtzeitkommunikation mit Momo nutzen wir
              LiveKit. LiveKit verarbeitet Audio-Streams über WebRTC und nutzt
              dabei LLM-, TTS- (Text-to-Speech) und STT-Dienste
              (Speech-to-Text). Anbieter ist LiveKit Inc., USA. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>

          {/* ChatGPT */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              8. KI-Verarbeitung – OpenAI (ChatGPT)
            </h2>
            <p>
              Für die KI-gestützte Verarbeitung eurer Daten nutzt Momo die
              API von OpenAI (ChatGPT). Dazu gehören die Interpretation von
              Texten und Fotos (z.B. Ranzenpost), die Aufbereitung von
              Airtable-Daten sowie deren Übertragung an LiveKit für Momos
              Antworten. Dabei können Inhalte wie Termine, Aufgaben und
              Familiendaten an OpenAI-Server übermittelt werden. Anbieter ist
              OpenAI, L.L.C., USA. Die Verarbeitung erfolgt über die API ohne
              dauerhaftes Training auf euren Daten. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>
          </section>

          {/* Landing Page */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              9. Kontaktformular – Formspree
            </h2>
            <p>
              Das Anmeldeformular auf dieser Landingpage wird über Formspree
              verarbeitet. Wenn ihr das Formular ausfüllt, werden euer Vorname,
              eure Apple-ID E-Mail-Adressen und eure optionale Nachricht an
              Formspree übermittelt und per E-Mail an uns weitergeleitet.
              Anbieter ist Formspree Inc., USA. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              10. Hosting – Vercel
            </h2>
            <p>
              Diese Webseite wird bei Vercel gehostet. Beim Besuch der Seite
              werden automatisch technische Daten (IP-Adresse, Browsertyp,
              Zeitpunkt des Zugriffs) in Server-Logfiles erfasst. Anbieter ist
              Vercel Inc., USA. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der sicheren Bereitstellung der
              Webseite).
            </p>
          </section>

          {/* Datenübermittlung USA */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              11. Datenübermittlung in die USA
            </h2>
            <p>
              Einige der genannten Dienste (Supabase, Airtable, OpenAI, LiveKit,
              Formspree, Vercel) haben ihren Sitz in den USA. Die
              Datenübermittlung erfolgt auf Grundlage des EU-US Data Privacy
              Frameworks bzw. auf Basis von Standardvertragsklauseln (Art. 46
              Abs. 2 lit. c DSGVO).
            </p>
          </section>

          {/* Rechte */}
          <section>
            <h2 className="text-[18px] font-semibold mb-2" style={{ color: "var(--text)" }}>
              12. Eure Rechte
            </h2>
            <p>
              Ihr habt jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit und
              Widerspruch. Wendet euch dazu einfach an mail@destineo.com. Zudem
              habt ihr das Recht, euch bei einer Datenschutz-Aufsichtsbehörde
              zu beschweren.
            </p>
          </section>

          {/* Stand */}
          <section>
            <p className="text-[13px] italic" style={{ color: "var(--text-soft)" }}>
              Stand: März 2026
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
