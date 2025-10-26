
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Bot, FileText } from "lucide-react";

export function AIUsageCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Resource Usage (Last 24h)</CardTitle>
                <CardDescription>Monitoring the cost and usage of the Gemini models.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                    <Bot className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">1,428</p>
                    <p className="text-xs text-muted-foreground">Model Calls</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                    <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">2.1M</p>
                    <p className="text-xs text-muted-foreground">Tokens Processed</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold">$12.54</p>
                    <p className="text-xs text-muted-foreground">Estimated Cost</p>
                </div>
            </CardContent>
        </Card>
    );
}
