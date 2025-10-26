
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const usageData = [
    { name: 'Jan', queries: 4000 },
    { name: 'Feb', queries: 3000 },
    { name: 'Mar', queries: 2000 },
    { name: 'Apr', queries: 2780 },
    { name: 'May', queries: 1890 },
    { name: 'Jun', queries: 2390 },
    { name: 'Jul', queries: 3490 },
];

export function SearchAgentDashboard() {
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Search Agent</CardTitle>
                <CardDescription>Deploy, manage, and monitor your AI-powered search agent.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="deployment">
                    <TabsList>
                        <TabsTrigger value="deployment">Deployment</TabsTrigger>
                        <TabsTrigger value="connectivity">Connectivity</TabsTrigger>
                        <TabsTrigger value="learning">Learning</TabsTrigger>
                        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                    </TabsList>
                    <TabsContent value="deployment">
                        <div className="space-y-4 mt-4">
                            <div className="flex items-center space-x-4">
                                <Label htmlFor="agent-status">Agent Status</Label>
                                <Switch id="agent-status" />
                                <span>Inactive</span>
                            </div>
                            <Button>Deploy Agent</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="connectivity">
                        <div className="space-y-4 mt-4">
                            <div>
                                <Label htmlFor="api-key">API Key</Label>
                                <Input id="api-key" value="********************" readOnly />
                            </div>
                            <div>
                                <Label htmlFor="api-endpoint">API Endpoint</Label>
                                <Input id="api-endpoint" value="https://api.entrestate.com/v1/search" readOnly />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="learning">
                        <div className="space-y-4 mt-4">
                            <p>Upload documents to train your search agent.</p>
                            <Input type="file" multiple />
                            <Button>Upload & Train</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="monitoring">
                        <div className="mt-4">
                            <h4 className="font-semibold">Usage Statistics</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={usageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="queries" stroke="#8884d8" name="Queries" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
