"use client";
import { Badge, Button } from "@/components/ui";
import { categoryLabels, difficultyLabels, difficultyColors, Project } from "@/types";
import { Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProjectHeader({ project, isGhibli }: { project: Project; isGhibli: boolean }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.1 }}
			className="space-y-6"
		>
			{/* Badges */}
			<div className="flex flex-wrap items-center gap-3">
				<Badge variant="gradient">{categoryLabels[project.category as keyof typeof categoryLabels]}</Badge>
				<Badge className={difficultyColors[project.difficulty as keyof typeof difficultyColors]}>
					{difficultyLabels[project.difficulty as keyof typeof difficultyLabels]}
				</Badge>
				{project.featured && (
					<Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">⭐ Featured</Badge>
				)}
			</div>

			{/* Title */}
			<h1
				className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold", isGhibli ? "text-slate-900" : "text-white")}
			>
				{project.title}
			</h1>

			{/* Summary */}
			<p className={cn("text-xl leading-relaxed", isGhibli ? "text-slate-700" : "text-white/60")}>
				{project.summary}
			</p>

			{/* Meta */}
			<div className={cn("flex flex-wrap items-center gap-6", isGhibli ? "text-slate-600" : "text-white/50")}>
				<div className="flex items-center gap-2">
					<Calendar className="w-4 h-4" />
					<span>{project.createdAt ? project.createdAt.split("T")[0] : ""}</span>
				</div>
				<div className="flex items-center gap-2">
					<Tag className="w-4 h-4" />
					<span>{project.techStack?.length || 0} Technologies</span>
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
						<Button variant="secondary">
							<ExternalLink className="w-5 h-5 mr-2" />
							Live Demo
						</Button>
					</motion.a>
				)}
			</div>
		</motion.div>
	);
}
