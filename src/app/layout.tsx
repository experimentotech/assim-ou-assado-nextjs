import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Script from "next/script";
import { minify } from "@/utils/minifier";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assim ou Assado - Conversor de Ingredientes | ExperimentoTech",
  description:
    "Encontre a medida certa para substituir ingredientes mantendo os mesmos nutrientes. Compare proteínas, carboidratos e gorduras de forma prática.",
  keywords:
    "substituição de alimentos, conversor de ingredientes, nutrientes, macronutrientes, proteína, carboidrato, gordura, culinária",
  authors: [{ name: "ExperimentoTech" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.experimentotech.com/assim-ou-assado/",
    title: "Assim ou Assado - Conversor de Ingredientes",
    description:
      "Encontre a medida certa para substituir ingredientes mantendo os mesmos nutrientes.",
    siteName: "Assim ou Assado",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assim ou Assado - Conversor de Ingredientes",
    description:
      "Encontre a medida certa para substituir ingredientes mantendo os mesmos nutrientes.",
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
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID || "";
  return (
    <html lang="pt-BR">
      <head>
        <Script
          id="gtmConsentBridge"
          dangerouslySetInnerHTML={{
            __html: minify("src/scripts/consent.gtm.js"),
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleTagManager gtmId={analyticsId} />
    </html>
  );
}
