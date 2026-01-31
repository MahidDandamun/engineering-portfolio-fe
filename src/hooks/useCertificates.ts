"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { certificatesApi } from "@/lib/certificates";
import { CreateCertificateDTO, UpdateCertificateDTO } from "@/types";

export const certificateKeys = {
	all: ["certificates"] as const,
	lists: () => [...certificateKeys.all, "list"] as const,
	list: () => [...certificateKeys.lists()] as const,
	details: () => [...certificateKeys.all, "detail"] as const,
	detail: (id: string) => [...certificateKeys.details(), id] as const,
};

export function useCertificates() {
	return useQuery({
		queryKey: certificateKeys.list(),
		queryFn: () => certificatesApi.getAll(),
	});
}

export function useCertificate(id: string) {
	return useQuery({
		queryKey: certificateKeys.detail(id),
		queryFn: () => certificatesApi.getById(id),
		enabled: !!id,
	});
}

export function useCreateCertificate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCertificateDTO & { signal?: AbortSignal }) =>
			certificatesApi.create(data, data.signal),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: certificateKeys.all });
			toast.success("Certificate created successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to create certificate");
		},
	});
}

export function useUpdateCertificate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data, signal }: { id: string; data: UpdateCertificateDTO; signal?: AbortSignal }) =>
			certificatesApi.update(id, data, signal),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: certificateKeys.all });
			toast.success("Certificate updated successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update certificate");
		},
	});
}

export function useDeleteCertificate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => certificatesApi.delete(id),
		onSuccess: (_data, id) => {
			queryClient.setQueriesData({ predicate: (query) => query.queryKey?.[0] === "certificates" }, (oldData) => {
				if (!oldData) return oldData;

				if (Array.isArray(oldData)) {
					return (oldData as Array<{ _id?: string }>).filter((c) => c._id !== id);
				}

				const maybe = oldData as { data?: Array<{ _id?: string }> } & Record<string, unknown>;
				if (maybe.data && Array.isArray(maybe.data)) {
					return { ...maybe, data: maybe.data.filter((c) => c._id !== id) };
				}

				return oldData;
			});
			queryClient.invalidateQueries({ queryKey: certificateKeys.all });
			toast.success("Certificate deleted successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete certificate");
		},
	});
}
