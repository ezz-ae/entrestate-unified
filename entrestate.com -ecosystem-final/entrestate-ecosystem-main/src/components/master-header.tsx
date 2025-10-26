
'use client';

import Link from 'next/link';
import { Bot, Sparkles, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MasterHeader() {
    const { user, loading, signOut } = useAuth();

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
                        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <UserCircle className="h-8 w-8" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href="/me"><DropdownMenuItem>Workspace</DropdownMenuItem></Link>
                                <Link href="/me/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={signOut}>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
