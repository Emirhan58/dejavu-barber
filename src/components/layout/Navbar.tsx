"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { NAV_ITEMS, CTA_TEXT, BUSINESS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { MobileMenu } from "./MobileMenu";

const SCROLL_SPY_IDS = ["hakkimizda", "hizmetler", "iletisim"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SCROLL_SPY_IDS);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  }

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: scrolled
            ? "rgba(28, 20, 16, 0.95)"
            : "rgba(28, 20, 16, 0)",
          borderColor: scrolled
            ? "rgba(212, 175, 55, 0.1)"
            : "rgba(212, 175, 55, 0)",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-40 border-b ${
          scrolled ? "backdrop-blur-md" : ""
        }`}
      >
        {/* Desktop navbar */}
        <div className="hidden md:flex items-center justify-between h-16 max-w-[var(--container-content)] mx-auto px-6">
          {/* Logo */}
          <Link href="/" className="font-display text-lg text-white neon-glow">
            DEJAVU
          </Link>

          {/* Nav items */}
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.startsWith("#")
                ? item.href.slice(1)
                : null;
              const isActive = sectionId && activeSection === sectionId;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="relative text-sm font-bold uppercase tracking-wider text-cream hover:text-white transition-colors py-2"
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-neon-red"
                      style={{ boxShadow: "var(--shadow-neon)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon-red text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded hover:brightness-110 transition-all"
          >
            {CTA_TEXT}
          </a>
        </div>

        {/* Mobile navbar */}
        <div className="flex md:hidden items-center justify-between h-12 px-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-base text-white neon-glow"
          >
            DEJAVU
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
            className="flex items-center justify-center w-11 h-11 text-cream"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
