import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";
import { ThemeProvider } from "@/context/ThemeContext";

// Helper to wrap component with ThemeProvider
const renderWithTheme = (ui: React.ReactElement, theme: "ghibli" | "jjk" = "jjk") => {
	return render(<ThemeProvider defaultTheme={theme}>{ui}</ThemeProvider>);
};

describe("Badge", () => {
	it("renders with children", () => {
		renderWithTheme(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("applies default variant styles in JJK mode", () => {
		renderWithTheme(<Badge>Default</Badge>, "jjk");
		const badge = screen.getByText("Default");
		expect(badge).toHaveClass("bg-white/10");
	});

	it("applies default variant styles in Ghibli mode", () => {
		renderWithTheme(<Badge>Default</Badge>, "ghibli");
		const badge = screen.getByText("Default");
		expect(badge).toHaveClass("text-[#6e3f28]");
	});

	it("applies outline variant styles in JJK mode", () => {
		renderWithTheme(<Badge variant="outline">Outline</Badge>, "jjk");
		const badge = screen.getByText("Outline");
		expect(badge).toHaveClass("border-[#8b5cf6]/50");
	});

	it("applies gradient variant styles in JJK mode", () => {
		renderWithTheme(<Badge variant="gradient">Gradient</Badge>, "jjk");
		const badge = screen.getByText("Gradient");
		expect(badge).toHaveClass("from-[#8b5cf6]/20");
	});

	it("applies custom className", () => {
		renderWithTheme(<Badge className="custom-class">Custom</Badge>);
		expect(screen.getByText("Custom")).toHaveClass("custom-class");
	});
});
