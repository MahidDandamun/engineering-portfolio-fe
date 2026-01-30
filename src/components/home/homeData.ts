// Centralized data objects for Home components
import { Code2, Database, Palette, Cpu } from "lucide-react";

export const SKILL_DOMAINS = [
	{
		title: "Web Development",
		icon: Code2,
		colorLight: "from-red-400 to-amber-400",
		colorDark: "from-violet-500 to-purple-600",
		skills: ["React", "Next.js", "Node.js", "Express", "TypeScript", "Tailwind CSS"],
	},
	{
		title: "Data & Cloud",
		icon: Database,
		colorLight: "from-blue-400 to-sky-400",
		colorDark: "from-blue-500 to-cyan-500",
		skills: ["PostgreSQL", "MongoDB", "Docker", "AWS", "Redis", "Prisma"],
	},
	{
		title: "Systems & Embedded",
		icon: Cpu,
		colorLight: "from-amber-400 to-yellow-300",
		colorDark: "from-red-500 to-orange-500",
		skills: ["C", "C++", "Python", "Linux", "Bash", "Arduino"],
	},
	{
		title: "Design & Tooling",
		icon: Palette,
		colorLight: "from-emerald-400 to-teal-400",
		colorDark: "from-pink-500 to-rose-500",
		skills: ["Figma", "Blender", "Git", "VS Code", "Postman", "Jira"],
	},
];
