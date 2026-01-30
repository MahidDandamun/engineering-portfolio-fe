"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProjectGrid, ProjectFilter } from "@/components/projects";
import { useProjects } from "@/hooks";
import { ProjectCategory } from "@/types";
import { Button } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectsContent() {
	const searchParams = useSearchParams();
	const initialCategory = (searchParams?.get("category") ?? null) as ProjectCategory | null;

	const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">(initialCategory || "all");
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading } = useProjects({
		category: selectedCategory === "all" ? undefined : selectedCategory,
		page: currentPage,
		limit: 9,
	});

	const handleCategoryChange = (category: ProjectCategory | "all") => {
		setSelectedCategory(category);
		setCurrentPage(1);
	};

	const pagination = data?.pagination;

	return (
		<>
			{/* Filter */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="mb-12"
			>
				<ProjectFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
			</motion.div>

			{/* Projects Grid */}
			<ProjectGrid
				projects={data?.data || []}
				isLoading={isLoading}
				emptyMessage="No projects found in this category"
			/>

			{/* Pagination */}
			{pagination && pagination.totalPages > 1 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="mt-12 flex items-center justify-center gap-4"
				>
					<Button
						variant="secondary"
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
						disabled={currentPage <= 1}
					>
						<ChevronLeft className="w-4 h-4" />
						Previous
					</Button>

					<div className="flex items-center gap-2">
						{[...Array(pagination.totalPages)].map((_, i) => (
							<button
								key={i}
								onClick={() => setCurrentPage(i + 1)}
								className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
									currentPage === i + 1
										? "bg-violet-600 text-white"
										: "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
								}`}
							>
								{i + 1}
							</button>
						))}
					</div>

					<Button
						variant="secondary"
						onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
						disabled={currentPage >= pagination.totalPages}
					>
						Next
						<ChevronRight className="w-4 h-4" />
					</Button>
				</motion.div>
			)}
		</>
	);
}
