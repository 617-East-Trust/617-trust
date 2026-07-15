import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import ThankYou from "@/pages/ThankYou";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
// Sprint 2 service pages
import LlcFormationNorthCarolinaService from "@/pages/LlcFormationNorthCarolinaService";
import SbaLoansNorthCarolinaService from "@/pages/SbaLoansNorthCarolinaService";
import CreditRepairNorthCarolinaService from "@/pages/CreditRepairNorthCarolinaService";
import BookkeepingNorthCarolinaService from "@/pages/BookkeepingNorthCarolinaService";
import FractionalCfoService from "@/pages/FractionalCfoService";
import WebDesignSeoService from "@/pages/WebDesignSeoService";
import SmoothScroll from "@/components/SmoothScroll";
import GrainOverlay from "@/components/GrainOverlay";
import LoadingSequence from "@/components/LoadingSequence";
import CustomCursor from "@/components/CustomCursor";

const SITE = {
  name: "617 East Trust",
  domain: "https://617east.com",
  ogImage: "https://617east.com/og-image.jpg",
};

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  "/": {
    title: `617 East Trust | Business Formation & SBA Loans — NC`,
    desc: "617 East Trust: same-day business formation, SBA loan consulting, credit repair, and web design in Charlotte & the Sandhills, NC. 15+ years banking expertise. Call (910) 315-1800.",
  },
  "/about": {
    title: `About | 617 East Trust — Sandhills, NC`,
    desc: "We're a technology-powered business consulting firm built on old-fashioned relationships. Meet the team behind 617 East Trust.",
  },
  "/services": {
    title: `Services | 617 East Trust — Sandhills, NC`,
    desc: "LLC formation, SBA loan consulting, credit repair, bookkeeping, fractional CFO, and web design — all under one roof for North Carolina businesses.",
  },
  "/services/llc-formation-north-carolina": {
    title: `LLC Formation NC | 617 East Trust`,
    desc: "Same-day North Carolina LLC and corporation registration. Registered agent service, EIN application, operating agreements, and ongoing compliance. Starting at $299+state fees.",
  },
  "/services/sba-loans-north-carolina": {
    title: `SBA Loans NC | 617 East Trust`,
    desc: "SBA 7(a), 504, and Microloan consulting for North Carolina businesses. Lender connections, financial documentation, and application support. 15+ years banking expertise.",
  },
  "/services/credit-repair-north-carolina": {
    title: `Credit Repair NC | 617 East Trust`,
    desc: "FCRA-compliant credit report analysis, dispute processing, and credit-building strategy. Legal services under the Fair Credit Reporting Act. No guarantees, real results.",
  },
  "/services/bookkeeping-north-carolina": {
    title: `Bookkeeping NC | 617 East Trust`,
    desc: "Monthly bookkeeping for NC small businesses: bank reconciliation, financial statements, AP/AR, expense categorization, and year-end CPA-ready package. Starting at $199/month.",
  },
  "/services/fractional-cfo": {
    title: `Fractional CFO | 617 East Trust`,
    desc: "Strategic fractional CFO for NC businesses $500K-$5M. Forecasting, KPI dashboards, lender reporting, and scenario modeling. Starting at $1,200/month for 4 hrs/week.",
  },
  "/services/web-design-seo": {
    title: `Web Design & SEO NC | 617 East Trust`,
    desc: "Custom web design and SEO for NC businesses. Fast, mobile-responsive websites with on-page SEO, Google Business Profile, and content strategy. Starting at $1,500.",
  },
  "/contact": {
    title: `Contact | 617 East Trust`,
    desc: "Ready to grow your business? Contact 617 East Trust for business formation, SBA funding, or credit repair. Call (910) 315-1800.",
  },
  "/thank-you": {
    title: `Thank You | 617 East Trust`,
    desc: "Your message has been received. A real person will reach out within one business day.",
  },
  "/privacy": {
    title: `Privacy Policy | 617 East Trust`,
    desc: "Privacy Policy for 617 East Trust. Learn how we collect, use, and protect your personal information.",
  },
  "/terms": {
    title: `Terms of Service | 617 East Trust`,
    desc: "Terms of Service for 617 East Trust. Read our terms and conditions.",
  },
};

function setMetaTag(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = url;
}

export default function App() {
  const [location] = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[location] || ROUTE_META["/"];
    const url = `${SITE.domain}${location === "/" ? "/" : location}`;

    document.title = meta.title;
    setMetaTag("description", meta.desc);
    setCanonical(url);
    setMetaTag("og:title", meta.title, true);
    setMetaTag("og:description", meta.desc, true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:image", SITE.ogImage, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:site_name", SITE.name, true);
    setMetaTag("og:locale", "en_US", true);
    setMetaTag("twitter:title", meta.title);
    setMetaTag("twitter:description", meta.desc);
    setMetaTag("twitter:image", SITE.ogImage);
  }, [location]);

  return (
    <SmoothScroll>
      <LoadingSequence />
      <GrainOverlay />
      <CustomCursor />
      <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/services/llc-formation-north-carolina" component={LlcFormationNorthCarolinaService} />
            <Route path="/services/sba-loans-north-carolina" component={SbaLoansNorthCarolinaService} />
            <Route path="/services/credit-repair-north-carolina" component={CreditRepairNorthCarolinaService} />
            <Route path="/services/bookkeeping-north-carolina" component={BookkeepingNorthCarolinaService} />
            <Route path="/services/fractional-cfo" component={FractionalCfoService} />
            <Route path="/services/web-design-seo" component={WebDesignSeoService} />
            <Route path="/contact" component={Contact} />
            <Route path="/thank-you" component={ThankYou} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route>
              <Home />
            </Route>
          </Switch>
        </main>
        <Footer />
        <MobileCTABar />
      </div>
    </SmoothScroll>
  );
}
