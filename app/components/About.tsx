import { Reveal } from "./Reveal";

// ABOUT — 에디토리얼 소개 + mono 정의 리스트(DESIGN §5.6).
// ⚠️ 스택은 반드시 실제 기준(§9.3) — Python 주력 풀스택 + 에이전트 오케스트레이션.
// "React·Next 프론트엔드 개발자"로 채우는 오류가 반복 발생했다.

const FACTS: [string, string][] = [
  ["주력", "Python · PHP(Laravel) · JavaScript"],
  ["프론트", "Vue · Next.js · Tailwind"],
  ["데이터", "TiDB · MySQL · WebSocket"],
  ["데스크톱", "PySide6 · PyMuPDF"],
  ["자동화", "Apps Script · GitHub Actions · 디스코드 봇"],
  ["에이전트", "Claude Code · MCP · 서브에이전트 오케스트레이션"],
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="section__inner">
        <Reveal>
          <p className="eyebrow" data-reveal>
            About
          </p>
          <h2 className="section__headline" data-reveal>
            만드는 일과 만드는 방식을 같이 설계합니다.
          </h2>

          <div className="about__grid">
            <div className="about__body">
              <p data-reveal>
                요구를 뜯어보고 구조와 계약은 직접 정합니다. 반복되는 구현은
                에이전트에게 나눠 맡기되, 결과는 품질 게이트로 검증하고 통과한 것만
                남깁니다. 손이 덜 가는 방식이 아니라 실수가 덜 남는 방식을 고릅니다.
              </p>
              <p data-reveal>
                웹(Laravel·Vue), 실시간 데이터(TiDB·WebSocket), 데스크톱
                (Python·PySide6), 자동화(봇·시트)까지 형태를 가리지 않고 만듭니다.
                가장 재미있는 부분은 언제나 &ldquo;사람이 안 봐도 돌아가게&rdquo;
                만드는 지점입니다.
              </p>
              <p data-reveal>
                지금은 AI 에이전트를 실제 개발 공정에 붙이는 일에 집중하고 있습니다.
                위 프로젝트들은 그 방식으로 만들어졌습니다.
              </p>
            </div>

            <dl className="about__facts" data-reveal>
              {FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd translate="no">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
