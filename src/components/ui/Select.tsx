"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
	value: string;
	label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: SelectOption[];
	placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, label, error, options, placeholder, id, ...props }, ref) => {
		const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

		return (
			<div className="space-y-2">
				{label && (
					<label htmlFor={selectId} className="block text-sm font-medium text-white/80">
						{label}
					</label>
				)}
				<div className="relative">
					<select
						ref={ref}
						id={selectId}
						className={cn(
							"w-full appearance-none rounded-xl border bg-white/5 px-4 py-3 text-white",
							"transition-all duration-200",
							"focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
							"backdrop-blur-sm cursor-pointer",
							error ? "border-red-500/50 focus:ring-red-500" : "border-white/10 hover:border-white/20",
							className,
						)}
						{...props}
					>
						{placeholder && (
							<option value="" className="bg-slate-900">
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option key={option.value} value={option.value} className="bg-slate-900">
								{option.label}
							</option>
						))}
					</select>
					<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
				</div>
				{error && <p className="text-sm text-red-400">{error}</p>}
			</div>
		);
	},
);

Select.displayName = "Select";
