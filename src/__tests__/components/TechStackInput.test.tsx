import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { TechStackInput } from "@/components/projects/TechStackInput";
import { ThemeProvider } from "@/context";

describe("TechStackInput", () => {
	const techStack = ["React", "Node.js"];
	const setTechInput = vi.fn();
	const addTech = vi.fn();
	const removeTech = vi.fn();

	it("renders tech input and stack", () => {
		render(
			<ThemeProvider>
				<TechStackInput
					techStack={techStack}
					techInput=""
					setTechInput={setTechInput}
					addTech={addTech}
					removeTech={removeTech}
				/>
			</ThemeProvider>,
		);
		expect(screen.getByPlaceholderText(/add technology/i)).toBeInTheDocument();
		expect(screen.getByText("React")).toBeInTheDocument();
		expect(screen.getByText("Node.js")).toBeInTheDocument();
	});

	it("calls setTechInput on input change", () => {
		render(
			<ThemeProvider>
				<TechStackInput
					techStack={[]}
					techInput=""
					setTechInput={setTechInput}
					addTech={addTech}
					removeTech={removeTech}
				/>
			</ThemeProvider>,
		);
		fireEvent.change(screen.getByPlaceholderText(/add technology/i), { target: { value: "Vue" } });
		expect(setTechInput).toHaveBeenCalledWith("Vue");
	});

	it("calls addTech on button click", () => {
		render(
			<ThemeProvider>
				<TechStackInput
					techStack={[]}
					techInput="Vue"
					setTechInput={setTechInput}
					addTech={addTech}
					removeTech={removeTech}
				/>
			</ThemeProvider>,
		);
		fireEvent.click(screen.getByRole("button"));
		expect(addTech).toHaveBeenCalled();
	});

	it("calls removeTech on remove button click", () => {
		render(
			<ThemeProvider>
				<TechStackInput
					techStack={["React"]}
					techInput=""
					setTechInput={setTechInput}
					addTech={addTech}
					removeTech={removeTech}
				/>
			</ThemeProvider>,
		);
		fireEvent.click(screen.getByLabelText(/remove react/i));
		expect(removeTech).toHaveBeenCalledWith("React");
	});
});
