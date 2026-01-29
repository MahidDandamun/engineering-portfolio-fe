"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { Certificate } from "@/types";
import { formatDateShort, normalizeImageUrl } from "@/lib/utils";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";

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
				<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
					<div
						className={cn(
							"absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000",
						)}
					/>
				</div>

				{/* Image */}
				<div className="relative aspect-4/3 overflow-hidden">
					{safeImageUrl ? (
						<Image
							src={safeImageUrl}
							alt={certificate.title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							unoptimized={safeImageUrl.startsWith("http")}
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					) : (
						<div
							className={cn(
								"absolute inset-0 flex items-center justify-center",
								isGhibli
									? "bg-linear-to-br from-amber-100 to-sky-100"
									: "bg-linear-to-br from-violet-500/20 to-cyan-500/20",
							)}
						>
							<Award className={cn("w-16 h-16", isGhibli ? "text-amber-300" : "text-white/20")} />
						</div>
					)}

					{/* Gradient overlay */}
					<div
						className={cn(
							"absolute inset-0 bg-linear-to-t via-transparent to-transparent",
							isGhibli ? "from-white via-white/50" : "from-slate-900 via-slate-900/50",
						)}
					/>
				</div>

				{/* Content */}
				<div className="relative p-6 space-y-3">
					<div className="flex items-start justify-between gap-3">
						<div className="space-y-1">
							<h3
								className={cn(
									"text-lg font-semibold transition-colors line-clamp-2",
									isGhibli
										? "text-slate-800 group-hover:text-red-500"
										: "text-white group-hover:text-violet-400",
								)}
							>
								{certificate.title}
							</h3>
							<p className={cn("text-sm", isGhibli ? "text-slate-600" : "text-white/60")}>
								{certificate.issuer}
							</p>
						</div>
						<div
							className={cn(
								"shrink-0 p-2 rounded-xl border",
								isGhibli ? "bg-amber-100 border-amber-200" : "bg-violet-500/10 border-violet-500/20",
							)}
						>
							<Award className={cn("w-5 h-5", isGhibli ? "text-amber-600" : "text-violet-400")} />
						</div>
					</div>

					<div className="flex items-center justify-between pt-2">
						<div
							className={cn(
								"flex items-center gap-2 text-sm",
								isGhibli ? "text-slate-500" : "text-white/50",
							)}
						>
							<Calendar className="w-4 h-4" />
							<span>{formatDateShort(certificate.dateIssued)}</span>
						</div>

						{certificate.credentialId && (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"flex items-center gap-1.5 text-sm transition-colors",
									isGhibli
										? "text-red-500 hover:text-red-600"
										: "text-violet-400 hover:text-violet-300",
								)}
							>
								<span>View</span>
								<ExternalLink className="w-3.5 h-3.5" />
							</motion.button>
						)}
					</div>
				</div>

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
