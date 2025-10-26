
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { suites } from '@/lib/tools-data'; // Using the centralized data source
import React from "react";

export default function AppstorePage() {
    // In a real app, this 'active' status would come from the user's profile
    const [activatedSuites, setActivatedSuites] = React.useState(["lead-intelligence", "listing-intelligence", "meta-intelligence"]);

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
                                {React.cloneElement(suite.icon as React.ReactElement, { className: 'h-6 w-6 text-primary' })}
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
                                <Switch id={`suite-${suite.id}`} checked={activatedSuites.includes(suite.id)} />
                                <Label htmlFor={`suite-${suite.id}`}>{activatedSuites.includes(suite.id) ? "Activated" : "Activate"}</Label>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </main>
        </div>
    );
}
