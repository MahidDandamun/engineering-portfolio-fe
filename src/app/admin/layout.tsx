import AdminThemeClient from "./theme-client";

// Server Component: just renders the client theme wrapper
export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return <AdminThemeClient>{children}</AdminThemeClient>;
}
