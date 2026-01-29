import { api } from "./api";
import { Certificate, CreateCertificateDTO, UpdateCertificateDTO, ApiResponse } from "@/types";

export const certificatesApi = {
	getAll: () => api<ApiResponse<Certificate[]>>("/api/certificates"),

	getById: (id: string) => api<ApiResponse<Certificate>>(`/api/certificates/${id}`),

	create: (data: CreateCertificateDTO) =>
		api<ApiResponse<Certificate>>("/api/certificates", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	update: (id: string, data: UpdateCertificateDTO) =>
		api<ApiResponse<Certificate>>(`/api/certificates/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	delete: (id: string) => api<ApiResponse<null>>(`/api/certificates/${id}`, { method: "DELETE" }),
};
