import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAG CORE V64 FINAL SANS CASSE - QUANTUM",
  description: "MAGCORE SP01 RC1 - 097bbf6 - 537e46c2 - 38 FILES - 37500000 bytes - LE FUTUR SE CONSTRUIT DANS L INVISIBLE - GO PUR 60 SUR 60 VERROUILLE - QUANTIQUE EST LA - EMULATION CORRECTE - V64 FINAL SANS CASSE - BUILD 100PCT OK",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
