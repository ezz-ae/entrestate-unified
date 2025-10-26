
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { generateBrandKit, GenerateBrandKitOutput } from "@/ai/flows/creative-hub/generate-brand-kit";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function AIBrandCreator() {
    const [logo, setLogo] = useState<File | null>(null);
    const [brandKit, setBrandKit] = useState<GenerateBrandKitOutput | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setLogo(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!logo) {
            toast({ title: "Please upload a logo.", variant: "destructive" });
            return;
        }
        setLoading(true);
        setBrandKit(null);

        const reader = new FileReader();
        reader.readAsDataURL(logo);
        reader.onload = async () => {
            try {
                const logoDataUri = reader.result as string;
                const result = await generateBrandKit({ logoDataUri });
                setBrandKit(result);
                toast({ title: "Brand Kit Generated!", description: "Your new brand identity is ready." });
            } catch (error: any) {
                console.error("Error generating brand kit:", error);
                toast({ title: "Generation Failed", description: error.message, variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };
    };

    const BrandKitDisplay = () => (
        brandKit ? (
            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Your New Brand Kit</h3>
                <p className="text-sm text-muted-foreground">{brandKit.style_description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-sm">Color Palette</h4>
                        <div className="flex gap-2 mt-2">
                            <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.primary }} title={`Primary: ${brandKit.colors.primary}`}></div>
                            <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.secondary }} title={`Secondary: ${brandKit.colors.secondary}`}></div>
                            <div className="w-10 h-10 rounded" style={{ backgroundColor: brandKit.colors.accent }} title={`Accent: ${brandKit.colors.accent}`}></div>
                            <div className="w-10 h-10 rounded border" style={{ backgroundColor: brandKit.colors.neutral }} title={`Neutral: ${brandKit.colors.neutral}`}></div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Typography</h4>
                        <div className="mt-2">
                            <p className="text-xl" style={{ fontFamily: `'${brandKit.fonts.heading}', sans-serif` }}>Heading Font: {brandKit.fonts.heading}</p>
                            <p style={{ fontFamily: `'${brandKit.fonts.body}', sans-serif` }}>Body Font: {brandKit.fonts.body}</p>
                        </div>
                    </div>
                </div>
                 <Button className="mt-4">Save to Profile</Button>
            </div>
        ) : null
    );

    const LoadingSkeleton = () => (
         <div className="mt-6 space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Skeleton className="h-5 w-1/4 mb-2" />
                    <div className="flex gap-2 mt-2">
                        <Skeleton className="w-10 h-10 rounded" />
                        <Skeleton className="w-10 h-10 rounded" />
                        <Skeleton className="w-10 h-10 rounded" />
                        <Skeleton className="w-10 h-10 rounded" />
                    </div>
                </div>
                <div>
                     <Skeleton className="h-5 w-1/4 mb-2" />
                     <Skeleton className="h-6 w-3/4 mt-2" />
                     <Skeleton className="h-4 w-1/2 mt-1" />
                </div>
            </div>
            <Skeleton className="h-10 w-28 mt-4" />
        </div>
    );

    return (
        <Card className="col-span-full">
            <CardHeader>
                <CardTitle>AI Brand Creator</CardTitle>
                <CardDescription>Upload your logo to instantly generate a complete brand kit. Gemini will analyze your logo and create a consistent visual identity for all your marketing assets.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    <Button onClick={handleGenerate} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Kit'}
                    </Button>
                </div>
                {loading ? <LoadingSkeleton /> : <BrandKitDisplay />}
            </CardContent>
        </Card>
    );
}
