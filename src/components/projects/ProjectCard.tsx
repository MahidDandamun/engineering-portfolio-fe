"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";
import { Project, categoryLabels, categoryColors, difficultyLabels, difficultyColors } from "@/types";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { useTheme } from "@/context";
import { getTechIcon } from "@/lib/dummyData";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
	project: Project;
	index?: number;
}

// Tech badge with icon
function TechBadge({ tech, isGhibli }: { tech: string; isGhibli: boolean }) {
	const iconUrl = getTechIcon(tech);

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors",
				isGhibli
					? "bg-white/60 text-slate-600 border-slate-200/50"
					: "bg-white/5 text-white/70 border-white/10",
			)}
		>
			{iconUrl && (
				<Image
					src={iconUrl}
					alt={tech}
					width={14}
					height={14}
					className="w-3.5 h-3.5 object-contain"
					unoptimized
				/>
			)}
			{tech}
		</span>
	);
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
	const { isGhibli } = useTheme();
	const router = useRouter();
	const safeThumbnail = normalizeImageUrl(project.thumbnail);

	const handleNavigate = () => {
		router.push(`/projects/${project.slug}`);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			handleNavigate();
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-20px" }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="group relative"
		>
			<motion.div
				whileHover={{ y: -8 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className={cn(
					"relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer",
					isGhibli
						? "bg-white/80 border-slate-200/50 hover:shadow-xl hover:shadow-amber-100/30"
						: "bg-linear-to-br from-white/5 to-white/2 border-white/10 hover:border-purple-500/30",
				)}
				onClick={handleNavigate}
				onKeyDown={handleKeyDown}
				role="link"
				tabIndex={0}
				aria-label={`View details for ${project.title}`}
				style={{ willChange: "transform" }}
			>
				{/* Glow effect on hover */}
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<div
						className={cn(
							"absolute inset-0 bg-linear-to-br opacity-20 blur-xl",
							categoryColors[project.category],
						)}
					/>
				</div>

				{/* Thumbnail */}
				<div className="relative aspect-video overflow-hidden">
					{safeThumbnail ? (
						<Image
							src={safeThumbnail}
							alt={project.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							unoptimized={safeThumbnail.startsWith("http")}
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							style={{ willChange: "transform" }}
						/>
					) : (
						<div
							className={cn(
								"absolute inset-0 bg-linear-to-br opacity-30",
								categoryColors[project.category],
							)}
						/>
					)}

					{/* Category badge overlay */}
					<div className="absolute top-4 left-4">
						<Badge variant="gradient" className="backdrop-blur-md">
							{categoryLabels[project.category]}
						</Badge>
					</div>

					{/* Featured badge */}
					{project.featured && (
						<div className="absolute top-4 right-4">
							<Badge
								className={cn(
									"border",
									isGhibli
										? "bg-amber-100/90 text-amber-700 border-amber-300"
										: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
								)}
							>
								⭐ Featured
							</Badge>
						</div>
					)}

					{/* Gradient overlay */}
					<div
						className={cn(
							"absolute inset-0 bg-linear-to-t via-transparent to-transparent",
							isGhibli ? "from-white" : "from-slate-900",
						)}
					/>
				</div>

				{/* Content */}
				<div className="relative p-6 space-y-4">
					{/* Title & Difficulty */}
					<div className="space-y-2">
						<div className="flex items-start justify-between gap-4">
							<h3
								className={cn(
									"text-xl font-semibold transition-colors",
									isGhibli
										? "text-slate-800 group-hover:text-red-500"
										: "text-white group-hover:text-violet-400",
								)}
							>
								{project.title}
							</h3>
							<Badge className={cn("shrink-0", difficultyColors[project.difficulty])}>
								{difficultyLabels[project.difficulty]}
							</Badge>
						</div>
						<p
							className={cn(
								"line-clamp-2 leading-relaxed",
								isGhibli ? "text-slate-600" : "text-white/60",
							)}
						>
							{project.summary}
						</p>
					</div>

					{/* Tech Stack with icons */}
					<div className="flex flex-wrap gap-2">
						{project.techStack.slice(0, 4).map((tech) => (
							<TechBadge key={tech} tech={tech} isGhibli={isGhibli} />
						))}
						{project.techStack.length > 4 && (
							<span
								className={cn(
									"px-2.5 py-1 text-xs rounded-lg border",
									isGhibli
										? "bg-slate-100 text-slate-500 border-slate-200"
										: "bg-white/5 text-white/50 border-white/10",
								)}
							>
								+{project.techStack.length - 4} more
							</span>
						)}
					</div>

					{/* Links & CTA */}
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center gap-3">
							{project.githubUrl && (
								<motion.a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className={cn(
										"p-2 rounded-lg transition-colors",
										isGhibli
											? "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
											: "bg-white/5 text-white/60 hover:text-white hover:bg-white/10",
									)}
								>
									<Github className="w-4 h-4" />
								</motion.a>
							)}
							{project.liveUrl && (
								<motion.a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
									className={cn(
										"p-2 rounded-lg transition-colors",
										isGhibli
											? "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
											: "bg-white/5 text-white/60 hover:text-white hover:bg-white/10",
									)}
								>
									<ExternalLink className="w-4 h-4" />
								</motion.a>
							)}
						</div>

						<span
							className={cn(
								"flex items-center gap-2 text-sm transition-colors",
								isGhibli
									? "text-red-500 group-hover:text-red-600"
									: "text-violet-400 group-hover:text-violet-300",
							)}
						>
							View Details
							<ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
						</span>
					</div>
				</div>

				{/* Bottom gradient line */}
				<div
					className={cn(
						"absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity",
						categoryColors[project.category],
					)}
				/>
			</motion.div>
		</motion.div>
	);
}
