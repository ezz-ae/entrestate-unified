
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Bot, Workflow, FileText } from "lucide-react";
import { useParams } from 'next/navigation';

const flowData: { [key: string]: any } = {
    "full-marketing-automation": {
        title: "Full Marketing Automation",
        description: "From a single project ID, generate a brochure, create a landing page, write a social media campaign, and launch a Meta ad campaign.",
        steps: [
            "Input: Project ID",
            "Action: Generate Brochure (Creative Hub)",
            "Action: Generate Landing Page (Creative Hub)",
            "Action: Generate Social Media Campaign (Meta Intelligence)",
            "Action: Launch Meta Ad Campaign (Meta Intelligence)",
            "Output: Live campaign and all associated assets.",
        ]
    },
    // Add other flow data here
};

export default function FlowPage() {
    const params = useParams();
    const flow = flowData[params.slug as string];

    if (!flow) {
        return <div>Flow not found.</div>;
    }

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title={flow.title}
                    description={flow.description}
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                   <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                           <Card>
                               <CardHeader>
                                   <CardTitle className="flex items-center gap-2">
                                       <FileText className="h-5 w-5 text-primary" />
                                       Flow Steps
                                   </CardTitle>
                               </CardHeader>
                               <CardContent>
                                   <ol className="list-decimal list-inside space-y-2">
                                       {flow.steps.map((step: string, index: number) => (
                                           <li key={index}>{step}</li>
                                       ))}
                                   </ol>
                               </CardContent>
                           </Card>
                        </div>
                        <div className="md:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Run this Flow</CardTitle>
                                    <CardDescription>Provide the necessary inputs and let Gemini do the rest.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Placeholder for flow execution UI */}
                                    <Button size="lg" className="w-full">
                                        <PlayCircle className="h-6 w-6 mr-2" />
                                        Run Flow
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                   </div>
                </div>
            </main>
        </div>
    );
}
