
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const listings = [
    { id: 'PF-123', name: 'Luxury Villa in Palm Jumeirah', performance: 'down', score: 68, issue: "Photos are low quality.", recommendation: "Replace photos with high-resolution images." },
    { id: 'BAYUT-456', name: 'Modern Apartment in Downtown', performance: 'up', score: 92, issue: "N/A", recommendation: "Promote on social media to maximize reach." },
    { id: 'DXB-789', name: 'Spacious Townhouse in Arabian Ranches', performance: 'down', score: 75, issue: "Missing virtual tour.", recommendation: "Add a 3D virtual tour to improve engagement." },
];

export function ListingOptimizer() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>AI-Powered Listing Optimizer</CardTitle>
                <CardDescription>Your underperforming listings, analyzed and prioritized by Gemini.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {listings.map(listing => (
                        <div key={listing.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="font-semibold">{listing.name}</p>
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-destructive">Issue:</span> {listing.issue}</p>
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-green-600">Recommendation:</span> {listing.recommendation}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end">
                                    {listing.performance === 'up' ? <ArrowUp className="h-5 w-5 text-green-500" /> : <ArrowDown className="h-5 w-5 text-red-500" />}
                                    <p className="text-2xl font-bold ml-2">{listing.score}</p>
                                </div>
                                <p className="text-xs text-muted-foreground">Quality Score</p>
                                <Button size="sm" variant="outline" className="mt-2">
                                    Optimize Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
