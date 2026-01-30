// Centralized data objects for ContactCTA and other home components
import { Briefcase, MapPin, Mail } from "lucide-react";

export const CONTACT_BADGES = [
	{
		icon: MapPin,
		label: "Remote / Worldwide",
		colorLight: "bg-white/70 border-slate-200 text-slate-600",
		colorDark: "bg-white/5 border-white/10 text-white/70",
		iconColorLight: "text-slate-500",
		iconColorDark: "text-white/50",
	},
	{
		icon: Mail,
		label: "Quick Response",
		colorLight: "bg-white/70 border-slate-200 text-slate-600",
		colorDark: "bg-white/5 border-white/10 text-white/70",
		iconColorLight: "text-slate-500",
		iconColorDark: "text-white/50",
	},
];

export const CONTACT_BADGE = {
	icon: Briefcase,
	label: "Open for opportunities",
	colorLight: "bg-amber-100 border-amber-200 text-amber-700 text-amber-600",
	colorDark: "bg-violet-500/10 border-violet-500/20 text-violet-400 text-violet-400",
};
