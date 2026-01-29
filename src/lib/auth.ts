import { api } from "./api";
import { ApiResponse, User, LoginCredentials } from "@/types";

export const authApi = {
	login: (credentials: LoginCredentials) =>
		api<ApiResponse<{ user: User }>>("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(credentials),
		}),

	logout: () => api<ApiResponse<null>>("/api/auth/logout", { method: "POST" }),

	getMe: () => api<ApiResponse<{ user: User }>>("/api/auth/me"),
};
