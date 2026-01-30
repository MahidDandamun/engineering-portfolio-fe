import { Select } from "@/components/ui";
import React from "react";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ProjectFormData } from "@/types/project";

interface ClassificationSectionProps {
	register: UseFormRegister<ProjectFormData>;
	CATEGORIES: readonly string[];
	categoryLabels: Record<string, string>;
	DIFFICULTIES: readonly string[];
	difficultyLabels: Record<string, string>;
	errors: FieldErrors<ProjectFormData>;
}

export function ClassificationSection({
	register,
	CATEGORIES,
	categoryLabels,
	DIFFICULTIES,
	difficultyLabels,
	errors,
}: ClassificationSectionProps) {
	return (
		<div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
			<h2 className="text-xl font-semibold text-white">Classification</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Select
					label="Category"
					options={CATEGORIES.map((cat) => ({
						value: cat,
						label: categoryLabels[cat],
					}))}
					error={errors.category?.message}
					{...register("category")}
				/>
				<Select
					label="Difficulty"
					options={DIFFICULTIES.map((diff) => ({
						value: diff,
						label: difficultyLabels[diff],
					}))}
					error={errors.difficulty?.message}
					{...register("difficulty")}
				/>
			</div>
		</div>
	);
}
