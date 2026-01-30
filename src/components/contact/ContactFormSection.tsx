"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const contactSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email"),
	subject: z.string().min(5, "Subject must be at least 5 characters"),
	message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactFormSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
	const { isGhibli } = useTheme();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onSubmit = async (_data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitStatus(null);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setSubmitStatus("success");
			reset();
		} catch {
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.3 }}
			className="lg:col-span-3"
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={cn(
					"p-8 rounded-2xl border backdrop-blur-sm space-y-6",
					isGhibli ? "bg-white/80 border-[#d64550]/30" : "bg-white/5 border-white/10",
				)}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<Input label="Name" placeholder="Your name" error={errors.name?.message} {...register("name")} />
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
	);
}
