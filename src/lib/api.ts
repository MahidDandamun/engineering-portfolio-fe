// Default to an empty base so requests are relative to the current origin
// (works for Next API routes). Set `NEXT_PUBLIC_API_URL` to override.
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

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
	try {
		const isAbsoluteUrl = /^https?:\/\//i.test(endpoint);
		const url = isAbsoluteUrl ? endpoint : `${API_BASE}${endpoint}`;
		const res = await fetch(url, {
			...options,
			credentials: "include", // Required for cookie auth
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache", // Force fresh response
				...options.headers,
			},
		});

		console.log("API Response: URL", url);
		console.log("API Response: Status", res.status);

		if (!res.ok) {
			const errorData = await res.json().catch(() => null);
			// Log as warning to avoid surfacing expected API validation/auth errors as console errors
			if (errorData && Object.keys(errorData).length > 0) {
				console.warn("API Warning: Response", errorData);
			} else {
				console.warn("API Warning: No error details from server");
			}
			throw new ApiError(errorData?.message || "Request failed", res.status, errorData);
		}

		// Some endpoints (DELETE) may return 204 No Content — avoid parsing JSON in that case
		if (res.status === 204) {
			console.log("API Response: No Content (204)");
			return undefined as unknown as T;
		}

		const data = await res.json();

		console.log("API Response: Data", data);

		return data;
	} catch (error) {
		// Only log network/unexpected errors as errors
		if (!(error instanceof ApiError)) {
			console.error("API Error", error);
		}
		if (error instanceof ApiError) {
			throw error;
		}

		throw new ApiError("Network error", 0, {
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
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
