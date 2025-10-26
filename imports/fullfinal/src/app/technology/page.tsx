
'use client';

import React from 'react';
import { Sparkles, Code, Network, Zap, Cloud, ArrowRight, ShieldCheck, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from "framer-motion";

const techPillars = [
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "Gemini-Powered Intelligence",
        description: "Leveraging Google's most advanced AI models for unparalleled insights, content generation, and automation across all our applications."
    },
    {
        icon: <Code className="h-8 w-8" />,
        title: "Agentic AI Flows",
        description: "Complex real estate tasks are broken down into intelligent, autonomous AI flows that perform multi-step actions and adapt to real-time data."
    },
    {
        icon: <Network className="h-8 w-8" />,
        title: "Unified Data Layer",
        description: "Our AI unifies diverse data sources into a single, intelligent layer, providing a holistic view of the market."
    }
];

const infraPillars = [
     {
        icon: <Cloud className="h-6 w-6" />,
        title: "Cloud-Native on Google Cloud",
        description: "Built on a robust, scalable, and secure infrastructure, utilizing Firebase for hosting, database, and functions."
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: "Optimized for Performance",
        description: "Engineered for speed and efficiency, ensuring a lightning-fast experience, even with complex AI operations."
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Enterprise-Grade Security",
        description: "Your data is protected with industry-leading security protocols, ensuring privacy and compliance."
    }
]

export default function TechnologyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 w-full">
                 <div className="pt-24 text-center">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><BrainCircuit className="h-10 w-10" /></div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        AI-Native Technology & Cloud Infrastructure
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       The intelligent backbone of Entrestate, blending Gemini AI with robust, scalable cloud architecture for unparalleled real estate innovation.
                    </p>
                </div>

                <section className="py-24">
                     <div className="container max-w-screen-lg mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {techPillars.map((pillar, index) => (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                        <CardHeader>
                                            <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mx-auto mb-4 shadow-inner">
                                                {pillar.icon}
                                            </div>
                                            <CardTitle>{pillar.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{pillar.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-muted/30">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading">Infrastructure & Security</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {infraPillars.map((pillar, index) => (
                                 <Card key={pillar.title} className="bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
                                    <CardHeader className="flex-row items-center gap-4">
                                        <div className="p-3 bg-primary/10 text-primary rounded-lg shadow-inner">{pillar.icon}</div>
                                        <CardTitle>{pillar.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{pillar.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                 <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="py-24 text-center"
                >
                    <div className="flex items-center justify-center mb-6">
                        <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                        <p className="text-3xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Powered by Gemini
                        </p>
                    </div>
                    <p className="text-xl text-foreground font-semibold italic max-w-3xl mx-auto leading-relaxed">
                        "This entire platform is a living testament to human-AI collaboration,
                        engineered and refined in partnership with Gemini."
                    </p>
                    <div className="mt-8">
                        <Link href="/documentation/gemini-integration">
                            <Button variant="outline" size="lg" className="shadow-md">
                                Learn More About Our AI Core <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
