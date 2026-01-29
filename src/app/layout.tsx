import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider, AuthProvider, ThemeProvider } from "@/context";
import { Navbar, Footer } from "@/components/layout";
import { ThemeBackground } from "@/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "MHD.dev | Mahid's Engineering Portfolio",
	description:
		"Full-Stack Engineer specializing in web development, embedded systems, and 3D design. View my projects and get in touch.",
	keywords: [
		"Mahid",
		"developer",
		"engineer",
		"portfolio",
		"web development",
		"embedded systems",
		"software engineering",
		"react",
		"next.js",
		"typescript",
	],
	authors: [{ name: "Mahid" }],
	openGraph: {
		title: "MHD.dev | Mahid's Engineering Portfolio",
		description: "Full-Stack Engineer specializing in web development, embedded systems, and 3D design.",
		type: "website",
		locale: "en_PH",
	},
	twitter: {
		card: "summary_large_image",
		title: "MHD.dev | Mahid's Engineering Portfolio",
		description: "Full-Stack Engineer specializing in web development, embedded systems, and 3D design.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
			<body className={`${inter.className} antialiased min-h-screen`}>
				<ThemeProvider>
					<QueryProvider>
						<AuthProvider>
							{/* Animated Background */}
							<ThemeBackground />

							{/* Content */}
							<div className="relative z-10 flex flex-col min-h-screen">
								<Navbar />
								<main className="flex-1">{children}</main>
								<Footer />
							</div>
						</AuthProvider>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
