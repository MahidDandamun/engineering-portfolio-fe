// API Response Types
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	errors?: Array<{ field: string; message: string }>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
}

export interface User {
	id: string;
	username: string;
}

export interface LoginCredentials {
	username: string;
	password: string;
}
