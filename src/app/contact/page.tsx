"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { Button, Input, Textarea } from "@/components/ui";

const contactSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email"),
	subject: z.string().min(5, "Subject must be at least 5 characters"),
	message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
	{
		icon: Linkedin,
		label: "LinkedIn",
		href: "https://linkedin.com/in/yourusername",
	},
	{ icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
];

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// In production, you would send this to your backend
			console.log("Form submitted:", data);

			setSubmitStatus("success");
			reset();
		} catch {
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<PageWrapper>
			<Section className="pt-32">
				<SectionHeader
					title="Get in Touch"
					subtitle="Have a project in mind or want to collaborate? Let's talk!"
				/>

				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
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
									className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
								>
									<div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
										<item.icon className="w-5 h-5 text-violet-400" />
									</div>
									<div>
										<p className="text-sm text-white/50">{item.label}</p>
										{item.href ? (
											<a
												href={item.href}
												className="text-white hover:text-violet-400 transition-colors"
											>
												{item.value}
											</a>
										) : (
											<p className="text-white">{item.value}</p>
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
							<h3 className="text-lg font-semibold text-white">Connect with me</h3>
							<div className="flex gap-3">
								{socialLinks.map((link) => (
									<motion.a
										key={link.label}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										whileHover={{ scale: 1.1, y: -2 }}
										whileTap={{ scale: 0.95 }}
										className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
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
							<div className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
							<div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 flex items-center justify-center">
								<p className="text-center text-white/50 text-sm">
									💡 I typically respond within 24-48 hours
								</p>
							</div>
						</motion.div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className="lg:col-span-3"
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
								<Input
									label="Name"
									placeholder="Your name"
									error={errors.name?.message}
									{...register("name")}
								/>
								<Input
									label="Email"
									type="email"
									placeholder="your@email.com"
									error={errors.email?.message}
									{...register("email")}
								/>
							</div>

							<Input
								label="Subject"
								placeholder="What's this about?"
								error={errors.subject?.message}
								{...register("subject")}
							/>

							<Textarea
								label="Message"
								placeholder="Tell me about your project or idea..."
								className="min-h-40"
								error={errors.message?.message}
								{...register("message")}
							/>

							{/* Status Messages */}
							{submitStatus === "success" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
								>
									<CheckCircle className="w-5 h-5 shrink-0" />
									<p>Thank you! Your message has been sent. I&apos;ll get back to you soon.</p>
								</motion.div>
							)}

							{submitStatus === "error" && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
								>
									<AlertCircle className="w-5 h-5 shrink-0" />
									<p>Something went wrong. Please try again or email me directly.</p>
								</motion.div>
							)}

							<Button type="submit" size="lg" isLoading={isSubmitting} className="w-full">
								<Send className="w-5 h-5 mr-2" />
								Send Message
							</Button>
						</form>
					</motion.div>
				</div>
			</Section>
		</PageWrapper>
	);
}
