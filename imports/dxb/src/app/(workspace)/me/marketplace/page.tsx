
'use client';

import React, { useState, useMemo } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutGrid, List, Search, AppWindow } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools-client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type ViewMode = 'grid' | 'list';

export default function MeMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredTools = useMemo(() => {
    return tools.filter(tool =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-8">
        <PageHeader
          title="Your AI Workspace"
          description="Discover, manage, and launch powerful AI apps tailored for your real estate business."
          icon={<AppWindow className="h-8 w-8" />}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 mb-12">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search your AI apps and tools..."
              className="w-full pl-10 pr-4 h-12 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          viewMode === 'list' && "grid-cols-1"
        )}>
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <Card key={tool.id} className={cn(
                "bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-lg border-border/30",
                viewMode === 'list' && "flex flex-row items-center p-4"
              )}>
                {viewMode === 'grid' && (
                  <>
                    <CardHeader className="flex flex-col items-center text-center p-6 pb-2">
                      <div className="p-4 rounded-full text-white mb-4" style={{ backgroundColor: tool.color || 'hsl(var(--primary))' }}>
                        {React.cloneElement(tool.icon, { className: 'h-8 w-8' })}
                      </div>
                      <CardTitle className="text-xl font-semibold">{tool.dashboardTitle || tool.title}</CardTitle>
                      {tool.category && <Badge variant="secondary" className="mt-2">{tool.category}</Badge>}
                    </CardHeader>
                    <CardContent className="text-center p-6 pt-2">
                      <CardDescription className="text-muted-foreground line-clamp-3 mb-4">
                        {tool.description}
                      </CardDescription>
                      <Link href={`/me/tool/${tool.id}`}>
                        <Button variant="outline" className="w-full">Launch App</Button>
                      </Link>
                    </CardContent>
                  </>
                )}
                {viewMode === 'list' && (
                  <>
                    <div className="p-3 rounded-lg text-white mr-4 shrink-0" style={{ backgroundColor: tool.color || 'hsl(var(--primary))' }}>
                      {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold">{tool.dashboardTitle || tool.title}</CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </div>
                    <Link href={`/me/tool/${tool.id}`} className="ml-auto shrink-0">
                      <Button variant="outline" size="sm">Launch</Button>
                    </Link>
                  </>
                )}
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-16 text-muted-foreground text-lg">
              No apps found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
