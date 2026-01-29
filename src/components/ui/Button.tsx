"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
	variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
	size?: "sm" | "md" | "lg";
	isLoading?: boolean;
	children?: React.ReactNode;
}

const sizes = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-5 py-2.5 text-sm",
	lg: "px-8 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
		const { isGhibli } = useTheme();

		const getVariantClasses = () => {
			const variants = {
				primary: isGhibli
					? "bg-linear-to-r from-[#a62c2c] via-[#d64550] to-[#0e3b6c] text-white hover:shadow-xl hover:shadow-[#d64550]/30 shadow-lg shadow-[#d64550]/20"
					: "bg-linear-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb] shadow-lg shadow-purple-500/25",
				secondary: isGhibli
					? "bg-white/90 text-[#6e3f28] hover:bg-white border-2 border-[#6cb65f]/40 backdrop-blur-sm hover:border-[#6cb65f]"
					: "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
				ghost: isGhibli
					? "text-[#6e3f28] hover:text-[#a62c2c] hover:bg-[#6cb65f]/20"
					: "text-white/70 hover:text-white hover:bg-white/10",
				danger: "bg-linear-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/25",
				outline: isGhibli
					? "border-2 border-[#0e3b6c] text-[#0e3b6c] hover:bg-[#0e3b6c]/10 hover:border-[#d64550] hover:text-[#d64550]"
					: "border-2 border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6]/10",
			};
			return variants[variant];
		};

		return (
			<motion.button
				ref={ref}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				disabled={disabled || isLoading}
				className={cn(
					"relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer",
					isGhibli
						? "focus:outline-none focus:ring-2 focus:ring-[#d64550] focus:ring-offset-2 focus:ring-offset-[#f7f0e3]"
						: "focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]",
					"disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
					getVariantClasses(),
					sizes[size],
					className,
				)}
				{...props}
			>
				{isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
				{children}
			</motion.button>
		);
	},
);

Button.displayName = "Button";
