
'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Play, Pause, Clock, CheckCircle, AlertCircle, Loader, UploadCloud } from 'lucide-react';
import yaml from 'js-yaml';

// This is a placeholder for the actual data. In a real application, this would be fetched.
const DATA_INGESTION_POLICY = `
source_inventory_grade_a:
  - source_id: google_ads
    grade: A
    category: Ads APIs
    ingestion_method: OAuth API connector / webhook
    cadence: 1-5min
  - source_id: meta_business
    grade: A
    category: Ads APIs
    ingestion_method: OAuth API connector / webhook
    cadence: 1-5min
  - source_id: tiktok_ads
    grade: A
    category: Ads APIs
    ingestion_method: OAuth API connector / webhook
    cadence: 5-15min
  - source_id: youtube_data
    grade: A
    category: Social/Ads
    ingestion_method: API & PubSub/webhook
    cadence: 1-15min
  - source_id: developer_site_feeds
    grade: A
    category: Listings/Feeds
    ingestion_method: API/SFTP/XML feed ingestion
    cadence: 5-30min
  - source_id: major_mls
    grade: A
    category: Listings
    ingestion_method: licensed feed/API
    cadence: 5-30min
`;

type SourceStatus = 'running' | 'paused' | 'idle' | 'error';

interface Source {
    source_id: string;
    grade: string;
    category: string;
    ingestion_method: string;
    cadence: string;
    status: SourceStatus;
    lastRun: string;
}

export default function DataImporterPage() {
    const [sources, setSources] = useState<Source[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const policy: any = yaml.load(DATA_INGESTION_POLICY);
            const initialSources = policy.source_inventory_grade_a.map((s: any) => ({
                ...s,
                status: 'idle',
                lastRun: 'Never'
            }));
            setSources(initialSources);
        } catch (e) {
            console.error("Error parsing YAML:", e);
        }
        setIsLoading(false);
    }, []);

    const toggleSourceStatus = (sourceId: string) => {
        setSources(sources.map(s => {
            if (s.source_id === sourceId) {
                if (s.status === 'running') return { ...s, status: 'paused' };
                if (s.status === 'paused') return { ...s, status: 'running' };
                return { ...s, status: 'running' };
            }
            return s;
        }));
    };

    const triggerRun = (sourceId: string) => {
        setSources(sources.map(s => s.source_id === sourceId ? { ...s, status: 'running' } : s));
        setTimeout(() => {
            setSources(sources.map(s => s.source_id === sourceId ? { ...s, status: 'idle', lastRun: new Date().toLocaleTimeString() } : s));
        }, 3000);
    };

    const getStatusIcon = (status: SourceStatus) => {
        switch (status) {
            case 'running': return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
            case 'paused': return <Pause className="h-4 w-4 text-yellow-500" />;
            case 'idle': return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-8 space-y-12">
                <PageHeader
                    title="Data Ingestion Manager"
                    description="Monitor and manage the real-time data pipeline that powers the Entrestate ecosystem."
                    icon={<UploadCloud className="h-8 w-8 text-primary" />}
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Grade A Data Sources</CardTitle>
                        <CardDescription>
                            These are the high-priority, high-trust sources that form the foundation of our market intelligence.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <Loader className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Source ID</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Cadence</TableHead>
                                        <TableHead>Last Run</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sources.map(source => (
                                        <TableRow key={source.source_id}>
                                            <TableCell className="w-12">{getStatusIcon(source.status)}</TableCell>
                                            <TableCell className="font-medium">{source.source_id}</TableCell>
                                            <TableCell><Badge variant="secondary">{source.category}</Badge></TableCell>
                                            <TableCell>{source.cadence}</TableCell>
                                            <TableCell>{source.lastRun}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" onClick={() => triggerRun(source.source_id)} disabled={source.status === 'running'}>
                                                    <Play className="h-4 w-4 mr-2" />
                                                    Run Now
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
