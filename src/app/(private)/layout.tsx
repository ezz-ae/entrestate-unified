"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gem, Code, CreditCard, ArrowLeft } from "lucide-react";

const privateNavLinks = [
  { href: "/me/gem", label: "GEM Panel", icon: <Gem className="h-4 w-4" /> },
  { href: "/me/dev", label: "DEV Panel", icon: <Code className="h-4 w-4" /> },
  { href: "/me/billing", label: "Billing", icon: <CreditCard className="h-4 w-4" /> },
];

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="flex h-screen bg-muted/40">
      <aside className="w-64 flex-col border-r bg-background p-4 hidden md:flex">
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start mb-4" asChild>
            <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
          </Button>
          {privateNavLinks.map(link => (
            <Button variant="ghost" className="justify-start" asChild key={link.href}>
              <Link href={link.href}>{link.icon}<span className="ml-2">{link.label}</span></Link>
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
