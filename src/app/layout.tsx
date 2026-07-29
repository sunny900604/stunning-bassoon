import type { Metadata } from "next";
import { Noto_Sans_KR, Archivo_Black } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ALLIN STUDIO | 올인스튜디오",
  description:
    "당신이 상상하는 영상제작, 모든것을 완벽히 현실로. 올인스튜디오는 브랜드/기업홍보, 유튜브, 교육/공공기관 영상을 제작합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
