
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BrainCircuit, Network, Gem } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <main>
        <PageHeader
          title="About Entrestate"
          description="We are building the AI-Native Operating System for the future of real estate."
        />
        <div className="container mx-auto px-4 md:px-8 py-12">
          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              To empower every real estate professional with a true AI partner, an intelligent ecosystem that automates workflows, uncovers opportunities, and provides the creative and analytical tools needed to thrive in a competitive market. We believe the future of real estate is not just about data, but about intelligence.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">The Technology Behind the Intelligence</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader className="items-center">
                  <Gem className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Google Gemini</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  At our core is Gemini, Google's most advanced generative AI model. It powers our conversational intelligence, content creation, and strategic analysis, providing a level of understanding and creativity that is second to none.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <BrainCircuit className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Genkit AI Framework</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Our entire AI infrastructure is built on the robust and scalable Genkit framework. This allows us to create, deploy, and manage complex, multi-step AI flows that connect different models and services into a unified, intelligent system.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="items-center">
                  <Bot className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>WhatsMAP Engine</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  Our proprietary WhatsMAP engine is the brain of the operation. It uses a sophisticated Parse-Execute-Synthesize pipeline to understand your intent, orchestrate actions across the platform, and deliver proactive, context-aware insights.
                </CardContent>
              </Card>
               <Card>
                <CardHeader className="items-center">
                  <Network className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Vertex AI & Firebase</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  We leverage the full power of the Google Cloud ecosystem, using Vertex AI for advanced machine learning and Firebase for a secure, scalable, and real-time backend infrastructure that powers our entire platform.
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
