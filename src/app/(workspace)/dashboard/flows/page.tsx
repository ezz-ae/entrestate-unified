import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, GitCompareArrows, Bot } from "lucide-react";

const flowTemplates = [
	{
		icon: <GitCompareArrows className="h-6 w-6 text-primary" />,
		title: "Project Comparison",
		description:
			"Triggered by WhatsMap AI to compare two or more projects, generating a detailed analysis.",
		status: "Ready",
	},
	{
		icon: <FileText className="h-6 w-6 text-primary" />,
		title: "PDF Report Generation",
		description:
			"Triggered by WhatsMap AI to create a comprehensive PDF brochure for a specific project.",
		status: "Ready",
	},
	{
		icon: <Bot className="h-6 w-6 text-primary" />,
		title: "New Lead Follow-up",
		description:
			"A custom flow that engages new leads from your Meta Ad campaigns automatically.",
		status: "Active",
	},
];

export default function FlowsPage() {
	return (
		<div className="p-4 md:p-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Automation Flows</h1>
				<Button>Create Custom Flow</Button>
			</div>
			<div className="mb-8">
				<h2 className="text-xl font-semibold">Job History</h2>
				<div className="mt-4 border rounded-lg p-8 text-center text-muted-foreground">
					<p>Jobs triggered by the AI will appear here in real-time.</p>
				</div>
			</div>
			<div>
				<h2 className="text-xl font-semibold mb-4">Flow Templates</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{flowTemplates.map((flow) => (
						<Card key={flow.title}>
							<CardHeader className="flex flex-row items-start gap-4">
								{flow.icon}
								<div>
									<CardTitle>{flow.title}</CardTitle>
									<CardDescription>{flow.description}</CardDescription>
								</div>
							</CardHeader>
							<CardFooter className="flex justify-between">
								<Badge
									variant={
										flow.status === "Active"
											? "default"
											: "secondary"
									}
								>
									{flow.status}
								</Badge>
								<Button variant="outline" size="sm">
									Configure
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
