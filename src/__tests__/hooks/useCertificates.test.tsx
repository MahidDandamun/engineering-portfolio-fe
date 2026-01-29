import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCertificates, useCertificate } from "@/hooks/useCertificates";

// Mock the API
vi.mock("@/lib/certificates", () => ({
	certificatesApi: {
		getAll: vi.fn(),
		getById: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

import { certificatesApi } from "@/lib/certificates";

const mockCertificates = [
	{
		_id: "1",
		title: "AWS Solutions Architect",
		issuer: "Amazon Web Services",
		dateIssued: "2024-01-01",
		credentialUrl: "https://aws.amazon.com/verify/1",
		createdAt: "2024-01-01",
		updatedAt: "2024-01-01",
	},
	{
		_id: "2",
		title: "React Developer",
		issuer: "Meta",
		dateIssued: "2023-06-15",
		createdAt: "2023-06-15",
		updatedAt: "2023-06-15",
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

describe("useCertificates", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches certificates successfully", async () => {
		vi.mocked(certificatesApi.getAll).mockResolvedValue({
			success: true,
			data: mockCertificates,
		});

		const { result } = renderHook(() => useCertificates(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data?.data).toHaveLength(2);
		expect(certificatesApi.getAll).toHaveBeenCalled();
	});

	it("handles loading state", () => {
		vi.mocked(certificatesApi.getAll).mockImplementation(
			() => new Promise(() => {}), // Never resolves
		);

		const { result } = renderHook(() => useCertificates(), {
			wrapper: createWrapper(),
		});

		expect(result.current.isLoading).toBe(true);
	});
});

describe("useCertificate", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches single certificate by id", async () => {
		vi.mocked(certificatesApi.getById).mockResolvedValue({
			success: true,
			data: mockCertificates[0],
		});

		const { result } = renderHook(() => useCertificate("1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		expect(result.current.data?.data?.title).toBe("AWS Solutions Architect");
		expect(certificatesApi.getById).toHaveBeenCalledWith("1");
	});

	it("does not fetch when id is empty string", () => {
		const { result } = renderHook(() => useCertificate(""), {
			wrapper: createWrapper(),
		});

		expect(result.current.fetchStatus).toBe("idle");
		expect(certificatesApi.getById).not.toHaveBeenCalled();
	});
});
