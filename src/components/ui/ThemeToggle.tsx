"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context";

interface ThemeToggleProps {
	className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
	const { toggleTheme, isGhibli } = useTheme();
	return (
		<motion.button
			onClick={toggleTheme}
			className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-500 ${
				isGhibli
					? "bg-gradient-to-r from-[#d64550] via-[#a62c2c] to-[#0e3b6c]"
					: "bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#dc2626]"
			} ${className}`}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			aria-label={`Switch to ${isGhibli ? "dark" : "light"} mode`}
		>
			{/* Track glow */}
			<motion.div
				className="absolute inset-0 rounded-full blur-md opacity-50"
				style={{
					background: isGhibli
						? "linear-gradient(90deg, #d64550, #a62c2c, #0e3b6c)"
						: "linear-gradient(90deg, #8b5cf6, #3b82f6, #dc2626)",
				}}
				animate={{
					opacity: [0.3, 0.6, 0.3],
				}}
				transition={{ duration: 2, repeat: Infinity }}
			/>

			{/* Sliding indicator */}
			<motion.div
				className="relative w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
				style={{
					background: isGhibli ? "#ffffff" : "#0a0a0f",
				}}
				animate={{
					x: isGhibli ? 0 : 32,
				}}
				transition={{ type: "spring", stiffness: 500, damping: 30 }}
			>
				<AnimatePresence mode="wait">
					{isGhibli ? (
						<motion.div
							key="sun"
							initial={{ scale: 0, rotate: -180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: 180 }}
							transition={{ duration: 0.3 }}
						>
							{/* Sun icon - Ghibli style */}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="5" fill="#d64550" />
								{[...Array(8)].map((_, i) => (
									<motion.line
										key={i}
										x1="12"
										y1="2"
										x2="12"
										y2="5"
										stroke="#d64550"
										strokeWidth="2"
										strokeLinecap="round"
										transform={`rotate(${i * 45} 12 12)`}
										animate={{ opacity: [0.5, 1, 0.5] }}
										transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
									/>
								))}
							</svg>
						</motion.div>
					) : (
						<motion.div
							key="moon"
							initial={{ scale: 0, rotate: 180 }}
							animate={{ scale: 1, rotate: 0 }}
							exit={{ scale: 0, rotate: -180 }}
							transition={{ duration: 0.3 }}
						>
							{/* Cursed eye - JJK style */}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
								<circle cx="12" cy="12" r="6" fill="#8b5cf6" />
								<circle cx="12" cy="12" r="3" fill="#3b82f6" />
								<motion.g
									animate={{ scale: [1, 1.5, 1] }}
									transition={{ duration: 1, repeat: Infinity }}
									style={{ transformOrigin: "12px 12px" }}
								>
									<circle cx={12} cy={12} r={1} fill="#dc2626" />
								</motion.g>
							</svg>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* Theme label */}
			<span className="sr-only">{isGhibli ? "Ghibli Light Mode" : "JJK Dark Mode"}</span>
		</motion.button>
	);
}
