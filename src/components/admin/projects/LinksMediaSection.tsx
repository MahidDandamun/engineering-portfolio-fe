"use client";

import { Input } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/schemas/projectsSchema";

interface LinksMediaSectionProps {
	form: UseFormReturn<ProjectFormData>;
}

export function LinksMediaSection({ form }: LinksMediaSectionProps) {
	const {
		register,
		formState: { errors },
	} = form;
	return (
		<div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
			<h2 className="text-xl font-semibold text-white">Links & Media</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					label="GitHub URL"
					placeholder="https://github.com/..."
					error={errors.githubUrl?.message}
					{...register("githubUrl")}
				/>
				<Input
					label="Live URL"
					placeholder="https://..."
					error={errors.liveUrl?.message}
					{...register("liveUrl")}
				/>
			</div>
			<Input
				label="Thumbnail URL"
				placeholder="https://..."
				error={errors.thumbnail?.message}
				{...register("thumbnail")}
			/>
		</div>
	);
}
