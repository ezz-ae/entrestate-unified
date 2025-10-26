
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { SearchAgentDashboard } from "@/components/cloud-intelligence/search-agent-dashboard";
import { ChatAgentDashboard } from "@/components/cloud-intelligence/chat-agent-dashboard";
import { MegaListingAgentDashboard } from "@/components/cloud-intelligence/mega-listing-agent-dashboard";
import { DataSegmentationDashboard } from "@/components/cloud-intelligence/data-segmentation-dashboard";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CloudIntelligencePage() {
  return (
    <div className="p-4 md:p-8">
      <PageHeader
        title="Cloud Intelligence Suite"
        description="Your command center for deploying, managing, and monitoring your AI agents and data."
      />
      <main className="mt-6 space-y-8">

        <div>
            <h2 className="text-2xl font-bold mb-4">Data Segmentation Intelligence</h2>
            <DataSegmentationDashboard />
        </div>

        <Separator />

        <div>
             <h2 className="text-2xl font-bold mb-4">Agent Control Panel</h2>
            <Tabs defaultValue="search-agent">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="search-agent">Search Agent</TabsTrigger>
                    <TabsTrigger value="chat-agent">Chat Agent</TabsTrigger>
                    <TabsTrigger value="mega-listing-api">Mega Listing API</TabsTrigger>
                </TabsList>
                <TabsContent value="search-agent">
                    <SearchAgentDashboard />
                </TabsContent>
                <TabsContent value="chat-agent">
                    <ChatAgentDashboard />
                </TabsContent>
                <TabsContent value="mega-listing-api">
                    <MegaListingAgentDashboard />
                </TabsContent>
            </Tabs>
        </div>
        
        <Card className="mt-12 text-center">
            <CardHeader>
                <CardTitle>Ready to Build?</CardTitle>
                <CardDescription>Explore our developer documentation to start building your own next-generation real estate applications on the Entrestate Cloud.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/developers">
                    <Button size="lg">
                        Go to Developer Portal <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
