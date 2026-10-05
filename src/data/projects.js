// Each project has "issues": real problems, how they were debugged, and the fix.
// These case files are drafted from your resume. Edit the wording so every
// story matches exactly what you did. Interviewers will ask about them.

export const projects = [
  {
    slug: "skoegle-gps-tracker",
    title: "Skoegle IoT GPS Tracker Platform",
    variant: "route",
    accent: "#2440E8",
    short: "A real-time device tracking dashboard with live maps, JWT login and Redis-backed APIs, plus a React Native companion app on Google Play.",
    role: "Full Stack Developer",
    period: "2024 – 2026",
    links: [{ label: "Open live GPS tracker", href: "https://vmarg.skoegle.com/login" }],
    stack: ["React.js", "Redux", "Node.js", "PostgreSQL", "Redis", "React Native", "Map API", "JWT"],
    overview:
      "A platform where customers track and manage GPS devices on a live map. I built reusable React components, REST API integrations, JWT authentication, the Map API tracking view, and CRUD operations backed by PostgreSQL and Redis. I also contributed to the React Native app, including builds released on the Google Play Store.",
    issues: [
      {
        title: "The map froze when many devices reported at once",
        symptom: "Every few seconds, live location updates arrived for many devices. The map stuttered and the whole dashboard felt frozen.",
        steps: [
          { title: "Reproduce it on demand", detail: "I wrote a small script that sent bursts of fake location updates, so I could see the problem instantly instead of waiting for real traffic." },
          { title: "Measure before guessing", detail: "I recorded the React DevTools Profiler. Every marker re-rendered on every single update, even for devices that had not moved." },
          { title: "Find the root cause", detail: "Live data was stored as one array in Redux. Each update created a new array, so React re-rendered all markers." },
          { title: "Fix and verify", detail: "I stored devices by id, used selectors so each marker reads only its own device, wrapped markers in React.memo, and batched incoming updates. The Profiler then showed only changed markers rendering, and I added a reducer test." },
        ],
        fix: "Normalised device state, per-device selectors, memoised markers and batched updates.",
        ai: "I asked Claude to explain why a single array state causes full re-renders and to compare selector patterns. I confirmed the result in the Profiler myself before merging.",
      },
      {
        title: "Users were logged out at random",
        symptom: "During long sessions, users were suddenly sent back to the login page in the middle of work.",
        steps: [
          { title: "Reproduce it", detail: "I shortened the token expiry in a test environment so the logout happened within a minute." },
          { title: "Follow the network", detail: "The Network tab showed a 401 response, then an immediate redirect. Several requests were failing together." },
          { title: "Find the root cause", detail: "The access token expired, and there was no refresh handling. Parallel requests all failed at once." },
          { title: "Fix and verify", detail: "I added an API interceptor that refreshes the token once, queues the other requests, and retries them. A Cypress test now covers an expired session." },
        ],
        fix: "Single-flight token refresh with a retry queue.",
        ai: "ChatGPT helped me sketch the refresh-and-queue flow. I rewrote it to fit our API and tested edge cases by hand.",
      },
      {
        title: "The device list API was slow",
        symptom: "Loading the device list took noticeably longer as data grew.",
        steps: [
          { title: "Measure the API", detail: "I timed the endpoint in Postman to get a baseline number." },
          { title: "Read the query plan", detail: "EXPLAIN ANALYZE showed a sequential scan on a large table and the same query being repeated for every page load." },
          { title: "Fix and verify", detail: "I added the missing index, cached read-heavy responses in Redis with a short TTL, and cleared the cache on writes. I compared before and after timings in Postman." },
        ],
        fix: "Index on the filter column plus Redis caching with invalidation on writes.",
        ai: "Copilot suggested the index syntax inline. I chose the columns after reading the query plan.",
      },
    ],
    result: "API response times improved by roughly 30%, and the live map stays smooth with many devices online.",
    learned: "Measure first. Every fix I trust started with a profiler, a query plan, or a network trace, not a guess.",
  },
  {
    slug: "skofit-healthcare-fitness",
    title: "Skofit Healthcare and Fitness App",
    variant: "pulse",
    accent: "#0E8F6E",
    short: "Live heart rate, SpO2, calories and health-schedule screens that stay responsive under constant real-time updates.",
    role: "Full Stack Developer",
    period: "2025 – 2026",
    links: [{ label: "Get SkoFit on Google Play", href: "https://play.google.com/store/apps/details?id=com.manoj2002.skoFit" }],
    stack: ["React.js", "React Native", "Redux", "REST APIs", "Redis", "Node.js"],
    overview:
      "A health and fitness interface that shows heart rate, SpO2, calories and a daily health schedule from wearable data. I built the UI features and API integrations, used Redux for central state, and relied on Redis-backed caching to keep screens fast during frequent updates.",
    issues: [
      {
        title: "Health values flickered back to old numbers",
        symptom: "Heart rate sometimes jumped to an older reading a moment after showing the correct one.",
        steps: [
          { title: "Log the timing", detail: "I logged request start times and response times for each reading." },
          { title: "Spot the pattern", detail: "Responses were arriving out of order. A slow older request finished after a newer one and overwrote it." },
          { title: "Fix and verify", detail: "I cancelled superseded requests with AbortController and ignored any response older than what was already in the store. I wrote a test that replays late responses." },
        ],
        fix: "Cancel outdated requests and reject stale timestamps in the reducer.",
        ai: "Claude helped me name the problem (a race condition) and list the ways to handle it. I picked the smallest fix.",
      },
      {
        title: "Charts became slow with frequent updates",
        symptom: "The trends screen lagged whenever new readings came in.",
        steps: [
          { title: "Profile the screen", detail: "The React Profiler showed chart data being rebuilt on every render." },
          { title: "Find the root cause", detail: "Daily aggregates were recalculated in the component, on every update, for the full day of data." },
          { title: "Fix and verify", detail: "I memoised the calculation with useMemo, throttled chart updates, and served repeated aggregates from Redis-backed API responses." },
        ],
        fix: "Memoised chart data, throttled updates and cached aggregates.",
        ai: "Copilot autocompleted the memo boilerplate. I decided the throttle interval by testing on a mid-range phone.",
      },
    ],
    result: "The interface stays responsive under frequent real-time updates, with values that no longer flicker.",
    learned: "Real-time UIs fail in timing, not logic. Logging timestamps early saves hours.",
  },
  {
    slug: "patient-health-monitoring",
    title: "Patient Health Monitoring and Go-Live Platform",
    variant: "shield",
    accent: "#B4265E",
    short: "Front-end views and REST APIs for patients and connected medical devices, including fall-detection alerts.",
    role: "Full Stack Developer",
    period: "2025 – 2026",
    stack: ["React.js", "Redux", "Node.js", "REST APIs", "Cypress", "Jest"],
    overview:
      "A platform for patient and connected medical device workflows. I built front-end views and REST APIs, including fall-detection alerts, and kept test coverage strong so the experience stayed consistent for care teams.",
    issues: [
      {
        title: "The same fall alert showed up more than once",
        symptom: "A single fall event created repeated alerts on the dashboard, which made the team distrust it.",
        steps: [
          { title: "Reproduce with an API client", detail: "I replayed the device message in Bruno and Postman and saw duplicate alerts created." },
          { title: "Read the server logs", detail: "The logs showed the same message being processed twice because the device retried when the first response was slow." },
          { title: "Fix and verify", detail: "I added an idempotency check: each event id is stored in Redis for a short window, and repeats are ignored. I wrote Jest tests for repeated and out-of-order messages." },
        ],
        fix: "Deduplicate device events by id with a short-lived Redis key.",
        ai: "ChatGPT reviewed my idempotency approach and pointed out an edge case with expiry. I tested that case explicitly.",
      },
      {
        title: "Bugs kept appearing after each release",
        symptom: "Small regressions in key screens were found by users after deployment.",
        steps: [
          { title: "Collect the pattern", detail: "I listed recent post-release bugs in Jira. Most were on the same few user flows." },
          { title: "Automate the critical paths", detail: "I wrote Cypress tests for login, patient view and alert handling, and Jest tests for the reducers and helpers behind them." },
          { title: "Run them on every change", detail: "The suites run in GitHub Actions on each pull request, so a broken flow blocks the merge." },
        ],
        fix: "Cypress and Jest coverage on critical flows, enforced in CI.",
        ai: "Claude helped me list edge cases per flow. I wrote and ran the tests myself.",
      },
    ],
    result: "Post-release bugs dropped by an estimated 15%, and releases became calmer.",
    learned: "In healthcare software, a boring, reliable alert is worth more than a clever feature.",
  },
  {
    slug: "cicd-docker-kubernetes",
    title: "CI/CD Pipeline with Docker and Kubernetes",
    variant: "pipeline",
    accent: "#7A4CE0",
    short: "An automated build, test and deploy flow that shortened the release cycle by around 25%.",
    role: "Full Stack Developer",
    period: "2025 – 2026",
    stack: ["GitHub Actions", "Docker", "Kubernetes", "AWS EC2", "Node.js"],
    overview:
      "I streamlined how our apps reach production: GitHub Actions builds and tests each change, Docker packages the app, and Kubernetes runs it. The goal was fewer manual steps and safer releases.",
    issues: [
      {
        title: "Docker builds were slow and images were large",
        symptom: "Every pipeline run spent minutes rebuilding dependencies, and images took long to push and pull.",
        steps: [
          { title: "Read the build log", detail: "Dependencies were reinstalled on every run because the copy step invalidated the cache." },
          { title: "Fix and verify", detail: "I used a multi-stage Dockerfile, copied package files first so the install layer is cached, and shipped only production files. I compared build times and image sizes before and after." },
        ],
        fix: "Multi-stage builds with layer caching.",
        ai: "Copilot suggested the multi-stage structure. I trimmed it and checked the final image contents.",
      },
      {
        title: "A new pod kept restarting after deploy (CrashLoopBackOff)",
        symptom: "After a deploy, the new pod crashed and restarted in a loop while the old version was being replaced.",
        steps: [
          { title: "Check the status", detail: "kubectl get pods showed CrashLoopBackOff." },
          { title: "Read the logs and events", detail: "kubectl logs and kubectl describe showed the app exiting at startup because an environment variable was missing." },
          { title: "Fix and verify", detail: "I moved configuration into Kubernetes secrets and config maps, added readiness probes so traffic only reaches healthy pods, and added a config check step to the pipeline." },
        ],
        fix: "Config in secrets, readiness probes, and a pre-deploy check.",
        ai: "Claude helped me read the kubectl describe output and explained probe settings. I tuned the values against our startup time.",
      },
    ],
    result: "Release cycle time shortened by around 25%, with fewer manual deploy mistakes.",
    learned: "Most deployment bugs are configuration bugs. Make the pipeline check configuration before it ships.",
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
