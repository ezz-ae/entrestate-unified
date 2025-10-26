
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface AppCardProps {
    title: string;
    description: string;
    onLaunch: () => void;
}

export function AppCard({ title, description, onLaunch }: AppCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-accent" />
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                <Button onClick={onLaunch}>Launch App</Button>
            </CardContent>
        </Card>
    );
}
