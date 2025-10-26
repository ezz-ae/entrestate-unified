"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface MarketData {
  transactions: number;
  avgPricePerSqFt: number;
  developerReputation: { topDeveloper: string; score: number };
  pipelineProjects: number;
}

export default function DiscoverPage() {
  const [data, setData] = useState<MarketData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/market-data');
                const marketData = await response.json();
                setData(marketData);
            } catch (error) {
                console.error("Failed to fetch market data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container py-12">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">Discover</h1>
                <p className="mt-4 text-lg text-muted-foreground">
          A live feed of market intelligence from the Entrestate Cloud.
        </p>
            </div>
      {data ? (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card><CardHeader><CardTitle>Transactions (24h)</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.transactions.toLocaleString()}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Avg. Price / sq.ft</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">AED {data.avgPricePerSqFt.toLocaleString()}</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Top Developer</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.developerReputation.topDeveloper} <span className="text-sm text-muted-foreground">({data.developerReputation.score} pts)</span></p></CardContent></Card>
          <Card><CardHeader><CardTitle>Projects in Pipeline</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{data.pipelineProjects}</p></CardContent></Card>
        </div>
            ) : (
        <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>
            )}
        </div>
    );
}