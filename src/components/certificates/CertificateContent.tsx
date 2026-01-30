import React from "react";
import { motion } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";
import { formatDateShort } from "@/lib/utils";

export function CertificateContent({
	title,
	issuer,
	dateIssued,
	credentialId,
}: {
	title: string;
	issuer: string;
	dateIssued: string;
	credentialId?: string;
}) {
	const { isGhibli } = useTheme();
	return (
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
						{title}
					</h3>
					<p className={cn("text-sm", isGhibli ? "text-slate-600" : "text-white/60")}>{issuer}</p>
				</div>
				{/* Award icon is handled in the image section */}
			</div>
			<div className="flex items-center justify-between pt-2">
				<div className={cn("flex items-center gap-2 text-sm", isGhibli ? "text-slate-500" : "text-white/50")}>
					<Calendar className="w-4 h-4" />
					<span>{formatDateShort(dateIssued)}</span>
				</div>
				{credentialId && (
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"flex items-center gap-1.5 text-sm transition-colors",
							isGhibli ? "text-red-500 hover:text-red-600" : "text-violet-400 hover:text-violet-300",
						)}
					>
						<span>View</span>
						<ExternalLink className="w-3.5 h-3.5" />
					</motion.button>
				)}
			</div>
		</div>
	);
}
