"use client";

import { useTheme } from "@/context";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import SootSprite from "./SootSprite";
import FloatingOrb from "./FloatingOrb";

export function GhibliBackground() {
	const { isGhibli } = useTheme();
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	if (!isGhibli) return null;

	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
			{/* Background Gradient */}
			<div
				className="absolute inset-0 opacity-40"
				style={{
					background: "radial-gradient(circle at 50% 50%, var(--ghibli-cream) 0%, transparent 100%)",
				}}
			/>

			{/* Floating Soot Sprites */}

			<motion.div
				className="absolute top-[20%] left-[10%] w-12 h-12 md:w-16 md:h-16 z-10"
				animate={{ x: mousePosition.x * 0.02, y: mousePosition.y * 0.02, rotate: [0, 5, -5, 0] }}
				transition={{
					rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
					default: { type: "spring", damping: 20, stiffness: 100 },
				}}
			>
				<SootSprite />
			</motion.div>
			<motion.div
				className="absolute bottom-[20%] right-[15%] w-10 h-10 md:w-14 md:h-14 z-10"
				animate={{ x: mousePosition.x * -0.03, y: mousePosition.y * -0.03, rotate: [0, -10, 10, 0] }}
				transition={{
					rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
					default: { type: "spring", damping: 15, stiffness: 80 },
				}}
			>
				<SootSprite />
			</motion.div>
			<motion.div
				className="absolute top-[60%] left-[60%] w-8 h-8 md:w-12 md:h-12 opacity-80 z-10"
				animate={{
					x: mousePosition.x * 0.015,
					y: [mousePosition.y * 0.015, mousePosition.y * 0.015 - 20, mousePosition.y * 0.015],
				}}
				transition={{
					y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
					default: { type: "spring", damping: 25 },
				}}
			>
				<SootSprite />
			</motion.div>

			{/* Floating colored orbs (Spirited Away Palette) */}
			<FloatingOrb
				className="absolute top-20 -left-32 w-64 h-32 rounded-full opacity-20"
				style={{ background: "radial-gradient(circle, var(--ghibli-sage) 0%, transparent 70%)" }}
				animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
				transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
			/>
			<FloatingOrb
				className="absolute top-1/3 -right-40 w-80 h-40 rounded-full opacity-20"
				style={{ background: "radial-gradient(circle, var(--ghibli-pink) 0%, transparent 70%)" }}
				animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
				transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
			/>
			<FloatingOrb
				className="absolute bottom-1/4 -left-24 w-56 h-28 rounded-full opacity-20"
				style={{ background: "radial-gradient(circle, var(--ghibli-teal) 0%, transparent 70%)" }}
				animate={{ x: [0, 60, 0], y: [0, -15, 0] }}
				transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Subtle grain texture */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
					backgroundSize: "200px 200px",
				}}
			/>
		</div>
	);
}
