import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrestate — AI-Native Real Estate OS",
  description: "Market intelligence, creative tooling, and campaign automation in one cockpit.",
};

function Nav() {
  const links = [
    { href: "/", label: "Discover" },
    { href: "/market-library", label: "Market Library" },
    { href: "/whatsmap", label: "WhatsMAP" },
    { href: "/appstore", label: "Appstore" },
    { href: "/me/gem", label: "GEM" },
  ];
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold">Entrestate</Link>
        <nav className="flex gap-4 text-sm text-neutral-700">
          {links.map(l => <Link key={l.href} href={l.href} className="hover:text-black">{l.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <Nav/>
        <main className="container py-10">{children}</main>
      </body>
    </html>
  );
}
