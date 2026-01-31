"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, User, AlertCircle } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useTheme } from "@/context";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, LoginFormData } from "@/lib/schemas/loginSchema";

export default function LoginPage() {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { isGhibli } = useTheme();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const { login, refresh } = useAuth();

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError("");
		try {
			const res = await login({ username: data.username, password: data.password });
			const ok = res?.data?.user ?? res?.user ?? res?.success;
			if (ok) {
				// Ensure auth state is refreshed before navigating
				try {
					await refresh();
				} catch {
					// ignore, we'll still navigate if login indicated success
				}
				router.push("/admin");
			} else {
				setError("Invalid username or password");
			}
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : String(err ?? "Invalid username or password");
			setError(msg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center p-4">
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
						className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
							isGhibli
								? "bg-linear-to-br from-[#6cb65f] to-[#d64550]"
								: "bg-linear-to-br from-violet-500 to-cyan-500"
						}`}
					>
						<Lock className="w-8 h-8 text-white" />
					</motion.div>
					<h1 className={`text-3xl font-bold ${isGhibli ? "text-[#6e3f28]" : "text-white"}`}>Admin Login</h1>
					<p className={`mt-2 ${isGhibli ? "text-[#6e3f28]/70" : "text-white/60"}`}>
						Enter your credentials to access the admin panel
					</p>
				</div>

				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					onSubmit={handleSubmit(onSubmit)}
					className={`p-8 rounded-2xl backdrop-blur-md space-y-6 shadow-lg ${
						isGhibli
							? "bg-white/90 border border-[#6cb65f]/30 text-[#6e3f28] shadow-[#6e3f28]/10"
							: "bg-slate-900/80 border border-white/10 text-white shadow-none"
					}`}
				>
					{error && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400"
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
					className={`text-center text-sm mt-6 ${isGhibli ? "text-[#6e3f28]/60" : "text-white/40"}`}
				>
					Protected area. Authorized personnel only.
				</motion.p>
			</motion.div>
		</div>
	);
}
