'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

const courses = [
	{
		title: "Real Estate OS Mastery",
		description:
			"Learn how to leverage the full power of the Entrestate ecosystem.",
		modules: 12,
	},
	{
		title: "AI for Real Estate Agents",
		description:
			"An introduction to using AI tools like WhatsMap to boost your productivity.",
		modules: 8,
	},
	{
		title: "Lead Generation & Automation",
		description:
			"Master the art of generating and nurturing leads with automated workflows.",
		modules: 10,
	},
];

export default function AcademyPage() {
	return (
		<div className="bg-background">
			<main>
				<PageHeader
					title="Entrestate Academy"
					description="Your AI-powered learning space for becoming a top-tier real estate professional."
				/>
				<div className="container mx-auto px-4 md:px-8 py-12">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-bold">Entrestate Academy</h1>
						<p className="mt-2 text-lg text-muted-foreground">
							Master the tools and strategies to excel in the modern real estate
							market.
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{courses.map((course) => (
							<Link href="#" key={course.title}>
								<Card className="h-full hover:shadow-lg transition-shadow">
									<CardHeader>
										<PlayCircle className="h-8 w-8 text-primary mb-2" />
										<CardTitle>{course.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground">
											{course.description}
										</p>
										<p className="text-sm font-medium text-muted-foreground mt-4">
											{course.modules} modules
										</p>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
