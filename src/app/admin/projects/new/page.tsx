"use client";

import { useTechStack } from "@/hooks/useTechStack";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { TechStackInput } from "@/components/projects/TechStackInput";
import { BasicInfoSection } from "@/components/admin/projects/BasicInfoSection";
import { ClassificationSection } from "@/components/admin/projects/ClassificationSection";
import { LinksMediaSection } from "@/components/admin/projects/LinksMediaSection";
import { FeaturedSection } from "@/components/admin/projects/FeaturedSection";
import { useCreateProject } from "@/hooks";

import { ProjectFormData, projectSchema } from "@/lib/schemas/projectsSchema";

export default function NewProjectPage() {
	const router = useRouter();
	const createProject = useCreateProject();
	const { techStack, techInput, setTechInput, addTech, removeTech } = useTechStack();

	const form = useForm<ProjectFormData>({
		resolver: zodResolver(projectSchema),
		defaultValues: {
			featured: false,
			category: "web",
			difficulty: "intermediate",
		},
	});
	const { handleSubmit } = form;

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
				<BasicInfoSection form={form} />

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
				<LinksMediaSection form={form} />

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
