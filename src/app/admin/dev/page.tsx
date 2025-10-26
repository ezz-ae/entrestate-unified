
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { ConnectorsHealth } from "@/components/dev/connectors-health";
import { QueuesMonitor } from "@/components/dev/queues-monitor";
import { SecretsChecker } from "@/components/dev/secrets-checker";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function DevPage() {
  return (
    <div className="p-4 md:p-8">
      <PageHeader
        title="DEV Panel (Admin Intelligence)"
        description="The command center for monitoring and managing the operational health of the Entrestate OS."
      />
      <main className="mt-6 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-8 space-y-8">
            <QueuesMonitor />
        </div>
        <div className="md:col-span-4 space-y-8">
            <ConnectorsHealth />
            <SecretsChecker />
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Manual Triggers</h3>
                <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Trigger Daily Data Ingestion
                </Button>
                 <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Trigger Weekly Report Generation
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
