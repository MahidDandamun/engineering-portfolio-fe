import { Project, Certificate, ProjectCategory, ProjectDifficulty } from "@/types";

// Dummy projects for fallback when API is unavailable
export const dummyProjects: Project[] = [
	{
		_id: "1",
		title: "E-Commerce Platform",
		slug: "e-commerce-platform",
		summary: "Modern e-commerce solution with Next.js and Stripe",
		description:
			"A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with Next.js, Stripe, and PostgreSQL.",
		category: "web" as ProjectCategory,
		difficulty: "professional" as ProjectDifficulty,
		techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe", "Prisma"],
		thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
		images: [],
		liveUrl: "https://example.com",
		githubUrl: "https://github.com/example/ecommerce",
		featured: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "2",
		title: "IoT Weather Station",
		slug: "iot-weather-station",
		summary: "Solar-powered IoT weather monitoring with ESP32",
		description:
			"A solar-powered weather monitoring system using ESP32 microcontroller with real-time data visualization dashboard and historical analytics.",
		category: "embedded" as ProjectCategory,
		difficulty: "hard" as ProjectDifficulty,
		techStack: ["C++", "Arduino", "ESP32", "MQTT", "React", "InfluxDB"],
		thumbnail: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
		images: [],
		liveUrl: "",
		githubUrl: "https://github.com/example/weather-station",
		featured: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "3",
		title: "3D Product Configurator",
		slug: "3d-product-configurator",
		summary: "WebGL-based 3D product customization tool",
		description:
			"Interactive 3D product visualization tool allowing customers to customize products in real-time with WebGL rendering.",
		category: "3d" as ProjectCategory,
		difficulty: "hard" as ProjectDifficulty,
		techStack: ["Three.js", "React", "WebGL", "Blender", "TypeScript"],
		thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
		images: [],
		liveUrl: "https://example.com/configurator",
		githubUrl: "https://github.com/example/3d-configurator",
		featured: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "4",
		title: "Task Management API",
		slug: "task-management-api",
		summary: "Scalable task management REST API with real-time features",
		description:
			"RESTful API for task management with JWT authentication, role-based access control, and real-time notifications via WebSocket.",
		category: "software" as ProjectCategory,
		difficulty: "intermediate" as ProjectDifficulty,
		techStack: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io", "Docker"],
		thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
		images: [],
		liveUrl: "",
		githubUrl: "https://github.com/example/task-api",
		featured: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "5",
		title: "Smart Home Controller",
		slug: "smart-home-controller",
		summary: "Raspberry Pi smart home automation system",
		description:
			"Raspberry Pi-based home automation system with voice control, scheduling, and mobile app integration.",
		category: "embedded" as ProjectCategory,
		difficulty: "hard" as ProjectDifficulty,
		techStack: ["Python", "Raspberry Pi", "MQTT", "React Native", "TensorFlow Lite"],
		thumbnail: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
		images: [],
		liveUrl: "",
		githubUrl: "https://github.com/example/smart-home",
		featured: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "6",
		title: "Portfolio Website",
		slug: "portfolio-website",
		summary: "Anime-themed portfolio with Next.js 15",
		description:
			"Personal portfolio website with Ghibli/JJK themed design, smooth animations, and dynamic content management.",
		category: "web" as ProjectCategory,
		difficulty: "intermediate" as ProjectDifficulty,
		techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
		thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
		images: [],
		liveUrl: "https://mhd.dev",
		githubUrl: "https://github.com/example/portfolio",
		featured: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

export const dummyCertificates: Certificate[] = [
	{
		_id: "1",
		title: "AWS Solutions Architect Associate",
		issuer: "Amazon Web Services",
		dateIssued: "2024-06-15",
		credentialId: "AWS-SAA-12345",
		imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "2",
		title: "Google Professional Cloud Developer",
		issuer: "Google Cloud",
		dateIssued: "2024-03-20",
		credentialId: "GCP-PCD-67890",
		imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "3",
		title: "Meta Front-End Developer",
		issuer: "Meta (Coursera)",
		dateIssued: "2023-12-10",
		credentialId: "META-FE-11111",
		imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		_id: "4",
		title: "Certified Kubernetes Administrator",
		issuer: "CNCF",
		dateIssued: "2024-01-05",
		credentialId: "CKA-22222",
		imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

// Tech stack icons mapping (using devicon CDN for consistent icons)
export const techIcons: Record<string, string> = {
	// Languages
	JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
	TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
	Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
	"C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
	C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
	Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
	Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",

	// Frontend
	React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	"Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
	Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
	Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
	Svelte: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
	"Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
	CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
	HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
	Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",

	// Backend
	"Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
	Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
	FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
	GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",

	// Databases
	PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
	MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
	MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
	Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
	Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",

	// DevOps & Cloud
	Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
	Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
	AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
	GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
	Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
	Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
	Bash: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
	Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
	GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",

	// Embedded
	Arduino: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
	"Raspberry Pi": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
	ESP32: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",

	// Design & 3D
	Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
	Blender: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
	"Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
	WebGL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg",

	// Tools
	"VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
	Vim: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
	Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
	Jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",

	// ORMs & Libraries
	Prisma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
	"Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
	JWT: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	"React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	MQTT: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mqtt/mqtt-original.svg",
	InfluxDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/influxdb/influxdb-original.svg",
	Stripe: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	"TensorFlow Lite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
	"Linux/Unix": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
	"Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
};

// Get tech icon URL with fallback
export function getTechIcon(tech: string): string {
	return techIcons[tech] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg";
}
