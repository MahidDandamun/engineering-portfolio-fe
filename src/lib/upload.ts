const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface UploadResponse {
	success: boolean;
	data?: {
		url: string;
		publicId: string;
	};
	message?: string;
}

export const uploadApi = {
	uploadProjectImage: async (file: File, signal?: AbortSignal): Promise<UploadResponse> => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${API_BASE}/api/upload/project`, {
			method: "POST",
			credentials: "include",
			body: formData, // No Content-Type header for FormData
			signal,
		});

		return res.json();
	},

	uploadCertificateImage: async (file: File, signal?: AbortSignal): Promise<UploadResponse> => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${API_BASE}/api/upload/certificate`, {
			method: "POST",
			credentials: "include",
			body: formData,
			signal,
		});

		return res.json();
	},
};
