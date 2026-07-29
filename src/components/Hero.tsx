"use client";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#8fa4b3] via-[#aebcc6] to-[#e8ecee]"
    >
      {/* giant background watermark text, like the source site's oversized cropped word */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="whitespace-nowrap font-display text-[26vw] leading-none text-white/10">
          VISION
        </span>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <p className="animate-fade-up text-sm font-medium tracking-wide text-white/90 sm:text-base">
          당신이 상상하는 영상제작, 모든것을 완벽히 현실로
        </p>
        <h1
          className="animate-fade-up mt-4 font-display leading-[1.05] text-white"
          style={{ animationDelay: "0.15s", fontSize: "clamp(2.5rem, 11vw, 4.75rem)" }}
        >
          ALL IN ON YOUR VISON
        </h1>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/85">
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/70 p-1">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        <span className="animate-bounce-down text-lg leading-none">⌄</span>
      </div>
    </section>
  );
}
