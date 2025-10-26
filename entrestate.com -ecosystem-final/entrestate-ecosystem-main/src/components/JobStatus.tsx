
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface JobStatusProps {
    status: 'queued' | 'processing' | 'done' | 'error' | null;
    jobId: string | null;
}

const statusConfig = {
    queued: {
        icon: <Loader2 className="h-5 w-5 animate-spin" />,
        text: 'Queued',
        color: 'bg-gray-500',
    },
    processing: {
        icon: <Loader2 className="h-5 w-5 animate-spin" />,
        text: 'Processing',
        color: 'bg-blue-500',
    },
    done: {
        icon: <CheckCircle className="h-5 w-5" />,
        text: 'Done',
        color: 'bg-green-500',
    },
    error: {
        icon: <AlertTriangle className="h-5 w-5" />,
        text: 'Error',
        color: 'bg-red-500',
    },
};

export function JobStatus({ status, jobId }: JobStatusProps) {
    if (!status || !jobId) return null;

    const config = statusConfig[status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
        >
            <div className="flex items-center gap-3">
                {config.icon}
                <div>
                    <p className="font-semibold">{config.text}</p>
                    <p className="text-xs text-muted-foreground">Job ID: {jobId}</p>
                </div>
            </div>
            <Badge variant="secondary" className={config.color + ' text-white'}>
                {status}
            </Badge>
        </motion.div>
    );
}
