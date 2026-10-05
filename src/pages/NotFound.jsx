import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <div className="page">
      <div className="container page__head">
        <h1 className="h1">This page is not on the map</h1>
        <p className="lede">The link may be old or mistyped. Head back to the projects or the home page.</p>
        <p><Link to="/" className="btn btn--primary">Go home</Link> <Link to="/projects" className="btn btn--ghost">See projects</Link></p>
      </div>
    </div>
  );
}
