"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";
import { SOCIAL_LINKS } from "./navbarData";

export function NavbarSocialLinks() {
	const { isGhibli } = useTheme();
	return (
		<div className="flex items-center gap-2">
			{SOCIAL_LINKS.map((link) => (
				<motion.a
					key={link.label}
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					whileHover={{ scale: 1.1, y: -2 }}
					whileTap={{ scale: 0.95 }}
					className={cn(
						"p-2 rounded-lg transition-colors cursor-pointer",
						isGhibli
							? "text-[#6e3f28] hover:text-[#d64550] hover:bg-[#6cb65f]/20"
							: "text-white/60 hover:text-white hover:bg-white/10",
					)}
				>
					<link.icon className="w-5 h-5" />
				</motion.a>
			))}
		</div>
	);
}
