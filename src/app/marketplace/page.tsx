
'use client';

import React from 'react';
import { Check, Sparkles, Target, ClipboardList, Lightbulb, Palette, Bot, ArrowRight, DollarSign, Users, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PricingCard } from '@/components/pricing-card';
import { motion } from 'framer-motion';
import { suites, tools, ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CreativeCanvas } from '@/components/creative-canvas';
import { DashboardMetricCard } from '@/components/ui/dashboard-service-card';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

const ToolCard = ({ tool, className }: { tool: ToolData, className?: string }) => (
    <Card className={`bg-background/50 shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}>
        <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg text-white" style={{backgroundColor: tool.color}}>
                <DynamicIcon name={tool.iconName} className="h-6 w-6" />
            </div>
            <div>
                <p className="font-semibold">{tool.title}</p>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
        </CardContent>
    </Card>
);


export default function MarketplacePage() {
    const metaSuite = suites.find(s => s.name === 'Meta Marketing Suite')!;
    const listingSuite = suites.find(s => s.name === 'AI Listing Portal')!;
    const leadSuite = suites.find(s => s.name === 'Lead Intelligence AI')!;
    const creativeSuite = suites.find(s => s.name === 'AI Creative Studio')!;

  return (
    <div className="flex flex-col">
        <main className="flex-1 w-full">
            <div className="pt-24 text-center">
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    The AI Operating System for Real Estate
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/70">
                   More than just apps. These are integrated AI toolkits designed to solve your biggest challenges.
                </p>
            </div>

            {/* Meta Marketing Suite */}
            <section className="py-24">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="max-w-lg">
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mb-6 shadow-sm">
                                    <Target className="h-10 w-10" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{metaSuite.description}</h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Go from idea to active campaign in minutes. This suite provides everything you need to create, manage, and optimize your Facebook and Instagram ads.
                                </p>
                            </motion.div>
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                <PricingCard {...metaSuite} />
                            </motion.div>
                        </div>
                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
                                <DashboardMetricCard title="Ad Spend" value="$2,450" change="+15.2%" changeType="increase" Icon={DollarSign} />
                            </motion.div>
                             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
                                <DashboardMetricCard title="Leads Generated" value="312" change="+21.7%" changeType="increase" Icon={Users} />
                            </motion.div>
                             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
                                <DashboardMetricCard title="Click-Through Rate" value="4.8%" change="-2.1%" changeType="decrease" Icon={MousePointerClick} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* AI Listing Portal */}
             <section className="py-24 bg-muted/30">
                 <div className="container max-w-screen-xl mx-auto px-4 text-center">
                    <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mb-6 mx-auto shadow-sm">
                        <ClipboardList className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 max-w-3xl mx-auto">{listingSuite.description}</h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
                        Create a single source of truth for your property data. Our AI consolidates, verifies, and syndicates perfectly formatted listings to all major portals.
                    </p>
                    <div className="max-w-4xl mx-auto">
                        <Card className="shadow-2xl">
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                                    <div className="space-y-4">
                                        <ToolCard tool={tools.find(t => t.id === 'listing-generator')!} />
                                        <ToolCard tool={tools.find(t => t.id === 'propertyfinder-sync')!} />
                                    </div>
                                    <div className="text-center">
                                        <ArrowRight className="h-12 w-12 text-primary mx-auto animate-pulse" />
                                        <p className="font-semibold mt-2">AI Processing & Verification</p>
                                    </div>
                                    <div className="p-6 bg-green-500/10 rounded-lg shadow-inner">
                                        <h3 className="font-bold text-lg text-green-700">Perfectly Syndicated Listings</h3>
                                        <p className="text-sm text-muted-foreground mt-2">Accurate, optimized, and ready for all major portals.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="mt-12 max-w-md mx-auto">
                        <PricingCard {...listingSuite} isPopular={false}/>
                    </div>
                </div>
            </section>

             {/* AI Creative Studio */}
            <section className="py-24 bg-background overflow-hidden">
                <div className="container max-w-screen-xl mx-auto px-4">
                     <div className="text-center">
                        <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mb-6 mx-auto shadow-sm">
                            <Palette className="h-10 w-10" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 max-w-3xl mx-auto">{creativeSuite.description}</h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                           Generate stunning visuals, videos, and marketing copy on demand. This suite is your secret weapon for creating high-quality content that captures attention.
                        </p>
                    </div>
                    <CreativeCanvas />
                     <div className="mt-12 max-w-md mx-auto">
                         <PricingCard {...creativeSuite} />
                    </div>
                </div>
            </section>

             {/* Lead Intelligence AI */}
             <section className="py-24 bg-muted/30">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                         <div className="max-w-lg">
                            <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mb-6 shadow-sm">
                                <Lightbulb className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{leadSuite.description}</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Transform raw data into actionable insights. This suite provides a powerful set of tools to analyze deals, understand market trends, and match investors with the right properties.
                            </p>
                             <div className="mt-12">
                                <PricingCard {...leadSuite} isPopular={true} />
                            </div>
                        </div>
                        <div className="relative h-[450px]">
                            <ToolCard tool={tools.find(t => t.id === 'deal-analyzer')!} className="absolute top-0 left-10" />
                            <ToolCard tool={tools.find(t => t.id === 'market-reports')!} className="absolute top-1/3 right-0" />
                            <ToolCard tool={tools.find(t => t.id === 'investor-matching')!} className="absolute bottom-10 left-0" />
                             <ToolCard tool={tools.find(t => t.id === 'projects-finder')!} className="absolute bottom-0 right-10" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Final CTA */}
            <section className="text-center py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><Bot className="h-10 w-10" /></div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading max-w-3xl mx-auto">Need a Custom Solution?</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Have a unique challenge? We can build a custom AI agent or a full suite tailored to your specific needs.
                    </p>
                    <div className="mt-8">
                        <Link href="/contact">
                            <Button size="lg">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}
