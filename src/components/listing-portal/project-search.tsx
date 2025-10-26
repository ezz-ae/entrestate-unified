
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getProjectById } from "@/lib/database"; // Assuming this function exists
import { useState } from "react";

export function ProjectSearch() {
    const [projectId, setProjectId] = useState('');
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const result = await getProjectById(projectId);
            setProject(result);
        } catch (error) {
            console.error("Error searching for project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Search</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="Enter a project ID..."
                    />
                    <Button onClick={handleSearch} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </div>
                {project && (
                    <div className="mt-4">
                        <h4 className="font-semibold">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.area}, {project.city}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
