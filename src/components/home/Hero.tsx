"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";
import { Totoro, SootSprite, Kodama, DomainExpansion, SixEyes, SukunaMarks } from "@/components/ui/AnimeElements";

// Floating geometric shapes - theme aware with anime elements
function FloatingShapes() {
	const { isGhibli } = useTheme();

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Primary orb */}
			<motion.div
				className="absolute w-150 h-150 rounded-full"
				style={{
					background: isGhibli
						? "radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%)"
						: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
					left: "60%",
					top: "20%",
				}}
				animate={{
					scale: [1, 1.2, 1],
					x: [0, 50, 0],
					y: [0, -30, 0],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Secondary orb */}
			<motion.div
				className="absolute w-100 h-100 rounded-full"
				style={{
					background: isGhibli
						? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
						: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
					left: "-10%",
					top: "50%",
				}}
				animate={{
					scale: [1, 1.3, 1],
					x: [0, 30, 0],
					y: [0, 50, 0],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Ghibli-specific: Totoro mascot */}
			{isGhibli && (
				<>
					<motion.div
						className="absolute bottom-20 right-10 hidden lg:block"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 0.8 }}
					>
						<Totoro size={100} />
						<div className="absolute -bottom-2 left-0">
							<SootSprite size={25} delay={0} />
						</div>
						<div className="absolute -bottom-4 left-8">
							<SootSprite size={20} delay={0.3} />
						</div>
						<div className="absolute -bottom-2 left-14">
							<SootSprite size={22} delay={0.6} />
						</div>
					</motion.div>
					<motion.div
						className="absolute top-32 left-10 hidden lg:block"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						transition={{ delay: 1.5 }}
					>
						<Kodama size={40} />
					</motion.div>
				</>
			)}

			{/* JJK-specific: Domain effects */}
			{!isGhibli && (
				<>
					<motion.div
						className="absolute bottom-20 right-10 hidden lg:block"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.3 }}
						transition={{ delay: 1 }}
					>
						<DomainExpansion size={150} />
					</motion.div>
					<motion.div
						className="absolute top-32 left-10 hidden lg:block"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.4 }}
						transition={{ delay: 1.2 }}
					>
						<SixEyes size={100} />
					</motion.div>
					<motion.div
						className="absolute top-1/2 right-32 hidden lg:block"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.3 }}
						transition={{ delay: 1.5 }}
					>
						<SukunaMarks />
					</motion.div>
				</>
			)}

			{/* Grid pattern */}
			<div
				className={cn("absolute inset-0", isGhibli ? "opacity-[0.02]" : "opacity-[0.03]")}
				style={{
					backgroundImage: isGhibli
						? `linear-gradient(rgba(45,52,54,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(45,52,54,0.1) 1px, transparent 1px)`
						: `linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)`,
					backgroundSize: "64px 64px",
				}}
			/>
		</div>
	);
}

// Text scramble effect
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
	const [displayText, setDisplayText] = useState(text);
	const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

	useEffect(() => {
		const timeout = setTimeout(() => {
			let iteration = 0;
			const interval = setInterval(() => {
				setDisplayText(
					text
						.split("")
						.map((_, index) => {
							if (index < iteration) return text[index];
							return chars[Math.floor(Math.random() * chars.length)];
						})
						.join(""),
				);
				iteration += 1 / 2;
				if (iteration >= text.length) clearInterval(interval);
			}, 30);
			return () => clearInterval(interval);
		}, delay);
		return () => clearTimeout(timeout);
	}, [text, delay]);

	return <span>{displayText}</span>;
}

export function Hero() {
	const { isGhibli } = useTheme();
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
	const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

	const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
	const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;
			mouseX.set(e.clientX - centerX);
			mouseY.set(e.clientY - centerY);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	const scrollToProjects = () => {
		document.getElementById("featured-projects")?.scrollIntoView({
			behavior: "smooth",
		});
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<FloatingShapes />

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
				<motion.div style={{ rotateX: springRotateX, rotateY: springRotateY }} className="space-y-8">
					{/* Greeting badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className={cn(
							"inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border",
							isGhibli ? "bg-white/70 border-[#ffeaa7]/50" : "bg-white/5 border-white/10",
						)}
					>
						<Sparkles className={cn("w-4 h-4", isGhibli ? "text-[#f39c12]" : "text-[#8b5cf6]")} />
						<span className={cn("text-sm", isGhibli ? "text-[#636e72]" : "text-white/70")}>
							Welcome to my portfolio
						</span>
					</motion.div>

					{/* Main heading */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="space-y-4"
					>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
							<span className={isGhibli ? "text-[#2d3436]" : "text-white"}>Hi, I&apos;m </span>
							<span className="relative">
								<span className="gradient-text">
									<ScrambleText text="Mahid" delay={500} />
								</span>
								<motion.span
									className={cn(
										"absolute -inset-1 blur-xl",
										isGhibli
											? "bg-linear-to-r from-[#e74c3c]/20 via-[#f39c12]/20 to-[#3498db]/20"
											: "bg-linear-to-r from-[#8b5cf6]/20 via-[#3b82f6]/20 to-[#dc2626]/20",
									)}
									animate={{ opacity: [0.5, 0.8, 0.5] }}
									transition={{ duration: 2, repeat: Infinity }}
								/>
							</span>
						</h1>

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
								<span className={isGhibli ? "text-[#2d3436]" : "text-white/80"}>
									Full-Stack Engineer
								</span>
								{" • "}
								<span className={isGhibli ? "text-[#e74c3c]" : "text-[#8b5cf6]"}>Embedded Systems</span>
								{" • "}
								<span className={isGhibli ? "text-[#3498db]" : "text-[#3b82f6]"}>3D Designer</span>
							</h2>
						</motion.div>
					</motion.div>

					{/* Description */}
					<p
						className={cn(
							"max-w-2xl mx-auto text-lg leading-relaxed",
							isGhibli ? "text-[#636e72]" : "text-white/50",
						)}
					>
						Crafting innovative solutions across web development, embedded systems, and software
						engineering. Building the future one project at a time.
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
						{[
							{ value: "20+", label: "Projects" },
							{ value: "5+", label: "Years Exp" },
							{ value: "10+", label: "Certificates" },
						].map((stat, index) => (
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
