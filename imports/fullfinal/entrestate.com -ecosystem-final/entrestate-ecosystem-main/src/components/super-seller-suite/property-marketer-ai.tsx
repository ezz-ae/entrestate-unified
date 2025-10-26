
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateMarketingKit } from "@/ai/flows/super-seller-suite/generate-marketing-kit";
import { useState } from "react";
import Image from "next/image";

export function PropertyMarketerAI() {
    const [projectId, setProjectId] = useState('');
    const [marketingKit, setMarketingKit] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const result = await generateMarketingKit({
                projectId,
                market: { name: 'Dubai' },
            });
            setMarketingKit(result);
        } catch (error) {
            console.error("Error generating marketing kit:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Property Marketer AI</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="Enter a project ID..."
                    />
                    <Button onClick={handleGenerate} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Marketing Kit'}
                    </Button>
                </div>
                {marketingKit && (
                    <div className="mt-4">
                        <h4 className="font-semibold">Your Marketing Kit is Ready!</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <div>
                                <h5 className="font-semibold">Brochure</h5>
                                <Image src={marketingKit.brochure} alt="Brochure" width={200} height={280} />
                            </div>
                            <div>
                                <h5 className="font-semibold">Landing Page</h5>
                                <Image src={marketingKit.landingPage} alt="Landing Page" width={200} height={280} />
                            </div>
                            <div>
                                <h5 className="font-semibold">Social Media Campaign</h5>
                                {marketingKit.socialMediaCampaign.posts.map((post: any, index: number) => (
                                    <div key={index} className="mt-2 p-2 border rounded">
                                        <p className="text-sm"><strong>{post.day}:</strong> {post.postContent}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
