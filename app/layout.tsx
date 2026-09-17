import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MAGMORE ENGINE — ENTER THE CORE — V10.1 FINAL — NOYAU ACTIF 100% — DIAMANT BLANC',
  description: 'MAGMORE — Moteur d\'interpolation cinématique — Diamant blanc actif 100% — Rétro luminescence pure — 3 écrans indépendants actifs — 10 modules opérationnels — GPU accélération — ENTER THE CORE',
  keywords: ['MAGMORE', 'ENTER THE CORE', 'MAG CORE', 'diamant blanc', 'noyau actif', 'retro luminescence'],
  authors: [{ name: 'MAGMORE' }],
  creator: 'MAGMORE',
  openGraph: {
    title: 'MAGMORE — ENTER THE CORE — V10.1 FINAL',
    description: 'Noyau énergie maîtrisé — Diamant blanc actif 100% — Rétro luminescence cinématique pure — No triangle',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#000', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
