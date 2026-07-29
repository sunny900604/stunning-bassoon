"use client";

import { useState } from "react";
import { FOOTER } from "@/data/content";

export default function Footer() {
  const [showBizInfo, setShowBizInfo] = useState(false);

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-3xl space-y-1.5 px-6 py-10 text-sm text-ink-soft">
        <p>
          <span className="font-semibold text-ink">Address</span> {FOOTER.address}
        </p>
        <p>
          <span className="font-semibold text-ink">Tel</span> {FOOTER.tel}
        </p>
        <p>
          <span className="font-semibold text-ink">Email</span> {FOOTER.email}
        </p>
        <p>
          <span className="font-semibold text-ink">Business license</span> {FOOTER.license}
        </p>
        <p className="pt-4 text-xs leading-relaxed text-gray-400">{FOOTER.copyright}</p>
      </div>

      <div className="bg-[var(--color-bar-black)] py-8 text-center text-white/70">
        <button
          type="button"
          onClick={() => setShowBizInfo((v) => !v)}
          className="mx-auto flex items-center gap-1 text-xs underline underline-offset-2"
        >
          {showBizInfo ? "사업자 정보 숨기기" : "PC 모드로 보기"}
        </button>

        {showBizInfo && (
          <div className="mx-auto mt-6 max-w-md space-y-2 px-6 text-left text-xs leading-relaxed">
            <p>
              상호명: {FOOTER.bizName} 대표자: {FOOTER.ceo}
            </p>
            <p>연락처: {FOOTER.ceoPhone}</p>
            <p>대표자 이메일: {FOOTER.ceoEmail}</p>
            <p>호스팅 제공자: {FOOTER.hosting}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
