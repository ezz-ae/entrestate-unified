
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User } from "lucide-react";
import { useState } from "react";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";
import Image from "next/image";
import Link from "next/link";

export function PublicWhatsMAPChat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { from: 'bot', components: [{ type: 'text', data: { text: "Welcome to Entrestate! I'm WhatsMAP, your AI real estate expert. Ask me anything about the Dubai market." } }] }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages: any[] = [...messages, { from: 'user', components: [{ type: 'text', data: { text: input } }] }];
        setMessages(newMessages);
        const userQuery = input;
        setInput('');
        setLoading(true);

        try {
            const result = await runWhatsMAP({ query: userQuery, isPublic: true });
            newMessages.push({ from: 'bot', components: result.response });
            setMessages(newMessages);
        } catch (error) {
            console.error("Error running WhatsMAP:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderComponent = (component: any, index: number) => {
        switch (component.type) {
            case 'text':
                return <p key={index} className="mb-2">{component.data.text}</p>;
            case 'project-showcase':
                return (
                    <Card key={index} className="mb-4">
                        <CardContent className="p-4">
                            <Image src={component.data.project.thumbnailUrl} alt={component.data.project.name} width={300} height={200} className="rounded-lg mb-2" />
                            <h4 className="font-semibold">{component.data.project.name}</h4>
                            <p className="text-sm text-muted-foreground">{component.data.project.developer}</p>
                        </CardContent>
                    </Card>
                );
            case 'flow-showcase':
                return (
                    <Card key={index} className="mb-4 bg-gray-800 text-white">
                        <CardHeader><CardTitle>Example Flow: Create Listing</CardTitle></CardHeader>
                        <CardContent>
                            <pre><code>
{`clone-listing --url ${"https://www.propertyfinder.ae/..."} --refine
generate-social-post --source "Newly listed..."
launch-meta-campaign --listing-id 123`}
                            </code></pre>
                            <Button variant="secondary" className="mt-2">Try This Flow</Button>
                        </CardContent>
                    </Card>
                );
            case 'onboarding':
                return (
                    <Card key={index} className="mb-4 bg-primary text-primary-foreground">
                        <CardHeader><CardTitle>Unlock the Full Power of Entrestate</CardTitle></CardHeader>
                        <CardContent>
                            <p>Become a member to access our full suite of AI-powered tools and intelligence.</p>
                            <Link href="/login"><Button variant="secondary" className="mt-2">Sign Up for Free</Button></Link>
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96">
            <Card className="h-[600px] flex flex-col">
                <CardHeader>
                    <CardTitle>WhatsMAP</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                    <ScrollArea className="flex-grow p-4 border rounded-lg mb-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start mb-4 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                                {msg.from === 'bot' && <Bot className="h-6 w-6 mr-2" />}
                                <div className={`p-2 rounded-lg ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    {msg.components.map(renderComponent)}
                                </div>
                                {msg.from === 'user' && <User className="h-6 w-6 ml-2" />}
                            </div>
                        ))}
                    </ScrollArea>
                    <div className="flex space-x-2">
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me about Emaar..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <Button onClick={handleSend} disabled={loading}>
                            {loading ? '...' : 'Send'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
