
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAG CORE — THE CORE™",
  description:
    "MAG CORE — THE CORE™ — V19 BLACK EDITION | MAG CORE OS — Core Lock V08 — DIAMANT PUR SANS ANNEAU — FINAL",
  openGraph: {
    title: "MAG CORE — THE CORE™",
    description:
      "V19 BLACK EDITION | MAG CORE OS — Core Lock V08 — 7 ONDES — DIAMANT PUR",
    type: "website",
    locale: "en_US",
    siteName: "MAG CORE — THE CORE™",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAG CORE — THE CORE™",
    description: "V19 BLACK EDITION | MAG CORE OS — Core Lock V08",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.tsx",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
