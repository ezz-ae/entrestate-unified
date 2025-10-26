
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { generateSuiteDescription } from "@/ai/flows/marketplace/generate-suite-description";
import { Skeleton } from "@/components/ui/skeleton";

const suites: { [key: string]: { name: string } } = {
    "lead-intelligence": { name: "Lead Intelligence Suite" },
    "listing-intelligence": { name: "Listing Intelligence Dashboard" },
    "meta-intelligence": { name: "Meta Intelligence Suite" },
    "creative-intelligence": { name: "Creative Intelligence Suite" },
    "super-seller-suite": { name: "SuperSellerSuite" },
    "cloud-intelligence": { name: "Cloud Intelligence Suite" },
};

export default function SolutionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const suite = suites[slug];
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (suite) {
            const fetchDescription = async () => {
                setLoading(true);
                try {
                    const description = await generateSuiteDescription({
                        suiteName: suite.name,
                        market: { name: "Dubai" },
                    });
                    setDetails(description);
                } catch (error) {
                    console.error(`Error fetching description for ${suite.name}:`, error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDescription();
        }
    }, [suite]);

    if (!suite) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold">404 - Solution Not Found</h1>
                <p className="text-muted-foreground">The page you are looking for does not exist.</p>
                <Link href="/solutions">
                    <Button variant="outline" className="mt-4">Back to Solutions</Button>
                </Link>
            </div>
        );
    }
    
    const LoadingState = () => (
        <div className="container mx-auto px-4 md:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="md:col-span-1">
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title={suite.name}
                    description={loading ? <Skeleton className="h-6 w-1/2 mx-auto" /> : details?.tagline}
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                   {loading ? <LoadingState /> : details ? (
                       <div className="grid md:grid-cols-3 gap-8">
                           <div className="md:col-span-2">
                               <Card className="shadow-sm">
                                   <CardHeader>
                                       <CardTitle>The Power of {suite.name}</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-muted-foreground mb-6 leading-relaxed">{details.description}</p>
                                       <h3 className="font-bold text-lg mb-4">Key Features:</h3>
                                       <ul className="space-y-4">
                                           {details.features.map((feature: any) => (
                                               <li key={feature.name} className="flex items-start">
                                                   <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                   <div>
                                                       <span className="font-semibold">{feature.name}</span>
                                                       <p className="text-sm text-muted-foreground">{feature.description}</p>
                                                   </div>
                                               </li>
                                           ))}
                                       </ul>
                                   </CardContent>
                               </Card>
                           </div>
                           <div className="md:col-span-1">
                                <Card className="sticky top-24 bg-muted/30 border-dashed">
                                   <CardHeader>
                                       <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Your Market Edge</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-sm text-muted-foreground mb-6">{details.marketContext}</p>
                                       <Link href="/discover" className="w-full">
                                            <Button className="w-full" size="lg">
                                                Experience It Now <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                   </CardContent>
                               </Card>
                           </div>
                       </div>
                   ) : (
                       <p className="text-center text-destructive">Could not load details for this suite. Please refresh the page.</p>
                   )}
                </div>
            </main>
        </div>
    );
}
