"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";
import { usePathname } from "next/navigation";
import { Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui";
import { NavbarSocialLinks } from "./NavbarSocialLinks";
import { NAV_LINKS } from "./navbarData";

export function NavbarMobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
	const pathname = usePathname();
	const { isGhibli } = useTheme();
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-40 lg:hidden"
				>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
						className={cn(
							"absolute inset-0 backdrop-blur-sm",
							isGhibli ? "bg-[#2d3436]/40" : "bg-black/60",
						)}
					/>

					{/* Menu Panel */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 30, stiffness: 300 }}
						className={cn(
							"absolute right-0 top-0 bottom-0 w-full max-w-sm backdrop-blur-xl border-l",
							isGhibli ? "bg-[#f7f0e3]/98 border-[#6cb65f]/30" : "bg-[#0a0a0f]/95 border-purple-500/20",
						)}
					>
						<div className="flex flex-col h-full pt-20 pb-6 px-6">
							{/* Theme Toggle in Mobile */}
							<div className="flex justify-center mb-6">
								<ThemeToggle />
							</div>

							{/* Nav Links */}
							<div className="flex-1 space-y-2">
								{NAV_LINKS.map((link, index) => {
									const isActive = pathname === link.href;
									return (
										<motion.div
											key={link.href}
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
										>
											<Link
												href={link.href}
												className={cn(
													"flex items-center gap-4 px-4 py-3 rounded-xl transition-colors cursor-pointer",
													isActive
														? isGhibli
															? "bg-[#6cb65f]/20 text-[#0e3b6c] border-l-4 border-[#0e3b6c]"
															: "bg-white/10 text-white"
														: isGhibli
															? "text-[#6e3f28] hover:text-[#0e3b6c] hover:bg-[#6cb65f]/10"
															: "text-white/60 hover:text-white hover:bg-white/5",
												)}
											>
												<link.icon className="w-5 h-5" />
												<span className="font-medium">{link.label}</span>
											</Link>
										</motion.div>
									);
								})}
							</div>

							{/* Bottom Section */}
							<div
								className={cn(
									"border-t pt-6 space-y-4",
									isGhibli ? "border-[#ffeaa7]/50" : "border-white/10",
								)}
							>
								{/* Social Links */}
								<div className="flex items-center justify-center gap-4">
									<NavbarSocialLinks />
								</div>

								{/* Resume Button */}
								<motion.a
									href="/resume.pdf"
									target="_blank"
									whileTap={{ scale: 0.95 }}
									className={cn(
										"flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-white font-medium shadow-lg",
										isGhibli
											? "bg-linear-to-r from-[#e74c3c] to-[#f39c12] shadow-[#e74c3c]/25"
											: "bg-linear-to-r from-[#8b5cf6] to-[#3b82f6] shadow-purple-500/25",
									)}
								>
									<Download className="w-5 h-5" />
									Download Resume
								</motion.a>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
