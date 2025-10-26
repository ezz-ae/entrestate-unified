
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, GanttChartSquare, User as UserIcon, LayoutDashboard, Compass, Workflow, FolderCog, Library, Sparkles } from 'lucide-react'; // Added Sparkles
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import { Logo } from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from 'next/navigation';
// Removed: import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

// Removed: mainNavLinks as its functionality moves to WorkspaceSidebar

export function WorkspaceHeader() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    if (auth) {
        await auth.signOut();
        window.location.href = '/';
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-auto flex items-center gap-4">
          <div className="sm:block"> {/* Adjusted visibility for logo */}
            <Logo href="/me" />
          </div>
          {/* Removed NavigationMenu - its functionality is now handled by WorkspaceSidebar */}
        </div>
        
        <div className="flex items-center gap-4">
            <Link href="/gem">
                <Button variant="ghost" size="sm">
                    <GanttChartSquare className="mr-2 h-4 w-4" />
                    Gem
                </Button>
            </Link>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                            <AvatarFallback>
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon />}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/me/settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

      </div>
    </header>
  );
}
