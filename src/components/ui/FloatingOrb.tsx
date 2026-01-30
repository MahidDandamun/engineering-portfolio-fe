import React from "react";
import { motion, MotionProps } from "framer-motion";

interface FloatingOrbProps extends Partial<MotionProps> {
	className?: string;
	style?: React.CSSProperties;
}

const FloatingOrb = ({ className, style, animate, transition }: FloatingOrbProps) => (
	<motion.div className={className} style={style} animate={animate} transition={transition} />
);

export default FloatingOrb;
