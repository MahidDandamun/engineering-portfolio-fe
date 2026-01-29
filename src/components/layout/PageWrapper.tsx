"use client";

import { motion } from "framer-motion";

interface PageWrapperProps {
	children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
	return (
		<motion.div
			initial={false}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}
