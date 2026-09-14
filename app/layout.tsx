import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAG CORE V08 - BLACK EDITION | Noyau Vantablack",
  description: "Noyau Vantablack, 7 ondes, Black Edition - MAG CORE V08",
  metadataBase: new URL("https://mag-core-v08.vercel.app"),
  verification: {
    google: "Ey-30t14KVrfah4s5igVBx4WccjUmNcKRCSY3TW7WIQ",
  },
  openGraph: {
    type: "website",
    url: "https://mag-core-v08.vercel.app/",
    title: "MAG CORE V08 - BLACK EDITION | Noyau Vantablack",
    description: "Noyau Vantablack, 7 ondes, Black Edition - MAG CORE V08",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAG CORE V08 - BLACK EDITION | Noyau Vantablack",
    description: "Noyau Vantablack, 7 ondes, Black Edition - MAG CORE V08",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
