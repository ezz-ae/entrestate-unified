
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShoppingCart } from 'lucide-react';
import { tools, ToolData } from '@/lib/tools-data';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const IconComponent = LucideIcons[name as IconName] as React.ElementType;
  if (!IconComponent) return <LucideIcons.HelpCircle {...props} />;
  return <IconComponent {...props} />;
};

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const tool: ToolData | undefined = tools.find(t => t.id === slug);

  if (!tool) {
    notFound();
  }

  // Placeholder data - this can be expanded in tools-data.ts later
  const benefits = [
    'Automate repetitive tasks and save time.',
    'Increase lead generation and conversion rates.',
    'Gain deeper insights with AI-powered analytics.',
    'Create stunning marketing materials effortlessly.',
    'Streamline your workflow and improve efficiency.',
  ];

  const features = [
    { title: 'AI-Powered Engine', description: 'Leverages the latest Gemini models for unparalleled intelligence.' },
    { title: 'Seamless Integration', description: 'Connects effortlessly with other tools in the Entrestate ecosystem.' },
    { title: 'User-Friendly Interface', description: 'Designed for real estate professionals, not tech experts.' },
    { title: 'Real-Time Data', description: 'Access up-to-the-minute market information and insights.' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        
        <PageHeader
          title={tool.title}
          description={tool.description}
          icon={<DynamicIcon name={tool.iconName} className="h-8 w-8" />}
          color={tool.color}
        >
            <div className="mt-6 space-y-4">
                 <p className="text-lg text-muted-foreground max-w-xl">{tool.longDescription}</p>
                 <Link href={`/me/tool/${tool.id}`}>
                    <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                        {tool.cta} <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                 </Link>
            </div>
        </PageHeader>
        
        <section>
             <h2 className="text-3xl font-bold text-center mb-8">Why You'll Love {tool.title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.slice(0, 3).map((benefit, index) => (
                    <Card key={index} className="bg-muted/50 p-4 flex items-start gap-3 shadow-sm">
                        <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                        <p className="text-lg text-foreground/90">{benefit}</p>
                    </Card>
                ))}
             </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden">
                {/* Placeholder for an image or a simulation component */}
                <div className="bg-muted w-full h-80 flex items-center justify-center">
                    <DynamicIcon name={tool.iconName} className="h-32 w-32 text-muted-foreground/50" />
                </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="text-center py-16 bg-muted rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                Integrate {tool.title} into your workflow and start seeing results today.
            </p>
            <div className="mt-8">
                <Link href={`/me/tool/${tool.id}`}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Your Workspace
                    </Button>
                </Link>
            </div>
        </section>

      </main>
    </div>
  );
}
