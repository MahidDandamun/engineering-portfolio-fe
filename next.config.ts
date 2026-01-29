import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.simpleicons.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.jsdelivr.net",
				pathname: "/**",
			},
		],
	},
	reactStrictMode: true,
	poweredByHeader: false,
};

export default nextConfig;
