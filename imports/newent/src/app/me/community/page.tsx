
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { MessageSquarePlus, User, Users2, Lightbulb, Feather, Database } from 'lucide-react'; // Added Feather, Database
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type Note = {
    id: string;
    title: string; 
    author: string;
    type: 'Connection' | 'Insight' | 'Opinion' | 'Review' | 'Question' | 'Self Intro';
    content: string;
    comments: number;
    createdAt: any;
};

const typeColors: { [key: string]: string } = {
  'Connection': 'hsl(var(--primary))',
  'Insight': 'hsl(var(--accent))',
  'Investor Request': 'hsl(var(--accent))',
  'Opinion': 'hsl(210, 40%, 50%)',
  'Review': 'hsl(140, 40%, 50%)',
  'Question': 'hsl(45, 90%, 50%)',
  'Self Intro': 'hsl(300, 50%, 60%)',
}

export default function CommunityPage() {
    const [newInsightContent, setNewInsightContent] = useState('');
    const [isSubmittingInsight, setIsSubmittingInsight] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const { user } = useAuth();
    
    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/community/notes');
            
            if (!response.ok) {
                // If response is not ok, try to parse as text to get error message
                const errorText = await response.text();
                throw new Error(`Server responded with an error: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}...`);
            }

            let data;
            try {
                data = await response.json();
            } catch (jsonError: any) {
                console.error("Failed to parse JSON response:", jsonError);
                // If JSON parsing fails, it's likely not a JSON response
                const responseText = await response.text();
                throw new Error(`Expected JSON but received: ${responseText.substring(0, 100)}... (Error: ${jsonError.message})`);
            }
            
            if (data.ok) {
                setNotes(data.data);
            } else {
                throw new Error(data.error || "Failed to fetch notes.");
            }
        } catch (e: any) {
            console.error("Failed to fetch notes:", e);
            toast({ title: "Error", description: `Could not load community insights: ${e.message}`, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handlePublishInsight = async () => {
        if (!user) {
            toast({ title: 'Not Authenticated', description: 'Please log in to share your insight.', variant: 'destructive'});
            return;
        }
        if (newInsightContent.trim().length < 10) {
            toast({ title: 'Input Too Short', description: 'Please share a more detailed insight (minimum 10 characters).'});
            return;
        }

        setIsSubmittingInsight(true);
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/community/notes', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    title: "Community Insight", // Default title for new insights
                    type: 'Insight',
                    content: newInsightContent.trim(),
                    terms: true, // Assuming terms are agreed upon implicitly for simple insights
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with an error: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}...`);
            }

            let result;
            try {
                result = await response.json();
            } catch (jsonError: any) {
                console.error("Failed to parse JSON response for publish insight:", jsonError);
                const responseText = await response.text();
                throw new Error(`Expected JSON but received: ${responseText.substring(0, 100)}... (Error: ${jsonError.message})`);
            }

            if (!result.ok) {
                throw new Error(result.error || "Failed to publish insight.");
            }

            toast({
                title: "Insight Published!",
                description: "Your valuable insight has been shared with the community."
            });
            setNewInsightContent(''); // Clear the input
            fetchNotes(); // Refresh the list of notes

        } catch (e: any) {
            toast({
                title: "Error",
                description: `Failed to publish insight: ${e.message}`,
                variant: 'destructive',
            });
        } finally {
            setIsSubmittingInsight(false);
        }
    }

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-8">
        <PageHeader
          title="Community Insights"
          description="Share what makes a difference, connect with peers, and discover valuable perspectives."
          icon={<Lightbulb className="h-8 w-8" />}
        >
        </PageHeader>

        <Card className="bg-card/80 backdrop-blur-lg border-primary/10 shadow-lg mt-8 mb-12">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquarePlus className="h-5 w-5 text-primary" />
                    Share Your Insight
                </CardTitle>
                <CardDescription>What's an insight or connection you've made today that others should know?</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                    placeholder="E.g., 'Just discovered a new lead generation strategy using AI that boosted my conversions by 15%' or 'Connected with a great developer on the Marina project.'"
                    rows={4}
                    value={newInsightContent}
                    onChange={(e) => setNewInsightContent(e.target.value)}
                    className="mb-4"
                    disabled={isSubmittingInsight}
                />
                <Button onClick={handlePublishInsight} disabled={isSubmittingInsight || newInsightContent.trim().length < 10}>
                    {isSubmittingInsight && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Publish Insight
                </Button>
            </CardContent>
        </Card>

        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mt-8">
                {notes.map((note) => (
                <Card 
                    key={note.id} 
                    className="bg-card/80 backdrop-blur-lg break-inside-avoid-column border-b-4"
                    style={{'--card-border-color': typeColors[note.type], borderColor: 'var(--card-border-color)'} as React.CSSProperties}
                >
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <Badge style={{ backgroundColor: typeColors[note.type]}} className="text-white">{note.type}</Badge>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-4 w-4" /> {note.author}
                        </div>
                    </div>
                    <CardTitle className="pt-2">{note.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">{note.content}</p>
                    </CardContent>
                    <CardFooter>
                    <Button variant="outline" size="sm">View Note &amp; Comments ({note.comments})</Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
