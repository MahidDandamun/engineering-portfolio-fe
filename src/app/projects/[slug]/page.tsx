"use client";

import { use } from "react";
import { Skeleton, ErrorBoundary, Button } from "@/components/ui";
import { normalizeImageUrl, cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ProjectHeader } from "@/components/projects/detail/ProjectHeader";
import { ProjectThumbnail } from "@/components/projects/detail/ProjectThumbnail";
import { ProjectContent } from "@/components/projects/detail/ProjectContent";
import { ProjectSidebar } from "@/components/projects/detail/ProjectSidebar";
import { ProjectGallery } from "@/components/projects/detail/ProjectGallery";
import { PageWrapper, Section } from "@/components/layout";
import { useTheme } from "@/context";
import { useProject } from "@/hooks";

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = use(params);
	const { isGhibli } = useTheme();
	const { data, isLoading, error } = useProject(slug);
	const project = data?.data;
	const safeThumbnail = normalizeImageUrl(project?.thumbnail);
	const safeGallery = (project?.images?.map((image: string) => normalizeImageUrl(image)).filter(Boolean) ??
		[]) as string[];

	if (isLoading) {
		return (
			<PageWrapper>
				<Section className="pt-32">
					<div className="max-w-4xl mx-auto space-y-8">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-12 w-3/4" />
						<Skeleton className="h-6 w-1/2" />
						<Skeleton className="h-100 w-full rounded-2xl" />
						<div className="space-y-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					</div>
				</Section>
			</PageWrapper>
		);
	}

	if (error || !project) {
		return (
			<PageWrapper>
				<Section className="pt-32">
					<div className="max-w-4xl mx-auto text-center space-y-6">
						<div
							className={cn(
								"w-24 h-24 mx-auto rounded-full flex items-center justify-center",
								isGhibli ? "bg-slate-200" : "bg-white/5",
							)}
						>
							<span className="text-4xl">😕</span>
						</div>
						<h1 className={cn("text-3xl font-bold", isGhibli ? "text-slate-900" : "text-white")}>
							Project Not Found
						</h1>
						<p className={isGhibli ? "text-slate-600" : "text-white/60"}>
							The project you&apos;re looking for doesn&apos;t exist or has been removed.
						</p>
						<Link href="/projects">
							<Button>
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Projects
							</Button>
						</Link>
					</div>
				</Section>
			</PageWrapper>
		);
	}

	return (
		<ErrorBoundary>
			<PageWrapper>
				<article>
					{/* Hero Section */}
					<Section className="pt-32 pb-12">
						<div className="max-w-4xl mx-auto">
							{/* Back button */}
							<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
								<Link
									href="/projects"
									className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
								>
									<ArrowLeft className="w-4 h-4" />
									Back to Projects
								</Link>
							</motion.div>
							<ProjectHeader project={project} isGhibli={isGhibli} />
						</div>
					</Section>

					{/* Thumbnail */}
					{safeThumbnail && (
						<Section className="py-8">
							<div className="max-w-5xl mx-auto">
								<ProjectThumbnail src={safeThumbnail} alt={project.title} category={project.category} />
							</div>
						</Section>
					)}

					{/* Content */}
					<Section className="py-12">
						<div className="max-w-4xl mx-auto">
							<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
								{/* Main Content */}
								<ProjectContent description={project.description} />
								{/* Sidebar */}
								<ProjectSidebar project={project} isGhibli={isGhibli} />
							</div>
						</div>
					</Section>

					{/* Image Gallery */}
					<ProjectGallery images={safeGallery} title={project.title} isGhibli={isGhibli} />
				</article>
			</PageWrapper>
		</ErrorBoundary>
	);
}
