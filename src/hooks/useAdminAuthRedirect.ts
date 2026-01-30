import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAdminAuthRedirect() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (status === "loading") return;
		if (!pathname?.startsWith("/admin") || pathname === "/admin/login") return;
		if (!session) {
			router.replace("/admin/login");
		}
	}, [session, status, pathname, router]);
}
