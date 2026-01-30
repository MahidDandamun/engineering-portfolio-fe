import { render, screen } from "@testing-library/react";
import { ClassificationSection } from "@/components/projects/ClassificationSection";
import { useForm } from "react-hook-form";
import { ProjectFormData, CATEGORIES, DIFFICULTIES, categoryLabels, difficultyLabels } from "@/types/project";

describe("ClassificationSection", () => {
	function Wrapper({ errors = {} }: { errors?: Record<string, { message: string }> }) {
		const { register } = useForm<ProjectFormData>();
		return (
			<ClassificationSection
				register={register}
				CATEGORIES={CATEGORIES}
				categoryLabels={categoryLabels}
				DIFFICULTIES={DIFFICULTIES}
				difficultyLabels={difficultyLabels}
				errors={errors}
			/>
		);
	}

	it("renders category and difficulty selects", () => {
		render(<Wrapper />);
		expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
	});

	it("shows error messages", () => {
		const errors = {
			category: { message: "Category error" },
			difficulty: { message: "Difficulty error" },
		};
		render(<Wrapper errors={errors} />);
		expect(screen.getByText("Category error")).toBeInTheDocument();
		expect(screen.getByText("Difficulty error")).toBeInTheDocument();
	});
});
