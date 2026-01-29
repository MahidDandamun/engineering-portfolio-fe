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

export const CATEGORIES = ["web", "embedded", "software", "3d"] as const;
export const DIFFICULTIES = ["easy", "intermediate", "hard", "professional"] as const;

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

export const categoryColors: Record<ProjectCategory, string> = {
	web: "from-blue-500 to-cyan-500",
	embedded: "from-orange-500 to-red-500",
	software: "from-purple-500 to-pink-500",
	"3d": "from-green-500 to-emerald-500",
};

// Difficulty display mapping
export const difficultyLabels: Record<ProjectDifficulty, string> = {
	easy: "Beginner",
	intermediate: "Intermediate",
	hard: "Advanced",
	professional: "Professional",
};

export const difficultyColors: Record<ProjectDifficulty, string> = {
	easy: "bg-green-500/20 text-green-400 border-green-500/30",
	intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
	hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
	professional: "bg-red-500/20 text-red-400 border-red-500/30",
};
