
import "./globals.css";
export const metadata = {
  title: "MAGMORE ENGINE — ENTER THE CORE — V10.1 FINAL — NOYAU ACTIF 100%",
  description: "MAGMORE V10.1 NOYAU ACTIF 100%",
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
