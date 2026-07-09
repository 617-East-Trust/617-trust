/**
 * 617 East Trust — centralized brand + content data.
 * Enhanced: marketing psychology, anti-slop, taste-skill compliant.
 */

export type Phase = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  included: string[];
  closingLine: string;
  color: string;
  icon: string;
};

export const PHASES: Phase[] = [
  {
    id: "form",
    index: "01",
    name: "Form",
    tagline: "Get the business standing.",
    description: "The foundation work most consultants do \u2014 and then abandon.",
    icon: "building",
    included: [
      "Entity Formation (LLC, S-Corp, C-Corp, Nonprofit)",
      "Compliance Calendar Setup",
      "Registered Agent Services",
      "Business Banking & Treasury Setup",
      "Credit Building Strategy",
      "Business Plan Writing",
      "Trademark Filing",
      "Insurance Needs Analysis",
      "Initial HR & Employee Handbook Setup",
    ],
    closingLine: "You don\u2019t just get filed. You get positioned \u2014 legally, financially, and operationally \u2014 for what comes next.",
    color: "var(--color-drafting-blue)",
  },
  {
    id: "grow",
    index: "02",
    name: "Grow",
    tagline: "Get the business moving.",
    description: "The momentum work that separates real businesses from hobbies.",
    icon: "trending",
    included: [
      "SBA Loan Consulting & Application Support",
      "Financial Projections & Cash Flow Modeling",
      "Website Design & Development",
      "SEO & Local Search Optimization",
      "Paid Advertising Management (Google & Meta)",
      "Content Marketing & Social Media",
      "Grant Writing & Alternative Funding",
      "Reputation Management & Review Generation",
    ],
    closingLine: "Funding, visibility, and momentum \u2014 built by someone who actually understands your business model, not a freelancer who showed up for one project.",
    color: "var(--color-brass)",
  },
  {
    id: "maintain",
    index: "03",
    name: "Maintain",
    tagline: "Keep the business standing.",
    description: "The ongoing work nobody else talks about. The reason most small businesses fail in years 2\u20135.",
    icon: "shield",
    included: [
      "Monthly Bookkeeping & Accounting",
      "Annual Report Filings & Compliance Monitoring",
      "Fractional CFO Services (Forecasting, KPIs, Lender Reporting)",
      "Tax Planning & CPA Coordination",
      "Ongoing Compliance Monitoring",
      "Business Valuation",
      "Succession & Exit Planning",
      "Quarterly Business Reviews",
    ],
    closingLine: "Formation is a day. Growth is a season. Maintenance is the life of your business \u2014 and nobody else stays for it.",
    color: "var(--color-sage)",
  },
];

export type Testimonial = { quote: string; name: string; role: string; location: string; detail: string; };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "617 East Trust helped me form my LLC, build my first real website, and secure an SBA loan \u2014 all in the same quarter. Robert at the cabinetry shop referred me, and I\u2019m referring everyone I know.",
    name: "Sarah M.", role: "Retail Owner", location: "Pinehurst, NC", detail: "Formation + Web + SBA Client",
  },
  {
    quote: "They didn\u2019t just file paperwork and leave. Six months in, they caught a compliance issue I didn\u2019t even know about. That\u2019s the difference.",
    name: "Robert M.", role: "Cabinetry Shop Owner", location: "Sandhills, NC", detail: "Formation + Maintain Client",
  },
  {
    quote: "The fractional CFO service changed how I run my business. I finally have forecasts I trust and someone who actually reads my numbers with me every quarter.",
    name: "James T.", role: "Service Company Owner", location: "Raleigh, NC", detail: "Fractional CFO + Maintain Client",
  },
  {
    quote: "I came for formation. I stayed for the bookkeeping. Best decision I made.",
    name: "Maria L.", role: "Restaurant Owner", location: "Fayetteville, NC", detail: "Formation + Maintain Client",
  },
];

export const HERO_TRUST_SIGNALS: Testimonial[] = [
  { quote: "They treated my business like it mattered.", name: "Sarah M.", role: "", location: "Pinehurst, NC", detail: "" },
  { quote: "Finally, someone who answers the phone.", name: "James T.", role: "", location: "Raleigh, NC", detail: "" },
  { quote: "Caught a compliance issue I didn\u2019t even know about.", name: "Robert M.", role: "", location: "Sandhills, NC", detail: "" },
];

export const COMPARISON_ROWS: { label: string; platform: string; consultant: string; trust: string }[] = [
  { label: "Formation", platform: "\u2713", consultant: "\u2713", trust: "\u2713" },
  { label: "Compliance Setup", platform: "Partial", consultant: "\u2713", trust: "\u2713" },
  { label: "SBA Consulting", platform: "\u2717", consultant: "Sometimes", trust: "\u2713" },
  { label: "Web & SEO", platform: "\u2717", consultant: "Sometimes", trust: "\u2713" },
  { label: "Credit Building", platform: "\u2717", consultant: "Rarely", trust: "\u2713" },
  { label: "Bookkeeping", platform: "\u2717", consultant: "Sometimes", trust: "\u2713" },
  { label: "Fractional CFO", platform: "\u2717", consultant: "\u2717", trust: "\u2713" },
  { label: "Ongoing Compliance", platform: "\u2717", consultant: "\u2717", trust: "\u2713" },
  { label: "Tax Coordination", platform: "\u2717", consultant: "Sometimes", trust: "\u2713" },
  { label: "Valuation & Succession", platform: "\u2717", consultant: "\u2717", trust: "\u2713" },
  { label: "Stays After Paperwork", platform: "\u2717", consultant: "Rarely", trust: "\u2713" },
  { label: "Clear, Upfront Pricing", platform: "\u2713", consultant: "Rarely", trust: "\u2713" },
  { label: "Charlotte Banking Experience", platform: "\u2717", consultant: "Rarely", trust: "\u2713" },
  { label: "Sandhills Roots", platform: "\u2717", consultant: "Sometimes", trust: "\u2713" },
];

