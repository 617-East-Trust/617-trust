import { SITE } from "@/lib/siteData";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const LAST_UPDATED = "June 25, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-sans font-semibold text-[var(--color-chalk)] pb-2 border-b border-[var(--semantic-border-subtle)]">
        {title}
      </h2>
      <div className="space-y-3 text-[var(--color-fog)] leading-relaxed">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc list-outside ml-5 space-y-2 text-[var(--color-fog)]">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

export default function Privacy() {
  return (
    <article className="min-h-screen bg-[var(--color-void)]">
      <div className="sticky top-16 z-40 bg-[var(--color-carbon)] border-b border-[var(--semantic-border-subtle)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-[var(--color-fog)] hover:text-[var(--color-chalk)] transition-colors">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to Home
          </Link>
          <span className="text-xs text-[var(--color-ash)] hidden sm:block">{SITE.domain}</span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[var(--color-graphite)] rounded-lg flex items-center justify-center">
              <Shield size={18} className="text-[var(--color-drafting-blue)]" aria-hidden="true" />
            </div>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-drafting-blue)]">Legal</p>
          </div>
          <h1 className="text-[var(--color-chalk)]">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[var(--color-ash)]">Last Updated: {LAST_UPDATED}</p>
          <p className="mt-4 text-[var(--color-fog)] leading-relaxed">
            617 East Trust ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit{" "}
            <strong className="text-[var(--color-linen)]">{SITE.domain}</strong> or engage our services.
          </p>
        </div>

        <div className="space-y-10">
          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us, including:</p>
            <BulletList items={[
              <><strong className="text-[var(--color-linen)]">Contact Information:</strong> Name, phone number, email address, and mailing address.</>,
              <><strong className="text-[var(--color-linen)]">Business Information:</strong> Business name, entity type, EIN, state of formation, and business goals.</>,
              <><strong className="text-[var(--color-linen)]">Financial Information:</strong> Credit reports (with your written authorization), credit scores, and financial history relevant to SBA loan applications.</>,
              <><strong className="text-[var(--color-linen)]">Communications:</strong> Messages, emails, and call records when you contact us.</>,
            ]} />
            <p>We also automatically collect certain information when you visit our website:</p>
            <BulletList items={[
              "IP address, browser type, and operating system.",
              "Pages visited, time spent on pages, and referring URLs.",
              "Device identifiers and general geographic location.",
            ]} />
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <BulletList items={[
              "Provide, operate, and improve our services (business formation, SBA consulting, credit repair, web design).",
              "Communicate with you about your account, services, and inquiries.",
              "Process transactions and send related information.",
              "Comply with legal obligations, including the Fair Credit Reporting Act (FCRA) and Credit Repair Organizations Act (CROA).",
              "Analyze website usage to improve user experience.",
              "Send you service updates and, with your consent, marketing communications.",
            ]} />
          </Section>

          <Section title="3. How We Share Your Information">
            <p>
              <strong className="text-[var(--color-linen)]">We do not sell your personal information.</strong>{" "}
              We may share your information only in the following limited circumstances:
            </p>
            <BulletList items={[
              <><strong className="text-[var(--color-linen)]">Service Providers:</strong> Third-party vendors who assist in operating our business (e.g., SBA-approved lenders you authorize us to contact, credit bureaus for dispute filing, web hosting providers). These parties are contractually obligated to protect your information.</>,
              <><strong className="text-[var(--color-linen)]">Legal Compliance:</strong> When required by law, subpoena, court order, or to protect the rights, property, or safety of 617 East Trust, our clients, or others.</>,
              <><strong className="text-[var(--color-linen)]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice to you.</>,
              <><strong className="text-[var(--color-linen)]">With Your Consent:</strong> For any other purpose with your explicit written consent.</>,
            ]} />
          </Section>

          <Section title="4. Credit Report Authorization & FCRA Compliance">
            <p>
              If you engage our credit repair services, we will only access your credit reports with your
              explicit written authorization, as required by the{" "}
              <strong className="text-[var(--color-linen)]">Fair Credit Reporting Act (15 U.S.C. §1681)</strong>.
              You have the right to:
            </p>
            <BulletList items={[
              "Know what is in your credit file.",
              <>Dispute inaccurate information directly with the credit bureaus at no charge via{" "}<a href="https://www.annualcreditreport.com" className="text-[var(--color-drafting-blue)] hover:underline" target="_blank" rel="noopener noreferrer">AnnualCreditReport.com</a>.</>,
              "Receive a free credit report annually from each of the three major bureaus.",
              "Limit access to your credit report through a security freeze.",
            ]} />
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement reasonable technical and organizational security measures to protect your personal
              information from unauthorized access, disclosure, alteration, or destruction. These measures
              include encrypted data transmission (HTTPS), restricted access controls, and secure data storage.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While
              we strive to use commercially acceptable means to protect your information, we cannot guarantee
              absolute security.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your personal information for as long as necessary to provide our services and comply
              with our legal obligations. For credit repair clients, we retain records as required by the CROA
              and applicable state law. You may request deletion of your data at any time (subject to legal
              retention requirements) by contacting us.
            </p>
          </Section>

          <Section title="7. Your Rights and Choices">
            <p>You have the following rights regarding your personal information:</p>
            <BulletList items={[
              <><strong className="text-[var(--color-linen)]">Access:</strong> Request a copy of the personal information we hold about you.</>,
              <><strong className="text-[var(--color-linen)]">Correction:</strong> Request correction of inaccurate or incomplete information.</>,
              <><strong className="text-[var(--color-linen)]">Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</>,
              <><strong className="text-[var(--color-linen)]">Opt-Out:</strong> Unsubscribe from marketing communications at any time by contacting us or using the unsubscribe link in any email.</>,
              <><strong className="text-[var(--color-linen)]">Cookies:</strong> Adjust your browser settings to refuse cookies, though this may affect website functionality.</>,
            ]} />
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              Our website may contain links to third-party websites, including SBA.gov, the NC Secretary of
              State website, and the credit bureaus. We are not responsible for the privacy practices of these
              external sites. We encourage you to review their privacy policies before providing any information.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children. If you believe we have inadvertently collected information
              from a minor, please contact us immediately and we will take steps to delete it.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes
              by posting the new policy on this page and updating the "Last Updated" date. We encourage you to
              review this policy periodically.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
            <address className="not-italic mt-3 bg-[var(--color-carbon)] border border-[var(--semantic-border-subtle)] rounded-lg p-5 space-y-1">
              <p className="font-semibold text-[var(--color-chalk)]">{SITE.name}</p>
              <p>{SITE.location}</p>
              <p>
                Phone:{" "}
                <a href={SITE.phoneHref} className="text-[var(--color-drafting-blue)] hover:underline font-medium">
                  {SITE.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={SITE.emailHref} className="text-[var(--color-drafting-blue)] hover:underline font-medium">
                  {SITE.email}
                </a>
              </p>
            </address>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--semantic-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ash)]">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-[var(--color-fog)] transition-colors underline">Terms of Service</Link>
            <Link href="/" className="hover:text-[var(--color-fog)] transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
