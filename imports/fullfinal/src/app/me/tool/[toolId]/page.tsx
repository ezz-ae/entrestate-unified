
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { tools, ToolData } from '@/lib/tools-data';
import { PageHeader } from '@/components/ui/page-header';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { JobStatus } from '@/components/JobStatus';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

type Job = {
    status: 'queued' | 'processing' | 'done' | 'error' | null;
    result?: any;
    error?: string;
}

export default function ToolPage() {
    const { toolId } = useParams<{ toolId: string }>();
    const { user } = useAuth();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [jobId, setJobId] = useState<string | null>(null);
    const [job, setJob] = useState<Job | null>(null);
    
    const tool: ToolData | undefined = tools.find(t => t.id === toolId);

    useEffect(() => {
        if (!jobId) return;

        const unsubscribe = onSnapshot(doc(db, 'jobs', jobId), (doc) => {
            if (doc.exists()) {
                const data = doc.data() as Job;
                setJob(data);
                if(data.status === 'done' || data.status === 'error') {
                    setIsLoading(false);
                }
            } else {
                setError(`Job with ID ${jobId} not found.`);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [jobId]);

    if (!tool) {
        notFound();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || !user) return;

        setIsLoading(true);
        setError(null);
        setJobId(null);
        setJob(null);

        try {
            const response = await fetch('/api/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolId,
                    payload: { prompt },
                    uid: user.uid,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Request failed with status ${response.status}`);
            }

            const data = await response.json();
            if(data.jobId) {
                setJobId(data.jobId);
            } else {
                throw new Error("API did not return a Job ID.");
            }

        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
                 <PageHeader
                    title={tool.dashboardTitle || tool.title}
                    description={tool.description}
                    icon={<DynamicIcon name={tool.iconName} className="h-8 w-8" />}
                    color={tool.color}
                />

                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Input</CardTitle>
                            <CardDescription>
                                Provide the necessary information for the AI to get to work.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder={`Enter your prompt for the ${tool.title}...`}
                                    className="min-h-[150px] text-base"
                                />
                                <Button type="submit" className="mt-4" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            {tool.cta}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 space-y-4">
                    {error && (
                        <Alert variant="destructive">
                             <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    
                    <JobStatus status={job?.status || null} jobId={jobId} />

                    {job?.status === 'done' && job.result && (
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    AI Result
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                                    <code>{JSON.stringify(job.result, null, 2)}</code>
                                </pre>
                            </CardContent>
                        </Card>
                    )}

                     {job?.status === 'error' && job.error && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4"/>
                            <AlertTitle>Job Failed</AlertTitle>
                            <AlertDescription>{job.error}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </main>
        </div>
    )
}
