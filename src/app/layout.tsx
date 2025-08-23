import "./globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RouteChangeFullScreenLoader from "./components/RouteChangeFullScreenLoader";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: {
    default: "PequeChat – Mensajería segura para niños",
    template: "%s | PequeChat",
  },
  description:
    "PequeChat: mensajería segura para niños con control parental y enfoque escolar.",
  keywords: [
    "PequeChat",
    "chat infantil",
    "mensajería escolar",
    "control parental",
    "seguridad niños",
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: "/PequeLogoSinTexto.png",
    shortcut: "/PequeLogoSinTexto.png",
    apple: "/PequeLogoSinTexto.png",
  },
  openGraph: {
    title: "PequeChat – Mensajería segura para niños",
    description:
      "Plataforma de chat controlado por padres, ideal para entornos escolares.",
    url: "https://pequechat.com/",
    siteName: "PequeChat",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://pequechat.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PequeChat – Mensajería segura para niños",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PequeChat – Mensajería segura para niños",
    description:
      "Chat escolar con control parental y máxima seguridad — PequeChat.",
    creator: "@PequeChatApp",
    images: ["https://pequechat.com/twitter-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://pequechat.com/",
    name: "PequeChat",
    description:
      "Chat seguro para niños con supervisión de padres, ideal en entornos educativos.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pequechat.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
  <html lang="es" className={fredoka.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href="https://pequechat.com/" />
        <meta name="theme-color" content="#0096C7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
  <body className="relative flex min-h-screen flex-col bg-gradient-to-br from-white via-azul8/20 to-azul9/30 transition-colors">
        <RouteChangeFullScreenLoader />
        <Header />
        <main className="flex-grow" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
