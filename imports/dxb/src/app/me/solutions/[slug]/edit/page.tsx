
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SolutionDetails, solutionsData } from '@/lib/solutions-data';
import { Loader2, Save } from 'lucide-react';

export default function EditSolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const [solution, setSolution] = useState<SolutionDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundSolution = solutionsData[slug as keyof typeof solutionsData];
      if (foundSolution) {
        setSolution(foundSolution);
      } else {
        notFound();
      }
      setIsLoading(false);
    }
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setSolution(prev => {
      if (!prev) return null;
      if (id === 'productCore' || id === 'useCases' || id === 'growthPath') {
        // Handle array fields - for now, just split by newline for simplicity
        return { ...prev, [id]: value.split('\n').filter(item => item.trim() !== '') };
      } else if (id.startsWith('techStack.')) {
        const techKey = id.split('.')[1];
        return {
          ...prev,
          techStack: {
            ...prev.techStack,
            [techKey]: value,
          },
        };
      }
      return { ...prev, [id]: value };
    });
  };

  const handleCtaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSolution(prev => {
      if (!prev) return null;
      return {
        ...prev,
        cta: {
          ...prev.cta,
          [id]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    if (!solution) return;

    setIsSaving(true);
    // In a real application, you would send this data to a backend API.
    // For this example, we'll simulate an API call.
    console.log("Saving solution:", solution);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // Update the in-memory data (this won't persist across refreshes without a backend)
      // For a real app, this would be a POST/PUT request to your API
      // For now, we'll just show a toast and navigate back.
      toast({
        title: "Solution Saved!",
        description: `${solution.title} has been updated.`,
      });
      router.push(`/solutions/${slug}`);
    } catch (error) {
      console.error("Failed to save solution:", error);
      toast({
        title: "Error",
        description: "Failed to save solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!solution) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-8">
        <h1 className="text-4xl font-bold font-heading">Edit {solution.title}</h1>

        <Card>
          <CardHeader>
            <CardTitle>Solution Details</CardTitle>
            <CardDescription>Update the core information for this solution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={solution.title} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={solution.tagline} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="vision">Vision</Label>
              <Textarea id="vision" value={solution.vision} onChange={handleChange} rows={3} />
            </div>
            <div>
              <Label htmlFor="dna">DNA</Label>
              <Textarea id="dna" value={solution.dna} onChange={handleChange} rows={5} />
            </div>
            <div>
              <Label htmlFor="price">Price (per month)</Label>
              <Input id="price" type="number" value={solution.price || ''} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="cta.text">CTA Button Text</Label>
              <Input id="text" value={solution.cta.text} onChange={handleCtaChange} />
            </div>
            <div>
              <Label htmlFor="cta.href">CTA Button Link</Label>
              <Input id="href" value={solution.cta.href} onChange={handleCtaChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Core</CardTitle>
            <CardDescription>Each item on a new line.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="productCore"
              value={solution.productCore.join('\n')}
              onChange={handleChange}
              rows={solution.productCore.length + 2}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Update key-value pairs for the tech stack.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(solution.techStack).map(([key, value]) => (
              <div key={key}>
                <Label htmlFor={`techStack.${key}`}>{key}</Label>
                <Input id={`techStack.${key}`} value={value} onChange={handleChange} />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Add similar cards for useCases and growthPath if needed */}

        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </main>
    </div>
  );
}
