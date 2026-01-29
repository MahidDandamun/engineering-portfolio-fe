import { api, createQueryString } from "./api";
import { Project, CreateProjectDTO, UpdateProjectDTO, ApiResponse, PaginatedResponse, ProjectCategory } from "@/types";

export interface GetProjectsParams {
	category?: ProjectCategory;
	page?: number;
	limit?: number;
}

export const projectsApi = {
	getAll: (params?: GetProjectsParams) => {
		const queryString = createQueryString({
			category: params?.category,
			page: params?.page,
			limit: params?.limit,
		});
		return api<PaginatedResponse<Project>>(`/api/projects${queryString}`);
	},

	getFeatured: () => api<ApiResponse<Project[]>>("/api/projects/featured"),

	getBySlug: (slug: string) => api<ApiResponse<Project>>(`/api/projects/slug/${slug}`),

	getById: (id: string) => api<ApiResponse<Project>>(`/api/projects/${id}`),

	create: (data: CreateProjectDTO) =>
		api<ApiResponse<Project>>("/api/projects", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	update: (id: string, data: UpdateProjectDTO) =>
		api<ApiResponse<Project>>(`/api/projects/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	delete: (id: string) => api<ApiResponse<null>>(`/api/projects/${id}`, { method: "DELETE" }),
};
