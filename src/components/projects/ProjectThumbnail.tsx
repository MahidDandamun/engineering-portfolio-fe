import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectThumbnailProps {
	thumbnailUrl?: string | null;
	title: string;
	className?: string;
}

export function ProjectThumbnail({ thumbnailUrl, title, className }: ProjectThumbnailProps) {
	return thumbnailUrl ? (
		<Image
			src={thumbnailUrl}
			alt={title}
			fill
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			unoptimized={thumbnailUrl.startsWith("http")}
			className={cn("object-cover transition-transform duration-500 group-hover:scale-105", className)}
			loading="lazy"
			style={{ willChange: "transform" }}
		/>
	) : (
		<div className={cn("absolute inset-0 flex items-center justify-center bg-slate-200/40", className)}>
			<span className="text-3xl text-slate-400">📦</span>
		</div>
	);
}
