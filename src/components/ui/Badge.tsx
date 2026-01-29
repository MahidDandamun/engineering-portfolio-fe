"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "outline" | "gradient";
	className?: string;
}

// Ghibli (light) variants - Spirited Away palette
const ghibliVariants = {
	default: "bg-[#6cb65f]/15 text-[#6e3f28] border-[#6cb65f]/30",
	outline: "bg-transparent border-[#d64550]/40 text-[#a62c2c]",
	gradient: "bg-gradient-to-r from-[#d64550]/20 via-[#a62c2c]/15 to-[#0e3b6c]/20 border-[#d64550]/30 text-[#a62c2c]",
};

// JJK (dark) variants - Cursed energy palette
const jjkVariants = {
	default: "bg-white/10 text-white/80 border-white/20",
	outline: "bg-transparent border-[#8b5cf6]/50 text-[#a78bfa]",
	gradient: "bg-gradient-to-r from-[#8b5cf6]/20 via-[#3b82f6]/15 to-[#dc2626]/20 border-[#8b5cf6]/30 text-[#a78bfa]",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
	const { isGhibli } = useTheme();
	const variants = isGhibli ? ghibliVariants : jjkVariants;

	return (
		<span
			className={cn(
				"inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
				"transition-all duration-200",
				variants[variant],
				className,
			)}
		>
			{children}
		</span>
	);
}
