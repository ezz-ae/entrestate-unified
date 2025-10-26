
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    // This data would be loaded from the user's profile in Firestore
    const brandKit = {
        colors: { primary: '#0052CC', secondary: '#F0F2F5', accent: '#FFAB00' },
        fonts: { heading: 'Poppins', body: 'Inter' },
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Account Settings"
                description="Manage your profile, brand identity, and integrations."
            />
            <main className="mt-6 grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold">Profile</h2>
                    <p className="text-sm text-muted-foreground">Update your personal information and password.</p>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-1">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="John Doe" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="john.doe@example.com" />
                            </div>
                            <Button>Update Profile</Button>
                        </CardContent>
                    </Card>
                </div>

                <Separator className="md:col-span-3" />

                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold">AI-Generated Brand Kit</h2>
                    <p className="text-sm text-muted-foreground">Your brand identity, automatically applied to all creative assets.</p>
                </div>
                 <div className="md:col-span-2">
                    <Card>
                        <CardContent className="pt-6">
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm">Color Palette</h4>
                                    <div className="flex gap-2 mt-2">
                                        <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.primary }}></div>
                                        <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.secondary }}></div>
                                        <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.accent }}></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">Typography</h4>
                                    <p className="text-lg" style={{ fontFamily: `'${brandKit.fonts.heading}', sans-serif` }}>{brandKit.fonts.heading}</p>
                                    <p style={{ fontFamily: `'${brandKit.fonts.body}', sans-serif` }}>{brandKit.fonts.body}</p>
                                </div>
                            </div>
                             <Button variant="outline" className="mt-4">Re-generate with AI</Button>
                        </CardContent>
                    </Card>
                </div>
                
                <Separator className="md:col-span-3" />

                 <div className="md:col-span-1">
                    <h2 className="text-xl font-bold">Integrations</h2>
                    <p className="text-sm text-muted-foreground">Connect your external accounts.</p>
                </div>
                 <div className="md:col-span-2">
                     <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <span>WhatsApp Cloud API</span>
                                <Button variant="secondary">Connect</Button>
                            </div>
                             <Separator className="my-4" />
                             <div className="flex justify-between items-center">
                                <span>Meta Business Suite</span>
                                <Button variant="secondary">Connect</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
