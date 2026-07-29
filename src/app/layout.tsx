import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Artenza — Art Gallery & Custom Commissions",
  description:
    "Discover curated artwork and commission custom pieces. Artenza brings art and Renaissance together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased bg-page text-body`}
      >
        {children}
      </body>
    </html>
  );
}
