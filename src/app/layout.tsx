import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAMB Maths Teacher",
  description: "Online Mathematics support for Nigerian students preparing for JAMB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
