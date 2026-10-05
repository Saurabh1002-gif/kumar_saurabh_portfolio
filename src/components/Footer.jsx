import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "./Icons.jsx";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">{profile.name}</p>
          <p className="footer__muted">{profile.role} in {profile.location.split(",")[0]}. {profile.availability}.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <Link to="/projects">Projects</Link>
          <Link to="/ai-debugging">AI and Debugging</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer__social">
          <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
        </div>
      </div>
      <div className="container footer__base">
        <span>Built with React and Vite. Hosted on Vercel.</span>
        <span>{new Date().getFullYear()} {profile.name}</span>
      </div>
    </footer>
  );
}
