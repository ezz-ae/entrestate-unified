
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { CampaignObjectives } from "@/components/meta-intelligence/campaign-objectives";
import { TargetingIntelligence } from "@/components/meta-intelligence/targeting-intelligence";
import { CreativeIntelligence } from "@/components/meta-intelligence/creative-intelligence";
import { CampaignOrchestration } from "@/components/meta-intelligence/campaign-orchestration";
import { useState } from "react";
import { getMarketTrends } from "@/ai/flows/market-intelligence/get-market-trends";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreateCampaignPage() {
    const [step, setStep] = useState(1);
    const [campaignData, setCampaignData] = useState<any>({});
    const [marketAnalysis, setMarketAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleObjectiveSelect = async (objective: string) => {
        setLoading(true);
        try {
            const analysis = await getMarketTrends({
                topic: `Market analysis for a ${objective} campaign`,
                market: { name: 'Dubai' },
            });
            setMarketAnalysis(analysis);
            setCampaignData({ ...campaignData, objective });
            setStep(2);
        } catch (error) {
            console.error("Error fetching market analysis:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTargetingSelect = (targeting: any) => {
        setCampaignData({ ...campaignData, targeting });
        setStep(3);
    };

    const handleCreativeSelect = (creative: any) => {
        setCampaignData({ ...campaignData, creative });
        setStep(4);
    };

    const handleCampaignCreate = (campaign: any) => {
        console.log("Campaign created:", campaign);
        // Reset the process
        setStep(1);
        setCampaignData({});
        setMarketAnalysis(null);
    };

    return (
        <div>
            <PageHeader
                title="Create a New Campaign"
                description="Follow the steps below to create a new, AI-powered marketing campaign."
            >
                <Link href="/me/meta-intelligence">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </PageHeader>
            <div className="space-y-4">
                {step === 1 && <CampaignObjectives onObjectiveSelect={handleObjectiveSelect} />}
                {step === 2 && <TargetingIntelligence onTargetingSelect={handleTargetingSelect} />}
                {step === 3 && <CreativeIntelligence onCreativeSelect={handleCreativeSelect} />}
                {step === 4 && <CampaignOrchestration campaignData={campaignData} onCampaignCreate={handleCampaignCreate} />}
            </div>
        </div>
    );
}
