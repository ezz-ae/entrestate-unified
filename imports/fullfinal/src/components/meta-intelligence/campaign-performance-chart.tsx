
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', leads: 4000, clicks: 2400 },
    { name: 'Feb', leads: 3000, clicks: 1398 },
    { name: 'Mar', leads: 2000, clicks: 9800 },
    { name: 'Apr', leads: 2780, clicks: 3908 },
    { name: 'May', leads: 1890, clicks: 4800 },
    { name: 'Jun', leads: 2390, clicks: 3800 },
    { name: 'Jul', leads: 3490, clicks: 4300 },
];

export function CampaignPerformanceChart() {
    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Leads" />
                        <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Clicks" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
