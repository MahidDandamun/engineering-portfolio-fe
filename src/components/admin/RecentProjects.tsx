"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Folder } from "lucide-react";

interface Project {
	_id: string;
	title: string;
	category: string;
	featured?: boolean;
}

interface RecentProjectsProps {
	projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.3 }}
			className="rounded-2xl bg-white/5 border border-white/10 p-6"
		>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-white">Recent Projects</h2>
				<Link
					href="/admin/projects"
					className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
				>
					View All <span className="w-4 h-4">→</span>
				</Link>
			</div>
			<div className="space-y-3">
				{projects.slice(0, 5).map((project) => (
					<Link
						key={project._id}
						href={`/admin/projects/${project._id}/edit`}
						className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
								<Folder className="w-5 h-5 text-violet-400" />
							</div>
							<div>
								<p className="text-white font-medium">{project.title}</p>
								<p className="text-sm text-white/50">{project.category}</p>
							</div>
						</div>
						{project.featured && <span className="text-yellow-400">⭐</span>}
					</Link>
				))}
				{projects.length === 0 && (
					<p className="text-white/50 text-center py-8">No projects yet. Create your first project!</p>
				)}
			</div>
		</motion.div>
	);
}
