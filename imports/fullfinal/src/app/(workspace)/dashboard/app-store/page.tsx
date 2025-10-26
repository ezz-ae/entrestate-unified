import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const apps = [
	{ title: "Meta Ads", description: "Sync leads directly from your Meta Ad campaigns.", connected: true },
	{ title: "Google Sheets", description: "Export reports and data to Google Sheets.", connected: false },
	{ title: "Zapier", description: "Connect Entrestate to thousands of other apps.", connected: false },
];

export default function AppStorePage() {
	return (
		<div className="p-4 md:p-8">
			<h1 className="text-2xl font-bold mb-6">App Store & Integrations</h1>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{apps.map((app) => (
					<Card key={app.title}>
						<CardHeader>
							<CardTitle>{app.title}</CardTitle>
							<CardDescription>{app.description}</CardDescription>
						</CardHeader>
						<CardFooter>
							<Button variant={app.connected ? "secondary" : "default"}>{app.connected ? "Manage" : "Connect"}</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
