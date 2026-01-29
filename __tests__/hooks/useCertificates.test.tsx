import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCertificates } from "../../src/hooks/useCertificates";

vi.mock("../../src/lib/certificates", () => ({
	certificatesApi: {
		getAll: vi.fn(),
		getById: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

import { certificatesApi } from "../../src/lib/certificates";

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { retry: false },
		},
	});
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

describe("useCertificates", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches certificates successfully", async () => {
		(certificatesApi.getAll as any).mockResolvedValue({
			success: true,
			data: [{ _id: "1", title: "AWS Solutions Architect" }],
		});

		const { result } = renderHook(() => useCertificates(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data?.data).toHaveLength(1);
		expect(certificatesApi.getAll).toHaveBeenCalled();
	});
});
