"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { categoryColors, ProjectCategory } from "@/types";

export function ProjectThumbnail({ src, alt, category }: { src: string; alt: string; category: ProjectCategory }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
			className="relative aspect-video rounded-2xl overflow-hidden border border-white/10"
			style={{ willChange: "transform" }}
		>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="(max-width: 1024px) 100vw, 80vw"
				unoptimized={src.startsWith("http")}
				className="object-cover"
				priority
				loading="eager"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-linear-to-br opacity-20",
					categoryColors[category as keyof typeof categoryColors],
				)}
			/>
		</motion.div>
	);
}
