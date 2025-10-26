
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  Workflow,
  FolderCog,
  Library,
  Users2,
  Settings,
  Bot,
  Building,
  UserPlus,
  Sparkles,
  Lightbulb
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Add a 'hasSparkles' property to explicitly control sparkle display
const sidebarLinks = [
  { href: '/me/workspace', label: 'AI Dashboard', icon: <LayoutDashboard />, hasSparkles: true },
  { href: '/me/marketplace', label: 'AI Apps', icon: <Compass />, hasSparkles: true },
  { href: '/me/flows', label: 'AI Flow Builder', icon: <Workflow />, hasSparkles: true },
  { href: '/me/brand', label: 'Brand & Assets', icon: <FolderCog /> },
  { href: '/me/tool/projects-finder', label: 'AI Market Library', icon: <Building />, hasSparkles: true },
  { href: '/me/leads', label: 'Leads (CRM)', icon: <UserPlus /> },
  { href: '/me/community', label: 'Community Hub', icon: <Users2 /> },
  { href: '/me/daily-motivation', label: 'Daily Motivation', icon: <Lightbulb /> },
];

const bottomLinks = [
  { href: '/me/assistant', label: 'Gemini Assistant', icon: <Bot />, hasSparkles: true },
  { href: '/me/settings', label: 'Settings', icon: <Settings /> },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon, hasSparkles }: { href: string, label: string, icon: React.ReactNode, hasSparkles?: boolean }) => {
    const isActive = pathname.startsWith(href) && (href !== '/me/workspace' || pathname === '/me/workspace');

    const displayedIcon = React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' });

    const iconWithOptionalSparkles = (
      <div className="relative">
        {displayedIcon}
        {hasSparkles && (
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent" />
        )}
      </div>
    );

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} title={label}> {/* Added title for accessibility */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                  isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
                )}
              >
                {iconWithOptionalSparkles}
                <span className="sr-only">{label}</span>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <aside className="hidden border-r bg-background sm:flex z-20">
      <div className="flex h-full max-h-screen flex-col gap-4 p-3">
        <nav className="flex flex-col items-center gap-3">
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-3">
          {bottomLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
