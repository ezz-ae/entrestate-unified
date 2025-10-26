
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// In a real app, this would be filtered based on the user's subscription tier
const suites = [
    { id: "lead-intelligence", name: "Lead Intelligence Suite", description: "Your AI Co-pilot for converting leads into deals.", active: true },
    { id: "listing-intelligence", name: "Listing Intelligence Dashboard", description: "Your AI Co-pilot for optimizing your property listings.", active: true },
    { id: "meta-intelligence", name: "Meta Intelligence Suite", description: "Your AI Co-pilot for creating and managing ad campaigns.", active: true },
    { id: "creative-intelligence", name: "Creative Intelligence Suite", description: "Your AI Co-pilot for generating marketing assets.", active: false },
    { id: "super-seller-suite", name: "SuperSellerSuite", description: "Your AI Co-pilot for closing deals.", active: false },
    { id: "cloud-intelligence", name: "Cloud Intelligence Suite", description: "Your AI Co-pilot for building custom solutions.", active: false },
];

export default function AppstorePage() {
    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Appstore"
                description="Activate and manage the suites included in your subscription plan."
            />
            <main className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suites.map(suite => (
                    <Card key={suite.id} className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                {suite.name}
                            </CardTitle>
                            <CardDescription>{suite.description}</CardDescription>
                        </CardHeader>
                         <CardContent className="flex-grow">
                            <Link href={`/solutions/${suite.id}`}>
                                <Button variant="link" className="p-0">
                                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                        <CardFooter>
                            <div className="flex items-center space-x-2">
                                <Switch id={`suite-${suite.id}`} checked={suite.active} />
                                <Label htmlFor={`suite-${suite.id}`}>{suite.active ? "Activated" : "Activate"}</Label>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </main>
        </div>
    );
}
