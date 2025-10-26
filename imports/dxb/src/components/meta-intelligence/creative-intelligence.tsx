
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateAdFromBrochure } from "@/ai/flows/meta-pilot/generate-ad-from-brochure";
import { useState } from "react";
import Image from "next/image";

export function CreativeIntelligence({ onCreativeSelect }: { onCreativeSelect: (creative: any) => void }) {
    const [projectName, setProjectName] = useState('');
    const [focusArea, setFocusArea] = useState('');
    const [toneOfVoice, setToneOfVoice] = useState('');
    const [creative, setCreative] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateCreative = async () => {
        setLoading(true);
        try {
            const result = await generateAdFromBrochure({
                projectName,
                focusArea,
                toneOfVoice,
                // The market analysis will be passed in from the main page
            });
            setCreative(result);
        } catch (error) {
            console.error("Error generating ad creative:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>3. Generate Ad Creative</CardTitle>
                <CardDescription>Let our AI generate compelling, data-driven ad creative that is optimized for your target audience.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Textarea value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" />
                    <Textarea value={focusArea} onChange={(e) => setFocusArea(e.target.value)} placeholder="Focus Area (e.g., luxury, family-friendly)" />
                    <Textarea value={toneOfVoice} onChange={(e) => setToneOfVoice(e.target.value)} placeholder="Tone of Voice (e.g., professional, friendly)" />
                    <Button onClick={handleGenerateCreative} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate AI Ad Creative'}
                    </Button>
                </div>

                {creative && (
                    <div className="mt-4">
                        <h4 className="font-semibold">AI-Generated Ad Creative</h4>
                        <div className="mt-2 p-2 border rounded">
                            <p className="text-sm"><strong>Ad Copy:</strong> {creative.adCopy}</p>
                            <div className="mt-2">
                                <h5 className="font-semibold">Ad Design</h5>
                                <Image src={creative.adDesign} alt="Ad Design" width={200} height={200} />
                            </div>
                            <div className="mt-2">
                                <h5 className="font-semibold">Landing Page</h5>
                                <Image src={creative.landingPage} alt="Landing Page" width={200} height={200} />
                            </div>
                        </div>
                    </div>
                )}
                
                <Button 
                    className="mt-4" 
                    disabled={!creative}
                    onClick={() => onCreativeSelect(creative)}
                >
                    Next
                </Button>
            </CardContent>
        </Card>
    );
}
