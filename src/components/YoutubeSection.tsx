"use client";

import { useEffect, useState } from "react";
import { YOUTUBE_CONTENT } from "@/data/content";

const GRADIENTS = [
  "from-pink-300 via-rose-200 to-amber-100",
  "from-yellow-200 via-amber-100 to-orange-200",
  "from-sky-200 via-indigo-100 to-violet-200",
];

export default function YoutubeSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % YOUTUBE_CONTENT.thumbnails.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const thumb = YOUTUBE_CONTENT.thumbnails[active];

  return (
    <section className="bg-[var(--color-peach-100)] py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-sm italic tracking-wide text-ink-soft/70">
          {YOUTUBE_CONTENT.eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          {YOUTUBE_CONTENT.titleMain} <span className="text-accent">{YOUTUBE_CONTENT.titleAccent}</span>
        </h2>

        <div
          key={active}
          className={`animate-fade-up relative mt-8 flex aspect-video w-full items-end justify-start overflow-hidden rounded-2xl bg-gradient-to-br p-5 shadow-lg ${GRADIENTS[active]}`}
        >
          <div className="rounded-lg bg-black/70 px-3 py-1.5 text-left text-white">
            <p className="text-sm font-bold">{thumb.title}</p>
            <p className="text-xs text-white/80">{thumb.subtitle}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {YOUTUBE_CONTENT.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <a
          href="#portfolio"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-peach-300)] px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
        >
          {YOUTUBE_CONTENT.cta} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
