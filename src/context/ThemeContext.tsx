"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeAlias = "ghibli" | "jjk";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
	isGhibli: boolean;
	isJJK: boolean;
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
		if (typeof window === "undefined") return "dark";

		const savedTheme = localStorage.getItem("theme") as Theme | null;
		if (savedTheme) return savedTheme;

		if (window.matchMedia("(prefers-color-scheme: light)").matches) {
			return "light";
		}

		return "dark";
	});

	useEffect(() => {
		if (typeof window === "undefined") return;

		localStorage.setItem("theme", theme);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	// Ghibli style for light mode, JJK for dark mode
	const isGhibli = theme === "light";
	const isJJK = theme === "dark";

	return <ThemeContext.Provider value={{ theme, toggleTheme, isGhibli, isJJK }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
