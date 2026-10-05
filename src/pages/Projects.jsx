import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function Projects() {
  usePageTitle("Projects");
  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <h1 className="h1">Projects and case files</h1>
          <p className="lede">Open a project to see the problems I faced, how I debugged each one, the fix, and where AI helped.</p>
        </header>
        <div className="plist">
          {projects.map((p) => (<ProjectCard key={p.slug} project={p} />))}
        </div>
      </div>
    </div>
  );
}
