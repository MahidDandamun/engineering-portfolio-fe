import { renderHook, act } from "@testing-library/react";
import { useTechStack } from "@/hooks/useTechStack";

describe("useTechStack", () => {
	it("adds and removes tech", () => {
		const { result } = renderHook(() => useTechStack());
		act(() => {
			result.current.setTechInput("React");
			result.current.addTech();
		});
		expect(result.current.techStack).toContain("React");
		act(() => {
			result.current.removeTech("React");
		});
		expect(result.current.techStack).not.toContain("React");
	});

	it("prevents duplicate tech", () => {
		const { result } = renderHook(() => useTechStack());
		act(() => {
			result.current.setTechInput("Node.js");
			result.current.addTech();
			result.current.setTechInput("Node.js");
			result.current.addTech();
		});
		expect(result.current.techStack).toEqual(["Node.js"]);
	});
});
