
'use client';

import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function PublicHeader() {
    const { user, loading } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="flex items-center gap-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <span className="font-bold">Entrestate OS</span>
                    </Link>
                </div>
                <nav className="flex items-center gap-6 text-sm">
                     <Link href="/discover" className="text-muted-foreground transition-colors hover:text-foreground">Discover</Link>
                     <Link href="/solutions" className="text-muted-foreground transition-colors hover:text-foreground">Solutions</Link>
                     <Link href="/marketplace" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
                     <Link href="/academy" className="text-muted-foreground transition-colors hover:text-foreground">Academy</Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    {loading ? (
                        <div className="h-8 w-9 rounded-md bg-muted animate-pulse" />
                    ) : user ? (
                        <Link href="/me">
                            <Button>Go to Workspace</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
