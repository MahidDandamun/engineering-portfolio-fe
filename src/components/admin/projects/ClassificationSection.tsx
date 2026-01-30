"use client";

import { Select, Input } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/schemas/projectsSchema";
import { CATEGORIES, DIFFICULTIES, categoryLabels, difficultyLabels } from "@/types";

interface ClassificationSectionProps {
	form: UseFormReturn<ProjectFormData>;
}

export function ClassificationSection({ form }: ClassificationSectionProps) {
	const {
		register,
		formState: { errors },
	} = form;
	return (
		<div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
			<h2 className="text-xl font-semibold text-white">Classification</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Select
					label="Category"
					options={CATEGORIES.map((cat) => ({ value: cat, label: categoryLabels[cat] }))}
					{...register("category")}
				/>
				<Select
					label="Difficulty"
					options={DIFFICULTIES.map((diff) => ({ value: diff, label: difficultyLabels[diff] }))}
					{...register("difficulty")}
				/>
			</div>
			<Input
				label="Summary"
				placeholder="A brief one-liner about your project"
				error={errors.summary?.message}
				{...register("summary")}
			/>
		</div>
	);
}
