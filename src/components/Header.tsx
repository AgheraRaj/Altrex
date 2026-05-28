import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import ClickSpark from "@/components/ClickSpark";
import { Menu, X, Zap } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  hasBadge?: boolean;
}

const navItems: NavItem[] = [
  { name: "About", href: "/about" },
  { name: "Products", href: "/product", hasBadge: true },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Company", href: "/company" },
];

const mobileListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-18 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 border-b border-gray-100 shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_4px_24px_rgba(139,92,246,0.04)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-md shadow-violet-200 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold text-gray-900">Altrex</p>
              <p className="text-xs font-medium text-gray-400">Digital Platforms</p>
            </div>
          </div>
        </Link>

        <nav className="hidden flex-1 justify-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive ? "text-violet-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.name}
                    {item.hasBadge ? (
                      <Badge className="bg-violet-100 text-violet-600">
                        New
                      </Badge>
                    ) : null}
                  </span>
                </Link>
                {isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-0 transition-opacity duration-200 group-hover:opacity-40" />
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button size="lg" variant="ghost" className="p-5">
            Sign In
          </Button>

          <ClickSpark sparkColor="#8b5cf6" sparkCount={8}>
            <Button size="lg" className="p-5">
              Get Started
            </Button>
          </ClickSpark>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/90 p-2 text-gray-700 shadow-sm shadow-gray-200/50 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl px-6 py-6 shadow-lg shadow-gray-200/50"
          >
            <motion.ul initial="hidden" animate="visible" exit="hidden" variants={mobileListVariants} className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.li key={item.name} variants={mobileItemVariants} className="border-b border-gray-50 last:border-0">
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-base transition-colors duration-200 ${
                        isActive ? "font-semibold text-violet-600" : "text-gray-700 hover:text-violet-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="mt-4 flex flex-col gap-3">
              <Button variant="outline" className="w-full rounded-xl border-gray-200 px-5 py-3 text-sm text-gray-700 hover:text-violet-600">
                Sign In
              </Button>
              <ClickSpark sparkColor="#8b5cf6" sparkCount={8}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </ClickSpark>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Header;
