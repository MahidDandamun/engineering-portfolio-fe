"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui";
import {
	Project,
	categoryLabels,
	categoryColorsGhibli,
	categoryColorsJJK,
	difficultyLabels,
	difficultyColorsGhibli,
	difficultyColorsJJK,
} from "@/types";
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
				"inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors font-medium",
				isGhibli
					? "bg-[#f7f0e3] text-[#6e3f28] border-[#d64550]/25 hover:border-[#d64550]/50 hover:bg-[#d64550]/10"
					: "bg-white/5 text-white/70 border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40",
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

	// Use theme-appropriate colors
	const categoryColors = isGhibli ? categoryColorsGhibli : categoryColorsJJK;
	const difficultyColors = isGhibli ? difficultyColorsGhibli : difficultyColorsJJK;

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
			className="group relative h-full"
		>
			<motion.div
				whileHover={{ y: -8 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className={cn(
					"relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 cursor-pointer h-full flex flex-col",
					isGhibli
						? "bg-white/90 border-[#6cb65f]/30 hover:shadow-2xl hover:shadow-[#6e3f28]/20 hover:border-[#0e3b6c]/40"
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
										? "bg-[#d64550]/20 text-[#a62c2c] border-[#d64550]/40"
										: "bg-[#fbbf24]/20 text-[#fbbf24] border-[#fbbf24]/30",
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
				<div className="relative p-6 space-y-4 grow flex flex-col">
					{/* Title & Difficulty */}
					<div className="space-y-2">
						<div className="flex items-start justify-between gap-4">
							<h3
								className={cn(
									"text-xl font-bold transition-colors",
									isGhibli
										? "text-[#0e3b6c] group-hover:text-[#d64550]"
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
								isGhibli ? "text-[#6e3f28]" : "text-white/60",
							)}
						>
							{project.summary}
						</p>
					</div>

					{/* Tech Stack with icons */}
					<div className="flex flex-wrap gap-2 grow">
						{project.techStack.slice(0, 4).map((tech) => (
							<TechBadge key={tech} tech={tech} isGhibli={isGhibli} />
						))}
						{project.techStack.length > 4 && (
							<span
								className={cn(
									"px-2.5 py-1 text-xs rounded-lg border font-medium",
									isGhibli
										? "bg-[#0e3b6c]/10 text-[#0e3b6c] border-[#0e3b6c]/25"
										: "bg-[#8b5cf6]/10 text-[#a78bfa] border-[#8b5cf6]/20",
								)}
							>
								+{project.techStack.length - 4} more
							</span>
						)}
					</div>

					{/* Links & CTA */}
					<div className="flex items-center justify-between pt-2 mt-auto">
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
										"p-2 rounded-lg transition-colors cursor-pointer",
										isGhibli
											? "bg-[#6cb65f]/20 text-[#6e3f28] hover:text-[#0e3b6c] hover:bg-[#6cb65f]/30"
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
										"p-2 rounded-lg transition-colors cursor-pointer",
										isGhibli
											? "bg-[#6cb65f]/20 text-[#6e3f28] hover:text-[#0e3b6c] hover:bg-[#6cb65f]/30"
											: "bg-white/5 text-white/60 hover:text-white hover:bg-white/10",
									)}
								>
									<ExternalLink className="w-4 h-4" />
								</motion.a>
							)}
						</div>

						<span
							className={cn(
								"flex items-center gap-2 text-sm font-semibold transition-colors",
								isGhibli
									? "text-[#0e3b6c] group-hover:text-[#d64550]"
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
