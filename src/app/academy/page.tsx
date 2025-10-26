
'use client';

import React from 'react';
import { ArrowRight, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { suites } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

const suiteIcons: Record<string, string> = {
    'Meta Marketing Suite': 'Target',
    'AI Listing Portal': 'ClipboardList',
    'Lead Intelligence AI': 'Lightbulb',
    'AI Creative Studio': 'Palette',
    'Marketing Management': 'Briefcase',
    'Google Ads Suite': 'MousePointerSquare',
    'Web Development Lab': 'Code',
    'Core AI': 'BrainCircuit',
    'Utility': 'Wrench'
};

export default function AcademyPage() {
  return (
    <div className="flex flex-col">
       <main className="flex-1 w-full">
            <div className="pt-24 text-center">
                 <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><School className="h-10 w-10" /></div>
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    The Entrestate AI Academy
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-foreground/70">
                   Learn by doing. These hands-on guides walk you through real-world scenarios, showing you exactly how to use our AI suites to get results.
                </p>
            </div>
            <div className="py-24">
                <div className="container max-w-screen-lg mx-auto px-4">
                     <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {suites.map(suite => (
                            <motion.div 
                                key={suite.name}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <Link href={`/academy/suites/${suite.name.toLowerCase().replace(/\s+/g, '-')}`} className="h-full block">
                                    <Card className="hover:shadow-xl transition-shadow flex flex-col bg-card/80 h-full shadow-lg">
                                        <CardHeader className="flex-row items-start gap-4">
                                            <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit shadow-inner">
                                                <DynamicIcon name={suiteIcons[suite.name] || 'Sparkles'} className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <CardTitle>{suite.name}</CardTitle>
                                                <CardDescription className="mt-1">{suite.description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-grow flex items-end justify-end">
                                            <span className="text-sm font-semibold text-primary flex items-center">
                                                Start Learning <ArrowRight className="ml-2 h-4 w-4"/>
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
      </main>
    </div>
  );
}
