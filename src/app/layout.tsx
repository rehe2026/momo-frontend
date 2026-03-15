import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Momo – Euer digitaler Familienbegleiter",
  description:
    "Momo organisiert euren Familienalltag – mit Charme, Witz und viel Herz. Jetzt zum Pre-Beta-Test anmelden.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
