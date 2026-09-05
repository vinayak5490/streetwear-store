import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:{
    default: "DRIP | Minimal Streetwear & Utility Wear",
    template: "%s | DRIP",
  },
  description: "High-performance minimal streetwear featuring oversized silhouettes, utility cargo, and luxury essentials.",
  openGraph:{
    title: "DRIP | Minimal Streetwear",
    description: "Wear your attitude. Minimal Streetwear built for the crowd",
    siteName: "DRIP",
    locale: "en_US",
    type: "website",
  },
  robots:{
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
