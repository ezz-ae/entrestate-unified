
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
  Lightbulb,
  Cloud,
  List,
  Facebook,
  Palette,
  Briefcase,
  Users,
  Server,
  CreditCard,
  MessageSquare, // Import the MessageSquare icon for WhatsMAP
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const sidebarLinks = [
  { href: '/me/dashboard', label: 'Cloud Dashboard', icon: <Cloud />, hasSparkles: true },
  { href: '/me/listing-portal', label: 'Listing Intelligence', icon: <List />, hasSparkles: true },
  { href: '/me/meta-intelligence', label: 'Meta Intelligence', icon: <Facebook />, hasSparkles: true },
  { href: '/me/creative-hub', label: 'Creative Intelligence', icon: <Palette />, hasSparkles: true },
  { href: '/me/super-seller-suite', label: 'SuperSellerSuite', icon: <Briefcase />, hasSparkles: true },
  { href: '/me/lead-intelligence', label: 'Lead Intelligence', icon: <Users />, hasSparkles: true },
  { href: '/me/cloud-intelligence', label: 'Cloud Agents', icon: <Server />, hasSparkles: true },
  { href: '/appstore', label: 'Appstore', icon: <Compass />, hasSparkles: true },
  { href: '/flows', label: 'Flow Builder', icon: <Workflow />, hasSparkles: true },
];

const bottomLinks = [
  { href: '/me/billing', label: 'Billing & Subscriptions', icon: <CreditCard /> },
  { href: '/me/settings', label: 'Settings', icon: <Settings /> },
  { href: '/me/community', label: 'Community Hub', icon: <Users2 /> },
];

export function WorkspaceSidebar() {
  const pathname = usePathname();

  const NavLink = ({ href, label, icon, hasSparkles }: { href: string, label: string, icon: React.ReactNode, hasSparkles?: boolean }) => {
    const isActive = pathname.startsWith(href) && (href !== '/me' || pathname === '/me');

    const displayedIcon = React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' });

    const iconWithOptionalSparkles = (
      <div className="relative">
        {hasSparkles && <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent" />}
      </div>
    );

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={href} title={label}>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted",
                  isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
                )}
              >
                {displayedIcon}
                <span className="sr-only">{label}</span>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right"><p>{label}</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <aside className="hidden border-r bg-background sm:flex z-20">
      <div className="flex h-full max-h-screen flex-col gap-4 p-3">
        <nav className="flex flex-col items-center gap-3">
            <NavLink href="/me/ei-os" label="Main Dashboard" icon={<LayoutDashboard />} hasSparkles={true} />
            <Separator />
            <NavLink href="/me/whatsmap" label="WhatsMAP Command Center" icon={<MessageSquare />} hasSparkles={true} />
            <Separator />
            {sidebarLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-3">
            <Separator />
            {bottomLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>
      </div>
    </aside>
  );
}
