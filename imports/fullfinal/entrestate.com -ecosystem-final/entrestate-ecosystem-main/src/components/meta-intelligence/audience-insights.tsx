
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AudienceInsights() {
    // This would be populated with real data from the Meta API
    const audience = {
        name: 'High-Net-Worth Investors',
        demographics: 'Ages 35-55, located in Dubai, London, and Singapore',
        interests: ['Luxury Real Estate', 'Investment', 'Finance'],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold">{audience.name}</h4>
                <p className="text-sm text-muted-foreground">{audience.demographics}</p>
                <div className="mt-2">
                    {audience.interests.map((interest) => (
                        <Badge key={interest} className="mr-2">{interest}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
