'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { generateBlogPost } from "@/ai/flows/blog/generate-blog-post";
import Markdown from 'react-markdown';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchPost = async () => {
          setLoading(true);
          try {
              const topic = slug.replace(/-/g, ' ');
              const post = await generateBlogPost({ topic, market: { name: 'Dubai' } });
              setPost(post);
          } catch (error) {
              console.error(`Error generating post for topic ${slug}:`, error);
          } finally {
              setLoading(false);
          }
      };

      if (slug) {
          fetchPost();
      }
  }, [slug]);

  if (loading) {
      return <p>Loading post...</p>;
  }

  if (!post) {
      return <div>Post not found.</div>;
  }

  return (
      <div className="bg-background">
          <main>
              <PageHeader
                  title={post.title}
              />
              <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl prose">
                  <Markdown>{post.content}</Markdown>
              </div>
          </main>
      </div>
  );
}
