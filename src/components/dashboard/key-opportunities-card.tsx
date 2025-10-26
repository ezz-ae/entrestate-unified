
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getMarketTrends } from "@/ai/flows/market-intelligence/get-market-trends";

type Opportunity = {
    opportunity: string;
    rationale: string;
};

export function KeyOpportunitiesCard() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchKeyOpportunities() {
            try {
                const marketTrends = await getMarketTrends({
                    topic: "Key investment opportunities in the Dubai real estate market",
                    market: { name: "Dubai" },
                });
                setOpportunities(marketTrends.keyOpportunities);
            } catch (error) {
                console.error("Error fetching key opportunities:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchKeyOpportunities();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Key Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading opportunities...</p>
                ) : (
                    <ul>
                        {opportunities.map((opportunity, index) => (
                            <li key={index} className="mb-2">
                                <h4 className="font-semibold">{opportunity.opportunity}</h4>
                                <p className="text-sm text-muted-foreground">{opportunity.rationale}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
