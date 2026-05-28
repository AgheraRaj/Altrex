import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ChevronRight, Zap } from "lucide-react";
import ShinyText from "@/components/ShinyText";
import ClickSpark from "@/components/ClickSpark";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FooterLinkItem {
  label: string;
  href: string;
  internal: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLinkItem[];
}

const footerSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/product", internal: true },
      { label: "Pricing", href: "/pricing", internal: true },
      { label: "Integrations", href: "/product", internal: true },
      { label: "Changelog", href: "#", internal: false },
      { label: "Roadmap", href: "#", internal: false },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#", internal: false },
      { label: "API Reference", href: "#", internal: false },
      { label: "Community", href: "#", internal: false },
      { label: "Blog", href: "#", internal: false },
      { label: "Status Page", href: "#", internal: false },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about", internal: true },
      { label: "Careers", href: "/company", internal: true },
      { label: "Contact", href: "/company", internal: true },
      { label: "Privacy Policy", href: "#", internal: false },
      { label: "Terms of Service", href: "#", internal: false },
    ],
  },
];

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-violet-900/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full bg-fuchsia-900/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Altrex</p>
                <p className="text-sm font-semibold text-gray-300">Digital Platforms</p>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-base leading-8 text-gray-300">
              Build scalable realtime applications with modern messaging, IoT connectivity, and distributed cloud infrastructure.
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-3">
                Stay updated
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  className="text-base text-white placeholder:text-gray-300 focus:border-violet-500/50 focus:outline-none transition-colors w-full p-5"
                />
                <ClickSpark sparkColor="#8b5cf6" sparkCount={6}>
                  <Button variant="secondary" size="lg" className="p-5 tetx-base font-semibold">
                    Subscribe
                  </Button>
                </ClickSpark>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">
                Follow us
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { icon: <FaGithub className="h-4 w-4" />, href: "#", label: "GitHub" },
                  { icon: <FaXTwitter className="h-4 w-4" />, href: "#", label: "Twitter" },
                  { icon: <FaLinkedinIn className="h-4 w-4" />, href: "#", label: "LinkedIn" },
                  { icon: <FiMail className="h-4 w-4" />, href: "#", label: "Email" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-5">
                {section.title}
              </p>
              <div className="space-y-3">
                {section.links.map((link) => {
                  const isHovered = hoveredLink === link.label;
                  const linkContent = (
                    <span className="inline-flex items-center gap-2 text-base text-gray-300 transition-colors duration-200 hover:text-white">
                      {link.label}
                      <AnimatePresence>
                        {isHovered ? (
                          <motion.span
                            key="chevron"
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  );

                  return link.internal ? (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="block"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {linkContent}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {linkContent}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 py-8">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © 2026 Altrex Digital Platforms Pvt Ltd. All rights reserved.
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Made with ♥ in Ahmedabad, India
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "SOC2 Compliant",
              "GDPR Ready",
              "99.99% Uptime",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-300"
              >
                {badge}
              </span>
            ))}
          </div>

          <ShinyText
            text="Realtime infrastructure for the modern world"
            speed={4}
            color="#4b5563"
            shineColor="#8b5cf6"
            spread={160}
            className="text-sm font-medium"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
