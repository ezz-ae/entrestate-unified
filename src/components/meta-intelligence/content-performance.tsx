
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function ContentPerformance() {
    // This would be populated with real data from the Meta API
    const content = {
        topPerformingAd: {
            copy: 'Experience the height of luxury at the new Burj Khalifa residences.',
            image: '/placeholder-ad.png', // Placeholder image
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
                <h4 className="font-semibold">Top Performing Ad</h4>
                <p className="text-sm text-muted-foreground">{content.topPerformingAd.copy}</p>
                <div className="mt-2">
                    <Image src={content.topPerformingAd.image} alt="Top Performing Ad" width={200} height={200} />
                </div>
            </CardContent>
        </Card>
    );
}
