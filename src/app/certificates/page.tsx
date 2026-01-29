"use client";

import { motion } from "framer-motion";
import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { CertificateGrid } from "@/components/certificates";
import { useCertificates } from "@/hooks";
import { ErrorBoundary } from "@/components/ui";

export default function CertificatesPage() {
	const { data, isLoading } = useCertificates();

	return (
		<ErrorBoundary>
			<PageWrapper>
				<Section className="pt-32">
					<SectionHeader
						title="Certificates"
						subtitle="Professional certifications and credentials that validate my expertise"
					/>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<CertificateGrid
							certificates={data?.data || []}
							isLoading={isLoading}
							emptyMessage="No certificates to display yet"
						/>
					</motion.div>
				</Section>
			</PageWrapper>
		</ErrorBoundary>
	);
}
