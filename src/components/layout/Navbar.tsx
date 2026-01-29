"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Folder, Award, Mail, Github, Linkedin, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/context";

const navLinks = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/projects", label: "Projects", icon: Folder },
	{ href: "/certificates", label: "Certificates", icon: Award },
	{ href: "/contact", label: "Contact", icon: Mail },
];

const socialLinks = [
	{
		href: "https://github.com/yourusername",
		icon: Github,
		label: "GitHub",
	},
	{
		href: "https://linkedin.com/in/yourusername",
		icon: Linkedin,
		label: "LinkedIn",
	},
];

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const { isGhibli } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		if (isOpen) {
			setIsOpen(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<>
			<motion.header
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ type: "spring", stiffness: 100, damping: 20 }}
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-500",
					scrolled
						? isGhibli
							? "bg-white/80 backdrop-blur-xl border-b border-[#ffeaa7]/50 shadow-lg"
							: "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/5"
						: "bg-transparent",
				)}
			>
				<nav className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Logo */}
						<Link href="/" className="relative z-10">
							<motion.div
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="flex items-center gap-2"
							>
								<div
									className={cn(
										"w-10 h-10 rounded-xl flex items-center justify-center",
										isGhibli
											? "bg-linear-to-br from-[var(--ghibli-pink)] via-[var(--ghibli-terracotta)] to-[var(--ghibli-sage)]"
											: "bg-linear-to-br from-[#8b5cf6] via-[#3b82f6] to-[#dc2626] jjk-glow",
									)}
								>
									<span className="text-white font-bold text-lg">M</span>
								</div>
								<span
									className={cn(
										"hidden sm:block font-semibold text-lg",
										isGhibli ? "text-[var(--foreground)]" : "text-white",
									)}
								>
									MHD
									<span className={isGhibli ? "text-[var(--ghibli-terracotta)]" : "text-[#8b5cf6]"}>
										.dev
									</span>
								</span>
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden lg:flex items-center gap-1">
							{navLinks.map((link) => {
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
														? "text-[var(--foreground)]"
														: "text-white"
													: isGhibli
														? "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
														: "text-white/60 hover:text-white",
											)}
										>
											{isActive && (
												<motion.span
													layoutId="navbar-indicator"
													className={cn(
														"absolute inset-0 rounded-xl border",
														isGhibli
															? "bg-[var(--ghibli-cream)]/50 border-[var(--ghibli-pink)]/30"
															: "bg-white/10 border-purple-500/20",
													)}
													transition={{
														type: "spring",
														stiffness: 350,
														damping: 30,
													}}
												/>
											)}
											<span className="relative z-10">{link.label}</span>
										</motion.span>
									</Link>
								);
							})}
						</div>

						{/* Desktop Right Section */}
						<div className="hidden lg:flex items-center gap-4">
							{/* Theme Toggle */}
							<ThemeToggle />

							{/* Social Links */}
							<div className="flex items-center gap-2">
								{socialLinks.map((link) => (
									<motion.a
										key={link.label}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
										className={cn(
											"p-2 rounded-lg transition-colors",
											isGhibli
												? "text-[#636e72] hover:text-[#e74c3c] hover:bg-[#ffeaa7]/50"
												: "text-white/60 hover:text-white hover:bg-white/10",
										)}
									>
										<link.icon className="w-5 h-5" />
									</motion.a>
								))}
							</div>

							{/* Resume Button */}
							<motion.a
								href="/resume.pdf"
								target="_blank"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium shadow-lg",
									isGhibli
										? "bg-linear-to-r from-[#e74c3c] to-[#f39c12] shadow-[#e74c3c]/25"
										: "bg-linear-to-r from-[#8b5cf6] to-[#3b82f6] shadow-purple-500/25",
								)}
							>
								<Download className="w-4 h-4" />
								Resume
							</motion.a>
						</div>

						{/* Mobile Menu Button */}
						<motion.button
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsOpen(!isOpen)}
							className={cn(
								"lg:hidden relative z-10 p-2 rounded-lg transition-colors",
								isGhibli
									? "text-[#636e72] hover:text-[#2d3436] hover:bg-[#ffeaa7]/50"
									: "text-white/80 hover:text-white hover:bg-white/10",
							)}
						>
							{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
						</motion.button>
					</div>
				</nav>
			</motion.header>

			{/* Mobile Menu */}
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
								isGhibli ? "bg-white/95 border-[#ffeaa7]/50" : "bg-[#0a0a0f]/95 border-purple-500/20",
							)}
						>
							<div className="flex flex-col h-full pt-20 pb-6 px-6">
								{/* Theme Toggle in Mobile */}
								<div className="flex justify-center mb-6">
									<ThemeToggle />
								</div>

								{/* Nav Links */}
								<div className="flex-1 space-y-2">
									{navLinks.map((link, index) => {
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
														"flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
														isActive
															? isGhibli
																? "bg-[#ffeaa7]/50 text-[#2d3436]"
																: "bg-white/10 text-white"
															: isGhibli
																? "text-[#636e72] hover:text-[#2d3436] hover:bg-[#ffeaa7]/30"
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
										{socialLinks.map((link) => (
											<motion.a
												key={link.label}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												whileTap={{ scale: 0.95 }}
												className={cn(
													"p-3 rounded-xl transition-colors",
													isGhibli
														? "bg-[#ffeaa7]/30 text-[#636e72] hover:text-[#e74c3c]"
														: "bg-white/5 text-white/60 hover:text-white",
												)}
											>
												<link.icon className="w-6 h-6" />
											</motion.a>
										))}
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
		</>
	);
}
