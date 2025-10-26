
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { runSalesPilot } from "@/ai/flows/lead-intelligence/sales-pilot";
import { useState } from "react";

export function SalesPilot() {
    const [leadId, setLeadId] = useState('');
    const [salesPilotData, setSalesPilotData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        setLoading(true);
        try {
            const result = await runSalesPilot({
                leadId,
                market: { name: 'Dubai' },
            });
            setSalesPilotData(result);
        } catch (error) {
            console.error("Error running sales pilot:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Sales Pilot</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        value={leadId}
                        onChange={(e) => setLeadId(e.target.value)}
                        placeholder="Enter a lead ID..."
                    />
                    <Button onClick={handleRun} disabled={loading}>
                        {loading ? 'Running...' : 'Run Sales Pilot'}
                    </Button>
                </div>
                {salesPilotData && (
                    <div className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold">Lead Investigation</h4>
                                <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(salesPilotData.leadInvestigation, null, 2)}</pre>
                            </div>
                            <div>
                                <h4 className="font-semibold">Matched Offers</h4>
                                <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(salesPilotData.matchedOffers, null, 2)}</pre>
                            </div>
                            <div>
                                <h4 className="font-semibold">Email Draft</h4>
                                <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(salesPilotData.emailDraft, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
