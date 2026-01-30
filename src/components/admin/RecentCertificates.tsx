"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface Certificate {
	_id: string;
	title: string;
	issuer: string;
}

interface RecentCertificatesProps {
	certificates: Certificate[];
}

export function RecentCertificates({ certificates }: RecentCertificatesProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.4 }}
			className="rounded-2xl bg-white/5 border border-white/10 p-6"
		>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-white">Recent Certificates</h2>
				<a
					href="/admin/certificates"
					className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
				>
					View All <span className="w-4 h-4">→</span>
				</a>
			</div>
			<div className="space-y-3">
				{certificates.slice(0, 5).map((cert) => (
					<div
						key={cert._id}
						className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
								<Award className="w-5 h-5 text-cyan-400" />
							</div>
							<div>
								<p className="text-white font-medium">{cert.title}</p>
								<p className="text-sm text-white/50">{cert.issuer}</p>
							</div>
						</div>
					</div>
				))}
				{certificates.length === 0 && (
					<p className="text-white/50 text-center py-8">No certificates yet. Add your first certificate!</p>
				)}
			</div>
		</motion.div>
	);
}
