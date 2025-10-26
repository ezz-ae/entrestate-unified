
'use client';
import React, { useMemo, useState } from 'react';
import { sampleFlows, Flow } from '@/lib/flows/schema';
import { PageHeader } from '@/components/ui/page-header';
import { Workflow, Bot, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function FlowsPage(){
  const [q, setQ] = useState('');
  const flows = useMemo(() => {
    const t = q.toLowerCase().trim();
    if(!t) return sampleFlows;
    return sampleFlows.filter(f => f.name.toLowerCase().includes(t) || (f.description || '').toLowerCase().includes(t) || f.steps.some(s => s.title.toLowerCase().includes(t) || s.type.toLowerCase().includes(t)));
  }, [q]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-8">
        <PageHeader
          title="AI-Powered Automation Flows"
          description="Orchestrate multi-step workflows with Gemini AI to supercharge your real estate business. From lead nurturing to content syndication."
          icon={<Workflow className="h-8 w-8" />}
        />

        <div className="relative w-full max-w-lg mx-auto mt-8 mb-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search your AI flows..."
            className="w-full pl-10 pr-4 h-12 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.length > 0 ? (
            flows.map(f => <FlowCard key={f.id} flow={f} />)
          ) : (
            <div className="col-span-full text-center py-16 text-muted-foreground text-lg">
              No flows found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function FlowCard({ flow }: { flow: Flow }){
  return (
    <Card className="bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-lg border-border/30 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">{flow.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">{flow.description}</CardDescription>
        </div>
        <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className={cn("py-1 px-3 text-xs font-medium", flow.enabled ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-red-500/10 text-red-600 border-red-500/20")}>
                {flow.enabled ? 'Enabled' : 'Disabled'}
            </Badge>
            <Badge className="text-xs font-medium flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Bot className="h-3 w-3" /> Powered by Gemini AI
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-2">
        <h3 className="text-md font-semibold mb-3">Workflow Steps:</h3>
        <ol className="list-decimal pl-6 space-y-3 text-sm text-muted-foreground">
          {flow.steps.map(s => (
            <li key={s.id}>
              <div className="font-medium text-foreground/90">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.type}</div>
              {s.input ? <pre className="text-xs bg-muted border border-border/50 p-2 rounded mt-1 overflow-x-auto text-foreground/80">{JSON.stringify(s.input, null, 2)}</pre> : null}
            </li>
          ))}
        </ol>
      </CardContent>
       <CardFooter className="p-6 pt-0">
            <Link href={`/flows/editor?id=${flow.id}`} className="w-full">
                <Button variant="outline" className="w-full">Manage Flow</Button>
            </Link>
       </CardFooter>
    </Card>
  );
}
