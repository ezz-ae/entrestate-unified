
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

const secrets = [
    { name: "GEMINI_API_KEY", status: "Loaded" },
    { name: "VERTEX_AI_SA_KEY", status: "Loaded" },
    { name: "META_APP_SECRET", status: "Loaded" },
    { name: "WHATSAPP_API_TOKEN", status: "Missing" },
    { name: "FIREBASE_ADMIN_SDK", status: "Loaded" },
];

export function SecretsChecker() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Secrets Checker</CardTitle>
                <CardDescription>Status of all required environment variables and secrets.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
                {secrets.map(secret => (
                    <div key={secret.name} className="flex items-center justify-between p-2 rounded-md bg-muted/50 text-xs font-mono">
                        <span>{secret.name}</span>
                        <Badge variant={secret.status === "Loaded" ? "default" : "destructive"} className="flex items-center gap-1">
                            {secret.status === "Loaded" ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            {secret.status}
                        </Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
