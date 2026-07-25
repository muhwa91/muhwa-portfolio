import { PROJECTS } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { ProjectMock } from "./ProjectMock";

// WORK — 보더 카드 세로 스택(DESIGN §5.4). 좌우 교대는 CSS(:nth-child(even))가 맡는다.
// 상태 색은 CSS 가 data-status 로 고르고, 의미는 항상 텍스트로도 전달한다(§7).

export function Work() {
  return (
    <section className="section" id="work">
      <div className="section__inner">
        <p className="eyebrow">Work</p>
        <h2 className="section__headline">만든 것, 그리고 지금 상태.</h2>
        <p className="section__lede">
          4개 다 실제로 쓰거나 돌아가고 있습니다. 코드와 설명은 각 저장소에서
          바로 볼 수 있습니다.
        </p>

        <Reveal>
          <div className="work__list">
            {PROJECTS.map((p, i) => (
              <article
                className="project-card"
                key={p.slug}
                aria-labelledby={`project-${p.slug}`}
                data-reveal
              >
                <div>
                  <p className="project-card__index">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* 레포명은 고유명사 — 자동번역이 깨뜨리지 않게 translate="no" */}
                  <h3
                    className="project-card__name"
                    id={`project-${p.slug}`}
                    translate="no"
                  >
                    {p.name}
                  </h3>
                  <p className="project-card__line">{p.oneLiner}</p>

                  <dl className="project-card__meta">
                    <dt>Stack</dt>
                    <dd translate="no">{p.stack}</dd>
                    <dt>Status</dt>
                    <dd>
                      <span className="status" data-status={p.status}>
                        {p.statusLabel}
                      </span>
                    </dd>
                  </dl>

                  <div className="project-card__actions">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        className={`btn ${l.variant === "solid" ? "btn--primary" : "btn--secondary"}`}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label}
                        <span className="sr-only">(새 창에서 열림)</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 실제 스크린샷 투입 전 — 화면 종류를 알려주는 도식(§5.4).
                    스크린샷인 척하지 않도록 수치 없이 형태만 그린다. */}
                <div className="project-card__media" role="img" aria-label={p.media.alt}>
                  <ProjectMock slug={p.slug} />
                  <span className="project-card__caption">{p.media.caption}</span>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
