
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

// Define the types for our search results based on placeholder-data.json
interface Project {
    id: string;
    name: string;
    developer: string;
    area: string;
    priceFrom: string;
    thumbnailUrl: string;
    tags: string[];
}

interface SearchResultsProps {
    results: {
        projects?: Project[];
        // We can add other result types here later, e.g., developers, articles, etc.
    };
    loading: boolean;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export function SearchResults({ results, loading }: SearchResultsProps) {
    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    const hasResults = results.projects && results.projects.length > 0;

    if (!hasResults) {
        return <div className="text-center p-8 text-muted-foreground">No results found.</div>;
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {results.projects?.map(project => (
                <motion.div key={project.id} variants={itemVariants}>
                    <Card className="h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-48 w-full">
                            <Image
                                src={project.thumbnailUrl}
                                alt={project.name}
                                layout="fill"
                                objectFit="cover"
                                className="group-hover:scale-105 transition-transform duration-300"
                            />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                             <Badge variant="secondary" className="absolute top-2 right-2">{project.developer}</Badge>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg truncate">{project.name}</h3>
                            <p className="text-muted-foreground text-sm">{project.area}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <p className="text-xs text-muted-foreground">Starting from</p>
                                    <p className="font-semibold">{project.priceFrom}</p>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}
