"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, User, AlertCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAuth } from "@/context";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError("");

		try {
			await login(data.username, data.password);
			router.push("/admin");
		} catch {
			setError("Invalid username or password");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			{/* Background effects */}
			<div className="fixed inset-0 z-0">
				<div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative z-10 w-full max-w-md"
			>
				<div className="text-center mb-8">
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-cyan-500 mb-4"
					>
						<Lock className="w-8 h-8 text-white" />
					</motion.div>
					<h1 className="text-3xl font-bold text-white">Admin Login</h1>
					<p className="text-white/60 mt-2">Enter your credentials to access the admin panel</p>
				</div>

				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					onSubmit={handleSubmit(onSubmit)}
					className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-6"
				>
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
						>
							<AlertCircle className="w-5 h-5 shrink-0" />
							<p className="text-sm">{error}</p>
						</motion.div>
					)}

					<Input
						label="Username"
						placeholder="Enter your username"
						error={errors.username?.message}
						{...register("username")}
					/>

					<Input
						label="Password"
						type="password"
						placeholder="Enter your password"
						error={errors.password?.message}
						{...register("password")}
					/>

					<Button type="submit" size="lg" isLoading={isLoading} className="w-full">
						<User className="w-5 h-5 mr-2" />
						Sign In
					</Button>
				</motion.form>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className="text-center text-white/40 text-sm mt-6"
				>
					Protected area. Authorized personnel only.
				</motion.p>
			</motion.div>
		</div>
	);
}
