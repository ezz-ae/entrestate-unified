
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { ActiveFlows } from "@/components/gem/active-flows";
import { AIUsageCard } from "@/components/gem/ai-usage-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function GemPage() {
  return (
    <div className="p-4 md:p-8">
      <PageHeader
        title="GEM Panel (AI Brain Monitor)"
        description="The command center for monitoring and managing the AI core of the Entrestate OS."
      />
      <main className="mt-6 space-y-8">
        <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
                <ActiveFlows />
            </div>
            <div className="md:col-span-4 space-y-8">
                <AIUsageCard />
                <Card>
                    <CardHeader>
                        <CardTitle>Human-in-the-Loop (HITL)</CardTitle>
                        <CardDescription>Automatically flag low-confidence AI decisions for manual review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Switch id="hitl-switch" />
                            <Label htmlFor="hitl-switch">Enable HITL</Label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">When enabled, AI responses with a confidence score below 85% will be sent to the review queue.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
