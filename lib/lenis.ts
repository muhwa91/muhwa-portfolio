import type Lenis from "lenis";

// SmoothScroll이 만든 Lenis 인스턴스 공유 — 슬라이더의 프로그램 네비(불릿·키보드·오토플레이)가
// 스크롤을 Lenis로 움직여야 pin·snap과 충돌하지 않는다(직접 window.scrollTo는 Lenis가 되돌림).
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
