import React from "react";
import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CertificateActions({
	onDownload,
	onShare,
	isGhibli,
}: {
	onDownload?: () => void;
	onShare?: () => void;
	isGhibli: boolean;
}) {
	return (
		<div className="flex items-center gap-2 mt-4">
			{onDownload && (
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className={cn(
						"flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
						isGhibli
							? "bg-red-100 text-red-600 hover:bg-red-200"
							: "bg-violet-900 text-violet-200 hover:bg-violet-800",
					)}
					onClick={onDownload}
				>
					<Download className="w-4 h-4 mr-1" /> Download
				</motion.button>
			)}
			{onShare && (
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className={cn(
						"flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
						isGhibli
							? "bg-red-100 text-red-600 hover:bg-red-200"
							: "bg-violet-900 text-violet-200 hover:bg-violet-800",
					)}
					onClick={onShare}
				>
					<Share2 className="w-4 h-4 mr-1" /> Share
				</motion.button>
			)}
		</div>
	);
}
