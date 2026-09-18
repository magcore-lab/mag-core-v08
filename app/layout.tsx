import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAGCORE ENGINE — ENTER THE CORE",
  description: "MAGCORE V11.2 — DIAMANT PUR SANS ANNEAUX — FINAL",
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
