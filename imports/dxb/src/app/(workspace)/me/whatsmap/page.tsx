
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Bot, MessageSquare, BarChart } from "lucide-react";
import { useState } from "react";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";

const oneClickPrompts = [
    { title: "Analyze Market Trends", prompt: "What are the latest market trends in Dubai?", icon: <BarChart/> },
    { title: "Draft a Follow-up Email", prompt: "Draft a follow-up email for a lead who viewed a property yesterday.", icon: <MessageSquare/> },
    { title: "Generate a Project Brochure", prompt: "Generate a project brochure for Emaar Beachfront.", icon: <Bot/> },
    { title: "Find Investment Properties", prompt: "Find me 3 off-plan projects with the highest potential ROI.", icon: <Zap/> },
];

export default function WhatsMAPDashboardPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handlePromptClick = async (prompt: string) => {
        setLoading(true);
        setResult(null);
        try {
            const response = await runWhatsMAP({ query: prompt });
            setResult(response);
        } catch (error) {
            console.error("Error running WhatsMAP prompt:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="WhatsMAP Command Center"
                description="Your private dashboard for interacting with and managing your AI co-pilot."
            />
            <main className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>One-Click Prompts</CardTitle>
                        <CardDescription>Run powerful, pre-built commands with a single click.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        {oneClickPrompts.map(p => (
                            <Button key={p.title} variant="outline" className="h-auto p-4 justify-start" onClick={() => handlePromptClick(p.prompt)}>
                                <div className="flex items-center gap-4">
                                    <div className="text-primary">{p.icon}</div>
                                    <div>
                                        <p className="font-semibold">{p.title}</p>
                                        <p className="text-xs text-muted-foreground text-left">{p.prompt}</p>
                                    </div>
                                </div>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {loading && <p className="mt-4 text-center">WhatsMAP is working...</p>}
                
                {result && (
                    <Card className="mt-6">
                        <CardHeader><CardTitle>WhatsMAP Response</CardTitle></CardHeader>
                        <CardContent>
                           {/* A simplified renderer for the response */}
                           <pre className="p-4 bg-muted rounded-md text-sm">
                               {JSON.stringify(result.response, null, 2)}
                           </pre>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
