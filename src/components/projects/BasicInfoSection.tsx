import { Input, Textarea } from "@/components/ui";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface BasicInfoSectionProps {
	register: UseFormRegister<ProjectFormData>;
	errors: FieldErrors<ProjectFormData>;
}

export function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
	return (
		<div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
			<h2 className="text-xl font-semibold text-white">Basic Information</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Input
					label="Title"
					placeholder="My Awesome Project"
					error={errors.title?.message}
					{...register("title")}
				/>
				<div className="space-y-2">
					<Input
						label="Slug"
						placeholder="my-awesome-project"
						error={errors.slug?.message}
						{...register("slug")}
					/>
				</div>
			</div>
			<Input
				label="Summary"
				placeholder="A brief one-liner about your project"
				error={errors.summary?.message}
				{...register("summary")}
			/>
			<Textarea
				label="Description"
				placeholder="Full project description (supports Markdown)"
				className="min-h-50"
				error={errors.description?.message}
				{...register("description")}
			/>
		</div>
	);
}
