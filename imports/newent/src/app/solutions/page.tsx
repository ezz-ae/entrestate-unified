
'use client';

import React from 'react';
import { Telescope, MessageCircle, FileJson, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ProSearchSimulation = dynamic(() => import('@/components/pro-search-simulation').then(mod => mod.ProSearchSimulation), {
  ssr: false,
  loading: () => <div className="h-[288px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});
const EstChatSimulation = dynamic(() => import('@/components/est-chat-simulation').then(mod => mod.EstChatSimulation), {
  ssr: false,
  loading: () => <div className="h-[320px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});
const MegaListingSimulation = dynamic(() => import('@/components/mega-listing-simulation').then(mod => mod.MegaListingSimulation), {
  ssr: false,
  loading: () => <div className="h-[280px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});


const coreAgents = [
    {
        name: 'Pro Search Agent',
        icon: <Telescope className="h-10 w-10" />,
        headline: 'An AI that understands the real estate market.',
        description: 'Go beyond simple keyword search. Our Pro Search Agent uses semantic understanding and predictive analysis to find opportunities that others miss. It\'s not just a search bar; it\'s a market intelligence engine.',
        simulation: <ProSearchSimulation />,
        href: '/solutions/pro-search-eng-x3'
    },
    {
        name: 'EstChat Agent',
        icon: <MessageCircle className="h-10 w-10" />,
        headline: 'Your 24/7 sales and support assistant.',
        description: 'Deploy a super-intelligent agent on your website or social media. It engages users proactively, answers complex questions with market data, and captures qualified leads around the clock.',
        simulation: <EstChatSimulation />,
        href: '/solutions/estchat-x3'
    },
    {
        name: 'Mega Listing API',
        icon: <FileJson className="h-10 w-10" />,
        headline: 'The single source of truth for market data.',
        description: 'Access our comprehensive, verified, and real-time market data to power your own applications. Our AI consolidates, verifies, and archives listings to eliminate noise and enforce accuracy.',
        simulation: <MegaListingSimulation />,
        href: '/solutions/mega-listing-pro-2'
    }
];

export default function SolutionsPage() {
  return (
    <div className="flex flex-col">
        <main className="flex-1 w-full">
            <div className="pt-24 text-center">
                 <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><Telescope className="h-10 w-10" /></div>
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                    Core AI Agents
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                   These are the foundational AI technologies that power the entire Entrestate ecosystem. They are the engines behind our suites and can be leveraged to build custom solutions.
                </p>
            </div>
            <div className="py-24 space-y-24">
                {coreAgents.map((agent, index) => (
                    <div key={agent.name} className="container max-w-screen-xl mx-auto px-4">
                        <Card className="overflow-hidden shadow-2xl hover:shadow-primary/20 transition-shadow duration-500">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className={`p-12 flex flex-col justify-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                    <div className="p-4 bg-primary/10 text-primary rounded-xl w-fit mb-6 shadow-inner">
                                        {agent.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold font-heading mb-4 max-w-md">{agent.headline}</h2>
                                    <p className="text-lg text-muted-foreground mb-6 max-w-md">{agent.description}</p>
                                    <div className="mt-auto">
                                        <Link href={agent.href}>
                                            <Button variant="outline" size="lg">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={`bg-muted/50 p-8 flex items-center justify-center min-h-[400px] ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    {agent.simulation}
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </main>
    </div>
  );
}
