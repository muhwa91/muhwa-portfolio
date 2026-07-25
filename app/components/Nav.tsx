"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "how", label: "How" },
  { id: "about", label: "About" },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      el.dataset.scrolled = String(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 현재 섹션 표시 — 화면 중앙선을 지난 마지막 섹션이 활성(§5.9)
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (s): s is HTMLElement => Boolean(s),
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // 벗어날 때 해제까지 해야 한다 — 안 하면 히어로로 돌아와도 마지막 섹션이 켜진 채 남는다
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // ponytail: 커스텀 포커스 트랩 대신 <dialog>.showModal() — Esc·트랩·포커스 복귀가 전부 네이티브.
  const openSheet = () => sheet.current?.showModal();
  const closeSheet = () => sheet.current?.close();

  return (
    <>
      <nav ref={ref} className="nav" aria-label="주요">
        {/* 브랜드 = GitHub 핸들 — 사이트와 저장소 정체성을 하나로 묶는다 */}
        <a className="nav__brand" href="#top" translate="no">
          muhwa91
        </a>

        <div className="nav__links">
          {LINKS.map((l) => (
            <a
              key={l.id}
              className="nav__link"
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
          <a
            className="nav__link"
            href="https://github.com/muhwa91"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗<span className="sr-only">(새 창에서 열림)</span>
          </a>
        </div>

        <button className="nav__toggle" type="button" onClick={openSheet}>
          MENU
        </button>
      </nav>

      <dialog ref={sheet} className="nav__sheet" aria-label="메뉴">
        <button className="nav__toggle" type="button" onClick={closeSheet}>
          CLOSE ✕
        </button>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={closeSheet}>
            {l.label}
          </a>
        ))}
        <a
          href="https://github.com/muhwa91"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeSheet}
        >
          GitHub ↗<span className="sr-only">(새 창에서 열림)</span>
        </a>
      </dialog>
    </>
  );
}
