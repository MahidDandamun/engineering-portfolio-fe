"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/layout";
import { ProjectGrid } from "@/components/projects";
import { Button } from "@/components/ui";
import { useFeaturedProjects } from "@/hooks";

export function FeaturedProjects() {
	const { data, isLoading } = useFeaturedProjects();

	return (
		<Section id="featured-projects">
			<SectionHeader
				title="Featured Projects"
				subtitle="Handpicked projects showcasing my best work across different domains"
			/>

			<ProjectGrid projects={data?.data || []} isLoading={isLoading} emptyMessage="No featured projects yet" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.3 }}
				className="mt-12 text-center"
			>
				<Link href="/projects">
					<Button variant="outline" size="lg" className="group">
						View All Projects
						<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
				</Link>
			</motion.div>
		</Section>
	);
}
