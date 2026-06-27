import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-graphite)] text-[var(--color-chalk)] border-t border-[var(--semantic-border-subtle)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Thesis recap */}
        <div className="border-b border-[var(--semantic-border-subtle)]/10 pb-10 mb-10">
          <p className="font-serif text-2xl sm:text-3xl text-balance">
            Technology builds fast. People build trust.{" "}
            <span className="text-[var(--color-brass)]">We do both.</span>
          </p>
          <p className="mt-3 text-sm text-[var(--color-chalk)]/60 tracking-wide uppercase">
            Real people. Real answers. Every time.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-xl">617 East Trust</p>
            <p className="mt-3 text-sm text-[var(--color-chalk)]/60 leading-relaxed">
              People-first consulting. Modern expertise with old-fashioned
              partnership.
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.04em] text-[var(--color-brass)]">
              Analog Heart. Digital Mind.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-[var(--color-chalk)]/40 mb-4">
              Services
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--color-chalk)]/70">
              {SITE.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/#services`} className="hover:text-[var(--color-brass)] transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-[var(--color-chalk)]/40 mb-4">
              Company
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--color-chalk)]/70">
              <li><Link href="/about" className="hover:text-[var(--color-brass)] transition-colors">About Us</Link></li>
              <li><a href="/#story" className="hover:text-[var(--color-brass)] transition-colors">Our Story</a></li>
              <li><a href="/#testimonials" className="hover:text-[var(--color-brass)] transition-colors">Testimonials</a></li>
              <li><Link href="/contact" className="hover:text-[var(--color-brass)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="font-mono text-[11px] tracking-[0.04em] uppercase text-[var(--color-chalk)]/40 mb-4">
              Connect
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--color-chalk)]/70">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--color-sage)]" />
                {SITE.location}
              </li>
              <li>
                <a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-[var(--color-brass)] transition-colors">
                  <Phone size={14} className="text-[var(--color-brass)]" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref} className="flex items-center gap-2 hover:text-[var(--color-brass)] transition-colors">
                  <Mail size={14} className="text-[var(--color-drafting-blue)]" /> {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-[var(--color-chalk)]/40">We answer the phone.</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--semantic-border-subtle)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-chalk)]/40">
            © {new Date().getFullYear()} 617 East Trust. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-[var(--color-chalk)]/40">
            <Link href="/privacy" className="hover:text-[var(--color-chalk)]/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--color-chalk)]/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-[var(--color-chalk)]/30 italic">
          Proudly serving North Carolina businesses from the Sandhills to Charlotte and nationwide.
        </p>
      </div>
    </footer>
  );
}
