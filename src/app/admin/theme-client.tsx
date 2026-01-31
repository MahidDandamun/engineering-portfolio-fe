"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeProvider } from "@/context";
import { ProtectedRoute, AdminSidebar } from "@/components/admin";

export default function AdminThemeClient({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	if (pathname === "/admin/login") {
		return <>{children}</>;
	}
	return (
		<ThemeProvider defaultTheme="jjk">
			<ProtectedRoute>
				<div className="min-h-screen admin-root">
					{/* Mobile header with menu toggle */}
					<div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-transparent p-3 pointer-events-none">
						<div className="max-w-7xl mx-auto flex items-center justify-between px-2">
							<button
								aria-label="Open sidebar"
								onClick={() => setSidebarOpen(true)}
								className="p-2 rounded-md bg-white/5 pointer-events-auto"
							>
								☰
							</button>
							<div />
						</div>
					</div>

					<AdminSidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
					<main className="lg:ml-64 min-h-screen px-8 pb-8 admin-main">{children}</main>
				</div>
			</ProtectedRoute>
		</ThemeProvider>
	);
}
