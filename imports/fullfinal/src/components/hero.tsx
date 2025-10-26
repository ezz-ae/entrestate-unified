"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
	const [query, setQuery] = useState("");
	const router = useRouter();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/market-library?q=${encodeURIComponent(query)}`);
	};

	return (
		<section className="container mx-auto px-4 py-20 md:py-32 text-center">
			<h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
				The Operating System for Real Estate
			</h1>
			<p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
				Leverage AI-powered tools, a real-time market database, and automation
				to close more deals, faster.
			</p>
			<div className="mt-8 max-w-xl mx-auto">
				<form onSubmit={handleSearch} className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search for projects, developers, or locations..."
						className="w-full rounded-full pl-10 pr-28 h-12"
					/>
					<Button
						type="submit"
						className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
					>
						Search
					</Button>
				</form>
			</div>
			<div className="mt-4">
				<Button variant="link" asChild>
					<Link href="/login">Or sign in to access your dashboard</Link>
				</Button>
			</div>
		</section>
	);
}
