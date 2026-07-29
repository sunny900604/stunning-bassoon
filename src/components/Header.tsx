"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-white/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight text-ink">allin</span>
          <span className="text-[10px] tracking-[0.35em] text-gray-500">studio</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                i === 0 ? "text-accent" : "text-ink-soft"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-peach-300 px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105 sm:flex"
          >
            제작문의 <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-6 bg-ink transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-5 pb-4 md:hidden">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-3 text-sm font-medium ${
                i === 0 ? "text-accent" : "text-ink-soft"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-peach-300 px-5 py-3 text-center text-sm font-semibold text-ink"
          >
            제작문의 →
          </a>
        </nav>
      )}
    </header>
  );
}
