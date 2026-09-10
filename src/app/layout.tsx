import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Libre_Franklin, Inter } from "next/font/google";
import "./globals.css";

const heading = Libre_Franklin({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LedgifyBPO — Bookkeeping & Accounting for Growth-Stage Businesses",
  description:
    "LedgifyBPO delivers meticulous day-to-day bookkeeping, audit-ready financial reporting, and payroll infrastructure designed specifically for growth-stage businesses.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
