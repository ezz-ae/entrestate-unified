
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Bot, Send, Loader2, User } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

type Message = {
    from: 'ai' | 'user';
    text: string;
};

const InitialAssistantMessage = () => (
    <div>
        <p className="font-semibold mb-2">Hello! I'm Gemini, your AI co-pilot.</p>
        <p className="mb-3">Train me by uploading your brochures, price lists, and market reports to the <Link href="/me/brand" className="underline font-semibold hover:text-primary">Brand & Assets</Link> page. This gives me a knowledge base to help you better.</p>
        <p className="text-sm">Ask me a question or tell me what you'd like to do. I'm ready to assist!</p>
    </div>
);

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
   useEffect(() => {
    // We moved the initial message to be set here to avoid server/client mismatch
    setMessages([
        { from: 'ai', text: "Hello! I'm Gemini, your AI co-pilot. Train me by uploading your brochures, price lists, and market reports. Ask me a question or tell me what you'd like to do. I'm ready to assist!" },
    ]);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input, history: chatHistory }),
        });

        if (!response.ok) {
            throw new Error('The AI is experiencing some turbulence. Please try again.');
        }

        const data = await response.json();
        const aiResponse: Message = { from: 'ai', text: data.text };
        
        setMessages(prev => [...prev, aiResponse]);
        setChatHistory(prev => [...prev, { role: 'user', content: [{ text: userMessage.text }] }, { role: 'model', content: [{ text: aiResponse.text }] }]);
    } catch(err: any) {
        const errorResponse: Message = { from: 'ai', text: err.message };
        setMessages(prev => [...prev, errorResponse]);
    } finally {
        setIsLoading(false);
        setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef as any}>
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-start gap-3", msg.from === 'user' ? 'justify-end' : 'justify-start')}>
                        {msg.from === 'ai' && (
                            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="h-5 w-5" /></div>
                        )}
                        <div className={cn("max-w-xl rounded-2xl p-3 text-sm", msg.from === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                            {msg.text}
                        </div>
                        {msg.from === 'user' && (
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
                    placeholder="Ask the AI anything..."
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
    </div>
  );
}
