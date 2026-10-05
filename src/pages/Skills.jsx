import { Link } from "react-router-dom";
import { skillGroups } from "../data/profile.js";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function Skills() {
  usePageTitle("Skills");
  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <h1 className="h1">Skills</h1>
          <p className="lede">The tools I use at work. To see them in action, open a <Link to="/projects" className="inline-link">project case file</Link>.</p>
        </header>
        <div className="skills">
          {skillGroups.map((g) => (
            <section key={g.name} className="skills__row">
              <div>
                <h2 className="h3">{g.name}</h2>
                <p className="muted">{g.note}</p>
              </div>
              <ul className="chips chips--lg">
                {g.items.map((s) => (<li key={s}>{s}</li>))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
