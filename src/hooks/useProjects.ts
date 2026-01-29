"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectsApi, GetProjectsParams } from "@/lib/projects";
import { CreateProjectDTO, UpdateProjectDTO } from "@/types";
import { dummyProjects } from "@/lib/dummyData";

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
		queryFn: async () => {
			try {
				return await projectsApi.getAll(params);
			} catch {
				// Fallback to dummy data if API fails
				const filtered = params?.category
					? dummyProjects.filter((p) => p.category === params.category)
					: dummyProjects;
				return {
					data: filtered,
					pagination: { page: 1, limit: 10, total: filtered.length, totalPages: 1 },
				};
			}
		},
	});
}

export function useFeaturedProjects() {
	return useQuery({
		queryKey: projectKeys.featured(),
		queryFn: async () => {
			try {
				return await projectsApi.getFeatured();
			} catch {
				// Fallback to dummy data if API fails
				return { data: dummyProjects.filter((p) => p.featured) };
			}
		},
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all });
			toast.success("Project deleted successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete project");
		},
	});
}
