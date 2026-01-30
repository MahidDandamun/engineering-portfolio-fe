import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectActionsProps {
	liveUrl?: string;
	githubUrl?: string;
	isGhibli: boolean;
}

export function ProjectActions({ liveUrl, githubUrl, isGhibli }: ProjectActionsProps) {
	return (
		<div className="flex gap-2 mt-3">
			{liveUrl && (
				<a
					href={liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
						isGhibli
							? "bg-[#d64550]/10 text-[#d64550] hover:bg-[#d64550]/20"
							: "bg-violet-900 text-violet-200 hover:bg-violet-800",
					)}
				>
					<ExternalLink className="w-4 h-4 mr-1" /> Live
				</a>
			)}
			{githubUrl && (
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
						isGhibli
							? "bg-[#6cb65f]/10 text-[#6cb65f] hover:bg-[#6cb65f]/20"
							: "bg-slate-800 text-slate-200 hover:bg-slate-700",
					)}
				>
					<Github className="w-4 h-4 mr-1" /> GitHub
				</a>
			)}
		</div>
	);
}
