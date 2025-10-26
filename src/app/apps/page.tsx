
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { AppWindow, Sparkles, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { tools } from '@/lib/tools-client';
import { Badge } from '@/components/ui/badge';

export default function AppsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-8">
        <PageHeader
          title="Explore Our AI Apps"
          description="Redefine real estate with intelligent automation. Discover powerful AI applications designed to supercharge your workflow."
          icon={<AppWindow className="h-8 w-8" />}
        />

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {tools.map(tool => (
            <Card key={tool.id} className="bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-lg border-border/30 flex flex-col justify-between">
              <CardHeader className="flex flex-col items-center text-center p-6 pb-2">
                <div className="p-4 rounded-full text-white mb-4" style={{ backgroundColor: tool.color || 'hsl(var(--primary))' }}>
                  {tool.icon ? React.cloneElement(tool.icon, { className: 'h-8 w-8' }) : <Bot className="h-8 w-8" />}
                </div>
                <CardTitle className="text-xl font-semibold">{tool.dashboardTitle || tool.title}</CardTitle>
                {tool.category && <Badge variant="secondary" className="mt-2">Powered by AI</Badge>} {/* Emphasize AI */}
              </CardHeader>
              <CardContent className="text-center p-6 pt-2 flex-grow">
                <CardDescription className="text-muted-foreground line-clamp-3 mb-4">
                  {tool.description}
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href={`/me/tool/${tool.id}`} className="block">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
