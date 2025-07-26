// Lokasi: app/layout.tsx

import { AuthProvider } from "@/components/AuthProvider";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desa Slorok",
  description: "Website resmi Desa Slorok - Desa yang maju, mandiri, dan sejahtera",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // UBAH DI SINI: Tambahkan suppressHydrationWarning
    <html lang="id" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}