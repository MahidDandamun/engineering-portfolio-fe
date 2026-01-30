"use client";

import { PageWrapper, Section, SectionHeader } from "@/components/layout";
import { ErrorBoundary } from "@/components/ui";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { ContactFormSection } from "@/components/contact/ContactFormSection";

export default function ContactPage() {
	return (
		<ErrorBoundary>
			<PageWrapper>
				<Section className="pt-32">
					<SectionHeader
						title="Get in Touch"
						subtitle="Have a project in mind or want to collaborate? Let's talk!"
					/>
					<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
						<ContactInfoSection />
						<ContactFormSection />
					</div>
				</Section>
			</PageWrapper>
		</ErrorBoundary>
	);
}
