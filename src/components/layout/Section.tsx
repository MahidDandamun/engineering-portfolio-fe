"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export function Section({ children, className, id }: SectionProps) {
	return (
		<section id={id} className={cn("py-16 lg:py-24", className)}>
			<div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">{children}</div>
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
	const { isGhibli } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className={cn("mb-12 lg:mb-16", align === "center" && "text-center", className)}
		>
			<h2
				className={cn(
					"text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
					isGhibli ? "text-[var(--foreground)]" : "text-white",
				)}
			>
				{title.split(" ").map((word, index) => (
					<span key={index}>
						{index === title.split(" ").length - 1 ? (
							<span
								className={cn(
									"bg-clip-text text-transparent bg-linear-to-r",
									isGhibli
										? "from-[var(--ghibli-pink)] to-[var(--ghibli-terracotta)]"
										: "from-violet-400 to-cyan-400",
								)}
							>
								{word}
							</span>
						) : (
							word + " "
						)}
					</span>
				))}
			</h2>
			{subtitle && (
				<p
					className={cn(
						"text-lg max-w-2xl mx-auto",
						isGhibli ? "text-[var(--foreground-secondary)]" : "text-white/60",
					)}
				>
					{subtitle}
				</p>
			)}
		</motion.div>
	);
}
