import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://entrestate.app";

  // In a real app, you would fetch these from a database
  const projects = [{ slug: 'emaar-beachfront' }, { slug: 'sobha-hartland' }];
  const apps = [{ slug: 'meta-suite' }, { slug: 'listing-portal-pro' }];
  const articles = [{ slug: 'intro' }, { slug: 'whatsmap' }];

  const projectUrls = projects.map((p) => ({
    url: `${base}/project/${p.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const appUrls = apps.map((a) => ({
    url: `${base}/appstore/${a.slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const articleUrls = articles.map((a) => ({
    url: `${base}/docs/project-book/${a.slug}`,
    lastModified: new Date(),
    priority: 0.5,
  }));
 
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...projectUrls,
    ...appUrls,
    ...articleUrls,
  ]
}
