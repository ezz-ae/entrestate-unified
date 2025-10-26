
import { MetadataRoute } from 'next'
import { DataIntelligenceService } from '@/services/data-intelligence';

export default function sitemap(): MetadataRoute.Sitemap {
  const dataService = DataIntelligenceService.getInstance();
  const projects = dataService.getAllProjects();

  const publicPages = [
    '',
    '/about',
    '/solutions',
    '/appstore',
    '/flows',
    '/academy',
    '/market-library',
    '/live-market-dashboard',
    '/whatsmap',
    '/contact',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `https://www.entrestate.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
  
  const solutionPages = Object.keys(suites).map(slug => ({
    url: `https://www.entrestate.com/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.9,
  }));
  
  const projectPages = projects.map(project => ({
    url: `https://www.entrestate.com/project/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as 'daily',
    priority: 0.7,
  }));

  return [
    ...publicPages,
    ...solutionPages,
    ...projectPages,
  ];
}

const suites: { [key: string]: { name: string } } = {
    "lead-intelligence": { name: "Lead Intelligence Suite" },
    "listing-intelligence": { name: "Listing Intelligence Dashboard" },
    "meta-intelligence": { name: "Meta Intelligence Suite" },
    "creative-intelligence": { name: "Creative Intelligence Suite" },
    "super-seller-suite": { name: "SuperSellerSuite" },
    "cloud-intelligence": { name: "Cloud Intelligence Suite" },
};
