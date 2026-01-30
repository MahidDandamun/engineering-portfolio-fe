"use client";

import { Input, Textarea } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/schemas/projectsSchema";

interface BasicInfoSectionProps {
	form: UseFormReturn<ProjectFormData>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
	const {
		register,
		getValues,
		setValue,
		formState: { errors },
	} = form;

	const generateSlug = () => {
		const currentTitle = getValues("title");
		if (currentTitle) {
			setValue(
				"slug",
				currentTitle
					.toLowerCase()
					.replace(/\s+/g, "-")
					.replace(/[^a-z0-9-]/g, ""),
			);
		}
	};

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
					<button
						type="button"
						onClick={generateSlug}
						className="text-xs text-violet-400 hover:text-violet-300"
					>
						Generate from title
					</button>
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
