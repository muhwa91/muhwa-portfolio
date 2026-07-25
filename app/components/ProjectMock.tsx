// 프로젝트 미디어 도식(DESIGN §5.4) — 실제 스크린샷이 준비되기 전의 자리.
//
// ⚠️ **스크린샷인 척하지 않는다.** 숫자·티커·가격 같은 구체 값을 넣지 않고 형태만 그린다.
// 공개 사이트에 실데이터를 올릴 수 없고(프로젝트 CLAUDE.md), 없는 수치를 그려 넣는 건 과장이다(§1).
// 목적은 "이 프로젝트가 어떤 종류의 화면인가"를 한눈에 주는 것까지.
//
// 서버 컴포넌트 — 전부 정적 SVG.

const V = "0 0 320 200";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg className="mock" viewBox={V} role="presentation" aria-hidden="true">
      {children}
    </svg>
  );
}

/** 상단 창 헤더(점 3개 + 타이틀바) — 네 도식 공통 */
function WindowBar() {
  return (
    <g>
      <path className="mock__hair" d="M0 22h320" />
      <circle className="mock__dot" cx={14} cy={11} r={2.5} />
      <circle className="mock__dot" cx={24} cy={11} r={2.5} />
      <circle className="mock__dot" cx={34} cy={11} r={2.5} />
      <rect className="mock__block" x={48} y={7} width={64} height={8} rx={2} />
    </g>
  );
}

/** 에이전트 오케스트레이션 보드 — 작업 행 + 통과 표시 */
function AgentBoard() {
  const rows = [34, 62, 90, 118, 146];
  return (
    <Frame>
      <WindowBar />
      <path className="mock__hair" d="M104 22v178" />
      {rows.map((y, i) => (
        <g key={y}>
          <rect className="mock__block" x={14} y={y} width={72} height={7} rx={2} />
          <rect
            className={i === 1 ? "mock__accentFill" : "mock__block"}
            x={118}
            y={y}
            width={i === 1 ? 96 : 60 + i * 14}
            height={7}
            rx={2}
          />
          <circle
            className={i < 3 ? "mock__accentFill" : "mock__dot"}
            cx={302}
            cy={y + 3.5}
            r={3}
          />
        </g>
      ))}
      <rect className="mock__panel" x={118} y={168} width={80} height={18} rx={3} />
    </Frame>
  );
}

/** 실시간 시세 — 캔들 + 우측 종목 행 (수치 없음) */
function TradingBoard() {
  // x 는 16px 간격으로 오른쪽 여백까지 채운다(비어 보이지 않게)
  const candles = [
    [124, 52, 26], [140, 66, 20], [156, 44, 34], [172, 72, 18], [188, 58, 30],
    [204, 84, 22], [220, 62, 40], [236, 92, 18], [252, 74, 28], [268, 100, 24],
    [284, 82, 30],
  ];
  return (
    <Frame>
      <WindowBar />
      <path className="mock__hair" d="M112 22v178M0 160h320" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className="mock__block" x={14} y={38 + i * 26} width={44} height={6} rx={2} />
          <rect
            className={i === 0 ? "mock__accentFill" : "mock__block"}
            x={66}
            y={38 + i * 26}
            width={28 - i * 4}
            height={6}
            rx={2}
          />
        </g>
      ))}
      {candles.map(([x, top, h], i) => (
        <g key={x} className={i === 7 ? "mock__accent" : "mock__line"}>
          <path d={`M${x + 4} ${top - 8}v${h + 16}`} />
          <rect
            x={x}
            y={top}
            width={8}
            height={h}
            rx={1}
            fill={i % 3 === 0 ? "currentColor" : "none"}
            stroke="currentColor"
          />
        </g>
      ))}
      <rect className="mock__block" x={14} y={172} width={60} height={6} rx={2} />
    </Frame>
  );
}

/** NAV 추종 시뮬레이터 — 실제선 vs 예측선 + 괴리 밴드 */
function NavChart() {
  return (
    <Frame>
      <WindowBar />
      <path className="mock__hair" d="M0 150h320M40 22v128" />
      {/* 괴리 밴드 — 오른쪽 끝에서 잘려 보이지 않게 x 를 290 에서 끊는다 */}
      <path
        className="mock__band"
        d="M40 108 L90 92 L140 98 L190 72 L240 60 L290 48 L290 78 L240 90 L190 102 L140 128 L90 122 L40 138 Z"
      />
      {/* 실제 */}
      <path className="mock__line" d="M40 123 L90 107 L140 113 L190 87 L240 75 L290 63" />
      {/* 예측 */}
      <path className="mock__accent-dash" d="M40 130 L90 112 L140 120 L190 92 L240 78 L290 66" />
      <rect className="mock__panel" x={222} y={30} width={84} height={26} rx={3} />
      <rect className="mock__accentFill" x={230} y={40} width={30} height={6} rx={2} />
      <rect className="mock__block" x={14} y={166} width={52} height={6} rx={2} />
      <rect className="mock__block" x={76} y={166} width={40} height={6} rx={2} />
    </Frame>
  );
}

/** PDF 텍스트·색상 편집 — 페이지 + 색 스와치 */
function PdfEditor() {
  const swatches = [0, 1, 2, 3, 4];
  return (
    <Frame>
      <WindowBar />
      <path className="mock__hair" d="M232 22v178" />
      <rect className="mock__panel" x={30} y={38} width={170} height={144} rx={3} />
      {[54, 70, 86, 108, 124, 140, 156].map((y, i) => (
        <rect
          key={y}
          className={i === 3 ? "mock__accentFill" : "mock__block"}
          x={44}
          y={y}
          width={i === 0 ? 96 : i === 3 ? 84 : 142 - (i % 3) * 22}
          height={i === 0 ? 9 : 6}
          rx={2}
        />
      ))}
      {swatches.map((i) => (
        <rect
          key={i}
          className={i === 1 ? "mock__accentFill" : "mock__block"}
          x={250}
          y={44 + i * 22}
          width={54}
          height={14}
          rx={3}
        />
      ))}
      <rect className="mock__panel" x={250} y={162} width={54} height={18} rx={3} />
    </Frame>
  );
}

// 키에 하이픈이 들어가므로 전부 따옴표로 감싼다(식별자로는 쓸 수 없다)
const MOCKS: Record<string, () => React.ReactElement> = {
  "ai-agent-workspace": AgentBoard,
  "trading-info": TradingBoard,
  "etf-info": NavChart,
  "pdf-restyler": PdfEditor,
};

export function ProjectMock({ slug }: { slug: string }) {
  const Mock = MOCKS[slug];
  return Mock ? <Mock /> : null;
}
