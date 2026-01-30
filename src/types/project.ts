import { z } from "zod";

export const CATEGORIES = ["web", "embedded", "software", "3d"] as const;
export const DIFFICULTIES = ["easy", "intermediate", "hard", "professional"] as const;

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
// Project Types
export interface Project {
	_id: string;
	slug: string;
	title: string;
	summary: string;
	description: string; // Markdown content
	category: ProjectCategory;
	difficulty: ProjectDifficulty;
	techStack: string[];
	githubUrl?: string;
	liveUrl?: string;
	thumbnail?: string;
	images?: string[];
	featured: boolean;
	createdAt: string;
	updatedAt: string;
}

export type ProjectCategory = (typeof CATEGORIES)[number];
export type ProjectDifficulty = (typeof DIFFICULTIES)[number];

export interface CreateProjectDTO {
	slug: string;
	title: string;
	summary: string;
	description: string;
	category: ProjectCategory;
	difficulty: ProjectDifficulty;
	techStack: string[];
	githubUrl?: string;
	liveUrl?: string;
	thumbnail?: string;
	images?: string[];
	featured?: boolean;
}

export type UpdateProjectDTO = Partial<CreateProjectDTO>;

// Category display mapping
export const categoryLabels: Record<ProjectCategory, string> = {
	web: "Web Development",
	embedded: "Embedded Systems",
	software: "Software Engineering",
	"3d": "3D Design",
};

// Ghibli (light) category colors - Spirited Away palette
export const categoryColorsGhibli: Record<ProjectCategory, string> = {
	web: "from-[#0e3b6c] to-[#399e90]", // Blue to Teal
	embedded: "from-[#d64550] to-[#a62c2c]", // Pink to Dark Red
	software: "from-[#a62c2c] to-[#6e3f28]", // Dark Red to Brown
	"3d": "from-[#6cb65f] to-[#399e90]", // Green to Teal
};

// JJK (dark) category colors - Cursed energy palette
export const categoryColorsJJK: Record<ProjectCategory, string> = {
	web: "from-[#3b82f6] to-[#60a5fa]", // Blue shades
	embedded: "from-[#dc2626] to-[#ef4444]", // Red shades
	software: "from-[#8b5cf6] to-[#a78bfa]", // Purple shades
	"3d": "from-[#10b981] to-[#34d399]", // Green shades
};

// Legacy - for backwards compatibility (uses JJK by default)
export const categoryColors: Record<ProjectCategory, string> = categoryColorsJJK;

// Difficulty display mapping
export const difficultyLabels: Record<ProjectDifficulty, string> = {
	easy: "Beginner",
	intermediate: "Intermediate",
	hard: "Advanced",
	professional: "Professional",
};

// Ghibli (light) difficulty colors - Spirited Away palette
export const difficultyColorsGhibli: Record<ProjectDifficulty, string> = {
	easy: "bg-[#6cb65f]/20 text-[#4a8f3d] border-[#6cb65f]/40",
	intermediate: "bg-[#d64550]/20 text-[#a62c2c] border-[#d64550]/40",
	hard: "bg-[#0e3b6c]/20 text-[#0e3b6c] border-[#0e3b6c]/40",
	professional: "bg-[#6e3f28]/20 text-[#6e3f28] border-[#6e3f28]/40",
};

// JJK (dark) difficulty colors - Cursed energy palette
export const difficultyColorsJJK: Record<ProjectDifficulty, string> = {
	easy: "bg-[#10b981]/20 text-[#34d399] border-[#10b981]/30",
	intermediate: "bg-[#f59e0b]/20 text-[#fbbf24] border-[#f59e0b]/30",
	hard: "bg-[#8b5cf6]/20 text-[#a78bfa] border-[#8b5cf6]/30",
	professional: "bg-[#dc2626]/20 text-[#ef4444] border-[#dc2626]/30",
};

// Legacy - for backwards compatibility
export const difficultyColors: Record<ProjectDifficulty, string> = difficultyColorsJJK;
