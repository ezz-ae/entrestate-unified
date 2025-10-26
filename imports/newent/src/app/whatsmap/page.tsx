
'use client';

import React from 'react';
import { Bot, ArrowRight, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const WhatsAppMessage = ({ text, isUser, delay }: { text: string, isUser: boolean, delay: number }) => (
    <motion.div
        className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        {!isUser && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Bot size={20} />
            </div>
        )}
        <div
            className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isUser ? 'bg-green-600 text-white rounded-br-none' : 'bg-muted rounded-bl-none'}`}
        >
            <p className="text-sm md:text-base">{text}</p>
        </div>
    </motion.div>
);

export default function WhatsMAPPage() {
    const conversation = [
        { text: "Send me the top 3 off-plan villas in Damac Lagoons, compare them, and generate a branded PDF for me.", isUser: true, delay: 0.5 },
        { text: "Of course. Analyzing 28 available units now...", isUser: false, delay: 1.5 },
        { text: "I've shortlisted 'Santorini', 'Costa Brava', and 'Malta' based on completion date and price trends. Generating comparison...", isUser: false, delay: 2.5 },
        { text: "Your branded PDF is ready. Here is the secure link: [link]", isUser: false, delay: 4.0 }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full">
                <div className="pt-24 text-center">
                    <div className="p-4 bg-green-600/10 text-green-600 rounded-2xl w-fit mx-auto mb-4 shadow-sm"><MessageCircle className="h-10 w-10" /></div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading tracking-tighter leading-tight max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        WhatsMAP
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/70">
                        Your entire real estate business, now available in a conversation. Run searches, rebrand documents, or list properties—all from WhatsApp.
                    </p>
                </div>

                <section className="py-24">
                    <div className="container max-w-screen-lg mx-auto px-4">
                        <Card className="shadow-2xl overflow-hidden">
                            <CardContent className="p-8 md:p-12">
                                <div className="space-y-4">
                                    {conversation.map((msg, index) => (
                                        <WhatsAppMessage key={index} text={msg.text} isUser={msg.isUser} delay={msg.delay} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <div className="text-center mt-8">
                            <Badge>This is a simulated conversation</Badge>
                        </div>
                    </div>
                </section>
                
                <section className="py-24 bg-muted/30">
                    <div className="container max-w-screen-md mx-auto px-4 text-center">
                         <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">The Same Power, Everywhere</h2>
                         <p className="text-lg text-muted-foreground mb-12">
                            The intelligent agent that powers our homepage search is the very same one available to you on WhatsApp. Start a search on the web, continue the conversation on the go.
                        </p>
                        <div className="relative group max-w-lg mx-auto">
                             <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-75 group-hover:opacity-100 transition-duration-1000 group-hover:duration-200 animate-gradient-pulse"></div>
                             <div className="relative z-10">
                                <Input 
                                    readOnly
                                    value="List the latest project by Emaar to my Bayut account..."
                                    className="w-full h-14 pl-4 pr-4 text-lg rounded-full shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-center py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading max-w-3xl mx-auto">Ready to Run Your Business from a Conversation?</h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                           Connect your account and start using WhatsMAP today. It's the fastest way to get work done.
                        </p>
                        <div className="mt-8">
                            <Link href="/me">
                                <Button size="lg">Connect Your WhatsApp <ArrowRight className="ml-2 h-4 w-4"/></Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
