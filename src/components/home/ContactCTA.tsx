"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useTheme } from "@/context";
import { cn } from "@/lib/utils";
import { CONTACT_BADGES, CONTACT_BADGE } from "./contactData";

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
							isGhibli
								? CONTACT_BADGE.colorLight.split(" ").slice(0, 2).join(" ")
								: CONTACT_BADGE.colorDark.split(" ").slice(0, 2).join(" "),
						)}
					>
						<CONTACT_BADGE.icon
							className={cn(
								"w-4 h-4",
								isGhibli
									? CONTACT_BADGE.colorLight.split(" ")[4]
									: CONTACT_BADGE.colorDark.split(" ")[4],
							)}
						/>
						<span
							className={cn(
								"text-sm",
								isGhibli
									? CONTACT_BADGE.colorLight.split(" ")[2]
									: CONTACT_BADGE.colorDark.split(" ")[2],
							)}
						>
							{CONTACT_BADGE.label}
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
						{CONTACT_BADGES.map((badge) => {
							const color = isGhibli ? badge.colorLight : badge.colorDark;
							const iconColor = isGhibli ? badge.iconColorLight : badge.iconColorDark;
							return (
								<div
									key={badge.label}
									className={cn(
										"flex items-center gap-2 px-4 py-2 rounded-xl border",
										color.split(" ").slice(0, 2).join(" "),
									)}
								>
									<badge.icon className={cn("w-4 h-4", iconColor)} />
									<span className={cn("text-sm", color.split(" ")[2])}>{badge.label}</span>
								</div>
							);
						})}
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
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
								Get in Touch
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
