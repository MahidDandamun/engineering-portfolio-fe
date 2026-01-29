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
					? "bg-gradient-to-r from-[#e74c3c] via-[#f39c12] to-[#3498db] text-white hover:opacity-90 shadow-lg shadow-[#e74c3c]/25 ghibli-button"
					: "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:from-[#7c3aed] hover:to-[#2563eb] shadow-lg shadow-purple-500/25",
				secondary: isGhibli
					? "bg-white/80 text-[#2d3436] hover:bg-white border border-[#ffeaa7] backdrop-blur-sm"
					: "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
				ghost: isGhibli
					? "text-[#636e72] hover:text-[#2d3436] hover:bg-[#ffeaa7]/50"
					: "text-white/70 hover:text-white hover:bg-white/10",
				danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 shadow-lg shadow-red-500/25",
				outline: isGhibli
					? "border-2 border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c]/10"
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
					"relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
					isGhibli
						? "focus:outline-none focus:ring-2 focus:ring-[#e74c3c] focus:ring-offset-2 focus:ring-offset-[#fef9f3]"
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
