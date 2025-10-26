
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PricingCardProps {
    suiteName: string;
    price: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    ctaText?: string;
    ctaHref?: string;
}

export function PricingCard({
    suiteName,
    price,
    description,
    features,
    isPopular = false,
    ctaText = 'Subscribe Now',
    ctaHref = '/me'
}: PricingCardProps) {
    return (
        <Card className={`flex flex-col h-full ${isPopular ? 'border-primary shadow-lg' : ''}`}>
            {isPopular && (
                <Badge className="absolute -top-3 right-4">POPULAR</Badge>
            )}
            <CardHeader>
                <CardTitle className="text-2xl">{suiteName}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="mb-6">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link href={ctaHref} className="w-full">
                    <Button className="w-full" variant={isPopular ? 'default' : 'outline'}>
                        {ctaText}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
