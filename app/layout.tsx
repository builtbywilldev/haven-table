// app/layout.tsx
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner"; // ✅ ADD THIS

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Haven Table",
  description: "A tactical debate platform from Silent Prototype Labs.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "The Haven Table",
    description: "Where logic speaks, not shouts.",
    url: "http://localhost:3000",
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6C47FF",
          colorBackground: "#1F1F23",
        },
      }}
    >
      <html lang="en" className="bg-black text-gray-100">
        <body
          className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        >
          <header className="p-4 flex gap-4 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-full bg-[#6C47FF] text-white hover:bg-[#845FFF] transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* ✅ Mount toast system here */}
          <Toaster richColors position="bottom-right" theme="dark" />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
