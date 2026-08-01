import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aorte - Graduatim, Potens.",
    template: "%s - Aorte",
  },
  description:
    "Nous ne créons pas seulement des outils, nous forgeons l'infrastructure numérique d'une nouvelle génération.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <BackToTop />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
