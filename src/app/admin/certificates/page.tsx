"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Search, Edit, Trash2, AlertCircle, Award } from "lucide-react";
import { Button, Input, Modal, ErrorBoundary } from "@/components/ui";
import { useCertificates, useCreateCertificate, useUpdateCertificate, useDeleteCertificate } from "@/hooks";
import { Certificate } from "@/types";
import { formatDateShort } from "@/lib/utils";

const certificateSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	issuer: z.string().min(2, "Issuer must be at least 2 characters"),
	dateIssued: z.string().min(1, "Date is required"),
	credentialId: z.string().optional(),
	imageUrl: z.string().url().optional().or(z.literal("")),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

export default function AdminCertificatesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<CertificateFormData>({
		resolver: zodResolver(certificateSchema),
	});

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
		try {
			const payload = {
				...data,
				credentialId: data.credentialId || undefined,
				imageUrl: data.imageUrl || undefined,
			};

			if (editingCertificate) {
				await updateCertificate.mutateAsync({
					id: editingCertificate._id,
					data: payload,
				});
			} else {
				await createCertificate.mutateAsync(payload);
			}
			closeModal();
		} catch (error) {
			console.error("Failed to save certificate:", error);
		}
	};

	const handleDelete = async () => {
		if (!deleteModal) return;

		try {
			await deleteCertificate.mutateAsync(deleteModal._id);
			setDeleteModal(null);
		} catch (error) {
			console.error("Failed to delete certificate:", error);
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
				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
					{isLoading ? (
						<div className="flex justify-center py-12">
							<div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
						</div>
					) : filteredCertificates.length === 0 ? (
						<div className="text-center py-12">
							<div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
								<Award className="w-8 h-8 text-white/30" />
							</div>
							<p className="text-white/50">No certificates found</p>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredCertificates.map((cert, index) => (
								<motion.div
									key={cert._id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
									className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
								>
									{/* Actions */}
									<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
										<Button variant="ghost" size="sm" onClick={() => openEditModal(cert)}>
											<Edit className="w-4 h-4" />
										</Button>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setDeleteModal(cert)}
											className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>

									<div className="flex items-start gap-4">
										<div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
											<Award className="w-6 h-6 text-cyan-400" />
										</div>
										<div className="min-w-0">
											<h3 className="text-lg font-semibold text-white truncate">{cert.title}</h3>
											<p className="text-sm text-white/60">{cert.issuer}</p>
											<p className="text-sm text-white/40 mt-2">
												{formatDateShort(cert.dateIssued)}
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>

				{/* Create/Edit Modal */}
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
				>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<Input
							label="Title"
							placeholder="AWS Solutions Architect"
							error={errors.title?.message}
							{...register("title")}
						/>

						<Input
							label="Issuer"
							placeholder="Amazon Web Services"
							error={errors.issuer?.message}
							{...register("issuer")}
						/>

						<Input
							label="Date Issued"
							type="date"
							error={errors.dateIssued?.message}
							{...register("dateIssued")}
						/>

						<Input
							label="Credential ID (Optional)"
							placeholder="ABC123XYZ"
							error={errors.credentialId?.message}
							{...register("credentialId")}
						/>

						<Input
							label="Image URL (Optional)"
							placeholder="https://..."
							error={errors.imageUrl?.message}
							{...register("imageUrl")}
						/>

						<div className="flex justify-end gap-3 pt-4">
							<Button type="button" variant="secondary" onClick={closeModal}>
								Cancel
							</Button>
							<Button
								type="submit"
								isLoading={createCertificate.isPending || updateCertificate.isPending}
							>
								{editingCertificate ? "Save Changes" : "Add Certificate"}
							</Button>
						</div>
					</form>
				</Modal>

				{/* Delete Modal */}
				<Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Certificate">
					<div className="space-y-6">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-xl bg-red-500/10 text-red-400">
								<AlertCircle className="w-6 h-6" />
							</div>
							<div>
								<p className="text-white">
									Are you sure you want to delete <strong>{deleteModal?.title}</strong>?
								</p>
								<p className="text-white/60 mt-1 text-sm">This action cannot be undone.</p>
							</div>
						</div>
						<div className="flex justify-end gap-3">
							<Button variant="secondary" onClick={() => setDeleteModal(null)}>
								Cancel
							</Button>
							<Button variant="danger" onClick={handleDelete} isLoading={deleteCertificate.isPending}>
								Delete
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</ErrorBoundary>
	);
}
