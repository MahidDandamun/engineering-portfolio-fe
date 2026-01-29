import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProjects, useFeaturedProjects, useProject } from "@/hooks/useProjects";

// Mock the API
vi.mock("@/lib/projects", () => ({
	projectsApi: {
		getAll: vi.fn(),
		getFeatured: vi.fn(),
		getBySlug: vi.fn(),
		getById: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

import { projectsApi } from "@/lib/projects";

const mockProjects = [
	{
		_id: "1",
		slug: "project-1",
		title: "Project 1",
		summary: "Summary 1",
		description: "Description 1",
		category: "web",
		difficulty: "intermediate",
		techStack: ["React"],
		featured: false,
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01",
	},
	{
		_id: "2",
		slug: "project-2",
		title: "Project 2",
		summary: "Summary 2",
		description: "Description 2",
		category: "embedded",
		difficulty: "hard",
		techStack: ["C++"],
		featured: true,
		createdAt: "2024-01-02",
		updatedAt: "2024-01-02",
	},
];

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});
	const Wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
	Wrapper.displayName = "TestWrapper";
	return Wrapper;
};

describe("useProjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches projects successfully", async () => {
		vi.mocked(projectsApi.getAll).mockResolvedValue({
			success: true,
			data: mockProjects,
			pagination: { page: 1, limit: 10, total: 2, pages: 1 },
		});

		const { result } = renderHook(() => useProjects(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data?.data).toHaveLength(2);
		expect(projectsApi.getAll).toHaveBeenCalledWith(undefined);
	});

	it("passes filters to API", async () => {
		vi.mocked(projectsApi.getAll).mockResolvedValue({
			success: true,
			data: [mockProjects[0]],
			pagination: { page: 1, limit: 10, total: 1, pages: 1 },
		});

		const { result } = renderHook(() => useProjects({ category: "web", page: 1 }), { wrapper: createWrapper() });

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(projectsApi.getAll).toHaveBeenCalledWith({ category: "web", page: 1 });
	});
});

describe("useFeaturedProjects", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches featured projects", async () => {
		const featuredProjects = mockProjects.filter((p) => p.featured);
		vi.mocked(projectsApi.getFeatured).mockResolvedValue({
			success: true,
			data: featuredProjects,
		});

		const { result } = renderHook(() => useFeaturedProjects(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data?.data).toHaveLength(1);
		expect(result.current.data?.data?.[0]?.featured).toBe(true);
	});
});

describe("useProject", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches single project by slug", async () => {
		vi.mocked(projectsApi.getBySlug).mockResolvedValue({
			success: true,
			data: mockProjects[0],
		});

		const { result } = renderHook(() => useProject("project-1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data?.data?.slug).toBe("project-1");
		expect(projectsApi.getBySlug).toHaveBeenCalledWith("project-1");
	});

	it("does not fetch when slug is empty string", () => {
		const { result } = renderHook(() => useProject(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.fetchStatus).toBe("idle");
		expect(projectsApi.getBySlug).not.toHaveBeenCalled();
	});
});
