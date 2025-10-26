
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const connectors = [
    { name: "WhatsApp Cloud API", status: "Operational" },
    { name: "Meta Marketing API", status: "Operational" },
    { name: "Google Gemini API", status: "Operational" },
    { name: "Bayut Scraper", status: "Degraded" },
    { name: "Property Finder Scraper", status: "Offline" },
];

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case "Operational":
            return <CheckCircle className="h-4 w-4 text-green-500" />;
        case "Degraded":
            return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
        case "Offline":
            return <XCircle className="h-4 w-4 text-red-500" />;
        default:
            return null;
    }
};

export function ConnectorsHealth() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Connectors Health</CardTitle>
                <CardDescription>Real-time status of all external API connections.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {connectors.map(connector => (
                        <div key={connector.name} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <span className="text-sm font-medium">{connector.name}</span>
                            <Badge variant={
                                connector.status === "Operational" ? "default" : connector.status === "Degraded" ? "secondary" : "destructive"
                            } className="flex items-center gap-1">
                                <StatusIcon status={connector.status} />
                                {connector.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
