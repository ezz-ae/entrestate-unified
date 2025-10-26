
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users2, ArrowRight, Bot, GitBranch, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';

const teamMembers = [
    {
        name: 'The Visionary',
        role: 'Creator & Chief Architect',
        description: 'The driving force behind the Entrestate vision, obsessed with bridging the gap between data and decision in real estate.'
    },
    {
        name: 'The AI Agents',
        role: 'Powered by Google Gemini',
        description: 'An army of intelligent agents working 24/7 to analyze markets, generate content, and automate workflows.'
    },
    {
        name: 'The Community',
        role: 'Agents, Developers, Marketers',
        description: 'The innovators and early adopters who are co-creating the future of the industry with us.'
    }
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
            <div className="pt-24 text-center">
                 <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><Users2 className="h-10 w-10" /></div>
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    We're building the AI-native operating system for real estate.
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                   Our mission is to empower every real estate professional with the intelligent tools they need to thrive in a data-driven world.
                </p>
            </div>

            <div className="py-24">
                <div className="container max-w-screen-lg mx-auto px-4">
                    <Card className="shadow-2xl hover:shadow-primary/10 transition-shadow duration-500">
                        <CardContent className="p-12 md:p-16">
                             <h2 className="text-3xl font-bold font-heading mb-4 text-center">A Note from the Creator</h2>
                             <div className="prose prose-lg dark:prose-invert max-w-none text-center text-foreground/80">
                                  <p>
                                    In the fast-paced world of real estate, the gap between data and decision is where fortunes are made and lost. For years, I watched brilliant agents, developers, and marketers operate with fragmented tools and incomplete information, relying on intuition where they should have had certainty.
                                </p>
                                <p>
                                    That’s why Entrestate was born. It’s not about replacing the agent, but empowering them to become a "Super Agent." It’s about transforming raw, chaotic market data into clear, actionable intelligence. It's about automating the mundane tasks that consume 80% of your day, so you can focus on what you do best: building relationships and closing deals.
                                </p>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <section className="py-24 bg-muted/30">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold font-heading">The Team Behind the Mission</h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mx-auto mb-4 shadow-inner">
                                            {index === 0 ? <Sparkles className="h-8 w-8" /> : index === 1 ? <Bot className="h-8 w-8" /> : <Users2 className="h-8 w-8" />}
                                        </div>
                                        <CardTitle>{member.name}</CardTitle>
                                        <CardDescription>{member.role}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{member.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="text-center py-24">
                <div className="container mx-auto px-4">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><GitBranch className="h-10 w-10" /></div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading max-w-3xl mx-auto">Join Us in Building the Future</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        We're on a mission to build the future of real estate, one intelligent tool at a time. Are you with us?
                    </p>
                    <div className="mt-8">
                        <Link href="/me">
                            <Button size="lg">Get Started <ArrowRight className="ml-2 h-4 w-4"/></Button>
                        </Link>
                    </div>
                </div>
            </section>
      </main>
    </div>
  );
}
