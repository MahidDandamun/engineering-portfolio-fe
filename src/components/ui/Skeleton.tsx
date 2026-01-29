"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
	return (
		<motion.div
			initial={{ opacity: 0.5 }}
			animate={{ opacity: [0.5, 1, 0.5] }}
			transition={{ duration: 1.5, repeat: Infinity }}
			className={cn("rounded-lg bg-linear-to-r from-white/5 via-white/10 to-white/5", className)}
		/>
	);
}

export function ProjectCardSkeleton() {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
			<Skeleton className="h-48 w-full rounded-xl" />
			<Skeleton className="h-6 w-3/4" />
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-5/6" />
			<div className="flex gap-2">
				<Skeleton className="h-6 w-16 rounded-full" />
				<Skeleton className="h-6 w-20 rounded-full" />
				<Skeleton className="h-6 w-14 rounded-full" />
			</div>
		</div>
	);
}

export function CertificateCardSkeleton() {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
			<Skeleton className="h-40 w-full rounded-xl" />
			<Skeleton className="h-5 w-2/3" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);
}
