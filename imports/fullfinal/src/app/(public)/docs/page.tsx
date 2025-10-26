'use client';

import Link from "next/link";

const docSections = [
	{
		title: "Getting Started",
		links: [
			{ href: "/docs/intro", title: "Introduction" },
			{ href: "/docs/setup", title: "Account Setup" },
		],
	},
	{
		title: "Core Features",
		links: [
			{ href: "/docs/project-book", title: "Project Book" },
			{ href: "/docs/whatsmap", title: "WhatsMap AI" },
			{ href: "/docs/flows", title: "Automation Flows" },
		],
	},
];

export default function DocsPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex flex-col md:flex-row gap-12">
				<aside className="w-full md:w-1/4">
					<h2 className="text-lg font-semibold mb-4">Documentation</h2>
					<nav className="flex flex-col gap-4">
						{docSections.map((section) => (
							<div key={section.title}>
								<h3 className="font-semibold mb-2">{section.title}</h3>
								<ul className="flex flex-col gap-1 pl-2">
									{section.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-muted-foreground hover:text-foreground"
											>
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</aside>
				<div className="w-full md:w-3/4 prose lg:prose-xl">
					<h1>Introduction</h1>
					<p>
						Welcome to the Entrestate documentation. Here you'll find everything
						you need to know to get the most out of our platform.
					</p>
					<p>
						Use the navigation on the left to jump to a specific topic. If you
						can't find what you're looking for, feel free to contact our support
						team.
					</p>
				</div>
			</div>
		</main>
	);
}
