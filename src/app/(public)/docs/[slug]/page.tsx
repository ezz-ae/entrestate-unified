'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from 'next/navigation';
import Markdown from 'react-markdown';
import Link from "next/link";

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

export function DocArticlePage({ params }: { params: { slug: string } }) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex">
        <aside className="hidden md:block w-1/4 pr-8">
          <nav>
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <ul>
              <li><Link href="/docs/intro" className="text-muted-foreground hover:text-foreground">Introduction</Link></li>
            </ul>
          </nav>
        </aside>
        <article className="prose lg:prose-xl w-full md:w-3/4">
          <h1>Documentation for: {params.slug.replace(/-/g, ' ')}</h1>
          <p>This is a sample documentation page. The content for each article would be fetched based on the slug, likely from Markdown files or a CMS.</p>
          <p>The slug for this page is <strong>{params.slug}</strong>. You can use this to retrieve and display the correct content.</p>
        </article>
      </div>
    </main>
  );
}
