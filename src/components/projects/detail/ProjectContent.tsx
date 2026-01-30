"use client";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProjectContent({ description }: { description: string }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
			className="lg:col-span-3"
		>
			<div className="prose-custom">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
			</div>
		</motion.div>
	);
}
