import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/siteData";
import { Hero3D } from "@/components/Hero3D";
import {
  Phone, Check, ShieldCheck, ArrowRight,
  TrendingUp, Settings, Users
} from "lucide-react";
import { NCBackground } from "@/components/NCBackground";

// Problem Section Component
const Problem = () => (
  <section id="problem" className="relative py-20 md:py-28 border-t border-white/10">
    <div className="mx-auto max-w-4xl px-6">
      <div className="section-heading">[01] The Problem</div>
      <h2 className="text-balance">Business doesn't fail at launch.<br />It fails in the silence after.</h2>

      <div className="mt-8 max-w-3xl space-y-6 text-lg text-[#f4f1eb]/90">
        <p>
          Automated platforms form your LLC in twelve minutes and send you on your way. Local consultants write your business plan and move to the next client. Nobody mentions that year two is when compliance slips, cash flow tightens, tax surprises hit, and the owner starts drowning in operational drift.
        </p>
        <p>
          The formation was easy. The staying alive is hard. And nobody stays with you for it.
        </p>
        <p className="font-medium text-[#f4f1eb]">We do.</p>
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorks = () => (
  <section id="how-it-works" className="relative py-20 md:py-28 border-t border-white/10">
    <div className="mx-auto max-w-5xl px-6">
      <div className="section-heading">[07] How It Works</div>
      <h2 className="text-balance">Three Steps to a Business That Lasts.</h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {SITE.howItWorks.map((step, index) => (
          <div key={index} className="card-cinematic p-8">
            <div className="text-[#b8975e] text-sm tracking-widest mb-4">0{index + 1}</div>
            <h3 className="text-2xl mb-4">{step.title}</h3>
            <p className="text-[#f4f1eb]/85 leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Hero3D />
      <Problem />
      <Phases />
      <WhyUs />
      <Story />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <FinalCTA />
    </>
  );
}

// Placeholder components (these would normally be in separate files or expanded)
const Phases = () => <div className="py-20 text-center text-[#f4f1eb]/60">Phases Section (to be expanded)</div>;
const WhyUs = () => <div className="py-20 text-center text-[#f4f1eb]/60">Why Us Section (to be expanded)</div>;
const Story = () => <div className="py-20 text-center text-[#f4f1eb]/60">Our Story Section (to be expanded)</div>;
const Testimonials = () => <div className="py-20 text-center text-[#f4f1eb]/60">Testimonials Section (to be expanded)</div>;
const FAQ = () => <div className="py-20 text-center text-[#f4f1eb]/60">FAQ Section (to be expanded)</div>;
const FinalCTA = () => <div className="py-20 text-center text-[#f4f1eb]/60">Final CTA Section (to be expanded)</div>;