export const STEPS: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Conversation", body: "We start with a conversation, not a form. Tell us about your business, your goals, your challenges. We\u2019ll tell you honestly if we can help and exactly how." },
  { num: "02", title: "Strategy", body: "We build a custom plan using the right mix of technology and human expertise. No templates. No one-size-fits-all." },
  { num: "03", title: "Partnership", body: "We execute fast, communicate clearly, and stick around. This isn\u2019t a transaction \u2014 it\u2019s a relationship." },
];

export const PROBLEM_STATS: { value: string; label: string; source?: string }[] = [
  { value: "20%", label: "of small businesses fail within the first two years", source: "BLS 2024" },
  { value: "50%", label: "fail by year five \u2014 most from operational drift, not bad ideas", source: "BLS 2024" },
  { value: "82%", label: "of small business failures trace back to cash flow problems", source: "U.S. Bank study" },
];

export const TRUST_BADGES: string[] = [
  "North Carolina Small Business Association Member",
  "Charlotte Chamber of Commerce",
  "Sandhills Business Network",
  "BBB A+ Rating",
  "Google 5-Star Rating",
];

export const CREDENTIALS: string[] = [
  "15+ years in Charlotte commercial banking",
  "UNC Charlotte graduate",
  "Sandhills, NC native and current resident",
  "SBA lending expertise from the lender side",
  "Web development and SEO certification",
  "Credit repair specialist certification",
];

export const FAQ_ITEMS: { q: string; a: string }[] = [
  { q: "How do I qualify for an SBA loan in North Carolina?", a: "To qualify for an SBA loan in North Carolina, your business must be for-profit, operate in the US, have reasonable owner equity to invest, and have exhausted other financing options. 617 East Trust helps you assess eligibility and navigate the application process for SBA 7(a), 504, and Microloan programs." },
  { q: "How long does credit repair take?", a: "Credit repair timelines vary based on the nature of the negative items on your report. Most clients see measurable improvements within 30\u201390 days. Under the Fair Credit Reporting Act, credit bureaus have 30 days to investigate disputes." },
  { q: "Does 617 East Trust guarantee credit repair results?", a: "No. Under the Credit Repair Organizations Act (CROA), no credit repair company may legally guarantee removal of accurate negative information. 617 East Trust provides legal dispute services under the Fair Credit Reporting Act." },
  { q: "What credit score is needed for an SBA 7(a) loan?", a: "Most SBA 7(a) lenders look for a personal credit score of at least 640\u2013680, though requirements vary by lender and loan amount. Business credit history, cash flow, and collateral also factor into approval." },
  { q: "How is 617 East Trust different from LegalZoom?", a: "Unlike national platforms, 617 East Trust provides personalized, hands-on support from a team with 15+ years of Charlotte commercial banking experience. We answer the phone, know the local SBA lenders personally, and stay with you after the paperwork is done." },
];

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Our Story", href: "/about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export const SITE = {
  name: "617 East Trust",
  domain: "617east.com",
  phone: "(910) 315-1800",
  phoneHref: "tel:+19103151800",
  email: "hello@617east.com",
  emailHref: "mailto:hello@617east.com",
  smsHref: "sms:+19103151800",
  location: "Sandhills, North Carolina",
  servingArea: "Based in the Sandhills. Serving the Sandhills, Raleigh, and Fayetteville regions.",
  thesis: "Technology builds fast. People build trust.",
  thesisFull: "Technology builds fast. People build trust. We\u2019re the people.",
  preHeader: "Form. Grow. Maintain.",
  trustBar: "Real People. Real Answers. Every time.",
  logoMark: "Form. Grow. Maintain.",
  founder: {
    name: "Lamont Legrand",
    photo: "/images/founder.jpg",
    linkedin: "",
    bio: "15+ years in Charlotte commercial banking. UNC Charlotte graduate. Sandhills native."
  },
  address: {
    street: "[STREET ADDRESS — ADD YOURS]",
    locality: "Sandhills",
    region: "NC",
    postalCode: "[ZIP]",
    country: "US",
    full: "Sandhills, North Carolina"
  },
  phases: PHASES,
  testimonials: TESTIMONIALS,
  trustBadges: TRUST_BADGES,
  heroTrustSignals: HERO_TRUST_SIGNALS,
  howItWorks: STEPS,
  services: PHASES.map((p) => ({ slug: p.id, name: p.name })),
  ogImage: "https://617east.com/og-image.jpg",
} as const;
