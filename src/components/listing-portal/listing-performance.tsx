
'use client';

import { useState } from 'react';
import { trackListingPerformance } from '@/ai/flows/listing-crm/track-listing-performance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ListingPerformance() {
    const [listingId, setListingId] = useState('');
    const [performance, setPerformance] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPerformance(null);

        try {
            const result = await trackListingPerformance({
                listingId,
                market: { name: 'Dubai' },
            });
            setPerformance(result);
        } catch (error) {
            console.error('Error tracking listing performance:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Track Listing Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={listingId}
                        onChange={(e) => setListingId(e.target.value)}
                        placeholder="Enter a Listing ID"
                        className="mb-2"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Tracking...' : 'Track Performance'}
                    </Button>
                </form>

                {performance && (
                    <div className="mt-4">
                        <p>{performance.performanceSummary}</p>
                        <ul className="list-disc pl-5 mt-2">
                            {performance.recommendations.map((rec: string) => (
                                <li key={rec}>{rec}</li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={performance.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
                                    <Line type="monotone" dataKey="leads" stroke="#82ca9d" name="Leads" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
