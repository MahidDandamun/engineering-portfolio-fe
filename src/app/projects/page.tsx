"use client";

import { Suspense } from "react";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { ErrorBoundary } from "@/components/ui";
import { ProjectsContent } from "@/components/projects/page/ProjectsContent";
import { ProjectsLoading } from "@/components/projects/page/ProjectsLoading";

export default function ProjectsPage() {
	return (
		<ErrorBoundary>
			<PageWrapper>
				<Section className="pt-32">
					<SectionHeader
						title="All Projects"
						subtitle="Explore my work across different domains and technologies"
					/>
					<Suspense fallback={<ProjectsLoading />}>
						<ProjectsContent />
					</Suspense>
				</Section>
			</PageWrapper>
		</ErrorBoundary>
	);
}
