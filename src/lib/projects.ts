import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { mk, splitMK } from "./market";
import fs from "node:fs/promises";
import path from "node:path";

export async function getCatalogForMarket(country: string, city: string, devs?: string[], limit = 20) {
  const base = collection(db as any, "projects_catalog");
  const constraints:any[] = [ where("country","==",country), where("city","==",city) ];
  const snap = await getDocs(query(base, ...constraints));
  const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
  return devs?.length ? all.filter(p => devs.includes(p.developer)).slice(0, limit) : all.slice(0, limit);
}

export async function getLibrary(uid: string, marketKey: string) {
  const ref = doc(db as any, "projects_library", `${uid}_${marketKey}`);
  const s = await getDoc(ref);
  return s.exists() ? (s.data().items as any[]) : [];
}

export async function saveLibrary(uid: string, marketKey: string, items: any[]) {
  const ref = doc(db as any, "projects_library", `${uid}_${marketKey}`);
  await setDoc(ref, { uid, marketKey, items, ts: Date.now() }, { merge: true });
}

type ProjectLike = {
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

  // 1) Try Firestore if you already have a server-side admin helper
  try {
    const { getFirestore } = await import("firebase-admin/firestore");
    const { app } = await import("@/server/firebaseAdmin"); // create this if not present
    const db = getFirestore(app);
    const snap = await db.collection("projects_catalog").limit(5000).get();
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ProjectLike[];
    if (docs.length) {
      cache.all = docs;
      return docs;
    }
  } catch {
    // ignore and fall back to JSON
  }

  // 2) Fallback to local JSON
  try {
    const p = path.join(process.cwd(), "data", "projects_full.json");
    const raw = await fs.readFile(p, "utf-8");
    cache.all = JSON.parse(raw);
    return cache.all!;
  } catch {
    return [];
  }
}
