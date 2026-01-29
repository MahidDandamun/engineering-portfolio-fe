"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context";

// Totoro-inspired forest spirit
export function Totoro({ className = "", size = 60 }: { className?: string; size?: number }) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			className={className}
			animate={{ y: [0, -10, 0] }}
			transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
		>
			{/* Body */}
			<ellipse cx="50" cy="60" rx="35" ry="35" fill="#6b7280" />
			{/* Belly */}
			<ellipse cx="50" cy="65" rx="25" ry="25" fill="#e5e7eb" />
			{/* Belly marks */}
			<path d="M35 55 Q50 50 65 55" stroke="#9ca3af" strokeWidth="2" fill="none" />
			<path d="M38 62 Q50 58 62 62" stroke="#9ca3af" strokeWidth="2" fill="none" />
			<path d="M40 69 Q50 66 60 69" stroke="#9ca3af" strokeWidth="2" fill="none" />
			{/* Ears */}
			<ellipse cx="30" cy="25" rx="8" ry="15" fill="#6b7280" />
			<ellipse cx="70" cy="25" rx="8" ry="15" fill="#6b7280" />
			{/* Eyes */}
			<circle cx="40" cy="45" r="8" fill="white" />
			<circle cx="60" cy="45" r="8" fill="white" />
			<motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
				<circle cx="42" cy="45" r="4" fill="#1f2937" />
			</motion.g>
			<motion.g animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
				<circle cx="62" cy="45" r="4" fill="#1f2937" />
			</motion.g>
			{/* Nose */}
			<ellipse cx="50" cy="52" rx="4" ry="3" fill="#374151" />
			{/* Whiskers */}
			<line x1="25" y1="50" x2="10" y2="48" stroke="#374151" strokeWidth="1" />
			<line x1="25" y1="55" x2="10" y2="58" stroke="#374151" strokeWidth="1" />
			<line x1="75" y1="50" x2="90" y2="48" stroke="#374151" strokeWidth="1" />
			<line x1="75" y1="55" x2="90" y2="58" stroke="#374151" strokeWidth="1" />
		</motion.svg>
	);
}

// Soot Sprite (Susuwatari)
export function SootSprite({
	className = "",
	size = 30,
	delay = 0,
}: {
	className?: string;
	size?: number;
	delay?: number;
}) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 50 50"
			className={className}
			animate={{
				y: [0, -5, 0],
				scale: [1, 1.1, 1],
				rotate: [0, 5, -5, 0],
			}}
			transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
		>
			{/* Fuzzy body */}
			<circle cx="25" cy="25" r="18" fill="#1f2937" />
			{/* Fuzzy edges */}
			{[...Array(12)].map((_, i) => (
				<motion.g
					key={i}
					animate={{ scale: [1, 1.2, 1] }}
					transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
					style={{
						transformOrigin: `${25 + Math.cos((i * 30 * Math.PI) / 180) * 16}px ${
							25 + Math.sin((i * 30 * Math.PI) / 180) * 16
						}px`,
					}}
				>
					<circle
						cx={25 + Math.cos((i * 30 * Math.PI) / 180) * 16}
						cy={25 + Math.sin((i * 30 * Math.PI) / 180) * 16}
						r="4"
						fill="#1f2937"
					/>
				</motion.g>
			))}
			{/* Eyes */}
			<motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
				<circle cx="20" cy="23" r="4" fill="white" />
			</motion.g>
			<motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>
				<circle cx="30" cy="23" r="4" fill="white" />
			</motion.g>
			<circle cx="20" cy="23" r="2" fill="#1f2937" />
			<circle cx="30" cy="23" r="2" fill="#1f2937" />
		</motion.svg>
	);
}

// Kodama (Forest Spirit from Princess Mononoke)
export function Kodama({ className = "", size = 40 }: { className?: string; size?: number }) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 60 80"
			className={className}
			animate={{
				rotate: [-5, 5, -5],
			}}
			transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
		>
			{/* Head */}
			<ellipse cx="30" cy="25" rx="20" ry="22" fill="#f0f0f0" />
			{/* Body */}
			<ellipse cx="30" cy="55" rx="12" ry="18" fill="#f0f0f0" />
			{/* Face holes - eyes */}
			<ellipse cx="22" cy="22" rx="4" ry="6" fill="#1f2937" />
			<ellipse cx="38" cy="22" rx="4" ry="6" fill="#1f2937" />
			{/* Mouth */}
			<ellipse cx="30" cy="32" rx="3" ry="4" fill="#1f2937" />
			{/* Rattle sound effect */}
			<motion.g animate={{ opacity: [0, 0.5, 0], y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
				<circle cx="30" cy="10" r="2" fill="#9ca3af" opacity={0.5} />
			</motion.g>
		</motion.svg>
	);
}

// Catbus whisker trails
export function CatbusTrail({ className = "" }: { className?: string }) {
	return (
		<motion.div className={`absolute pointer-events-none ${className}`}>
			{[...Array(5)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-20 h-1 rounded-full bg-linear-to-r from-[#f39c12] to-transparent"
					style={{ top: i * 8, left: i * 10 }}
					animate={{
						x: [0, 100, 200],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						delay: i * 0.2,
					}}
				/>
			))}
		</motion.div>
	);
}

