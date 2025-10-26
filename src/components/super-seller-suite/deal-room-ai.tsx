
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function DealRoomAI() {
    const [dealDetails, setDealDetails] = useState('');
    const [dealPlan, setDealPlan] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGeneratePlan = async () => {
        setLoading(true);
        // In a real application, you would call a dedicated AI flow to generate the deal plan.
        // For now, we will just simulate the process.
        await new Promise(resolve => setTimeout(resolve, 2000));
        setDealPlan({
            title: 'Project X - Bulk Deal Plan',
            summary: 'A comprehensive plan for a bulk purchase of 10 units in Project X.',
            negotiationStrategy: 'Start with a lowball offer and then negotiate up to a maximum of 5% below the asking price.',
            timeline: [
                { date: '2024-10-26', task: 'Submit initial offer' },
                { date: '2024-11-01', task: 'Negotiate with developer' },
                { date: '2024-11-15', task: 'Finalize and sign contracts' },
            ],
        });
        setLoading(false);
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Deal Room AI</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={dealDetails}
                    onChange={(e) => setDealDetails(e.target.value)}
                    placeholder="Enter the details of the deal..."
                    className="mb-4"
                />
                <Button onClick={handleGeneratePlan} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Deal Plan'}
                </Button>
                {dealPlan && (
                    <div className="mt-4">
                        <h4 className="font-semibold">{dealPlan.title}</h4>
                        <p className="text-sm">{dealPlan.summary}</p>
                        <h5 className="font-semibold mt-2">Negotiation Strategy</h5>
                        <p className="text-sm">{dealPlan.negotiationStrategy}</p>
                        <h5 className="font-semibold mt-2">Timeline</h5>
                        <ul className="list-disc pl-5 mt-1">
                            {dealPlan.timeline.map((item: any, index: number) => (
                                <li key={index} className="text-sm"><strong>{item.date}:</strong> {item.task}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
