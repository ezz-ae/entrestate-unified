
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateListing } from "@/ai/flows/listing-crm/generate-listing";
import { useState } from "react";

export function ContentIdeation({ project }: { project: any }) {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateContent = async () => {
        setLoading(true);
        try {
            const result = await generateListing({
                platform: 'Bayut',
                propertyAddress: `${project.name}, ${project.area}, ${project.city}`,
                keyDetails: '2 beds, 2 baths, 1200 sqft',
                uniqueFeatures: 'Burj Khalifa view, high floor, fully furnished',
                tone: 'Luxury',
                market: { name: 'Dubai' },
            });
            setContent(result);
        } catch (error) {
            console.error("Error generating content:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Ideation</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGenerateContent} disabled={loading || !project}>
                    {loading ? 'Generating...' : 'Generate Content Ideas'}
                </Button>
                {content && (
                    <div className="mt-4">
                        <h4 className="font-semibold">{content.title}</h4>
                        <p className="text-sm text-muted-foreground">{content.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
