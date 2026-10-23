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
      "헌법 하나로 15개 에이전트와 품질 게이트를 통제하는 개발 거버넌스 시스템",
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
    slug: "trading-info",
    name: "trading-info",
    oneLiner: "미국·국내 주식 실시간 모니터링 + 원화 통합 포트폴리오 트래커",
    stack: "Laravel · Vue · TiDB · WebSocket",
    status: "live",
    statusLabel: "라이브 데모",
    links: [
      // muhwa-trading-info.vercel.app 은 특정 배포에 고정된 별칭이라 새 배포를 따라가지 않는다
      // (2026-07-26 실사고: 수정을 배포했는데 이 링크만 18시간 전 빌드를 계속 서빙).
      // trading-info-demo.vercel.app 은 프로덕션 자동 추적 주소다 — 이쪽을 쓴다.
      { label: "라이브 데모 ↗", href: "https://trading-info-demo.vercel.app", variant: "solid" },
      { label: "GitHub ↗", href: "https://github.com/muhwa91/trading-info", variant: "outline" },
    ],
    media: {
      alt: "trading-info 실시간 모니터링·포트폴리오 대시보드 플레이스홀더",
      caption: "REALTIME PORTFOLIO",
    },
  },
  {
    slug: "etf-info",
    name: "etf-info",
    oneLiner: "TIGER 미국우주테크 ETF 그날 예상 시가를 개장 전 텔레그램으로 알리는 예측 스크립트",
    status: "live",
    stack: "Python · KIS API · GitHub Actions · Apps Script",
    statusLabel: "매일 자동 실행",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/etf-info", variant: "solid" },
    ],
    media: {
      alt: "etf-info 예측 시가 대 실제 시가 화면 플레이스홀더",
      caption: "ETF OPEN FORECAST",
    },
  },
  {
    slug: "pdf-restyler",
    name: "pdf-restyler",
    oneLiner: "이름·직급·연락처만 넣으면 표준 명함 PDF를 만드는 데스크톱 앱",
    stack: "Python · PySide6 · PyMuPDF",
    status: "structure",
    statusLabel: "완성 · 배포됨",
    links: [
      { label: "GitHub ↗", href: "https://github.com/muhwa91/pdf-restyler", variant: "solid" },
    ],
    media: {
      alt: "pdf-restyler 명함 생성 화면 플레이스홀더",
      caption: "BUSINESS CARD PDF",
    },
  },
];
