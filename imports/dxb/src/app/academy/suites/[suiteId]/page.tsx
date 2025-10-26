
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { suites, tools, SuiteData, ToolData } from '@/lib/tools-data';
import { PageHeader } from '@/components/ui/page-header';
import * as LucideIcons from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

// Placeholder for a step-by-step guide
const tutorialSteps = [
    {
        title: 'Step 1: Define Your Campaign Goal',
        description: 'Start by telling the Campaign Creator what you want to achieve. Are you looking for leads, website traffic, or brand awareness?',
        toolId: 'campaign-builder'
    },
    {
        title: 'Step 2: Generate Your Ad Creative',
        description: 'Use the Insta Ads Designer to create stunning, AI-powered visuals for your campaign. No design skills required.',
        toolId: 'insta-ads-designer'
    },
    {
        title: 'Step 3: Launch with the Auto-Pilot',
        description: 'Let the Property Marketer AI take over. It will automatically launch, monitor, and optimize your campaign for the best results.',
        toolId: 'meta-auto-pilot'
    }
];

export default function SuiteGuidePage() {
    const { suiteId } = useParams<{ suiteId: string }>();

    const suite: SuiteData | undefined = suites.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === suiteId);
    
    if (!suite) {
        notFound();
    }
    
    const suiteTools: ToolData[] = tools.filter(t => t.suite === suite.name);

    return (
        <div className="flex flex-col">
            <PageHeader
                title={`${suite.name} Guide`}
                description={`Learn how to use the ${suite.name} to achieve your goals. This step-by-step guide will walk you through a real-world scenario.`}
                icon={<DynamicIcon name={suiteTools[0]?.iconName || 'BookOpen'} className="h-8 w-8" />}
            />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold font-heading mb-4">Outcome: Launch a Successful Ad Campaign</h2>
                            <p className="text-lg text-muted-foreground">
                                In this guide, we'll walk you through the process of launching a complete social media ad campaign, from initial idea to active ads, in just a few minutes.
                            </p>
                        </div>

                        {tutorialSteps.map((step, index) => (
                             <Card key={index} className="overflow-hidden">
                                <CardHeader className="bg-muted/50">
                                    <CardTitle className="text-xl">
                                        <span className="text-primary">{`Step ${index + 1}: `}</span>{step.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <p className="mb-4">{step.description}</p>
                                    <Link href={`/me/tool/${step.toolId}`}>
                                        <Button variant="outline">
                                            Go to {tools.find(t => t.id === step.toolId)?.title}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                         <div>
                            <h2 className="text-2xl font-bold font-heading mb-4">Congratulations!</h2>
                            <p className="text-lg text-muted-foreground">
                                You've successfully launched your first AI-powered ad campaign. The Property Marketer AI will now monitor your ads and provide you with real-time performance updates in your dashboard.
                            </p>
                        </div>
                    </div>

                    <div>
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Tools in this Suite</CardTitle>
                                <CardDescription>This guide will use the following tools from the {suite.name}.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {suiteTools.map(tool => (
                                    <Link href={`/me/tool/${tool.id}`} key={tool.id} className="block p-4 rounded-lg hover:bg-muted">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-lg text-white" style={{backgroundColor: tool.color}}>
                                                <DynamicIcon name={tool.iconName} className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{tool.title}</p>
                                                <p className="text-sm text-muted-foreground">{tool.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
