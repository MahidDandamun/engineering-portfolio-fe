"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, helperText, id, ...props }, ref) => {
		const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
		const { isGhibli } = useTheme();

		return (
			<div className="space-y-2">
				{label && (
					<label
						htmlFor={inputId}
						className={cn("block text-sm font-medium", isGhibli ? "text-[#6e3f28]" : "text-white/80")}
					>
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					className={cn(
						"w-full rounded-xl border px-4 py-3",
						"transition-all duration-200",
						"focus:outline-none focus:ring-2 focus:border-transparent",
						"backdrop-blur-sm",
						isGhibli
							? "bg-white/80 text-[#6e3f28] placeholder:text-[#6e3f28]/40 border-[#d64550]/30 hover:border-[#d64550]/50 focus:ring-[#d64550]"
							: "bg-white/5 text-white placeholder:text-white/40 border-white/10 hover:border-white/20 focus:ring-violet-500",
						error
							? isGhibli
								? "border-[#a62c2c]/50 focus:ring-[#a62c2c]"
								: "border-red-500/50 focus:ring-red-500"
							: "",
						className,
					)}
					{...props}
				/>
				{error && <p className={cn("text-sm", isGhibli ? "text-[#a62c2c]" : "text-red-400")}>{error}</p>}
				{helperText && !error && (
					<p className={cn("text-sm", isGhibli ? "text-[#6e3f28]/70" : "text-white/50")}>{helperText}</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
