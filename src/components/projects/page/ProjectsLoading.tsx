"use client";

import { Skeleton } from "@/components/ui";

export function ProjectsLoading() {
	return (
		<div className="space-y-8">
			<Skeleton className="h-12 w-full max-w-xl mx-auto" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="h-80 rounded-2xl" />
				))}
			</div>
		</div>
	);
}
