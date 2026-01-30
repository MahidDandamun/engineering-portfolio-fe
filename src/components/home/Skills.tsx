"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/layout";
import { SKILL_DOMAINS } from "./homeData";
import { useTheme } from "@/context";
import { getTechIcon } from "@/lib/dummyData";
import { cn } from "@/lib/utils";
import Image from "next/image";

// skillDomains now imported from homeData.ts

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

// Skill badge with icon
function SkillBadge({ skill, index, isGhibli }: { skill: string; index: number; isGhibli: boolean }) {
	const iconUrl = getTechIcon(skill);

	return (
		<motion.span
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ delay: 0.1 * index }}
			whileHover={{ scale: 1.05, y: -2 }}
			className={cn(
				"inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all cursor-default",
				isGhibli
					? "bg-white/60 text-slate-700 border-slate-200/50 hover:border-slate-300 hover:bg-white/80 hover:shadow-sm"
					: "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:text-white",
			)}
		>
			{iconUrl && (
				<Image
					src={iconUrl}
					alt={skill}
					width={18}
					height={18}
					className="w-4.5 h-4.5 object-contain"
					unoptimized
				/>
			)}
			{skill}
		</motion.span>
	);
}

export function Skills() {
	const { isGhibli } = useTheme();

	return (
		<Section id="skills">
			<SectionHeader
				title="Technical Skills"
				subtitle="A diverse toolkit for building innovative solutions across multiple domains"
			/>

			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
			>
				{SKILL_DOMAINS.map((domain) => {
					const gradientColor = isGhibli ? domain.colorLight : domain.colorDark;

					return (
						<motion.div key={domain.title} variants={itemVariants} className="group relative">
							<motion.div
								whileHover={{ y: -5 }}
								className={cn(
									"relative p-6 lg:p-8 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300",
									isGhibli
										? "bg-white/70 border border-slate-200/50 hover:shadow-lg hover:shadow-amber-100/50"
										: "bg-white/5 border border-white/10 hover:border-purple-500/30",
								)}
							>
								{/* Background glow */}
								<div
									className={cn(
										`absolute inset-0 bg-linear-to-br ${gradientColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`,
									)}
								/>

								{/* Header */}
								<div className="relative flex items-center gap-4 mb-6">
									<div className={`p-3 rounded-xl bg-linear-to-br ${gradientColor}`}>
										<domain.icon className="w-6 h-6 text-white" />
									</div>
									<h3
										className={cn(
											"text-xl font-semibold",
											isGhibli ? "text-slate-800" : "text-white",
										)}
									>
										{domain.title}
									</h3>
								</div>

								{/* Skills with icons */}
								<div className="relative flex flex-wrap gap-2">
									{domain.skills.map((skill, skillIndex) => (
										<SkillBadge key={skill} skill={skill} index={skillIndex} isGhibli={isGhibli} />
									))}
								</div>

								{/* Decorative corner */}
								<div
									className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${gradientColor} opacity-10 rounded-full blur-3xl`}
								/>
							</motion.div>
						</motion.div>
					);
				})}
			</motion.div>
		</Section>
	);
}
