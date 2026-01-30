"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

export function NavbarLogo() {
	const { isGhibli } = useTheme();
	return (
		<Link href="/" className="relative z-10">
			<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
				<div
					className={cn(
						"w-10 h-10 rounded-xl flex items-center justify-center",
						isGhibli
							? "bg-linear-to-br from-[#d64550] via-[#a62c2c] to-[#0e3b6c]"
							: "bg-linear-to-br from-[#8b5cf6] via-[#3b82f6] to-[#dc2626] jjk-glow",
					)}
				>
					<span className="text-white font-bold text-lg">M</span>
				</div>
				<span
					className={cn(
						"hidden sm:block font-semibold text-lg",
						isGhibli ? "text-(--foreground)" : "text-white",
					)}
				>
					MHD
					<span className={isGhibli ? "text-(--ghibli-terracotta)" : "text-[#8b5cf6]"}>.dev</span>
				</span>
			</motion.div>
		</Link>
	);
}
