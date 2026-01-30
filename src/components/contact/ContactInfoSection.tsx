"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useTheme } from "@/context";

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "hello@mhd.dev",
		href: "mailto:hello@mhd.dev",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Remote / Worldwide",
		href: null,
	},
];

const socialLinks = [
	{ icon: Github, label: "GitHub", href: "https://github.com/yourusername" },
	{ icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
	{ icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
];

export function ContactInfoSection() {
	const { isGhibli } = useTheme();
	return (
		<>
			{/* Contact Info */}
			<motion.div
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ delay: 0.2 }}
				className="lg:col-span-2 space-y-8"
			>
				{/* Info Cards */}
				<div className="space-y-4">
					{contactInfo.map((item, index) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + index * 0.1 }}
							className={cn(
								"flex items-center gap-4 p-4 rounded-xl border",
								isGhibli ? "bg-white/80 border-[#d64550]/30" : "bg-white/5 border-white/10",
							)}
						>
							<div
								className={cn(
									"p-3 rounded-xl border",
									isGhibli
										? "bg-[#d64550]/10 border-[#d64550]/20"
										: "bg-violet-500/10 border-violet-500/20",
								)}
							>
								<item.icon className={cn("w-5 h-5", isGhibli ? "text-[#a62c2c]" : "text-violet-400")} />
							</div>
							<div>
								<p className={cn("text-sm", isGhibli ? "text-[#6e3f28]/60" : "text-white/50")}>
									{item.label}
								</p>
								{item.href ? (
									<a
										href={item.href}
										className={cn(
											"transition-colors",
											isGhibli
												? "text-[#0e3b6c] hover:text-[#d64550]"
												: "text-white hover:text-violet-400",
										)}
									>
										{item.value}
									</a>
								) : (
									<p className={isGhibli ? "text-[#0e3b6c]" : "text-white"}>{item.value}</p>
								)}
							</div>
						</motion.div>
					))}
				</div>
				{/* Social Links */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="space-y-4"
				>
					<h3 className={cn("text-lg font-semibold", isGhibli ? "text-[#0e3b6c]" : "text-white")}>
						Connect with me
					</h3>
					<div className="flex gap-3">
						{socialLinks.map((link) => (
							<motion.a
								key={link.label}
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									"p-4 rounded-xl border transition-all",
									isGhibli
										? "bg-white/80 border-[#d64550]/30 text-[#6e3f28]/60 hover:text-[#0e3b6c] hover:bg-[#d64550]/10"
										: "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10",
								)}
							>
								<link.icon className="w-6 h-6" />
							</motion.a>
						))}
					</div>
				</motion.div>
				{/* Decorative */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="hidden lg:block relative h-48"
				>
					<div
						className={cn(
							"absolute inset-0 rounded-2xl blur-2xl",
							isGhibli
								? "bg-linear-to-br from-[#d64550]/20 to-[#0e3b6c]/20"
								: "bg-linear-to-br from-violet-500/20 to-cyan-500/20",
						)}
					/>
					<div
						className={cn(
							"relative h-full rounded-2xl border p-6 flex items-center justify-center",
							isGhibli ? "bg-white/80 border-[#d64550]/30" : "bg-white/5 border-white/10",
						)}
					>
						<p className={cn("text-center text-sm", isGhibli ? "text-[#6e3f28]/60" : "text-white/50")}>
							💡 I typically respond within 24-48 hours
						</p>
					</div>
				</motion.div>
			</motion.div>
		</>
	);
}
