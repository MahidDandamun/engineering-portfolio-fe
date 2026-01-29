"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ type: "spring", duration: 0.3 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4"
					>
						<div
							className={cn(
								"relative w-full max-w-lg rounded-2xl border border-white/10",
								"bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-violet-500/10",
								className,
							)}
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							{title && (
								<div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
									<h3 className="text-lg font-semibold text-white">{title}</h3>
									<button
										onClick={onClose}
										className="rounded-lg p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
									>
										<X className="h-5 w-5" />
									</button>
								</div>
							)}

							{/* Content */}
							<div className="p-6">{children}</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
