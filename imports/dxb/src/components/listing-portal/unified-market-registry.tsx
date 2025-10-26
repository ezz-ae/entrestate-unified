
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataIntelligenceService, Project } from "@/services/data-intelligence";
import { useState, useEffect } from "react";
import Image from "next/image";

export function UnifiedMarketRegistry() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const dataService = DataIntelligenceService.getInstance();
        const allProjects = dataService.getAllProjects();
        setProjects(allProjects);
        setFilteredProjects(allProjects);
    }, []);

    useEffect(() => {
        const results = projects.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.area.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(results);
    }, [searchTerm, projects]);

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Unified Market Registry</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Search by project, developer, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="border rounded-lg p-4">
                            <Image src={project.thumbnailUrl} alt={project.name} width={300} height={200} className="rounded-lg" />
                            <h4 className="font-semibold mt-2">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.developer}</p>
                            <p className="text-sm text-muted-foreground">{project.area}, {project.city}</p>
                            <p className="text-sm font-semibold mt-2">{project.priceFrom}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
