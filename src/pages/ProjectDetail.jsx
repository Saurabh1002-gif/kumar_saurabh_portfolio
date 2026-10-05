import { Link, useParams } from "react-router-dom";
import ProjectCover from "../components/ProjectCover.jsx";
import { getProject, projects } from "../data/projects.js";
import { Arrow } from "../components/Icons.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  usePageTitle(project?.title);
  if (!project) return <NotFound />;

  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <div className="page">
      <div className="container">
        <Link to="/projects" className="back">All projects</Link>

        <header className="case__head">
          <h1 className="h1">{project.title}</h1>
          <p className="lede">{project.short}</p>
          <dl className="meta">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Period</dt><dd>{project.period}</dd></div>
            <div><dt>Stack</dt><dd>{project.stack.join(", ")}</dd></div>
          </dl>
          {project.links?.length > 0 && (
            <div className="case__links">
              {project.links.map((l) => (
                <a key={l.href} className="btn btn--primary" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <Arrow width={16} height={16} />
                </a>
              ))}
            </div>
          )}
        </header>

        <div className="case__cover"><ProjectCover project={project} /></div>

        <div className="case">
          <nav className="toc" aria-label="On this page">
            <p className="toc__title">On this page</p>
            <a href="#overview">Overview</a>
            {project.issues.map((is, n) => (<a key={is.title} href={`#issue-${n + 1}`}>{is.title}</a>))}
            <a href="#result">Result</a>
          </nav>

          <article className="case__body">
            <section id="overview">
              <h2 className="h2">Overview</h2>
              <p className="body">{project.overview}</p>
            </section>

            {project.issues.map((is, n) => (
              <section key={is.title} id={`issue-${n + 1}`} className="issue">
                <h2 className="h2">{is.title}</h2>

                <h3 className="h4">The problem</h3>
                <p className="body">{is.symptom}</p>

                <h3 className="h4">How I debugged it</h3>
                <ol className="steps">
                  {is.steps.map((s) => (
                    <li key={s.title}>
                      <strong>{s.title}.</strong> {s.detail}
                    </li>
                  ))}
                </ol>

                <div className="callout callout--fix">
                  <p className="callout__label">The fix</p>
                  <p>{is.fix}</p>
                </div>
                <div className="callout callout--ai">
                  <p className="callout__label">Where AI helped</p>
                  <p>{is.ai}</p>
                </div>
              </section>
            ))}

            <section id="result">
              <h2 className="h2">Result</h2>
              <p className="body">{project.result}</p>
              <h3 className="h4">What I learned</h3>
              <p className="body">{project.learned}</p>
            </section>

            <Link to={`/projects/${next.slug}`} className="next">
              <span className="muted">Next project</span>
              <strong>{next.title}</strong>
              <Arrow />
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}
