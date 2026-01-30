"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

export function NavbarResumeButton() {
	const { isGhibli } = useTheme();
	return (
		<motion.a
			href="/resume.pdf"
			target="_blank"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={cn(
				"flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-lg cursor-pointer",
				isGhibli
					? "bg-linear-to-r from-[#d64550] via-[#a62c2c] to-[#0e3b6c] shadow-[#d64550]/25 hover:shadow-xl hover:shadow-[#d64550]/40"
					: "bg-linear-to-r from-[#8b5cf6] via-[#3b82f6] to-[#dc2626] shadow-[#8b5cf6]/25 hover:shadow-xl hover:shadow-[#8b5cf6]/40",
			)}
		>
			<Download className="w-4 h-4" />
			Resume
		</motion.a>
	);
}