// JJK Cursed Energy effect
export function CursedEnergy({ className = "", color = "#8b5cf6" }: { className?: string; color?: string }) {
	return (
		<motion.div className={`absolute pointer-events-none ${className}`}>
			{[...Array(8)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute w-2 h-2 rounded-full"
					style={{
						background: color,
						boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
					}}
					animate={{
						x: [0, Math.cos((i * 45 * Math.PI) / 180) * 50],
						y: [0, Math.sin((i * 45 * Math.PI) / 180) * 50],
						opacity: [1, 0],
						scale: [1, 0],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						delay: i * 0.15,
					}}
				/>
			))}
		</motion.div>
	);
}

// Gojo's Six Eyes effect
export function SixEyes({ className = "", size = 80 }: { className?: string; size?: number }) {
	return (
		<motion.svg width={size} height={size / 2} viewBox="0 0 100 50" className={className}>
			{/* Left eye */}
			<motion.ellipse
				cx="25"
				cy="25"
				rx="18"
				ry="12"
				fill="none"
				stroke="#3b82f6"
				strokeWidth="2"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 2, repeat: Infinity }}
			/>
			<motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
				<circle cx="25" cy="25" r="8" fill="url(#sixEyesGradient)" />
			</motion.g>

			{/* Right eye */}
			<motion.ellipse
				cx="75"
				cy="25"
				rx="18"
				ry="12"
				fill="none"
				stroke="#3b82f6"
				strokeWidth="2"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
			/>
			<motion.g animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
				<circle cx="75" cy="25" r="8" fill="url(#sixEyesGradient)" />
			</motion.g>

			{/* Gradient definition */}
			<defs>
				<radialGradient id="sixEyesGradient">
					<stop offset="0%" stopColor="#60a5fa" />
					<stop offset="50%" stopColor="#3b82f6" />
					<stop offset="100%" stopColor="#1d4ed8" />
				</radialGradient>
			</defs>
		</motion.svg>
	);
}

// Sukuna's marks
export function SukunaMarks({ className = "" }: { className?: string }) {
	return (
		<motion.svg width="60" height="30" viewBox="0 0 60 30" className={className}>
			{/* Left mark */}
			<motion.rect
				x="5"
				y="5"
				width="4"
				height="20"
				fill="#dc2626"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1, repeat: Infinity }}
			/>
			<motion.rect
				x="12"
				y="5"
				width="4"
				height="20"
				fill="#dc2626"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
			/>

			{/* Right mark */}
			<motion.rect
				x="44"
				y="5"
				width="4"
				height="20"
				fill="#dc2626"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
			/>
			<motion.rect
				x="51"
				y="5"
				width="4"
				height="20"
				fill="#dc2626"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
			/>
		</motion.svg>
	);
}

// Domain Expansion circle
export function DomainExpansion({ className = "", size = 200 }: { className?: string; size?: number }) {
	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 200 200"
			className={className}
			animate={{ rotate: 360 }}
			transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
		>
			{/* Outer ring */}
			<motion.g
				animate={{ strokeDashoffset: [0, 100] }}
				transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
			>
				<circle
					cx="100"
					cy="100"
					r="95"
					fill="none"
					stroke="url(#domainGradient)"
					strokeWidth="2"
					strokeDasharray="10 5"
				/>
			</motion.g>

			{/* Inner rings */}
			<circle cx="100" cy="100" r="75" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity={0.5} />
			<circle cx="100" cy="100" r="55" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity={0.3} />

			{/* Kanji-like symbols (simplified) */}
			{[0, 60, 120, 180, 240, 300].map((angle, i) => (
				<motion.text
					key={i}
					x={100 + Math.cos((angle * Math.PI) / 180) * 85}
					y={100 + Math.sin((angle * Math.PI) / 180) * 85}
					fill="#8b5cf6"
					fontSize="12"
					textAnchor="middle"
					dominantBaseline="middle"
					animate={{ opacity: [0.3, 1, 0.3] }}
					transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
				>
					◆
				</motion.text>
			))}

			<defs>
				<linearGradient id="domainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#8b5cf6" />
					<stop offset="50%" stopColor="#3b82f6" />
					<stop offset="100%" stopColor="#dc2626" />
				</linearGradient>
			</defs>
		</motion.svg>
	);
}

// Theme-aware animated mascot
export function ThemeMascot({ className = "" }: { className?: string }) {
	const { isGhibli } = useTheme();

	if (isGhibli) {
		return (
			<div className={`relative ${className}`}>
				<Totoro size={80} />
				<div className="absolute -bottom-2 -right-2">
					<SootSprite size={25} delay={0.5} />
				</div>
			</div>
		);
	}

	return (
		<div className={`relative ${className}`}>
			<SixEyes size={100} />
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<CursedEnergy />
			</div>
		</div>
	);
}
