"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { categoryLabels, difficultyLabels, Project } from "@/types";

interface ProjectsTableProps {
	projects: Project[];
	isLoading: boolean;
	onDelete: (project: Project) => void;
}

export function ProjectsTable({ projects, isLoading, onDelete }: ProjectsTableProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
			className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
		>
			<table className="w-full">
				<thead>
					<tr className="border-b border-white/10">
						<th className="px-6 py-4 text-left text-sm font-medium text-white/60">Project</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/60">Category</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/60">Difficulty</th>
						<th className="px-6 py-4 text-left text-sm font-medium text-white/60">Status</th>
						<th className="px-6 py-4 text-right text-sm font-medium text-white/60">Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan={5} className="px-6 py-12 text-center">
								<div className="flex justify-center">
									<div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
								</div>
							</td>
						</tr>
					) : projects.length === 0 ? (
						<tr>
							<td colSpan={5} className="px-6 py-12 text-center text-white/50">
								No projects found
							</td>
						</tr>
					) : (
						projects.map((project, index) => (
							<motion.tr
								key={project._id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.05 }}
								className="border-b border-white/5 hover:bg-white/5 transition-colors"
							>
								<td className="px-6 py-4">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
											{project.featured ? (
												<Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
											) : (
												<span className="text-lg">📁</span>
											)}
										</div>
										<div>
											<p className="text-white font-medium">{project.title}</p>
											<p className="text-sm text-white/50 truncate max-w-xs">{project.summary}</p>
										</div>
									</div>
								</td>
								<td className="px-6 py-4">
									<Badge variant="outline">{categoryLabels[project.category]}</Badge>
								</td>
								<td className="px-6 py-4">
									<span className="text-white/70">{difficultyLabels[project.difficulty]}</span>
								</td>
								<td className="px-6 py-4">
									{project.featured ? (
										<Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
											Featured
										</Badge>
									) : (
										<Badge className="bg-white/10 text-white/60 border-white/20">Standard</Badge>
									)}
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center justify-end gap-2">
										<Link href={`/projects/${project.slug}`} target="_blank">
											<Button variant="ghost" size="sm">
												<ExternalLink className="w-4 h-4" />
											</Button>
										</Link>
										<Link href={`/admin/projects/${project._id}/edit`}>
											<Button variant="ghost" size="sm">
												<Edit className="w-4 h-4" />
											</Button>
										</Link>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => onDelete(project)}
											className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								</td>
							</motion.tr>
						))
					)}
				</tbody>
			</table>
		</motion.div>
	);
}
