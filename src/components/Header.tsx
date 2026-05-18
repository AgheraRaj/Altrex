import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Company", href: "#" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-card !bg-background/70 !rounded-none border-b border-white/5" : "bg-transparent"
      }`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Button size="icon-lg" className="text-md">A</Button>

          <div className="hidden sm:block">
            <h1 className="text-md font-bold">
              Altrex Digital Platforms Pvt Ltd
            </h1>
            <p className="text-xs text-gray-500">Realtime Messaging Platform</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-medium">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button size="lg" variant="ghost">
            Sign In
          </Button>

          <Button size="lg">Get Started</Button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="flex items-center justify-center lg:hidden"
        >
          {mobileMenu ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="space-y-4 px-6 py-6">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm font-medium"
              >
                {item.name}
              </a>
            ))}

            <div className="flex flex-col gap-3 pt-4">
              <Button variant="ghost">
                Sign In
              </Button>

              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
