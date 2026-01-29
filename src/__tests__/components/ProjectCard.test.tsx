import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Project } from "@/types";

const mockProject: Project = {
	_id: "1",
	slug: "test-project",
	title: "Test Project",
	summary: "A test project for testing purposes",
	description: "Full description here",
	category: "web",
	difficulty: "intermediate",
	techStack: ["React", "TypeScript", "Tailwind"],
	githubUrl: "https://github.com/test/project",
	liveUrl: "https://test-project.com",
	thumbnail: "/test-image.jpg",
	images: [],
	featured: false,
	createdAt: "2024-01-15T00:00:00.000Z",
	updatedAt: "2024-01-15T00:00:00.000Z",
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
	},
});

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>{ui}</ThemeProvider>
		</QueryClientProvider>,
	);
};

describe("ProjectCard", () => {
	it("renders project title", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.getByText("Test Project")).toBeInTheDocument();
	});

	it("renders project summary", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.getByText("A test project for testing purposes")).toBeInTheDocument();
	});

	it("renders category badge", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.getByText("Web Development")).toBeInTheDocument();
	});

	it("renders difficulty badge", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.getByText("Intermediate")).toBeInTheDocument();
	});

	it("renders tech stack", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
		expect(screen.getByText("Tailwind")).toBeInTheDocument();
	});

	it("renders featured badge when featured", () => {
		const featuredProject = { ...mockProject, featured: true };
		renderWithProviders(<ProjectCard project={featuredProject} />);
		expect(screen.getByText("⭐ Featured")).toBeInTheDocument();
	});

	it("does not render featured badge when not featured", () => {
		renderWithProviders(<ProjectCard project={mockProject} />);
		expect(screen.queryByText("⭐ Featured")).not.toBeInTheDocument();
	});

	it("shows +N more for tech stacks with more than 4 items", () => {
		const projectWithManyTechs = {
			...mockProject,
			techStack: ["React", "TypeScript", "Tailwind", "Node", "Express", "MongoDB"],
		};
		renderWithProviders(<ProjectCard project={projectWithManyTechs} />);
		expect(screen.getByText("+2 more")).toBeInTheDocument();
	});
});
