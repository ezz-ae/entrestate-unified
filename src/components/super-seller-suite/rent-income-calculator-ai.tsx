
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function RentIncomeCalculatorAI() {
    const [projectId, setProjectId] = useState('');
    const [date, setDate] = useState('');
    const [forecast, setForecast] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        // In a real application, you would call a dedicated AI flow to generate the forecast.
        // For now, we will just simulate the process.
        await new Promise(resolve => setTimeout(resolve, 2000));
        setForecast({
            title: 'Project Z - Rental Income Forecast',
            summary: `A forecast of the potential rental income for a 2-bedroom apartment in Project Z on ${date}.`,
            expectedIncome: 'AED 150,000 per year',
            chartData: [
                { name: 'Jan', income: 12000 },
                { name: 'Feb', income: 12500 },
                { name: 'Mar', income: 13000 },
                { name: 'Apr', income: 13500 },
                { name: 'May', income: 14000 },
                { name: 'Jun', income: 14500 },
            ],
        });
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rent Income Calculator AI</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="Enter a project ID..."
                    />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Button onClick={handleCalculate} disabled={loading}>
                        {loading ? 'Calculating...' : 'Calculate'}
                    </Button>
                </div>
                {forecast && (
                    <div className="mt-4">
                        <h4 className="font-semibold">{forecast.title}</h4>
                        <p className="text-sm">{forecast.summary}</p>
                        <p className="text-sm mt-2"><strong>Expected Income:</strong> {forecast.expectedIncome}</p>
                        <div className="mt-4">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={forecast.chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#8884d8" name="Income" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
