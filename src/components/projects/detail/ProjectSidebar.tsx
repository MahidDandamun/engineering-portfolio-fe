"use client";
import { cn } from "@/lib/utils";
import { categoryLabels, Project } from "@/types";

export function ProjectSidebar({ project, isGhibli }: { project: Project; isGhibli: boolean }) {
	return (
		<div className="space-y-6">
			{/* Tech Stack */}
			<div
				className={cn(
					"p-6 rounded-2xl border",
					isGhibli ? "bg-white/60 border-slate-200/50" : "bg-white/5 border-white/10",
				)}
			>
				<h3 className={cn("text-lg font-semibold mb-4", isGhibli ? "text-slate-900" : "text-white")}>
					Tech Stack
				</h3>
				<div className="flex flex-wrap gap-2">
					{project.techStack?.map((tech: string) => (
						<span
							key={tech}
							className={cn(
								"px-3 py-1.5 text-sm rounded-lg border",
								isGhibli
									? "bg-slate-100 text-slate-700 border-slate-200"
									: "bg-white/5 text-white/70 border-white/10",
							)}
						>
							{tech}
						</span>
					))}
				</div>
			</div>
			{/* Project Info */}
			<div
				className={cn(
					"p-6 rounded-2xl border",
					isGhibli ? "bg-white/60 border-slate-200/50" : "bg-white/5 border-white/10",
				)}
			>
				<h3 className={cn("text-lg font-semibold mb-4", isGhibli ? "text-slate-900" : "text-white")}>
					Project Info
				</h3>
				<dl className="space-y-3 text-sm">
					<div className="flex justify-between">
						<dt className={isGhibli ? "text-slate-600" : "text-white/50"}>Category</dt>
						<dd className={isGhibli ? "text-slate-900" : "text-white"}>
							{categoryLabels[project.category as keyof typeof categoryLabels]}
						</dd>
					</div>
					<div className="flex justify-between">
						<dt className={isGhibli ? "text-slate-600" : "text-white/50"}>Difficulty</dt>
						<dd className={isGhibli ? "text-slate-900" : "text-white"}>{project.difficulty}</dd>
					</div>
					<div className="flex justify-between">
						<dt className={isGhibli ? "text-slate-600" : "text-white/50"}>Created</dt>
						<dd className={isGhibli ? "text-slate-900" : "text-white"}>
							{project.createdAt ? project.createdAt.split("T")[0] : ""}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
