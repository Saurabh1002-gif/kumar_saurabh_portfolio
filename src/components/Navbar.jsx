import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { Menu, Close, Download } from "./Icons.jsx";
import { profile } from "../data/profile.js";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/ai-debugging", label: "AI and Debugging" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label="Saurabh Kumar, home">
          <span className="brand__mark">SK</span>
          <span className="brand__name">Saurabh Kumar</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => "nav__link" + (isActive ? " is-active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <a className="btn btn--primary nav__resume" href={profile.resume} download>
            <Download width={16} height={16} /> Resume
          </a>
          <button className="icon-btn nav__burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="drawer" id="mobile-menu">
          <nav aria-label="Mobile">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => "drawer__link" + (isActive ? " is-active" : "")}>
                {l.label}
              </NavLink>
            ))}
            <a className="btn btn--primary drawer__cta" href={profile.resume} download>
              <Download width={16} height={16} /> Download resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
