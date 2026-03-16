import Link from "next/link";

export default function Impressum() {
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
          Impressum
        </h1>

        <div className="space-y-6 text-[15px] leading-[1.7]" style={{ color: "var(--text-mid)" }}>
          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Angaben gemäß § 5 TMG
            </p>
            <p>
              destineo GmbH & Co. KG<br />
              Hegestraße 13<br />
              20251 Hamburg
            </p>
          </div>

          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Kontakt
            </p>
            <p>
              Telefon: +49 (0)40 3197 7400<br />
              E-Mail: mail@destineo.com
            </p>
          </div>

          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Handelsregister
            </p>
            <p>
              Amtsgericht Hamburg<br />
              HRA-Nr. 115794<br />
              USt-ID: DE287510449
            </p>
          </div>

          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Geschäftsführer
            </p>
            <p>Rebecca Heinz, Robin Wegner</p>
          </div>

          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Inhaltlich verantwortlich gemäß § 6 MDStV
            </p>
            <p>
              Rebecca Heinz, Robin Wegner<br />
              (Adresse wie oben)
            </p>
          </div>

          <div>
            <p className="font-semibold" style={{ color: "var(--text)" }}>
              Haftungsausschluss
            </p>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
              für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
              sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
