import type { Metadata, Viewport } from "next";
import { Anek_Latin, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const anek = Anek_Latin({
  variable: "--font-anek",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.enzoguerreiro.com.br"),
  title: "Enzo Guerreiro | Motion & Direção de Arte",
  description: "Portfólio de Enzo Guerreiro: direção de arte, motion graphics, edição, sound design e design institucional.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Enzo Guerreiro | Motion & Direção de Arte",
    description: "Direção de arte, edição e motion para histórias que precisam ser sentidas antes de serem explicadas.",
    url: "/",
    siteName: "Enzo Guerreiro",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" className={`${anek.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
