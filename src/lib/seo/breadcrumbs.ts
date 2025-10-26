
// src/lib/seo/breadcrumbs.ts
export function breadcrumbsJsonLd(items: { name: string; url: string }[]){
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, i) => ({
      "@type": "ListItem",
      "position": i+1,
      "name": it.name,
      "item": it.url
    }))
  };
}
