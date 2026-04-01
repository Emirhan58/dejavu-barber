"use client";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { NAV_ITEMS, CTA_TEXT, BUSINESS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string | null;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      onClose();
      const el = document.getElementById(href.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-base-dark flex flex-col"
        >
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between h-12 px-4">
            <Logo height={28} />
            <button
              onClick={onClose}
              aria-label="Menuyu kapat"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-2">
            {NAV_ITEMS.map((item, i) => {
              const sectionId = item.href.startsWith("#")
                ? item.href.slice(1)
                : null;
              const isActive = sectionId && activeSection === sectionId;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`block py-3 px-6 text-base font-bold text-cream uppercase tracking-wider ${
                      isActive
                        ? "border-l-2 border-gold text-white"
                        : "border-l-2 border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + NAV_ITEMS.length * 0.05 }}
              className="mt-6 w-full px-8"
            >
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="block w-full bg-gold text-base-dark text-center font-bold uppercase tracking-wider py-3 rounded"
              >
                {CTA_TEXT}
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
