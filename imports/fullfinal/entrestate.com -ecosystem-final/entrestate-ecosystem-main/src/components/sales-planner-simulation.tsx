
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Bot, User, Send, Loader2, DollarSign, CalendarCheck, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

// Mock messages for the AI interaction
const aiMessages = [
    { role: 'ai', text: 'Alright, let\'s optimize this deal. What\'s the property address or project name?' },
    { role: 'user', text: 'Emaar Beachfront, Apt #1201' },
    { role: 'ai', text: 'Got it. Gathering all historical sales data, market trends, and comparable listings...' },
    { role: 'ai', text: 'Initial analysis suggests a potential 15% price appreciation in the next 12 months due to upcoming infrastructure developments and limited supply.' },
    { role: 'user', text: 'What\'s the optimal asking price?' },
    { role: 'ai', text: 'Considering current market velocity and recent transactions, an aggressive yet achievable asking price would be AED 3.2M. This factors in the unique view and recent upgrades.' },
    { role: 'user', text: 'Great. How about a strategy for social media?' },
    { role: 'ai', text: 'For social media, I recommend a targeted campaign on Instagram and Facebook focusing on high-net-worth individuals interested in luxury waterfront properties. We can highlight the 15% appreciation potential and the unique features of Apt #1201.' },
    { role: 'user', text: 'Can you draft a sample post?' },
    { role: 'ai', text: 'Absolutely! Here\'s a draft: "✨ Invest in unparalleled luxury at Emaar Beachfront! Apt #1201 offers breathtaking views & a projected 15% appreciation in 12 months. DM for an exclusive viewing! #EmaarBeachfront #LuxuryRealEstate #DubaiHomes"'},
    { role: 'user', text: 'What are the next steps to close this deal efficiently?' },
    {
      role: 'ai',
      text: (
        <div className="space-y-4">
          <p>Based on our analysis, here\'s a prioritized action plan to close this deal:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-background/50">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-md">Refine Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Confirm final asking price of AED 3.2M. Prepare a detailed ROI projection for potential buyers.
              </CardContent>
            </Card>
            <Card className="bg-background/50">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-md">Launch Targeted Marketing</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Implement the Instagram/Facebook campaign with the drafted ad copy. Schedule an open house for qualified leads.
              </CardContent>
            </Card>
            <Card className="bg-background/50">
              <CardHeader className="flex flex-row items-center space-x-2 pb-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle className="text-md">Prepare Documentation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Have all legal and sales documents ready for swift transaction closure.
              </CardContent>
            </Card>
          </div>
          <Link href="/me/flows" className="block text-right">
            <Button variant="ghost" className="text-primary hover:underline">
              Automate these steps with an AI Flow <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
        </div>
      ),
    },
  ];


export function SalesPlannerSimulation() {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string | React.ReactNode }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentMessageIndex = useRef(0);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      if (currentMessageIndex.current < aiMessages.length) {
        setMessages(prev => [...prev, aiMessages[currentMessageIndex.current]]);
        currentMessageIndex.current++;
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'I\'ve provided all the mock information I have. Please try a different query or reset the simulation.' }]);
      }
      setIsLoading(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    currentMessageIndex.current = 0;
    // Start with the first AI message immediately after reset
    setTimeout(() => {
        setMessages([{ role: 'ai', text: 'Alright, let\'s optimize this deal. What\'s the property address or project name?' }]);
    }, 500);
  };

  // Initialize with the first AI message on component mount
  useEffect(() => {
    resetSimulation();
  }, []);

  return (
    <Card className="w-full h-[550px] flex flex-col bg-card/50 backdrop-blur-sm border-border/30 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> Sales Planner AI
          </CardTitle>
          <CardDescription>Simulate an AI-driven deal optimization.</CardDescription>
        </div>
        <Button onClick={resetSimulation} variant="outline" size="sm">Reset</Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                {msg.role === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                )}
                <div className={cn("max-w-xs md:max-w-md rounded-2xl p-3 text-sm", msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0"><User className="h-5 w-5"/></div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                <div className="rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="relative">
            <Input
              placeholder="Ask the AI about deal strategies..."
              className="pr-12"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
