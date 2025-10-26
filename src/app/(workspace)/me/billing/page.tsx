
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Zap, CreditCard } from "lucide-react";

export default function BillingPage() {
    // This data would be loaded from the user's profile and billing provider
    const subscription = {
        tier: "Pro Tier",
        price: "$99/month",
        status: "Active",
    };

    const adWallet = {
        balance: 250.75,
    };

    const usage = {
        tokens: 1_250_000,
        quota: 5_000_000,
        percentage: 25,
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Billing & Subscriptions"
                description="Manage your subscription, ad credits, and AI usage."
            />
            <main className="mt-6 grid gap-8 md:grid-cols-12">
                <div className="md:col-span-8 space-y-8">
                    {/* Subscription Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>My Subscription</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">{subscription.tier}</h3>
                                <p className="text-muted-foreground">{subscription.price}</p>
                                <Badge className="mt-2" variant={subscription.status === "Active" ? "default" : "destructive"}>
                                    {subscription.status}
                                </Badge>
                            </div>
                            <Button variant="outline">Manage Subscription</Button>
                        </CardContent>
                    </Card>
                    
                    {/* AI Usage Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" /> AI Usage Meter (This Month)
                            </CardTitle>
                            <CardDescription>Your "electricity bill" for heavy AI tasks. Your plan includes a generous free quota.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={usage.percentage} className="mb-2" />
                            <p className="text-sm text-muted-foreground">
                                You have used **{usage.tokens.toLocaleString()} / {usage.quota.toLocaleString()}** tokens.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-4">
                    {/* Ad Wallet Card */}
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" /> Ad Credit Wallet
                            </CardTitle>
                            <CardDescription>Pre-load funds for your Meta and Google ad campaigns.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold tracking-tight">
                                ${adWallet.balance.toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">Available Balance</p>
                            <Button className="w-full mt-4">
                                <DollarSign className="mr-2 h-4 w-4" /> Add Funds
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
