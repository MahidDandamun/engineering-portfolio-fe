import { Input, Button } from "@/components/ui";
import { Plus, X } from "lucide-react";
import React from "react";

interface TechStackProps {
	techStack: string[];
	techInput: string;
	setTechInput: (val: string) => void;
	addTech: () => void;
	removeTech: (tech: string) => void;
}

export function TechStackInput({ techStack, techInput, setTechInput, addTech, removeTech }: TechStackProps) {
	return (
		<div className="space-y-3">
			<label className="block text-sm font-medium text-white/80">Tech Stack</label>
			<div className="flex gap-2">
				<Input
					placeholder="Add technology..."
					value={techInput}
					onChange={(e) => setTechInput(e.target.value)}
					onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
					className="flex-1"
				/>
				<Button type="button" onClick={addTech} variant="secondary">
					<Plus className="w-4 h-4" />
				</Button>
			</div>
			{techStack.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{techStack.map((tech) => (
						<span
							key={tech}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20"
						>
							{tech}
							<button
								aria-label={`Remove ${tech}`}
								type="button"
								onClick={() => removeTech(tech)}
								className="hover:text-violet-200"
							>
								<X className="w-3.5 h-3.5" />
							</button>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
