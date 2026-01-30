"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images, title, isGhibli }: { images: string[]; title: string; isGhibli: boolean }) {
	if (!images || images.length === 0) return null;
	return (
		<section className="py-12">
			<div className="max-w-5xl mx-auto">
				<h3 className={cn("text-2xl font-bold mb-8", isGhibli ? "text-slate-900" : "text-white")}>Gallery</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{images.map((image, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ delay: index * 0.1 }}
							className="relative aspect-video rounded-xl overflow-hidden border border-white/10"
							style={{ willChange: "transform" }}
						>
							<Image
								src={image}
								alt={`${title} screenshot ${index + 1}`}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								unoptimized={image.startsWith("http")}
								className="object-cover"
								loading="lazy"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
