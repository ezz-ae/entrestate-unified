
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function ListingAutomizer({ project, content }: { project: any, content: any }) {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAutomateListings = async () => {
        setLoading(true);
        setStatus('Automating listings...');
        try {
            // In a real application, you would use the Bayut and Property Finder
            // APIs to post the listings. For now, we will just simulate the
            // process.
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStatus('Successfully automated 5 listings on Bayut and Property Finder.');
        } catch (error) {
            console.error("Error automating listings:", error);
            setStatus('Error automating listings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Listing Automizer</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={handleAutomateListings} disabled={loading || !project || !content}>
                    {loading ? 'Automating...' : 'Automate 5 Listings'}
                </Button>
                {status && (
                    <p className="mt-2 text-sm text-muted-foreground">{status}</p>
                )}
            </CardContent>
        </Card>
    );
}
