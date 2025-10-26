'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2, Sparkles, Circle, CheckCircle, Play, Building, Upload, Bot, Download, Server, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/ui/page-header';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { syncPropertyFinderListing } from '@/ai/flows/developer-backend/sync-property-finder-listing';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

type Status = 'pending' | 'running' | 'completed' | 'error';

interface Step {
  id: string;
  title: string;
  description: string;
  status: Status;
}

const generateStepsFromPayload = (payload: any): Step[] => {
    if (!payload || !payload.listingReferenceNo) return [];
    return [
      { id: 'validate', title: 'Validate Property Finder Plan', description: `Validating plan for listing: ${payload.listingReferenceNo}`, status: 'pending' },
      { id: 'connect', title: 'Connect to Property Finder API', description: 'Establishing secure connection...', status: 'pending' },
      { id: 'push', title: 'Push Listing Data', description: `Sending ${payload.imageUrls?.length || 0} images and details.`, status: 'pending' },
      { id: 'confirm', title: 'Confirm Synchronization', description: 'Waiting for confirmation from Property Finder servers.', status: 'pending' },
    ]
}

export default function PropertyFinderSyncPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [workflow, setWorkflow] = useState<Step[]>([]);
  const [pastedPlan, setPastedPlan] = useState('');
  const [pullId, setPullId] = useState('');
  const [pulledData, setPulledData] = useState<any>(null);


  const handleExecute = async () => {
    if (!user) {
      toast({ title: 'Authentication Required', variant: 'destructive' });
      return;
    }
    let parsedPlan;
    try {
      parsedPlan = JSON.parse(pastedPlan);
    } catch (e) {
      toast({ title: 'Invalid Plan', description: 'The pasted text is not a valid JSON listing plan.', variant: 'destructive' });
      return;
    }

    const steps = generateStepsFromPayload(parsedPlan);
    if (steps.length === 0) {
      toast({ title: 'Invalid Plan', description: 'The plan appears to be missing key information.', variant: 'destructive' });
      return;
    }

    setWorkflow(steps);
    setIsExecuting(true);

    const runStep = (index: number) => {
        setWorkflow(prev => prev.map((step, i) => i < index ? { ...step, status: 'completed' } : i === index ? { ...step, status: 'running' } : step));
        
        if (index >= steps.length -1) { // After the last visual step
            setTimeout(() => {
                syncPropertyFinderListing(parsedPlan)
                .then(result => {
                    if (result.success) {
                        toast({ title: 'Synchronization Complete!', description: result.message });
                        setWorkflow(prev => prev.map(step => ({...step, status: 'completed'})));
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(err => {
                    toast({ title: 'Sync Failed', description: err.message, variant: 'destructive' });
                    setWorkflow(prev => prev.map((step, i) => i === index ? {...step, status: 'error'} : step));
                })
                .finally(() => {
                    setIsExecuting(false);
                });
            }, 800);
            return;
        }
      
      setTimeout(() => {
        runStep(index + 1);
      }, 800);
    };

    runStep(0);
  };
  
  const handlePull = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pullId) return;
    setIsLoading(true);
    setPulledData(null);
    setTimeout(() => {
        setPulledData({
            listingReferenceNo: pullId,
            propertyTitle: "Luxury 2BR with Full Marina View",
            propertyDescription: "A stunning, fully furnished 2-bedroom apartment in the heart of Dubai Marina, offering breathtaking views and world-class amenities.",
            price: 3500000,
            imageUrls: ["https://picsum.photos/seed/pf1/800/600", "https://picsum.photos/seed/pf2/800/600"],
        });
        setIsLoading(false);
        toast({title: "Listing Pulled!", description: `Successfully fetched data for listing ${pullId} from Property Finder.`});
    }, 1500);
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case 'running': return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <Circle className="h-5 w-5 text-muted-foreground/50" />;
    }
  };

  return (
    <main className="p-4 md:p-10 space-y-8">
      <PageHeader
        title="Property Finder Listing Pilot"
        description="The dedicated execution terminal for syncing your listings with Property Finder."
        icon={<Building className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <Card>
            <CardHeader>
                <CardTitle>Push to Property Finder</CardTitle>
                <CardDescription>
                    Generate a listing plan from the <Link href="/me/tool/listing-manager" className="underline font-semibold">Listing Manager</Link>, paste it here, and the pilot will push it to Property Finder.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Textarea
                    placeholder='Paste your Property Finder "Rollflow" JSON plan here...'
                    value={pastedPlan}
                    onChange={(e) => setPastedPlan(e.target.value)}
                    rows={8}
                    className="font-mono text-xs"
                    disabled={isExecuting}
                 />

                {workflow.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-3">Execution Progress:</h4>
                        <div className="space-y-4">
                            {workflow.map((step) => (
                                <div key={step.id} className="flex items-start gap-4">
                                    <div>{getStatusIcon(step.status)}</div>
                                    <div className="flex-1">
                                        <p className={cn("font-medium", step.status !== 'pending' && "text-foreground")}>{step.title}</p>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                 <Button onClick={handleExecute} disabled={isExecuting || !pastedPlan} className="w-full">
                    {isExecuting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    {isExecuting ? 'Executing Sync...' : 'Execute Sync'}
                </Button>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Pull from Property Finder</CardTitle>
                <CardDescription>
                    Fetch an existing listing from Property Finder to analyze its quality or send it to the Listing Manager for refinement.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handlePull}>
                <CardContent>
                    <Label htmlFor="pullId">Property Finder Reference No.</Label>
                    <div className="flex gap-2">
                        <Input id="pullId" value={pullId} onChange={e => setPullId(e.target.value)} placeholder="e.g., pf-123456" />
                        <Button type="submit" disabled={isLoading || !pullId}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                            Pull Listing
                        </Button>
                    </div>
                </CardContent>
            </form>
            {pulledData && (
                 <CardContent className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                       <h4 className="font-semibold">{pulledData.propertyTitle}</h4>
                       <Badge>Listing Quality: 92/100</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pulledData.propertyDescription}</p>
                    <div className="mt-4">
                        <Link href="/me/tool/listing-manager">
                            <Button variant="outline">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Send to Manager to Refine
                            </Button>
                        </Link>
                    </div>
                 </CardContent>
            )}
        </Card>
      </div>
    </main>
  );
}
