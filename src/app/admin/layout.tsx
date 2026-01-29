"use client";

import { usePathname } from "next/navigation";
import { ProtectedRoute, AdminSidebar } from "@/components/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// Don't wrap login page in ProtectedRoute
	if (pathname === "/admin/login") {
		return <>{children}</>;
	}

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-slate-950">
				<AdminSidebar />
				<main className="ml-64 min-h-screen p-8">{children}</main>
			</div>
		</ProtectedRoute>
	);
}
