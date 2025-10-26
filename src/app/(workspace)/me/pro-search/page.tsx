
import { Card } from "@/components/ui/card";

export default function ProSearchDashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Pro‑Search</h1>
      <section className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold">Connect Feeds</h3>
                <p className="text-sm text-muted-foreground">RSS/XML, sitemap, CSV, API</p>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg">Add Feed</button>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold">Indexing Status</h3>
                <p className="text-sm text-muted-foreground">Docs, embeddings, errors</p>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg">Open Monitor</button>
        </Card>
        <Card className="p-4 flex flex-col justify-between">
            <div>
                <h3 className="font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground">Issue & revoke keys</p>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-lg">Manage</button>
        </Card>
      </section>
    </main>
  );
}
