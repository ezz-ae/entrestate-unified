
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AIBrandCreator } from '../creative-hub/ai-brand-creator';
import { useRouter } from 'next/navigation';

export function OnboardingFlow() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    
    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const nextStep = () => setStep(s => s + 1);
    const finishOnboarding = () => {
        // Here you would save all the user data to Firestore
        router.push('/me/ei-os');
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <Progress value={progress} className="mb-8" />
            
            {step === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome to the Entrestate OS</CardTitle>
                        <CardDescription>Let's get your intelligent workspace set up in a few quick steps.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <div className="space-y-2">
                             <Label htmlFor="name">What should we call you?</Label>
                             <Input id="name" placeholder="e.g., John Doe" />
                        </div>
                        <Button onClick={nextStep} className="mt-6">Next</Button>
                    </CardContent>
                </Card>
            )}

            {step === 2 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Create Your AI Brand</CardTitle>
                        <CardDescription>Upload your company logo and let Gemini generate a complete brand kit for you. This will be used to automatically style all your creative assets.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <AIBrandCreator />
                        <Button onClick={nextStep} className="mt-6">Next</Button>
                    </CardContent>
                </Card>
            )}

            {step === 3 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>Connect Your Business Tools</CardTitle>
                        <CardDescription>Integrate your essential accounts to unlock the full power of automation.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex justify-between items-center p-3 border rounded-md">
                            <Label>WhatsApp Business API</Label>
                            <Button variant="outline">Connect</Button>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-md">
                            <Label>Meta Business Suite</Label>
                            <Button variant="outline">Connect</Button>
                        </div>
                        <Button onClick={nextStep} className="mt-6">Skip for Now</Button>
                    </CardContent>
                </Card>
            )}

            {step === 4 && (
                 <Card>
                    <CardHeader>
                        <CardTitle>You're All Set!</CardTitle>
                        <CardDescription>Your EI-OS is configured and ready. Welcome to the future of real estate.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Button onClick={finishOnboarding} className="w-full" size="lg">Enter Your Intelligence OS</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
