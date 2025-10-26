
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { runFlow } from "@/lib/tools-client"; // Use the new client
import { useState } from "react";

export function CampaignOrchestration({ campaignData, onCampaignCreate }: { campaignData: any, onCampaignCreate: (campaign: any) => void }) {
    const [campaign, setCampaign] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCreateCampaign = async () => {
        setLoading(true);
        try {
            // Use the runFlow client to call the backend
            const result = await runFlow('launch-meta-campaign', {
                ...campaignData
            });
            setCampaign(result);
        } catch (error) {
            console.error("Error creating campaign:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>4. Launch Your Campaign</CardTitle>
                <CardDescription>Let our AI orchestrate a complete, multi-platform campaign based on your objective, targeting, and creative.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleCreateCampaign} disabled={loading || !campaignData.objective || !campaignData.targeting || !campaignData.creative}>
                    {loading ? 'Orchestrating...' : 'Orchestrate AI Campaign'}
                </Button>

                {campaign && (
                    <div className="mt-4">
                        <h4 className="font-semibold">AI-Orchestrated Campaign Plan</h4>
                        <div className="mt-2 p-2 border rounded">
                            <h5 className="font-semibold">{campaign.campaignName}</h5>
                            <p className="text-sm"><strong>Objective:</strong> {campaign.campaignObjective}</p>
                            <p className="text-sm"><strong>Audience:</strong> {campaign.inferredAudience}</p>
                            <div className="mt-2">
                                <h6 className="font-semibold">Ad Sets</h6>
                                {campaign.adSets.map((adSet: any, index: number) => (
                                    <div key={index} className="mt-1 p-1 border rounded">
                                        <p className="text-sm"><strong>{adSet.name}</strong></p>
                                        <p className="text-sm">{adSet.targetingSummary}</p>
                                        <p className="text-sm">Daily Budget: ${adSet.dailyBudget}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2">
                                <h6 className="font-semibold">Ad Creatives</h6>
                                {campaign.adCreatives.map((creative: any, index: number) => (
                                    <div key={index} className="mt-1 p-1 border rounded">
                                        <p className="text-sm"><strong>{creative.headline}</strong></p>
                                        <p className="text-sm">{creative.bodyText}</p>
                                        <p className="text-sm">Call to Action: {creative.callToAction}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm mt-2"><strong>Optimization Advice:</strong> {campaign.optimizationAdvice}</p>
                            <p className="text-sm mt-2"><strong>Campaign ID:</strong> {campaign.id}</p>
                        </div>
                    </div>
                )}
                
                <Button 
                    className="mt-4" 
                    disabled={!campaign}
                    onClick={() => onCampaignCreate(campaign)}
                >
                    Finish
                </Button>
            </CardContent>
        </Card>
    );
}
