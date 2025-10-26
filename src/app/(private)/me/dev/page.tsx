import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevPanelPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">DEV Panel</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>API Keys & Quotas</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>GEMINI_API_KEY: Loaded</p>
            <p>META_TOKEN: Loaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Data & Sync Actions</CardTitle></CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline">Reseed Projects</Button>
            <Button variant="outline">Invalidate Cache</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
