"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export function Section({ children, className, id }: SectionProps) {
	return (
		<section id={id} className={cn("py-16 lg:py-24", className)}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
		</section>
	);
}

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	className?: string;
	align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className={cn("mb-12 lg:mb-16", align === "center" && "text-center", className)}
		>
			<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
				{title.split(" ").map((word, index) => (
					<span key={index}>
						{index === title.split(" ").length - 1 ? (
							<span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
								{word}
							</span>
						) : (
							word + " "
						)}
					</span>
				))}
			</h2>
			{subtitle && <p className="text-lg text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
		</motion.div>
	);
}
