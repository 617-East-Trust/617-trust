import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { ButtonLink } from "./ui/Button";
import { SITE } from "@/lib/siteData";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#story", label: "Our Story" },
  { href: "/#testimonials", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-[var(--transition-base)] ${
        scrolled
          ? "bg-[rgba(0,0,0,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--color-ash)] hidden sm:inline">
            [617]
          </span>
          <span className="font-serif text-xl text-[var(--color-chalk)] group-hover:text-[var(--color-brass)] transition-colors duration-200">
            617 East Trust
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-fog)] hover:text-[var(--color-chalk)] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <ButtonLink href="/contact" size="md">
            Start With a Conversation
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--color-chalk)]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-[var(--color-carbon)] flex flex-col px-6 py-8 gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-lg text-[var(--color-chalk)] border-b border-[var(--semantic-border-subtle)] hover:text-[var(--color-brass)] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="mt-6 flex items-center gap-2 text-[var(--color-brass)] font-medium"
          >
            <Phone size={18} /> {SITE.phone}
          </a>
          <ButtonLink href="/contact" size="lg" className="mt-4 w-full" >
            Start With a Conversation
          </ButtonLink>
        </div>
      )}
    </header>
  );
}
