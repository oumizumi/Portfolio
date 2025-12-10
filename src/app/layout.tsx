import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeInit from "@/components/layout/ThemeInit";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["SF Mono", "Fira Code", "Consolas", "Monaco", "Courier New", "monospace"],
});

export const metadata: Metadata = {
title: "my portfolio! #coyb!",
  description: "coyb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased min-h-screen snap-y snap-mandatory text-gray-900 dark:text-white`}>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
