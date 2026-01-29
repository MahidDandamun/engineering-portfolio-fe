"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
	glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
	const { isGhibli } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
			transition={{ duration: 0.3 }}
			className={cn(
				"relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-500 cursor-pointer",
				isGhibli
					? "border-[#6cb65f]/30 bg-white/90 shadow-lg shadow-[#6e3f28]/5 hover:shadow-xl hover:shadow-[#6e3f28]/10"
					: "border-white/10 bg-white/5",
				glow && (isGhibli ? "shadow-xl shadow-[#d64550]/20" : "shadow-xl shadow-[#8b5cf6]/10"),
				isGhibli ? "ghibli-card" : "jjk-card",
				className,
			)}
		>
			{/* Gradient border effect */}
			<div
				className={cn(
					"absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
					isGhibli
						? "bg-linear-to-br from-[#e74c3c]/20 via-transparent to-[#3498db]/20"
						: "bg-linear-to-br from-[#8b5cf6]/20 via-transparent to-[#3b82f6]/20",
				)}
			/>

			{/* Content */}
			<div className="relative z-10">{children}</div>
		</motion.div>
	);
}

interface CardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
	return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

interface CardContentProps {
	children: React.ReactNode;
	className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
	return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

interface CardFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
	return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}
