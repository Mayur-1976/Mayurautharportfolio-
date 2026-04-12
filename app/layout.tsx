import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mayur Suthar — Backend Developer & AI Enthusiast",
  description:
    "Portfolio of Mayur Suthar — BCA student, backend developer, AI/ML enthusiast, and DevOps learner from Sardar Patel University.",
  keywords: [
    "Mayur Suthar",
    "Backend Developer",
    "AI/ML",
    "DevOps",
    "Portfolio",
    "BCA Student",
    "Sardar Patel University",
  ],
  authors: [{ name: "Mayur Suthar" }],
  openGraph: {
    title: "Mayur Suthar — Backend Developer & AI Enthusiast",
    description:
      "Portfolio of Mayur Suthar — BCA student, backend developer, AI/ML enthusiast, and DevOps learner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrains.variable}`}
    >
      <body
        className="font-[family-name:var(--font-outfit)] antialiased noise-overlay"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
