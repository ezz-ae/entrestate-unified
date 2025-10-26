
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { pricingTiers } from '@/lib/tools-data';

export default function MarketplacePage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Pricing & Plans"
                    description="Choose the plan that's right for your business. Unlock the power of the Entrestate OS."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {pricingTiers.map(tier => (
                            <Card key={tier.name} className={`flex flex-col ${tier.name === 'Agency' ? 'border-primary shadow-lg ring-2 ring-primary' : ''}`}>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                                    <CardDescription>{tier.description}</CardDescription>
                                    <p className="text-5xl font-bold pt-4">{tier.price} <span className="text-lg font-normal text-muted-foreground">{tier.name !== "Enterprise" && "/ month"}</span></p>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {tier.features.map(feature => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" size="lg" variant={tier.name === 'Agency' ? 'default' : 'outline'}>
                                        {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </div>
            </main>
        </div>
    );
}
