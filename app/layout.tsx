
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAG CORE — THE CORE™",
  description: "MAG CORE — THE CORE™ — V19 BLACK EDITION | MAG CORE OS — Core Lock V08 — DIAMANT PUR SANS ANNEAU — FINAL",
  openGraph: {
    title: "MAG CORE — THE CORE™",
    description: "V19 BLACK EDITION | MAG CORE OS — Core Lock V08",
  }
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
