import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function formatDateShort(dateString: string): string {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
	});
}

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}
const BLOCKED_IMAGE_HOSTS = new Set(["via.placeholder.com", "placeholder.com", "placehold.co", "placehold.it"]);
const LOCAL_PLACEHOLDER = "/placeholder.svg";

export function normalizeImageUrl(url?: string | null): string | null {
	if (!url) return null;
	if (url.startsWith("/")) return url;

	try {
		const parsed = new URL(url);
		if (BLOCKED_IMAGE_HOSTS.has(parsed.hostname)) {
			return LOCAL_PLACEHOLDER;
		}
		return url;
	} catch {
		return LOCAL_PLACEHOLDER;
	}
}
