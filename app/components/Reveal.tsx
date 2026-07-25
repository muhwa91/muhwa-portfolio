"use client";

import { useEffect, useRef } from "react";

/**
 * 스크롤 리빌(DESIGN §6.4) — 섹션당 1그룹, 요소당 1회.
 *
 * ponytail: 이벤트(ScrollTrigger·IntersectionObserver)가 아니라 **위치를 직접 잰다**.
 * 둘 다 건너뛰기 사각지대가 있었다(실측):
 *   - ScrollTrigger `start:"top 85%"` → 페이지 최하단 요소는 그 선까지 못 올라와 영영 미발화.
 *   - IntersectionObserver → 앵커 점프·빠른 플릭으로 한 프레임에 지나가면 "겹친 적 없음"이라 콜백 자체가 없음.
 * 둘 다 결과가 **영구 공백**이라 애니메이션이 없느니만 못하다. 매 프레임 rect 를 재면
 * 어떻게 도달했든(점프·플릭·리사이즈) 화면에 들어온 순간 반드시 켜진다. 대상은 14개 남짓이라 비용도 없다.
 *
 * 숨김 상태는 JS 가 켤 때만 걸린다(`data-reveal-root`) — JS 실패·reduced-motion 이면
 * 아무 일도 하지 않고 콘텐츠는 처음부터 보인다.
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = new Set(el.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!pending.size) return;

    el.dataset.revealRoot = "true"; // 이때부터 CSS 가 숨김 상태를 건다

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const line = window.innerHeight * 0.92; // 살짝 올라오면 시작
      for (const item of [...pending]) {
        if (item.getBoundingClientRect().top < line) {
          item.dataset.shown = "true";
          pending.delete(item);
        }
      }
      if (!pending.size) detach();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    sweep(); // 첫 화면에 이미 들어와 있는 것들

    return () => {
      detach();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
