import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PocBar from "@/components/PocBar";
import DevLayout from "@/components/DevLayout";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";

import '../mobile/mobile-bwallet.css';
import MobileShellInit from '../mobile/MobileShellInit';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin DNS",
  description: "Decentralized Domain Name System on Bitcoin SV blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileShellInit />
        <PocBar />
        <DevLayout>
          {children}
          <Footer />
        </DevLayout>
        <Dock />
      </body>
    </html>
  );
}
