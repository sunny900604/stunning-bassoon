"use client";

import { useEffect, useState } from "react";
import { PARTNERS, STATS } from "@/data/content";

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useLiveNumber(min: number, max: number, intervalMs: number) {
  // Start from a deterministic value so server and client markup match on
  // first render; randomize only after mount, purely on the client.
  const [value, setValue] = useState(Math.round((min + max) / 2));

  useEffect(() => {
    const id = setInterval(() => {
      setValue(randomInRange(min, max));
    }, intervalMs);
    return () => clearInterval(id);
  }, [min, max, intervalMs]);

  return value;
}

function StatCard({
  label,
  min,
  max,
  delay,
}: {
  label: string;
  min: number;
  max: number;
  delay: number;
}) {
  const value = useLiveNumber(min, max, 2400 + delay);
  const digits = value.toLocaleString("ko-KR").length;
  return (
    <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
      <span
        key={value}
        className="animate-fade-up whitespace-nowrap font-display text-ink-soft transition-all"
        style={{ fontSize: digits > 8 ? "clamp(1.1rem, 5.2vw, 2.75rem)" : "clamp(1.6rem, 6vw, 3rem)" }}
      >
        {value.toLocaleString("ko-KR")}
      </span>
      <span className="text-sm font-semibold text-accent sm:text-base">{label}</span>
    </div>
  );
}

export default function StatsPartners() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-12 px-6 sm:gap-x-12 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.key} label={stat.label} min={stat.min} max={stat.max} delay={i * 300} />
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-gray-400">OUR PARTNERS</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
          올인스튜디오와{" "}
          <span className="text-accent">함께한 고객사.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
          올인스튜디오는 스타트업, 공공기관, 대기업 글로벌 대기업까지 다양한 고객을 대상으로
          맞춤형 영상제작 서비스를 제공합니다.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 px-6 sm:grid-cols-3 md:grid-cols-4">
        {PARTNERS.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center text-center text-sm font-semibold text-ink-soft/70 grayscale transition hover:text-ink hover:grayscale-0 sm:text-base"
          >
            {name}
          </div>
        ))}
      </div>
    </section>
  );
}
