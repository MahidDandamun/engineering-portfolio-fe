"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { Certificate } from "@/types";
import { CertificateShimmer } from "./CertificateShimmer";
import { CertificateImage } from "./CertificateImage";
import { CertificateContent } from "./CertificateContent";

interface CertificateCardProps {
	certificate: Certificate;
	index?: number;
}

export function CertificateCard({ certificate, index = 0 }: CertificateCardProps) {
	const { isGhibli } = useTheme();
	const safeImageUrl = normalizeImageUrl(certificate.imageUrl);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30, rotateY: -10 }}
			whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			whileHover={{ y: -8, scale: 1.02 }}
			className="group relative"
		>
			<div
				className={cn(
					"relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all",
					isGhibli
						? "bg-white/80 border-slate-200/50 hover:shadow-xl hover:shadow-amber-100/30"
						: "bg-linear-to-br from-white/5 to-white/2 border-white/10",
				)}
			>
				{/* Shimmer effect */}
				<CertificateShimmer />

				{/* Image */}
				<div className="relative aspect-4/3 overflow-hidden">
					<CertificateImage imageUrl={safeImageUrl} title={certificate.title} />
					{/* Gradient overlay */}
					<div
						className={cn(
							"absolute inset-0 bg-linear-to-t via-transparent to-transparent",
							isGhibli ? "from-white via-white/50" : "from-slate-900 via-slate-900/50",
						)}
					/>
				</div>

				{/* Content */}
				<CertificateContent
					title={certificate.title}
					issuer={certificate.issuer}
					dateIssued={certificate.dateIssued}
					credentialId={certificate.credentialId}
					imageUrl={safeImageUrl ?? undefined}
				/>

				{/* Actions (optional, for demonstration) */}
				{/* CertificateActions removed: not used */}

				{/* Bottom gradient line */}
				<div
					className={cn(
						"absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity",
						isGhibli
							? "bg-linear-to-r from-red-400 via-amber-400 to-blue-400"
							: "bg-linear-to-r from-violet-500 to-cyan-500",
					)}
				/>
			</div>
		</motion.div>
	);
}
