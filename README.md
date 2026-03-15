# Momo Frontend

Landingpage mit integriertem Chat-Interface für das Momo Familien-Onboarding.

## Setup

```bash
# Dependencies installieren
npm install

# Umgebungsvariablen konfigurieren
cp .env.local.example .env.local
# → LANGDOCK_API_KEY und Agent-IDs eintragen

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000).

## Architektur

```
Browser ──POST /api/chat──→ Next.js Server ──POST──→ Langdock Agent API
                ↑                                           │
                └───────── SSE Stream ←─────────────────────┘
```

- Der API Key bleibt serverseitig (nie im Browser)
- Alle Agent-Calls laufen über `/api/chat` als Proxy
- Streaming via Server-Sent Events für Echtzeit-Antworten

## Agent-Sequenz

1. **Orchestrator (init)** – Liest User-Name, setzt Status "Offen"
2. **Onboarding** – Erfasst Familienmitglieder, Hobbys, Routinen etc.
3. **Terminierung** – Erstellt Zeitpläne
4. **Planung** – KI-gestützter Gesamtplan
5. **Go-Live** – TestFlight-Link, Zusammenfassung
6. **Orchestrator (end)** – Setzt Status "Erledigt", sendet E-Mail

## Deployment (Vercel)

1. Repository auf GitHub pushen
2. In Vercel importieren
3. Environment Variables setzen (Settings → Environment Variables)
4. Fertig – deployed automatisch bei jedem Push
