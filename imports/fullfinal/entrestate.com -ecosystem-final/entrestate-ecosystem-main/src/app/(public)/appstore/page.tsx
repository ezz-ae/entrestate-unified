
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { useEffect, useState } from "react";
import { generateSuiteDescription } from "@/ai/flows/marketplace/generate-suite-description";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const suites = [
    { id: "lead-intelligence", name: "Lead Intelligence Suite", activated: true, category: "CRM" },
    { id: "listing-intelligence", name: "Listing Intelligence Dashboard", activated: true, category: "Listings" },
    { id: "meta-intelligence", name: "Meta Intelligence Suite", activated: true, category: "Marketing" },
    { id: "creative-intelligence", name: "Creative Intelligence Suite", activated: false, category: "Creative" },
    { id: "super-seller-suite", name: "SuperSellerSuite", activated: false, category: "Sales" },
    { id: "cloud-intelligence", name: "Cloud Intelligence Suite", activated: false, category: "Development" },
];

export default function AppstorePage() {
    const [suiteDetails, setSuiteDetails] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDescriptions = async () => {
            setLoading(true);
            const details: any = {};
            for (const suite of suites) {
                try {
                    const description = await generateSuiteDescription({
                        suiteName: suite.name,
                        market: { name: "Dubai" },
                    });
                    details[suite.id] = description;
                } catch (error) {
                    console.error(`Error fetching description for ${suite.name}:`, error);
                    details[suite.id] = null;
                }
            }
            setSuiteDetails(details);
            setLoading(false);
        };

        fetchDescriptions();
    }, []);
    
    const SuiteCard = ({ suite }: { suite: any }) => {
        const details = suiteDetails[suite.id];
        if (!details) return <SuiteCardSkeleton />;
        
        return (
             <Card key={suite.id} className="flex flex-col justify-between overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                        <Sparkles className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                        <span className="truncate">{suite.name}</span>
                    </CardTitle>
                    <CardDescription className="pt-2 h-12">{details.tagline}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                     <div className="space-y-4">
                        <p className="text-sm text-muted-foreground h-24 overflow-hidden">{details.description}</p>
                        <Card className="bg-muted/50 p-3 border">
                            <p className="text-sm font-semibold text-foreground">Market Edge:</p>
                            <p className="text-sm text-muted-foreground h-16 overflow-hidden">{details.marketContext}</p>
                        </Card>
                    </div>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2">
                    <Button className="w-full" disabled={suite.activated}>
                        {suite.activated ? <><CheckCircle className="h-5 w-5 mr-2" /> Activated</> : 'Activate Suite'}
                    </Button>
                    <Link href={`/solutions/${suite.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        );
    };

    const SuiteCardSkeleton = () => (
        <Card className="flex flex-col">
            <CardHeader><Skeleton className="h-6 w-3/4 mb-2" /><Skeleton className="h-4 w-1/2" /></CardHeader>
            <CardContent className="flex-grow space-y-4"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /></CardContent>
            <CardFooter className="flex-col items-start gap-2"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></CardFooter>
        </Card>
    );

    return (
        <div className="bg-background min-h-screen">
            <main>
                <PageHeader
                    title="Entrestate Appstore"
                    description="Activate the AI-powered suites you need to build your real estate empire."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <Tabs defaultValue="all">
                        <TabsList className="mb-6">
                            <TabsTrigger value="all">All Suites</TabsTrigger>
                            <TabsTrigger value="crm">CRM</TabsTrigger>
                            <TabsTrigger value="listings">Listings</TabsTrigger>
                            <TabsTrigger value="marketing">Marketing</TabsTrigger>
                            <TabsTrigger value="creative">Creative</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="development">Development</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="all">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {loading ? suites.map(s => <SuiteCardSkeleton key={s.id} />) : suites.map(suite => <SuiteCard key={suite.id} suite={suite} />)}
                            </div>
                        </TabsContent>
                         {["crm", "listings", "marketing", "creative", "sales", "development"].map(category => (
                            <TabsContent key={category} value={category}>
                                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {loading ? suites.filter(s => s.category.toLowerCase() === category).map(s => <SuiteCardSkeleton key={s.id} />) : suites.filter(s => s.category.toLowerCase() === category).map(suite => <SuiteCard key={suite.id} suite={suite} />)}
                                </div>
                            </TabsContent>
                         ))}
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
