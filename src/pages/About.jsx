import { Link } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto.jsx";
import { profile, experience, education } from "../data/profile.js";
import { journey, lookingFor } from "../data/journey.js";
import { Arrow } from "../components/Icons.jsx";
import { usePageTitle } from "../lib/usePageTitle.js";

export default function About() {
  usePageTitle("About");
  return (
    <div className="page">
      <div className="container">
        <header className="about__top">
          <ProfilePhoto className="about__photo" size={280} />
          <div>
            <h1 className="h1">My journey so far</h1>
            <p className="lede">
              I am {profile.firstName}, a {profile.role.toLowerCase()} from Bengaluru. I studied computer science, learned to build for the web, and spent two years turning device data into screens people can rely on.
            </p>
            <p className="body">
              At Skoegle IoT Innovations I worked on GPS tracking, a fitness app and a patient monitoring platform. Live data taught me the most: things that work with ten records break with ten thousand, and a good bug report is half of the fix. That is why my projects here include the problems and how I debugged them.
            </p>
            <p className="body">
              I use AI tools like Claude, ChatGPT and Copilot every day, and I always verify what they suggest. I care about clear code, honest tests and teams that review each other's work.
            </p>
          </div>
        </header>

        <section className="about__section">
          <h2 className="h2">Timeline</h2>
          <ol className="timeline">
            {journey.map((j) => (
              <li key={j.title} className="timeline__item">
                <span className="timeline__when">{j.when}</span>
                <div>
                  <h3 className="h3">{j.title}</h3>
                  <p className="body">{j.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="about__section split">
          <div>
            <h2 className="h2">Experience</h2>
            <h3 className="h3">{experience.role}, {experience.company}</h3>
            <p className="muted">{experience.period}</p>
            <ul className="bullets">
              {experience.bullets.map((b) => (<li key={b}>{b}</li>))}
            </ul>
          </div>
          <div>
            <h2 className="h2">Education</h2>
            <h3 className="h3">{education.degree}</h3>
            <p className="muted">{education.school}, {education.year}</p>
            <p className="body">Certifications: {education.certifications.join(" and ")}.</p>

            <h2 className="h2 mt">What I am looking for</h2>
            <ul className="bullets">
              {lookingFor.map((l) => (<li key={l}>{l}</li>))}
            </ul>
            <Link to="/contact" className="link-arrow">Let's talk <Arrow width={16} height={16} /></Link>
          </div>
        </section>
      </div>
    </div>
  );
}
