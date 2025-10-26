
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { DataSegmentationDashboard } from "@/components/cloud-intelligence/data-segmentation-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart, Bot, BrainCircuit } from "lucide-react";

export default function LiveMarketDashboardPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Live Dubai Market Dashboard"
                    description="A real-time overview of the Dubai property market, powered by the Entrestate Cloud."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <DataSegmentationDashboard />
                    <div className="grid md:grid-cols-3 gap-8 mt-8">
                        <InfoCard
                            icon={<BarChart className="h-8 w-8 text-primary" />}
                            title="Real-Time Data"
                            description="Our AI agents ingest and verify data from dozens of sources in real-time, giving you the most accurate and up-to-date view of the market."
                        />
                        <InfoCard
                            icon={<BrainCircuit className="h-8 w-8 text-primary" />}
                            title="Predictive Analytics"
                            description="We use Gemini to analyze historical trends and market signals, providing you with predictive insights that you won't find anywhere else."
                        />
                        <InfoCard
                            icon={<Bot className="h-8 w-8 text-primary" />}
                            title="AI-Powered Insights"
                            description="Our system doesn't just show you data; it interprets it, providing you with actionable insights and recommendations."
                        />
                    </div>
                    <Card className="mt-12 text-center">
                        <CardHeader>
                            <CardTitle>Harness This Intelligence for Your Business</CardTitle>
                            <CardDescription>This live dashboard is powered by our Cloud Intelligence Suite. Deploy our Search, Chat, and Market Data APIs to build your own next-generation real estate applications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/solutions/cloud-intelligence">
                                <Button size="lg">
                                    Explore the Cloud Intelligence Suite <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

const InfoCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);
