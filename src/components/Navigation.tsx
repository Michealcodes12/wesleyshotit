"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navLinks = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Highlights", href: "/highlight" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Book Now", href: "/booking", isButton: true },
  ];

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(26, 32, 27, 0.98)"], // Using #1a201b
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        style={{ backgroundColor }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
          isScrolled ? "py-4 border-b border-white/5" : "py-8",
        )}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="z-50 flex items-center gap-4 text-xl tracking-[0.5em] font-light text-white uppercase"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo.PNG"
              alt="Wesleyshotit Logo"
              width={30}
              height={30}
              style={{ height: "auto", width: "auto" }}
              className="object-contain"
            />
            <span className="hidden md:block">wesleyshot_prod.</span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.3em] uppercase font-medium text-white/70">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "hover:text-white transition-colors",
                  link.isButton &&
                    "px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all",
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* Mobile Menu Toggle */}
          <button
            className="z-50 md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-primary flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-2xl tracking-[0.3em] font-light text-white uppercase hover:text-secondary transition-colors",
                      link.isButton &&
                        "px-10 py-4 border border-white/20 text-lg",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer in Menu */}
            <div className="absolute bottom-20 text-center">
              <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase">
                Based in Benin City
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
