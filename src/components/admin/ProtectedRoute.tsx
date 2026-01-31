"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, loading, refresh } = useAuth();
	const router = useRouter();
	const [triedRefresh, setTriedRefresh] = useState(false);

	useEffect(() => {
		console.log("ProtectedRoute: loading, user", loading, user, "triedRefresh", triedRefresh);
		if (!loading && !user && !triedRefresh) {
			// Attempt one refresh before redirecting to handle missing state after page reload
			(async () => {
				setTriedRefresh(true);
				try {
					await refresh();
				} catch {
					/* ignore */
				}
			})();
			return;
		}

		if (!loading && !user && triedRefresh) {
			router.push("/admin/login");
		}
	}, [loading, user, router, refresh, triedRefresh]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	if (!user) return null;

	return <>{children}</>;
}
