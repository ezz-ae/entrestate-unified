import { NextRequest, NextResponse } from "next/server";
import { getApifyClient } from "@/lib/apify";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = getApifyClient();

  // Call your Apify actor for Bayut scraping
  const run = await client.actor("bayut-scraper-actor-id").call(body);

  const { items } = await client.dataset(run.defaultDatasetId!).listItems();
  return NextResponse.json({ ok: true, items });
}
