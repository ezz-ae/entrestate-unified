
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface DashboardMetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    Icon: LucideIcon;
}

export function DashboardMetricCard({ title, value, change, changeType, Icon }: DashboardMetricCardProps) {
    const isIncrease = changeType === 'increase';

    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                    {isIncrease ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {change} vs last month
                </p>
            </CardContent>
        </Card>
    );
}
