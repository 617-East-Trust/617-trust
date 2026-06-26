import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

const SITE = {
  name: "617 East Trust",
  domain: "https://617east.com",
  ogImage: "https://617east.com/og-image.jpg",
};

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  "/": {
    title: `${SITE.name} | Business Formation, SBA Loans & Credit Repair — North Carolina`,
    desc: "617 East Trust: same-day business formation, SBA loan consulting, credit repair, and web design in Charlotte & the Sandhills, NC. 15+ years banking expertise. Call (910) 315-1800.",
  },
  "/about": {
    title: `About Us | ${SITE.name}`,
    desc: "We're a technology-powered business consulting firm built on old-fashioned relationships. Meet the team behind 617 East Trust.",
  },
  "/contact": {
    title: `Contact | ${SITE.name}`,
    desc: "Ready to grow your business? Contact 617 East Trust for business formation, SBA funding, or credit repair. Call (910) 315-1800.",
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE.name}`,
    desc: "Privacy Policy for 617 East Trust. Learn how we collect, use, and protect your personal information.",
  },
  "/terms": {
    title: `Terms of Service | ${SITE.name}`,
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
    <div className="min-h-screen flex flex-col bg-[var(--color-paper)]">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
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
  );
}
