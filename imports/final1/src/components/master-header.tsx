'use client';
import Link from 'next/link';
export default function MasterHeader(){
  return (<header className="border-b border-white/10 bg-black/30 backdrop-blur sticky top-0 z-40">
    <div className="container py-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold">Entrestate</Link>
      <nav className="flex gap-2 text-sm">
        <Link className="btn" href="/solutions">Solutions</Link>
        <Link className="btn" href="/marketplace">Marketplace</Link>
        <Link className="btn" href="/academy">Academy</Link>
        <Link className="btn" href="/whatsmap">WhatsMAP</Link>
        <Link className="btn" href="/contact">Contact</Link>
      </nav>
    </div>
  </header>);
}
