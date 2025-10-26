
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyListing } from "@/ai/flows/listing-crm/verify-listing";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function ListingVerifier() {
    const [listingId, setListingId] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [verification, setVerification] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        try {
            const result = await verifyListing({
                listingId,
                imageUrl,
                price: parseFloat(price),
            });
            setVerification(result);
        } catch (error) {
            console.error("Error verifying listing:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Listing Verifier</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Input value={listingId} onChange={(e) => setListingId(e.target.value)} placeholder="Listing ID" />
                    <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    <Button onClick={handleVerify} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Listing'}
                    </Button>
                </div>
                {verification && (
                    <div className="mt-4">
                        <div className="flex space-x-4">
                            <Badge variant={verification.isDuplicate ? "destructive" : "default"}>
                                {verification.isDuplicate ? 'Duplicate' : 'Original'}
                            </Badge>
                            <Badge variant={verification.isFalsePricing ? "destructive" : "default"}>
                                {verification.isFalsePricing ? 'False Pricing' : 'Fair Price'}
                            </Badge>
                            <Badge>Quality Score: {verification.qualityScore}</Badge>
                        </div>
                        <ul className="list-disc pl-5 mt-2">
                            {verification.recommendations.map((rec: string, index: number) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
