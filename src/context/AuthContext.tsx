"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, LoginCredentials } from "@/types";
import { authApi } from "@/lib/auth";

type ApiUserResponse = { data?: { user?: User }; user?: User; success?: boolean; message?: string };

type AuthContextType = {
	user: User | null;
	loading: boolean;
	login: (credentials: LoginCredentials) => Promise<ApiUserResponse>;
	logout: () => Promise<void>;
	refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const refresh = async () => {
		setLoading(true);
		try {
			const res = await authApi.getMe();
			const r = res as unknown as ApiUserResponse;
			const userFromRes = r?.data?.user ?? r?.user ?? null;
			if (userFromRes) setUser(userFromRes);
			else setUser(null);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const res = await authApi.getMe();
				if (res.data?.user) setUser(res.data.user);
				else setUser(null);
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const login = async (credentials: LoginCredentials) => {
		setLoading(true);
		try {
			const res = await authApi.login(credentials);
			const r = res as unknown as ApiUserResponse;
			const userFromRes = r?.data?.user ?? r?.user ?? null;
			if (userFromRes) setUser(userFromRes);
			else setUser(null);
			return res;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await authApi.logout();
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	return <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
