
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const templates = [
    { id: 'social-post-1', name: 'Luxury Social Post', imageUrl: '/placeholder-template.png' },
    { id: 'story-1', name: 'Modern Instagram Story', imageUrl: '/placeholder-template.png' },
    { id: 'brochure-1', name: 'Elegant Brochure', imageUrl: '/placeholder-template.png' },
    { id: 'landing-page-1', name: 'High-Converting Landing Page', imageUrl: '/placeholder-template.png' },
];

export function TemplateLibrary() {
    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Template Library</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {templates.map(template => (
                        <div key={template.id} className="border rounded-lg p-4 text-center">
                            <Image src={template.imageUrl} alt={template.name} width={200} height={200} className="rounded-lg mx-auto" />
                            <h4 className="font-semibold mt-2 text-sm">{template.name}</h4>
                            <Button variant="outline" size="sm" className="mt-2">Use Template</Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
