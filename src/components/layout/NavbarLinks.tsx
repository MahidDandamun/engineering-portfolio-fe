"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context";
import { NAV_LINKS } from "./navbarData";

export function NavbarLinks() {
	const pathname = usePathname();
	const { isGhibli } = useTheme();
	return (
		<div className="hidden lg:flex items-center gap-1">
			{NAV_LINKS.map((link) => {
				const isActive = pathname === link.href;
				return (
					<Link key={link.href} href={link.href}>
						<motion.span
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={cn(
								"relative px-4 py-2 rounded-xl text-sm font-medium transition-colors",
								isActive
									? isGhibli
										? "text-(--foreground)"
										: "text-white"
									: isGhibli
										? "text-(--foreground-secondary) hover:text-(--foreground)"
										: "text-white/60 hover:text-white",
							)}
						>
							{isActive && (
								<motion.span
									layoutId="navbar-indicator"
									className={cn(
										"absolute inset-0 rounded-xl border",
										isGhibli
											? "bg-(--ghibli-cream)/50 border-(--ghibli-pink)/30"
											: "bg-white/10 border-purple-500/20",
									)}
									transition={{ type: "spring", stiffness: 350, damping: 30 }}
								/>
							)}
							<span className="relative z-10">{link.label}</span>
						</motion.span>
					</Link>
				);
			})}
		</div>
	);
}
