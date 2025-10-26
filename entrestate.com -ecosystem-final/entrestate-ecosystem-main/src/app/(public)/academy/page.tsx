
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const courses = [
    {
        id: "mastering-meta-intelligence",
        title: "Mastering the Meta Intelligence Suite",
        description: "Learn how to create, manage, and optimize high-performing Meta ad campaigns with the power of AI.",
        level: "Beginner",
    },
    {
        id: "lead-conversion-playbook",
        title: "The AI Lead Conversion Playbook",
        description: "Transform your lead management process from a simple list into an intelligent, automated conversion engine.",
        level: "Intermediate",
    },
    {
        id: "creative-automation-workshop",
        title: "Creative Automation Workshop",
        description: "Discover how to generate a month's worth of high-quality marketing content in minutes with the Creative Intelligence Suite.",
        level: "Beginner",
    },
    {
        id: "data-driven-agent",
        title: "Becoming a Data-Driven Agent",
        description: "Leverage the full power of the Cloud Intelligence and Listing Intelligence suites to make smarter, faster decisions.",
        level: "Advanced",
    }
];

export default function AcademyPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Entrestate Academy"
                    description="Your AI-powered learning space for becoming a top-tier real estate professional."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <Card key={course.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-start gap-2">
                                        <BookOpen className="h-6 w-6 text-primary mt-1" />
                                        <span>{course.title}</span>
                                    </CardTitle>
                                    <CardDescription>{course.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm font-semibold text-muted-foreground">{course.level}</p>
                                </CardContent>
                                <CardFooter>
                                    <Link href={`/academy/${course.id}`} className="w-full">
                                        <Button className="w-full">
                                            Start Learning <ArrowRight className="ml-2 h-4 w-4" />
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
