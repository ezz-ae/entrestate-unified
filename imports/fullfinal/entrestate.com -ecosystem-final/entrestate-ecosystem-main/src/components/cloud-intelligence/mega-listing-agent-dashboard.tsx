
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const apiCallData = [
    { name: 'Jan', calls: 4000 },
    { name: 'Feb', calls: 3000 },
    { name: 'Mar', calls: 2000 },
    { name: 'Apr', calls: 2780 },
    { name: 'May', calls: 1890 },
    { name: 'Jun', calls: 2390 },
    { name: 'Jul', calls: 3490 },
];

export function MegaListingAgentDashboard() {
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Mega Listing (Market Data API)</CardTitle>
                <CardDescription>Access and manage the live market data that powers the entire ecosystem.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="api-keys">
                    <TabsList>
                        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                        <TabsTrigger value="documentation">Documentation</TabsTrigger>
                        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                    </TabsList>
                    <TabsContent value="api-keys">
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="api-key">Your API Key</Label>
                                <Input id="api-key" value="********************" readOnly />
                            </div>
                            <Button>Generate New Key</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="documentation">
                        <div className="mt-4">
                            <p>Read our comprehensive documentation to learn how to use the Market Data API.</p>
                            <Button variant="outline" className="mt-2">View Documentation</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="monitoring">
                        <div className="mt-4">
                            <h4 className="font-semibold">API Call Statistics</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={apiCallData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="calls" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
