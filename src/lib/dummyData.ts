// Tech stack icons mapping (using local icons for consistent icons)
export const techIcons: Record<string, string> = {
	// Languages
	JavaScript: "/icons/javascript-original.svg",
	TypeScript: "/icons/typescript-original.svg",
	Python: "/icons/python-original.svg",
	"C++": "/icons/cplusplus-original.svg",
	C: "/icons/c-original.svg",
	Rust: "/icons/rust-original.svg",
	Go: "/icons/go-original.svg",

	// Frontend
	React: "/icons/react-original.svg",
	"Next.js": "/icons/nextjs-original.svg",
	Vue: "/icons/vuejs-original.svg",
	Angular: "/icons/angularjs-original.svg",
	Svelte: "/icons/svelte-original.svg",
	"Tailwind CSS": "/icons/tailwindcss-original.svg",
	CSS: "/icons/css3-original.svg",
	HTML: "/icons/html5-original.svg",
	Sass: "/icons/sass-original.svg",

	// Backend
	"Node.js": "/icons/nodejs-original.svg",
	Express: "/icons/express-original.svg",
	Django: "/icons/django-plain.svg",
	FastAPI: "/icons/fastapi-original.svg",
	GraphQL: "/icons/graphql-plain.svg",

	// Databases
	PostgreSQL: "/icons/postgresql-original.svg",
	MongoDB: "/icons/mongodb-original.svg",
	MySQL: "/icons/mysql-original.svg",
	Redis: "/icons/redis-original.svg",
	Firebase: "/icons/firebase-plain.svg",

	// DevOps & Cloud
	Docker: "/icons/docker-original.svg",
	Kubernetes: "/icons/kubernetes-plain.svg",
	AWS: "/icons/amazonwebservices-plain-wordmark.svg",
	GCP: "/icons/googlecloud-original.svg",
	Azure: "/icons/azure-original.svg",
	Linux: "/icons/linux-original.svg",
	Bash: "/icons/bash-original.svg",
	Git: "/icons/git-original.svg",
	GitHub: "/icons/github-original.svg",

	// Embedded
	Arduino: "/icons/arduino-original.svg",
	"Raspberry Pi": "/icons/raspberrypi-original.svg",
	ESP32: "/icons/arduino-original.svg",

	// Design & 3D
	Figma: "/icons/figma-original.svg",
	Blender: "/icons/blender-original.svg",
	"Three.js": "/icons/threejs-original.svg",
	WebGL: "/icons/opengl-original.svg",

	// Tools
	"VS Code": "/icons/vscode-original.svg",
	Vim: "/icons/vim-original.svg",
	Postman: "/icons/postman-original.svg",
	Jira: "/icons/jira-original.svg",

	// ORMs & Libraries
	Prisma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
	"Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
	JWT: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
	"React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
	MQTT: "/icons/mqtt-original.svg",
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
