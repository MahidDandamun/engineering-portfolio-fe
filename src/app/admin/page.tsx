"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Folder, Award, Eye, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useProjects, useCertificates } from "@/hooks";

const statsCards = [
	{
		title: "Total Projects",
		icon: Folder,
		color: "from-violet-500 to-purple-500",
		key: "projects",
	},
	{
		title: "Certificates",
		icon: Award,
		color: "from-cyan-500 to-blue-500",
		key: "certificates",
	},
	{
		title: "Featured",
		icon: TrendingUp,
		color: "from-green-500 to-emerald-500",
		key: "featured",
	},
	{
		title: "Views Today",
		icon: Eye,
		color: "from-orange-500 to-red-500",
		key: "views",
	},
];

export default function AdminDashboard() {
	const { data: projectsData } = useProjects();
	const { data: certificatesData } = useCertificates();

	const projects = projectsData?.data || [];
	const certificates = certificatesData?.data || [];
	const featuredCount = projects.filter((p) => p.featured).length;

	const getStatValue = (key: string) => {
		switch (key) {
			case "projects":
				return projects.length;
			case "certificates":
				return certificates.length;
			case "featured":
				return featuredCount;
			case "views":
				return "1.2k"; // Placeholder
			default:
				return 0;
		}
	};

	return (
		<div className="space-y-8">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
			>
				<div>
					<h1 className="text-3xl font-bold text-white">Dashboard</h1>
					<p className="text-white/60 mt-1">Welcome back! Here&apos;s an overview of your portfolio.</p>
				</div>
				<div className="flex gap-3">
					<Link href="/admin/projects/new">
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							New Project
						</Button>
					</Link>
				</div>
			</motion.div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{statsCards.map((stat, index) => (
					<motion.div
						key={stat.key}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
						className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6"
					>
						<div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-5`} />
						<div className="relative">
							<div className="flex items-center justify-between mb-4">
								<div className={`p-3 rounded-xl bg-linear-to-br ${stat.color}`}>
									<stat.icon className="w-5 h-5 text-white" />
								</div>
							</div>
							<p className="text-3xl font-bold text-white">{getStatValue(stat.key)}</p>
							<p className="text-sm text-white/60 mt-1">{stat.title}</p>
						</div>
					</motion.div>
				))}
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Projects */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="rounded-2xl bg-white/5 border border-white/10 p-6"
				>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-white">Recent Projects</h2>
						<Link
							href="/admin/projects"
							className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
						>
							View All <ArrowRight className="w-4 h-4" />
						</Link>
					</div>
					<div className="space-y-3">
						{projects.slice(0, 5).map((project) => (
							<Link
								key={project._id}
								href={`/admin/projects/${project._id}/edit`}
								className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
										<Folder className="w-5 h-5 text-violet-400" />
									</div>
									<div>
										<p className="text-white font-medium">{project.title}</p>
										<p className="text-sm text-white/50">{project.category}</p>
									</div>
								</div>
								{project.featured && <span className="text-yellow-400">⭐</span>}
							</Link>
						))}
						{projects.length === 0 && (
							<p className="text-white/50 text-center py-8">
								No projects yet. Create your first project!
							</p>
						)}
					</div>
				</motion.div>

				{/* Recent Certificates */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
					className="rounded-2xl bg-white/5 border border-white/10 p-6"
				>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-white">Recent Certificates</h2>
						<Link
							href="/admin/certificates"
							className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
						>
							View All <ArrowRight className="w-4 h-4" />
						</Link>
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
							<p className="text-white/50 text-center py-8">
								No certificates yet. Add your first certificate!
							</p>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
