"use client";

import { CONTACT_FEED, PORTFOLIO_ITEMS } from "@/data/content";

const CARD_GRADIENTS = [
  "from-neutral-700 via-neutral-600 to-neutral-800",
  "from-slate-200 via-white to-slate-300",
  "from-fuchsia-900 via-rose-800 to-orange-700",
  "from-emerald-200 via-teal-100 to-sky-200",
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[var(--color-peach-100)] via-[var(--color-peach-50)] to-[var(--color-peach-50)] pt-20 pb-16"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gray-500">CONTACT US</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          <span className="text-accent">올인스튜디오</span>
          <br />
          실시간 문의 현황.
        </h2>

        <ul className="mt-10 divide-y divide-black/5 rounded-2xl bg-white/60 text-left shadow-sm">
          {CONTACT_FEED.map((item) => (
            <li key={item.title} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="flex items-center gap-2 truncate text-sm text-ink-soft">
                <span aria-hidden>🔒</span>
                <span className="truncate">{item.title}</span>
              </span>
              <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>

        <a
          href="#quote"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-peach-400)] px-8 py-3.5 text-sm font-semibold text-ink shadow transition-transform hover:scale-105"
        >
          지금 바로 견적 받아보기 <span aria-hidden>→</span>
        </a>
      </div>

      <div id="portfolio" className="mt-16">
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`relative flex h-44 w-64 shrink-0 items-end overflow-hidden rounded-xl bg-gradient-to-br p-4 shadow ${CARD_GRADIENTS[i % CARD_GRADIENTS.length]}`}
            >
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-sm">
                ▶
              </span>
              <div className="text-white drop-shadow">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="line-clamp-2 text-xs text-white/85">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
