
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GeminiLeadInsightCardProps {
    insight: string;
    actionLink: string;
    actionText: string;
}

export function GeminiLeadInsightCard({ insight, actionLink, actionText }: GeminiLeadInsightCardProps) {
    return (
        <Card className="col-span-full bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" /> Gemini Lead Insight
                </CardTitle>
                <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-xl font-bold">"{insight}"</div>
                <p className="text-xs text-muted-foreground mt-1">Proactive insight from your AI co-pilot.</p>
                <Link href={actionLink} className="text-sm text-primary hover:underline mt-4 block">
                    {actionText} <ArrowRight className="ml-1 inline-block h-3 w-3" />
                </Link>
            </CardContent>
        </Card>
    );
}
