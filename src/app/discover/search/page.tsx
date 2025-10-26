
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchResults } from '@/components/ai/SearchResults';
import placeholderData from '@/lib/placeholder-data.json';

// Define the structure of our search results
interface SearchResultData {
    projects?: typeof placeholderData.projects;
}

function SearchPageContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<SearchResultData>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Simulate an API call
        const timer = setTimeout(() => {
            if (initialQuery) {
                const filteredProjects = placeholderData.projects.filter(p => 
                    p.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
                    p.developer.toLowerCase().includes(initialQuery.toLowerCase()) ||
                    p.area.toLowerCase().includes(initialQuery.toLowerCase())
                );
                setResults({ projects: filteredProjects });
            } else {
                // Return all projects if there's no query
                setResults({ projects: placeholderData.projects });
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // This would trigger a navigation to update the query param,
        // which in turn triggers the useEffect above.
        window.history.pushState(null, '', `?q=${encodeURIComponent(query)}`);
        // Manually trigger the effect for immediate feedback
        const event = new PopStateEvent('popstate');
        window.dispatchEvent(event);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold font-heading mb-2">Market Search</h1>
                    <p className="text-muted-foreground">
                        Search for projects, developers, and areas across the market.
                    </p>
                    <form onSubmit={handleSearch} className="relative mt-4 max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., 'Emaar Beachfront' or 'Downtown Dubai'"
                            className="w-full h-12 pl-10"
                        />
                        <button type="submit" className="hidden">Search</button>
                    </form>
                </header>

                <section>
                    <Suspense fallback={<div>Loading results...</div>}>
                        <SearchResults results={results} loading={loading} />
                    </Suspense>
                </section>
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}
