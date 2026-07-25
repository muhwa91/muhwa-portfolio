// 프로젝트 콘텐츠 — 타입드 TS 데이터(DESIGN §9.2). 순서·문구는 여기서 조정.
// 컨셉 C 는 악센트가 라임 단색이라 프로젝트별 `accent`·`tier` 필드를 두지 않는다
// (카드별 보더색이 필요해지면 그때 다시 넣는다 — 값 4개라 재추가 비용이 없다).

export type ProjectStatus = "live" | "structure" | "video" | "wip";

export interface ProjectLink {
  label: string;
  href: string;
  /** solid = 주 CTA, outline = 보조 */
  variant: "solid" | "outline";
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  stack: string;
  status: ProjectStatus;
  /** 상태 배지 텍스트(색맹 대비: 색+텍스트+형태) */
  statusLabel: string;
  links: ProjectLink[];
  /** 미디어 — 실제 캡처는 나중, 지금은 악센트 단색 플레이스홀더 캡션 */
  media: { alt: string; caption: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "ai-agent-workspace",
    name: "ai-agent-workspace",
    oneLiner:
      "헌법 하나로 14개 에이전트와 품질 게이트를 통제하는 개발 거버넌스 시스템",
    stack: "Claude Code · MCP · 거버넌스",
    status: "structure",
    statusLabel: "공개 레포",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/ai-agent-workspace", variant: "solid" },
    ],
    media: {
      alt: "ai-agent-workspace 거버넌스 시스템 플레이스홀더",
      caption: "AGENT GOVERNANCE",
    },
  },
  {
    slug: "trading_info",
    name: "trading_info",
    oneLiner: "미국·국내 주식 실시간 모니터링 + 원화 통합 포트폴리오 트래커",
    stack: "Laravel · Vue · TiDB · WebSocket",
    status: "live",
    statusLabel: "매일 사용 중",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/trading_info", variant: "solid" },
    ],
    media: {
      alt: "trading_info 실시간 모니터링·포트폴리오 대시보드 플레이스홀더",
      caption: "REALTIME PORTFOLIO",
    },
  },
  {
    slug: "etf_info",
    name: "etf_info",
    oneLiner: "TIGER ETF 실시간 NAV·괴리율 시뮬레이터",
    status: "live",
    stack: "Python · KIS/Yahoo API",
    statusLabel: "매일 자동 실행",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/etf_info", variant: "solid" },
    ],
    media: {
      alt: "etf_info NAV·괴리율 시뮬레이터 화면 플레이스홀더",
      caption: "ETF NAV SIMULATOR",
    },
  },
  {
    slug: "pdf_restyler",
    name: "pdf_restyler",
    oneLiner: "PDF의 텍스트·색상을 직접 편집·치환하는 데스크톱 앱",
    stack: "Python · PySide6 · PyMuPDF",
    status: "structure",
    statusLabel: "완성 · 배포됨",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/pdf_restyler", variant: "solid" },
    ],
    media: {
      alt: "pdf_restyler PDF 편집 화면 플레이스홀더",
      caption: "PDF TEXT EDITOR",
    },
  },
];
