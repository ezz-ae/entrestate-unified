
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function LandingPageBuilder() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>AI-Powered Landing Page Builder</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">
                    Create beautiful, high-converting landing pages with our AI-powered builder.
                </p>
                <Button>Launch Builder</Button>
            </CardContent>
        </Card>
    );
}
