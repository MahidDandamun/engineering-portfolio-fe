"use client";

import { PageWrapper } from "@/components/layout";
import { Hero, Skills, FeaturedProjects, ContactCTA } from "@/components/home";

export default function HomePage() {
	return (
		<PageWrapper>
			<Hero />
			<Skills />
			<FeaturedProjects />
			<ContactCTA />
		</PageWrapper>
	);
}
