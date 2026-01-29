const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export class ApiError extends Error {
	constructor(
		message: string,
		public status: number,
		public data?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export async function api<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: "include", // Required for cookie auth
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	const data = await res.json();

	if (!res.ok) {
		throw new ApiError(data.message || "Request failed", res.status, data);
	}

	return data;
}

// Type-safe API utilities
export function createQueryString(params: Record<string, string | number | boolean | undefined>): string {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			searchParams.set(key, String(value));
		}
	});

	const queryString = searchParams.toString();
	return queryString ? `?${queryString}` : "";
}

export { API_BASE };
