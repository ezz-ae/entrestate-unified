import { Bot, BookOpen, Zap } from "lucide-react";

const features = [
	{
		icon: <Bot className="h-10 w-10 text-primary" />,
		title: "WhatsMap AI Assistant",
		description:
			"Your 24/7 real estate analyst on WhatsApp. Get instant project data, AI-powered comparisons, and generate full PDF reports on the go.",
	},
	{
		icon: <BookOpen className="h-10 w-10 text-primary" />,
		title: "Real-Time Market Library",
		description:
			"Access a live, searchable database of thousands of projects. Filter by developer, status, city, and price to find the perfect opportunity.",
	},
	{
		icon: <Zap className="h-10 w-10 text-primary" />,
		title: "Automation Flows",
		description:
			"Automate your workflows. Trigger actions from new leads, schedule reports, and connect your favorite apps to the Entrestate ecosystem.",
	},
];

export function Features() {
	return (
		<section id="features" className="container mx-auto px-4 py-16">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold">
					A Powerful Suite of AI Tools
				</h2>
				<p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
					From lead to closing, Entrestate provides the intelligence you need.
				</p>
			</div>
			<div className="grid gap-8 md:grid-cols-3">
				{features.map((feature) => (
					<div
						key={feature.title}
						className="flex flex-col items-center text-center p-6 border rounded-lg"
					>
						{feature.icon}
						<h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
						<p className="mt-2 text-muted-foreground">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
