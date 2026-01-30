import { useRef, useState } from "react";

export function useTechStack(initial: string[] = []) {
	const [techStack, setTechStack] = useState<string[]>(initial);
	const [techInputState, setTechInputState] = useState("");

	// keep a ref of the latest input so callers that set the input
	// and immediately call addTech (like tests) will observe the new value
	const techInputRef = useRef<string>(techInputState);

	const setTechInput = (value: string | ((prev: string) => string)) => {
		if (typeof value === "function") {
			setTechInputState((prev) => {
				const next = (value as (p: string) => string)(prev);
				techInputRef.current = next;
				return next;
			});
		} else {
			techInputRef.current = value;
			setTechInputState(value);
		}
	};

	const addTech = () => {
		const value = techInputRef.current.trim();
		if (!value) return;

		setTechStack((prev) => {
			if (prev.includes(value)) return prev;
			return [...prev, value];
		});
		setTechInput("");
	};

	const removeTech = (tech: string) => {
		setTechStack((prev) => prev.filter((t) => t !== tech));
	};

	return { techStack, setTechStack, techInput: techInputState, setTechInput, addTech, removeTech };
}
