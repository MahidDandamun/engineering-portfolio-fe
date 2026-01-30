import { z } from "zod";
import { CATEGORIES, DIFFICULTIES } from "@/types/project";

export const projectSchema = z.object({
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

export type ProjectFormData = z.infer<typeof projectSchema>;
