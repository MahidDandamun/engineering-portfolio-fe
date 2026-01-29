export default function LoginLayout({ children }: { children: React.ReactNode }) {
	// Login page doesn't use the admin sidebar
	return <>{children}</>;
}
