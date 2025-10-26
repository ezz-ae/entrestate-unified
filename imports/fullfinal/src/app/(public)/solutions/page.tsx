import { toolsData, ToolData } from "@/lib/tools-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Suite {
  name: string;
  description: string;
  tools: ToolData[];
}

const suites: Suite[] = toolsData.reduce((acc: Suite[], tool) => {
  tool.categories.forEach(category => {
    let suite = acc.find(s => s.name === category);
    if (!suite) {
      suite = { name: category, description: `A collection of tools for ${category.toLowerCase()}.`, tools: [] };
      acc.push(suite);
    }
    suite.tools.push(tool);
  });
  return acc;
}, []);

export default function SolutionsPage() {
  return (
    <div className="container py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Our Solutions</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover the AI-powered suites designed to power every aspect of your real estate business.
        </p>
      </div>
      <div className="mt-12 space-y-12">
        {suites.map((suite) => (
          <div key={suite.name}>
            <h2 className="text-2xl font-bold tracking-tight">{suite.name}</h2>
            <p className="text-muted-foreground mb-4">{suite.description}</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {suite.tools.map((tool) => (                
                  <Card key={tool.id} className="hover:border-primary transition-colors">
                    <Link href={`/solutions/${slugify(suite.name)}#${tool.id}`} className="block h-full">
                      <CardHeader>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                    </Link>
                  </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}