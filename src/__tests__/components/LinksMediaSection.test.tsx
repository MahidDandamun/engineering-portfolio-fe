import { render, screen } from "@testing-library/react";
import { LinksMediaSection } from "@/components/projects/LinksMediaSection";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/types/project";
import { ThemeProvider } from "@/context/ThemeContext";

describe("LinksMediaSection", () => {
	function Wrapper({ errors = {} }: { errors?: Record<string, { message: string }> }) {
		const { register } = useForm<ProjectFormData>();
		return (
			<ThemeProvider>
				<LinksMediaSection register={register} errors={errors} />
			</ThemeProvider>
		);
	}

	it("renders all link fields", () => {
		render(<Wrapper />);
		expect(screen.getByLabelText(/github url/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/live url/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/thumbnail url/i)).toBeInTheDocument();
	});

	it("shows error messages", () => {
		const errors = {
			githubUrl: { message: "GitHub error" },
			liveUrl: { message: "Live error" },
			thumbnail: { message: "Thumbnail error" },
		};
		render(<Wrapper errors={errors} />);
		expect(screen.getByText("GitHub error")).toBeInTheDocument();
		expect(screen.getByText("Live error")).toBeInTheDocument();
		expect(screen.getByText("Thumbnail error")).toBeInTheDocument();
	});
});
