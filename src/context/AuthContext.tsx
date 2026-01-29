"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi } from "@/lib/auth";
import type { User } from "@/types";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		let isMounted = true;

		if (!pathname?.startsWith("/admin")) {
			if (isMounted) {
				setIsLoading(false);
			}
			return () => {
				isMounted = false;
			};
		}

		authApi
			.getMe()
			.then((res) => {
				if (isMounted) {
					setUser(res.data?.user || null);
				}
			})
			.catch(() => {
				if (isMounted) {
					setUser(null);
				}
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [pathname]);

	const login = useCallback(async (username: string, password: string) => {
		const res = await authApi.login({ username, password });
		setUser(res.data?.user || null);
	}, []);

	const logout = useCallback(async () => {
		await authApi.logout();
		setUser(null);
		router.push("/");
	}, [router]);

	return (
		<AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};
