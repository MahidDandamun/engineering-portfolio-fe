"use client";

import { ProjectThumbnail } from "./ProjectThumbnail";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectActions } from "./ProjectActions";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/types/project";
import { categoryColorsGhibli, categoryColorsJJK, difficultyColorsGhibli, difficultyColorsJJK } from "@/types/project";

import { cn, normalizeImageUrl } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
	project: Project;
}

function TechBadge({ tech }: { tech: string }) {
	return <span>{tech}</span>;
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
			className="group relative h-full"
			role="link"
			tabIndex={0}
			aria-label={`View details for ${project.title}`}
			onClick={handleNavigate}
			onKeyDown={handleKeyDown}
			style={{ willChange: "transform" }}
		>
			<ProjectThumbnail thumbnailUrl={safeThumbnail} title={project.title} />
			<ProjectMeta
				category={project.category}
				difficulty={project.difficulty}
				isGhibli={isGhibli}
				categoryColor={categoryColors[project.category] || ""}
				difficultyColor={difficultyColors[project.difficulty] || ""}
			/>
			<h3 className={cn("text-lg font-semibold line-clamp-2", isGhibli ? "text-[#6e3f28]" : "text-white")}>
				{project.title}
			</h3>
			<p className={cn("text-sm line-clamp-2", isGhibli ? "text-[#6e3f28]/70" : "text-white/60")}>
				{project.description}
			</p>
			<div className="flex flex-wrap gap-2 mt-2">
				{project.techStack.map((tech: string) => (
					<TechBadge key={tech} tech={tech} />
				))}
			</div>
			<ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} isGhibli={isGhibli} />
			<div className="absolute right-4 bottom-4">
				<ArrowRight
					className={cn(
						"w-6 h-6 transition-transform group-hover:translate-x-1",
						isGhibli ? "text-[#d64550]" : "text-violet-400",
					)}
				/>
			</div>
		</div>
	);
}
