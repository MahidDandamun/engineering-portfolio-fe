"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";

export function ContactCTA() {
	const { isGhibli } = useTheme();

	return (
		<section className="relative py-24 lg:py-32 overflow-hidden">
			{/* Background effects */}
			<div className="absolute inset-0">
				<div
					className={cn(
						"absolute inset-0 bg-linear-to-b from-transparent to-transparent",
						isGhibli ? "via-amber-500/5" : "via-violet-500/5",
					)}
				/>
				<motion.div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full"
					style={{
						background: isGhibli
							? "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 60%)"
							: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
					}}
					animate={{
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>

			<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="space-y-8"
				>
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className={cn(
							"inline-flex items-center gap-2 px-4 py-2 rounded-full border",
							isGhibli ? "bg-amber-100 border-amber-200" : "bg-violet-500/10 border-violet-500/20",
						)}
					>
						<Briefcase className={cn("w-4 h-4", isGhibli ? "text-amber-600" : "text-violet-400")} />
						<span className={cn("text-sm", isGhibli ? "text-amber-700" : "text-violet-400")}>
							Open for opportunities
						</span>
					</motion.div>

					{/* Heading */}
					<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
						<span className={isGhibli ? "text-slate-800" : "text-white"}>Let&apos;s Build </span>
						<span
							className={cn(
								"bg-clip-text text-transparent",
								isGhibli
									? "bg-linear-to-r from-red-500 via-amber-500 to-blue-500"
									: "bg-linear-to-r from-violet-400 to-cyan-400",
							)}
						>
							Something Amazing
						</span>
					</h2>

					{/* Description */}
					<p
						className={cn(
							"text-lg max-w-2xl mx-auto leading-relaxed",
							isGhibli ? "text-slate-600" : "text-white/60",
						)}
					>
						Have a project in mind or looking for an engineer who can bridge multiple disciplines? I&apos;d
						love to hear from you and explore how we can work together.
					</p>

					{/* Info badges */}
					<div className="flex flex-wrap justify-center gap-4">
						<div
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-xl border",
								isGhibli ? "bg-white/70 border-slate-200" : "bg-white/5 border-white/10",
							)}
						>
							<MapPin className={cn("w-4 h-4", isGhibli ? "text-slate-500" : "text-white/50")} />
							<span className={cn("text-sm", isGhibli ? "text-slate-600" : "text-white/70")}>
								Remote / Worldwide
							</span>
						</div>
						<div
							className={cn(
								"flex items-center gap-2 px-4 py-2 rounded-xl border",
								isGhibli ? "bg-white/70 border-slate-200" : "bg-white/5 border-white/10",
							)}
						>
							<Mail className={cn("w-4 h-4", isGhibli ? "text-slate-500" : "text-white/50")} />
							<span className={cn("text-sm", isGhibli ? "text-slate-600" : "text-white/70")}>
								Quick Response
							</span>
						</div>
					</div>

					{/* CTA Button */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="pt-4"
					>
						<Link href="/contact">
							<Button size="lg" className="group min-w-50">
								<Mail className="w-5 h-5 mr-2" />
								Get in Touch
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
