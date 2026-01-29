"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { PageWrapper, Section } from "@/components/layout";
import { Button, Badge, Skeleton } from "@/components/ui";
import { useProject } from "@/hooks";
import { categoryLabels, categoryColors, difficultyLabels, difficultyColors } from "@/types";
import { formatDate, cn, normalizeImageUrl } from "@/lib/utils";

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = use(params);
	const { data, isLoading, error } = useProject(slug);
	const project = data?.data;
	const safeThumbnail = normalizeImageUrl(project?.thumbnail);
	const safeGallery = project?.images?.map((image) => normalizeImageUrl(image)).filter(Boolean) as
		| string[]
		| undefined;

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
						<div className="w-24 h-24 mx-auto rounded-full bg-white/5 flex items-center justify-center">
							<span className="text-4xl">😕</span>
						</div>
						<h1 className="text-3xl font-bold text-white">Project Not Found</h1>
						<p className="text-white/60">
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

						{/* Header */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="space-y-6"
						>
							{/* Badges */}
							<div className="flex flex-wrap items-center gap-3">
								<Badge variant="gradient">{categoryLabels[project.category]}</Badge>
								<Badge className={difficultyColors[project.difficulty]}>
									{difficultyLabels[project.difficulty]}
								</Badge>
								{project.featured && (
									<Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
										⭐ Featured
									</Badge>
								)}
							</div>

							{/* Title */}
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">{project.title}</h1>

							{/* Summary */}
							<p className="text-xl text-white/60 leading-relaxed">{project.summary}</p>

							{/* Meta */}
							<div className="flex flex-wrap items-center gap-6 text-white/50">
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<span>{formatDate(project.createdAt)}</span>
								</div>
								<div className="flex items-center gap-2">
									<Tag className="w-4 h-4" />
									<span>{project.techStack.length} Technologies</span>
								</div>
							</div>

							{/* Links */}
							<div className="flex flex-wrap gap-4 pt-4">
								{project.githubUrl && (
									<motion.a
										href={project.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button variant="secondary">
											<Github className="w-5 h-5 mr-2" />
											View Source
										</Button>
									</motion.a>
								)}
								{project.liveUrl && (
									<motion.a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button>
											<ExternalLink className="w-5 h-5 mr-2" />
											Live Demo
										</Button>
									</motion.a>
								)}
							</div>
						</motion.div>
					</div>
				</Section>

				{/* Thumbnail */}
				{safeThumbnail && (
					<Section className="py-8">
						<div className="max-w-5xl mx-auto">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
							>
								<Image
									src={safeThumbnail}
									alt={project.title}
									fill
									sizes="(max-width: 1024px) 100vw, 80vw"
									unoptimized={safeThumbnail.startsWith("http")}
									className="object-cover"
									priority
								/>
								<div
									className={cn(
										"absolute inset-0 bg-linear-to-br opacity-20",
										categoryColors[project.category],
									)}
								/>
							</motion.div>
						</div>
					</Section>
				)}

				{/* Content */}
				<Section className="py-12">
					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
							{/* Main Content */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="lg:col-span-3"
							>
								<div className="prose-custom">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>{project.description}</ReactMarkdown>
								</div>
							</motion.div>

							{/* Sidebar */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 }}
								className="space-y-6"
							>
								{/* Tech Stack */}
								<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
									<h3 className="text-lg font-semibold text-white mb-4">Tech Stack</h3>
									<div className="flex flex-wrap gap-2">
										{project.techStack.map((tech) => (
											<span
												key={tech}
												className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-white/70 border border-white/10"
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								{/* Project Info */}
								<div className="p-6 rounded-2xl bg-white/5 border border-white/10">
									<h3 className="text-lg font-semibold text-white mb-4">Project Info</h3>
									<dl className="space-y-3 text-sm">
										<div className="flex justify-between">
											<dt className="text-white/50">Category</dt>
											<dd className="text-white">{categoryLabels[project.category]}</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-white/50">Difficulty</dt>
											<dd className="text-white">{difficultyLabels[project.difficulty]}</dd>
										</div>
										<div className="flex justify-between">
											<dt className="text-white/50">Created</dt>
											<dd className="text-white">{formatDate(project.createdAt)}</dd>
										</div>
									</dl>
								</div>
							</motion.div>
						</div>
					</div>
				</Section>

				{/* Image Gallery */}
				{safeGallery && safeGallery.length > 0 && (
					<Section className="py-12">
						<div className="max-w-5xl mx-auto">
							<h3 className="text-2xl font-bold text-white mb-8">Gallery</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								{safeGallery.map((image, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, scale: 0.95 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.1 }}
										className="relative aspect-video rounded-xl overflow-hidden border border-white/10"
									>
										<Image
											src={image}
											alt={`${project.title} screenshot ${index + 1}`}
											fill
											sizes="(max-width: 1024px) 100vw, 50vw"
											unoptimized={image.startsWith("http")}
											className="object-cover"
										/>
									</motion.div>
								))}
							</div>
						</div>
					</Section>
				)}
			</article>
		</PageWrapper>
	);
}
