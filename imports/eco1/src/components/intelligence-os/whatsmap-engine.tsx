
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";
import Image from "next/image";
import Link from "next/link";

export function WhatsMAPEngine({ activeSuite }: { activeSuite: string }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const proactiveSuggestions: { [key: string]: string[] } = {
        'community': ["'Post a market insight about off-plan trends'", "'Ask the community for a good photographer'", "'Announce a top agent of the week'"],
        'lead-intelligence': ["'Investigate lead john.doe@email.com'", "'Generate a deal plan for the new Emaar project'", "'Draft a follow-up email for my latest offer'"],
        'listing-intelligence': ["'Analyze performance for listing PF-12345'", "'Clone a listing from Bayut and refine it with AI'", "'Generate 5 content ideas for a villa in Arabian Ranches'"],
        'meta-intelligence': ["'Create a new lead generation campaign'", "'Show me the performance of my active campaigns'", "'Generate a new ad creative for a luxury penthouse'"],
        'creative-intelligence': ["'Find all my brochures in the asset manager'", "'Generate a new social media post from template X'", "'Edit the price on this PDF brochure'"],
    };

    const welcomeMessage = {
        from: 'bot',
        components: [{ type: 'text', data: { text: "Welcome to the WhatsMAP Engine. I am your AI partner. How can I help you orchestrate your next move?" } }]
    };

    useEffect(() => {
        setMessages([welcomeMessage]);
    }, []);

    const handleSend = async (query?: string) => {
        const userQuery = query || input;
        if (!userQuery.trim()) return;

        const newMessages: any[] = [...messages, { from: 'user', components: [{ type: 'text', data: { text: userQuery } }] }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const result = await runWhatsMAP({ query: userQuery });
            newMessages.push({ from: 'bot', components: result.response });
            setMessages(newMessages);
        } catch (error) {
            console.error("Error running WhatsMAP:", error);
            const errorResponse = { from: 'bot', components: [{ type: 'text', data: { text: "An error occurred while processing your request. Please try again." } }] };
            setMessages([...newMessages, errorResponse]);
        } finally {
            setLoading(false);
        }
    };

    const renderComponent = (component: any, index: number) => {
        // ... (same as before)
    };

    return (
        <Card className="h-full flex flex-col bg-background">
            <CardHeader>
                <CardTitle className="text-primary">WhatsMAP Conversational Engine</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <ScrollArea className="flex-grow p-4 border rounded-lg mb-4 bg-muted/20">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start mb-4 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'bot' && <Bot className="h-6 w-6 mr-2 text-primary" />}
                            <div className={`p-3 rounded-lg max-w-md ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {msg.components.map(renderComponent)}
                            </div>
                            {msg.from === 'user' && <User className="h-6 w-6 ml-2" />}
                        </div>
                    ))}
                </ScrollArea>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                         <Lightbulb className="h-5 w-5 text-yellow-400" />
                         <span className="text-sm font-semibold">Proactive Suggestions for '{activeSuite.replace('-', ' ')}'</span>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {(proactiveSuggestions[activeSuite] || []).map((suggestion, index) => (
                            <Button key={index} variant="outline" size="sm" onClick={() => handleSend(suggestion.replace(/'/g, ''))}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="flex space-x-2 mt-4">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Orchestrate your next move..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        className="flex-grow"
                    />
                    <Button onClick={() => handleSend()} disabled={loading} size="lg">
                        {loading ? '...' : 'Send'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
