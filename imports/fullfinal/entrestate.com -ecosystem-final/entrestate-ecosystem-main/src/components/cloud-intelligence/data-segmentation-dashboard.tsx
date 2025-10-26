
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getDataSegmentationInsights } from "@/ai/flows/cloud-intelligence/get-data-segmentation-insights";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Bot, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DataSegmentationDashboard() {
    const [insights, setInsights] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            setLoading(true);
            try {
                const result = await getDataSegmentationInsights();
                setInsights(result);
            } catch (error) {
                console.error("Error fetching data segmentation insights:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, []);
    
    const LoadingSkeleton = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card><CardHeader><Skeleton className="h-5 w-2/3" /></CardHeader><CardContent><Skeleton className="w-full h-48" /></CardContent></Card>
            <Card><CardHeader><Skeleton className="h-5 w-2/3" /></CardHeader><CardContent><Skeleton className="w-full h-48" /></CardContent></Card>
            <Card className="col-span-1 lg:col-span-2"><CardHeader><Skeleton className="h-5 w-1/3" /></CardHeader><CardContent><Skeleton className="h-10 w-3/4" /></CardContent></Card>
        </div>
    );

    if (loading) return <LoadingSkeleton />;
    if (!insights) return <p>Could not load data intelligence.</p>;
    
    const sourceData = Object.entries(insights.sourceBreakdown).map(([name, value]) => ({ name, value }));
    const statusData = Object.entries(insights.statusBreakdown).map(([name, value]) => ({ name, value }));

    return (
        <div className="space-y-6">
             <Card className="col-span-full bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" /> Gemini Data Insight
                    </CardTitle>
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold">"{insights.keyInsight}"</p>
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Data Source Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                    {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Property Status Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Overall Data Quality</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-primary">{insights.overallQualityScore}%</div>
                        <p className="text-xs text-muted-foreground">Based on AI-powered verification and scoring.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
