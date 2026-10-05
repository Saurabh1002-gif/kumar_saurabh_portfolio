// Single source of truth for your personal details.
// Edit this file and the whole site (and the chatbot) updates.

export const profile = {
  name: "Saurabh Kumar",
  firstName: "Saurabh",
  role: "Full Stack Developer",
  location: "Bengaluru, Karnataka, India",
  email: "saurabhsoftware4@gmail.com",
  phone: "+91 8789907136",
  phoneRaw: "918789907136",
  linkedin: "https://linkedin.com/in/saurabh--kumar",
  github: "https://github.com/Saurabh1002-gif",
  resume: "/assets/Saurabh_Kumar_Resume.pdf",
  availability: "Immediate joiner",
  experienceYears: "almost 2 years",
  summary:
    "Full Stack Developer with almost 2 years of experience building scalable web applications, mobile apps and REST APIs with React.js, React Native, Node.js, TypeScript and JavaScript (ES6+). I work with JWT/OAuth authentication, MS SQL Server, PostgreSQL, Redis, Supabase and Firebase, and ship with Docker, Kubernetes, GitHub Actions and Vercel.",
};

export const impact = [
  { label: "API response time", value: "about 30% faster", detail: "Redis caching and tuned SQL queries" },
  { label: "Release cycle", value: "about 25% shorter", detail: "GitHub Actions, Docker, Kubernetes" },
  { label: "Post-release bugs", value: "about 15% fewer", detail: "Jest, Selenium and Cypress suites" },
];

export const experience = {
  company: "Skoegle IoT Innovations Pvt. Ltd.",
  role: "Full Stack Developer",
  period: "Oct 2024 – Sep 2026",
  bullets: [
    "Built responsive web interfaces with React.js, JavaScript (ES6+), HTML5 and CSS3, connected to Node.js REST APIs with JWT/OAuth authentication.",
    "Managed application state with Redux and Context API across multiple React projects, using TypeScript for type-safe code.",
    "Improved API response times by roughly 30% with Redis caching and tuned SQL / MS SQL Server queries. Reduced bundle size with Webpack.",
    "Reviewed pull requests on Git/GitHub and raised test coverage with Jest and Selenium/Cypress, cutting post-release bugs by an estimated 15%.",
    "Built dashboards and device-tracking interfaces for real-time monitoring of many concurrent devices.",
    "Cut release cycle time by around 25% with GitHub Actions, Docker and Kubernetes.",
  ],
};

export const education = {
  degree: "B.Tech in Computer Science Engineering",
  school: "MS Engineering College, Sadahalli (VTU)",
  year: "2023",
  place: "Karnataka, India",
  certifications: ["Java Certification", "Python Certification"],
};

export const skillGroups = [
  { name: "Front end", note: "My main craft. Used across 3 React projects.", items: ["React.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Redux", "Context API", "Responsive design", "Angular"] },
  { name: "Back end and APIs", note: "REST APIs that the front end can rely on.", items: ["Node.js", "TypeScript", "RESTful APIs", "CRUD", "JWT authentication", "OAuth", "Server-side logic"] },
  { name: "Backend as a service and hosting", note: "Managed back ends and quick, reliable deploys.", items: ["Supabase", "Firebase", "Vercel"] },
  { name: "Databases", note: "From relational queries to caching.", items: ["SQL", "MS SQL Server", "PostgreSQL", "MongoDB", "Redis"] },
  { name: "Testing and build", note: "So releases do not break.", items: ["Jest", "Mocha", "Selenium", "Cypress", "React Testing Library", "Webpack", "Performance optimisation"] },
  { name: "Cloud and DevOps", note: "Code that reaches production safely.", items: ["Docker", "Kubernetes", "AWS EC2", "CI/CD", "GitHub Actions"] },
  { name: "Tools", note: "Daily workflow.", items: ["Git", "GitHub", "VS Code", "Postman", "Bruno", "Jira"] },
  { name: "Mobile", note: "Contributed to a live Android app.", items: ["React Native", "TypeScript", "Google Play Store releases"] },
];
