'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode.react";

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

export default function WhatsMapPage() {
  return (
    <div>
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold">WhatsMap AI</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your personal real estate analyst, available 24/7 on WhatsApp. Get instant answers, comparisons, and reports.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        <div className="max-w-5xl mx-auto mt-16 grid gap-8 md:grid-cols-3">
          <InfoCard 
            icon={<CheckCircle className="h-10 w-10 text-primary" />} 
            title="Instant Project Data" 
            description="Ask for prices, availability, and payment plans for any project." 
          />
          <InfoCard 
            icon={<CheckCircle className="h-10 w-10 text-primary" />} 
            title="AI-Powered Comparisons" 
            description='"Compare Emaar Beachfront and Sobha Hartland" to get an instant analysis.' 
          />
          <InfoCard 
            icon={<CheckCircle className="h-10 w-10 text-primary" />} 
            title="PDF Report Generation" 
            description="Request a full PDF report on a project, delivered in seconds." 
          />
        </div>
      </main>

      <section className="bg-gray-50/90 py-20">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
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

      <section className="py-8 container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-bold">WhatsMap</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover real estate opportunities with our interactive map.
        </p>
        <div className="mt-8 flex h-96 items-center justify-center rounded-lg border bg-muted">
          <p>Map component will be here.</p>
        </div>
      </section>
    </div>
  );
}