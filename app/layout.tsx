import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerPath AI - Your AI-Powered Career Guide",
  description: "From Confusion to Career Clarity - AI-powered career guidance for college students preparing for campus placements",
  keywords: ["career guidance", "AI", "campus placements", "college students", "career path"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
