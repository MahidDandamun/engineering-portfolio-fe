import { render, screen } from "@testing-library/react";
import { BasicInfoSection } from "@/components/projects/BasicInfoSection";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { ThemeProvider } from "@/context/ThemeContext";

describe("BasicInfoSection", () => {
	function Wrapper({
		errors = {},
		values = {},
	}: {
		errors?: Record<string, { message: string }>;
		values?: Partial<ProjectFormData>;
	}) {
		const { register } = useForm<ProjectFormData>({ defaultValues: values });
		return (
			<ThemeProvider>
				<BasicInfoSection register={register} errors={errors} />
			</ThemeProvider>
		);
	}

	it("renders all fields", () => {
		render(<Wrapper />);
		expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/slug/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/summary/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
	});

	it("shows error messages", () => {
		const errors = {
			title: { message: "Title error" },
			slug: { message: "Slug error" },
			summary: { message: "Summary error" },
			description: { message: "Description error" },
		};
		render(<Wrapper errors={errors} />);
		expect(screen.getByText("Title error")).toBeInTheDocument();
		expect(screen.getByText("Slug error")).toBeInTheDocument();
		expect(screen.getByText("Summary error")).toBeInTheDocument();
		expect(screen.getByText("Description error")).toBeInTheDocument();
	});
});
