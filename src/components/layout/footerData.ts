// Centralized data objects for Footer component
import { Github, Linkedin, Mail } from "lucide-react";

export const FOOTER_LINKS = [
	{
		title: "Navigation",
		links: [
			{ href: "/", label: "Home" },
			{ href: "/projects", label: "Projects" },
			{ href: "/certificates", label: "Certificates" },
			{ href: "/contact", label: "Contact" },
		],
	},
	{
		title: "Categories",
		links: [
			{ href: "/projects?category=web", label: "Web Development" },
			{ href: "/projects?category=embedded", label: "Embedded Systems" },
			{ href: "/projects?category=software", label: "Software Engineering" },
			{ href: "/projects?category=3d", label: "3D Design" },
		],
	},
];

export const FOOTER_SOCIAL_LINKS = [
	{ href: "https://github.com/yourusername", icon: Github, label: "GitHub" },
	{
		href: "https://linkedin.com/in/yourusername",
		icon: Linkedin,
		label: "LinkedIn",
	},
	{ href: "mailto:your@email.com", icon: Mail, label: "Email" },
];
