import { Link } from "wouter";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/siteData";
import { ArrowRight, Building2, TrendingUp, Shield, Globe, BarChart3, CreditCard } from "lucide-react";

const SERVICE_CATEGORIES = [
  {
    slug: "llc-formation-north-carolina",
    name: "LLC Formation",
    short: "Same-day North Carolina LLC and corporation registration with the NC Secretary of State.",
    icon: Building2,
    comingSoon: false,
  },
  {
    slug: "sba-loans-north-carolina",
    name: "SBA Loans & Funding",
    short: "SBA 7(a), 504, and Microloan consulting — we help you prepare, apply, and connect with lenders.",
    icon: TrendingUp,
    comingSoon: false,
  },
  {
    slug: "credit-repair-north-carolina",
    name: "Credit Repair",
    short: "FCRA-compliant credit report analysis, dispute processing, and credit-building strategy.",
    icon: CreditCard,
    comingSoon: false,
  },
  {
    slug: "bookkeeping-north-carolina",
    name: "Bookkeeping & Accounting",
    short: "Monthly bookkeeping, financial statements, and tax-season readiness for small businesses.",
    icon: BarChart3,
    comingSoon: false,
  },
  {
    slug: "fractional-cfo",
    name: "Fractional CFO",
    short: "Strategic financial leadership — forecasting, KPIs, lender reporting — without the full-time hire.",
    icon: Shield,
    comingSoon: false,
  },
  {
    slug: "web-design-seo",
    name: "Web Design & SEO",
    short: "Professional websites and search optimization that bring customers to your door.",
    icon: Globe,
    comingSoon: false,
  },
];

export default function Services() {
  return (
    <article>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24">
        <p className="font-mono text-xs tracking-[0.04em] uppercase text-[var(--color-drafting-blue)] mb-6">
          What We Do
        </p>
        <h1 className="text-balance">Services built for North Carolina businesses.</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-graphite)] text-pretty max-w-2xl">
          From formation to funding to ongoing financial management — we offer every service a growing business needs, under one roof. No handoffs. No runaround.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_CATEGORIES.map((svc) => (
            <div key={svc.slug} className="card-cinematic p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <svc.icon size={22} className="text-[var(--color-brass)]" />
                <h2 className="text-lg">{svc.name}</h2>
                {svc.comingSoon && (
                  <span className="ml-auto text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border border-[var(--semantic-border-subtle)] text-[var(--semantic-text-tertiary)]">
                    Coming Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--semantic-text-secondary)] mb-4 flex-1">{svc.short}</p>
              <Link
                href={`/services/${svc.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-brass)] hover:underline font-medium"
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16">
        <div className="mx-auto max-w-2xl text-center px-4">
          <h2 className="text-[var(--color-paper)]">Not sure which service you need?</h2>
          <p className="mt-4 text-[var(--color-ash)]">
            Most clients need more than one. Let's figure it out together.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" size="lg">
              Start With a Conversation <ArrowRight size={18} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </article>
  );
}
