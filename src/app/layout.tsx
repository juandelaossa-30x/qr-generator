import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Create QR codes instantly",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
