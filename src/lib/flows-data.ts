import { LucideIcon } from "lucide-react";

export interface FlowData {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Marketing' | 'Operations' | 'Sales' | 'Creative' | 'Listing';
  steps: {
    toolId: string;
    description: string;
  }[];
}

export const flowsData: FlowData[] = [
  {
    id: 'full-rebrand-flow',
    title: 'Full Rebrand & Launch',
    description: 'Rebrand a brochure, generate a landing page, and create an ad campaign in one click.',
    iconName: 'Wand2',
    category: 'Marketing',
    steps: [
      { toolId: 'rebranding', description: 'Rebrand source PDF with new identity.' },
      { toolId: 'landing-pages', description: 'Generate a new landing page from the rebranded content.' },
      { toolId: 'insta-ads-designer', description: 'Create a social media ad campaign for the new landing page.' },
    ],
  },
  {
    id: 'neighborhood-investment-report',
    title: 'Neighborhood Investment Report',
    description: 'Generate a deep-dive investment report for any neighborhood, including trends, ROI, and sentiment.',
    iconName: 'FileSearch',
    category: 'Sales',
    steps: [
      { toolId: 'market-data-api', description: 'Fetch raw market data for the target neighborhood.' },
      { toolId: 'ai-analyst', description: 'Analyze trends, ROI, and growth potential.' },
      { toolId: 'pdf-generator', description: 'Compile analysis into a professional PDF report.' },
    ],
  },
  {
    id: 'market-movement-report',
    title: 'Market Movement Report',
    description: 'Generate a professional-grade market analysis based on a specific trigger or event.',
    iconName: 'BarChart3',
    category: 'Sales',
    steps: [
      { toolId: 'web-search', description: 'Gather information on the specified market event.' },
      { toolId: 'ai-analyst', description: 'Synthesize data and generate key insights.' },
      { toolId: 'document-formatter', description: 'Format insights into a shareable document.' },
    ],
  },
  {
    id: 'competitor-listing-monitor',
    title: 'Competitor Listing Monitor',
    description: 'Monitor a set of competitor listings and get alerted on price changes or status updates.',
    iconName: 'Eye',
    category: 'Listing',
    steps: [
      { toolId: 'listing-scraper', description: 'Scrape data from competitor listing URLs.' },
      { toolId: 'data-comparator', description: 'Compare current data with historical data.' },
      { toolId: 'alerting-system', description: 'Send an alert if significant changes are detected.' },
    ],
  },
  {
    id: 'generate-brochure-from-listing',
    title: 'Generate Brochure from Listing',
    description: 'Automatically create a beautiful, branded PDF brochure from a property listing URL.',
    iconName: 'BookImage',
    category: 'Creative',
    steps: [
      { toolId: 'listing-scraper', description: 'Extract images, text, and data from the listing URL.' },
      { toolId: 'brand-kit-applier', description: 'Apply user\'s brand kit (logo, colors, fonts).' },
      { toolId: 'pdf-generator', description: 'Arrange content into a professional brochure layout and generate PDF.' },
    ],
  },
];