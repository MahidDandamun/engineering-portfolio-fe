"use client";

import { ProjectMeta } from "./ProjectMeta";
import { ProjectActions } from "./ProjectActions";
import { ArrowRight } from "lucide-react";
import { ProjectThumbnail } from "./ProjectThumbnail";

import type { Project } from "@/types/project";
import { categoryColorsGhibli, categoryColorsJJK, difficultyColorsGhibli, difficultyColorsJJK } from "@/types/project";

import { cn, normalizeImageUrl } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui";

interface ProjectCardProps {
	project: Project;
}

// Animated, theme-aware tech badge
function TechBadge({ tech, isGhibli }: { tech: string; isGhibli: boolean }) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-colors font-medium",
				isGhibli
					? "bg-[#f7f0e3] text-[#6e3f28] border-[#d64550]/25 hover:border-[#d64550]/50 hover:bg-[#d64550]/10"
					: "bg-white/5 text-white/70 border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40",
				"shadow-sm hover:shadow-md cursor-pointer",
			)}
		>
			{tech}
		</span>
	);
}

export function ProjectCard({ project }: ProjectCardProps) {
	const { isGhibli } = useTheme();
	const router = useRouter();
	const safeThumbnail = normalizeImageUrl(project.thumbnail);
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
		<div
			role="link"
			tabIndex={0}
			aria-label={`View details for ${project.title}`}
			onClick={handleNavigate}
			onKeyDown={handleKeyDown}
			className="h-full"
		>
			<Card
				className={cn(
					"group relative h-full flex flex-col overflow-hidden p-0 border-0 shadow-none bg-transparent",
					isGhibli
						? "ghibli-card hover:shadow-2xl hover:shadow-[#6e3f28]/20"
						: "jjk-card hover:shadow-2xl hover:shadow-[#8b5cf6]/20",
				)}
				hover
				glow
			>
				{/* Animated thumbnail with glassmorphism and gradient border */}
				<div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
					<div
						className={cn(
							"absolute inset-0 z-10 pointer-events-none rounded-t-2xl border-t-2 border-x-2",
							isGhibli
								? "border-[#6cb65f]/30 bg-linear-to-br from-[#f7f0e3]/80 to-[#d64550]/10"
								: "border-white/10 bg-linear-to-br from-[#0a0a0f]/80 to-[#8b5cf6]/10",
						)}
						style={{ backdropFilter: "blur(2px)" }}
					/>
					<ProjectThumbnail thumbnailUrl={safeThumbnail} title={project.title} className="rounded-t-2xl" />
				</div>

				<div className="flex flex-col flex-1 p-6 gap-2">
					<ProjectMeta
						category={project.category}
						difficulty={project.difficulty}
						isGhibli={isGhibli}
						categoryColor={categoryColors[project.category] || ""}
						difficultyColor={difficultyColors[project.difficulty] || ""}
					/>
					<h3
						className={cn(
							"text-xl font-bold transition-colors line-clamp-2",
							isGhibli
								? "text-[#0e3b6c] group-hover:text-[#d64550]"
								: "text-white group-hover:text-violet-400",
						)}
					>
						{project.title}
					</h3>
					<p
						className={cn(
							"line-clamp-2 leading-relaxed text-sm",
							isGhibli ? "text-[#6e3f28]" : "text-white/60",
						)}
					>
						{project.summary}
					</p>
					{/* Tech stack badges */}
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
					{/* Actions (Live/GitHub) */}
					<ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} isGhibli={isGhibli} />
					{/* Animated arrow CTA */}
					<div className="absolute right-4 bottom-4">
						<ArrowRight
							className={cn(
								"w-6 h-6 transition-transform group-hover:translate-x-1",
								isGhibli ? "text-[#d64550]" : "text-violet-400",
							)}
						/>
					</div>
				</div>
			</Card>
		</div>
	);
}
