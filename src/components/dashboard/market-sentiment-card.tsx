
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getMarketTrends } from "@/ai/flows/market-intelligence/get-market-trends";

export function MarketSentimentCard() {
    const [sentiment, setSentiment] = useState('loading...');
    const [newsSummary, setNewsSummary] = useState('loading...');

    useEffect(() => {
        async function fetchMarketSentiment() {
            try {
                const marketTrends = await getMarketTrends({
                    topic: "Overall Dubai real estate market sentiment",
                    market: { name: "Dubai" },
                });
                setSentiment(marketTrends.overallSentiment);
                setNewsSummary(marketTrends.newsSummary);
            } catch (error) {
                console.error("Error fetching market sentiment:", error);
                setSentiment("Error");
            }
        }
        fetchMarketSentiment();
    }, []);

    const getSentimentColor = () => {
        if (sentiment.toLowerCase().includes('positive') || sentiment.toLowerCase().includes('optimistic')) {
            return 'bg-green-500';
        }
        if (sentiment.toLowerCase().includes('negative') || sentiment.toLowerCase().includes('cautious')) {
            return 'bg-red-500';
        }
        return 'bg-gray-500';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
                <Badge className={getSentimentColor()}>{sentiment}</Badge>
                <p className="text-sm text-muted-foreground mt-2">{newsSummary}</p>
            </CardContent>
        </Card>
    );
}
