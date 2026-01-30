"use client";

"use client";

import { Input, Button, Modal } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { CertificateFormData } from "@/lib/schemas/certificateSchema";

interface CertificateFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CertificateFormData) => void;
	form: UseFormReturn<CertificateFormData>;
	isLoading: boolean;
	editingCertificate: boolean;
}

export function CertificateFormModal({
	isOpen,
	onClose,
	onSubmit,
	form,
	isLoading,
	editingCertificate,
}: CertificateFormModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = form;
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={editingCertificate ? "Edit Certificate" : "Add Certificate"}>
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
				<Input label="Date Issued" type="date" error={errors.dateIssued?.message} {...register("dateIssued")} />
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
					<Button type="button" variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit" isLoading={isLoading}>
						{editingCertificate ? "Save Changes" : "Add Certificate"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
