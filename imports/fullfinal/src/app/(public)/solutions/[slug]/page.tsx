import { toolsData, ToolData } from "@/lib/tools-data";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from 'next';

interface Suite {
  name: string;
  description: string;
  tools: ToolData[];
}

const getSuites = (): Suite[] => {
  return toolsData.reduce((acc: Suite[], tool) => {
    tool.categories.forEach(category => {
      let suite = acc.find(s => s.name === category);
      if (!suite) {
        suite = { name: category, description: `A collection of tools for ${category.toLowerCase()}.`, tools: [] };
        acc.push(suite);
      }
      if (!suite.tools.find(t => t.id === tool.id)) {
        suite.tools.push(tool);
      }
    });
    return acc;
  }, []);
};

const getSuiteBySlug = (slug: string): Suite | undefined => {
  const suites = getSuites();
  return suites.find(suite => slugify(suite.name) === slug);
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const suite = getSuiteBySlug(params.slug);

  if (!suite) {
    return {
      title: "Solution Not Found",
      description: "The requested solution could not be found.",
    };
  }

  return {
    title: `${suite.name} | Entrestate Solutions`,
    description: `Explore the ${suite.name} suite of AI-powered tools. ${suite.description}`,
  };
}

export default function SuitePage({ params }: { params: { slug: string } }) {
  const suite = getSuiteBySlug(params.slug);

  if (!suite) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{suite.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {suite.description}
        </p>
        <Button asChild size="lg" className="mt-8">
            <Link href="/sign-up">Get Started with {suite.name}</Link>
        </Button>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Tools Included in this Suite</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {suite.tools.map((tool) => (
            <Card key={tool.id} id={tool.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <h4 className="font-semibold mb-2 text-sm">Key Features:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> <span>{feature}</span></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}