"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeAlias = "ghibli" | "jjk";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	isGhibli: boolean;
	isJJK: boolean;
	motionEnabled: boolean;
	toggleMotion: () => void;
}

interface ThemeProviderProps {
	children: ReactNode;
	defaultTheme?: Theme | ThemeAlias;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Convert theme alias to actual theme
const resolveTheme = (theme: Theme | ThemeAlias): Theme => {
	if (theme === "ghibli") return "light";
	if (theme === "jjk") return "dark";
	return theme;
};

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => {
		if (defaultTheme) return resolveTheme(defaultTheme);
		return "dark";
	});
	const [motionEnabled, setMotionEnabled] = useState<boolean>(() => {
		if (typeof window === "undefined") return true;
		const saved = localStorage.getItem("motionEnabled");
		return saved === null ? true : saved === "true";
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		const savedTheme = localStorage.getItem("theme") as Theme | null;

		let initialTheme = "dark" as Theme;

		if (savedTheme) {
			initialTheme = savedTheme;
		} else if (defaultTheme) {
			initialTheme = resolveTheme(defaultTheme);
		} else {
			initialTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
		}

		setTimeout(() => setTheme(initialTheme), 0);
	}, [defaultTheme]);

	// motionEnabled is initialized from localStorage in useState lazy initializer above,
	// so no need to synchronously set state again in an effect here.

	useEffect(() => {
		if (typeof window === "undefined") return;

		localStorage.setItem("theme", theme);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}, [theme]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		localStorage.setItem("motionEnabled", motionEnabled ? "true" : "false");
	}, [motionEnabled]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	const toggleMotion = () => {
		setMotionEnabled((v) => !v);
	};

	// Ghibli style for light mode, JJK for dark mode
	const isGhibli = theme === "light";
	const isJJK = theme === "dark";

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, isGhibli, isJJK, motionEnabled, toggleMotion }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
