import type { Metadata } from "next";
type SeoOpts = { title?: string; description?: string; url?: string; image?: string; canonical?: string; };
const SITE = { name: "Entrestate", base: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", defaultImage: "/og.png", twitter: "@entrestate_ai" };
export function buildMeta(opts: SeoOpts = {}): Metadata {
  const title = opts.title || "Entrestate — AI-Native Real Estate OS";
  const description = opts.description || "Market intelligence, creative tooling, and campaign automation in one cockpit.";
  const url = opts.url || SITE.base;
  const image = opts.image || SITE.defaultImage;
  const canonical = opts.canonical || url;
  return {
    title, description, metadataBase: new URL(SITE.base),
    alternates: { canonical },
    openGraph: { title, description, url, siteName: SITE.name, type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", creator: SITE.twitter, title, description, images: [image] },
  };
}
export function orgJsonLd() { return {"@context":"https://schema.org","@type":"Organization","name":"Entrestate","url":SITE.base,"logo":SITE.base+"/logo.svg"}; }
export function productJsonLd(name: string, url: string, description: string) {
  return {"@context":"https://schema.org","@type":"SoftwareApplication","name":name,"applicationCategory":"BusinessApplication","operatingSystem":"Web","url":url,"description":description};
}
