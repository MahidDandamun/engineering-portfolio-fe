"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context";

export function MouseFollower() {
	const { isGhibli } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { damping: 25, stiffness: 300 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);

	// Trail positions with different spring configs for staggered effect
	const trail1X = useSpring(cursorX, { damping: 30, stiffness: 200 });
	const trail1Y = useSpring(cursorY, { damping: 30, stiffness: 200 });
	const trail2X = useSpring(cursorX, { damping: 35, stiffness: 150 });
	const trail2Y = useSpring(cursorY, { damping: 35, stiffness: 150 });
	const trail3X = useSpring(cursorX, { damping: 40, stiffness: 100 });
	const trail3Y = useSpring(cursorY, { damping: 40, stiffness: 100 });

	useEffect(() => {
		// Use requestAnimationFrame to avoid synchronous setState warning
		const raf = requestAnimationFrame(() => setIsMounted(true));

		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		const handleMouseDown = () => setIsClicking(true);
		const handleMouseUp = () => setIsClicking(false);

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "BUTTON" ||
				target.tagName === "A" ||
				target.closest("button") ||
				target.closest("a") ||
				target.classList.contains("cursor-pointer") ||
				target.closest("[role='button']") ||
				target.closest("[role='link']")
			) {
				setIsHovering(true);
			}
		};

		const handleMouseOut = () => {
			setIsHovering(false);
		};

		window.addEventListener("mousemove", moveCursor);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseout", handleMouseOut);

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("mousemove", moveCursor);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseout", handleMouseOut);
		};
	}, [cursorX, cursorY]);

	if (!isMounted) return null;

	// Only show custom cursor on non-touch devices
	if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
		return null;
	}

	return (
		<>
			{/* Main cursor - Soot Sprite inspired */}
			<motion.div
				className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
			>
				<motion.div
					animate={{
						scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
						rotate: isHovering ? [0, 10, -10, 0] : 0,
					}}
					transition={{
						scale: { type: "spring", stiffness: 500, damping: 30 },
						rotate: { duration: 0.5, repeat: isHovering ? Infinity : 0 },
					}}
					className="relative -translate-x-1/2 -translate-y-1/2"
				>
					{/* Main circle */}
					<div className={`w-5 h-5 rounded-full ${isGhibli ? "bg-[#0e3b6c]" : "bg-white"}`} />
					{/* Eyes when hovering */}
					{isHovering && (
						<>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className={`absolute top-1 left-0.5 w-1.5 h-1.5 rounded-full ${
									isGhibli ? "bg-white" : "bg-black"
								}`}
							/>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className={`absolute top-1 right-0.5 w-1.5 h-1.5 rounded-full ${
									isGhibli ? "bg-white" : "bg-black"
								}`}
							/>
						</>
					)}
				</motion.div>
			</motion.div>

			{/* Trail particles - magical dust effect */}
			<motion.div className="fixed top-0 left-0 pointer-events-none z-9998" style={{ x: trail1X, y: trail1Y }}>
				<motion.div
					animate={{
						scale: [0.8, 1, 0.8],
						opacity: [0.6, 0.8, 0.6],
					}}
					transition={{ duration: 1.5, repeat: Infinity }}
					className={`w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 ${
						isGhibli ? "bg-[#d64550]/60" : "bg-purple-500/60"
					}`}
				/>
			</motion.div>

			<motion.div className="fixed top-0 left-0 pointer-events-none z-9997" style={{ x: trail2X, y: trail2Y }}>
				<motion.div
					animate={{
						scale: [0.6, 0.8, 0.6],
						opacity: [0.4, 0.6, 0.4],
					}}
					transition={{ duration: 1.8, repeat: Infinity, delay: 0.1 }}
					className={`w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 ${
						isGhibli ? "bg-[#6cb65f]/50" : "bg-blue-500/50"
					}`}
				/>
			</motion.div>

			<motion.div className="fixed top-0 left-0 pointer-events-none z-9996" style={{ x: trail3X, y: trail3Y }}>
				<motion.div
					animate={{
						scale: [0.4, 0.6, 0.4],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
					className={`w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 ${
						isGhibli ? "bg-[#399e90]/40" : "bg-red-500/40"
					}`}
				/>
			</motion.div>
		</>
	);
}
