"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Diagram } from "./Diagram";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", el);
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]", el);
      const mark = el.querySelector<HTMLElement>("[data-draw]");

      gsap.set(lines, { yPercent: 110 });
      gsap.set(fades, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ paused: true });
      tl.to(lines, {
        yPercent: 0,
        duration: 0.64,
        ease: "expo.out",
        stagger: 0.08,
      })
        .to(
          fades,
          { autoAlpha: 1, y: 0, duration: 0.36, ease: "expo.out", stagger: 0.08 },
          "-=0.28",
        )
        // 마킹 그어짐은 라인 리빌이 끝난 뒤 +160ms(§6.2)
        .call(() => mark?.setAttribute("data-drawn", "true"), undefined, "+=0.16");

      // 폰트 로드 전 시작하면 라인 높이가 바뀌어 마스크가 어긋난다(§2 게이트)
      document.fonts.ready.then(() => tl.play());
      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <Diagram />
      <div className="hero__inner">
        <p className="eyebrow" data-fade>
          Portfolio · 2026
        </p>

        <h1 className="hero__headline">
          <span className="line">
            <span data-line>설계하고, 지휘하고,</span>
          </span>
          <span className="line">
            <span data-line>
              <span className="mark" data-draw>
                끝까지 만듭니다.
              </span>
            </span>
          </span>
        </h1>

        <p className="hero__sub" data-fade>
          구조와 계약은 직접 잡습니다. 반복되는 구현은 AI 에이전트에게 나눠
          맡기고, 품질 게이트를 통과한 것만 남깁니다. 그렇게 만든 개인 프로젝트 4개가
          아래에 있습니다.
        </p>

        <div className="hero__actions" data-fade>
          <a className="btn btn--primary" href="#work">
            프로젝트 보기
          </a>
          <a
            className="btn btn--secondary"
            href="https://github.com/muhwa91"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗<span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>
      </div>

      <span className="hero__cue" aria-hidden="true">
        SCROLL ↓
      </span>
    </section>
  );
}
