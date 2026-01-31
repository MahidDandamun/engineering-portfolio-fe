"use client";

import { Input, Button, Modal } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { CertificateFormData } from "@/lib/schemas/certificateSchema";
import { useState } from "react";

interface CertificateFormModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CertificateFormData) => void;
	onCancel?: () => void;
	form: UseFormReturn<CertificateFormData>;
	isLoading: boolean;
	editingCertificate: boolean;
	skipExitAnimation?: boolean;
	selectedFile?: File | null;
	onFileSelect?: (file: File | null) => void;
}

function CertificateFormModalInner(props: CertificateFormModalProps) {
	const {
		isOpen,
		onClose,
		onSubmit,
		onCancel,
		form,
		isLoading,
		editingCertificate,
		skipExitAnimation,
		selectedFile,
		onFileSelect,
	} = props;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		watch,
	} = form;
	const [uploadedFromFile, setUploadedFromFile] = useState(false);
	const imageUrl = watch("imageUrl");
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onCancel?.();
				onClose();
			}}
			title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
			skipExitAnimation={skipExitAnimation}
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
				<Input label="Date Issued" type="date" error={errors.dateIssued?.message} {...register("dateIssued")} />
				<Input
					label="Credential ID (Optional)"
					placeholder="ABC123XYZ"
					error={errors.credentialId?.message}
					{...register("credentialId")}
				/>
				<div>
					<Input
						label="Image URL (Optional)"
						placeholder="https://..."
						error={errors.imageUrl?.message}
						{...register("imageUrl", {
							onChange: () => {
								// If the user types or changes the input manually, consider it not uploaded
								setUploadedFromFile(false);
							},
						})}
						disabled={!!selectedFile || uploadedFromFile}
					/>
					<div className="mt-2 flex items-center gap-3">
						<input
							id="certificate-file"
							name="certificate-file"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files?.[0] ?? null;
								onFileSelect?.(file);
								// if user selects a file, clear any manual imageUrl
								if (file) {
									setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
									setUploadedFromFile(false);
								}
							}}
						/>
						<Button
							type="button"
							variant="secondary"
							disabled={isLoading || (!!imageUrl && !selectedFile)}
							onClick={() => document.getElementById("certificate-file")?.click()}
						>
							{selectedFile ? "Change File" : "Attach Image"}
						</Button>

						{selectedFile ? (
							<div className="flex items-center gap-2">
								<span className="text-sm text-white/60">{selectedFile.name}</span>
								<Button
									type="button"
									variant="ghost"
									onClick={() => {
										onFileSelect?.(null);
									}}
								>
									Remove
								</Button>
							</div>
						) : null}

						{imageUrl && !selectedFile ? (
							<div className="flex items-center gap-2">
								<a
									href={imageUrl}
									onClick={(e) => {
										e.preventDefault();
										try {
											const normalized = imageUrl.match(/^https?:\/\//i)
												? imageUrl
												: `https://${imageUrl}`;
											window.open(normalized, "_blank", "noopener,noreferrer");
										} catch {
											// fallback to navigation
											window.location.href = imageUrl;
										}
									}}
									className="text-sm text-white/70"
								>
									View
								</a>
								<Button
									type="button"
									variant="ghost"
									onClick={() => {
										// allow removing provided url
										setValue("imageUrl", "", { shouldValidate: true, shouldDirty: true });
										setUploadedFromFile(false);
									}}
								>
									Remove
								</Button>
							</div>
						) : null}
					</div>
				</div>
				<div className="flex justify-end gap-3 pt-4">
					<Button
						type="button"
						variant="secondary"
						onClick={() => {
							// abort any in-flight operation if the parent provided a cancel handler
							onCancel?.();
							// clear transient selected file when canceling
							onFileSelect?.(null);
							onClose();
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						isLoading={isLoading || isSubmitting}
						onClick={async () => {
							/* noop here - submission handled via handleSubmit below */
						}}
					>
						{editingCertificate ? "Save Changes" : "Add Certificate"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
// Exported wrapper used by pages: performs upload on submit if a file is attached
export function CertificateFormModal(props: CertificateFormModalProps) {
	const { form, onSubmit } = props;
	const submitHandler = async (data: CertificateFormData) => {
		// Await the parent submit so the modal can show the parent's `isLoading` state
		// and keep the form disabled until the operation completes.
		await onSubmit(data);
	};

	return <CertificateFormModalInner {...props} form={form} onSubmit={submitHandler} />;
}
