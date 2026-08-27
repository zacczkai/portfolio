import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.enzoguerreiro.com.br"),
  title: "Enzo Guerreiro | Publicidade, Design e Motion Graphics",
  description: "Portfólio autoral de Enzo Guerreiro, explorando direção de arte, motion graphics, edição, sound design e color grading.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Enzo Guerreiro | Publicidade, Design e Motion Graphics",
    description: "Portfólio autoral de Enzo Guerreiro.",
    url: "https://www.enzoguerreiro.com.br/",
    siteName: "Enzo Guerreiro",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
        <div className="relative">
          {children}
        </div>
      </LanguageProvider>
      </body>
    </html>
  );
}
