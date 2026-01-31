"use client";

import { useState, useEffect } from "react";

// import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
// import { NAV_LINKS, SOCIAL_LINKS } from "./navbarData";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/context";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarSocialLinks } from "./NavbarSocialLinks";
// import { NavbarResumeButton } from "./NavbarResumeButton";
import { NavbarMobileMenu } from "./NavbarMobileMenu";

// navLinks and socialLinks now imported from navbarData.ts

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
							? "bg-[#f7f0e3]/95 backdrop-blur-xl border-b border-[#6cb65f]/30 shadow-lg shadow-[#6e3f28]/5"
							: "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/5"
						: "bg-transparent",
				)}
			>
				<nav className="max-w-7xl 2xl:max-w-400 mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
					<div className="flex items-center justify-between h-16 lg:h-20">
						{/* Logo */}
						<NavbarLogo />

						{/* Desktop Navigation */}
						<NavbarLinks />

						{/* Desktop Right Section */}
						<div className="hidden lg:flex items-center gap-4">
							{/* Theme Toggle */}
							<ThemeToggle />

							{/* Social Links */}
							<NavbarSocialLinks />
						</div>

						{/* Mobile Menu Button - visible on mobile only */}
						<div className="flex lg:hidden items-center">
							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => setIsOpen(!isOpen)}
								className={cn(
									"relative z-10 p-2 rounded-lg transition-colors cursor-pointer",
									isGhibli
										? "text-[#6e3f28] hover:text-[#0e3b6c] hover:bg-[#6cb65f]/20"
										: "text-white/80 hover:text-white hover:bg-white/10",
								)}
							>
								{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
							</motion.button>
						</div>
					</div>
				</nav>
			</motion.header>

			{/* Mobile Menu */}
			<NavbarMobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	);
}
