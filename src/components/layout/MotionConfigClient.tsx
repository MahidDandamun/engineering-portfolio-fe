"use client";

import { MotionConfig } from "framer-motion";
import { useTheme } from "@/context";

export default function MotionConfigClient({ children }: { children: React.ReactNode }) {
	const { motionEnabled } = useTheme();
	const reducedMotion = motionEnabled ? "never" : "always";
	return <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>;
}
