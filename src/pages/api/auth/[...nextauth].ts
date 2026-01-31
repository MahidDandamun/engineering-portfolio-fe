// Disabled next-auth handler: the app now uses backend JWT + HttpOnly cookie auth
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
	res.status(404).json({ message: "Not Found" });
}
