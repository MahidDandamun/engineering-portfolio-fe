import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
	it("renders with children", () => {
		render(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("applies default variant styles", () => {
		render(<Badge>Default</Badge>);
		const badge = screen.getByText("Default");
		expect(badge).toHaveClass("bg-white/10");
	});

	it("applies outline variant styles", () => {
		render(<Badge variant="outline">Outline</Badge>);
		const badge = screen.getByText("Outline");
		expect(badge).toHaveClass("border-violet-500/50");
	});

	it("applies gradient variant styles", () => {
		render(<Badge variant="gradient">Gradient</Badge>);
		const badge = screen.getByText("Gradient");
		expect(badge).toHaveClass("from-violet-500/20");
	});

	it("applies custom className", () => {
		render(<Badge className="custom-class">Custom</Badge>);
		expect(screen.getByText("Custom")).toHaveClass("custom-class");
	});
});
