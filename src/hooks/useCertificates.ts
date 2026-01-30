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
		mutationFn: (data: CreateCertificateDTO) => certificatesApi.create(data),
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
		mutationFn: ({ id, data }: { id: string; data: UpdateCertificateDTO }) => certificatesApi.update(id, data),
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: certificateKeys.all });
			toast.success("Certificate deleted successfully!");
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete certificate");
		},
	});
}
