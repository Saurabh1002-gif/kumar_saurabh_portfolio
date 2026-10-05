import { Link } from "react-router-dom";
import TrackerPanel from "../components/TrackerPanel.jsx";
import ProfilePhoto from "../components/ProfilePhoto.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { Github, Linkedin, Arrow, Download, Chat } from "../components/Icons.jsx";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { usePageTitle } from "../lib/usePageTitle.js";

const pillars = [
  { title: "Interfaces that stay fast", text: "React.js dashboards with Redux and Context API that keep working while data streams in every few seconds." },
  { title: "APIs you can trust", text: "Node.js REST APIs with JWT/OAuth login, SQL and Redis behind them, tuned until they respond quickly." },
  { title: "Releases that do not break", text: "Jest and Cypress tests, pull request reviews, and Docker, Kubernetes and GitHub Actions pipelines." },
];

export default function Home() {
  usePageTitle("");
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="hero__id">
              <ProfilePhoto className="hero__photo" size={64} />
              <div>
                <p className="hero__name">{profile.name}</p>
                <p className="badge"><i className="badge__dot" /> {profile.availability}</p>
              </div>
            </div>

            <h1 className="hero__title">I build the screens behind live GPS trackers and health monitors.</h1>
            <p className="hero__lead">
              {profile.role} in Bengaluru with {profile.experienceYears} of experience shipping React.js and Node.js products for IoT devices. I like problems that only show up when real data arrives, and I write down how I solve them.
            </p>

            <div className="hero__cta">
              <Link to="/projects" className="btn btn--primary">See my projects <Arrow width={18} height={18} /></Link>
              <a href={profile.resume} download className="btn btn--ghost"><Download width={18} height={18} /> Resume</a>
              <button className="btn btn--ghost" onClick={() => window.dispatchEvent(new Event("open-chat"))}><Chat width={18} height={18} /> Ask my AI</button>
            </div>

            <div className="hero__links">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github width={18} height={18} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin width={18} height={18} /> LinkedIn</a>
            </div>
          </div>

          <TrackerPanel />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2">What I do well</h2>
          <dl className="pillars">
            {pillars.map((p) => (
              <div className="pillars__row" key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">Projects, with the bugs left in</h2>
            <p className="lede">Every project has a case file: what broke, how I found the cause, and what fixed it.</p>
          </div>
          <div className="plist">
            {projects.slice(0, 3).map((p) => (<ProjectCard key={p.slug} project={p} />))}
          </div>
          <p className="center"><Link to="/projects" className="link-arrow">All projects <Arrow width={16} height={16} /></Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container cta">
          <div>
            <h2 className="h2">Looking for a React developer who can start now?</h2>
            <p className="lede">I am an immediate joiner. Send a message, or ask my AI assistant anything first.</p>
          </div>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn--primary">Contact me <Arrow width={18} height={18} /></Link>
            <Link to="/ai-debugging" className="btn btn--ghost">How I debug with AI</Link>
          </div>
        </div>
      </section>
    </>
  );
}
