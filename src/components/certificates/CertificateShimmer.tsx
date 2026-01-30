import React from "react";
import { cn } from "@/lib/utils";

export function CertificateShimmer() {
	return (
		<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
			<div
				className={cn(
					"absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000",
				)}
			/>
		</div>
	);
}
