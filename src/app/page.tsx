"use client";

import { PageWrapper } from "@/components/layout";
import { Hero, Skills, FeaturedProjects, ContactCTA } from "@/components/home";
import { ErrorBoundary } from "@/components/ui";

export default function HomePage() {
	return (
		<ErrorBoundary>
			<PageWrapper>
				<Hero />
				<Skills />
				<FeaturedProjects />
				<ContactCTA />
			</PageWrapper>
		</ErrorBoundary>
	);
}
