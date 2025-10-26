import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Entrestate</h1>
      <p className="text-neutral-600">AI-native real estate OS · Start with Market Library or WhatsMAP.</p>
      <div className="flex gap-3">
        <Link className="btn" href="/market-library">Open Market Library</Link>
        <Link className="btn-outline" href="/whatsmap">Open WhatsMAP</Link>
      </div>
    </div>
  );
}
