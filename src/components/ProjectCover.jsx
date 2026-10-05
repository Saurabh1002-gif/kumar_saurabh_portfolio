import { useState } from "react";

// Shows /assets/projects/<slug>.png if you add a screenshot,
// otherwise a generated cover in the project's colour.
export default function ProjectCover({ project }) {
  const [failed, setFailed] = useState(false);
  const { slug, variant, accent, title } = project;

  if (!failed) {
    return (
      <img
        className="cover__img"
        src={`/assets/projects/${slug}.png`}
        alt={`${title} screenshot`}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  }

  const art = {
    route: (<><path d="M20 150C60 140 70 90 110 90s70 50 110 10 60-70 100-60" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="2 9" strokeLinecap="round" /><circle cx="320" cy="40" r="12" fill="#F7C325" /></>),
    pulse: (<path d="M0 100h90l20-50 30 100 25-70 15 20h190" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />),
    shield: (<><path d="M200 30 270 55v45c0 32-30 52-70 68-40-16-70-36-70-68V55z" fill="none" stroke="#fff" strokeWidth="4" /><path d="m172 100 22 22 38-44" fill="none" stroke="#F7C325" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></>),
    pipeline: (<><rect x="40" y="78" width="64" height="44" rx="10" fill="none" stroke="#fff" strokeWidth="4" /><rect x="168" y="78" width="64" height="44" rx="10" fill="none" stroke="#fff" strokeWidth="4" /><rect x="296" y="78" width="64" height="44" rx="10" fill="#F7C325" /><path d="M104 100h64M232 100h64" stroke="#fff" strokeWidth="4" strokeLinecap="round" /></>),
  }[variant];

  return (
    <svg className="cover__svg" viewBox="0 0 400 200" role="img" aria-label={`${title} illustration`} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="200" fill={accent} />
      {art}
    </svg>
  );
}
