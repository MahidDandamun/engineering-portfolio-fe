"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button, Skeleton } from "@/components/ui";
import { BasicInfoSection } from "@/components/admin/projects/BasicInfoSection";
import { ClassificationSection } from "@/components/admin/projects/ClassificationSection";
import { LinksMediaSection } from "@/components/admin/projects/LinksMediaSection";
import { FeaturedSection } from "@/components/admin/projects/FeaturedSection";
import { TechStackInput } from "@/components/projects/TechStackInput";
import { useTechStack } from "@/hooks/useTechStack";
import { useProjectById, useUpdateProject } from "@/hooks";
import { useAdminAuthRedirect } from "@/hooks/useAdminAuthRedirect";

import { slugify } from "@/lib/utils";

import { projectSchema, ProjectFormData } from "@/types/project";
import { useState } from "react";
import { uploadApi } from "@/lib/upload";

interface EditProjectPageProps {
	params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
	useAdminAuthRedirect();
	const { id } = use(params);
	const router = useRouter();
	const { data, isLoading } = useProjectById(id);
	const updateProject = useUpdateProject();
	const { techStack, setTechStack, techInput, setTechInput, addTech, removeTech } = useTechStack();

	const project = data?.data;

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
	});
	const { handleSubmit, setValue, reset, getValues } = form;

	useEffect(() => {
		if (project) {
			reset({
				title: project.title,
				slug: project.slug,
				summary: project.summary,
				description: project.description,
				category: project.category,
				difficulty: project.difficulty,
				githubUrl: project.githubUrl || "",
				liveUrl: project.liveUrl || "",
				thumbnail: project.thumbnail || "",
				featured: project.featured,
			});
			setTimeout(() => setTechStack(project.techStack || []), 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [project, reset]);

	const [selectedThumbnailFile, setSelectedThumbnailFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data: ProjectFormData) => {
		setIsSubmitting(true);
		try {
			if (selectedThumbnailFile) {
				try {
					const res = await uploadApi.uploadProjectImage(selectedThumbnailFile);
					if (res?.success && res.data?.url) {
						data.thumbnail = res.data.url;
					}
				} catch {
					// swallow - mutation will handle errors
				} finally {
					setSelectedThumbnailFile(null);
				}
			}

			await updateProject.mutateAsync({
				id,
				data: {
					...data,
					techStack,
					githubUrl: data.githubUrl || undefined,
					liveUrl: data.liveUrl || undefined,
					thumbnail: data.thumbnail || undefined,
				},
			});
			// Navigate without page transition animation for immediate feedback
			try {
				sessionStorage.setItem("skipPageTransition", "1");
			} catch {}
			// Use client-side navigation for reliability with the App Router
			router.replace("/admin/projects");
		} catch {
			// Error is handled by the mutation's onError callback
		} finally {
			setIsSubmitting(false);
		}
	};

	const generateSlug = () => {
		// Use getValues from react-hook-form to get the current title value
		const currentTitle = getValues("title");
		if (currentTitle) {
			setValue("slug", slugify(currentTitle));
		}
	};

	if (isLoading) {
		return (
			<div className="max-w-4xl mx-auto space-y-8">
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-150 w-full rounded-2xl" />
			</div>
		);
	}

	if (!project) {
		return (
			<div className="max-w-4xl mx-auto text-center py-16">
				<p className="text-white/60">Project not found</p>
				<Link href="/admin/projects">
					<Button className="mt-4">Back to Projects</Button>
				</Link>
			</div>
		);
	}

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
					<h1 className="text-3xl font-bold text-white">Edit Project</h1>
					<p className="text-white/60 mt-1">{project.title}</p>
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
				<BasicInfoSection form={form} />
				<button
					type="button"
					onClick={generateSlug}
					className="text-xs text-violet-400 hover:text-violet-300 mb-4"
				>
					Generate from title
				</button>

				{/* Classification */}
				<ClassificationSection form={form} />
				<TechStackInput
					techStack={techStack}
					techInput={techInput}
					setTechInput={setTechInput}
					addTech={addTech}
					removeTech={removeTech}
				/>
				<FeaturedSection form={form} />

				{/* Links & Media */}
				<LinksMediaSection form={form} onFileSelect={setSelectedThumbnailFile} />

				{/* Actions */}
				<div className="flex justify-end gap-4">
					<Link href="/admin/projects">
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</Link>
					<Button type="submit" isLoading={updateProject.isPending || isSubmitting}>
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</div>
			</motion.form>
		</div>
	);
}
