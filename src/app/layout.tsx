import { siteMetadata } from "@/lib/seo";
import { SiteStructuredData } from "@/components/structured-data";
import type { ReactNode } from "react";
import { Libre_Franklin, Inter } from "next/font/google";
import "@/components/homepage-intro.css";
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

export const metadata = siteMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
        <SiteStructuredData />
      </body>
    </html>
  );
}
