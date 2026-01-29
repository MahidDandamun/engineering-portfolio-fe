"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context";
import { SootSprite, Kodama, DomainExpansion } from "./AnimeElements";

export function ThemeBackground() {
	const { isGhibli, isJJK } = useTheme();

	return (
		<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500">
			{/* Base gradient */}
			<div
				className={`absolute inset-0 transition-all duration-700 ${
					isGhibli ? "bg-(image:--gradient-warm) opacity-80" : "bg-(image:--gradient-cursed) opacity-90"
				}`}
			/>

			{/* Ghibli Light Mode - Decor (Characters & Nature) */}
			{isGhibli && (
				<>
					{/* Soot Sprites scattered around */}
					<div className="absolute bottom-20 left-10 opacity-50">
						<SootSprite size={20} delay={0} />
					</div>
					<div className="absolute bottom-32 left-32 opacity-40">
						<SootSprite size={15} delay={0.3} />
					</div>
					<div className="absolute bottom-16 left-20 opacity-60">
						<SootSprite size={18} delay={0.6} />
					</div>
					<div className="absolute top-40 right-32 opacity-30">
						<SootSprite size={22} delay={1} />
					</div>

					{/* Kodama (forest spirits) */}
					<div className="absolute bottom-40 right-20 opacity-40">
						<Kodama size={30} />
					</div>
					<div className="absolute bottom-60 right-40 opacity-30">
						<Kodama size={25} />
					</div>

					{/* Floating sakura petals */}
					{[...Array(12)].map((_, i) => (
						<motion.div
							key={`petal-${i}`}
							className="absolute"
							style={{
								left: `${(i * 8) % 100}%`,
								top: -20,
							}}
							animate={{
								y: ["0vh", "110vh"],
								x: [0, Math.sin(i * 0.5) * 80, 0],
								rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
							}}
							transition={{
								duration: 12 + i * 1.5,
								repeat: Infinity,
								delay: i * 2,
								ease: "linear",
							}}
						>
							<svg width="12" height="12" viewBox="0 0 12 12">
								<ellipse
									cx="6"
									cy="6"
									rx="5"
									ry="3"
									fill={
										i % 3 === 0
											? "var(--ghibli-pink)"
											: i % 3 === 1
												? "var(--ghibli-terracotta)"
												: "var(--ghibli-sage)"
									}
									opacity="0.6"
								/>
							</svg>
						</motion.div>
					))}

					{/* Grass silhouette at bottom - Updated to Sage Green */}
					<div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
						<svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1200 64">
							{[...Array(60)].map((_, i) => (
								<path
									key={i}
									d={`M${i * 20} 64 Q${i * 20 + 5} ${30 + (i % 5) * 4} ${i * 20 + 10} 64`}
									fill="var(--ghibli-sage)"
								/>
							))}
						</svg>
					</div>
				</>
			)}

			{/* JJK Dark Mode - Authentic Jujutsu Kaisen cursed energy */}
			{isJJK && (
				<>
					{/* Domain Expansion circle */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
						<DomainExpansion size={600} />
					</div>

					{/* Subtle domain grid pattern */}
					<svg className="absolute inset-0 w-full h-full opacity-5">
						<defs>
							<pattern id="domainGrid" width="60" height="60" patternUnits="userSpaceOnUse">
								<path d="M 60 0 L 0 0 0 60" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
								<circle cx="0" cy="0" r="2" fill="#8b5cf6" opacity="0.5" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#domainGrid)" />
					</svg>

					{/* Cursed energy orbs - purple, blue, red */}
					<motion.div
						className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
						style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)" }}
						animate={{
							scale: [1, 1.3, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{ duration: 4, repeat: Infinity }}
					/>
					<motion.div
						className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
						style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)" }}
						animate={{
							scale: [1.2, 1, 1.2],
							opacity: [0.25, 0.4, 0.25],
						}}
						transition={{ duration: 5, repeat: Infinity }}
					/>
					<motion.div
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
						style={{ background: "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)" }}
						animate={{
							scale: [1, 1.4, 1],
							opacity: [0.2, 0.35, 0.2],
						}}
						transition={{ duration: 6, repeat: Infinity }}
					/>

					{/* Gojo's Infinity symbol */}
					<motion.div
						className="absolute top-20 right-20 opacity-20"
						animate={{ rotate: 360 }}
						transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
					>
						<svg width="120" height="70" viewBox="0 0 120 70">
							<path
								d="M30 35 C30 10, 60 10, 60 35 C60 60, 90 60, 90 35 C90 10, 60 10, 60 35 C60 60, 30 60, 30 35"
								fill="none"
								stroke="url(#infinityGradient)"
								strokeWidth="3"
							/>
							<defs>
								<linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
									<stop offset="0%" stopColor="#60a5fa" />
									<stop offset="50%" stopColor="#3b82f6" />
									<stop offset="100%" stopColor="#60a5fa" />
								</linearGradient>
							</defs>
						</svg>
					</motion.div>

					{/* Sukuna marks - vertical lines */}
					{[...Array(6)].map((_, i) => (
						<motion.div
							key={`sukuna-${i}`}
							className="absolute"
							style={{
								left: `${15 + i * 14}%`,
								top: `${25 + (i % 2) * 30}%`,
							}}
						>
							<motion.div
								className="flex gap-1"
								animate={{ opacity: [0.1, 0.4, 0.1] }}
								transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
							>
								<div className="w-1 h-10 bg-red-600 rounded-full" />
								<div className="w-1 h-10 bg-red-600 rounded-full" />
							</motion.div>
						</motion.div>
					))}

					{/* Cursed energy particles floating upward */}
					{[...Array(30)].map((_, i) => (
						<motion.div
							key={`cursed-${i}`}
							className="absolute w-1 h-1 rounded-full"
							style={{
								background: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#3b82f6" : "#dc2626",
								boxShadow: `0 0 6px ${i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#3b82f6" : "#dc2626"}`,
								left: `${(i * 3.3) % 100}%`,
								bottom: "-10px",
							}}
							animate={{
								y: [0, -800],
								opacity: [0, 1, 0],
								scale: [0, 1.5, 0],
							}}
							transition={{
								duration: 8 + (i % 5) * 2,
								repeat: Infinity,
								delay: i * 0.4,
								ease: "easeOut",
							}}
						/>
					))}

					{/* Black flash effect - occasional bright burst */}
					<motion.div
						className="absolute inset-0 bg-white pointer-events-none"
						animate={{ opacity: [0, 0, 0, 0, 0, 0.03, 0] }}
						transition={{ duration: 10, repeat: Infinity, delay: 5 }}
					/>
				</>
			)}
		</div>
	);
}
