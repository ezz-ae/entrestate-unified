
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from 'next/navigation';
import Markdown from 'react-markdown';

const docData: { [key: string]: any } = {
    "getting-started": {
        title: "Getting Started",
        content: `
# Getting Started with the Entrestate OS

Welcome to the Entrestate OS! This guide will walk you through the basics of setting up your account and getting started with our powerful suite of AI-powered tools.

## 1. Set Up Your Account

The first step is to create your account and set up your profile. You'll be guided through a simple onboarding process that will help you to create your AI-generated Brand Kit and connect your external accounts.

## 2. Explore the EI-OS Workspace

The EI-OS Workspace is your central command center for the entire Entrestate OS. From here, you can access all of your suites, manage your settings, and interact with the WhatsMAP engine.

## 3. Activate Your Suites

The Appstore is where you can activate the suites that are included in your subscription plan. Once a suite is activated, it will be available in your EI-OS Workspace.
`
    },
    // Add other doc data here
};

export default function DocPage() {
    const params = useParams();
    const slug = params.slug as string;
    const doc = docData[slug];

    if (!doc) {
        return <div>Doc not found.</div>;
    }

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title={doc.title}
                />
                <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl prose">
                    <Markdown>{doc.content}</Markdown>
                </div>
            </main>
        </div>
    );
}
