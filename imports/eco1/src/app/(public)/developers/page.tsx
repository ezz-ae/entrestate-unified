
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code, Book, Bot } from "lucide-react";

export default function DeveloperPortalPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Developer Portal"
                    description="Everything you need to build on the Entrestate Cloud."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Code className="h-6 w-6" /> API Documentation</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Explore our comprehensive API documentation to learn how to use our Search, Chat, and Market Data APIs.</p>
                                <Button variant="outline">View Docs</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Book className="h-6 w-6" /> Tutorials & Examples</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Follow our step-by-step tutorials to learn how to build your first AI-powered real estate application.</p>
                                <Button variant="outline">Start Learning</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Bot className="h-6 w-6" /> AI Agent SDK</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Use our AI Agent SDK to build your own custom AI agents and deploy them to the Entrestate Cloud.</p>
                                <Button variant="outline">Get Started</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
