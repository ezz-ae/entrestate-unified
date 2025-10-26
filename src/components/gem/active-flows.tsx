
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, RotateCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const flows = [
    { id: "JOB-123", source: "Web", flow: "generateMarketingKit", steps: 3, totalSteps: 4, duration: "45s" },
    { id: "JOB-124", source: "WA", flow: "runSalesPilot", steps: 1, totalSteps: 3, duration: "12s" },
    { id: "JOB-125", source: "Web", flow: "ingestData", steps: 0, totalSteps: 2, duration: "..." },
];

export function ActiveFlows() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active AI Flows</CardTitle>
                <CardDescription>A real-time view of all running and queued AI-powered jobs.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Flow</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {flows.map(flow => (
                            <TableRow key={flow.id}>
                                <TableCell className="font-mono text-xs">{flow.id}</TableCell>
                                <TableCell>{flow.source}</TableCell>
                                <TableCell>{flow.flow}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={(flow.steps / flow.totalSteps) * 100} className="w-24" />
                                        <span>{flow.steps}/{flow.totalSteps}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{flow.duration}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">
                                        <RotateCw className="h-4 w-4 mr-1" /> Replay
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
