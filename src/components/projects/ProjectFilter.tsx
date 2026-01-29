"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES, categoryLabels, ProjectCategory } from "@/types";
import { Code2, Cpu, Layers, Box } from "lucide-react";
import { useTheme } from "@/context";

interface ProjectFilterProps {
	selectedCategory: ProjectCategory | "all";
	onCategoryChange: (category: ProjectCategory | "all") => void;
}

const categoryIcons: Record<ProjectCategory, React.ElementType> = {
	web: Code2,
	embedded: Cpu,
	software: Layers,
	"3d": Box,
};

export function ProjectFilter({ selectedCategory, onCategoryChange }: ProjectFilterProps) {
	const { isGhibli } = useTheme();

	const categories = [
		{ value: "all" as const, label: "All Projects", icon: null },
		...CATEGORIES.map((cat) => ({
			value: cat,
			label: categoryLabels[cat],
			icon: categoryIcons[cat],
		})),
	];

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{categories.map((category) => {
				const isActive = selectedCategory === category.value;
				const Icon = category.icon;

				return (
					<motion.button
						key={category.value}
						onClick={() => onCategoryChange(category.value)}
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer",
							"flex items-center gap-2 border-2",
							isActive
								? isGhibli
									? "text-white border-transparent"
									: "text-white border-transparent"
								: isGhibli
									? "text-[#6e3f28] hover:text-[#0e3b6c] bg-white/80 hover:bg-white border-[#6cb65f]/30 hover:border-[#0e3b6c]/50"
									: "text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border-white/10",
						)}
					>
						{isActive && (
							<motion.div
								layoutId="filter-indicator"
								className={cn(
									"absolute inset-0 rounded-xl",
									isGhibli
										? "bg-linear-to-r from-[#0e3b6c] via-[#399e90] to-[#6cb65f]"
										: "bg-linear-to-r from-violet-600 to-indigo-600",
								)}
								transition={{ type: "spring", stiffness: 350, damping: 30 }}
							/>
						)}
						<span className="relative z-10 flex items-center gap-2">
							{Icon && <Icon className="w-4 h-4" />}
							{category.label}
						</span>
					</motion.button>
				);
			})}
		</div>
	);
}
