import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
import { ThemeProvider } from "@/context";

const renderWithTheme = (ui: React.ReactElement) => {
	return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("Input", () => {
	it("renders with label", () => {
		renderWithTheme(<Input label="Email" />);
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
	});

	it("renders without label", () => {
		renderWithTheme(<Input placeholder="Enter text" />);
		expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
	});

	it("displays error message", () => {
		renderWithTheme(<Input label="Email" error="Invalid email" />);
		expect(screen.getByText("Invalid email")).toBeInTheDocument();
	});

	it("displays helper text when no error", () => {
		renderWithTheme(<Input label="Email" helperText="We'll never share your email" />);
		expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
	});

	it("does not display helper text when error exists", () => {
		renderWithTheme(<Input label="Email" error="Invalid email" helperText="We'll never share your email" />);
		expect(screen.queryByText("We'll never share your email")).not.toBeInTheDocument();
		expect(screen.getByText("Invalid email")).toBeInTheDocument();
	});

	it("applies error styles when error prop is provided", () => {
		renderWithTheme(<Input label="Email" error="Required" />);
		const input = screen.getByLabelText("Email");
		expect(input).toHaveClass("border-red-500/50");
	});

	it("handles value changes", () => {
		const handleChange = vi.fn();
		renderWithTheme(<Input label="Name" onChange={handleChange} />);
		const input = screen.getByLabelText("Name");
		fireEvent.change(input, { target: { value: "John" } });
		expect(handleChange).toHaveBeenCalled();
	});

	it("accepts custom id", () => {
		renderWithTheme(<Input id="custom-id" label="Custom" />);
		expect(screen.getByLabelText("Custom")).toHaveAttribute("id", "custom-id");
	});

	it("generates id from label when not provided", () => {
		renderWithTheme(<Input label="First Name" />);
		expect(screen.getByLabelText("First Name")).toHaveAttribute("id", "first-name");
	});
});
