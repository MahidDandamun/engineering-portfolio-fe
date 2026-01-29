"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { ProjectGrid, ProjectFilter } from "@/components/projects";
import { useProjects } from "@/hooks";
import { ProjectCategory } from "@/types";
import { Button, Skeleton } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProjectsContent() {
	const searchParams = useSearchParams();
	const initialCategory = searchParams.get("category") as ProjectCategory | null;

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

function ProjectsLoading() {
	return (
		<div className="space-y-8">
			<Skeleton className="h-12 w-full max-w-xl mx-auto" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="h-80 rounded-2xl" />
				))}
			</div>
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<PageWrapper>
			<Section className="pt-32">
				<SectionHeader
					title="All Projects"
					subtitle="Explore my work across different domains and technologies"
				/>
				<Suspense fallback={<ProjectsLoading />}>
					<ProjectsContent />
				</Suspense>
			</Section>
		</PageWrapper>
	);
}
