
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CampaignPerformanceChart } from "@/components/meta-intelligence/campaign-performance-chart";
import { AudienceInsights } from "@/components/meta-intelligence/audience-insights";
import { ContentPerformance } from "@/components/meta-intelligence/content-performance";

export default function MetaIntelligencePage() {
    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Meta Intelligence Suite"
                description="Your AI command center for the entire Meta ecosystem."
            >
                <Link href="/me/meta-intelligence/create-campaign">
                    <Button>Create New Campaign</Button>
                </Link>
            </PageHeader>
            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                <CampaignPerformanceChart />
                <AudienceInsights />
                <ContentPerformance />
            </div>
        </div>
    );
}
