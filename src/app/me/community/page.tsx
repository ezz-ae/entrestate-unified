
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Bell, Sparkles, Rss } from "lucide-react";
import { useEffect, useState } from "react";
import { generateCommunityPost } from "@/ai/flows/community/generate-community-post";
import { RecommendedForYou } from "@/components/community/recommended-for-you";
import { Skeleton } from "@/components/ui/skeleton";

export default function CommunityHubPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        const postTypes: any[] = ['market-insight', 'daily-tip', 'conversation-starter', 'who-knows-question', 'top-rank-announcement'];
        const newPosts = [];
        for (const postType of postTypes) {
            try {
                const post = await generateCommunityPost({ postType, market: { name: 'Dubai' } });
                newPosts.push({ ...post, id: Date.now() + Math.random() });
            } catch (error) {
                console.error(`Error generating post of type ${postType}:`, error);
            }
        }
        // Simulate a mix of AI and user posts
        setPosts(newPosts.sort(() => Math.random() - 0.5));
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const MyDayRing = () => (
        <Card className="mb-6">
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <p className="font-bold text-lg">Just Closed a Deal?</p>
                    <p className="text-sm text-muted-foreground">Celebrate your success with the entire community!</p>
                </div>
                <Button size="lg" className="rounded-full w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <Bell className="h-10 w-10" />
                </Button>
            </CardContent>
        </Card>
    );

    const PostSkeleton = () => (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-start">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="ml-4 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const CommunityPost = ({ post }: { post: any }) => (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-start">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <p className="font-semibold text-sm">{post.author} <span className="font-normal text-xs text-muted-foreground"> - {post.authorTitle}</span></p>
                        <p className="mt-1 text-base">{post.content}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-12 gap-8 p-4 md:p-8">
            <div className="col-span-12 lg:col-span-8">
                 <PageHeader title="Community Hub" description="The intelligent pulse of the Dubai real estate market." />
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <Textarea placeholder="Share an update, ask a question, or celebrate a win..." className="mb-2" />
                        <Button>Post to Feed</Button>
                    </CardContent>
                </Card>
                <MyDayRing />
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Rss className="h-5 w-5" /> Live Feed</h2>
                {loading ? (
                    <div>
                        <PostSkeleton />
                        <PostSkeleton />
                        <PostSkeleton />
                    </div>
                ) : (
                    posts.map(post => <CommunityPost key={post.id} post={post} />)
                )}
            </div>
            <div className="col-span-12 lg:col-span-4">
                <RecommendedForYou />
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center text-base"><Calendar className="h-4 w-4 mr-2" />Industry Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No upcoming events.</p>
                    </CardContent>
                </Card>
                <Card className="mt-6">
                     <CardHeader>
                        <CardTitle className="flex items-center text-base"><Sparkles className="h-4 w-4 mr-2" />Project Launches</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No upcoming launches.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
