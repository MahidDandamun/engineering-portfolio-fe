"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, Folder, Award, LogOut, Home, ChevronRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
	const sidebarLinks = [
		{ href: "/admin", label: "Dashboard", icon: LayoutDashboard },
		{ href: "/admin/projects", label: "Projects", icon: Folder },
		{ href: "/admin/certificates", label: "Certificates", icon: Award },
	];
	const pathname = usePathname();
	const { data: session } = useSession();

	const isActive = (href: string) => {
		if (!pathname) return false;
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
				{/* User info and logout */}
				<div className="p-6 border-t border-white/10 mt-auto">
					{session?.user && (
						<div className="flex items-center gap-3">
							<div className="w-9 h-9 rounded-full bg-violet-500/30 flex items-center justify-center">
								<Home className="w-5 h-5 text-violet-400" />
							</div>
							<div className="flex-1">
								<p className="text-white text-sm font-medium">
									{session.user.name ||
										(typeof session.user === "object" && "username" in session.user
											? (session.user as { username?: string }).username
											: undefined) ||
										"Admin"}
								</p>
								<p className="text-xs text-white/50">Admin</p>
							</div>
							<button
								onClick={() => signOut()}
								className="ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors"
								title="Logout"
							>
								<LogOut className="w-5 h-5 text-red-400" />
							</button>
						</div>
					)}
				</div>
			</div>
		</aside>
	);
}
