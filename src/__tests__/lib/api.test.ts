import { describe, it, expect, vi, beforeEach } from "vitest";
import { api, ApiError, createQueryString } from "@/lib/api";

describe("api utility", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("makes a successful API request", async () => {
		const mockData = { success: true, data: { id: 1 } };

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockData),
		});

		const result = await api("/test");

		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/test"),
			expect.objectContaining({
				credentials: "include",
				headers: expect.objectContaining({
					"Content-Type": "application/json",
				}),
			}),
		);
		expect(result).toEqual(mockData);
	});

	it("throws ApiError on failed request", async () => {
		const errorData = { message: "Not found", errors: [] };

		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 404,
			json: () => Promise.resolve(errorData),
		});

		await expect(api("/test")).rejects.toThrow(ApiError);
		await expect(api("/test")).rejects.toMatchObject({
			status: 404,
			message: "Not found",
		});
	});

	it("includes custom headers", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({}),
		});

		await api("/test", {
			headers: { "X-Custom": "value" },
		});

		expect(fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					"Content-Type": "application/json",
					"X-Custom": "value",
				}),
			}),
		);
	});
});

describe("createQueryString", () => {
	it("creates empty string for empty params", () => {
		expect(createQueryString({})).toBe("");
	});

	it("creates query string from params", () => {
		const result = createQueryString({ foo: "bar", baz: 123 });
		expect(result).toBe("?foo=bar&baz=123");
	});

	it("ignores undefined values", () => {
		const result = createQueryString({ foo: "bar", baz: undefined });
		expect(result).toBe("?foo=bar");
	});

	it("handles boolean values", () => {
		const result = createQueryString({ active: true, disabled: false });
		expect(result).toBe("?active=true&disabled=false");
	});
});

describe("ApiError", () => {
	it("creates error with correct properties", () => {
		const error = new ApiError("Test error", 400, { field: "error" });

		expect(error.message).toBe("Test error");
		expect(error.status).toBe(400);
		expect(error.data).toEqual({ field: "error" });
		expect(error.name).toBe("ApiError");
	});

	it("is an instance of Error", () => {
		const error = new ApiError("Test", 500);
		expect(error).toBeInstanceOf(Error);
	});
});
