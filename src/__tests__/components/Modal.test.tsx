import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/ui/Modal";

describe("Modal", () => {
	it("renders when isOpen is true", () => {
		render(
			<Modal isOpen={true} onClose={() => {}} title="Test Modal">
				Modal content
			</Modal>,
		);
		expect(screen.getByText("Test Modal")).toBeInTheDocument();
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	it("does not render when isOpen is false", () => {
		render(
			<Modal isOpen={false} onClose={() => {}} title="Test Modal">
				Modal content
			</Modal>,
		);
		expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
		expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const handleClose = vi.fn();
		render(
			<Modal isOpen={true} onClose={handleClose} title="Test Modal">
				Modal content
			</Modal>,
		);
		const closeButton = screen.getByRole("button");
		fireEvent.click(closeButton);
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	it("renders without title", () => {
		render(
			<Modal isOpen={true} onClose={() => {}}>
				Content only
			</Modal>,
		);
		expect(screen.getByText("Content only")).toBeInTheDocument();
	});
});
