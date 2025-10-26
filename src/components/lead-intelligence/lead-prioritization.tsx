
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leads = [
    { name: 'John Doe', image: 'https://i.pravatar.cc/150?u=a', score: 92, tags: ['High-Intent', 'Investor'], summary: "Searched for 'luxury villas' 5 times this week." },
    { name: 'Jane Smith', image: 'https://i.pravatar.cc/150?u=b', score: 88, tags: ['Ready-to-Buy', 'Local'], summary: "Recently viewed 3 properties in Downtown Dubai." },
    { name: 'Alex Johnson', image: 'https://i.pravatar.cc/150?u=c', score: 75, tags: ['Researching'], summary: "Downloaded a market report on rental yields." },
];

export function LeadPrioritization() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>AI-Prioritized Leads</CardTitle>
                <CardDescription>Your highest-potential leads, scored and sorted by Gemini.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {leads.map(lead => (
                        <div key={lead.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={lead.image} />
                                    <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{lead.name}</p>
                                    <p className="text-sm text-muted-foreground">{lead.summary}</p>
                                    <div className="flex gap-2 mt-1">
                                        {lead.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">{lead.score}</p>
                                <p className="text-xs text-muted-foreground">Lead Score</p>
                                <Button size="sm" variant="outline" className="mt-2">
                                    Run Sales Pilot
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
