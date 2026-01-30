"use client";

import { motion } from "framer-motion";
import { Award, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { Certificate } from "@/types";
import { formatDateShort } from "@/lib/utils";

interface CertificatesGridProps {
	certificates: Certificate[];
	isLoading: boolean;
	onEdit: (cert: Certificate) => void;
	onDelete: (cert: Certificate) => void;
}

export function CertificatesGrid({ certificates, isLoading, onEdit, onDelete }: CertificatesGridProps) {
	if (isLoading) {
		return (
			<div className="flex justify-center py-12">
				<div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}
	if (certificates.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
					<Award className="w-8 h-8 text-white/30" />
				</div>
				<p className="text-white/50">No certificates found</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{certificates.map((cert, index) => (
				<motion.div
					key={cert._id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.05 }}
					className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/[0.07] transition-colors"
				>
					{/* Actions */}
					<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
						<Button variant="ghost" size="sm" onClick={() => onEdit(cert)}>
							<Edit className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => onDelete(cert)}
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
							<p className="text-sm text-white/40 mt-2">{formatDateShort(cert.dateIssued)}</p>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
