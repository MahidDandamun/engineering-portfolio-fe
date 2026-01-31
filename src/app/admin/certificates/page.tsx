"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Search } from "lucide-react";
import { Button, Input, ErrorBoundary } from "@/components/ui";
import { useCertificates, useCreateCertificate, useUpdateCertificate, useDeleteCertificate } from "@/hooks";
import { uploadApi } from "@/lib/upload";
import { CertificatesGrid } from "@/components/admin/CertificatesGrid";
import { CertificateFormModal } from "@/components/admin/certificates/CertificateFormModal";
import { CertificateDeleteModal } from "@/components/admin/certificates/CertificateDeleteModal";
import { useAdminAuthRedirect } from "@/hooks/useAdminAuthRedirect";
import { Certificate, CreateCertificateDTO } from "@/types";

import { CertificateFormData, certificateSchema } from "@/lib/schemas/certificateSchema";

export default function AdminCertificatesPage() {
	useAdminAuthRedirect();
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [skipModalExitAnimation, setSkipModalExitAnimation] = useState(false);
	const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const abortRef = useRef<AbortController | null>(null);
	const [deleteModal, setDeleteModal] = useState<Certificate | null>(null);

	const { data, isLoading } = useCertificates();
	const createCertificate = useCreateCertificate();
	const updateCertificate = useUpdateCertificate();
	const deleteCertificate = useDeleteCertificate();

	const certificates = data?.data || [];
	const filteredCertificates = certificates.filter(
		(cert) =>
			cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const form = useForm<CertificateFormData>({
		resolver: zodResolver(certificateSchema),
	});
	const { reset } = form;

	const openCreateModal = () => {
		reset({
			title: "",
			issuer: "",
			dateIssued: "",
			credentialId: "",
			imageUrl: "",
		});
		setEditingCertificate(null);
		setIsModalOpen(true);
	};

	const openEditModal = (cert: Certificate) => {
		reset({
			title: cert.title,
			issuer: cert.issuer,
			dateIssued: cert.dateIssued.split("T")[0],
			credentialId: cert.credentialId || "",
			imageUrl: cert.imageUrl || "",
		});
		setEditingCertificate(cert);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setEditingCertificate(null);
		reset();
	};

	const onSubmit = async (data: CertificateFormData) => {
		const currentEditing = editingCertificate;

		// Abort any previous in-flight operation and create a new controller for this submit
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;
		const signal = controller.signal;

		const payload: CreateCertificateDTO = {
			title: data.title,
			issuer: data.issuer,
			dateIssued: data.dateIssued,
			credentialId: data.credentialId || undefined,
			imageUrl: data.imageUrl || undefined,
		};

		let aborted = false;

		try {
			if (selectedFile) {
				try {
					const res = await uploadApi.uploadCertificateImage(selectedFile, signal);
					if (res?.success && res.data?.url) {
						payload.imageUrl = res.data.url;
					}
				} catch (err) {
					if ((err as DOMException)?.name === "AbortError") {
						// Upload was aborted — mark and skip remaining work
						aborted = true;
					} else {
						// swallow other errors; mutation will handle them
					}
				}
			}

			if (aborted) return;

			if (currentEditing) {
				await updateCertificate.mutateAsync({ id: currentEditing._id, data: payload, signal });
			} else {
				await createCertificate.mutateAsync({ ...(payload as CreateCertificateDTO), signal });
			}

			// On success: close modal without exit animation for snappy UX
			setSkipModalExitAnimation(true);
			closeModal();
			setTimeout(() => setSkipModalExitAnimation(false), 80);
		} finally {
			setSelectedFile(null);
			// clear abort controller after completion
			abortRef.current = null;
		}
	};

	const handleCancel = () => {
		// abort any in-flight submit/upload and then close modal
		abortRef.current?.abort();
		abortRef.current = null;
		setSelectedFile(null);
		closeModal();
	};

	const handleDelete = async () => {
		if (!deleteModal) return;

		try {
			await deleteCertificate.mutateAsync(deleteModal._id);
			setDeleteModal(null);
		} catch {
			// Error is handled by the mutation's onError callback
		}
	};

	return (
		<ErrorBoundary>
			<div className="space-y-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center justify-between"
				>
					<div>
						<h1 className="text-3xl font-bold text-white">Certificates</h1>
						<p className="text-white/60 mt-1">Manage your certifications</p>
					</div>
					<Button onClick={openCreateModal}>
						<Plus className="w-4 h-4 mr-2" />
						Add Certificate
					</Button>
				</motion.div>

				{/* Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="relative max-w-md"
				>
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
					<Input
						placeholder="Search certificates..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-12"
					/>
				</motion.div>

				{/* Certificates Grid */}
				<CertificatesGrid
					certificates={filteredCertificates}
					isLoading={isLoading}
					onEdit={openEditModal}
					onDelete={(cert) => setDeleteModal(cert)}
				/>

				{/* Create/Edit Modal */}
				<CertificateFormModal
					isOpen={isModalOpen}
					onClose={closeModal}
					onCancel={handleCancel}
					skipExitAnimation={skipModalExitAnimation}
					selectedFile={selectedFile}
					onFileSelect={setSelectedFile}
					onSubmit={onSubmit}
					form={form}
					isLoading={createCertificate.isPending || updateCertificate.isPending}
					editingCertificate={!!editingCertificate}
				/>

				{/* Delete Modal */}
				<CertificateDeleteModal
					isOpen={!!deleteModal}
					onClose={() => setDeleteModal(null)}
					onDelete={handleDelete}
					isLoading={deleteCertificate.isPending}
					certificateTitle={deleteModal?.title}
				/>
			</div>
		</ErrorBoundary>
	);
}
