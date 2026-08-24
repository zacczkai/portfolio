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
  title: "Enzo Guerreiro | Portfolio de Publicidade, Design e Motion Graphics",
  description: "Portfolio de Enzo Guerreiro. Especialista em Publicidade e Propaganda, Direção de Arte, Motion Graphics e Color Grading.",
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
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
