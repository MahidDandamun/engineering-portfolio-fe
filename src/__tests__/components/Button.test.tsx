import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
	it("renders with children", () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText("Click me")).toBeInTheDocument();
	});

	it("applies primary variant by default", () => {
		render(<Button>Primary</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("from-violet-600");
	});

	it("applies secondary variant when specified", () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("bg-white/10");
	});

	it("applies ghost variant when specified", () => {
		render(<Button variant="ghost">Ghost</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("text-white/70");
	});

	it("applies danger variant when specified", () => {
		render(<Button variant="danger">Danger</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveClass("from-red-600");
	});

	it("applies correct size classes", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		expect(screen.getByRole("button")).toHaveClass("px-3");

		rerender(<Button size="md">Medium</Button>);
		expect(screen.getByRole("button")).toHaveClass("px-5");

		rerender(<Button size="lg">Large</Button>);
		expect(screen.getByRole("button")).toHaveClass("px-8");
	});

	it("shows loading spinner when isLoading is true", () => {
		render(<Button isLoading>Loading</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("is disabled when disabled prop is true", () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole("button")).toBeDisabled();
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick when disabled", () => {
		const handleClick = vi.fn();
		render(
			<Button onClick={handleClick} disabled>
				Click
			</Button>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).not.toHaveBeenCalled();
	});
});
