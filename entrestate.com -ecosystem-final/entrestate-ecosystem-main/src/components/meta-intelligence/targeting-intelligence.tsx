
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { suggestTargetingOptions } from "@/ai/flows/meta-pilot/suggest-targeting-options";
import { useState } from "react";

export function TargetingIntelligence({ onTargetingSelect }: { onTargetingSelect: (targeting: any) => void }) {
    const [projectId, setProjectId] = useState('');
    const [targeting, setTargeting] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateTargeting = async () => {
        setLoading(true);
        try {
            const result = await suggestTargetingOptions({
                projectId,
                // The market analysis will be passed in from the main page
            });
            setTargeting(result);
        } catch (error) {
            console.error("Error generating targeting options:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>2. Define Your Target Audience</CardTitle>
                <CardDescription>Describe your ideal customer and let our AI generate a hyper-targeted audience profile for you.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="project-id">Project ID</Label>
                        <Input id="project-id" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="Enter a project ID to analyze past buyers" />
                    </div>
                    <Button onClick={handleGenerateTargeting} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate AI Targeting Profile'}
                    </Button>
                </div>

                {targeting && (
                    <div className="mt-4">
                        <h4 className="font-semibold">AI-Generated Targeting Profile</h4>
                        {targeting.strategies.map((strategy: any, index: number) => (
                            <div key={index} className="mt-2 p-2 border rounded">
                                <h5 className="font-semibold">{strategy.strategyName}</h5>
                                <p className="text-sm"><strong>Audience Type:</strong> {strategy.audienceType}</p>
                                <p className="text-sm"><strong>Demographics:</strong> {strategy.demographics}</p>
                                <p className="text-sm"><strong>Interests:</strong> {strategy.interests}</p>
                                <p className="text-sm"><strong>Keywords:</strong> {strategy.keywords}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                <Button 
                    className="mt-4" 
                    disabled={!targeting}
                    onClick={() => onTargetingSelect(targeting)}
                >
                    Next
                </Button>
            </CardContent>
        </Card>
    );
}
