"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
export default function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
	const pathname = usePathname();

	// Fallback key if pathname is temporarily null
	const safeKey = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "root");

	// If a one-time skip flag is present (set before navigation), clear it and
	// render children without the animated transition so the next navigation
	// appears immediate.
	if (typeof window !== "undefined" && sessionStorage.getItem("skipPageTransition") === "1") {
		sessionStorage.removeItem("skipPageTransition");
		return <main className={`page-transition-content ${className ?? ""}`}>{children}</main>;
	}

	// Respect user/global motion preference and skip animations when motion is disabled.
	const { motionEnabled } = useTheme();
	// Avoid server-side useSearchParams to prevent CSR bails during prerender.
	const tabParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("tab") : null;

	// If motion is disabled globally or a `tab` search param is present (tab switch), render without animations.
	if (!motionEnabled || tabParam) {
		return <main className={`page-transition-content ${className ?? ""}`}>{children}</main>;
	}

	return (
		<AnimatePresence mode="sync">
			<motion.main
				className={`page-transition-content ${className ?? ""}`}
				key={safeKey}
				initial={{ opacity: 0, y: 4 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ duration: 0.18, ease: "easeOut" }}
			>
				{children}
			</motion.main>
		</AnimatePresence>
	);
}
