"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, ExternalLink, Star, AlertCircle } from "lucide-react";
import { Button, Input, Badge, Modal, ErrorBoundary } from "@/components/ui";
import { useProjects, useDeleteProject } from "@/hooks";
import { categoryLabels, difficultyLabels, Project } from "@/types";

export default function AdminProjectsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [deleteModal, setDeleteModal] = useState<Project | null>(null);

	const { data, isLoading } = useProjects({ limit: 100 });
	const deleteProject = useDeleteProject();

	const projects = data?.data || [];
	const filteredProjects = projects.filter(
		(project) =>
			project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			project.category.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleDelete = async () => {
		if (!deleteModal) return;

		try {
			await deleteProject.mutateAsync(deleteModal._id);
			setDeleteModal(null);
		} catch (error) {
			console.error("Failed to delete project:", error);
		}
	};

	return (
		<ErrorBoundary>
			<div className="space-y-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center justify-between"
				>
					<div>
						<h1 className="text-3xl font-bold text-white">Projects</h1>
						<p className="text-white/60 mt-1">Manage your portfolio projects</p>
					</div>
					<Link href="/admin/projects/new">
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							New Project
						</Button>
					</Link>
				</motion.div>

				{/* Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="relative max-w-md"
				>
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
					<Input
						placeholder="Search projects..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-12"
					/>
				</motion.div>

				{/* Projects Table */}
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
							) : filteredProjects.length === 0 ? (
								<tr>
									<td colSpan={5} className="px-6 py-12 text-center text-white/50">
										No projects found
									</td>
								</tr>
							) : (
								filteredProjects.map((project, index) => (
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
													<p className="text-sm text-white/50 truncate max-w-xs">
														{project.summary}
													</p>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<Badge variant="outline">{categoryLabels[project.category]}</Badge>
										</td>
										<td className="px-6 py-4">
											<span className="text-white/70">
												{difficultyLabels[project.difficulty]}
											</span>
										</td>
										<td className="px-6 py-4">
											{project.featured ? (
												<Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
													Featured
												</Badge>
											) : (
												<Badge className="bg-white/10 text-white/60 border-white/20">
													Standard
												</Badge>
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
													onClick={() => setDeleteModal(project)}
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

				{/* Delete Modal */}
				<Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Project">
					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-xl bg-red-500/10 text-red-400">
								<AlertCircle className="w-6 h-6" />
							</div>
							<div>
								<p className="text-white">
									Are you sure you want to delete <strong>{deleteModal?.title}</strong>?
								</p>
								<p className="text-white/60 mt-1 text-sm">This action cannot be undone.</p>
							</div>
						</div>
						<div className="flex justify-end gap-3">
							<Button variant="secondary" onClick={() => setDeleteModal(null)}>
								Cancel
							</Button>
							<Button variant="danger" onClick={handleDelete} isLoading={deleteProject.isPending}>
								Delete
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</ErrorBoundary>
	);
}
