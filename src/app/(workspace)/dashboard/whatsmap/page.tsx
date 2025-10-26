"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
  jobId?: string | null;
}

export default function WhatsmapPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hello! How can I help you with your real estate queries today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/qa/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, uid: user?.uid }),
      });
      const data = await res.json();

      let aiText = data.message || "I've received your query.";
      if (data.jobId) {
        aiText += ` I've started this task for you. You can track it in the 'Flows' section. (Job ID: ${data.jobId})`;
      }
      
      const aiMessage: Message = { sender: "ai", text: aiText, jobId: data.jobId };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      const errorMessage: Message = { sender: "ai", text: "Sorry, I encountered an error. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            <div className={`p-3 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-lg bg-muted flex items-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask to 'compare project A and B' or 'generate a PDF for project C'..."
            className="pr-12"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
