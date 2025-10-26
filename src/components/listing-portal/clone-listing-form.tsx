
'use client';

import { useState } from 'react';
import { cloneListing } from '@/ai/flows/listing-crm/clone-listing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CloneListingForm() {
    const [url, setUrl] = useState('');
    const [refine, setRefine] = useState(false);
    const [listing, setListing] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setListing(null);

        try {
            const result = await cloneListing({
                url,
                refine,
                market: { name: 'Dubai' },
            });
            setListing(result);
        } catch (error) {
            console.error('Error cloning listing:', error);
            // Handle the error appropriately in the UI
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Clone a Listing</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter a Bayut or Property Finder URL"
                        className="mb-2"
                    />
                    <div className="flex items-center mb-4">
                        <Checkbox id="refine" checked={refine} onCheckedChange={(checked) => setRefine(Boolean(checked))} />
                        <label htmlFor="refine" className="ml-2">
                            Refine with AI
                        </label>
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Cloning...' : 'Clone Listing'}
                    </Button>
                </form>

                {listing && (
                    <div className="mt-4">
                        <h3 className="font-bold">{listing.title}</h3>
                        <p>{listing.description}</p>
                        <div className="mt-2">
                            {listing.keywords.map((keyword: string) => (
                                <span key={keyword} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
