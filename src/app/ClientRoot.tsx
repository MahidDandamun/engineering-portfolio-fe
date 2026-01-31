"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { QueryProvider, ThemeProvider } from "@/context";
import { Navbar, Footer } from "@/components/layout";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui";
import PageTransition from "@/components/layout/PageTransition";
import MotionConfigClient from "@/components/layout/MotionConfigClient";

// Lazy-load heavy animated backgrounds on client to avoid blocking navigation
const ThemeBackground = dynamic(() => import("@/components/ui").then((m) => m.ThemeBackground), {
	ssr: false,
});
const GhibliBackground = dynamic(() => import("@/components/ui").then((m) => m.GhibliBackground), {
	ssr: false,
});

export default function ClientRoot({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	// Hide Navbar and Footer on /admin and all subroutes
	const isAdminRoute = pathname?.startsWith("/admin");
	return (
		<ThemeProvider>
			<QueryProvider>
				<MotionConfigClient>
					{/* Animated Background (lazy-loaded) */}
					<ThemeBackground />
					<GhibliBackground />

					{/* Toast Notifications */}
					<Toaster />

					{/* Content */}
					<div className="relative z-10 flex flex-col min-h-screen">
						{!isAdminRoute && <Navbar />}

						{/* Render page content directly to avoid wrapping server components
							with a client component (PageTransition). This prevents client
							components from receiving server children which can hide content.
							PageTransition was removed here to ensure server-rendered pages
							display correctly; animations are disabled as requested. */}
						<main className="page-transition-content flex-1">{children}</main>

						{!isAdminRoute && <Footer />}
					</div>
				</MotionConfigClient>
			</QueryProvider>
		</ThemeProvider>
	);
}
