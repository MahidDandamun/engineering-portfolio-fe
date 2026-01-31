"use client";

import { Input, Button } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/lib/schemas/projectsSchema";
import { useState } from "react";

interface LinksMediaSectionProps {
	form: UseFormReturn<ProjectFormData>;
	onFileSelect?: (file: File | null) => void;
}

export function LinksMediaSection({ form, onFileSelect }: LinksMediaSectionProps) {
	const {
		register,
		formState: { errors },
		setValue,
		watch,
	} = form;

	const [uploading] = useState(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const thumbnailValue = watch("thumbnail");
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
			<div>
				<Input
					label="Thumbnail URL"
					placeholder="https://..."
					error={errors.thumbnail?.message}
					{...register("thumbnail")}
					disabled={!!selectedFile}
				/>

				<div className="mt-2 flex items-center gap-3">
					<input
						id="thumbnail-file"
						name="thumbnail-file"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0] ?? null;
							setSelectedFile(file);
							// clear any manual thumbnail URL when a file is chosen
							if (file) {
								setValue("thumbnail", "", { shouldValidate: true, shouldDirty: true });
								onFileSelect?.(file);
							}
						}}
					/>
					<Button
						type="button"
						variant="secondary"
						disabled={uploading || (!!thumbnailValue && !selectedFile)}
						onClick={() => document.getElementById("thumbnail-file")?.click()}
					>
						{selectedFile ? "Change File" : "Attach Image"}
					</Button>

					{selectedFile ? (
						<div className="flex items-center gap-2">
							<span className="text-sm text-white/60">{selectedFile.name}</span>
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setSelectedFile(null);
									onFileSelect?.(null);
								}}
							>
								Remove
							</Button>
						</div>
					) : null}

					{thumbnailValue && !selectedFile ? (
						<div className="flex items-center gap-2">
							<a href={thumbnailValue} target="_blank" rel="noreferrer" className="text-sm text-white/70">
								View
							</a>
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									setValue("thumbnail", "", { shouldValidate: true, shouldDirty: true });
								}}
							>
								Remove
							</Button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
