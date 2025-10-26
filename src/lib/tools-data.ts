
import {
    LayoutGrid, List, Search, AppWindow, Bot, Sparkles, MessageCircle, FileJson, Telescope,
    BrainCircuit, Lightbulb, Workflow, Feather, Megaphone, Target, BarChart3, ReceiptText,
    Code, Database, Rocket, Settings, CreditCard, Users, Palette, Facebook, Briefcase, Server,
    CheckCircle, ArrowRight
} from 'lucide-react';

// Centralized type definitions for clarity
export type ToolCategory = "Sales & CRM" | "Listings" | "Marketing" | "Creative" | "Market Intelligence" | "Development" | "Operations" | "Admin";
export type SuiteName = "Lead Intelligence" | "Listing Intelligence" | "Meta Intelligence" | "Creative Intelligence" | "SuperSellerSuite" | "Cloud Intelligence" | "No Suite";

export interface Tool {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    icon: React.ReactNode;
    color: string;
    categories: ToolCategory[];
    suite: SuiteName;
    cta: string;
}

export interface Suite {
    id: string;
    name: SuiteName;
    description: string;
    longDescription: string;
    icon: React.ReactNode;
}

export interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
}

// The Grand Showcase: Public Marketplace Pricing Tiers
export const pricingTiers: PricingTier[] = [
    {
        name: "Pro Agent",
        price: "$99",
        description: "For the ambitious agent who needs an AI-powered co-pilot.",
        features: [
            "Lead Intelligence Suite",
            "Listing Intelligence Dashboard",
            "Meta Intelligence Suite",
            "500,000 AI Tokens/month",
            "Community Hub Access",
        ],
        cta: "Get Started with Pro"
    },
    {
        name: "Agency",
        price: "$299",
        description: "For teams who need to collaborate and scale their operations.",
        features: [
            "All Pro Agent features",
            "Creative Intelligence Suite",
            "SuperSellerSuite",
            "2,000,000 AI Tokens/month",
            "Team Collaboration (3 Seats)",
        ],
        cta: "Choose Agency"
    },
    {
        name: "Enterprise",
        price: "Contact Us",
        description: "For market leaders who need unlimited power and dedicated support.",
        features: [
            "All Agency features",
            "Cloud Intelligence Suite (API Access)",
            "Unlimited AI Tokens",
            "Dedicated Support & Onboarding",
        ],
        cta: "Contact Sales"
    }
];

// The Suites: The core pillars of the Entrestate OS
export const suites: Suite[] = [
    { id: "lead-intelligence", name: "Lead Intelligence", description: "A lead-by-lead command center that transforms every lead into a project.", longDescription: "Stop managing lists and start closing deals. This suite transforms your CRM into an intelligent, automated conversion engine that investigates leads, finds matching properties, and drafts personalized outreach before you even open your inbox.", icon: <Users /> },
    { id: "listing-intelligence", name: "Listing Intelligence", description: "A dynamic workspace for managing and optimizing your property listings.", longDescription: "Connect directly to Bayut and Property Finder. This suite is your AI co-pilot for optimizing listings, analyzing performance, and ensuring your properties are always presented perfectly to the market.", icon: <List /> },
    { id: "meta-intelligence", name: "Meta Intelligence", description: "A true AI-powered command center for the entire Meta ecosystem.", longDescription: "Launch smarter ads—no media buying experience needed. This suite uses market data to build hyper-targeted audiences, generate on-brand creatives, and manage campaigns for maximum ROI.", icon: <Facebook /> },
    { id: "creative-intelligence", name: "Creative Intelligence", description: "A unified, intelligent workspace that seamlessly integrates with the rest of the Entrestate OS.", longDescription: "Turn a brochure into a full campaign in one click. Your in-house creative agency, powered by AI, for generating logos, videos, landing pages, and any other marketing asset you need.", icon: <Palette /> },
    { id: "super-seller-suite", name: "SuperSellerSuite", description: "An app-based ecosystem of generative AI tools for closing deals.", longDescription: "AI that closes deals before you do. An app-based ecosystem of generative AI tools designed to deliver an unprecedented level of deal intelligence and workflow automation.", icon: <Briefcase /> },
    { id: "cloud-intelligence", name: "Cloud Intelligence", description: "The engine that will power the next generation of real estate applications.", longDescription: "For the visionaries. Deploy our Search, Chat, and Market Data APIs to build your own next-generation real estate applications on the Entrestate Cloud.", icon: <Server /> },
];

// The Tools: The individual applications within each suite
export const tools: Tool[] = [
    // Lead Intelligence
    { id: 'sales-pilot', title: 'Sales Pilot', description: 'Automates the entire sales process, from lead investigation to closing.', longDescription: 'Activate the Sales Pilot to automatically investigate new leads, find matching properties, and draft personalized outreach.', icon: <Bot />, color: '#4A90E2', categories: ['Sales & CRM'], suite: 'Lead Intelligence', cta: 'Run Sales Pilot' },
    { id: 'lead-prioritization', title: 'Lead Prioritization', description: 'Automatically surfaces high-priority leads and provides actionable, AI-driven insights.', longDescription: 'Your highest-potential leads, scored and sorted by Gemini based on engagement, market alignment, and historical data.', icon: <Target />, color: '#4A90E2', categories: ['Sales & CRM'], suite: 'Lead Intelligence', cta: 'View Prioritized List' },

    // Listing Intelligence
    { id: 'listing-optimizer', title: 'Listing Optimizer', description: 'Automatically surfaces underperforming listings and provides actionable, AI-driven recommendations for improvement.', longDescription: 'Identify and fix issues with your listings, from low-quality photos to missing virtual tours, all with AI-powered recommendations.', icon: <Sparkles />, color: '#50E3C2', categories: ['Listings'], suite: 'Listing Intelligence', cta: 'Optimize Listings' },
    { id: 'market-registry', title: 'Unified Market Registry', description: 'Explore the entire Dubai real estate market with a powerful, data-driven search engine.', longDescription: 'Search, filter, and explore a comprehensive database of projects, developers, and properties, all verified and scored by our AI.', icon: <Library />, color: '#50E3C2', categories: ['Listings', 'Market Intelligence'], suite: 'Listing Intelligence', cta: 'Explore Registry' },

    // Meta Intelligence
    { id: 'campaign-orchestrator', title: 'Campaign Orchestrator', description: 'Launch, manage, and optimize high-performing Meta ad campaigns with the power of AI.', longDescription: 'Go from zero to hero in AI-powered advertising. This tool uses market data to build hyper-targeted audiences, generate on-brand creatives, and manage campaigns for maximum ROI.', icon: <Megaphone />, color: '#7B61FF', categories: ['Marketing'], suite: 'Meta Intelligence', cta: 'Launch Campaign' },
    
    // ... (and so on, for every tool)
];
