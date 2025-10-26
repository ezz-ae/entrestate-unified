import { getAllProjects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const projects = await getAllProjects();
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="h-96 bg-muted rounded-lg flex items-center justify-center mb-4">
            <p>Image Gallery</p>
          </div>
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">{project.status || 'N/A'}</Badge>
          <h1 className="text-4xl font-bold">{project.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{project.city || 'Location not specified'}</p>
          
          {typeof project.priceFrom === 'number' && (
            <p className="text-3xl font-semibold mt-6">
              From AED {project.priceFrom.toLocaleString()}
            </p>
          )}

          <div className="mt-8 space-y-4">
            <p>Project description and details will be displayed here.</p>
          </div>

          <div className="mt-8">
            <Button size="lg">Request a Call Back</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
