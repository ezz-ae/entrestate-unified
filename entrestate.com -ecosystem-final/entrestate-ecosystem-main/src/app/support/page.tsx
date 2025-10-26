
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LifeBuoy, BookOpen, MessageSquare, Search, FileText, Bot, Bug, FileWarning, Loader2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { tools } from '@/lib/tools-data';
import { motion } from 'framer-motion';


const BugReportForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Bug Report Submitted!",
            description: "Our AI Support Agent is analyzing the issue. A ticket has been created and you will be notified of any updates."
        });
        setIsLoading(false);
        setOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Video export fails for Reel Ads tool" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="area">Affected Area</Label>
                 <Select required>
                    <SelectTrigger id="area">
                        <SelectValue placeholder="Select a page or tool..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="settings">Settings</SelectItem>
                        {tools.map(tool => (
                            <SelectItem key={tool.id} value={tool.id}>{tool.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea id="description" rows={5} placeholder="Please provide as much detail as possible, including the steps to reproduce the issue." required />
            </div>
             <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Report
                </Button>
            </DialogFooter>
        </form>
    );
};


export default function SupportPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full">
                 <div className="pt-24 text-center">
                    <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto mb-4 shadow-sm"><LifeBuoy className="h-10 w-10" /></div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Support Center
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                       Your central hub for guides, documentation, and help with all our apps, solutions, and services.
                    </p>
                </div>

                <section className="py-24">
                    <div className="container max-w-screen-lg mx-auto px-4">
                        <Card className="shadow-2xl mb-8">
                             <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <Bot className="h-12 w-12 text-primary flex-shrink-0" />
                                    <div className="flex-grow text-center md:text-left">
                                         <h2 className="text-2xl font-bold font-heading">AI Support Agent</h2>
                                         <p className="text-muted-foreground mt-1">Have a question? Ask our AI assistant for an instant answer.</p>
                                    </div>
                                    <form className="relative w-full md:w-auto">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input 
                                            placeholder='How do I connect my Facebook account?' 
                                            className="w-full h-12 pl-10 pr-4 text-base rounded-full"
                                        />
                                    </form>
                                </div>
                             </CardContent>
                        </Card>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-6 w-6"/> Academy & Guides</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Browse step-by-step tutorials and guides for all our suites and tools.</p>
                                    <Button asChild variant="outline" className="mt-4">
                                        <Link href="/academy">Explore Academy <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </CardContent>
                            </Card>
                             <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><MessageSquare className="h-6 w-6"/> General Inquiries</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">For partnerships, press, and other inquiries, please contact our team.</p>
                                     <Button asChild variant="outline" className="mt-4">
                                        <a href="mailto:support@entrestate.com">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></a>
                                    </Button>
                                </CardContent>
                            </Card>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2"><Bug className="h-6 w-6 text-destructive"/> Report a Bug</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">Found a technical issue? Let us know so we can fix it.</p>
                                             <Button variant="destructive" className="mt-4 w-full">
                                                <FileWarning className="mr-2 h-4 w-4"/>
                                                Report an Issue
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Report a Technical Issue</DialogTitle>
                                        <DialogDescription>
                                            Your report will be sent to our AI Support Agent for initial analysis and ticketing.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <BugReportForm setOpen={setDialogOpen} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
