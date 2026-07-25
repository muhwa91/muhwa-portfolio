import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Pretendard 가변 — 한글·라틴 **단일 서체**(DESIGN §2).
// 국내에서 가장 널리 쓰이는 본문 서체라 "AI가 고른 폰트" 인상이 없다.
// 한글이 이미 이 서체로 렌더되고 있었으므로 라틴까지 통일하면 획 굵기·높이가 맞아 섞인 문장이 고르다.
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

// JetBrains Mono — 라벨·수치·다이어그램용. 개발자에게 가장 익숙한 mono.
// (옛 Space Mono 는 레트로 개성이 강해 이 화면에서 튀었다.)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My portfolio-hub",
  description:
    "설계하고, 지휘하고, 끝까지 만듭니다. 구조와 계약은 직접 잡고 반복 구현은 AI 에이전트에 나눠 맡겨 만든 네 개의 개인 프로젝트.",
};

// 다크 단일 사이트 — 브라우저 UI(주소창·스크롤바·네이티브 컨트롤)까지 다크로 맞춘다.
// 이게 없으면 다크 페이지에 흰 스크롤바가 붙는다(실측).
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08090a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
