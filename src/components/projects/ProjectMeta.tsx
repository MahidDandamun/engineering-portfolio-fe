import React from "react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";
import { categoryLabels, difficultyLabels } from "@/types";

import type { ProjectCategory, ProjectDifficulty } from "@/types/project";

interface ProjectMetaProps {
	category: ProjectCategory;
	difficulty: ProjectDifficulty;
	isGhibli: boolean;
	categoryColor: string;
	difficultyColor: string;
}

export function ProjectMeta({ category, difficulty, isGhibli, categoryColor, difficultyColor }: ProjectMetaProps) {
	return (
		<div className="flex items-center gap-2 mb-2">
			<Badge
				className={cn(
					"px-2 py-1 text-xs font-semibold border",
					isGhibli
						? "bg-[#f7f0e3] text-[#6e3f28] border-[#d64550]/25"
						: "bg-white/5 text-white/70 border-[#8b5cf6]/20",
					categoryColor,
				)}
			>
				{categoryLabels[category] || category}
			</Badge>
			<Badge
				className={cn(
					"px-2 py-1 text-xs font-semibold border",
					isGhibli
						? "bg-[#f7f0e3] text-[#6e3f28] border-[#d64550]/25"
						: "bg-white/5 text-white/70 border-[#8b5cf6]/20",
					difficultyColor,
				)}
			>
				{difficultyLabels[difficulty] || difficulty}
			</Badge>
		</div>
	);
}
