import { Reveal } from "./Reveal";

// HOW — 라이트 인터럽트(DESIGN §5.5). 다크가 세 섹션 이어진 뒤 한 번 밝게 끊는다.
// .section-light 가 시맨틱 토큰을 재할당하므로 컴포넌트는 다크와 똑같은 클래스를 쓴다.
// 이 섹션이 다른 포트폴리오에 옮기면 말이 안 되는 유일한 섹션이다(§1 판정 기준).

const ITEMS = [
  {
    title: "헌법",
    desc: "문서 하나가 모든 에이전트의 최상위 규칙입니다. 손대면 안 되는 파일은 훅이 편집 시도 자체를 잡아 확인을 강제하고, 승인된 변경만 이력에 남습니다.",
    meta: "CLAUDE.md · 편집 가드 훅",
    // 문서 + 잠금
    path: "M6 3h9l3 3v15H6zM15 3v3h3M9 12h6M9 16h4",
  },
  {
    title: "직원",
    desc: "백엔드·프론트·QA·보안·디버깅을 도메인별 에이전트에게 맡깁니다. API 계약과 화면 명세를 문서에 먼저 동결하고, 그 다음에야 양쪽을 동시에 굴립니다. 어긋나면 계약이 정답입니다.",
    meta: "15 에이전트 · 계약 우선",
    // 조직도 — 하나에서 셋으로 갈라진다(다리를 길게 줘야 분기로 읽힌다)
    path: "M12 4v7M5 11h14M5 11v9M12 11v9M19 11v9",
  },
  {
    title: "게이트",
    desc: "네 관문을 병렬로 돌립니다. 지적이 나오면 고쳐서 다시 돌리고, 전부 통과한 것만 머지합니다. 못 통과한 건 남기지 않습니다.",
    meta: "테스트 · 리뷰 · 디버깅 · 보안",
    // 체크 관문
    path: "M4 6h16v12H4zM8 12l3 3 5-6",
  },
  {
    title: "기록",
    desc: "결정과 그 근거, 밟은 함정을 작업일지에 남깁니다. 다음 세션은 맨 위 블록부터 읽고 상태를 복원해 이어받습니다. 같은 실수를 두 번 하지 않게 만드는 장치입니다.",
    meta: "작업일지 · 세션 부팅 블록",
    // 로그 스택
    path: "M4 5h16M4 12h16M4 19h10",
  },
  {
    title: "문서",
    desc: "기능마다 계획·계약·검증 세 문서를 남깁니다. 이미 정해진 것을 다시 정하지 않게, 다음에 붙는 사람이 추측 없이 이어받게 하는 게 목적입니다.",
    meta: "01_계획 · 02_계약 · 03_구현_검증",
    // 겹친 문서 2장
    path: "M9 3h7l3 3v14H9zM16 3v3h3M5 7v13h11",
  },
  {
    title: "관제",
    desc: "어느 에이전트가 지금 무엇을 붙잡고 있는지 화면으로 봅니다. 멈춘 작업과 끝난 작업이 구분돼야 다음 지시를 제때 내릴 수 있습니다.",
    meta: "실시간 에이전트 대시보드",
    // 모니터 + 꺾은선
    path: "M3 5h18v11H3zM9 20h6M12 16v4M7 12l3-3 3 3 3-4",
  },
  {
    title: "원격",
    desc: "집 밖에서도 폰으로 지시하고 결과를 받습니다. 실행은 계속 제 노트북에서 일어나고, 허용된 사람만 명령을 넣을 수 있습니다.",
    meta: "디스코드 · 폰에서 지시",
    // 폰 (너무 좁으면 막대로 읽힌다)
    path: "M7 4h10v16H7zM10.5 17h3",
  },
  {
    title: "정기 실행",
    desc: "매일 정해진 시각에 스스로 돌고 결과만 알림으로 옵니다. 사람이 기억해서 눌러야 하는 일은 되도록 남기지 않습니다.",
    meta: "GitHub Actions · 스케줄",
    // 순환 화살표
    path: "M20 12a8 8 0 0 1-13.7 5.7M4 12a8 8 0 0 1 13.7-5.7M17 3v4h-4M7 21v-4h4",
  },
  {
    title: "복구",
    desc: "되돌릴 수 있게 만들어 둡니다. 의미 단위로 커밋하고, 밀기 전에 원격을 먼저 받고, 위험한 작업은 백업을 남긴 뒤 시작합니다.",
    meta: "의미 단위 커밋 · 되돌리기 경로",
    // 되돌리기 화살표
    path: "M4 8h9a6 6 0 0 1 0 12H8M4 8l4-4M4 8l4 4",
  },
];

export function How() {
  return (
    <section className="section section-light" id="how">
      <div className="section__inner">
        <p className="eyebrow">How</p>
        <h2 className="section__headline">
          혼자지만 <span className="mark">팀처럼</span> 일합니다.
        </h2>
        <p className="section__lede">
          손이 덜 가게 만드는 게 아니라, 같은 실수를 두 번 하지 않게 만드는 게
          목표입니다. 아래가 지금 실제로 굴러가고 있는 방식입니다.
        </p>

        <Reveal>
          <div className="how__grid">
            {ITEMS.map((it) => (
              <div className="how__item" key={it.title} data-reveal>
                <svg
                  className="how__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={it.path} />
                </svg>
                <h3 className="how__title">{it.title}</h3>
                <p className="how__desc">{it.desc}</p>
                <p className="how__meta">{it.meta}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
