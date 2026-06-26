/**
 * 617 East Trust — centralized brand + content data.
 * Updated: Form / Grow / Maintain three-phase positioning.
 */

export type Phase = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  included: string[];
  closingLine: string;
  color: string; // CSS var token for accent color
};

export const PHASES: Phase[] = [
  {
    id: "form",
    index: "01",
    name: "Form",
    tagline: "Get the business standing.",
    description:
      "The foundation work most consultants do — and then abandon.",
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
    closingLine:
      "You don't just get filed. You get positioned — legally, financially, and operationally — for what comes next.",
    color: "var(--color-drafting-blue)",
  },
  {
    id: "grow",
    index: "02",
    name: "Grow",
    tagline: "Get the business moving.",
    description:
      "The momentum work that separates real businesses from hobbies.",
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
    closingLine:
      "Funding, visibility, and momentum — built by someone who actually understands your business model, not a freelancer who showed up for one project.",
    color: "var(--color-brass)",
  },
  {
    id: "maintain",
    index: "03",
    name: "Maintain",
    tagline: "Keep the business standing.",
    description:
      "The ongoing work nobody else talks about. The reason most small businesses fail in years 2–5. The difference between a business that survives and one that endures.",
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
    closingLine:
      "Formation is a day. Growth is a season. Maintenance is the life of your business — and nobody else stays for it.",
    color: "var(--color-sage)",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  detail: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "617 East Trust helped me form my LLC, build my first real website, and secure an SBA loan — all in the same quarter. Robert at the cabinetry shop referred me, and I'm referring everyone I know.",
    name: "Sarah M.",
    role: "Retail Owner",
    location: "Pinehurst, NC",
    detail: "Formation + Web + SBA Client",
  },
  {
    quote:
      "They didn't just file paperwork and leave. Six months in, they caught a compliance issue I didn't even know about. That's the difference.",
    name: "Robert M.",
    role: "Cabinetry Shop Owner",
    location: "Sandhills, NC",
    detail: "Formation + Maintain Client",
  },
  {
    quote:
      "The fractional CFO service changed how I run my business. I finally have forecasts I trust and someone who actually reads my numbers with me every quarter.",
    name: "James T.",
    role: "Service Company Owner",
    location: "Raleigh, NC",
    detail: "Fractional CFO + Maintain Client",
  },
  {
    quote:
      "I came for formation. I stayed for the bookkeeping. Best decision I made.",
    name: "Maria L.",
    role: "Restaurant Owner",
    location: "Fayetteville, NC",
    detail: "Formation + Maintain Client",
  },
];

export const HERO_TRUST_SIGNALS: Testimonial[] = [
  { quote: "They treated my business like it mattered.", name: "Sarah M.", role: "", location: "Pinehurst, NC", detail: "" },
  { quote: "Finally, someone who answers the phone.", name: "James T.", role: "", location: "Raleigh, NC", detail: "" },
  { quote: "Caught a compliance issue I didn't even know about.", name: "Robert M.", role: "", location: "Sandhills, NC", detail: "" },
];

export const COMPARISON_ROWS: { label: string; platform: string; consultant: string; trust: string }[] = [
  { label: "Formation", platform: "✓", consultant: "✓", trust: "✓" },
  { label: "Compliance Setup", platform: "Partial", consultant: "✓", trust: "✓" },
  { label: "SBA Consulting", platform: "✗", consultant: "Sometimes", trust: "✓" },
  { label: "Web & SEO", platform: "✗", consultant: "Sometimes", trust: "✓" },
  { label: "Credit Building", platform: "✗", consultant: "Rarely", trust: "✓" },
  { label: "Bookkeeping", platform: "✗", consultant: "Sometimes", trust: "✓" },
  { label: "Fractional CFO", platform: "✗", consultant: "✗", trust: "✓" },
  { label: "Ongoing Compliance", platform: "✗", consultant: "✗", trust: "✓" },
  { label: "Tax Coordination", platform: "✗", consultant: "Sometimes", trust: "✓" },
  { label: "Valuation & Succession", platform: "✗", consultant: "✗", trust: "✓" },
  { label: "Stays After Paperwork", platform: "✗", consultant: "Rarely", trust: "✓" },
  { label: "Clear, Upfront Pricing", platform: "✓", consultant: "Rarely", trust: "✓" },
  { label: "Charlotte Banking Experience", platform: "✗", consultant: "Rarely", trust: "✓" },
  { label: "Sandhills Roots", platform: "✗", consultant: "Sometimes", trust: "✓" },
];

export const STEPS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Conversation",
    body: "We start with a conversation, not a form. Tell us about your business, your goals, your challenges. We'll tell you honestly if we can help and exactly how.",
  },
  {
    num: "02",
    title: "Strategy",
    body: "We build a custom plan using the right mix of technology and human expertise. No templates. No one-size-fits-all. Your business is unique — your solution should be too.",
  },
  {
    num: "03",
    title: "Partnership",
    body: "We execute fast, communicate clearly, and stick around. This isn't a transaction — it's a relationship. When you need us next month or next year, we're here.",
  },
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
  thesisFull: "Technology builds fast. People build trust. We're the people.",
  preHeader: "Form. Grow. Maintain.",
  trustBar: "Real People. Real Answers. Every time.",
  logoMark: "Form. Grow. Maintain.",
  phases: PHASES,
  testimonials: TESTIMONIALS,
  trustBadges: TRUST_BADGES,
  credentials: CREDENTIALS,
} as const;
