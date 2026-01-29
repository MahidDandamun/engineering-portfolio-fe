import { describe, it, expect } from "vitest";
import { cn, formatDate, formatDateShort, slugify } from "@/lib/utils";

describe("cn utility", () => {
	it("merges class names", () => {
		expect(cn("foo", "bar")).toBe("foo bar");
	});

	it("handles conditional classes", () => {
		expect(cn("base", true && "conditional")).toBe("base conditional");
		expect(cn("base", false && "conditional")).toBe("base");
	});

	it("merges Tailwind classes correctly", () => {
		expect(cn("px-2", "px-4")).toBe("px-4");
	});

	it("handles undefined and null", () => {
		expect(cn("base", undefined, null, "end")).toBe("base end");
	});
});

describe("formatDate", () => {
	it("formats date string to full format", () => {
		const result = formatDate("2024-01-15T00:00:00.000Z");
		expect(result).toContain("January");
		expect(result).toContain("15");
		expect(result).toContain("2024");
	});

	it("handles different date strings", () => {
		const result = formatDate("2023-06-20");
		expect(result).toContain("June");
		expect(result).toContain("20");
		expect(result).toContain("2023");
	});
});

describe("formatDateShort", () => {
	it("formats date string to short format", () => {
		const result = formatDateShort("2024-01-15T00:00:00.000Z");
		expect(result).toContain("Jan");
		expect(result).toContain("2024");
	});
});

describe("slugify", () => {
	it("converts text to lowercase slug", () => {
		expect(slugify("Hello World")).toBe("hello-world");
	});

	it("removes special characters", () => {
		expect(slugify("Hello! World?")).toBe("hello-world");
	});

	it("replaces multiple spaces with single hyphen", () => {
		expect(slugify("Hello    World")).toBe("hello-world");
	});

	it("handles underscores", () => {
		expect(slugify("hello_world")).toBe("hello-world");
	});

	it("trims leading and trailing hyphens", () => {
		expect(slugify(" Hello World ")).toBe("hello-world");
	});

	it("handles complex strings", () => {
		expect(slugify("My Awesome Project! (v2.0)")).toBe("my-awesome-project-v20");
	});
});
