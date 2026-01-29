"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Folder, Award, LogOut, Home, ChevronRight } from "lucide-react";
import { useAuth } from "@/context";
import { cn } from "@/lib/utils";

const sidebarLinks = [
	{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/admin/projects", label: "Projects", icon: Folder },
	{ href: "/admin/certificates", label: "Certificates", icon: Award },
];

export function AdminSidebar() {
	const pathname = usePathname();
	const { user, logout } = useAuth();

	const isActive = (href: string) => {
		if (href === "/admin") {
			return pathname === "/admin";
		}
		return pathname.startsWith(href);
	};

	return (
		<aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900/80 backdrop-blur-xl border-r border-white/10 z-40">
			<div className="flex flex-col h-full">
				{/* Header */}
				<div className="p-6 border-b border-white/10">
					<Link href="/admin" className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
							<span className="text-white font-bold text-lg">M</span>
						</div>
						<div>
							<span className="text-white font-semibold">Admin Panel</span>
							<p className="text-xs text-white/50">MHD.dev</p>
						</div>
					</Link>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-2">
					{sidebarLinks.map((link) => {
						const active = isActive(link.href);
						return (
							<Link key={link.href} href={link.href}>
								<motion.div
									whileHover={{ x: 4 }}
									className={cn(
										"flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
										active
											? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
											: "text-white/60 hover:text-white hover:bg-white/5",
									)}
								>
									<link.icon className="w-5 h-5" />
									<span className="font-medium">{link.label}</span>
									{active && <ChevronRight className="w-4 h-4 ml-auto" />}
								</motion.div>
							</Link>
						);
					})}
				</nav>

				{/* Footer */}
				<div className="p-4 border-t border-white/10 space-y-3">
					{/* View Site */}
					<Link href="/">
						<motion.div
							whileHover={{ x: 4 }}
							className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
						>
							<Home className="w-5 h-5" />
							<span className="font-medium">View Site</span>
						</motion.div>
					</Link>

					{/* User info & Logout */}
					<div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5">
						<div>
							<p className="text-sm text-white font-medium">{user?.username || "Admin"}</p>
							<p className="text-xs text-white/50">Administrator</p>
						</div>
						<button
							onClick={() => logout()}
							className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
						>
							<LogOut className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</aside>
	);
}
