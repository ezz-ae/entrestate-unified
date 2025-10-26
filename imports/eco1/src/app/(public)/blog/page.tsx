
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";
import { useEffect, useState } from "react";
import { generateBlogPost } from "@/ai/flows/blog/generate-blog-post";

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const topics = [
                "The Future of Real Estate: How AI is Changing the Game",
                "Top 5 Off-Plan Investment Opportunities in Dubai",
                "How to Use Data to Make Smarter Real Estate Decisions",
            ];
            const newPosts = [];
            for (const topic of topics) {
                try {
                    const post = await generateBlogPost({ topic, market: { name: 'Dubai' } });
                    newPosts.push({ ...post, id: topic.toLowerCase().replace(/\s/g, '-') });
                } catch (error) {
                    console.error(`Error generating post for topic ${topic}:`, error);
                }
            }
            setPosts(newPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="The Entrestate Blog"
                    description="Your source for the latest news, insights, and analysis on the Dubai real estate market."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <Card key={post.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{post.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{post.content.substring(0, 150)}...</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/blog/${post.id}`} className="w-full">
                                            <Button className="w-full">
                                                Read More <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
