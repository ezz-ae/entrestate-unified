
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Play, RotateCw } from "lucide-react";

const jobs = [
    { id: "JOB-123", flow: "generateMarketingKit", status: "Running", duration: "45s" },
    { id: "JOB-124", flow: "ingestData", status: "Queued", duration: "..." },
    { id: "JOB-121", flow: "syncBayut", status: "Failed", duration: "15s" },
    { id: "JOB-125", flow: "runSalesPilot", status: "Queued", duration: "..." },
];

export function QueuesMonitor() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Queues Monitor</CardTitle>
                <CardDescription>Real-time status of all background job queues.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job ID</TableHead>
                            <TableHead>Flow</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map(job => (
                            <TableRow key={job.id}>
                                <TableCell className="font-mono text-xs">{job.id}</TableCell>
                                <TableCell>{job.flow}</TableCell>
                                <TableCell>
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                         job.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                                         job.status === 'Queued' ? 'bg-gray-100 text-gray-800' :
                                         'bg-red-100 text-red-800'
                                     }`}>
                                        {job.status}
                                    </span>
                                </TableCell>
                                <TableCell>{job.duration}</TableCell>
                                <TableCell>
                                    {job.status === 'Failed' && (
                                        <Button variant="outline" size="sm">
                                            <RotateCw className="h-4 w-4 mr-1" /> Retry
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Card className="mt-4 bg-red-50 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-sm text-red-900">Dead-Letter Queue (DLQ)</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-red-700 text-2xl font-bold">3 Jobs</p>
                        <p className="text-xs text-red-600">These jobs have failed multiple retries and require manual intervention.</p>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
