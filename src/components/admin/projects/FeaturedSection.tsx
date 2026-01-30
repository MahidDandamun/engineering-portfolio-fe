"use client";

import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/schemas/projectsSchema";

interface FeaturedSectionProps {
	form: UseFormReturn<ProjectFormData>;
}

export function FeaturedSection({ form }: FeaturedSectionProps) {
	const { register } = form;
	return (
		<label className="flex items-center gap-3 cursor-pointer">
			<input
				type="checkbox"
				{...register("featured")}
				className="w-5 h-5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
			/>
			<span className="text-white">Feature this project on homepage</span>
		</label>
	);
}
