
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const objectives = [
    { id: 'lead-generation', title: 'Lead Generation', description: 'Collect leads for your real estate business.' },
    { id: 'brand-awareness', title: 'Brand Awareness', description: 'Increase the visibility of your brand.' },
    { id: 'website-traffic', title: 'Website Traffic', description: 'Drive traffic to your website or landing page.' },
    { id: 'property-showcase', title: 'Property Showcase', description: 'Showcase a specific property or development.' },
];

export function CampaignObjectives({ onObjectiveSelect }: { onObjectiveSelect: (objective: string) => void }) {
    const [selectedObjective, setSelectedObjective] = useState<string | null>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>1. Select Your Campaign Objective</CardTitle>
                <CardDescription>What is the primary goal of your campaign?</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {objectives.map((objective) => (
                        <Button
                            key={objective.id}
                            variant={selectedObjective === objective.id ? "default" : "outline"}
                            onClick={() => setSelectedObjective(objective.id)}
                            className="h-auto py-4"
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-semibold">{objective.title}</span>
                                <span className="text-sm text-muted-foreground text-left">{objective.description}</span>
                            </div>
                        </Button>
                    ))}
                </div>
                <Button 
                    className="mt-4" 
                    disabled={!selectedObjective}
                    onClick={() => onObjectiveSelect(selectedObjective!)}
                >
                    Next
                </Button>
            </CardContent>
        </Card>
    );
}
