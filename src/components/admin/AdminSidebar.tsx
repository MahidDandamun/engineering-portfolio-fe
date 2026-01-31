"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Folder, Award, LogOut, Home, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/context";

export default function AdminSidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
	const { isGhibli } = useTheme();
	const sidebarLinks = [
		{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/admin/projects", label: "Projects", icon: Folder },
		{ href: "/admin/certificates", label: "Certificates", icon: Award },
	];
	const pathname = usePathname();
	const { user, logout } = useAuth();

	const isActive = (href: string) => {
		if (!pathname) return false;
		if (href === "/admin") {
			return pathname === "/admin";
		}
		return pathname.startsWith(href);
	};

	return (
		<motion.aside
			initial={{ x: -80, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -80, opacity: 0 }}
			transition={{ type: "spring", stiffness: 120, damping: 18 }}
			className={cn(
				"fixed left-0 top-0 bottom-0 w-64 backdrop-blur-xl border-r z-40 transition-transform duration-300 transform lg:translate-x-0",
				// mobile: translate off-screen when not open; desktop always visible
				mobileOpen
					? "translate-x-0 pointer-events-auto"
					: "-translate-x-full pointer-events-none lg:pointer-events-auto",
				isGhibli ? "bg-[#f7f0e3]/90 border-[#6cb65f]/30" : "bg-slate-900/80 border-white/10",
			)}
		>
			{/* Mobile close overlay button */}
			<div className="lg:hidden p-4 border-b flex items-center justify-between">
				<span className={isGhibli ? "text-sm text-[#6e3f28]" : "text-sm text-white/80"}>Admin</span>
				<button onClick={onClose} className="p-2 rounded-md hover:bg-white/5">
					<ChevronRight className="w-5 h-5 rotate-180" />
				</button>
			</div>
			<div className="flex flex-col h-full">
				{/* Header */}
				<div
					className={cn(
						"p-6 border-b flex items-center justify-between",
						isGhibli ? "border-[#6cb65f]/30" : "border-white/10",
					)}
				>
					<Link href="/admin" className="flex items-center gap-3">
						<div
							className={cn(
								"w-10 h-10 rounded-xl flex items-center justify-center",
								isGhibli
									? "bg-linear-to-br from-[#d64550] via-[#a62c2c] to-[#0e3b6c]"
									: "bg-linear-to-br from-violet-500 to-cyan-500",
							)}
						>
							<span
								className={
									isGhibli ? "text-[#0e3b6c] font-bold text-lg" : "text-white font-bold text-lg"
								}
							>
								M
							</span>
						</div>
						<div>
							<span className={isGhibli ? "text-[#0e3b6c] font-semibold" : "text-white font-semibold"}>
								Admin Panel
							</span>
							<p className={isGhibli ? "text-xs text-[#6e3f28]/70" : "text-xs text-white/50"}>MHD.dev</p>
						</div>
					</Link>
					{/* (Toggles moved to footer for compact header) */}
				</div>
				{/* Sidebar links */}
				<nav className="flex-1 p-4 space-y-2">
					{sidebarLinks.map((link) => {
						const active = isActive(link.href);
						const Icon = link.icon;
						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
									active
										? "bg-violet-500/20 text-violet-400"
										: "text-white/80 hover:bg-white/5 hover:text-white",
								)}
							>
								<Icon className="w-5 h-5" />
								<span>{link.label}</span>
								{active && <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />}
							</Link>
						);
					})}
				</nav>
				{/* Footer: toggles + user info and logout */}
				<div className="p-6 border-t border-white/10 mt-auto space-y-4">
					{/* Toggles with visible labels */}
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<span className={isGhibli ? "text-sm text-[#6e3f28]" : "text-sm text-white/80"}>Theme</span>
							<ThemeToggle />
						</div>
						{/* Motion toggle removed per request */}
					</div>

					{user && (
						<div className="flex items-center gap-3 pt-2">
							<div className="w-9 h-9 rounded-full bg-violet-500/30 flex items-center justify-center">
								<Home className="w-5 h-5 text-violet-400" />
							</div>
							<div className="flex-1">
								<p className="text-white text-sm font-medium">{user.username || "Admin"}</p>
								<p className="text-xs text-white/50">Admin</p>
							</div>
							<button
								onClick={() => void logout()}
								className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
								title="Logout"
							>
								<LogOut className="w-5 h-5 text-red-400" />
							</button>
						</div>
					)}
				</div>
			</div>
		</motion.aside>
	);
}
