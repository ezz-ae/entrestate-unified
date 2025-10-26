
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getMarketTrends } from "@/ai/flows/market-intelligence/get-market-trends";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ForecastDataPoint = {
    date: string;
    predictedValue: number;
    lowerBound: number;
    upperBound: number;
};

export function ForecastCard() {
    const [forecastData, setForecastData] = useState<ForecastDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchForecastData() {
            try {
                const marketTrends = await getMarketTrends({
                    topic: "6-month forecast for the Dubai real estate market",
                    market: { name: "Dubai" },
                });
                setForecastData(marketTrends.forecastData);
            } catch (error) {
                console.error("Error fetching forecast data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchForecastData();
    }, []);

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>6-Month Market Forecast</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p>Loading forecast...</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="predictedValue" stroke="#8884d8" name="Predicted Value" />
                            <Line type="monotone" dataKey="lowerBound" stroke="#82ca9d" name="Lower Bound" />
                            <Line type="monotone" dataKey="upperBound" stroke="#ffc658" name="Upper Bound" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
