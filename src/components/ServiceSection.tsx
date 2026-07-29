"use client";

import { useState } from "react";
import type { SERVICE_SECTIONS } from "@/data/content";

type Service = (typeof SERVICE_SECTIONS)[number];

export default function ServiceSection({ service }: { service: Service }) {
  const [playing, setPlaying] = useState(true);
  const isPeach = service.tone === "peach";

  return (
    <section
      id={service.id === "ads" ? "services" : undefined}
      className={isPeach ? "bg-[var(--color-peach-50)] py-20" : "bg-white py-20"}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-sm italic tracking-wide text-ink-soft/70">{service.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
          <span className="text-accent">{service.titleMain}</span>{" "}
          {service.titleAccent && <span className="text-ink">{service.titleAccent}</span>}
        </h2>

        <div
          className={`relative mt-8 flex aspect-video w-full items-start justify-start overflow-hidden rounded-2xl bg-gradient-to-br p-4 shadow-lg ${service.gradient}`}
        >
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white transition hover:bg-black/85"
          >
            <span aria-hidden>{service.toggleType === "mute" ? (playing ? "🔇" : "🔊") : playing ? "❚❚" : "▶"}</span>
            {service.toggleType === "mute" ? (playing ? "음소거 해제" : "음소거") : playing ? "일시정지" : "재생"}
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold text-ink-soft/70">
            {service.mediaCaption}
          </span>
        </div>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          {service.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <a
          href="#portfolio"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-peach-300)] px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-105"
        >
          {service.cta} <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
