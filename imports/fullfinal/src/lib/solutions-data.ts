
export interface SolutionDetails {
  title: string;
  tagline: string;
  vision: string;
  dna: string;
  price: number;
  cta: { text: string; href: string };
  productCore: string[];
  techStack: { [key: string]: string };
  useCases: string[];
  growthPath: string[];
}

export const solutionsData: { [key: string]: SolutionDetails } = {
  'meta-marketing-suite': {
    title: 'Meta Marketing Suite',
    tagline: 'Your AI-powered marketing team',
    vision: 'To automate and optimize social media marketing for real estate professionals.',
    dna: 'Data-driven, automated, and results-oriented.',
    price: 149,
    cta: { text: 'Get Started', href: '/login' },
    productCore: [
      'AI-Powered Campaign Creation',
      'Automated Ad Design',
      'Audience Targeting Suggestions',
      'Performance Analytics Dashboard',
    ],
    techStack: {
      frontend: 'Next.js',
      backend: 'Node.js',
      database: 'Firestore',
      ai: 'Genkit',
    },
    useCases: [
      'Launch a new property development',
      'Generate leads for a specific listing',
      'Increase brand awareness in a new market',
    ],
    growthPath: [
      'Integrate with Google Ads',
      'Add support for TikTok',
      'Develop more advanced AI models',
    ],
  },
};
