"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectsApi, GetProjectsParams } from "@/lib/projects";
import { CreateProjectDTO, UpdateProjectDTO, Project, ApiResponse, PaginatedResponse } from "@/types";

export const projectKeys = {
	all: ["projects"] as const,
	lists: () => [...projectKeys.all, "list"] as const,
	list: (params?: GetProjectsParams) => [...projectKeys.lists(), params] as const,
	featured: () => [...projectKeys.all, "featured"] as const,
	details: () => [...projectKeys.all, "detail"] as const,
	detail: (slug: string) => [...projectKeys.details(), slug] as const,
	byId: (id: string) => [...projectKeys.details(), "id", id] as const,
};

export function useProjects(params?: GetProjectsParams) {
	return useQuery({
		queryKey: projectKeys.list(params),
		queryFn: () => projectsApi.getAll(params),
	});
}

export function useFeaturedProjects() {
	return useQuery({
		queryKey: projectKeys.featured(),
		queryFn: () => projectsApi.getFeatured(),
	});
}

export function useProject(slug: string) {
	return useQuery({
		queryKey: projectKeys.detail(slug),
		queryFn: () => projectsApi.getBySlug(slug),
		enabled: !!slug,
	});
}

export function useProjectById(id: string) {
	return useQuery({
		queryKey: projectKeys.byId(id),
		queryFn: () => projectsApi.getById(id),
		enabled: !!id,
	});
}

export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateProjectDTO) => projectsApi.create(data),
		onSuccess: (res) => {
			// Add the created project to any cached lists to avoid widespread refetches
			try {
				queryClient.setQueriesData({ predicate: (query) => query.queryKey?.[0] === "projects" }, (oldData) => {
					if (!oldData) return oldData;

					// If the API returned the new project payload, merge it into caches
					if (res && res.data) {
						// Case: the cached value is a raw array of projects
						if (Array.isArray(oldData)) {
							return [res.data as Project, ...(oldData as Project[])];
						}

						// Case: the cached value is an API response object with a `data` array
						const maybe = oldData as
							| ApiResponse<Project[]>
							| PaginatedResponse<Project>
							| Record<string, unknown>;
						if (maybe && Array.isArray((maybe as ApiResponse<Project[]>).data)) {
							const dataArray = (maybe as ApiResponse<Project[]>).data as Project[];
							return { ...(maybe as ApiResponse<Project[]>), data: [res.data as Project, ...dataArray] };
						}
					}

					return oldData;
				});
			} catch {
				// fallback to broad invalidation if something goes wrong
				queryClient.invalidateQueries({ queryKey: projectKeys.all });
			}

			// Ensure any detail/byId caches are updated/invalidated as well
			try {
				const id = (res && (res.data as Project | undefined)?._id) as string | undefined;
				const slug = (res && (res.data as Project | undefined)?.slug) as string | undefined;
				if (id) queryClient.invalidateQueries({ queryKey: projectKeys.byId(id) });
				if (slug) queryClient.invalidateQueries({ queryKey: projectKeys.detail(slug) });
			} catch {
				/* ignore */
			}

			toast.success("Project created successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to create project");
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateProjectDTO }) => projectsApi.update(id, data),
		onSuccess: (res) => {
			// Update cached lists to reflect the updated project without forcing full refetch
			try {
				queryClient.setQueriesData({ predicate: (query) => query.queryKey?.[0] === "projects" }, (oldData) => {
					if (!oldData) return oldData;

					const updated = res?.data as Project | undefined;
					if (updated) {
						if (Array.isArray(oldData)) {
							return (oldData as Project[]).map((p) => (p._id === updated._id ? updated : p));
						}

						const maybe = oldData as
							| ApiResponse<Project[]>
							| PaginatedResponse<Project>
							| Record<string, unknown>;
						if (maybe && Array.isArray((maybe as ApiResponse<Project[]>).data)) {
							const dataArray = (maybe as ApiResponse<Project[]>).data as Project[];
							return {
								...(maybe as ApiResponse<Project[]>),
								data: dataArray.map((p) => (p._id === updated._id ? updated : p)),
							};
						}
					}

					return oldData;
				});
			} catch {
				queryClient.invalidateQueries({ queryKey: projectKeys.all });
			}

			// Also update/invalidate detail caches referencing this project
			try {
				const id = (res && (res.data as Project | undefined)?._id) as string | undefined;
				const slug = (res && (res.data as Project | undefined)?.slug) as string | undefined;
				if (id) queryClient.invalidateQueries({ queryKey: projectKeys.byId(id) });
				if (slug) queryClient.invalidateQueries({ queryKey: projectKeys.detail(slug) });
			} catch {
				/* ignore */
			}

			toast.success("Project updated successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update project");
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => projectsApi.delete(id),
		onSuccess: (_data, id) => {
			// Optimistically remove deleted project from any cached lists
			queryClient.setQueriesData({ predicate: (query) => query.queryKey?.[0] === "projects" }, (oldData) => {
				if (!oldData) return oldData;

				if (Array.isArray(oldData)) {
					return (oldData as Array<{ _id?: string }>).filter((p) => p._id !== id);
				}

				const maybe = oldData as { data?: Array<{ _id?: string }> } & Record<string, unknown>;
				if (maybe.data && Array.isArray(maybe.data)) {
					return { ...maybe, data: maybe.data.filter((p) => p._id !== id) };
				}

				return oldData;
			});
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success("Project deleted successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete project");
		},
	});
}
