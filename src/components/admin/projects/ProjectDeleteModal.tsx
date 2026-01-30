"use client";

import { Button, Modal } from "@/components/ui";
import { AlertCircle } from "lucide-react";

interface ProjectDeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	isLoading: boolean;
	projectTitle?: string;
}

export function ProjectDeleteModal({ isOpen, onClose, onDelete, isLoading, projectTitle }: ProjectDeleteModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Delete Project">
			<div className="space-y-6">
				<div className="flex items-start gap-4">
					<div className="p-3 rounded-xl bg-red-500/10 text-red-400">
						<AlertCircle className="w-6 h-6" />
					</div>
					<div>
						<p className="text-white">
							Are you sure you want to delete <strong>{projectTitle}</strong>?
						</p>
						<p className="text-white/60 mt-1 text-sm">This action cannot be undone.</p>
					</div>
				</div>
				<div className="flex justify-end gap-3">
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="danger" onClick={onDelete} isLoading={isLoading}>
						Delete
					</Button>
				</div>
			</div>
		</Modal>
	);
}
