
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const conversationData = [
    { name: 'Jan', conversations: 2400 },
    { name: 'Feb', conversations: 1398 },
    { name: 'Mar', conversations: 9800 },
    { name: 'Apr', conversations: 3908 },
    { name: 'May', conversations: 4800 },
    { name: 'Jun', conversations: 3800 },
    { name: 'Jul', conversations: 4300 },
];

export function ChatAgentDashboard() {
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Chat Agent</CardTitle>
                <CardDescription>Deploy, manage, and monitor your AI-powered chat agent.</CardDescription>
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
                                <Label htmlFor="widget-script">Widget Script</Label>
                                <Input id="widget-script" value="<script src='https://cdn.entrestate.com/chat-widget.js'></script>" readOnly />
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="learning">
                        <div className="space-y-4 mt-4">
                            <p>Provide a URL to your FAQ page to train your chat agent.</p>
                            <Input type="url" placeholder="https://your-website.com/faq" />
                            <Button>Train Agent</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="monitoring">
                        <div className="mt-4">
                            <h4 className="font-semibold">Conversation Statistics</h4>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={conversationData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="conversations" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
