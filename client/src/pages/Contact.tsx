import { useState } from "react";
import { SITE } from "@/lib/siteData";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";

const services = [
  "Business Formation",
  "SBA Funding & Capital",
  "Web Design & SEO",
  "Consumer Credit Repair",
  "Not sure yet — just exploring",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("https://n8n.liberatedphoenix.net/webhook/617east-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      alert("Network error. Please check your connection or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article>
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24">
        <p className="font-mono text-xs tracking-[0.04em] uppercase text-[var(--color-drafting-blue)] mb-6">
          Contact
        </p>
        <h1 className="text-balance">
          Stop Being Processed. Start Being Partnered With.
        </h1>
        <p className="mt-6 text-lg text-[var(--color-graphite)] max-w-2xl">
          You can get a login anywhere. You can get a chatbot anywhere. But if
          you want a real conversation with people who have the tech to back it
          up — you're in the right place.
        </p>

        {/* Direct contact options */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <a href={SITE.phoneHref} className="bg-[var(--color-chalk)] rounded-[var(--radius-human)] p-6 border border-[var(--semantic-border-subtle)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <Phone className="text-[var(--color-brass)] mb-3" size={24} />
            <p className="font-medium">Call Us</p>
            <p className="text-sm text-[var(--color-graphite)] mt-1">{SITE.phone}</p>
          </a>
          <a href={SITE.smsHref} className="bg-[var(--color-chalk)] rounded-[var(--radius-human)] p-6 border border-[var(--semantic-border-subtle)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <Phone className="text-[var(--color-brass)] mb-3" size={24} />
            <p className="font-medium">Text Us</p>
            <p className="text-sm text-[var(--color-graphite)] mt-1">{SITE.phone}</p>
          </a>
          <a href={SITE.emailHref} className="bg-[var(--color-chalk)] rounded-[var(--radius-human)] p-6 border border-[var(--semantic-border-subtle)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <Mail className="text-[var(--color-drafting-blue)] mb-3" size={24} />
            <p className="font-medium">Email Us</p>
            <p className="text-sm text-[var(--color-graphite)] mt-1 break-all">{SITE.email}</p>
          </a>
        </div>

        {/* Form */}
        <div className="mt-12 bg-[var(--color-chalk)] rounded-[var(--radius-human)] p-8 sm:p-10 shadow-[var(--shadow-md)] border border-[var(--semantic-border-subtle)]">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-pill)] bg-[var(--color-brass)]/10 mb-4">
                <Check className="text-[var(--color-brass)]" size={32} />
              </div>
              <h2 className="text-2xl font-sans font-semibold">Thanks — we've got it.</h2>
              <p className="mt-3 text-[var(--color-graphite)]">
                We answer the phone. A real person will reach out within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-sans font-semibold mb-2">Start With a Conversation</h2>
                <p className="text-sm text-[var(--color-graphite)]">
                  First consultation is free. No obligation. Real answers.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-[var(--radius-functional)] border border-[var(--semantic-border-subtle)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-drafting-blue)]/30"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-[var(--radius-functional)] border border-[var(--semantic-border-subtle)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-drafting-blue)]/30"
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-[var(--radius-functional)] border border-[var(--semantic-border-subtle)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-drafting-blue)]/30"
                  />
                </Field>
                <Field label="What do you need?" required>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-[var(--radius-functional)] border border-[var(--semantic-border-subtle)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-drafting-blue)]/30"
                  >
                    <option value="">Select a service…</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Tell us about your business">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-[var(--radius-functional)] border border-[var(--semantic-border-subtle)] bg-[var(--color-paper)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-drafting-blue)]/30"
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--color-brass)] text-[var(--color-chalk)] rounded-[var(--radius-pill)] px-6 py-4 font-medium hover:brightness-110 hover:shadow-[var(--shadow-warm)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} /> Start the Conversation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </article>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-mono tracking-[0.04em] uppercase text-[var(--color-smoke)] mb-2">
        {label} {required && <span className="text-[var(--color-brass)]">*</span>}
      </span>
      {children}
    </label>
  );
}
