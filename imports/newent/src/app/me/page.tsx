
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { PageHeader } from '@/components/ui/page-header';
import { tools, ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Sparkles, Star, PlusCircle } from 'lucide-react';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

const useFavoriteTools = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteTools');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (toolId: string) => {
    const newFavorites = favorites.includes(toolId)
      ? favorites.filter(id => id !== toolId)
      : [...favorites, toolId];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTools', JSON.stringify(newFavorites));
  };

  return { favorites, toggleFavorite };
};


export default function MeLandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavoriteTools();

    const [recentTools, setRecentTools] = useState<ToolData[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login?redirect=/me');
        }
    }, [user, loading, router]);
    
    // This is a placeholder for a real "recent tools" logic.
    // In a real app, this would be fetched from a backend based on user activity.
    useEffect(() => {
        setRecentTools(tools.slice(0, 4));
    }, []);

    const favoriteTools = useMemo(() => {
        return tools.filter(tool => favorites.includes(tool.id));
    }, [favorites]);

    if (loading) {
        return (
             <div className="p-4 md:p-8 space-y-12 flex items-center justify-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
             </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-8 space-y-20">
                <PageHeader
                    title={`Welcome back, ${user.displayName || user.email?.split('@')[0]}!`}
                    description="Your AI-powered real estate hub. Launch your favorite tools and see what's new."
                    icon={<Sparkles className="h-8 w-8 text-primary" />}
                />
                
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">Your Favorite Tools</h2>
                    {favoriteTools.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {favoriteTools.map(tool => (
                                <ToolCard key={tool.id} tool={tool} isFavorite={true} onToggleFavorite={toggleFavorite} />
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center p-8 border-dashed">
                            <CardContent>
                                <p className="text-muted-foreground">You haven't favorited any tools yet.</p>
                                <Link href="/marketplace">
                                    <Button variant="outline" className="mt-4">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Browse Marketplace
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">Recently Used</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recentTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} isFavorite={favorites.includes(tool.id)} onToggleFavorite={toggleFavorite} />
                        ))}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">Discover New Tools</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tools.slice(4, 8).map(tool => (
                             <ToolCard key={tool.id} tool={tool} isFavorite={favorites.includes(tool.id)} onToggleFavorite={toggleFavorite} />
                        ))}
                    </div>
                     <div className="mt-8 text-center">
                        <Link href="/marketplace">
                            <Button variant="outline">Explore All AI Apps <ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

const ToolCard = ({ tool, isFavorite, onToggleFavorite }: { tool: ToolData, isFavorite: boolean, onToggleFavorite: (id: string) => void }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-200 h-full bg-card/80 backdrop-blur-sm border-border/30 flex flex-col relative">
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(tool.id);
                }}
            >
                <Star className={cn("h-5 w-5", isFavorite ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground")} />
            </Button>

            <Link href={`/me/tool/${tool.id}`} className="flex flex-col h-full">
                <CardHeader className="flex flex-col items-center text-center p-4 pb-2">
                    <div className="p-3 rounded-full text-white mb-3" style={{ backgroundColor: tool.color }}>
                        <DynamicIcon name={tool.iconName} className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{tool.dashboardTitle || tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 pt-2 flex-grow">
                    <CardDescription className="text-muted-foreground line-clamp-3">
                        {tool.description}
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-center">
                     <div className={cn(
                        "w-full text-sm font-medium py-2 px-4 rounded-md",
                        "bg-primary/10 text-primary"
                    )}>
                        {tool.cta}
                    </div>
                </CardFooter>
            </Link>
        </Card>
    )
}
