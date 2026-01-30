import { z } from "zod";

export const certificateSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	issuer: z.string().min(2, "Issuer must be at least 2 characters"),
	dateIssued: z.string().min(1, "Date is required"),
	credentialId: z.string().optional(),
	imageUrl: z.string().url().optional().or(z.literal("")),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
