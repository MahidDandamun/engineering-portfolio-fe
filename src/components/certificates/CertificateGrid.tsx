"use client";

import { motion } from "framer-motion";
import { CertificateCard } from "./CertificateCard";
import { CertificateCardSkeleton } from "@/components/ui";
import { Certificate } from "@/types";

interface CertificateGridProps {
	certificates: Certificate[];
	isLoading?: boolean;
	emptyMessage?: string;
}

export function CertificateGrid({
	certificates,
	isLoading,
	emptyMessage = "No certificates found",
}: CertificateGridProps) {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
				{[...Array(8)].map((_, i) => (
					<CertificateCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (!certificates?.length) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col items-center justify-center py-16 text-center"
			>
				<div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
					<span className="text-4xl">🏆</span>
				</div>
				<p className="text-white/60 text-lg">{emptyMessage}</p>
			</motion.div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{certificates.map((certificate, index) => (
				<CertificateCard key={certificate._id} certificate={certificate} index={index} />
			))}
		</div>
	);
}
