import { SITE } from "@/lib/siteData";
import { FileText, ArrowLeft, AlertTriangle } from "lucide-react";
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

function DisclosureBox({ color, iconColor, title, children }: {
  color: string; iconColor: string; title: string; children: React.ReactNode;
}) {
  return (
    <div className={`flex items-start gap-4 p-5 rounded-lg border ${color} my-4`}>
      <AlertTriangle size={18} className={`${iconColor} shrink-0 mt-0.5`} aria-hidden="true" />
      <div>
        <p className="font-semibold mb-2">{title}</p>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function Terms() {
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
              <FileText size={18} className="text-[var(--color-brass)]" aria-hidden="true" />
            </div>
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-brass)]">Legal</p>
          </div>
          <h1 className="text-[var(--color-chalk)]">Terms of Service</h1>
          <p className="mt-3 text-sm text-[var(--color-ash)]">Last Updated: {LAST_UPDATED}</p>
          <p className="mt-4 text-[var(--color-fog)] leading-relaxed">
            Welcome to 617 East Trust. These Terms of Service ("Terms") govern your access to and use of our
            website (<strong className="text-[var(--color-linen)]">{SITE.domain}</strong>) and the business
            formation, SBA loan consulting, credit repair, and related services (collectively, the "Services")
            provided by 617 East Trust ("we," "us," or "our"). By accessing our website or using our Services,
            you agree to be bound by these Terms.
          </p>
        </div>

        <div className="space-y-10">
          <Section title="1. Services Provided">
            <p>617 East Trust provides consulting and administrative services, including:</p>
            <BulletList items={[
              "Business entity formation and registration (LLCs, Corporations) in North Carolina.",
              "Consulting and application preparation assistance for Small Business Administration (SBA) loans.",
              "Credit repair and dispute services under the Fair Credit Reporting Act (FCRA).",
              "Website development and related digital marketing and SEO services.",
              "General business and life consulting.",
            ]} />
          </Section>

          <Section title="2. Not a Lender or Law Firm">
            <DisclosureBox
              color="bg-[var(--color-carbon)] border-[var(--color-brass-dim)]"
              iconColor="text-[var(--color-brass)]"
              title="Financial Disclaimer"
            >
              <p className="text-[var(--color-fog)]">
                617 East Trust is a business consulting firm.{" "}
                <strong className="text-[var(--color-linen)]">We are not a bank, lender, or financial institution.</strong>{" "}
                We do not make lending decisions or issue loans. Any assistance provided regarding SBA loans is
                strictly advisory and for application preparation purposes. We connect clients with SBA-approved
                lenders but cannot guarantee loan approval. Loan approval is determined solely by the lender.
              </p>
            </DisclosureBox>
            <DisclosureBox
              color="bg-[var(--color-carbon)] border-[var(--color-drafting-blue)]"
              iconColor="text-[var(--color-drafting-blue)]"
              title="Legal Disclaimer"
            >
              <p className="text-[var(--color-fog)]">
                617 East Trust is{" "}
                <strong className="text-[var(--color-linen)]">not a law firm.</strong>{" "}
                Our employees are not attorneys, and we do not provide legal advice. Our business formation
                services are administrative in nature. For legal or tax advice regarding your business entity,
                please consult a qualified attorney or CPA.
              </p>
            </DisclosureBox>
          </Section>

          <Section title="3. Credit Repair Services — CROA Compliance">
            <p>
              If you engage us for credit repair services, you acknowledge and agree to the following, in
              compliance with the{" "}
              <strong className="text-[var(--color-linen)]">Credit Repair Organizations Act (15 U.S.C. §1679)</strong>:
            </p>
            <BulletList items={[
              <><strong className="text-[var(--color-linen)]">No Guarantees:</strong> We do not and cannot legally guarantee the removal of accurate, current, and verifiable negative information from your credit report.</>,
              <><strong className="text-[var(--color-linen)]">No Upfront Fees:</strong> We will not charge or collect any fee for credit repair services until those specific services have been fully performed.</>,
              <><strong className="text-[var(--color-linen)]">Right to Cancel:</strong> You have the right to cancel any contract for credit repair services without penalty or obligation within <strong className="text-[var(--color-linen)]">three (3) business days</strong> from the date the contract is signed.</>,
              <><strong className="text-[var(--color-linen)]">Consumer Rights:</strong> You have the right to dispute inaccurate information in your credit report directly with the credit bureaus at no charge via <a href="https://www.annualcreditreport.com" className="text-[var(--color-drafting-blue)] hover:underline" target="_blank" rel="noopener noreferrer">AnnualCreditReport.com</a>.</>,
            ]} />
            <p className="text-sm text-[var(--color-ash)] italic">
              Specific terms regarding credit repair services will be detailed in a separate, written Client
              Agreement provided before services begin.
            </p>
          </Section>

          <Section title="4. User Responsibilities">
            <p>By using our Services, you agree to:</p>
            <BulletList items={[
              "Provide accurate, current, and complete information as requested for the provision of Services.",
              "Promptly update us regarding any changes to your information.",
              "Cooperate with our team and provide necessary documentation in a timely manner.",
              "Use our website and Services only for lawful purposes and in accordance with these Terms.",
            ]} />
          </Section>

          <Section title="5. Fees and Payments">
            <p>
              Fees for our Services will be clearly outlined in a separate written agreement or invoice prior
              to the commencement of work. Except for credit repair services (which are billed in arrears per
              federal law), payment terms will be specified in your individual agreement. All fees are
              non-refundable unless otherwise stated in your agreement or required by law.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the
              property of 617 East Trust or its content suppliers and is protected by copyright, trademark,
              and other intellectual property laws. You may not reproduce, distribute, modify, or create
              derivative works of any content without our express written permission.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, 617 East Trust, its officers, directors,
              employees, and agents shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly,
              or any loss of data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <BulletList items={[
              "Your access to or use of, or inability to access or use, the Services.",
              "Any conduct or content of any third party on the Services.",
              "Any action taken based on the consulting advice provided, including loan application denials or business formation outcomes.",
            ]} />
            <p>
              Our total liability for any claim arising out of or relating to these Terms or our Services
              shall not exceed the total fees paid by you to 617 East Trust in the three (3) months preceding
              the claim.
            </p>
          </Section>

          <Section title="8. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless 617 East Trust and its affiliates from and
              against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including
              reasonable attorneys' fees) arising from your use of the Services, your violation of these
              Terms, or your violation of any rights of a third party.
            </p>
          </Section>

          <Section title="9. Governing Law and Jurisdiction">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the{" "}
              <strong className="text-[var(--color-linen)]">State of North Carolina</strong>, without regard
              to its conflict of law principles. Any legal action or proceeding arising out of or related to
              these Terms or the Services shall be brought exclusively in the state or federal courts located
              in North Carolina.
            </p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material,
              we will provide at least 30 days' notice prior to any new terms taking effect by posting the
              updated Terms on this page and updating the "Last Updated" date. By continuing to access or use
              our Services after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have any questions about these Terms, please contact us:</p>
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
            <Link href="/privacy" className="hover:text-[var(--color-fog)] transition-colors underline">Privacy Policy</Link>
            <Link href="/" className="hover:text-[var(--color-fog)] transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
