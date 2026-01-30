"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Button, Input, ErrorBoundary } from "@/components/ui";
import { useProjects, useDeleteProject } from "@/hooks";
import { useAdminAuthRedirect } from "@/hooks/useAdminAuthRedirect";
import { Project } from "@/types";
import { ProjectsTable } from "@/components/admin/projects/ProjectsTable";
import { ProjectDeleteModal } from "@/components/admin/projects/ProjectDeleteModal";

export default function AdminProjectsPage() {
	useAdminAuthRedirect();
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
		} catch {
			// Error is handled by the mutation's onError callback
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
				<ProjectsTable
					projects={filteredProjects}
					isLoading={isLoading}
					onDelete={(project) => setDeleteModal(project)}
				/>

				{/* Delete Modal */}
				<ProjectDeleteModal
					isOpen={!!deleteModal}
					onClose={() => setDeleteModal(null)}
					onDelete={handleDelete}
					isLoading={deleteProject.isPending}
					projectTitle={deleteModal?.title}
				/>
			</div>
		</ErrorBoundary>
	);
}
