import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// Call your backend login endpoint
				const res = await fetch("http://localhost:5000/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				});
				const user = await res.json();
				if (res.ok && user?.user) {
					return user.user;
				}
				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/admin/login",
	},
});
