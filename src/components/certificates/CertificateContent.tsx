import React from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { cn, normalizeImageUrl } from "@/lib/utils";
import { useTheme } from "@/context";
import { formatDateShort } from "@/lib/utils";

export function CertificateContent({
	title,
	issuer,
	dateIssued,
	credentialId,
	imageUrl,
}: {
	title: string;
	issuer: string;
	dateIssued: string;
	credentialId?: string;
	imageUrl?: string;
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
				{(imageUrl || credentialId) &&
					(() => {
						// prefer imageUrl if present, otherwise try credentialId as a URL
						const raw = imageUrl ?? credentialId ?? "";
						let href = raw;
						try {
							href = normalizeImageUrl(raw) ?? raw;
						} catch {
							href = raw;
						}
						return (
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									"flex items-center gap-1.5 text-sm transition-colors",
									isGhibli
										? "text-red-500 hover:text-red-600"
										: "text-violet-400 hover:text-violet-300",
								)}
								onClick={(e) => {
									// ensure external navigation (avoid client-side routing issues)
									// normalize protocol and open in new tab if needed
									try {
										if (!/^https?:\/\//i.test(href)) {
											const normalized = `https://${href}`;
											e.preventDefault();
											window.open(normalized, "_blank", "noopener,noreferrer");
										}
									} catch {
										// fallback: allow the anchor to behave normally
									}
								}}
							>
								<span>View</span>
								<ExternalLink className="w-3.5 h-3.5" />
							</a>
						);
					})()}
			</div>
		</div>
	);
}
