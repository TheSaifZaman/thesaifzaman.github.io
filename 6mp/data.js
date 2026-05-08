/* ──────────────────────────────────────────────────────────────
   The Six-Month Ascent — data layer
   Edit freely. The page renders entirely from this object.

   Convention: titles split into { lead, accent } so the renderer
   can italicise the accent without parsing HTML. Slots split into
   { tag, task, detail, done } — tag becomes a styled chip.
   ────────────────────────────────────────────────────────────── */

var ROUTINE = {
  /* ──── WEEKLY RHYTHM (10h sustainable) ──── */
  weekly: [
    {
      day: "Mon", budget: "1.0h", type: "deep",
      slots: [
        {
          time: "06:30 – 07:30",
          tag: "Read",
          task: "Architecture book — one chapter",
          detail: "Open the current month's book at the next chapter. Read with a pen. In your BuJo, capture three things: (1) the core idea in one sentence, (2) one trade-off the author names, (3) one place this shows up in your work or repo. Phone in another room.",
          done: "Three bullets in BuJo + chapter marked complete. Roughly 25 pages covered."
        }
      ]
    },
    {
      day: "Tue", budget: "1.0h", type: "deep",
      slots: [
        {
          time: "06:30 – 07:30",
          tag: "Cert",
          task: "AWS SAA — one module",
          detail: "Watch one Stéphane Maarek or Adrian Cantrill module at 1.25x. Take notes only on what is new to you — skip what you already know from work. Keep the AWS console open in another tab; click through one service as the lecture covers it. Don't just listen.",
          done: "Module finished + a short note (or screenshot) of the one service you actually clicked through."
        }
      ]
    },
    {
      day: "Wed", budget: "1.5h", type: "deep",
      slots: [
        {
          time: "06:30 – 07:15",
          tag: "Cert",
          task: "AWS SAA — practice questions",
          detail: "Fifteen questions on Tutorials Dojo or the official practice set. Focus area = whatever module you watched on Tuesday. After each wrong answer, write a one-line reason in your BuJo — not the right answer, the reason you got it wrong (misread / didn't know / confused two services).",
          done: "Fifteen questions logged. Score recorded. Wrong-answer reasons captured."
        },
        {
          time: "21:30 – 22:15",
          tag: "DSA",
          task: "One pattern problem",
          detail: "Pick from Sean Prashad's pattern list — current pattern only (sliding window, two-pointer, hash map, etc.). Set a 25-minute timer. If stuck after 25 minutes, read the editorial, then re-implement from scratch. Log the pattern and complexity in a private dsa-notes.md.",
          done: "Problem solved (yours or re-implemented). One line added to dsa-notes.md: pattern, time/space, gotcha."
        }
      ]
    },
    {
      day: "Thu", budget: "1.0h", type: "deep",
      slots: [
        {
          time: "06:30 – 07:30",
          tag: "Read",
          task: "Architecture book + ADR link",
          detail: "Read the next chapter (same book as Monday). At the end, ask: does this connect to a decision in my SaaS repo? If yes, jot a draft ADR title in your BuJo (you'll write the actual ADR on Saturday). If no, write one sentence on why the chapter does not yet apply.",
          done: "Chapter complete + either a drafted ADR title or a why-not-yet note."
        }
      ]
    },
    {
      day: "Fri", budget: "1.0h", type: "write",
      slots: [
        {
          time: "21:00 – 22:00",
          tag: "Write",
          task: "Blog draft — outline + first half",
          detail: "Topic = whatever you built or learned this week (the month plan suggests one). Open a markdown file. Write only: title, three-bullet outline, opening hook (one paragraph), and the first section. No editing. No perfection. Just clear the blank page. Editing happens Sunday.",
          done: "One markdown file with title + outline + ~250 words. Pushed to a drafts repo or saved locally."
        }
      ]
    },
    {
      day: "Sat", budget: "4.0h", type: "build",
      slots: [
        {
          time: "09:00 – 09:15",
          tag: "Plan",
          task: "Pick the one thing",
          detail: "Open the current week in this plan. Pick ONE goal from the list — the smallest one that ships something real. Write it at the top of a scratch file. This is the only thing that matters today. Ignore the rest.",
          done: "One sentence written: 'Today I will ship X.' No ambiguity."
        },
        {
          time: "09:15 – 12:30",
          tag: "Build",
          task: "Ship the feature",
          detail: "Code the thing. No new dependencies you haven't researched. No rabbit holes — if a question takes longer than ten minutes, write it in a parking-lot note and move on. Commit small and often: every working step is a commit. Use Claude Code or Cursor as a pair, not as an autopilot.",
          done: "Feature merged to main. At least three commits. CI green."
        },
        {
          time: "12:30 – 13:00",
          tag: "ADR",
          task: "Write the decision down",
          detail: "Open docs/adr/ in the repo. Use the template: Context / Decision / Consequences / Alternatives considered. Three short paragraphs is enough. This is the artifact recruiters will skim — treat it like CV material.",
          done: "ADR-NNNN.md committed. Linked from the README's ADR index."
        }
      ]
    },
    {
      day: "Sun", budget: "1.5h", type: "rest",
      slots: [
        {
          time: "10:00 – 10:45",
          tag: "Ship",
          task: "Publish the post",
          detail: "Open Friday's draft. Edit ruthlessly: cut filler, tighten the hook, add a code block or diagram if it helps, end with a question for readers. Publish on The Prophetic Stack. Cross-post a four-to-six line summary on LinkedIn with the link.",
          done: "Post live + LinkedIn note posted with link. URL added to a published.md index."
        },
        {
          time: "10:45 – 11:00",
          tag: "Track",
          task: "Update progress",
          detail: "Open this plan in the browser. Tick the week's checkbox. Skim next week's goals so Monday morning starts already loaded.",
          done: "Week marked complete. Next week previewed."
        },
        {
          time: "20:00 – 20:30",
          tag: "Plan",
          task: "BuJo weekly review",
          detail: "In your BuJo, answer four questions: (1) What shipped? (2) What slipped, and why? (3) What is the single biggest lever for next week? (4) Honest energy check — sleep, prayer, family, body. Adjust next week's load if needed. Better to cut than to flame out.",
          done: "Four answers written. Next week's morning slots blocked on the calendar."
        }
      ]
    }
  ],

  /* ──── 6 MONTHS, 26 WEEKS ──── */
  months: [
    {
      num: "01",
      lead: "Foundations of ",
      accent: "weight.",
      thesis: "Lock the habit. Open the repo. Buy the books.",
      focus: {
        book: "DDIA — Part I (Ch 1–4)",
        cert: "AWS SAA — Compute, Storage, IAM",
        project: "Repo init, tenancy strategy, ADR-0001",
        signal: "Intro post + first ADR live"
      },
      weeks: [
        {
          headline: "Plant the flag.",
          goals: [
            "Create public GitHub repo: prophetic-stack-saas (README v0.1)",
            "Write ADR-0001: row-level multi-tenancy decision",
            "AWS SAA: EC2, EBS, EFS, S3 module",
            "DDIA Ch 1 (Reliable, Scalable, Maintainable)",
            "Blog post: 'Why I'm building in public for six months'"
          ],
          plan: {
            read: "DDIA Ch 1 — Reliable, Scalable, and Maintainable Applications",
            cert: "AWS SAA: EC2 + EBS + EFS + S3 (Maarek / Cantrill module)",
            certPractice: "AWS SAA practice — Compute & Storage (15 Qs, Tutorials Dojo)",
            dsa: "Hash-map / array — 2 problems (Sean Prashad list)",
            blog: "Why I'm building in public for six months",
            build: "Initialise repo prophetic-stack-saas with README v0.1",
            adr: "ADR-0001: row-level multi-tenancy decision"
          }
        },
        {
          headline: "Tenancy on paper, then in code.",
          goals: [
            "Laravel scaffold with stancl/tenancy or custom column scoping",
            "AWS SAA: VPC, subnets, security groups, NAT",
            "DDIA Ch 2 (Data Models)",
            "DSA: two hash-map / array problems",
            "Blog post: 'Three multi-tenant strategies, ranked'"
          ],
          plan: {
            read: "DDIA Ch 2 — Data Models and Query Languages",
            cert: "AWS SAA: VPC, subnets, security groups, NAT gateways",
            certPractice: "AWS SAA practice — Networking foundations (15 Qs)",
            dsa: "Hash-map / array — 2 more problems",
            blog: "Three multi-tenant strategies, ranked",
            build: "Laravel scaffold with stancl/tenancy or column scoping",
            adr: "Update ADR-0001 with chosen tenancy approach + sample queries"
          }
        },
        {
          headline: "Auth, done the way you've earned.",
          goals: [
            "Port your JWT + Redis auth pattern (anonymized) into the repo",
            "AWS SAA: IAM, roles, policies, STS",
            "DDIA Ch 3 (Storage and Retrieval)",
            "DSA: two sliding-window problems",
            "Blog: 'Stateless auth with Redis pre-computation — the case'"
          ],
          plan: {
            read: "DDIA Ch 3 — Storage and Retrieval",
            cert: "AWS SAA: IAM, roles, policies, STS",
            certPractice: "AWS SAA practice — IAM & Security (15 Qs)",
            dsa: "Sliding-window — 2 problems",
            blog: "Stateless auth with Redis pre-computation — the case",
            build: "Port your JWT + Redis auth pattern (anonymized) into the repo",
            adr: "ADR-draft: auth architecture (Redis-backed JWT)"
          }
        },
        {
          headline: "First deployable.",
          goals: [
            "Dockerise app + Postgres + Redis. docker-compose up clean",
            "AWS SAA: networking deep-dive + practice exam #1",
            "DDIA Ch 4 (Encoding & Evolution)",
            "DSA: two two-pointer problems",
            "Month 1 retrospective post — what worked, what did not"
          ],
          plan: {
            read: "DDIA Ch 4 — Encoding and Evolution",
            cert: "AWS SAA: networking deep-dive (Direct Connect, VPN, Transit Gateway)",
            certPractice: "AWS SAA full practice exam #1 (65 Qs, timed)",
            dsa: "Two-pointer — 2 problems",
            blog: "Month 1 retrospective — what worked, what did not",
            build: "Dockerise app + Postgres + Redis (docker-compose up clean)",
            adr: "ADR-notes: schema evolution + Docker layering"
          }
        }
      ]
    },
    {
      num: "02",
      lead: "Cloud as ",
      accent: "second nature.",
      thesis: "Pass the cert. Deploy the project. Treat devops as craft.",
      focus: {
        book: "DDIA — Part II (Ch 5–6)",
        cert: "AWS SAA exam — booked & passed",
        project: "Live deploy on managed K8s + Terraform",
        signal: "Cert badge + a 'how I deployed' post"
      },
      weeks: [
        {
          headline: "Kubernetes, without flinching.",
          goals: [
            "Provision DOKS / LKE cluster (cheaper than EKS for now)",
            "Helm chart for the app — ingress, secrets, configmap",
            "AWS SAA: Databases (RDS, Aurora, DynamoDB)",
            "DDIA Ch 5 (Replication)",
            "Blog: 'A backend dev's first honest week with Kubernetes'"
          ],
          plan: {
            read: "DDIA Ch 5 — Replication",
            cert: "AWS SAA: Databases (RDS, Aurora, DynamoDB, ElastiCache)",
            certPractice: "AWS SAA practice — Databases (15 Qs)",
            dsa: "Hash-map / sliding-window mix — 2 problems",
            blog: "A backend dev's first honest week with Kubernetes",
            build: "Provision DOKS / LKE cluster + Helm chart (ingress, secrets, configmap)",
            adr: "ADR-draft: managed K8s vendor choice & cost rationale"
          }
        },
        {
          headline: "Infrastructure as code, for real.",
          goals: [
            "Terraform: cluster + DNS + managed Postgres + Redis",
            "Two environments (staging, prod) using workspaces",
            "AWS SAA: Networking advanced + Route 53",
            "DDIA Ch 6 (Partitioning)",
            "Blog: 'Terraform state — the part nobody explains clearly'"
          ],
          plan: {
            read: "DDIA Ch 6 — Partitioning",
            cert: "AWS SAA: Networking advanced + Route 53",
            certPractice: "AWS SAA practice — Advanced networking (15 Qs)",
            dsa: "Two-pointer / sliding mix — 2 problems",
            blog: "Terraform state — the part nobody explains clearly",
            build: "Terraform: cluster + DNS + managed Postgres + Redis (staging + prod workspaces)",
            adr: "ADR-draft: Terraform state backend + workspace topology"
          }
        },
        {
          headline: "CI/CD that doesn't lie.",
          goals: [
            "GitHub Actions: build → test → push image → deploy to staging",
            "Manual approval gate to prod, naive blue/green",
            "AWS SAA: full practice exam #2 + weak-area review",
            "DSA: two graph traversal problems (BFS/DFS)",
            "ADR-0002: deployment strategy"
          ],
          plan: {
            read: "DDIA mid-book consolidation notes (Part I + early Part II)",
            cert: "AWS SAA full practice exam #2 + targeted weak-area review",
            certPractice: "AWS SAA practice — 30 Qs across weak areas",
            dsa: "Graph traversal BFS / DFS — 2 problems",
            blog: "A pragmatic CI/CD pipeline for Laravel (build → test → deploy)",
            build: "GitHub Actions: build → test → push image → deploy to staging + manual prod gate",
            adr: "ADR-0002: deployment strategy (CI/CD + naive blue/green)"
          }
        },
        {
          headline: "Pass the cert. Plant the flag, again.",
          goals: [
            "Sit AWS SAA exam — pass",
            "Post badge + lessons-learned blog",
            "DDIA mid-book review notes — share publicly",
            "Update CV + LinkedIn headline → 'Backend & Cloud Architect (in training)'",
            "Hold off on applications — the artifact isn't ready yet"
          ],
          plan: {
            read: "DDIA Part I + II review (publish takeaways thread)",
            cert: "Sit AWS SAA exam — pass",
            certPractice: "Final mock the night before (45 Qs, timed) + flag-and-review pass",
            dsa: "Rest — defer DSA this week, recover after exam",
            blog: "What I learned passing AWS SAA in 8 weeks",
            build: "Update CV + LinkedIn → 'Backend & Cloud Architect (in training)'",
            adr: "Index ADR-0001 / 0002 in README + tag current version"
          }
        }
      ]
    },
    {
      num: "03",
      lead: "Architecture, made ",
      accent: "visible.",
      thesis: "Event sourcing, CQRS, and the discipline of writing decisions down.",
      focus: {
        book: "DDIA — Part III (Ch 7–9)",
        cert: "—",
        project: "Event sourcing + CQRS in one bounded context",
        signal: "ADR series + architecture diagram post"
      },
      weeks: [
        {
          headline: "Pick the bounded context.",
          goals: [
            "Identify ONE domain in the SaaS to event-source (e.g. Subscriptions)",
            "Spatie laravel-event-sourcing scaffolding",
            "DDIA Ch 7 (Transactions) — read carefully",
            "Blog: 'Why I'm event-sourcing only one thing — and why that's enough'",
            "DSA: two dynamic-programming basics"
          ],
          plan: {
            read: "DDIA Ch 7 — Transactions (read carefully, isolation levels matter)",
            cert: "—",
            certPractice: "—",
            dsa: "Dynamic programming basics — 2 problems",
            blog: "Why I'm event-sourcing only one thing — and why that's enough",
            build: "Spatie laravel-event-sourcing scaffolding for the Subscriptions context",
            adr: "ADR-draft: bounded context + event store choice"
          }
        },
        {
          headline: "Events first, projections next.",
          goals: [
            "Write five-to-seven domain events with proper naming",
            "First read-model projection",
            "DDIA Ch 8 (Trouble with Distributed Systems)",
            "ADR-0003: event vs aggregate boundaries",
            "Blog: 'Domain events I wish I'd written sooner'"
          ],
          plan: {
            read: "DDIA Ch 8 — The Trouble with Distributed Systems",
            cert: "—",
            certPractice: "—",
            dsa: "DP — 2 more problems (LIS, coin change variants)",
            blog: "Domain events I wish I'd written sooner",
            build: "Write 5–7 domain events with proper naming + first read-model projection",
            adr: "ADR-0003: event vs aggregate boundaries"
          }
        },
        {
          headline: "CQRS, without the cargo-cult.",
          goals: [
            "Split command and query paths in Laravel cleanly",
            "Add a second projection (analytics-style)",
            "DDIA Ch 9 (Consistency and Consensus) — the hardest chapter",
            "DSA: two stack/queue problems",
            "Blog: 'CQRS is not microservices — and other corrections'"
          ],
          plan: {
            read: "DDIA Ch 9 — Consistency and Consensus (the hardest chapter)",
            cert: "—",
            certPractice: "—",
            dsa: "Stack / queue — 2 problems (monotonic stack, sliding-window max)",
            blog: "CQRS is not microservices — and other corrections",
            build: "Split command and query paths in Laravel + add a second projection (analytics-style)",
            adr: "ADR-draft: read-model strategy + consistency expectations"
          }
        },
        {
          headline: "Architecture diagram, in public.",
          goals: [
            "Build a real C4 diagram (System + Container + Component levels)",
            "Embed it in the repo README + a dedicated post",
            "Update LinkedIn with the diagram as banner",
            "Month 3 retrospective + half-way self-review",
            "Begin drafting CV bullets in outcome form"
          ],
          plan: {
            read: "DDIA Part II / III consolidation notes (publish takeaways)",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — focus on artifact polish",
            blog: "Reading my SaaS architecture in 30 seconds — a C4 walkthrough",
            build: "Build a real C4 diagram (System + Container + Component) + embed in README + LinkedIn banner",
            adr: "Add C4 diagram links to ADR index page"
          }
        }
      ]
    },
    {
      num: "04",
      lead: "Observability & the ",
      accent: "operator's eye.",
      thesis: "If you cannot see it, you do not own it. Real metrics, traces, logs.",
      focus: {
        book: "Fundamentals of Software Architecture — Part I",
        cert: "—",
        project: "Full o11y stack + load test + cost dashboard",
        signal: "Postmortem-style blog from a self-induced incident"
      },
      weeks: [
        {
          headline: "Three pillars, properly.",
          goals: [
            "Prometheus + Grafana via kube-prometheus-stack",
            "App-level metrics via Laravel exporters",
            "FoSA Ch 1–3 (Architectural thinking, modularity, characteristics)",
            "DSA: two tree problems",
            "Blog: 'The four golden signals, applied to a Laravel app'"
          ],
          plan: {
            read: "FoSA Ch 1–3 — Architectural thinking, modularity, characteristics",
            cert: "—",
            certPractice: "—",
            dsa: "Tree problems — 2 problems (DFS / BFS on binary trees)",
            blog: "The four golden signals, applied to a Laravel app",
            build: "kube-prometheus-stack (Prometheus + Grafana) + Laravel app-level metrics exporters",
            adr: "ADR-draft: SLI / SLO targets per endpoint class"
          }
        },
        {
          headline: "Tracing what you couldn't see.",
          goals: [
            "OpenTelemetry SDK in Laravel — traces to Tempo / Grafana Cloud",
            "Identify the slowest endpoint, fix it on camera (commit + post)",
            "FoSA Ch 4–5 (Architecture characteristics, identifying)",
            "ADR-0004: observability stack",
            "Blog: 'Distributed tracing for a non-distributed app — still worth it'"
          ],
          plan: {
            read: "FoSA Ch 4–5 — Architecture characteristics, identifying",
            cert: "—",
            certPractice: "—",
            dsa: "Tree problems — 2 more (lowest common ancestor, level-order)",
            blog: "Distributed tracing for a non-distributed app — still worth it",
            build: "OpenTelemetry SDK in Laravel + traces to Tempo / Grafana Cloud + fix slowest endpoint live",
            adr: "ADR-0004: observability stack"
          }
        },
        {
          headline: "Break it on purpose.",
          goals: [
            "Run a k6 load test until something cracks",
            "Document the failure mode in a real postmortem template",
            "Add an alert rule that would have caught it",
            "FoSA Ch 6–7 (Measuring & governance, modularity)",
            "Blog: 'I broke my own platform — here's the postmortem'"
          ],
          plan: {
            read: "FoSA Ch 6–7 — Measuring & governance, modularity",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — focus on the incident week",
            blog: "I broke my own platform — here's the postmortem",
            build: "k6 load test until something cracks + postmortem template + alert rule that would have caught it",
            adr: "ADR-update: alerting policy + runbook stub"
          }
        },
        {
          headline: "Cost is a first-class metric.",
          goals: [
            "Build a small cost dashboard (cluster + DB + CDN)",
            "Right-size something — show before/after",
            "FoSA Part I review",
            "DSA: two binary-search problems",
            "Update CV with one new outcome bullet (latency or cost)"
          ],
          plan: {
            read: "FoSA Part I review — publish takeaways thread",
            cert: "—",
            certPractice: "—",
            dsa: "Binary search — 2 problems (rotated array, search-space variants)",
            blog: "Cost is a first-class metric",
            build: "Cost dashboard (cluster + DB + CDN) + right-size something with before/after numbers",
            adr: "ADR-draft: capacity right-sizing decision + cost ceiling"
          }
        }
      ]
    },
    {
      num: "05",
      lead: "AI as a ",
      accent: "force multiplier.",
      thesis: "Not an AI engineer — the backend engineer fluent with AI in production.",
      focus: {
        book: "FoSA — Part II",
        cert: "—",
        project: "Claude-powered admin assistant + agent dev pipeline",
        signal: "Two AI-in-production posts that are not hype"
      },
      weeks: [
        {
          headline: "AI in your own dev loop.",
          goals: [
            "CLAUDE.md for the repo — codified conventions",
            "Plan-mode workflow for one real ticket — write it up",
            "FoSA Ch 8–10 (Component-based, foundations of architecture styles)",
            "DSA: two backtracking problems",
            "Blog: 'My AI-assisted backend workflow, end to end'"
          ],
          plan: {
            read: "FoSA Ch 8–10 — Component-based, foundations of architecture styles",
            cert: "—",
            certPractice: "—",
            dsa: "Backtracking — 2 problems (subsets, permutations)",
            blog: "My AI-assisted backend workflow, end to end",
            build: "CLAUDE.md for the repo (codified conventions) + plan-mode workflow on one real ticket — write it up",
            adr: "ADR-draft: AI-in-development boundary"
          }
        },
        {
          headline: "Agent pipeline, finally finished.",
          goals: [
            "Revisit ZeroClaw or pick an alternative: ticket → branch → PR → review",
            "Wire it to your own project (not BBIL)",
            "FoSA Ch 11–13 (Layered, pipeline, microkernel)",
            "ADR-0005: AI tooling boundaries (what AI does and does not do)",
            "Blog: 'An autonomous dev agent that I actually trust'"
          ],
          plan: {
            read: "FoSA Ch 11–13 — Layered, pipeline, microkernel",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — agent-pipeline week",
            blog: "An autonomous dev agent that I actually trust",
            build: "ZeroClaw or alternative agent pipeline (ticket → branch → PR → review) wired to your project",
            adr: "ADR-0005: AI tooling boundaries (what AI does and does not do)"
          }
        },
        {
          headline: "Claude in the product, with guardrails.",
          goals: [
            "Add a small admin assistant inside the SaaS using the Anthropic API",
            "Implement: rate limiting, cost cap, eval harness, fallback",
            "FoSA Ch 14–16 (SOA, microservices, choosing styles)",
            "DSA: two design-pattern style problems",
            "Blog: 'Putting an LLM in production responsibly'"
          ],
          plan: {
            read: "FoSA Ch 14–16 — Service-based, event-driven, space-based",
            cert: "—",
            certPractice: "—",
            dsa: "Design-pattern style — 2 problems (LRU cache, design Twitter timeline)",
            blog: "Putting an LLM in production responsibly",
            build: "Admin assistant via Anthropic API + rate limiting + cost cap + eval harness + fallback",
            adr: "ADR-draft: LLM cost ceilings, rate limits, and fallback policy"
          }
        },
        {
          headline: "Evaluate, do not vibe.",
          goals: [
            "Build a small eval set for the assistant — pass/fail",
            "CI gate: blocks deploy if eval pass-rate drops",
            "Cost & latency dashboard for the LLM path",
            "FoSA Part II wrap notes — public",
            "CV update — 'Production LLM integration with evals & cost ceilings'"
          ],
          plan: {
            read: "FoSA Part II wrap notes — publish",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — eval-gating week",
            blog: "Evaluate, don't vibe — eval-gated LLM CI",
            build: "Eval set for the assistant + CI gate (blocks deploy on regression) + LLM cost & latency dashboard",
            adr: "ADR-update: eval thresholds & rollback policy"
          }
        }
      ]
    },
    {
      num: "06",
      lead: "Public, and ",
      accent: "employable.",
      thesis: "Polish the artifacts. Open the door. Run the search like an engineer.",
      focus: {
        book: "System Design Interview — Vol I (selected chapters)",
        cert: "—",
        project: "Polish, demo video, architecture readme, case study",
        signal: "Outreach engine running. Interviews booked."
      },
      weeks: [
        {
          headline: "Make the repo unmissable.",
          goals: [
            "README rewrite: problem, architecture diagram, ADR index, demo gif",
            "Pin three best blog posts to LinkedIn featured",
            "Record a three-minute Loom demo of the system",
            "System Design Interview: Ch 1–4 (scale, back-of-envelope)",
            "Mock system design interview — solo, recorded"
          ],
          plan: {
            read: "System Design Interview Vol I — Ch 1–4 (scale, back-of-envelope estimation)",
            cert: "—",
            certPractice: "—",
            dsa: "Taper — 1 medium problem (pick from your weakest category)",
            blog: "Make the repo unmissable — README anatomy",
            build: "README rewrite (problem, architecture diagram, ADR index, demo gif) + 3-min Loom demo + pin 3 best blogs to LinkedIn featured",
            adr: "ADR index — final pass + cross-link"
          }
        },
        {
          headline: "CV & profile, sharpened.",
          goals: [
            "One-page CV, outcome bullets only, repo + blog above the fold",
            "LinkedIn: KL-aware headline, banner = your architecture diagram",
            "Wellfound + Arc profiles complete",
            "List of thirty target companies (Malaysia primary, remote-global secondary)",
            "Blog: 'Six months in public — what I'd tell myself in week 1'"
          ],
          plan: {
            read: "System Design Interview Vol I — Ch 5–6 (rate limiter, consistent hashing)",
            cert: "—",
            certPractice: "—",
            dsa: "Taper — 1 medium problem",
            blog: "Six months in public — what I'd tell myself in week 1",
            build: "One-page CV (outcome bullets) + LinkedIn (KL-aware headline + arch-diagram banner) + Wellfound + Arc + 30-target list",
            adr: "—"
          }
        },
        {
          headline: "Outreach as a system.",
          goals: [
            "Ten tailored applications this week (not a hundred sprayed)",
            "Five warm DMs to KL-based engineering managers",
            "Two mock system-design sessions (Pramp / friend / Discord)",
            "System Design Interview: two case studies",
            "Track everything in a simple spreadsheet — funnel, not feelings"
          ],
          plan: {
            read: "System Design Interview Vol I — 2 case studies (Twitter timeline + News Feed)",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — interview cadence focus",
            blog: "The interview funnel I'm running this month",
            build: "10 tailored applications + 5 warm DMs to KL eng managers + 2 mock SDI sessions (Pramp / friend / Discord)",
            adr: "—"
          }
        },
        {
          headline: "Compound, hand off, breathe.",
          goals: [
            "Ten more tailored applications + follow-ups on the first ten",
            "Publish a final 'what I built' case-study post",
            "Set Q3 goals: depth in one architecture style, one talk submitted",
            "Schedule a real off-week — you've earned it",
            "Bismillah on what comes next."
          ],
          plan: {
            read: "System Design Interview Vol I — 2 more case studies (Notification + Chat)",
            cert: "—",
            certPractice: "—",
            dsa: "Rest — close-out week",
            blog: "Six months, what I built — final case study",
            build: "10 more applications + follow-ups on first 10 + Q3 goals + schedule a real off-week",
            adr: "—"
          }
        }
      ]
    }
  ],

  /* ──── ARTIFACTS YOU OWN AT MONTH SIX ──── */
  deliverables: [
    { icon: "①", name: "One public repo",        desc: "Multi-tenant SaaS with event sourcing, IaC, CI/CD, observability." },
    { icon: "②", name: "Twelve+ blog posts",      desc: "On The Prophetic Stack — architecture, devops, AI in production." },
    { icon: "③", name: "AWS SAA cert",            desc: "Passed by end of Month 2. Cloud literacy proven." },
    { icon: "④", name: "Five+ ADRs",              desc: "Architecture decisions, written in public, defended in interviews." },
    { icon: "⑤", name: "C4 diagram",              desc: "System architecture you can whiteboard in your sleep." },
    { icon: "⑥", name: "Demo + case study",       desc: "Three-minute Loom + a written case study recruiters can skim." },
    { icon: "⑦", name: "Outcome-driven CV",       desc: "Latency, cost, and reliability numbers — not responsibilities." },
    { icon: "⑧", name: "Interview pipeline",      desc: "Thirty targets, twenty applications, real conversations underway." }
  ]
};
