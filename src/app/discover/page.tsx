
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Project } from "@/services/data-intelligence";
import Image from "next/image";
import { Search, BrainCircuit, BarChart, Bot, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function DiscoverPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [interpretation, setInterpretation] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        setResults([]);
        setInterpretation('');
        setHasSearched(true);

        try {
            const result = await runWhatsMAP({ query: searchTerm, isPublic: true });
            const textResponse = result.response.find(r => r.type === 'text');
            if (textResponse) {
                setInterpretation(textResponse.data.text);
            }
            setResults(result.response.filter(r => r.type !== 'text' && r.type !== 'onboarding'));

        } catch (error) {
            console.error("Search failed:", error);
            setInterpretation("An error occurred while searching. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const ResultComponent = ({ component, index }: { component: any, index: number }) => {
        if (component.type === 'project_results' || component.type === 'project-carousel') {
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                     <h3 className="text-2xl font-bold mb-4">Matching Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {component.data.projects.map((project: Project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                                <CardContent className="p-0">
                                    <Image src={project.thumbnailUrl} alt={project.name} width={400} height={250} className="rounded-t-lg object-cover" />
                                    <div className="p-4">
                                        <h4 className="font-semibold">{project.name}</h4>
                                        <p className="text-sm text-muted-foreground">{project.developer}</p>
                                        <p className="text-sm font-bold mt-2">{project.priceFrom}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            );
        }
         if (component.type === 'pdf-generation-cta') {
            return (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="bg-muted/50">
                        <CardContent className="p-4 flex items-center justify-between">
                            <p className="font-semibold">Would you like a detailed PDF comparison of these projects?</p>
                            <Button>Generate PDF Report</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )
        }
        return null;
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="The Discovery Hub"
                description="The intelligent front door to the Dubai real estate market. Ask a question, find a property, or analyze a trend."
            />
            <div className="max-w-3xl mx-auto mt-8">
                <div className="flex space-x-2">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ask the market... e.g., 'Compare Emaar Beachfront and DAMAC Lagoons in a PDF'"
                        className="p-6 text-lg"
                    />
                    <Button onClick={handleSearch} disabled={loading} size="lg">
                        {loading ? 'Thinking...' : <Search />}
                    </Button>
                </div>
            </div>
            <div className="mt-12 max-w-5xl mx-auto">
                <AnimatePresence>
                    {loading && <p className="text-center text-muted-foreground">Communicating with the market...</p>}
                    {interpretation && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Card className="bg-primary/5 border-primary/20 mb-6">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-md"><Bot className="h-5 w-5 text-primary" /> Gemini's Understanding</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-lg">"{interpretation}"</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    <div className="space-y-6">
                        {results.map((r, i) => <ResultComponent key={i} component={r} index={i} />)}
                    </div>
                     {hasSearched && !loading && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                             <Card className="mt-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                <CardHeader>
                                    <CardTitle>This is Just the Beginning.</CardTitle>
                                    <CardDescription className="text-blue-100">You've seen a fraction of our AI's power. Sign up to unlock the full Intelligence OS.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Link href="/login">
                                        <Button size="lg" variant="secondary">
                                            Unlock All Features <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
