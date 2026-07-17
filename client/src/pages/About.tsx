import { ButtonLink } from "@/components/ui/Button";
import { SITE, CREDENTIALS } from "@/lib/siteData";
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

      {/* Founder */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="card-cinematic p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="shrink-0 w-24 h-24 rounded-full bg-[var(--color-ink)]/10 flex items-center justify-center overflow-hidden border-2 border-[var(--color-brass)]/40">
            <img
              src={SITE.founder.photo}
              alt={SITE.founder.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="text-3xl font-serif text-[var(--color-brass)]" aria-hidden="true">
              {!SITE.founder.photo ? SITE.founder.name.split(' ').map(n => n[0]).join('') : ''}
            </span>
          </div>
          <div>
            <h2 className="text-xl">{SITE.founder.name}</h2>
            <p className="text-sm text-[var(--color-brass)] mt-1">Founder, 617 East Trust</p>
            <p className="mt-3 text-base text-[var(--semantic-text-secondary)] leading-relaxed">{SITE.founder.bio}</p>
            {SITE.founder.linkedin && (
              <a href={SITE.founder.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--color-drafting-blue)] hover:underline">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20 space-y-6 text-lg leading-relaxed text-[var(--color-graphite)]">
        <p>
          Lamont Legrand spent 15 years in Charlotte's banking industry — UNC
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

        <p className="text-[var(--color-ink)]/80">
          But speed is a trap if it's the wrong move. The most important thing we
          do is tell you what <em>not</em> to do — when not to incorporate, which
          spend to hold, where the quiet after the sale is where trust is actually
          built. That restraint is the point, not a footnote.
        </p>

        {/* Credentials */}
        <div className="mt-12">
          <p className="font-mono text-xs tracking-[0.04em] uppercase text-[var(--color-smoke)] mb-4">
            Credentials &amp; Background
          </p>
          <ul className="space-y-3">
            {CREDENTIALS.map((c) => (
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
