import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle.js";

const loop = [
  { title: "Reproduce", text: "Make the bug happen on demand with a script, a test, or an API request. No reproduction, no fix." },
  { title: "Measure", text: "Use the right instrument: React Profiler, the Network tab, EXPLAIN ANALYZE, or kubectl logs." },
  { title: "Explain", text: "Write down the root cause in one sentence. If I cannot, I do not understand it yet." },
  { title: "Ask AI", text: "Share the error, the relevant code and what I already tried. Ask for causes and alternatives, not just a patch." },
  { title: "Fix and prove", text: "Apply the smallest change, then show it works by re-measuring the same thing." },
  { title: "Lock it in", text: "Add a Jest or Cypress test so the bug cannot come back quietly." },
];

const tools = [
  { name: "Claude", use: "Reasoning tasks", points: ["Reading long stack traces and logs", "Comparing design options before I commit", "Reviewing my fix for edge cases"] },
  { name: "ChatGPT", use: "Quick alternatives", points: ["Second opinions on an approach", "SQL, regex and config snippets to adapt", "Explaining unfamiliar errors in plain words"] },
  { name: "GitHub Copilot", use: "Inside the editor", points: ["Boilerplate and test scaffolding", "Repetitive refactors", "Suggestions I accept only after reading them"] },
];

const rules = [
  "Never paste secrets, tokens or customer data into an AI tool.",
  "Treat every answer as a hypothesis. I reproduce and verify before it goes into a pull request.",
  "I only ship code I can explain in a code review.",
  "AI drafts, tests decide.",
];

export default function AIWorkflow() {
  usePageTitle("AI and Debugging");
  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <h1 className="h1">How I debug, and where AI fits</h1>
          <p className="lede">AI makes me faster, but the method is mine. This is the loop I follow on every project.</p>
        </header>

        <section className="about__section">
          <h2 className="h2">My debugging loop</h2>
          <ol className="loop">
            {loop.map((s) => (
              <li key={s.title}>
                <h3 className="h3">{s.title}</h3>
                <p className="body">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about__section">
          <h2 className="h2">Which tool I use for what</h2>
          <div className="tools">
            {tools.map((t) => (
              <div key={t.name} className="tools__col">
                <h3 className="h3">{t.name}</h3>
                <p className="muted">{t.use}</p>
                <ul className="bullets">{t.points.map((p) => (<li key={p}>{p}</li>))}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className="about__section split">
          <div>
            <h2 className="h2">Ground rules</h2>
            <ul className="bullets">{rules.map((r) => (<li key={r}>{r}</li>))}</ul>
          </div>
          <div>
            <h2 className="h2">A prompt I actually use</h2>
            <pre className="code"><code>{`I have a React dashboard where the whole map re-renders on every live update.

What I measured: React Profiler shows all 40 markers rendering per update.
What I tried: React.memo on the marker component (no change).
Relevant code: [paste the reducer and marker component]

Give me the 3 most likely causes, ordered by probability,
and how I can confirm each one before changing code.`}</code></pre>
            <p className="body">Then I follow the case files: <Link to="/projects/skoegle-gps-tracker" className="inline-link">see this exact problem solved</Link>.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
