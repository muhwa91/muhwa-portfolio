import { Nav } from "./components/Nav";
import { SmoothScroll } from "./components/SmoothScroll";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { How } from "./components/How";
import { About } from "./components/About";

// 실제로 쓰는 것만. 홍보용 나열 금지(DESIGN §9.3).
const STACK = [
  "Python",
  "PHP · Laravel",
  "JavaScript · Vue",
  "TypeScript · Next.js",
  "TiDB · MySQL",
  "WebSocket",
  "PySide6",
  "Apps Script",
  "Claude Code · MCP",
];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#work">
        본문으로 건너뛰기
      </a>
      <Nav />
      <main>
        <Hero />

        <div className="strip">
          <ul className="strip__inner" aria-label="사용 기술">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <Work />
        <How />
        <About />
      </main>
    </>
  );
}
