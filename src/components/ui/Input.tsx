"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, helperText, id, ...props }, ref) => {
		const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={inputId} className="block text-sm font-medium text-white/80">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					className={cn(
						"w-full rounded-xl border bg-white/5 px-4 py-3 text-white",
						"placeholder:text-white/40",
						"transition-all duration-200",
						"focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
						"backdrop-blur-sm",
						error ? "border-red-500/50 focus:ring-red-500" : "border-white/10 hover:border-white/20",
						className,
					)}
					{...props}
				/>
				{error && <p className="text-sm text-red-400">{error}</p>}
				{helperText && !error && <p className="text-sm text-white/50">{helperText}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";
