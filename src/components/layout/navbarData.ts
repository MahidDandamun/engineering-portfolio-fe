// Centralized navigation and social link objects for Navbar components

import { Home, Folder, Award, Mail, Github, Linkedin } from "lucide-react";

export const NAV_LINKS = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/projects", label: "Projects", icon: Folder },
	{ href: "/certificates", label: "Certificates", icon: Award },
	{ href: "/contact", label: "Contact", icon: Mail },
];

export const SOCIAL_LINKS = [
	{
		href: "https://github.com/yourusername",
		icon: Github,
		label: "GitHub",
	},
	{
		href: "https://linkedin.com/in/yourusername",
		icon: Linkedin,
		label: "LinkedIn",
	},
];
