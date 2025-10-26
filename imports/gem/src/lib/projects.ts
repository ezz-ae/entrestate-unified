import fs from "node:fs/promises";
import path from "node:path";

export type ProjectLike = {
  id?: string;
  name: string;
  slug: string;
  developerId?: string;
  city?: string;
  priceFrom?: number;
  status?: string;
  lastVerifiedAt?: number;
};

const cache: { all?: ProjectLike[] } = {};

export async function getAllProjects(): Promise<ProjectLike[]> {
  if (cache.all) return cache.all;
  try {
    const p = path.join(process.cwd(), "data", "projects_full.json");
    const raw = await fs.readFile(p, "utf-8");
    cache.all = JSON.parse(raw);
    return cache.all!;
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectLike | null> {
  const all = await getAllProjects();
  return all.find(p => p.slug === slug) ?? null;
}
