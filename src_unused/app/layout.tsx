import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindMaple | Futuristic Career Guidance",
  description: "AI-powered career guidance platform for college students preparing for campus placements.",
};

import AIAssistant from "@/components/AIAssistant";
import AuthProvider from "@/components/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-cyan-500/30`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <AIAssistant />
        </AuthProvider>
      </body>
    </html>
  );
}
