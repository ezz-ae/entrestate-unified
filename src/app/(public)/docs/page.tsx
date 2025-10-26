
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Book, Code, Bot } from "lucide-react";

const docs = [
    { id: "getting-started", title: "Getting Started", description: "A comprehensive guide to getting started with the Entrestate OS." },
    { id: "api-reference", title: "API Reference", description: "A complete reference for our Search, Chat, and Market Data APIs." },
    { id: "whatsmap-sdk", title: "WhatsMAP SDK", description: "Learn how to build your own custom AI agents and deploy them to the Entrestate Cloud." },
];

export default function DocsPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Documentation"
                    description="Your ultimate resource for building on the Entrestate Cloud."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {docs.map(doc => (
                            <Link href={`/docs/${doc.id}`} key={doc.id}>
                                <Card className="h-full hover:border-primary transition-colors">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            {doc.id === 'getting-started' && <Book className="h-6 w-6" />}
                                            {doc.id === 'api-reference' && <Code className="h-6 w-6" />}
                                            {doc.id === 'whatsmap-sdk' && <Bot className="h-6 w-6" />}
                                            {doc.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{doc.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
