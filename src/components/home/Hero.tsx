"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { HERO_GREETING, HERO_STATS } from "./HeroData";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";

export function Hero() {
	const { isGhibli } = useTheme();
	const projectsRef = useRef<HTMLDivElement>(null);

	const scrollToProjects = () => {
		if (projectsRef.current) {
			projectsRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section className="relative min-h-[80vh] flex flex-col justify-center items-center py-16">
			<div className="space-y-8 w-full max-w-4xl mx-auto text-center relative">
				{/* Greeting Badge */}
				<div className="flex justify-center">
					<span
						className={cn(
							"inline-flex items-center gap-2 px-4 py-1 rounded-full border text-sm font-medium shadow-sm",
							isGhibli ? HERO_GREETING.badge.colorLight : HERO_GREETING.badge.colorDark,
						)}
					>
						<ArrowDown className="w-4 h-4" />
						{HERO_GREETING.badge.text}
					</span>
				</div>

				{/* Name and Animated Text */}
				<h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
					<span className={isGhibli ? "text-[#2d3436]" : "text-white"}>Hi, I&apos;m </span>
					<span className="gradient-text">{HERO_GREETING.name}</span>
				</h1>

				{/* Roles */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<h2
						className={cn(
							"text-xl sm:text-2xl lg:text-3xl font-light",
							isGhibli ? "text-[#636e72]" : "text-white/60",
						)}
					>
						{HERO_GREETING.roles.map((role, idx) => (
							<span key={role.label} className={isGhibli ? role.colorLight : role.colorDark}>
								{role.label}
								{idx < HERO_GREETING.roles.length - 1 && <span className="mx-2">•</span>}
							</span>
						))}
					</h2>
				</motion.div>

				{/* Description */}
				<p
					className={cn(
						"max-w-2xl mx-auto text-lg leading-relaxed",
						isGhibli ? "text-[#636e72]" : "text-white/50",
					)}
				>
					{HERO_GREETING.description}
				</p>

				{/* CTA Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
				>
					<Link href="/projects">
						<Button size="lg" className="min-w-45">
							View Projects
						</Button>
					</Link>
					<Link href="/contact">
						<Button variant="secondary" size="lg" className="min-w-45">
							Get in Touch
						</Button>
					</Link>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.6 }}
					className="pt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto"
				>
					{HERO_STATS.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
							className="text-center"
						>
							<div className="text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</div>
							<div className={cn("text-sm mt-1", isGhibli ? "text-[#636e72]" : "text-white/50")}>
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Scroll indicator */}
				<motion.button
					onClick={scrollToProjects}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
					className={cn(
						"absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors",
						isGhibli ? "text-[#636e72]/60 hover:text-[#2d3436]" : "text-white/40 hover:text-white/80",
					)}
				>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="flex flex-col items-center gap-2"
					>
						<span className="text-xs uppercase tracking-widest">Scroll</span>
						<ArrowDown className="w-5 h-5" />
					</motion.div>
				</motion.button>
			</div>
		</section>
	);
}
