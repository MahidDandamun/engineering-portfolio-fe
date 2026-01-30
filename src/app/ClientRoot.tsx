"use client";

import React from "react";
import { QueryProvider, ThemeProvider } from "@/context";
import { Navbar, Footer } from "@/components/layout";
import { ThemeBackground, Toaster, GhibliBackground } from "@/components/ui";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<QueryProvider>
				{/* Animated Background */}
				<ThemeBackground />
				<GhibliBackground />

				{/* Toast Notifications */}
				<Toaster />

				{/* Content */}
				<div className="relative z-10 flex flex-col min-h-screen">
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</QueryProvider>
		</ThemeProvider>
	);
}
