"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context";

export function MotionToggle({ className = "" }: { className?: string }) {
	const { motionEnabled, toggleMotion, isGhibli } = useTheme();

	return (
		<motion.button
			onClick={toggleMotion}
			className={`relative w-12 h-8 rounded-full p-1 transition-colors duration-300 ${className} ${
				isGhibli ? "bg-[#e6f6e9]" : "bg-white/6"
			}`}
			whileTap={{ scale: 0.98 }}
			aria-label={motionEnabled ? "Disable animations" : "Enable animations"}
		>
			<motion.div
				className="w-6 h-6 rounded-full bg-white shadow-sm"
				animate={{ x: motionEnabled ? 20 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
			/>
			<span className="sr-only">{motionEnabled ? "Animations enabled" : "Animations disabled"}</span>
		</motion.button>
	);
}
