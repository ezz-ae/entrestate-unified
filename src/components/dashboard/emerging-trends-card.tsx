
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getMarketTrends } from "@/ai/flows/market-intelligence/get-market-trends";

type Trend = {
    trend: string;
    description: string;
};

export function EmergingTrendsCard() {
    const [trends, setTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEmergingTrends() {
            try {
                const marketTrends = await getMarketTrends({
                    topic: "Emerging trends in the Dubai real estate market",
                    market: { name: "Dubai" },
                });
                setTrends(marketTrends.emergingTrends);
            } catch (error) {
                console.error("Error fetching emerging trends:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmergingTrends();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Emerging Trends</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading trends...</p>
                ) : (
                    <ul>
                        {trends.map((trend, index) => (
                            <li key={index} className="mb-2">
                                <h4 className="font-semibold">{trend.trend}</h4>
                                <p className="text-sm text-muted-foreground">{trend.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
