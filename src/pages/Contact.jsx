import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Pin, Copy, Check, Whatsapp, Send } from "../components/Icons.jsx";
import { profile } from "../data/profile.js";
import { usePageTitle } from "../lib/usePageTitle.js";

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch (e) { /* clipboard blocked: user can still select the text */ }
  }
  return (
    <button className="icon-btn" onClick={copy} aria-label={done ? "Copied" : `Copy ${label}`} title={done ? "Copied" : `Copy ${label}`}>
      {done ? <Check width={18} height={18} /> : <Copy width={18} height={18} />}
    </button>
  );
}

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const rows = [
    { icon: <Mail />, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
    { icon: <Phone />, label: "Phone", value: profile.phone, href: `tel:+${profile.phoneRaw}`, copy: true },
    { icon: <Linkedin />, label: "LinkedIn", value: "linkedin.com/in/saurabh--kumar", href: profile.linkedin },
    { icon: <Github />, label: "GitHub", value: "github.com/Saurabh1002-gif", href: profile.github },
    { icon: <Pin />, label: "Location", value: profile.location },
  ];

  return (
    <div className="page">
      <div className="container">
        <header className="page__head">
          <h1 className="h1">Let's talk</h1>
          <p className="lede">I am an immediate joiner. The fastest way to reach me is email or WhatsApp. I usually reply within a day.</p>
        </header>

        <div className="contact">
          <ul className="contact__list">
            {rows.map((r) => (
              <li key={r.label} className="contact__row">
                <span className="contact__icon">{r.icon}</span>
                <div className="contact__text">
                  <span className="muted">{r.label}</span>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{r.value}</a>
                  ) : (
                    <span>{r.value}</span>
                  )}
                </div>
                {r.copy && <CopyButton text={r.value} label={r.label.toLowerCase()} />}
              </li>
            ))}
            <li>
              <a className="btn btn--ghost" href={`https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent("Hi Saurabh, I saw your portfolio.")}`} target="_blank" rel="noreferrer">
                <Whatsapp width={18} height={18} /> Message on WhatsApp
              </a>
            </li>
          </ul>

          <form className="form" onSubmit={submit}>
            <h2 className="h3">Send a message</h2>
            <label>
              Your name
              <input required value={form.name} onChange={set("name")} autoComplete="name" />
            </label>
            <label>
              Your email
              <input required type="email" value={form.email} onChange={set("email")} autoComplete="email" />
            </label>
            <label>
              Message
              <textarea required rows={5} value={form.message} onChange={set("message")} placeholder="Tell me about the role or project" />
            </label>
            <button className="btn btn--primary" type="submit"><Send width={18} height={18} /> Open in my email app</button>
            <p className="muted small">This opens your email app with the message filled in.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
