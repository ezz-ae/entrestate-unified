
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Workflow, Bot } from "lucide-react";

const flows = [
    {
        id: "full-marketing-automation",
        title: "Full Marketing Automation",
        description: "From a single project ID, generate a brochure, create a landing page, write a social media campaign, and launch a Meta ad campaign.",
        author: "Gemini",
    },
    {
        id: "lead-to-close-pilot",
        title: "Lead-to-Close Sales Pilot",
        description: "Take a new lead, investigate them, find matching properties, draft a personalized email, and schedule a follow-up.",
        author: "Gemini",
    },
    {
        id: "listing-optimizer-pro",
        title: "Listing Optimizer Pro",
        description: "Analyze an underperforming listing, enhance its photos, rewrite its description based on market trends, and re-publish it to all portals.",
        author: "Gemini",
    },
    {
        id: "content-creation-engine",
        title: "Content Creation Engine",
        description: "Generate a week's worth of social media content, including images and videos, from a single topic or URL.",
        author: "Gemini",
    }
];

export default function FlowsPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Action Flow Library"
                    description="Your library of pre-built, AI-powered automation flows."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {flows.map(flow => (
                            <Card key={flow.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-start gap-2">
                                        <Workflow className="h-6 w-6 text-primary mt-1" />
                                        <span>{flow.title}</span>
                                    </CardTitle>
                                    <CardDescription>{flow.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                     <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                        <Bot className="h-3 w-3" /> Created by {flow.author}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/flows/${flow.id}`} className="w-full">
                                        <Button className="w-full">
                                            Use This Flow <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </div>
            </main>
        </div>
    );
}
