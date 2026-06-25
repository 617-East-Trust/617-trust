import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/siteData";
import Hero3D from "@/components/Hero3D";
import {
  Phone, Check, ShieldCheck, FileText,
  DollarSign, Globe, CreditCard, ArrowRight, Handshake, Cpu, Heart,
  ChevronDown, AlertTriangle, Scale,
} from "lucide-react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      <Hero3D />
      <Problem />
      <Solution />
      <Services />
      <WhyUs />
      <Story />
      <Testimonials />
      <HowItWorks />
      <CROACompliance />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function Problem() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-void)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[01] The Gap We Fill</p>
          <h2 className="text-balance text-[var(--color-chalk)]">
            The Platforms Are Fast. The Consultants Are Personal. Neither Is Both.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-fog)]">
            You've got two options in the market today — and both leave you stranded.
          </p>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Reveal delay={0.1}>
            <div className="card-cinematic p-8 h-full">
              <p className="eyebrow mb-3">Option 1</p>
              <h3 className="text-xl font-sans font-semibold text-[var(--color-chalk)]">Automated Platforms</h3>
              <p className="mt-3 text-[var(--color-fog)] leading-relaxed">
                File your LLC in 10 minutes and disappear. When the SBA asks for clarification on your cash flow projections, you get a chatbot. When your website crashes during your product launch, you get a ticket number.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card-cinematic p-8 h-full">
              <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-sage)] mb-3">Option 2</p>
              <h3 className="text-xl font-sans font-semibold text-[var(--color-chalk)]">Old Local Consultants</h3>
              <p className="mt-3 text-[var(--color-fog)] leading-relaxed">
                Remember your kid's name but still fax documents and think "SEO" is a typo. They mean well. They just haven't meaningfully updated their process since 2003.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-lg text-[var(--color-fog)]">
              <span className="font-medium text-[var(--color-chalk)]">There's a third option.</span> A firm that combines the speed of modern technology with the accountability of human partnership.
            </p>
            <p className="mt-3 font-serif text-2xl text-[var(--color-brass)]">That's 617 East Trust.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Solution() {
  const pillars = [
    { tag: "Pillar 1", icon: Cpu, title: "Technology Does the Heavy Lifting", color: "text-[var(--color-drafting-blue)]", points: ["Business formation filed in 24 hours, not 24 days","SBA lender matching powered by proprietary algorithms","Websites built on modern frameworks that load in milliseconds","Credit reports pulled instantly, disputes tracked automatically"] },
    { tag: "Pillar 2", icon: Heart, title: "People Do the Trust Building", color: "text-[var(--color-brass)]", points: ["A dedicated consultant who answers their phone","SBA applications reviewed by humans who've sat on the lender side","Website strategy informed by business goals, not just templates","Credit repair handled by experts who explain every step"] },
    { tag: "Pillar 3", icon: Handshake, title: "Both Together", color: "text-[var(--color-sage)]", points: ["Faster approvals because we know the lenders personally","Better websites because we understand your business model","Higher credit scores because we craft disputes strategically","Stronger businesses because we're still here after the paperwork"] },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-carbon)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[02] How We're Different</p>
          <h2 className="text-balance text-[var(--color-chalk)]">Modern Technology. Old-School Partnership.</h2>
          <p className="mt-6 max-w-3xl text-lg text-[var(--color-fog)]">After 15 years in Charlotte's banking industry — watching businesses struggle to navigate SBA lending, seeing entrepreneurs get lost between automated portals and outdated advice — we built something different.</p>
          <p className="mt-3 font-serif text-xl text-[var(--color-linen)]">We use technology to move fast. We use people to build trust.</p>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.12}>
              <div className="card-cinematic p-8 h-full">
                <p.icon size={28} className={p.color} />
                <p className="mt-4 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ash)]">{p.tag}</p>
                <h3 className="mt-2 font-sans font-semibold text-lg leading-snug text-[var(--color-chalk)]">{p.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm text-[var(--color-fog)]">
                      <Check size={15} className={`shrink-0 mt-0.5 ${p.color}`} />{pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const icons = [FileText, DollarSign, Globe, CreditCard];
  return (
    <section id="services" className="py-24 sm:py-32 bg-[var(--color-void)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[03] What We Do</p>
          <h2 className="text-balance text-[var(--color-chalk)]">Four Services. One Philosophy.</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {SITE.services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.slug} delay={i * 0.1}>
                <div className="card-cinematic p-8 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--color-drafting-blue)]">[{String(i + 1).padStart(2, "0")}]</span>
                    <Icon size={22} className="text-[var(--color-brass)]" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-[var(--color-chalk)]">{s.name}</h3>
                  <p className="mt-1 font-serif italic text-[var(--color-fog)]">{s.tagline}</p>
                  <p className="mt-4 text-sm text-[var(--color-fog)] leading-relaxed">{s.description}</p>
                  <p className="mt-5 font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--color-ash)]">What's Included</p>
                  <ul className="mt-2 space-y-1.5">
                    {s.included.map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm text-[var(--color-fog)]">
                        <Check size={13} className="shrink-0 mt-1 text-[var(--color-brass)]" />{pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--color-ash)]">The Difference</p>
                  <p className="mt-1 text-sm text-[var(--color-fog)] italic">{s.difference}</p>
                  <ButtonLink href="/contact" variant="ghost" size="md" className="mt-6 w-full sm:w-auto">
                    {s.cta} <ArrowRight size={15} />
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const rows = [
    { label: "Speed", platform: "Fast", consultant: "Slow", trust: "Fast" },
    { label: "Technology", platform: "Cutting-edge", consultant: "Outdated", trust: "Cutting-edge" },
    { label: "Human Relationship", platform: "None", consultant: "Handshake", trust: "Partnership" },
    { label: "Availability", platform: "24/7 dashboard", consultant: "9–5, maybe", trust: "Direct phone/text" },
    { label: "Industry Knowledge", platform: "Generic", consultant: "Local", trust: "Banking + tech" },
    { label: "Pricing", platform: "Hidden fees", consultant: '"It depends"', trust: "Clear, upfront" },
    { label: "What You Get", platform: "A login", consultant: "A handshake", trust: "A partner" },
  ];
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[var(--color-carbon)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[04] Why Us</p>
          <h2 className="text-balance text-[var(--color-chalk)]">More Human Than a Platform. More Modern Than a Handshake.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--semantic-border-strong)]">
                  <th className="text-left py-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ash)]">What Matters</th>
                  <th className="text-center py-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-drafting-blue)]">Automated Platforms</th>
                  <th className="text-center py-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-sage)]">Old Consultants</th>
                  <th className="text-center py-3 font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-brass)]">617 East Trust</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-[var(--semantic-border-subtle)]">
                    <td className="py-4 font-medium text-[var(--color-chalk)]">{r.label}</td>
                    <td className="py-4 text-center text-[var(--color-ash)]">{r.platform}</td>
                    <td className="py-4 text-center text-[var(--color-ash)]">{r.consultant}</td>
                    <td className="py-4 text-center font-semibold text-[var(--color-brass)]">{r.trust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-24 sm:py-32 bg-[var(--color-void)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[05] Our Story</p>
          <h2 className="text-balance text-[var(--color-chalk)]">From Charlotte Banking to Sandhills Roots</h2>
        </Reveal>
        <div className="mt-10 space-y-6 text-[var(--color-fog)] leading-relaxed text-lg">
          <Reveal delay={0.1}><p>617 East Trust started with a simple observation: businesses were getting lost between two broken models.</p></Reveal>
          <Reveal delay={0.15}><p>Our founder spent 15 years in Charlotte's banking industry — UNC Charlotte grad, climbing the ranks from teller to commercial lending, sitting across the desk from entrepreneurs who needed capital but couldn't navigate the system.</p></Reveal>
          <Reveal delay={0.2}>
            <blockquote className="border-l-2 border-[var(--color-brass)] pl-6 py-2 my-8">
              <p className="font-serif text-2xl text-[var(--color-linen)] leading-snug">Technology had solved the speed problem. People still solved the trust problem. Nobody was doing both.</p>
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="font-serif text-2xl text-[var(--color-chalk)] text-center py-4">Technology builds fast. People build trust. You need both to build a business that lasts.</p>
          </Reveal>
        </div>
        <Reveal delay={0.3}>
          <div className="mt-12">
            <p className="font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-ash)] mb-5">Credentials & Background</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SITE.credentials.map((c) => (
                <div key={c} className="flex gap-2.5 items-center text-sm text-[var(--color-fog)]">
                  <ShieldCheck size={15} className="shrink-0 text-[var(--color-brass)]" />{c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-[var(--color-carbon)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[06] Client Stories</p>
          <h2 className="text-balance text-[var(--color-chalk)]">Real People. Real Results.</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {SITE.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <div className="card-cinematic p-8 h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#c8853a" />
                    </svg>
                  ))}
                </div>
                <p className="text-[var(--color-fog)] italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-[var(--semantic-border-subtle)]">
                  <p className="font-medium text-[var(--color-chalk)] text-sm">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.06em] uppercase text-[var(--color-ash)]">{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Conversation", body: "We start with a conversation, not a form. Tell us about your business, your goals, your challenges. We'll tell you honestly if we can help and exactly how." },
    { num: "02", title: "Strategy", body: "We build a custom plan using the right mix of technology and human expertise. No templates. No one-size-fits-all. Your business is unique — your solution should be too." },
    { num: "03", title: "Partnership", body: "We execute fast, communicate clearly, and stick around. This isn't a transaction — it's a relationship. When you need us next month or next year, we're here." },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-void)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[07] How It Works</p>
          <h2 className="text-balance text-[var(--color-chalk)]">Three Steps to a Business That Lasts.</h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12}>
              <div className="relative">
                <p className="font-mono text-[80px] font-bold leading-none text-[var(--color-graphite)] select-none">{s.num}</p>
                <h3 className="mt-2 font-sans font-semibold text-xl text-[var(--color-chalk)]">{s.title}</h3>
                <p className="mt-3 text-[var(--color-fog)] leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CROACompliance() {
  return (
    <section
      id="compliance"
      className="py-16 sm:py-20 bg-[var(--color-obsidian)] border-t border-[var(--semantic-border-subtle)]"
      aria-label="Legal compliance disclosures"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <Scale size={22} className="text-[var(--color-brass)] shrink-0" aria-hidden="true" />
            <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--color-brass)]">Legal Disclosures</p>
          </div>
          <h2 className="text-xl font-sans font-semibold text-[var(--color-chalk)] mb-6">
            Consumer Rights &amp; Compliance Disclosures
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal delay={0.1}>
            <div className="border border-[var(--semantic-border-subtle)] rounded-lg p-6 bg-[var(--color-carbon)]">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle size={16} className="text-[var(--color-brass)] shrink-0 mt-0.5" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-[var(--color-chalk)] text-sm">Credit Repair — CROA Disclosure</h3>
              </div>
              <p className="text-[var(--color-fog)] text-sm leading-relaxed">
                617 East Trust is a credit repair organization as defined under federal law (15 U.S.C. §1679).
                We do not charge fees before services are fully performed. You have the right to cancel any
                contract within <strong className="text-[var(--color-linen)]">3 business days</strong> of signing.
                We cannot guarantee the removal of accurate, current, or verifiable information from your credit
                report. You have the right to dispute inaccurate information directly with the credit bureaus at no charge.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border border-[var(--semantic-border-subtle)] rounded-lg p-6 bg-[var(--color-carbon)]">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle size={16} className="text-[var(--color-drafting-blue)] shrink-0 mt-0.5" aria-hidden="true" />
                <h3 className="font-sans font-semibold text-[var(--color-chalk)] text-sm">SBA Consulting — Not a Lender</h3>
              </div>
              <p className="text-[var(--color-fog)] text-sm leading-relaxed">
                617 East Trust is a consulting firm, not a bank, lender, or financial institution. We do not make
                lending decisions or issue loans. SBA loan consulting is advisory only — we help prepare applications
                and connect you with SBA-approved lenders. We are not a law firm and do not provide legal advice.
                Loan approval is determined solely by the lender.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <p className="mt-6 text-xs text-[var(--color-ash)] text-center">
            Questions about your rights?{" "}
            <a href="/terms" className="text-[var(--color-drafting-blue)] hover:underline">Terms of Service</a>
            {" "}&middot;{" "}
            <a href="/privacy" className="text-[var(--color-drafting-blue)] hover:underline">Privacy Policy</a>
            {" "}&middot;{" "}
            <a href={SITE.phoneHref} className="text-[var(--color-drafting-blue)] hover:underline">{SITE.phone}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "How do I qualify for an SBA loan in North Carolina?",
    a: "Your business must be for-profit, operate in the US, have reasonable owner equity, and have exhausted other financing options. 617 East Trust helps you assess eligibility and navigate the application process for SBA 7(a), 504, and Microloan programs. Our 15+ years of Charlotte commercial banking experience means we know exactly what lenders look for.",
  },
  {
    q: "How long does credit repair take?",
    a: "Most clients see measurable improvements within 30\u201390 days. Under the Fair Credit Reporting Act, credit bureaus have 30 days to investigate disputes. Results vary based on the nature of negative items on your report. We provide transparent, legal credit repair services with no guarantees of specific score increases, in full compliance with the Credit Repair Organizations Act.",
  },
  {
    q: "What credit score do I need for an SBA 7(a) loan?",
    a: "Most SBA 7(a) lenders look for a personal credit score of at least 640\u2013680, though requirements vary by lender and loan amount. Business credit history, cash flow, and collateral also factor into approval. If your score isn't there yet, our credit repair and SBA consulting services work together to get you ready.",
  },
  {
    q: "What is the difference between an LLC and a corporation in NC?",
    a: "An LLC offers flexible management, pass-through taxation, and limited liability with less administrative overhead \u2014 ideal for most small businesses. A corporation provides a more formal structure, better for raising investment capital, with certain tax advantages. We help you choose the right entity and register with the NC Secretary of State, often within 24 hours.",
  },
  {
    q: "How is 617 East Trust different from LegalZoom or online platforms?",
    a: "Unlike national platforms, we provide personalized, hands-on support from a team with 15+ years of Charlotte commercial banking experience. We answer the phone, know the local SBA lenders personally, and stay with you after the paperwork is done. You get a partner, not a login.",
  },
  {
    q: "Does 617 East Trust guarantee credit repair results?",
    a: "No \u2014 and by law, no credit repair company can. Under the Credit Repair Organizations Act (CROA), we cannot guarantee the removal of accurate, timely negative information from your credit report. What we do guarantee: legal, ethical dispute services, full transparency, and no fees charged before services are performed.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-[var(--color-void)] border-t border-[var(--semantic-border-subtle)]"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-4">[08] FAQ</p>
          <h2 className="text-balance text-[var(--color-chalk)]">Questions We Hear Every Day.</h2>
          <p className="mt-4 text-[var(--color-fog)] leading-relaxed">Straight answers. No jargon. No runaround.</p>
        </Reveal>
        <div className="mt-12 space-y-3" role="list">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="border border-[var(--semantic-border-subtle)] rounded-lg overflow-hidden" role="listitem">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-[var(--color-carbon)] hover:bg-[var(--color-graphite)] transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-sans font-medium text-[var(--color-chalk)] text-sm leading-snug">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[var(--color-brass)] transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openIndex === i && (
                  <div
                    id={`faq-answer-${i}`}
                    className="px-6 py-5 bg-[var(--color-obsidian)] text-[var(--color-fog)] text-sm leading-relaxed"
                    role="region"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--color-obsidian)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-3xl text-center px-4">
        <Reveal>
          <h2 className="text-balance text-[var(--color-chalk)]">Ready to Build Something That Lasts?</h2>
          <p className="mt-6 text-lg text-[var(--color-fog)]">The world went digital. We stayed personal. Start with a conversation — no forms, no bots, no ticket numbers.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/contact" size="lg">Start With a Conversation <ArrowRight size={18} /></ButtonLink>
            <div className="flex items-center justify-center gap-2 text-[var(--color-fog)]">
              <Phone size={16} className="text-[var(--color-brass)]" />
              <a href={SITE.phoneHref} className="text-sm font-medium hover:text-[var(--color-chalk)] transition-colors">{SITE.phone} — We answer.</a>
            </div>
          </div>
          <p className="mt-8 font-serif text-xl text-[var(--color-brass)] italic">Analog Heart. Digital Mind.</p>
        </Reveal>
      </div>
    </section>
  );
}
