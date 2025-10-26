import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    slug: "ai-in-real-estate-trends-2024",
    title: "AI in Real Estate: Top 5 Trends to Watch in 2024",
    description: "From predictive analytics to hyper-personalized marketing, AI is reshaping the property landscape. Here's what you need to know.",
    author: "Jane Doe",
    date: "October 26, 2023",
  },
  {
    slug: "mastering-lead-intelligence",
    title: "How to Master Lead Intelligence and Close More Deals",
    description: "Stop chasing cold leads. Learn how to use AI to identify, score, and engage high-intent prospects automatically.",
    author: "John Smith",
    date: "October 22, 2023",
  },
  {
    slug: "the-future-of-proptech",
    title: "The Future of PropTech is Conversational",
    description: "Discover why conversational AI like WhatsMAP is becoming the central nervous system for modern real estate operations.",
    author: "Alex Ray",
    date: "October 18, 2023",
  },
];

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">The Entrestate Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights, strategies, and analysis from the forefront of real estate technology.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <p className="text-xs text-muted-foreground">{post.date} by {post.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}