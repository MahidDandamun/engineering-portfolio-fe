import { describe, it, expect } from "vitest";
import {
	Project,
	Certificate,
	CATEGORIES,
	DIFFICULTIES,
	categoryLabels,
	difficultyLabels,
	categoryColors,
	difficultyColors,
} from "@/types";

describe("Project Types", () => {
	it("CATEGORIES contains all category values", () => {
		expect(CATEGORIES).toContain("web");
		expect(CATEGORIES).toContain("embedded");
		expect(CATEGORIES).toContain("software");
		expect(CATEGORIES).toContain("3d");
		expect(CATEGORIES).toHaveLength(4);
	});

	it("DIFFICULTIES contains all difficulty values", () => {
		expect(DIFFICULTIES).toContain("easy");
		expect(DIFFICULTIES).toContain("intermediate");
		expect(DIFFICULTIES).toContain("hard");
		expect(DIFFICULTIES).toContain("professional");
		expect(DIFFICULTIES).toHaveLength(4);
	});

	it("categoryLabels maps all categories to labels", () => {
		expect(categoryLabels.web).toBe("Web Development");
		expect(categoryLabels.embedded).toBe("Embedded Systems");
		expect(categoryLabels.software).toBe("Software Engineering");
		expect(categoryLabels["3d"]).toBe("3D Design");
	});

	it("difficultyLabels maps all difficulties to labels", () => {
		expect(difficultyLabels.easy).toBe("Beginner");
		expect(difficultyLabels.intermediate).toBe("Intermediate");
		expect(difficultyLabels.hard).toBe("Advanced");
		expect(difficultyLabels.professional).toBe("Professional");
	});

	it("categoryColors provides gradient classes for all categories", () => {
		CATEGORIES.forEach((category) => {
			expect(categoryColors[category]).toContain("from-");
			expect(categoryColors[category]).toContain("to-");
		});
	});

	it("difficultyColors provides styling for all difficulties", () => {
		DIFFICULTIES.forEach((difficulty) => {
			expect(difficultyColors[difficulty]).toContain("bg-");
			expect(difficultyColors[difficulty]).toContain("text-");
		});
	});
});

describe("Type Structure", () => {
	it("Project type has required fields", () => {
		const project: Project = {
			_id: "1",
			slug: "test",
			title: "Test",
			summary: "Summary",
			description: "Description",
			category: "web",
			difficulty: "intermediate",
			techStack: ["React"],
			featured: false,
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01",
		};

		expect(project._id).toBeDefined();
		expect(project.slug).toBeDefined();
		expect(project.title).toBeDefined();
		expect(project.category).toBeDefined();
		expect(project.difficulty).toBeDefined();
	});

	it("Certificate type has required fields", () => {
		const certificate: Certificate = {
			_id: "1",
			title: "Test Certificate",
			issuer: "Test Issuer",
			dateIssued: "2024-01-01",
			createdAt: "2024-01-01",
			updatedAt: "2024-01-01",
		};

		expect(certificate._id).toBeDefined();
		expect(certificate.title).toBeDefined();
		expect(certificate.issuer).toBeDefined();
		expect(certificate.dateIssued).toBeDefined();
	});
});
