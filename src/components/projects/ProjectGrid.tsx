"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui";
import { Project } from "@/types";

interface ProjectGridProps {
	projects: Project[];
	isLoading?: boolean;
	emptyMessage?: string;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export function ProjectGrid({ projects, isLoading, emptyMessage = "No projects found" }: ProjectGridProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				{[...Array(6)].map((_, i) => (
					<ProjectCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (!projects?.length) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col items-center justify-center py-16 text-center"
			>
				<div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
					<span className="text-4xl">📁</span>
				</div>
				<p className="text-white/60 text-lg">{emptyMessage}</p>
			</motion.div>
		);
	}

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
		>
			{projects.map((project, index) => (
				<ProjectCard key={project._id} project={project} index={index} />
			))}
		</motion.div>
	);
}
