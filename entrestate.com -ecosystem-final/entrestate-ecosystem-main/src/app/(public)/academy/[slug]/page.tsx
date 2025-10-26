
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Bot, BrainCircuit, ArrowRight } from "lucide-react";
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const courseData: { [key: string]: any } = {
    "mastering-meta-intelligence": {
        title: "Mastering the Meta Intelligence Suite",
        description: "Go from zero to hero in AI-powered advertising. This course teaches you to launch, manage, and optimize high-performing Meta ad campaigns without any prior media buying experience.",
        modules: [
            { title: "Module 1: AI-Driven Audience Discovery", content: "Learn how to connect your project data and let Gemini analyze market signals to build hyper-targeted ad audiences that convert." },
            { title: "Module 2: The One-Click Creative Studio", content: "Go from a project name to a full set of on-brand, AI-generated ad creatives (images and copy) in seconds." },
            { title: "Module 3: Campaign Orchestration & Autopilot", content: "Launch, monitor, and let the AI co-pilot optimize your campaigns for ROI, with real-time insights and automated adjustments." },
        ]
    },
    "lead-conversion-playbook": {
        title: "The AI Lead Conversion Playbook",
        description: "Stop managing lists and start closing deals. This playbook transforms your CRM into an intelligent, automated conversion engine.",
        modules: [
            { title: "Module 1: The AI Sales Pilot", content: "Activate the Sales Pilot to automatically investigate new leads, find matching properties, and draft personalized outreach." },
            { title: "Module 2: Deal Room Intelligence", content: "Learn to use the Deal Room to generate negotiation strategies, build deal plans, and manage your pipeline on a lead-by-lead basis." },
            { title: "Module 3: Proactive Nurturing", content: "Discover how to use AI-generated insights to send the perfect follow-up at the perfect time, keeping your leads engaged and moving them towards a close." },
        ]
    },
    "creative-automation-workshop": {
        title: "Creative Automation Workshop",
        description: "This workshop is for agents who want to generate a month's worth of high-quality marketing content in minutes, not hours.",
        modules: [
            { title: "Module 1: The AI Brand Creator", content: "Upload your logo once and let Gemini create a complete brand kit that is automatically applied to every asset you generate." },
            { title: "Module 2: The Generative Toolset", content: "Master the PDF Editor, Landing Page Builder, and Template Library to create any marketing asset you need, instantly." },
            { title: "Module 3: Cross-Suite Workflows", content: "Learn how to connect your creative assets to live campaigns in the Meta Intelligence Suite using the WhatsMAP engine." },
        ]
    },
};

export default function CoursePage() {
    const params = useParams();
    const course = courseData[params.slug as string];

    if (!course) {
        return (
             <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">404 - Course Not Found</h1>
                <p className="text-muted-foreground">The course you are looking for does not exist.</p>
                <Link href="/academy">
                    <Button variant="outline" className="mt-4">Back to Academy</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title={course.title}
                    description={course.description}
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                   <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            {course.modules.map((module: any, index: number) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BrainCircuit className="h-5 w-5 text-primary" />
                                            Module {index + 1}: {module.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{module.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="md:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>AI Learning Assistant</CardTitle>
                                    <CardDescription>Ask WhatsMAP anything about this course.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-center text-muted-foreground p-4 border rounded-md">
                                        <Bot className="h-6 w-6 mx-auto mb-2 text-primary" />
                                        <p>Your AI Tutor is ready. Try asking:</p>
                                        <p className="font-semibold italic mt-2">"How can I use the sales pilot for off-plan leads?"</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                   </div>
                </div>
            </main>
        </div>
    );
}
