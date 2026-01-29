import { api, API_BASE } from "./api";
import { ApiResponse, User, LoginCredentials } from "@/types";

const AUTH_BASE = `${API_BASE}/api/auth`;

export const authApi = {
	login: (credentials: LoginCredentials) =>
		api<ApiResponse<{ user: User }>>(`${AUTH_BASE}/login`, {
			method: "POST",
			body: JSON.stringify(credentials),
		}),

	logout: () => api<ApiResponse<null>>(`${AUTH_BASE}/logout`, { method: "POST" }),

	getMe: () => api<ApiResponse<{ user: User }>>(`${AUTH_BASE}/me`),
};
