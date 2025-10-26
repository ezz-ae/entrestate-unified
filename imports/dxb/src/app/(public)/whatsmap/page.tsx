
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot, BrainCircuit, Network, Gem, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { QRCode } from 'react-qrcode-logo';

export default function WhatsMAPPage() {
  return (
    <div className="bg-background">
      <main>
        <div className="relative isolate overflow-hidden pt-14">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>
            <div className="py-24 sm:py-32">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl text-center mx-auto">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Meet WhatsMAP</h1>
                        <p className="mt-6 text-lg leading-8 text-muted-foreground">The AI Brain of the Entrestate OS. WhatsMAP is your conversational market expert, proactive co-pilot, and powerful action engine, all in one.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href="/discover"><Button size="lg">Try WhatsMAP on the Web</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section className="py-16 container mx-auto px-4 md:px-8">
             <h2 className="text-3xl font-bold text-center mb-12">The Most Intelligent Real Estate Co-Pilot Ever Built</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InfoCard icon={<BrainCircuit className="h-8 w-8 text-primary" />} title="Understands Your Intent" description="Our Parse-Execute-Synthesize pipeline deconstructs your natural language commands into actionable workflows." />
                <InfoCard icon={<Network className="h-8 w-8 text-primary" />} title="Orchestrates Across Suites" description="WhatsMAP seamlessly connects to every part of the EI-OS, from the Creative Hub to the Meta Intelligence suite." />
                <InfoCard icon={<Bot className="h-8 w-8 text-primary" />} title="Proactive & Context-Aware" description="It knows where you are in the EI-OS and provides intelligent, proactive suggestions to streamline your workflow." />
             </div>
        </section>

        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-4">From Conversation to Closed Deal, on WhatsApp</h2>
                    <p className="text-muted-foreground mb-6">See how WhatsMAP can take a simple voice note and turn it into a complete, automated sales process, connecting you with your client and guiding you to the finish line.</p>
                    <ul className="space-y-4">
                        <FeatureListItem>Connect your WhatsApp Business Account in your settings.</FeatureListItem>
                        <FeatureListItem>A lead sends a voice note: "Hi, I'm looking for a two-bedroom apartment in Downtown with a budget of around 2 million."</FeatureListItem>
                        <FeatureListItem>WhatsMAP transcribes the audio, understands the intent, and instantly finds the top 3 matching properties from the Market Library.</FeatureListItem>
                        <FeatureListItem>It drafts a personalized, on-brand WhatsApp message with the options, complete with images and a call-to-action.</FeatureListItem>
                        <FeatureListItem>You simply approve the message. The conversation begins, and a new deal is in motion.</FeatureListItem>
                    </ul>
                </div>
                <div className="flex items-center justify-center">
                    <QRCode value="https://wa.me/YOUR_WHATSAPP_NUMBER" size={256} />
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}

const InfoCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="text-center">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

const FeatureListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
        <span className="text-muted-foreground">{children}</span>
    </li>
);
