"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Link from "next/link";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { useCreateProject } from "@/hooks";
import { CATEGORIES, DIFFICULTIES, categoryLabels, difficultyLabels } from "@/types";
import { slugify } from "@/lib/utils";

const projectSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z.string().min(3, "Slug must be at least 3 characters"),
	summary: z.string().min(10, "Summary must be at least 10 characters"),
	description: z.string().min(50, "Description must be at least 50 characters"),
	category: z.enum(CATEGORIES),
	difficulty: z.enum(DIFFICULTIES),
	githubUrl: z.string().url().optional().or(z.literal("")),
	liveUrl: z.string().url().optional().or(z.literal("")),
	thumbnail: z.string().url().optional().or(z.literal("")),
	featured: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
	const router = useRouter();
	const createProject = useCreateProject();
	const [techStack, setTechStack] = useState<string[]>([]);
	const [techInput, setTechInput] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			featured: false,
			category: "web",
			difficulty: "intermediate",
		},
	});

	// eslint-disable-next-line react-hooks/incompatible-library
	const title = watch("title");

	const onSubmit = async (data: ProjectFormData) => {
		try {
			await createProject.mutateAsync({
				...data,
				techStack,
				githubUrl: data.githubUrl || undefined,
				liveUrl: data.liveUrl || undefined,
				thumbnail: data.thumbnail || undefined,
			});
			router.push("/admin/projects");
		} catch {
			// Error is handled by the mutation's onError callback
		}
	};

	const addTech = () => {
		if (techInput.trim() && !techStack.includes(techInput.trim())) {
			setTechStack([...techStack, techInput.trim()]);
			setTechInput("");
		}
	};

	const removeTech = (tech: string) => {
		setTechStack(techStack.filter((t) => t !== tech));
	};

	const generateSlug = () => {
		if (title) {
			setValue("slug", slugify(title));
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center gap-4"
			>
				<Link
					href="/admin/projects"
					className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<div>
					<h1 className="text-3xl font-bold text-white">New Project</h1>
					<p className="text-white/60 mt-1">Create a new portfolio project</p>
				</div>
			</motion.div>

			{/* Form */}
			<motion.form
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-8"
			>
				{/* Basic Info */}
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

				{/* Classification */}
				<div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
					<h2 className="text-xl font-semibold text-white">Classification</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Select
							label="Category"
							options={CATEGORIES.map((cat) => ({
								value: cat,
								label: categoryLabels[cat],
							}))}
							{...register("category")}
						/>

						<Select
							label="Difficulty"
							options={DIFFICULTIES.map((diff) => ({
								value: diff,
								label: difficultyLabels[diff],
							}))}
							{...register("difficulty")}
						/>
					</div>

					{/* Tech Stack */}
					<div className="space-y-3">
						<label className="block text-sm font-medium text-white/80">Tech Stack</label>
						<div className="flex gap-2">
							<Input
								placeholder="Add technology..."
								value={techInput}
								onChange={(e) => setTechInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
								className="flex-1"
							/>
							<Button type="button" onClick={addTech} variant="secondary">
								<Plus className="w-4 h-4" />
							</Button>
						</div>
						{techStack.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{techStack.map((tech) => (
									<span
										key={tech}
										className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20"
									>
										{tech}
										<button
											type="button"
											onClick={() => removeTech(tech)}
											className="hover:text-violet-200"
										>
											<X className="w-3.5 h-3.5" />
										</button>
									</span>
								))}
							</div>
						)}
					</div>

					{/* Featured */}
					<label className="flex items-center gap-3 cursor-pointer">
						<input
							type="checkbox"
							{...register("featured")}
							className="w-5 h-5 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500"
						/>
						<span className="text-white">Feature this project on homepage</span>
					</label>
				</div>

				{/* Links & Media */}
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

				{/* Actions */}
				<div className="flex justify-end gap-4">
					<Link href="/admin/projects">
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</Link>
					<Button type="submit" isLoading={createProject.isPending}>
						<Save className="w-4 h-4 mr-2" />
						Create Project
					</Button>
				</div>
			</motion.form>
		</div>
	);
}
