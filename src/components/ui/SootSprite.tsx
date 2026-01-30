import React from "react";

const SootSprite = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
	<svg viewBox="0 0 100 100" className={className} style={style}>
		<defs>
			<filter id="fuzzy">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.8"
					numOctaves="3"
					stitchTiles="stitch"
					result="noise"
				/>
				<feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
			</filter>
		</defs>
		<circle cx="50" cy="50" r="35" fill="black" filter="url(#fuzzy)" />
		<g className="eyes">
			<circle cx="35" cy="45" r="8" fill="white" />
			<circle cx="35" cy="45" r="3" fill="black" />
			<circle cx="65" cy="45" r="8" fill="white" />
			<circle cx="65" cy="45" r="3" fill="black" />
		</g>
	</svg>
);

export default SootSprite;
