"use client";

import { useTheme } from "@/context";
import { motion } from "framer-motion";

export function GhibliBackground() {
	const { isGhibli } = useTheme();

	if (!isGhibli) return null;

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
			{/* Floating clouds */}
			<motion.div
				className="absolute top-20 -left-32 w-64 h-32 rounded-full opacity-30"
				style={{
					background: "radial-gradient(circle, rgba(235, 240, 228, 0.6) 0%, transparent 70%)",
				}}
				animate={{
					x: [0, 100, 0],
					y: [0, -20, 0],
				}}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="absolute top-1/3 -right-40 w-80 h-40 rounded-full opacity-30"
				style={{
					background: "radial-gradient(circle, rgba(232, 165, 165, 0.4) 0%, transparent 70%)",
				}}
				animate={{
					x: [0, -80, 0],
					y: [0, 30, 0],
				}}
				transition={{
					duration: 25,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			<motion.div
				className="absolute bottom-1/4 -left-24 w-56 h-28 rounded-full opacity-30"
				style={{
					background: "radial-gradient(circle, rgba(139, 157, 131, 0.5) 0%, transparent 70%)",
				}}
				animate={{
					x: [0, 120, 0],
					y: [0, -15, 0],
				}}
				transition={{
					duration: 22,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Decorative corner elements */}
			<div className="absolute top-0 left-0 w-64 h-64 opacity-20">
				<div
					className="absolute top-8 left-8 w-3 h-3 rounded-full"
					style={{ backgroundColor: "var(--ghibli-sage)" }}
				/>
				<div
					className="absolute top-16 left-4 w-2 h-2 rounded-full"
					style={{ backgroundColor: "var(--ghibli-terracotta)" }}
				/>
				<div
					className="absolute top-24 left-12 w-2.5 h-2.5 rounded-full"
					style={{ backgroundColor: "var(--ghibli-pink)" }}
				/>
			</div>

			<div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
				<div
					className="absolute bottom-8 right-8 w-3 h-3 rounded-full"
					style={{ backgroundColor: "var(--ghibli-pink)" }}
				/>
				<div
					className="absolute bottom-16 right-4 w-2 h-2 rounded-full"
					style={{ backgroundColor: "var(--ghibli-sage)" }}
				/>
				<div
					className="absolute bottom-24 right-12 w-2.5 h-2.5 rounded-full"
					style={{ backgroundColor: "var(--ghibli-terracotta)" }}
				/>
			</div>

			{/* Subtle grain texture */}
			<div
				className="absolute inset-0 opacity-30"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
					backgroundSize: "200px 200px",
				}}
			/>
		</div>
	);
}
