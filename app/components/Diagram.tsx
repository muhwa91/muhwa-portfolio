// 오케스트레이션 다이어그램 — 히어로 배경 선화(DESIGN §5.2).
// 그라데이션·파티클 대신 "실제로 돌아가는 구조"를 그린다: 메인 → 직원(에이전트) → 품질 게이트.
// 서버 컴포넌트 — 모션은 CSS 뿐이라 JS 0(§6.3).

const AGENTS = [
  { y: 70, label: "agent:backend" },
  { y: 140, label: "agent:frontend" },
  { y: 210, label: "agent:qa" },
  { y: 280, label: "agent:security" },
];

const GATES = [
  { y: 105, label: "gate:review" },
  { y: 210, label: "gate:tests" },
  { y: 315, label: "gate:secrets" },
];

/** 메인(120,194) → 각 직원 좌변으로 흐르는 곡선 */
const mainToAgent = (y: number) => `M120 194 C170 194, 182 ${y + 16}, 232 ${y + 16}`;
/** 직원 우변(384) → 게이트 좌변(456) */
const agentToGate = (ay: number, gy: number) =>
  `M384 ${ay + 16} C420 ${ay + 16}, 420 ${gy + 16}, 456 ${gy + 16}`;

// 흐름 대시가 타는 경로 2개(메인→직원→게이트 연속). 동시 2개까지(§6.3).
const FLOW_A = `${mainToAgent(210)} ${agentToGate(210, 210).slice(1)}`;
const FLOW_B = `${mainToAgent(70)} ${agentToGate(70, 105).slice(1)}`;

export function Diagram() {
  return (
    <svg
      className="hero__diagram"
      viewBox="0 0 640 420"
      role="presentation"
      aria-hidden="true"
    >
      {/* 엣지 */}
      {AGENTS.map((a) => (
        <path key={`e-${a.y}`} className="diagram__edge" d={mainToAgent(a.y)} />
      ))}
      <path className="diagram__edge" d={agentToGate(70, 105)} />
      <path className="diagram__edge" d={agentToGate(140, 105)} />
      <path className="diagram__edge" d={agentToGate(210, 210)} />
      <path className="diagram__edge" d={agentToGate(280, 315)} />

      {/* 흐름 */}
      <path
        className="diagram__edge diagram__edge--flow"
        pathLength={100}
        d={FLOW_A}
      />
      <path
        className="diagram__edge diagram__edge--flow diagram__edge--flow-b"
        pathLength={100}
        d={FLOW_B}
      />

      {/* 메인 — 라임을 쓰지 않는다. 헤드라인 위를 지나는 배경이라 악센트 박스가 글자와 경쟁한다.
          이 화면에서 라임은 형광펜 마킹과 흐름선만 갖는다(§3.1 단일 악센트 규율). */}
      <rect className="diagram__node" x={24} y={176} width={96} height={36} rx={6} />
      <text className="diagram__label" x={72} y={198} textAnchor="middle" dominantBaseline="middle">
        main
      </text>

      {/* 직원 */}
      {AGENTS.map((a) => (
        <g key={a.label}>
          <rect className="diagram__node" x={232} y={a.y} width={152} height={32} rx={6} />
          <text className="diagram__label" x={248} y={a.y + 16} dominantBaseline="middle">
            {a.label}
          </text>
        </g>
      ))}

      {/* 게이트 */}
      {GATES.map((g) => (
        <g key={g.label}>
          <rect className="diagram__node" x={456} y={g.y} width={152} height={32} rx={6} />
          <text className="diagram__label" x={472} y={g.y + 16} dominantBaseline="middle">
            {g.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
