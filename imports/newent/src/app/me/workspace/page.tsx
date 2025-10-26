
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { LayoutGrid, Library, PlusCircle, Sparkles, ArrowRight, Bot, Lightbulb } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import type { Project } from '@/types';
import { tools } from '@/lib/tools-client';
import { ProjectCard } from '@/components/ui/project-card';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';

const GeminiInsightCard = () => (
    <Card className="col-span-full bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" /> Gemini AI Insight
            </CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">"Trending: Waterfront luxury apartment demand up 12% in Q2 across Dubai Marina and JBR."</div>
            <p className="text-xs text-muted-foreground">Proactive insight from your AI co-pilot.</p>
            <Link href="/discover/search?q=waterfront+luxury+dubai+marina" className="text-sm text-primary hover:underline mt-4 block">
                Explore this trend <ArrowRight className="ml-1 inline-block h-3 w-3" />
            </Link>
        </CardContent>
    </Card>
);

const GettingStarted = () => (
    <Card className="bg-primary/10 border-primary/20 text-center">
        <CardHeader>
            <CardTitle className="text-2xl text-primary">Welcome to Your AI Workspace!</CardTitle>
            <CardDescription>Your Gemini co-pilot is ready to assist. Let's get you started.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">1. Curate AI Apps</h3>
                <p className="text-sm text-muted-foreground mb-4">Visit the <Link href="/marketplace" className="underline">AI Marketplace</Link> to add powerful Gemini-powered tools to your workspace.</p>
                <Link href="/marketplace"><Button variant="outline">Go to AI Marketplace</Button></Link> {/* Updated link and text */}
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">2. Integrate Market Data</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect your data sources or add projects to your library for AI analysis.</p>
                 <Link href="/me/tool/projects-finder"><Button variant="outline">Add Projects & Data</Button></Link>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2">3. Orchestrate AI Flows</h3>
                <p className="text-sm text-muted-foreground mb-4">Leverage Gemini to build and automate multi-step workflows across your apps.</p>
                <Link href="/flows"><Button variant="outline">Build AI Flows</Button></Link>
            </div>
        </CardContent>
    </Card>
);

const mottos = [
    "Gemini activates your market intelligence.",
    "Real estate perfected, by AI.",
    "Your AI co-pilot, always performing.",
    "Insights delivered, actions automated.",
    "The future of real estate is intelligent.",
    "AI not promise, it performs.",
    "PropTech reimagined with Gemini."
];

const WorkspaceHero = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentMotto, setCurrentMotto] = useState(mottos[0]);

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
        setCurrentDate(formattedDate);

        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % mottos.length;
            setCurrentMotto(mottos[index]);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="text-left py-8">
            <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
                Pro Workspace <span className="text-primary">AI</span> — Today is {currentDate}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent animate-pulse"/>{currentMotto}
            </p>
        </div>
    );
};


export default function WorkspaceHomePage() {
    const { user } = useAuth();
    const [myProjects, setMyProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [addedApps, setAddedApps] = useState<string[]>([]);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

    useEffect(() => {
        if(user) {
            const fetchProjects = async () => {
                setIsLoadingProjects(true);
                try {
                    const idToken = await user.getIdToken();
                    const response = await fetch('/api/user/projects', {
                        headers: { 'Authorization': `Bearer ${idToken}` }
                    });
                    const data = await response.json();
                    if (data.ok) {
                        setMyProjects(data.data);
                        // Check if onboarding is complete based on whether projects exist
                        setIsOnboardingComplete(data.data.length > 0 || localStorage.getItem('onboardingComplete') === 'true');
                    }
                } catch(e) {
                    console.error("Failed to fetch user projects", e);
                } finally {
                    setIsLoadingProjects(false);
                }
            };
            fetchProjects();
        } else {
            setIsLoadingProjects(false);
        }
        
        try {
            const savedState = localStorage.getItem('addedApps');
            if (savedState) setAddedApps(JSON.parse(savedState));
        } catch (e) {
            console.error("Could not load app state from localStorage", e);
        }
    }, [user]);

    const myApps = tools.filter(tool => addedApps.includes(tool.id));

  return (
    <div className="p-4 md:p-10 space-y-12">
        <WorkspaceHero />
      
      {!isOnboardingComplete && !isLoadingProjects ? (
          <GettingStarted />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <GeminiInsightCard /> {/* New Gemini Insight Card */}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><LayoutGrid className="h-5 w-5"/> My Apps</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {myApps.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {myApps.map(app => (
                                    <Link key={app.id} href={app.href} className="block group">
                                        <div className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-center">
                                            <div className="p-3 rounded-lg text-white" style={{ backgroundColor: app.color }}>
                                            {React.cloneElement(app.icon, { className: 'h-6 w-6' })}
                                            </div>
                                            <p className="text-xs font-semibold truncate w-24">{app.dashboardTitle || app.title}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground p-8">
                                <p className="mb-4">No apps added to your workspace yet. Your Gemini co-pilot can help you discover new tools!</p>
                                <Link href="/marketplace">
                                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Explore AI Marketplace</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-8 sticky top-24">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Library className="h-5 w-5"/> My Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoadingProjects ? (
                            <div className="flex justify-center items-center h-24"><Loader2 className="animate-spin" /></div>
                        ) : myProjects.length > 0 ? (
                            <div className="space-y-3">
                                {myProjects.slice(0,3).map(p => (
                                    <ProjectCard key={p.id} project={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground p-6">
                                <p className="mb-4">Your project library is empty. Let Gemini help you find your next opportunity!</p>
                                <Link href="/me/tool/projects-finder">
                                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Discover Projects with AI</Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                    {myProjects.length > 3 && (
                        <CardFooter>
                            <Link href="/me/tool/projects-finder" className="w-full">
                                <Button variant="secondary" className="w-full">View All Projects</Button>
                            </Link>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </div>
      )}
    </div>
  );
}
