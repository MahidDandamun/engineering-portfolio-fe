// Certificate Types
export interface Certificate {
	_id: string;
	title: string;
	issuer: string;
	dateIssued: string;
	credentialId?: string;
	imageUrl?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateCertificateDTO {
	title: string;
	issuer: string;
	dateIssued: string; // ISO date
	credentialId?: string;
	imageUrl?: string;
}

export type UpdateCertificateDTO = Partial<CreateCertificateDTO>;
