
'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Cloud, Database, LayoutGrid, Users, Brain, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CloudPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-16">
        <PageHeader
          title="Entrestate Cloud & Data Intelligence"
          description="The backbone of our AI-native OS: public data, intelligent segmentation, and expert human-AI collaboration."
          icon={<Cloud className="h-8 w-8" />}
        />

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Public Open Data Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4"><Database className="h-8 w-8" /></div>
                <CardTitle className="text-xl font-bold">Transparent Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">
                  Access a vast repository of openly available real estate data, including historical transactions, pricing trends, and demographic information.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4"><LayoutGrid className="h-8 w-8" /></div>
                <CardTitle className="text-xl font-bold">API & Export Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">
                  Integrate public data directly into your existing systems via our robust APIs or export curated datasets for your analysis needs.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-primary/10 text-primary rounded-lg w-fit mb-4"><ShieldCheck className="h-8 w-8" /></div>
                <CardTitle className="text-xl font-bold">Validated & Reliable Sources</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-muted-foreground">
                  All public data is meticulously sourced and validated to ensure accuracy and reliability, providing a trustworthy foundation for your decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Intelligent Data Segmentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Brain className="h-6 w-6 text-primary" /> AI-Powered Categorization</CardTitle>
                <CardDescription>Our Gemini AI automatically processes and categorizes vast datasets.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>**Developer Monitoring:** Track new projects, sales velocities, and market share of key developers.</li>
                  <li>**Project Ranking:** Analyze projects by performance metrics, investor interest, and growth potential.</li>
                  <li>**SEO Keyword Insights:** Discover trending search terms and content gaps related to specific market segments.</li>
                  <li>**Geospatial Segmentation:** Understand micro-market dynamics down to individual communities and buildings.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm border-border/30 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-6 w-6 text-primary" /> Custom Segmentation for You</CardTitle>
                <CardDescription>Tailor data views to your specific needs and strategic objectives.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Whether you're an investor, broker, or developer, our intelligent segmentation tools allow you to focus on the data that matters most to your business.
                </p>
                <Link href="/me/tool/projects-finder">
                    <Button variant="outline">Explore Data Filters <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            Our AI Team: Review &amp; Assistance
          </h2>
          <Card className="bg-card/80 backdrop-blur-sm border-border/30 shadow-lg max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl"><Users className="h-7 w-7 text-primary" /> Human-AI Synergy</CardTitle>
              <CardDescription className="text-center max-w-2xl mx-auto">
                Our dedicated team of AI specialists works in tandem with Gemini to curate, validate, and enrich the data, ensuring the highest quality insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">Data Curation & Validation</h3>
                <p className="text-muted-foreground">
                  Our experts meticulously review data sources, cross-reference information, and apply quality control to guarantee the accuracy of our intelligence.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">AI Model Refinement</h3>
                <p className="text-muted-foreground">
                  The AI team continuously monitors and refines Gemini's data processing and segmentation models, adapting to market changes and enhancing precision.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center">
                <Link href="/support">
                    <Button>Contact Our AI Team <ArrowRight className="ml-2 h-4 w-4"/></Button>
                </Link>
            </CardFooter>
          </Card>
        </section>

      </main>
    </div>
  );
}
