"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

// Lenis 스무스 스크롤(DESIGN §5.1).
// 자체 rAF 대신 gsap.ticker 하나로 Lenis 를 구동한다 — 페이지에 rAF 루프를 둘로 만들지 않기 위해서.
//
// ponytail: 예전엔 ScrollTrigger.update 를 Lenis 스크롤에 물려뒀지만,
// 리빌을 rAF+rect 방식으로 바꾼 뒤로 ScrollTrigger 를 쓰는 곳이 하나도 없어 걷어냈다.
// ScrollTrigger 를 다시 도입하면 `lenis.on("scroll", ScrollTrigger.update)` 를 반드시 함께 붙일 것
// — 안 붙이면 스크럽이 네이티브 스크롤 기준으로 튄다.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis();

    const update = (time: number) => lenis.raf(time * 1000); // gsap.ticker 초 → Lenis ms
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // 프레임 스킵 방지

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
