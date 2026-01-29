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
	uploadProjectImage: async (file: File): Promise<UploadResponse> => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${API_BASE}/api/upload/project`, {
			method: "POST",
			credentials: "include",
			body: formData, // No Content-Type header for FormData
		});

		return res.json();
	},

	uploadCertificateImage: async (file: File): Promise<UploadResponse> => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${API_BASE}/api/upload/certificate`, {
			method: "POST",
			credentials: "include",
			body: formData,
		});

		return res.json();
	},
};
