// Offline fallback so the chatbot still helps when the AI API is unavailable
// (for example during `npm run dev` without a key).
import { profile, impact, skillGroups } from "../data/profile.js";
import { projects } from "../data/projects.js";

const has = (q, words) => words.some((w) => q.includes(w));

export function localAnswer(question) {
  const q = question.toLowerCase();

  if (has(q, ["contact", "email", "phone", "number", "reach", "hire", "call", "linkedin", "github"])) {
    return `You can reach Saurabh at ${profile.email} or ${profile.phone}. LinkedIn: ${profile.linkedin} and GitHub: ${profile.github}. He is an ${profile.availability.toLowerCase()}.`;
  }
  if (has(q, ["available", "notice", "join", "start"])) {
    return `Saurabh is an immediate joiner, based in ${profile.location}. Email ${profile.email} to talk about a role.`;
  }
  if (has(q, ["debug", "bug", "problem", "fix", "issue"])) {
    return "Saurabh follows one loop: reproduce the problem, measure it (React Profiler, Network tab, SQL query plans, kubectl logs), find the root cause, fix it, then add a test. Open any project on the Projects page to read the real problems he faced and how he solved them.";
  }
  if (has(q, ["live demo", "demo", "play store", "google play", "tracker", "skofit"])) {
    const withLinks = projects.filter((p) => p.links?.length);
    if (withLinks.length) {
      return withLinks.map((p) => `${p.title}: ${p.links.map((l) => l.href).join(", ")}`).join(". ") + ".";
    }
  }
  if (has(q, ["project", "built", "work on", "portfolio"])) {
    return "Main projects: " + projects.map((p) => p.title).join("; ") + ". Each has a case file with the problems faced and how they were debugged.";
  }
  if (has(q, ["skill", "stack", "tech", "react", "node", "language", "tool", "typescript", "supabase", "firebase", "vercel"])) {
    return "Core stack: " + skillGroups.slice(0, 3).map((g) => g.items.slice(0, 5).join(", ")).join(" | ") + ". He also uses React Native, Jest, Cypress, Docker, Kubernetes and GitHub Actions.";
  }
  if (has(q, ["impact", "result", "achiev", "improve", "faster"])) {
    return impact.map((i) => `${i.label}: ${i.value}`).join(". ") + ".";
  }
  if (has(q, ["experience", "years", "company", "skoegle", "job"])) {
    return "Saurabh worked as a Full Stack Developer at Skoegle IoT Innovations from Oct 2024 to Sep 2026, building React.js and Node.js products for GPS tracking and healthcare.";
  }
  if (has(q, ["education", "degree", "college", "certif", "study"])) {
    return "B.Tech in Computer Science Engineering from MS Engineering College (VTU), 2023, plus Java and Python certifications.";
  }
  if (has(q, ["ai", "claude", "chatgpt", "copilot"])) {
    return "Saurabh uses Claude, ChatGPT and GitHub Copilot as assistants for explanations, alternatives and boilerplate. He always reproduces and verifies the result himself. See the AI and Debugging page for his workflow.";
  }
  return `I am Saurabh's assistant. Ask me about his projects, skills, debugging approach or availability. For anything else, contact him at ${profile.email}.`;
}
