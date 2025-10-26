import { Metadata } from "next";
import { getProjectBySlug } from "@/src/lib/projects";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProjectBySlug(params.slug);
  const title = p ? `${p.name} – Entrestate` : "Project – Entrestate";
  const desc = p?.city ? `${p.name} in ${p.city}. Explore pricing, status, and availability.` : "Explore project details.";
  return { title, description: desc };
}

export default async function ProjectPage({ params }: Props) {
  const p = await getProjectBySlug(params.slug);
  if (!p) return <div><h1 className="text-2xl font-semibold">Project not found</h1></div>;
  return (
    <div>
      <h1 className="text-3xl font-semibold">{p.name}</h1>
      <p className="text-neutral-600 mt-1">{p.city || "—"} · {p.status || "unknown"}</p>
      {typeof p.priceFrom === "number" && <p className="mt-2">From AED {p.priceFrom.toLocaleString()}</p>}
      <div className="mt-4 flex gap-2">
        <a href={`/whatsmap?ask=compare ${encodeURIComponent(p.slug)} and another`} className="btn-outline">Compare</a>
        <a href={`/whatsmap?ask=pdf ${encodeURIComponent(p.slug)}`} className="btn-outline">Generate PDF</a>
      </div>
    </div>
  );
}
