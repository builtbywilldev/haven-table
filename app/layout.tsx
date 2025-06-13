// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "The Haven Table",
  description: "A tactical debate platform from Silent Prototype Labs.",
  metadataBase: new URL("https://haven-table.vercel.app"),
  openGraph: {
    title: "The Haven Table",
    description: "Where logic speaks, not shouts.",
    url: "https://haven-table.vercel.app",
    siteName: "The Haven Table",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Haven Table",
    description: "Where logic speaks, not shouts.",
  },
};

// Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-gray-100">
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
