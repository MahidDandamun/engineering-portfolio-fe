import { api } from "./api";
import { Certificate, CreateCertificateDTO, UpdateCertificateDTO, ApiResponse } from "@/types";

export const certificatesApi = {
	getAll: () => api<ApiResponse<Certificate[]>>("/api/certificates"),

	getById: (id: string) => api<ApiResponse<Certificate>>(`/api/certificates/${id}`),

	create: (data: CreateCertificateDTO, signal?: AbortSignal) =>
		api<ApiResponse<Certificate>>("/api/certificates", {
			method: "POST",
			body: JSON.stringify(data),
			signal,
		}),

	update: (id: string, data: UpdateCertificateDTO, signal?: AbortSignal) =>
		api<ApiResponse<Certificate>>(`/api/certificates/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
			signal,
		}),

	delete: (id: string, signal?: AbortSignal) =>
		api<ApiResponse<null>>(`/api/certificates/${id}`, { method: "DELETE", signal }),
};
