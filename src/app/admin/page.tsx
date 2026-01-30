"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button, ErrorBoundary } from "@/components/ui";
import { useProjects, useCertificates } from "@/hooks";
import { useAdminAuthRedirect } from "@/hooks/useAdminAuthRedirect";
import { AdminStatsGrid } from "@/components/admin/AdminStatsGrid";
import { RecentProjects } from "@/components/admin/RecentProjects";
import { RecentCertificates } from "@/components/admin/RecentCertificates";

import { Folder, Award, Eye, TrendingUp } from "lucide-react";
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
	useAdminAuthRedirect();
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
		<ErrorBoundary>
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
				<AdminStatsGrid statsCards={statsCards} getStatValue={getStatValue} />

				{/* Quick Actions */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<RecentProjects projects={projects} />
					<RecentCertificates certificates={certificates} />
				</div>
			</div>
		</ErrorBoundary>
	);
}
