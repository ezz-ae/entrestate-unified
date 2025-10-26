
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, Telescope, MessageCircle, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react';
import { tools } from '@/lib/tools-data';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import type { EmblaPluginType } from 'embla-carousel';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

const SalesPlannerSimulation = dynamic(() => import('@/components/sales-planner-simulation').then(mod => mod.SalesPlannerSimulation), {
  ssr: false,
  loading: () => <div className="h-[420px] flex items-center justify-center bg-muted rounded-lg"><Loader2 className="animate-spin" /></div>,
});


export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/discover/search?q=${encodeURIComponent(query.trim())}`);
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden">
           <motion.div
            className="absolute inset-0 z-0"
            style={{
                background: `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`
            }}
            animate={{
                background: [
                    `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
                    `radial-gradient(ellipse at 70% 40%, hsl(var(--accent) / 0.08), transparent 70%)`,
                    `radial-gradient(ellipse at 30% 40%, hsl(var(--primary) / 0.08), transparent 70%)`,
                    `radial-gradient(ellipse at 50% 30%, hsl(var(--primary) / 0.1), transparent 70%)`,
                ]
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
            }}
          />
          <div className="relative z-10 container max-w-screen-xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tighter leading-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                The AI Operating System for Real Estate
              </h1>
              <p className="mt-6 max-w-3xl text-lg md:text-xl text-foreground/70">
                A unified ecosystem of apps and complete market data that empowers professionals to close faster and smarter.
              </p>
               <div className="mt-10 w-full max-w-2xl">
                     <div className="relative group">
                         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition-duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
                         <form onSubmit={handleSearch} className="relative z-10">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder='Search anything about the real estate market...' 
                                className="w-full h-14 pl-12 pr-4 text-lg rounded-full shadow-lg"
                            />
                             <button type="submit" className="hidden" aria-hidden="true">Submit</button>
                        </form>
                     </div>
                </div>
            </div>
          </div>
        </section>

         <section id="solutions" className="py-24 bg-muted/30">
            <div className="container max-w-screen-xl mx-auto px-4 space-y-24">
                 <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-md">
                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI that performs, not promises.</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Every App, chat, and copilot is designed to transform a core aspect of your real estate business.
                    </p>
                </div>
                
                 <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-border/30 shadow-2xl hover:shadow-primary/10 transition-shadow duration-300">
                    <div className="space-y-4 text-left md:order-2">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block shadow-inner"><MessageCircle className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                           SalesAgentChat AI
                       </h3>
                       <p className="text-lg text-muted-foreground">
                            Deploy a super-intelligent agent on your website or social media. It engages users proactively, answers complex questions with market data, and captures qualified leads 24/7.
                       </p>
                       <Link href="/solutions/estchat-x3">
                           <Button variant="outline" className="mt-6 shadow">Try yourself <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                   <div className="md:order-1">
                        {/* Placeholder for EstChatSimulation */}
                         <div className="h-[320px] flex items-center justify-center bg-muted rounded-lg shadow-inner">EstChat Simulation</div>
                   </div>
                </Card>

                 <Card className="p-8 bg-card/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-border/30 shadow-2xl hover:shadow-primary/10 transition-shadow duration-300">
                    <div className="space-y-4 text-left">
                       <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit inline-block shadow-inner"><FileJson className="h-8 w-8" /></div>
                        <h3 className="text-3xl font-bold font-heading">
                            AI Listing Portal
                        </h3>
                        <p className="text-lg text-muted-foreground">
                           Create a single source of truth for your property data. Our AI consolidates, verifies, and archives listings to eliminate noise, enforce accuracy, and syndicate perfectly formatted data to all major portals.
                       </p>
                       <Link href="/solutions/mega-listing-pro-2">
                           <Button variant="outline" className="mt-6 shadow">List in minutes <ArrowRight className="ml-2 h-4 w-4"/></Button>
                       </Link>
                   </div>
                    <div>
                        {/* Placeholder for MegaListingSimulation */}
                        <div className="h-[280px] flex items-center justify-center bg-muted rounded-lg shadow-inner">MegaListing Simulation</div>
                    </div>
                </Card>
            </div>
        </section>

        <section id="deal-planner" className="py-24">
            <div className="container max-w-screen-xl mx-auto px-4">
                 <SalesPlannerSimulation />
            </div>
        </section>


         <section id="marketplace-showcase" className="py-24 bg-muted/30">
            <div className="container max-w-screen-xl mx-auto px-4">
                 <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Your AI-Powered Workplace</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        An entire ecosystem of specialized apps designed to automate every facet of your business.
                    </p>
                </div>
                <div className="mt-16">
                     <Carousel
                        plugins={[autoplayPlugin.current] as EmblaPluginType[]}
                        onMouseEnter={autoplayPlugin.current.stop}
                        onMouseLeave={autoplayPlugin.current.reset}
                        opts={{ align: "start", loop: true, }}
                      >
                        <CarouselContent className="-ml-6">
                          {tools.map((tool) => (
                            <CarouselItem key={tool.id} className="pl-6 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                               <Card className="h-full flex flex-col justify-between bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-xl shadow-lg border-border/30">
                                    <CardHeader className="flex flex-col items-center text-center p-4 pb-2">
                                      <div className="p-3 rounded-full text-white mb-3 shadow-inner" style={{ backgroundColor: tool.color || 'hsl(var(--primary))' }}>
                                        <DynamicIcon name={tool.iconName} className="h-8 w-8" /> 
                                      </div>
                                      <CardTitle className="text-lg font-semibold">{tool.dashboardTitle || tool.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center p-4 pt-2 flex-grow">
                                      <CardDescription className="text-muted-foreground text-sm line-clamp-3 mb-3">
                                        {tool.description}
                                      </CardDescription>
                                    </CardContent>
                                    <div className="p-4 pt-0 text-center">
                                      <Link href={`/me/tool/${tool.id}`} className="block">
                                        <Button variant="outline" className="w-full">Launch App</Button>
                                      </Link>
                                    </div>
                                </Card>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                </div>
                <div className="mt-12 text-center">
                    <Link href="/marketplace">
                        <Button size="lg">Explore All Suites</Button>
                    </Link>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
