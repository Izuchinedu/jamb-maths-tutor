import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tutor", label: "Ask Teacher" },
  { href: "/live-class", label: "Live Class" },
  { href: "/quiz", label: "Quiz" },
  { href: "/admin", label: "Admin" },
];

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
      <body>
        <header className="border-b border-slate-200 bg-white/95 text-slate-900 shadow-sm">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="text-lg font-bold text-green-800">
              JAMB Maths Teacher
            </Link>
            <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-2 transition hover:bg-green-50 hover:text-green-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
