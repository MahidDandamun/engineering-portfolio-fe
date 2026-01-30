"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { FOOTER_LINKS, FOOTER_SOCIAL_LINKS } from "./footerData";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";

// footerLinks and socialLinks now imported from footerData.ts

export function Footer() {
	const { isGhibli } = useTheme();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer
			className={cn(
				"relative mt-32 border-t backdrop-blur-xl transition-colors duration-500",
				isGhibli ? "border-[#ffeaa7]/50 bg-white/50" : "border-white/10 bg-[#0a0a0f]/50",
			)}
		>
			{/* Gradient overlay */}
			<div
				className={cn(
					"absolute inset-0 pointer-events-none",
					isGhibli
						? "bg-linear-to-b from-transparent via-[#e74c3c]/5 to-[#3498db]/5"
						: "bg-linear-to-b from-transparent via-[#8b5cf6]/5 to-[#3b82f6]/5",
				)}
			/>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					{/* Brand Section */}
					<div className="lg:col-span-2 space-y-6">
						<Link href="/" className="inline-block">
							<motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
								<div
									className={cn(
										"w-12 h-12 rounded-xl flex items-center justify-center",
										isGhibli
											? "bg-linear-to-br from-[#e74c3c] via-[#f39c12] to-[#3498db]"
											: "bg-linear-to-br from-[#8b5cf6] to-[#3b82f6]",
									)}
								>
									<span className="text-white font-bold text-xl">M</span>
								</div>
								<span
									className={cn("font-semibold text-xl", isGhibli ? "text-[#2d3436]" : "text-white")}
								>
									MHD<span className={isGhibli ? "text-[#e74c3c]" : "text-[#8b5cf6]"}>.dev</span>
								</span>
							</motion.div>
						</Link>

						<p className={cn("max-w-md leading-relaxed", isGhibli ? "text-[#636e72]" : "text-white/60")}>
							A passionate engineer crafting innovative solutions across web development, embedded
							systems, software engineering, and 3D design. Building the future one project at a time.
						</p>

						{/* Social Links */}
						<div className="flex items-center gap-3">
							{FOOTER_SOCIAL_LINKS.map((link) => (
								<motion.a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.95 }}
									className={cn(
										"p-3 rounded-xl border transition-all duration-300",
										isGhibli
											? "bg-white/50 border-[#ffeaa7]/50 text-[#636e72] hover:text-[#e74c3c] hover:bg-white"
											: "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10",
									)}
								>
									<link.icon className="w-5 h-5" />
								</motion.a>
							))}
						</div>
					</div>

					{/* Links Sections */}
					{FOOTER_LINKS.map((section) => (
						<div key={section.title}>
							<h4 className={cn("font-semibold mb-4", isGhibli ? "text-[#2d3436]" : "text-white")}>
								{section.title}
							</h4>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className={cn(
												"transition-colors duration-200",
												isGhibli
													? "text-[#636e72] hover:text-[#e74c3c]"
													: "text-white/60 hover:text-[#8b5cf6]",
											)}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div
					className={cn(
						"py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4",
						isGhibli ? "border-[#ffeaa7]/50" : "border-white/10",
					)}
				>
					<p className={cn("text-sm flex items-center gap-1", isGhibli ? "text-[#636e72]" : "text-white/50")}>
						© {new Date().getFullYear()} MHD.dev. Made with{" "}
						<Heart className="w-4 h-4 text-red-400 fill-red-400" /> and lots of coffee.
					</p>

					{/* Back to Top Button */}
					<motion.button
						onClick={scrollToTop}
						whileHover={{ scale: 1.05, y: -2 }}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
							isGhibli
								? "text-[#636e72] hover:text-[#2d3436] hover:bg-[#ffeaa7]/50"
								: "text-white/60 hover:text-white hover:bg-white/10",
						)}
					>
						<ArrowUp className="w-4 h-4" />
						<span className="text-sm">Back to top</span>
					</motion.button>
				</div>
			</div>
		</footer>
	);
}
