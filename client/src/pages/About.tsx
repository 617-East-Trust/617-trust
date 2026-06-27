import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/siteData";
import { ArrowRight, Check } from "lucide-react";

export default function About() {
  return (
    <article>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24">
        <p className="font-mono text-xs tracking-[0.04em] uppercase text-[var(--color-drafting-blue)] mb-6">
          Our Story
        </p>
        <h1 className="text-balance">
          From Charlotte Banking to Sandhills Roots
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-[var(--color-graphite)] text-pretty">
          617 East Trust started with a simple observation: businesses were
          getting lost between two broken models.
        </p>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 space-y-6 text-lg leading-relaxed text-[var(--color-graphite)]">
        <p>
          Our founder spent 15 years in Charlotte's banking industry — UNC
          Charlotte grad, climbing the ranks from teller to commercial lending,
          sitting across the desk from entrepreneurs who needed capital but
          couldn't navigate the system. Saw too many good businesses get
          declined because they didn't know how to tell their story to lenders.
          Saw too many settle for predatory loans because the SBA process
          seemed impossible.
        </p>
        <p>
          Meanwhile, watched the rise of automated platforms that made business
          formation instant and support nonexistent. Watched local consultants
          mean well but move at 1997 speeds with 1997 tools.
        </p>

        <blockquote className="border-l-4 border-[var(--color-brass)] pl-6 py-2 my-10">
          <p className="font-serif text-2xl text-[var(--color-ink)] leading-snug">
            Technology had solved the speed problem. People still solved the
            trust problem. Nobody was doing both.
          </p>
        </blockquote>

        <p>
          So we built 617 East Trust — named for the idea that business happens
          at the intersection of thoroughfare and trust. Based in Charlotte where
          the banks are. Rooted in the Sandhills where the values are. Serving
          North Carolina and beyond with a simple philosophy:
        </p>

        <p className="font-serif text-2xl text-[var(--color-brass)] py-4">
          Technology builds fast. People build trust. You need both to build a
          business that lasts.
        </p>

        {/* Credentials */}
        <div className="mt-12">
          <p className="font-mono text-xs tracking-[0.04em] uppercase text-[var(--color-smoke)] mb-4">
            Credentials &amp; Background
          </p>
          <ul className="space-y-3">
            {SITE.credentials.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <Check size={18} className="text-[var(--color-brass)] mt-0.5 shrink-0" />
                <span className="text-base">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-ink)] text-[var(--color-paper)] py-16">
        <div className="mx-auto max-w-2xl text-center px-4">
          <h2 className="text-[var(--color-paper)]">Ready to build something that lasts?</h2>
          <p className="mt-4 text-[var(--color-ash)]">
            The world went digital. We stayed personal.
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
