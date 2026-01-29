"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
	children: React.ReactNode;
	variant?: "default" | "outline" | "gradient";
	className?: string;
}

const variants = {
	default: "bg-white/10 text-white/80 border-white/20",
	outline: "bg-transparent border-violet-500/50 text-violet-400",
	gradient: "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border-violet-500/30 text-violet-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
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
