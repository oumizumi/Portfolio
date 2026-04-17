import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeInit from "@/components/layout/ThemeInit";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = 'https://oumizumi.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Oumer Gharad',
    template: '%s · Oumer Gharad',
  },
  description: 'Second-year CS student at uOttawa building clean interfaces and reliable systems.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Oumer Gharad',
    description: 'Second-year CS student at uOttawa building clean interfaces and reliable systems.',
    url: siteUrl,
    siteName: 'Oumer Gharad',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oumer Gharad',
    description: 'Second-year CS student at uOttawa building clean interfaces and reliable systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-base text-warm-white`}>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
