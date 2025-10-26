"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Bot, Home, LayoutGrid, ShoppingBag, Workflow, Terminal, Activity } from "lucide-react";

const sidebarNavLinks = [
    { href: "/me", label: "Dashboard", icon: Home },
    { href: "/whatsmap", label: "WhatsMAP", icon: Bot },
    { href: "/market-feeds", label: "Market Feeds", icon: Activity },
    { href: "/appstore", label: "Appstore", icon: ShoppingBag },
    { href: "/flows", label: "Flows", icon: Workflow },
    { href: "/suites", label: "My Suites", icon: LayoutGrid },
    { href: "/gem", label: "GEM Panel", icon: Terminal },
];

export function WorkspaceSidebar() {
    const pathname = usePathname();

    const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === href && "bg-muted text-primary"
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    );

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/me" className="flex items-center gap-2 font-semibold">
                        <span className="">Entrestate OS</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {sidebarNavLinks.map((link) => (
                            <NavLink key={link.href} {...link} />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}