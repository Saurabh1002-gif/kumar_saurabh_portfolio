import { Link } from "react-router-dom";
import ProjectCover from "./ProjectCover.jsx";
import { Arrow } from "./Icons.jsx";

export default function ProjectCard({ project }) {
  return (
    <article className="pcard">
      <Link to={`/projects/${project.slug}`} className="pcard__cover" aria-label={`Open ${project.title}`} tabIndex={-1}>
        <ProjectCover project={project} />
      </Link>
      <div className="pcard__body">
        <h3 className="pcard__title">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="pcard__text">{project.short}</p>
        <ul className="chips" aria-label="Technologies">
          {project.stack.slice(0, 5).map((s) => (<li key={s}>{s}</li>))}
        </ul>
        <div className="pcard__links">
          <Link to={`/projects/${project.slug}`} className="link-arrow">
            Read the problems I solved <Arrow width={16} height={16} />
          </Link>
          {project.links?.map((l) => (
            <a key={l.href} className="link-arrow" href={l.href} target="_blank" rel="noreferrer">
              {l.label} <Arrow width={16} height={16} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
