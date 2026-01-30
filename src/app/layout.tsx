import type { Metadata } from "next";
import "./globals.css";
import ClientRoot from "./ClientRoot";
import SessionProvider from "@/context/SessionProvider";
import { Inter } from "next/font/google";

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
				<SessionProvider>
					<ClientRoot>{children}</ClientRoot>
				</SessionProvider>
			</body>
		</html>
	);
}
