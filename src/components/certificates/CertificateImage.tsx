import React from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";

export function CertificateImage({ imageUrl, title }: { imageUrl?: string | null; title: string }) {
	const { isGhibli } = useTheme();
	if (imageUrl) {
		return (
			<Image
				src={imageUrl}
				alt={title}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				unoptimized={imageUrl.startsWith("http")}
				className="object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		);
	}
	return (
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
	);
}
