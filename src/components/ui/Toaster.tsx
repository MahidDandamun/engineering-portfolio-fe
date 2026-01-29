"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/context";

export function Toaster() {
	const { theme } = useTheme();

	return (
		<SonnerToaster
			theme={theme}
			position="top-right"
			expand={false}
			richColors
			closeButton
			duration={4000}
			toastOptions={{
				classNames: {
					toast:
						"backdrop-blur-sm border shadow-lg " +
						(theme === "light"
							? "bg-white/90 border-[#ffeaa7] text-[#2d3436]"
							: "bg-gray-900/90 border-white/20 text-white"),
					title: "font-semibold",
					description: "text-sm opacity-90",
					actionButton:
						theme === "light"
							? "bg-[#e74c3c] text-white hover:bg-[#c0392b]"
							: "bg-[#8b5cf6] text-white hover:bg-[#7c3aed]",
					cancelButton:
						theme === "light"
							? "bg-gray-200 text-gray-800 hover:bg-gray-300"
							: "bg-gray-700 text-gray-200 hover:bg-gray-600",
					closeButton:
						theme === "light"
							? "bg-white border-[#ffeaa7] hover:bg-gray-50"
							: "bg-gray-800 border-white/20 hover:bg-gray-700",
					success:
						theme === "light"
							? "bg-linear-to-r from-green-50 to-emerald-50 border-green-200"
							: "bg-linear-to-r from-green-900/20 to-emerald-900/20 border-green-500/30",
					error:
						theme === "light"
							? "bg-linear-to-r from-red-50 to-rose-50 border-red-200"
							: "bg-linear-to-r from-red-900/20 to-rose-900/20 border-red-500/30",
					warning:
						theme === "light"
							? "bg-linear-to-r from-yellow-50 to-orange-50 border-yellow-200"
							: "bg-linear-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30",
					info:
						theme === "light"
							? "bg-linear-to-r from-blue-50 to-cyan-50 border-blue-200"
							: "bg-linear-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30",
				},
			}}
		/>
	);
}
