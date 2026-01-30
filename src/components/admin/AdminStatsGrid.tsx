"use client";

import { motion } from "framer-motion";

interface StatCard {
	title: string;
	icon: React.ElementType;
	color: string;
	key: string;
}

interface AdminStatsGridProps {
	statsCards: StatCard[];
	getStatValue: (key: string) => number | string;
}

export function AdminStatsGrid({ statsCards, getStatValue }: AdminStatsGridProps) {
	return (
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
	);
}
