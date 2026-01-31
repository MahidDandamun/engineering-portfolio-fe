"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export function useAdminAuthRedirect() {
	const { user, loading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (loading) return;
		if (!pathname?.startsWith("/admin") || pathname === "/admin/login") return;
		if (!user) {
			router.replace("/admin/login");
		}
	}, [user, loading, pathname, router]);
}
