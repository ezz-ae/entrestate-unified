
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { suites } from '@/lib/tools-data';

export default function SolutionsPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Our Solutions"
                    description="An overview of all the suites and verticals that the Entrestate OS has to offer."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {suites.map(suite => (
                            <Card key={suite.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-start gap-2">
                                        {suite.icon}
                                        <span>{suite.name}</span>
                                    </CardTitle>
                                    <CardDescription>{suite.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow" />
                                <CardFooter>
                                    <Link href={`/solutions/${suite.id}`} className="w-full">
                                        <Button className="w-full">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </div>
            </main>
        </div>
    );
}
