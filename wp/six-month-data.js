var SIX_MONTH_DATA = {
  pageTitle: "Six-Month Ascent — Nocturnal",
  header: {
    title: 'The Seven-Month <em>Ascent</em>',
    subtitle: 'A focused plan to compound architecture, devops, signal — and hifz. Closing in December with live interviews.',
    accentLine: '10h tech · 5h deen · 28 weeks · one repo · one mushaf · 30 interviews.'
  },
  pact: 'AI has collapsed execution. You can\'t out-volume a fleet of AI-augmented juniors — you out-<strong>think</strong> them, and you out-<strong>weigh</strong> them on a different mizan. This plan trades breadth for depth: one cloud, one book, one project, one public voice — and one mushaf, opened before any of it. Tadbir before <em>\'amal</em>; niyyah before to-do; hifz before tech. Repeated until <strong>the compounding shows on both ledgers — the CV and the scale that matters most</strong>.',
  stats: [
    { num: '28',  lbl: 'weeks' },
    { num: '280', lbl: 'tech hrs' },
    { num: '140', lbl: 'deen hrs' },
    { num: '780', lbl: 'ayaah' }
  ],
  focusLabels: {
    book:    'Book',
    cert:    'Cert',
    project: 'Project',
    signal:  'Signal',
    deen:    'Deen'
  },
  planLabels: {
    read:         'Read',
    cert:         'Cert',
    certPractice: 'Practice',
    dsa:          'DSA',
    blog:         'Blog',
    build:        'Build',
    adr:          'ADR'
  },
  slotTags: {
    hifz:      { label: 'Hifz',      color: 'sleep'  },
    arabic:    { label: 'Arabic',    color: 'sleep'  },
    read:      { label: 'Read',      color: 'blue'   },
    cert:      { label: 'Cert',      color: 'green'  },
    dsa:       { label: 'DSA',       color: 'muted'  },
    write:     { label: 'Write',     color: 'rose'   },
    plan:      { label: 'Plan',      color: 'accent' },
    build:     { label: 'Build',     color: 'accent' },
    adr:       { label: 'ADR',       color: 'sleep'  },
    ship:      { label: 'Ship',      color: 'rose'   },
    track:     { label: 'Track',     color: 'muted'  },
    interview: { label: 'Interview', color: 'rose'   }
  },
  // Times mirror wp/index.html daily plan slots so the six-month plan
  // slots into the existing day rhythm rather than competing with it.
  weekTemplate: [
    {
      day: 'Mon', budget: '~1h50m', tone: 'deep',
      slots: [
        { time: '4:30 – 4:50',  tag: 'arabic', task: 'In the Arabic drill slot, work through vocabulary and Quranic roots paired with your current hifz, and write the week\'s niyyah before opening any code.' },
        { time: '6:30 – 7:00',  tag: 'hifz',   task: 'In the Quran slot, memorise five new ayaah with three tajweed reads, listen to a qari, and then recite from memory.' },
        { time: '10:00 – 11:00', tag: 'read',  source: 'read', prefix: 'During the office self-learn slot, read ', suffix: '.' }
      ]
    },
    {
      day: 'Tue', budget: '~1h50m', tone: 'deep',
      slots: [
        { time: '4:30 – 4:50',  tag: 'arabic', task: 'In the Arabic drill slot, do a word-by-word translation of yesterday\'s set and underline every root you already recognise.' },
        { time: '6:30 – 7:00',  tag: 'hifz',   task: 'In the Quran slot, memorise five new ayaah; the cumulative total for this week is ten.' },
        { time: '10:00 – 11:00', tag: 'cert',  source: 'cert', prefix: 'During the office self-learn slot, study ', suffix: '.' }
      ]
    },
    {
      day: 'Wed', budget: '~2h20m', tone: 'deep',
      slots: [
        { time: '4:30 – 4:50',  tag: 'arabic', task: 'In the Arabic drill slot, push hard on whichever grammar topic you avoided last time.' },
        { time: '6:30 – 7:00',  tag: 'hifz',   task: 'In the Quran slot, memorise five new ayaah; the cumulative total for this week is fifteen.' },
        { time: '9:30 – 10:00', tag: 'dsa',    source: 'dsa', prefix: 'In the evening part-time slot, solve ', suffix: '.' },
        { time: '10:00 – 11:00', tag: 'cert',  source: 'certPractice', prefix: 'During the office self-learn slot, run cert practice on ', suffix: '.' }
      ]
    },
    {
      day: 'Thu', budget: '~2h', tone: 'deep',
      slots: [
        { time: '4:30 – 5:00',  tag: 'arabic', task: 'In the Arabic deep-dive slot, take a tafsir snapshot and write one paragraph on what has shifted in your understanding.' },
        { time: '6:30 – 7:00',  tag: 'hifz',   task: 'In the Quran slot, memorise five new ayaah; the cumulative total for this week is twenty.' },
        { time: '10:00 – 11:00', tag: 'read',  source: 'read', prefix: 'During the office self-learn slot, read chapter two and draft an ADR title in your bullet journal — your reading focus is ', suffix: '.' }
      ]
    },
    {
      day: 'Fri', budget: '~3h30m', tone: 'write',
      slots: [
        { time: '4:30 – 5:00',  tag: 'arabic', task: 'In the Arabic deep-dive slot, consolidate your grammar before Jumu\'ah.' },
        { time: '5:00 – 6:30',  tag: 'write',  source: 'blog', prefix: 'In the long-form blog slot, draft a post titled "', suffix: '".' },
        { time: '6:30 – 7:00',  tag: 'hifz',   task: 'In the Quran slot, memorise five new ayaah; the cumulative total for this week is twenty-five — plan to recite them in Jumu\'ah salah.' },
        { time: '10:00 – 11:00', tag: 'read',  task: 'In the office self-learn slot, read code, research your next post, and polish your ADR notes.' }
      ]
    },
    {
      day: 'Sat', budget: '~5h30m', tone: 'build',
      slots: [
        { time: '6:30 – 7:00',  tag: 'hifz',      task: 'In the Quran slot, memorise five new ayaah; the cumulative total for this week reaches thirty, with a short ayah-of-the-week reflection.' },
        { time: '9:00 – 12:00', tag: 'build',     source: 'build', prefix: 'In the part-time heavy block, ship the feature: ', suffix: '.' },
        { time: '2:30 – 4:00',  tag: 'adr',       source: 'adr', prefix: 'In the first half of the self-learn deep block, write the decision — ', suffix: '.', fallback: 'In the first half of the self-learn deep block, skip the formal ADR this week and extend the build or hands-on lab instead.' },
        { time: '4:00 – 5:00',  tag: 'interview', source: 'interviewSat', prefix: 'In the second half of the self-learn deep block, run interview prep: ' }
      ]
    },
    {
      day: 'Sun', budget: '~3h30m', tone: 'rest',
      slots: [
        { time: '4:50 – 5:30',  tag: 'ship',      source: 'blog', prefix: 'In the blog-writing slot, edit and publish the post titled "', suffix: '", then share a LinkedIn summary with the link.' },
        { time: '6:30 – 7:00',  tag: 'hifz',      task: 'In the Quran slot, run this week\'s revision — thirty ayaah from this week plus ten ayaah from a prior week, all from memory.' },
        { time: '3:00 – 4:00',  tag: 'plan',      task: 'In the first half of the weekly review slot, run through the five bullet-journal questions and preview next week\'s six-month load.' },
        { time: '4:00 – 5:00',  tag: 'interview', source: 'interviewSun', prefix: 'In the second half of the weekly review slot, run interview prep: ' },
        { time: '10:00 – 10:30', tag: 'track',    task: 'In the evening journaling and week-ahead slot, tick this week complete and set Monday\'s top three tasks.' }
      ]
    }
  ],
  months: [
    {
      num: '01',
      tabLabel: 'Foundations',
      lead: 'Foundations of ',
      accent: 'weight.',
      thesis: 'Lock the habit. Open the repo. Buy the books.',
      focus: {
        book: 'DDIA — Part I (Ch 1–4)',
        cert: 'AWS SAA — Compute, Storage, IAM',
        project: 'Repo init, tenancy strategy, ADR-0001',
        signal: 'Intro post + first ADR live',
        deen: 'Surah Al-Mulk → Al-Haqqah · Madinah Book 1 ch 1–3'
      },
      weeks: [
        {
          headline: 'Plant the flag.',
          goals: [
            'Create public GitHub repo: prophetic-stack-saas (README v0.1)',
            'Write ADR-0001: row-level multi-tenancy decision',
            'AWS SAA: EC2, EBS, EFS, S3 module',
            'DDIA Ch 1 (Reliable, Scalable, Maintainable)',
            "Blog post: 'Why I’m building in public for six months'",
            'Hifz: 30 new ayaah · Surah Al-Mulk (cadence-set week) + Madinah Arabic Book 1 lesson 1'
          ],
          plan: {
            read: 'DDIA Ch 1 — Reliable, Scalable, and Maintainable Applications',
            cert: 'AWS SAA: EC2 + EBS + EFS + S3 (Maarek / Cantrill module)',
            certPractice: 'AWS SAA practice — Compute & Storage (15 Qs, Tutorials Dojo)',
            dsa: 'Hash-map / array — 2 problems (Sean Prashad list)',
            blog: "Why I’m building in public for six months",
            build: 'Initialise repo prophetic-stack-saas with README v0.1',
            adr: 'ADR-0001: row-level multi-tenancy decision',
            interviewSat: '60-second self-intro · who I am · one signature win · where I am heading.',
            interviewSun: 'Record on phone · watch back · cut filler · tighten to 60 seconds flat.'
          }
        },
        {
          headline: 'Tenancy on paper, then in code.',
          goals: [
            'Laravel scaffold with stancl/tenancy or custom column scoping',
            'AWS SAA: VPC, subnets, security groups, NAT',
            'DDIA Ch 2 (Data Models)',
            'DSA: two hash-map / array problems',
            "Blog post: 'Three multi-tenant strategies, ranked'",
            'Hifz: 30 new ayaah · Al-Mulk close + Al-Qalam opens · Madinah Book 1 lesson 2'
          ],
          plan: {
            read: 'DDIA Ch 2 — Data Models and Query Languages',
            cert: 'AWS SAA: VPC, subnets, security groups, NAT gateways',
            certPractice: 'AWS SAA practice — Networking foundations (15 Qs)',
            dsa: 'Hash-map / array — 2 more problems',
            blog: 'Three multi-tenant strategies, ranked',
            build: 'Laravel scaffold with stancl/tenancy or column scoping',
            adr: 'Update ADR-0001 with chosen tenancy approach + sample queries',
            interviewSat: '"Tell me about yourself" · 2-minute career arc · past → present → near future.',
            interviewSun: 'Solo mock + record · time it to 2:00 · trim what does not earn its seconds.'
          }
        },
        {
          headline: "Auth, done the way you’ve earned.",
          goals: [
            'Port your JWT + Redis auth pattern (anonymized) into the repo',
            'AWS SAA: IAM, roles, policies, STS',
            'DDIA Ch 3 (Storage and Retrieval)',
            'DSA: two sliding-window problems',
            "Blog: 'Stateless auth with Redis pre-computation — the case'",
            'Hifz: 30 new ayaah · Al-Qalam · Madinah Book 1 lesson 3'
          ],
          plan: {
            read: 'DDIA Ch 3 — Storage and Retrieval',
            cert: 'AWS SAA: IAM, roles, policies, STS',
            certPractice: 'AWS SAA practice — IAM & Security (15 Qs)',
            dsa: 'Sliding-window — 2 problems',
            blog: 'Stateless auth with Redis pre-computation — the case',
            build: 'Port your JWT + Redis auth pattern (anonymized) into the repo',
            adr: 'ADR-draft: auth architecture (Redis-backed JWT)',
            interviewSat: 'List 5 career moments worth telling · map each into STAR (Situation, Task, Action, Result).',
            interviewSun: 'Refine the strongest two · practice aloud · drop the rest into a backup list.'
          }
        },
        {
          headline: 'First deployable.',
          goals: [
            'Dockerise app + Postgres + Redis. docker-compose up clean',
            'AWS SAA: networking deep-dive + practice exam #1',
            'DDIA Ch 4 (Encoding & Evolution)',
            'DSA: two two-pointer problems',
            'Month 1 retrospective post — what worked, what did not',
            'Hifz: 30 new ayaah · Al-Haqqah + Month 1 cumulative revision sweep'
          ],
          plan: {
            read: 'DDIA Ch 4 — Encoding and Evolution',
            cert: 'AWS SAA: networking deep-dive (Direct Connect, VPN, Transit Gateway)',
            certPractice: 'AWS SAA full practice exam #1 (65 Qs, timed)',
            dsa: 'Two-pointer — 2 problems',
            blog: 'Month 1 retrospective — what worked, what did not',
            build: 'Dockerise app + Postgres + Redis (docker-compose up clean)',
            adr: 'ADR-notes: schema evolution + Docker layering',
            interviewSat: '"Why leaving / why this company" · honest, forward-looking, no bridge-burning.',
            interviewSun: 'Customize for 3 archetypes · KL startup · remote-global · large product co.'
          }
        }
      ]
    },
    {
      num: '02',
      tabLabel: 'Cloud',
      lead: 'Cloud as ',
      accent: 'second nature.',
      thesis: 'Pass the cert. Deploy the project. Treat devops as craft.',
      focus: {
        book: 'DDIA — Part II (Ch 5–6)',
        cert: 'AWS SAA exam — booked & passed',
        project: 'Live deploy on managed K8s + Terraform',
        signal: "Cert badge + a 'how I deployed' post",
        deen: 'Al-Maarij → Al-Muddaththir · Madinah Book 1 ch 4–6'
      },
      weeks: [
        {
          headline: 'Kubernetes, without flinching.',
          goals: [
            'Provision DOKS / LKE cluster (cheaper than EKS for now)',
            'Helm chart for the app — ingress, secrets, configmap',
            'AWS SAA: Databases (RDS, Aurora, DynamoDB)',
            'DDIA Ch 5 (Replication)',
            "Blog: 'A backend dev’s first honest week with Kubernetes'",
            'Hifz: 30 new ayaah · Al-Maarij · Madinah Book 1 lesson 4'
          ],
          plan: {
            read: 'DDIA Ch 5 — Replication',
            cert: 'AWS SAA: Databases (RDS, Aurora, DynamoDB, ElastiCache)',
            certPractice: 'AWS SAA practice — Databases (15 Qs)',
            dsa: 'Hash-map / sliding-window mix — 2 problems',
            blog: "A backend dev’s first honest week with Kubernetes",
            build: 'Provision DOKS / LKE cluster + Helm chart (ingress, secrets, configmap)',
            adr: 'ADR-draft: managed K8s vendor choice & cost rationale',
            interviewSat: 'Pick your strongest past project · outline STAR + technical depth · the 3-minute version.',
            interviewSun: 'Practice the 3-min project pitch aloud · record · cut filler.'
          }
        },
        {
          headline: 'Infrastructure as code, for real.',
          goals: [
            'Terraform: cluster + DNS + managed Postgres + Redis',
            'Two environments (staging, prod) using workspaces',
            'AWS SAA: Networking advanced + Route 53',
            'DDIA Ch 6 (Partitioning)',
            "Blog: 'Terraform state — the part nobody explains clearly'",
            'Hifz: 30 new ayaah · Surah Nuh · Madinah Book 1 lesson 5'
          ],
          plan: {
            read: 'DDIA Ch 6 — Partitioning',
            cert: 'AWS SAA: Networking advanced + Route 53',
            certPractice: 'AWS SAA practice — Advanced networking (15 Qs)',
            dsa: 'Two-pointer / sliding mix — 2 problems',
            blog: 'Terraform state — the part nobody explains clearly',
            build: 'Terraform: cluster + DNS + managed Postgres + Redis (staging + prod workspaces)',
            adr: 'ADR-draft: Terraform state backend + workspace topology',
            interviewSat: 'Multi-tenancy trade-offs · row-level vs schema vs database isolation · cost / scale / blast radius.',
            interviewSun: 'Mock: "Why did you choose row-level multi-tenancy?" · defend in 2 minutes.'
          }
        },
        {
          headline: "CI/CD that doesn’t lie.",
          goals: [
            'GitHub Actions: build → test → push image → deploy to staging',
            'Manual approval gate to prod, naive blue/green',
            'AWS SAA: full practice exam #2 + weak-area review',
            'DSA: two graph traversal problems (BFS/DFS)',
            'ADR-0002: deployment strategy',
            "Hifz: 30 new ayaah · Al-Jinn → Al-Muzzammil · Madinah Book 1 lesson 6"
          ],
          plan: {
            read: 'DDIA mid-book consolidation notes (Part I + early Part II)',
            cert: 'AWS SAA full practice exam #2 + targeted weak-area review',
            certPractice: 'AWS SAA practice — 30 Qs across weak areas',
            dsa: 'Graph traversal BFS / DFS — 2 problems',
            blog: 'A pragmatic CI/CD pipeline for Laravel (build → test → deploy)',
            build: 'GitHub Actions: build → test → push image → deploy to staging + manual prod gate',
            adr: 'ADR-0002: deployment strategy (CI/CD + naive blue/green)',
            interviewSat: 'Pitch your cloud platform · where compute lives · why managed K8s · what is IaC-d.',
            interviewSun: 'Mock: "Walk me through your deployment" · 5 minutes flat.'
          }
        },
        {
          headline: 'Pass the cert. Plant the flag, again.',
          goals: [
            'Sit AWS SAA exam — pass',
            'Post badge + lessons-learned blog',
            'DDIA mid-book review notes — share publicly',
            "Update CV + LinkedIn headline → 'Backend & Cloud Architect (in training)'",
            "Hold off on applications — the artifact isn’t ready yet",
            'Hifz: lighter week post-cert · Al-Muddaththir + Month 2 cumulative revision'
          ],
          plan: {
            read: 'DDIA Part I + II review (publish takeaways thread)',
            cert: 'Sit AWS SAA exam — pass',
            certPractice: 'Final mock the night before (45 Qs, timed) + flag-and-review pass',
            dsa: 'Rest — defer DSA this week, recover after exam',
            blog: 'What I learned passing AWS SAA in 8 weeks',
            build: "Update CV + LinkedIn → 'Backend & Cloud Architect (in training)'",
            adr: 'Index ADR-0001 / 0002 in README + tag current version',
            interviewSat: 'Rewrite 3 CV bullets in outcome form · latency, cost, reliability · numbers, not duties.',
            interviewSun: 'Send to a senior engineer for review · iterate based on feedback.'
          }
        }
      ]
    },
    {
      num: '03',
      tabLabel: 'Architecture',
      lead: 'Architecture, made ',
      accent: 'visible.',
      thesis: 'Event sourcing, CQRS, and the discipline of writing decisions down.',
      focus: {
        book: 'DDIA — Part III (Ch 7–9)',
        cert: '—',
        project: 'Event sourcing + CQRS in one bounded context',
        signal: 'ADR series + architecture diagram post',
        deen: 'Al-Qiyamah → An-Naba · finish Madinah Book 1'
      },
      weeks: [
        {
          headline: 'Pick the bounded context.',
          goals: [
            'Identify ONE domain in the SaaS to event-source (e.g. Subscriptions)',
            'Spatie laravel-event-sourcing scaffolding',
            'DDIA Ch 7 (Transactions) — read carefully',
            "Blog: 'Why I’m event-sourcing only one thing — and why that’s enough'",
            'DSA: two dynamic-programming basics',
            'Hifz: 30 new ayaah · Al-Qiyamah · Madinah Book 1 lesson 7'
          ],
          plan: {
            read: 'DDIA Ch 7 — Transactions (read carefully, isolation levels matter)',
            cert: '—',
            certPractice: '—',
            dsa: 'Dynamic programming basics — 2 problems',
            blog: "Why I’m event-sourcing only one thing — and why that’s enough",
            build: 'Spatie laravel-event-sourcing scaffolding for the Subscriptions context',
            adr: 'ADR-draft: bounded context + event store choice',
            interviewSat: 'Script a 5-minute repo walkthrough · README → architecture → ADRs → demo.',
            interviewSun: 'Record the walkthrough · watch back · re-record once if needed.'
          }
        },
        {
          headline: 'Events first, projections next.',
          goals: [
            'Write five-to-seven domain events with proper naming',
            'First read-model projection',
            'DDIA Ch 8 (Trouble with Distributed Systems)',
            'ADR-0003: event vs aggregate boundaries',
            "Blog: 'Domain events I wish I’d written sooner'",
            "Hifz: 30 new ayaah · Al-Insan · Madinah Book 1 lesson 8"
          ],
          plan: {
            read: 'DDIA Ch 8 — The Trouble with Distributed Systems',
            cert: '—',
            certPractice: '—',
            dsa: 'DP — 2 more problems (LIS, coin change variants)',
            blog: "Domain events I wish I’d written sooner",
            build: 'Write 5–7 domain events with proper naming + first read-model projection',
            adr: 'ADR-0003: event vs aggregate boundaries',
            interviewSat: 'Three back-of-envelope sizing problems · QPS, storage, bandwidth · practice the method.',
            interviewSun: 'Mock: "Design Instagram feed" · solo whiteboard or paper · 45 minutes.'
          }
        },
        {
          headline: 'CQRS, without the cargo-cult.',
          goals: [
            'Split command and query paths in Laravel cleanly',
            'Add a second projection (analytics-style)',
            'DDIA Ch 9 (Consistency and Consensus) — the hardest chapter',
            'DSA: two stack/queue problems',
            "Blog: 'CQRS is not microservices — and other corrections'",
            'Hifz: 30 new ayaah · Al-Mursalat · Madinah Book 1 finish'
          ],
          plan: {
            read: 'DDIA Ch 9 — Consistency and Consensus (the hardest chapter)',
            cert: '—',
            certPractice: '—',
            dsa: 'Stack / queue — 2 problems (monotonic stack, sliding-window max)',
            blog: 'CQRS is not microservices — and other corrections',
            build: 'Split command and query paths in Laravel + add a second projection (analytics-style)',
            adr: 'ADR-draft: read-model strategy + consistency expectations',
            interviewSat: 'Outline why event sourcing for Subscriptions · trade-offs vs traditional CRUD.',
            interviewSun: 'Mock: "When would you NOT use event sourcing?" · defend the boundary.'
          }
        },
        {
          headline: 'Architecture diagram, in public.',
          goals: [
            'Build a real C4 diagram (System + Container + Component levels)',
            'Embed it in the repo README + a dedicated post',
            'Update LinkedIn with the diagram as banner',
            'Month 3 retrospective + half-way self-review',
            'Begin drafting CV bullets in outcome form',
            'Hifz: 30 new ayaah · An-Naba · half-way hifz revision sweep (12-week recall test)'
          ],
          plan: {
            read: 'DDIA Part II / III consolidation notes (publish takeaways)',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — focus on artifact polish',
            blog: 'Reading my SaaS architecture in 30 seconds — a C4 walkthrough',
            build: 'Build a real C4 diagram (System + Container + Component) + embed in README + LinkedIn banner',
            adr: 'Add C4 diagram links to ADR index page',
            interviewSat: 'Practice reading C4 diagram aloud · System → Container → Component · 30 seconds each level.',
            interviewSun: 'Mock: "Pitch your SaaS architecture in 3 minutes" · time yourself.'
          }
        }
      ]
    },
    {
      num: '04',
      tabLabel: 'Observability',
      lead: 'Observability & the ',
      accent: "operator’s eye.",
      thesis: 'If you cannot see it, you do not own it. Real metrics, traces, logs.',
      focus: {
        book: 'Fundamentals of Software Architecture — Part I',
        cert: '—',
        project: 'Full o11y stack + load test + cost dashboard',
        signal: 'Postmortem-style blog from a self-induced incident',
        deen: 'An-Naziaat → Al-Inshiqaq · Madinah Book 2 begins'
      },
      weeks: [
        {
          headline: 'Three pillars, properly.',
          goals: [
            'Prometheus + Grafana via kube-prometheus-stack',
            'App-level metrics via Laravel exporters',
            'FoSA Ch 1–3 (Architectural thinking, modularity, characteristics)',
            'DSA: two tree problems',
            "Blog: 'The four golden signals, applied to a Laravel app'",
            'Hifz: 30 new ayaah · An-Naziaat · Madinah Book 2 lesson 1'
          ],
          plan: {
            read: 'FoSA Ch 1–3 — Architectural thinking, modularity, characteristics',
            cert: '—',
            certPractice: '—',
            dsa: 'Tree problems — 2 problems (DFS / BFS on binary trees)',
            blog: 'The four golden signals, applied to a Laravel app',
            build: 'kube-prometheus-stack (Prometheus + Grafana) + Laravel app-level metrics exporters',
            adr: 'ADR-draft: SLI / SLO targets per endpoint class',
            interviewSat: 'Draft an interview-grade story for a production incident you will run this month.',
            interviewSun: 'Mock: "Tell me about a production incident" · 3-minute STAR answer.'
          }
        },
        {
          headline: "Tracing what you couldn’t see.",
          goals: [
            'OpenTelemetry SDK in Laravel — traces to Tempo / Grafana Cloud',
            'Identify the slowest endpoint, fix it on camera (commit + post)',
            'FoSA Ch 4–5 (Architecture characteristics, identifying)',
            'ADR-0004: observability stack',
            "Blog: 'Distributed tracing for a non-distributed app — still worth it'",
            'Hifz: 30 new ayaah · Abasa · Madinah Book 2 lesson 2'
          ],
          plan: {
            read: 'FoSA Ch 4–5 — Architecture characteristics, identifying',
            cert: '—',
            certPractice: '—',
            dsa: 'Tree problems — 2 more (lowest common ancestor, level-order)',
            blog: 'Distributed tracing for a non-distributed app — still worth it',
            build: 'OpenTelemetry SDK in Laravel + traces to Tempo / Grafana Cloud + fix slowest endpoint live',
            adr: 'ADR-0004: observability stack',
            interviewSat: 'Memorize the four golden signals (latency, traffic, errors, saturation) · with your specific metrics.',
            interviewSun: 'Mock: "How do you know if your service is healthy?" · 5-minute walkthrough.'
          }
        },
        {
          headline: 'Break it on purpose.',
          goals: [
            'Run a k6 load test until something cracks',
            'Document the failure mode in a real postmortem template',
            'Add an alert rule that would have caught it',
            'FoSA Ch 6–7 (Measuring & governance, modularity)',
            "Blog: 'I broke my own platform — here’s the postmortem'",
            'Hifz: 30 new ayaah · At-Takwir + Al-Infitar · Madinah Book 2 lesson 3'
          ],
          plan: {
            read: 'FoSA Ch 6–7 — Measuring & governance, modularity',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — focus on the incident week',
            blog: "I broke my own platform — here’s the postmortem",
            build: 'k6 load test until something cracks + postmortem template + alert rule that would have caught it',
            adr: 'ADR-update: alerting policy + runbook stub',
            interviewSat: 'Define 3 SLIs for your SaaS · pick SLO targets · defend your error budgets.',
            interviewSun: 'Mock: "What is the SLO for your most-used endpoint?" · 2-minute defense.'
          }
        },
        {
          headline: 'Cost is a first-class metric.',
          goals: [
            'Build a small cost dashboard (cluster + DB + CDN)',
            'Right-size something — show before/after',
            'FoSA Part I review',
            'DSA: two binary-search problems',
            'Update CV with one new outcome bullet (latency or cost)',
            'Hifz: 30 new ayaah · Al-Mutaffifin → Al-Inshiqaq · Month 4 cumulative revision'
          ],
          plan: {
            read: 'FoSA Part I review — publish takeaways thread',
            cert: '—',
            certPractice: '—',
            dsa: 'Binary search — 2 problems (rotated array, search-space variants)',
            blog: 'Cost is a first-class metric',
            build: 'Cost dashboard (cluster + DB + CDN) + right-size something with before/after numbers',
            adr: 'ADR-draft: capacity right-sizing decision + cost ceiling',
            interviewSat: 'Write one runbook for the most-common alert · page → triage → resolve → postmortem.',
            interviewSun: 'Mock: "Walk me through your on-call rotation" · 5-minute response.'
          }
        }
      ]
    },
    {
      num: '05',
      tabLabel: 'AI',
      lead: 'AI as a ',
      accent: 'force multiplier.',
      thesis: 'Not an AI engineer — the backend engineer fluent with AI in production.',
      focus: {
        book: 'FoSA — Part II',
        cert: '—',
        project: 'Claude-powered admin assistant + agent dev pipeline',
        signal: 'Two AI-in-production posts that are not hype',
        deen: "Al-Buruj → Ad-Duha · Madinah Book 2 mid · khums to the Ummah"
      },
      weeks: [
        {
          headline: 'AI in your own dev loop.',
          goals: [
            'CLAUDE.md for the repo — codified conventions',
            'Plan-mode workflow for one real ticket — write it up',
            'FoSA Ch 8–10 (Component-based, foundations of architecture styles)',
            'DSA: two backtracking problems',
            "Blog: 'My AI-assisted backend workflow, end to end'",
            "Hifz: 30 new ayaah · Al-Buruj + At-Tariq + Al-A’la · khums framing — pay zakat on AI-freed time"
          ],
          plan: {
            read: 'FoSA Ch 8–10 — Component-based, foundations of architecture styles',
            cert: '—',
            certPractice: '—',
            dsa: 'Backtracking — 2 problems (subsets, permutations)',
            blog: 'My AI-assisted backend workflow, end to end',
            build: 'CLAUDE.md for the repo (codified conventions) + plan-mode workflow on one real ticket — write it up',
            adr: 'ADR-draft: AI-in-development boundary',
            interviewSat: 'Outline your Claude / Cursor workflow · where it shines, where it fails, your guardrails.',
            interviewSun: 'Mock: "How do you use AI in your work?" · 3-minute answer · no buzzwords.'
          }
        },
        {
          headline: 'Agent pipeline, finally finished.',
          goals: [
            'Revisit ZeroClaw or pick an alternative: ticket → branch → PR → review',
            'Wire it to your own project (not BBIL)',
            'FoSA Ch 11–13 (Layered, pipeline, microkernel)',
            'ADR-0005: AI tooling boundaries (what AI does and does not do)',
            "Blog: 'An autonomous dev agent that I actually trust'",
            'Hifz: 30 new ayaah · Al-Ghashiyah + Al-Fajr · Madinah Book 2 mid'
          ],
          plan: {
            read: 'FoSA Ch 11–13 — Layered, pipeline, microkernel',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — agent-pipeline week',
            blog: 'An autonomous dev agent that I actually trust',
            build: 'ZeroClaw or alternative agent pipeline (ticket → branch → PR → review) wired to your project',
            adr: 'ADR-0005: AI tooling boundaries (what AI does and does not do)',
            interviewSat: 'Pitch the agent pipeline · ticket → branch → PR → review · what you trust, what you do not.',
            interviewSun: 'Mock: "What can your agent NOT do?" · defend the boundary.'
          }
        },
        {
          headline: 'Claude in the product, with guardrails.',
          goals: [
            'Add a small admin assistant inside the SaaS using the Anthropic API',
            'Implement: rate limiting, cost cap, eval harness, fallback',
            'FoSA Ch 14–16 (SOA, microservices, choosing styles)',
            'DSA: two design-pattern style problems',
            "Blog: 'Putting an LLM in production responsibly'",
            'Hifz: 30 new ayaah · Al-Balad + Ash-Shams · slow-salah practice with the new ayaah'
          ],
          plan: {
            read: 'FoSA Ch 14–16 — Service-based, event-driven, space-based',
            cert: '—',
            certPractice: '—',
            dsa: 'Design-pattern style — 2 problems (LRU cache, design Twitter timeline)',
            blog: 'Putting an LLM in production responsibly',
            build: 'Admin assistant via Anthropic API + rate limiting + cost cap + eval harness + fallback',
            adr: 'ADR-draft: LLM cost ceilings, rate limits, and fallback policy',
            interviewSat: 'One-page comparison · Claude vs OpenAI vs open-weights · cost / latency / quality / lock-in.',
            interviewSun: 'Mock: "Why did you pick Claude?" · defend in 2 minutes.'
          }
        },
        {
          headline: 'Evaluate, do not vibe.',
          goals: [
            'Build a small eval set for the assistant — pass/fail',
            'CI gate: blocks deploy if eval pass-rate drops',
            'Cost & latency dashboard for the LLM path',
            'FoSA Part II wrap notes — public',
            "CV update — 'Production LLM integration with evals & cost ceilings'",
            'Hifz: 30 new ayaah · Al-Layl + Ad-Duha + Al-Inshirah · Month 5 cumulative revision'
          ],
          plan: {
            read: 'FoSA Part II wrap notes — publish',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — eval-gating week',
            blog: "Evaluate, don’t vibe — eval-gated LLM CI",
            build: 'Eval set for the assistant + CI gate (blocks deploy on regression) + LLM cost & latency dashboard',
            adr: 'ADR-update: eval thresholds & rollback policy',
            interviewSat: 'Document your eval set, CI gate, rate limits, cost caps, fallback strategy.',
            interviewSun: 'Mock: "How do you stop your LLM from going off the rails?" · 5-minute answer.'
          }
        }
      ]
    },
    {
      num: '06',
      tabLabel: 'Public',
      lead: 'Public, and ',
      accent: 'employable.',
      thesis: 'Polish the artifacts. Open the door. Run the search like an engineer.',
      focus: {
        book: 'System Design Interview — Vol I (selected chapters)',
        cert: '—',
        project: 'Polish, demo video, architecture readme, case study',
        signal: 'Outreach engine running. Interviews booked.',
        deen: 'Al-Layl → An-Nas · full Juz 30 cumulative revision'
      },
      weeks: [
        {
          headline: 'Make the repo unmissable.',
          goals: [
            'README rewrite: problem, architecture diagram, ADR index, demo gif',
            'Pin three best blog posts to LinkedIn featured',
            'Record a three-minute Loom demo of the system',
            'System Design Interview: Ch 1–4 (scale, back-of-envelope)',
            'Mock system design interview — solo, recorded',
            'Hifz: 30 new ayaah · At-Tin → Al-Adiyat'
          ],
          plan: {
            read: 'System Design Interview Vol I — Ch 1–4 (scale, back-of-envelope estimation)',
            cert: '—',
            certPractice: '—',
            dsa: 'Taper — 1 medium problem (pick from your weakest category)',
            blog: 'Make the repo unmissable — README anatomy',
            build: 'README rewrite (problem, architecture diagram, ADR index, demo gif) + 3-min Loom demo + pin 3 best blogs to LinkedIn featured',
            adr: 'ADR index — final pass + cross-link',
            interviewSat: 'Solve 2 medium coding problems live · recorded · no IDE · paper + whiteboard.',
            interviewSun: 'Watch yourself back · note where you stall · drill those patterns the next day.'
          }
        },
        {
          headline: 'CV & profile, sharpened.',
          goals: [
            'One-page CV, outcome bullets only, repo + blog above the fold',
            'LinkedIn: KL-aware headline, banner = your architecture diagram',
            'Wellfound + Arc profiles complete',
            'List of thirty target companies (Malaysia primary, remote-global secondary)',
            "Blog: 'Six months in public — what I’d tell myself in week 1'",
            "Hifz: 30 new ayaah · Al-Qari’ah → Al-Kawthar"
          ],
          plan: {
            read: 'System Design Interview Vol I — Ch 5–6 (rate limiter, consistent hashing)',
            cert: '—',
            certPractice: '—',
            dsa: 'Taper — 1 medium problem',
            blog: "Six months in public — what I’d tell myself in week 1",
            build: 'One-page CV (outcome bullets) + LinkedIn (KL-aware headline + arch-diagram banner) + Wellfound + Arc + 30-target list',
            adr: '—',
            interviewSat: 'Coding patterns marathon · sliding window + two-pointer + hash-map · 3 problems per pattern · think aloud.',
            interviewSun: 'Mock with Pramp or a friend · 45-minute coding session · take the feedback.'
          }
        },
        {
          headline: 'Outreach as a system.',
          goals: [
            'Ten tailored applications this week (not a hundred sprayed)',
            'Five warm DMs to KL-based engineering managers',
            'Two mock system-design sessions (Pramp / friend / Discord)',
            'System Design Interview: two case studies',
            'Track everything in a simple spreadsheet — funnel, not feelings',
            'Hifz: 30 new ayaah · Al-Kafirun → Al-Falaq + An-Nas · Juz 30 close'
          ],
          plan: {
            read: 'System Design Interview Vol I — 2 case studies (Twitter timeline + News Feed)',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — interview cadence focus',
            blog: "The interview funnel I’m running this month",
            build: '10 tailored applications + 5 warm DMs to KL eng managers + 2 mock SDI sessions (Pramp / friend / Discord)',
            adr: '—',
            interviewSat: '60-minute solo system-design mock · pick a scenario · whiteboard + trade-offs.',
            interviewSun: 'Mock with peer or Discord · get harsh feedback · iterate next week.'
          }
        },
        {
          headline: 'Compound, hand off, breathe.',
          goals: [
            'Ten more tailored applications + follow-ups on the first ten',
            "Publish a final 'what I built' case-study post",
            'Set Q3 goals: depth in one architecture style, one talk submitted',
            "Schedule a real off-week — you’ve earned it",
            'Bismillah on what comes next.',
            'Hifz: full Juz 30 cumulative revision · niyyah for Juz 29 in Q3'
          ],
          plan: {
            read: 'System Design Interview Vol I — 2 more case studies (Notification + Chat)',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest — close-out week',
            blog: 'Six months, what I built — final case study',
            build: '10 more applications + follow-ups on first 10 + Q3 goals + schedule a real off-week',
            adr: '—',
            interviewSat: 'Research salary bands (Levels.fyi, RemoteOK, LinkedIn) · set your floor and your stretch.',
            interviewSun: 'Rehearse negotiation lines · "I am seeing the range at X — can we explore Y?" · in front of a mirror.'
          }
        }
      ]
    },
    {
      num: '07',
      tabLabel: 'Interviews',
      lead: 'Live, ',
      accent: 'and chosen.',
      thesis: 'December · apply, interview, negotiate, decide. The artifact carries you — show up rested.',
      focus: {
        book: 'CTCI final review + System Design Vol I (last case studies)',
        cert: '—',
        project: 'Polish-only · no new features · the artifact is what it is',
        signal: '10+ interviews booked · 3+ active offer conversations',
        deen: "Al-Inshirah → An-Nas · full Juz 30 fluency · Tahajjud as the anchor"
      },
      weeks: [
        {
          headline: 'Apply at scale.',
          goals: [
            'Send 15 tailored applications across KL + remote-global',
            'Reach out to 10 warm contacts (KL eng managers, ex-colleagues)',
            'Refresh CV with the Month 6 outcome bullets',
            'Schedule mocks daily · solo, Pramp, friends',
            'No new features on the repo · polish only',
            'Hifz: Al-Inshirah + Ad-Duha · cumulative revision through Juz 30'
          ],
          plan: {
            read: 'CTCI Ch 1–2 (Arrays, Strings) · pattern refresher',
            cert: '—',
            certPractice: '—',
            dsa: 'One easy + one medium per day · talk through aloud',
            blog: 'Short: "What I am looking for next" · honest + brief',
            build: 'Polish-only: README, LinkedIn banner, pinned posts',
            adr: '—',
            interviewSat: 'Send 15 tailored applications · warm-DM 10 KL eng managers · CV final pass with M6 outcome bullets.',
            interviewSun: 'One full-loop solo mock · behavioral + system design + 1 coding problem · recorded.'
          }
        },
        {
          headline: 'Onsite rehearsal.',
          goals: [
            'Run 3 full-loop mocks (behavioral + SDI + coding + culture)',
            'Schedule onsite slots for week 27',
            'Re-read top 3 ADRs · be ready to defend each',
            'Cache 5 sharp questions for the interviewer for each archetype',
            'Hifz: At-Tin + Al-Adiyat · cumulative revision through Juz 30',
            'Sleep + family guarded · interviews need a clear head'
          ],
          plan: {
            read: 'CTCI Ch 3–4 (Stacks, Queues, Trees) · pattern refresher',
            cert: '—',
            certPractice: '—',
            dsa: 'Mock-grade coding · 2 mediums per day · timer on',
            blog: '—',
            build: 'Polish-only · respond to repo issues + LinkedIn DMs',
            adr: '—',
            interviewSat: 'Three full-loop mocks · behavioral + SDI + coding + culture · recorded · debrief each.',
            interviewSun: 'Watch all 3 back · note patterns · pick the 3 weakest moments · drill them flat.'
          }
        },
        {
          headline: 'Live interviews.',
          goals: [
            'Take 5+ live interviews across the week',
            'Debrief immediately after each interview',
            'Sleep 7h every night · no exception',
            'No new applications this week · run the pipeline you built',
            'Family present · spouse knows the schedule · pray together',
            'Hifz: Al-Qadr + Al-Bayyinah · light load · do not break the streak'
          ],
          plan: {
            read: 'Light · re-read your own ADRs + repo README',
            cert: '—',
            certPractice: '—',
            dsa: 'One warmup problem per morning · no new patterns',
            blog: '—',
            build: 'No code changes · stable artifact',
            adr: '—',
            interviewSat: 'Take Saturday interviews if scheduled · debrief immediately · note follow-ups.',
            interviewSun: 'Sunday review · what worked, what did not · prep Mon-Fri onsite calendar · send thank-yous.'
          }
        },
        {
          headline: 'Negotiate. Decide. Breathe.',
          goals: [
            'Compare offers on one sheet · comp + growth + culture + family-fit',
            'Negotiate with top 2 · gracefully decline others',
            'Accept ONE · book a real off-week before starting',
            'Write the "what I chose and why" post · publish January',
            'Set Q3 goals · depth in one architecture style, one talk submitted',
            'Hifz: Az-Zalzalah + An-Nas · full Juz 30 cumulative · Bismillah on what comes next'
          ],
          plan: {
            read: 'Re-read your favourite chapter from the past 6 months · gratitude pass',
            cert: '—',
            certPractice: '—',
            dsa: 'Rest · close-out week',
            blog: 'Six months in public · what I built, what I chose, what I learned · publish January',
            build: 'Final tag · v1.0 on the repo · README closing note',
            adr: '—',
            interviewSat: 'Compare offers on one sheet · comp + growth + culture + family-fit · honest call.',
            interviewSun: 'Negotiate with top 2 · accept one · gracefully decline others · prep for Q3.'
          }
        }
      ]
    }
  ],
  deliverables: [
    { icon: '①', name: 'One public repo',       desc: 'Multi-tenant SaaS with event sourcing, IaC, CI/CD, observability.' },
    { icon: '②', name: 'Twelve+ blog posts',     desc: 'On The Prophetic Stack — architecture, devops, AI in production.' },
    { icon: '③', name: 'AWS SAA cert',           desc: 'Passed by end of Month 2. Cloud literacy proven.' },
    { icon: '④', name: 'Five+ ADRs',             desc: 'Architecture decisions, written in public, defended in interviews.' },
    { icon: '⑤', name: 'C4 diagram',             desc: 'System architecture you can whiteboard in your sleep.' },
    { icon: '⑥', name: 'Demo + case study',      desc: 'Three-minute Loom + a written case study recruiters can skim.' },
    { icon: '⑦', name: 'Outcome-driven CV',      desc: 'Latency, cost, and reliability numbers — not responsibilities.' },
    { icon: '⑧', name: 'Interview pipeline',     desc: 'Thirty targets, twenty applications, real conversations underway.' },
    { icon: '⑨', name: 'Juz 30 in your chest',   desc: '≈720 ayaah memorized at 5/day Mon–Sat, with weekly cumulative revision.' },
    { icon: '⑩', name: 'Functional Arabic',      desc: "Madinah Books 1 + half of 2 worked through. Word-by-word fluency on what you’ve memorized." },
    { icon: '⑪', name: 'An accepted offer',       desc: 'December: 10+ interviews run, 3+ active conversations, one accepted role · negotiated, not begged.' }
  ],
  creed: 'Discipline is downstream of identity. You are no longer "a Laravel dev who wants to grow." You are a backend architect in training, building in public on a deadline you set — and a <em>\'abd</em> of Allah, stewarding AI-freed time as <em>amanah</em>: mushaf before mouse, every morning.',
  arabic: {
    header: {
      title: 'الصُّعُودُ ذُو الأَشْهُرِ <em>السَّبْعَة</em>',
      subtitle: 'خُطَّةٌ مُرَكَّزَةٌ لِتَرَاكُمِ المِعْمَارِيَّةِ وَالـدِيفُوبْس وَالإِشَارَةِ — وَالحِفْظ. تُخْتَتَمُ فِي دِيسَمْبِر بِمُقَابَلَاتٍ حَيَّة.',
      accentLine: '١٠ سَاعَاتٍ تِقْنِيَّة · ٥ سَاعَاتٍ لِلدِّين · ٢٨ أُسْبُوعًا · مُسْتَوْدَعٌ وَاحِد · مُصْحَفٌ وَاحِد · ٣٠ مُقَابَلَة.'
    },
    pact: 'إِنَّ الذَّكَاءَ الاصْطِنَاعِيَّ قَدْ طَوَى التَّنْفِيذ. لَنْ تَفُوقَ بِالحَجْمِ أُسْطُولًا مِنَ المُبْتَدِئِينَ المُعَزَّزِينَ بِالذَّكَاءِ — بَلْ تَفُوقُهُمْ بِالـ<strong>تَّفْكِير</strong> وَتَرْجَحُهُمْ عَلَى <strong>مِيزَانٍ آخَر</strong>. هَذِهِ الخُطَّةُ تُبَدِّلُ الاتِّسَاعَ بِالعُمْق: سَحَابَةٌ وَاحِدَة، كِتَابٌ وَاحِد، مَشْرُوعٌ وَاحِد، صَوْتٌ عَامٌّ وَاحِد — وَمُصْحَفٌ وَاحِد، يُفْتَحُ قَبْلَ كُلِّ ذَلِك. تَدْبِيرٌ قَبْلَ <em>العَمَل</em>؛ نِيَّةٌ قَبْلَ القَائِمَة؛ حِفْظٌ قَبْلَ التِّقْنِيَّة. تُكَرَّرُ حَتَّى <strong>يَظْهَرَ التَّرَاكُمُ عَلَى المِيزَانَيْنِ — السِّيرَةُ الذَّاتِيَّةُ وَالمِيزَانُ الأَهَمّ</strong>.',
    stats: ['أَسَابِيع', 'سَاعَات تِقْنِيَّة', 'سَاعَات لِلدِّين', 'آيَات'],
    focusLabels: {
      book:    'كِتَاب',
      cert:    'شَهَادَة',
      project: 'مَشْرُوع',
      signal:  'إِشَارَة',
      deen:    'دِين'
    },
    planLabels: {
      read:         'قِرَاءَة',
      cert:         'شَهَادَة',
      certPractice: 'تَطْبِيق',
      dsa:          'خَوَارِزْمِيَّات',
      blog:         'مُدَوَّنَة',
      build:        'بِنَاء',
      adr:          'قَرَار مِعْمَارِيّ'
    },
    slotTags: {
      hifz:      'حِفْظ',
      arabic:    'عَرَبِيَّة',
      read:      'قِرَاءَة',
      cert:      'شَهَادَة',
      dsa:       'خَوَارِزْمِيَّات',
      write:     'كِتَابَة',
      plan:      'تَخْطِيط',
      build:     'بِنَاء',
      adr:       'قَرَار',
      ship:      'نَشْر',
      track:     'مُتَابَعَة',
      interview: 'مُقَابَلَة'
    },
    sections: {
      movementsTitle: 'سَبْعُ <em>حَرَكَات.</em>',
      movementsTag: '٢٨ أُسْبُوعًا · اِخْتَرْ شَهْرًا، اِخْتَرْ أُسْبُوعًا، عِشْ يَوْمَكَ',
      ownTitle: 'مَا <em>تَمْتَلِكُه</em> فِي الشَّهْرِ السَّابِع.',
      ownTag: 'نَوَاتِجُ مَلْمُوسَة',
      goalsThisWeek: 'أَهْدَافُ هَذَا الأُسْبُوع',
      dayByDay: 'يَوْمًا بِيَوْم · ١٠س تِقْنِيَّة · ٥س لِلدِّين',
      footerMeta: 'إِصْدَار ١ · صُعُود سِتَّةِ أَشْهُر · بِسْمِ اللَّه.'
    },
    weekTemplate: [
      {
        day: 'الاثْنَيْن', budget: '~١س٥٠د',
        slots: [
          'فِي فَتْرَةِ تَدْرِيبِ اللُّغَةِ العَرَبِيَّةِ، تَدَرَّبْ عَلَى المُفْرَدَاتِ وَالجُذُورِ القُرْآنِيَّةِ مَعَ حِفْظِكَ الحَالِيِّ، وَاكْتُبْ نِيَّةَ الأُسْبُوعِ قَبْلَ أَنْ تَفْتَحَ أَيَّ كُودٍ.',
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً بِثَلَاثِ قِرَاءَاتٍ بِالتَّجْوِيدِ، ثُمَّ اِسْتَمِعْ لِقَارِئٍ، ثُمَّ اِتْلُهَا مِنَ الحِفْظِ.',
          { prefix: 'فِي فَتْرَةِ التَّعَلُّمِ الذَّاتِيِّ بِالمَكْتَبِ، اِقْرَأْ ', suffix: '.' }
        ]
      },
      {
        day: 'الثُّلَاثَاء', budget: '~١س٥٠د',
        slots: [
          'فِي فَتْرَةِ تَدْرِيبِ اللُّغَةِ العَرَبِيَّةِ، تَرْجِمْ كَلِمَةً كَلِمَةً لِمَا حَفِظْتَهُ أَمْسِ، وَسَطِّرْ تَحْتَ كُلِّ جَذْرٍ تَعْرِفُهُ.',
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً؛ تَرَاكُمُ هَذَا الأُسْبُوعِ عَشْرُ آيَاتٍ.',
          { prefix: 'فِي فَتْرَةِ التَّعَلُّمِ الذَّاتِيِّ بِالمَكْتَبِ، اُدْرُسْ ', suffix: '.' }
        ]
      },
      {
        day: 'الأَرْبِعَاء', budget: '~٢س٢٠د',
        slots: [
          'فِي فَتْرَةِ تَدْرِيبِ اللُّغَةِ العَرَبِيَّةِ، اِدْفَعْ بِقُوَّةٍ نَحْوَ القَاعِدَةِ التِي تَجَنَّبْتَهَا فِي المَرَّةِ الفَائِتَةِ.',
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً؛ تَرَاكُمُ هَذَا الأُسْبُوعِ خَمْسَ عَشْرَةَ آيَةً.',
          { prefix: 'فِي فَتْرَةِ الدَّوَامِ الجُزْئِيِّ مَسَاءً، حُلَّ ', suffix: '.' },
          { prefix: 'فِي فَتْرَةِ التَّعَلُّمِ الذَّاتِيِّ بِالمَكْتَبِ، أَجْرِ تَطْبِيقَ الشَّهَادَةِ عَلَى ', suffix: '.' }
        ]
      },
      {
        day: 'الخَمِيس', budget: '~٢س',
        slots: [
          'فِي فَتْرَةِ الغَوْصِ فِي اللُّغَةِ العَرَبِيَّةِ، خُذْ لَمْحَةً تَفْسِيرِيَّةً، وَاكْتُبْ فِقْرَةً وَاحِدَةً عَمَّا تَغَيَّرَ فِي فَهْمِكَ.',
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً؛ تَرَاكُمُ هَذَا الأُسْبُوعِ عِشْرُونَ آيَةً.',
          { prefix: 'فِي فَتْرَةِ التَّعَلُّمِ الذَّاتِيِّ بِالمَكْتَبِ، اِقْرَأْ الفَصْلَ الثَّانِي وَاكْتُبْ مُسَوَّدَةَ عُنْوَانِ القَرَارِ المِعْمَارِيِّ فِي يَوْمِيَّاتِكَ؛ تَرْكِيزُ قِرَاءَتِكَ هُوَ ', suffix: '.' }
        ]
      },
      {
        day: 'الجُمُعَة', budget: '~٣س٣٠د',
        slots: [
          'فِي فَتْرَةِ الغَوْصِ فِي اللُّغَةِ العَرَبِيَّةِ، ثَبِّتْ قَوَاعِدَكَ قَبْلَ صَلَاةِ الجُمُعَةِ.',
          { prefix: 'فِي فَتْرَةِ المُدَوَّنَةِ المُطَوَّلَةِ، اُكْتُبْ مُسَوَّدَةَ مَقَالٍ بِعُنْوَانِ "', suffix: '".' },
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً؛ تَرَاكُمُ هَذَا الأُسْبُوعِ خَمْسٌ وَعِشْرُونَ آيَةً — وَاعْقِدِ النِّيَّةَ عَلَى تِلَاوَتِهَا فِي صَلَاةِ الجُمُعَةِ.',
          'فِي فَتْرَةِ التَّعَلُّمِ الذَّاتِيِّ بِالمَكْتَبِ، اِقْرَأْ كُودًا، وَابْحَثْ لِمَقَالِكَ القَادِمِ، وَاصْقُلْ مُلَاحَظَاتِ قَرَارِكَ المِعْمَارِيِّ.'
        ]
      },
      {
        day: 'السَّبْت', budget: '~٥س٣٠د',
        slots: [
          'فِي فَتْرَةِ القُرْآنِ، اِحْفَظْ خَمْسَ آيَاتٍ جَدِيدَةً؛ تَرَاكُمُ هَذَا الأُسْبُوعِ يَبْلُغُ ثَلَاثِينَ آيَةً، مَعَ تَأَمُّلٍ قَصِيرٍ فِي آيَةِ الأُسْبُوعِ.',
          { prefix: 'فِي كُتْلَةِ الدَّوَامِ الجُزْئِيِّ الكَبِيرَةِ، أَنْجِزِ المِيزَةَ: ', suffix: '.' },
          { prefix: 'فِي النِّصْفِ الأَوَّلِ مِنْ كُتْلَةِ التَّعَلُّمِ الذَّاتِيِّ العَمِيقَةِ، اُكْتُبِ القَرَارَ — ', suffix: '.', fallback: 'فِي النِّصْفِ الأَوَّلِ مِنْ كُتْلَةِ التَّعَلُّمِ الذَّاتِيِّ العَمِيقَةِ، تَخَطَّ القَرَارَ المِعْمَارِيَّ الرَّسْمِيَّ هَذَا الأُسْبُوعَ وَمَدِّدِ البِنَاءَ أَوْ المُخْتَبَرَ التَّطْبِيقِيَّ بَدَلًا مِنْهُ.' },
          { prefix: 'فِي النِّصْفِ الثَّانِي مِنْ كُتْلَةِ التَّعَلُّمِ الذَّاتِيِّ العَمِيقَةِ، جَهِّزْ لِلْمُقَابَلَاتِ: ' }
        ]
      },
      {
        day: 'الأَحَد', budget: '~٣س٣٠د',
        slots: [
          { prefix: 'فِي فَتْرَةِ كِتَابَةِ المُدَوَّنَةِ، حَرِّرْ وَانْشُرِ المَقَالَ المُعَنْوَنَ "', suffix: '"، ثُمَّ شَارِكْ مُلَخَّصًا عَلَى LinkedIn مَعَ الرَّابِطِ.' },
          'فِي فَتْرَةِ القُرْآنِ، أَجْرِ مُرَاجَعَةَ هَذَا الأُسْبُوعِ — ثَلَاثُونَ آيَةً مِنْ هَذَا الأُسْبُوعِ وَعَشْرُ آيَاتٍ مِنْ أُسْبُوعٍ سَابِقٍ، كُلُّهَا مِنَ الحِفْظِ.',
          'فِي النِّصْفِ الأَوَّلِ مِنْ فَتْرَةِ المُرَاجَعَةِ الأُسْبُوعِيَّةِ، اِسْتَعْرِضْ خَمْسَةَ أَسْئِلَةٍ مِنْ يَوْمِيَّاتِكَ، وَأَلْقِ نَظْرَةً عَلَى حِمْلِ الأُسْبُوعِ القَادِمِ.',
          { prefix: 'فِي النِّصْفِ الثَّانِي مِنْ فَتْرَةِ المُرَاجَعَةِ الأُسْبُوعِيَّةِ، جَهِّزْ لِلْمُقَابَلَاتِ: ' },
          'فِي فَتْرَةِ اليَوْمِيَّاتِ وَخُطَّةِ الأُسْبُوعِ القَادِمِ مَسَاءً، أَنْهِ الأُسْبُوعَ بِعَلَامَةِ إِنْجَازٍ، وَضَعْ أَهَمَّ ثَلَاثِ مَهَامَّ لِيَوْمِ الاثْنَيْنِ.'
        ]
      }
    ],
    months: [
      {
        tabLabel: 'الأُسُس',
        lead: 'أُسُسٌ ',
        accent: 'ذَاتُ ثِقَل.',
        thesis: 'ثَبِّتِ العَادَة. اِفْتَحِ المُسْتَوْدَع. اِشْتَرِ الكُتُب.',
        focus: {
          book: 'DDIA — الجُزْءُ الأَوَّل (الفُصُول ١–٤)',
          cert: 'AWS SAA — الحُوسَبَة، التَّخْزِين، IAM',
          project: 'تَهْيِئَةُ المُسْتَوْدَع، اِسْتِرَاتِيجِيَّةُ التَّعَدُّدِيَّة، القَرَار ٠٠٠١',
          signal: 'مَنْشُورُ تَعْرِيف + أَوَّلُ قَرَارٍ مِعْمَارِيٍّ مَنْشُور',
          deen: 'سُورَةُ المُلْك → الحَاقَّة · مَدِينَة كِتَاب ١ فُصُول ١–٣'
        },
        weeks: [
          {
            headline: 'اِغْرِزِ الرَّايَة.',
            goals: [
              'أَنْشِئْ مُسْتَوْدَعَ GitHub عَامًّا: prophetic-stack-saas (README ٠٫١)',
              'اِكْتُبْ قَرَار ٠٠٠١: التَّعَدُّدِيَّةُ عَلَى مُسْتَوَى الصَّفّ',
              'AWS SAA: وَحْدَة EC2 + EBS + EFS + S3',
              'DDIA الفَصْل ١ (المَوْثُوقِيَّة، القَابِلِيَّة لِلْتَّوَسُّع، الصِّيَانَة)',
              'مَقَالة: "لِمَ أَبْنِي عَلَنًا لِسِتَّةِ أَشْهُر"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · سُورَةُ المُلْك (أُسْبُوعُ ضَبْطِ الإِيقَاع) + مَدِينَة كِتَاب ١ دَرْس ١'
            ],
            plan: {
              read: 'DDIA الفَصْل ١ — تَطْبِيقَاتٌ مَوْثُوقَةٌ قَابِلَةٌ لِلْتَّوَسُّعِ وَالصِّيَانَة',
              cert: 'AWS SAA: EC2 + EBS + EFS + S3 (وَحْدَةُ Maarek / Cantrill)',
              certPractice: 'تَطْبِيقُ AWS SAA — الحُوسَبَة وَالتَّخْزِين (١٥ سُؤَال، Tutorials Dojo)',
              dsa: 'خَرِيطَةُ التَّجْزِئَة / المَصْفُوفَة — مَسْأَلَتَان (قَائِمَة Sean Prashad)',
              blog: 'لِمَ أَبْنِي عَلَنًا لِسِتَّةِ أَشْهُر',
              build: 'تَهْيِئَةُ المُسْتَوْدَع prophetic-stack-saas مَعَ README ٠٫١',
              adr: 'القَرَار ٠٠٠١: قَرَارُ التَّعَدُّدِيَّةِ عَلَى مُسْتَوَى الصَّفّ',
              interviewSat: 'تَعْرِيفٌ ذَاتِيٌّ فِي سِتِّينَ ثَانِيَة · مَنْ أَنَا · إِنْجَازٌ مُمَيَّز · وَجْهَتِي.',
              interviewSun: 'سَجِّلْ عَلَى الهَاتِف · شَاهِدْ نَفْسَكَ · اِحْذِفِ الحَشْو · ثَبِّتْهُ فِي سِتِّينَ ثَانِيَةً تَامَّة.'
            }
          },
          {
            headline: 'التَّعَدُّدِيَّةُ عَلَى الوَرَقِ ثُمَّ فِي الكُود.',
            goals: [
              'هَيْكَلَةُ Laravel مَعَ stancl/tenancy أَوْ تَحْدِيدُ النِّطَاقِ عَبْرَ الأَعْمِدَة',
              'AWS SAA: VPC، الشَّبَكَاتُ الفَرْعِيَّة، مَجْمُوعَاتُ الأَمَان، NAT',
              'DDIA الفَصْل ٢ (نَمَاذِجُ البَيَانَات)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا خَرِيطَةِ تَجْزِئَة / مَصْفُوفَة',
              'مَقَالة: "ثَلَاثُ اِسْتِرَاتِيجِيَّاتٍ لِلتَّعَدُّدِيَّة، مُرَتَّبَة"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · خَتْمُ المُلْك وَبَدْءُ القَلَم · مَدِينَة كِتَاب ١ دَرْس ٢'
            ],
            plan: {
              read: 'DDIA الفَصْل ٢ — نَمَاذِجُ البَيَانَات وَلُغَاتُ الاسْتِعْلَام',
              cert: 'AWS SAA: VPC، الشَّبَكَاتُ الفَرْعِيَّة، مَجْمُوعَاتُ الأَمَان، بَوَّابَاتُ NAT',
              certPractice: 'تَطْبِيقُ AWS SAA — أُسُسُ الشَّبَكَات (١٥ سُؤَال)',
              dsa: 'خَرِيطَةُ تَجْزِئَة / مَصْفُوفَة — مَسْأَلَتَانِ إِضَافِيَّتَان',
              blog: 'ثَلَاثُ اِسْتِرَاتِيجِيَّاتٍ لِلتَّعَدُّدِيَّة، مُرَتَّبَة',
              build: 'هَيْكَلَةُ Laravel مَعَ stancl/tenancy أَوْ تَحْدِيدُ نِطَاقِ الأَعْمِدَة',
              adr: 'تَحْدِيثُ القَرَار ٠٠٠١ بِالنَّهْجِ المُخْتَار + اِسْتِعْلَامَاتٌ نَمُوذَجِيَّة',
              interviewSat: '"حَدِّثْنِي عَنْ نَفْسِك" · قَوْسُ المَسِيرَةِ فِي دَقِيقَتَيْن · مَاضٍ ← حَاضِر ← مُسْتَقْبَلٌ قَرِيب.',
              interviewSun: 'تَجْرِبَةٌ مُنْفَرِدَة مَعَ تَسْجِيل · ضَبْطٌ عَلَى دَقِيقَتَيْن · اِحْذِفْ مَا لَا يَسْتَحِقّ.'
            }
          },
          {
            headline: 'مُصَادَقَةٌ بِالطَّرِيقَةِ التِي اِكْتَسَبْتَهَا.',
            goals: [
              'اِنْقُلْ نَمَطَ JWT + Redis (بِشَكْلٍ مَجْهُولِ المَصْدَر) إِلَى المُسْتَوْدَع',
              'AWS SAA: IAM، الأَدْوَار، السِّيَاسَات، STS',
              'DDIA الفَصْل ٣ (التَّخْزِين وَالاسْتِرْجَاع)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا النَّافِذَةِ المُنْزَلِقَة',
              'مَقَالة: "المُصَادَقَةُ بِلَا حَالَة مَعَ احْتِسَابِ Redis المُسْبَق — القَضِيَّة"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · القَلَم · مَدِينَة كِتَاب ١ دَرْس ٣'
            ],
            plan: {
              read: 'DDIA الفَصْل ٣ — التَّخْزِينُ وَالاسْتِرْجَاع',
              cert: 'AWS SAA: IAM، الأَدْوَار، السِّيَاسَات، STS',
              certPractice: 'تَطْبِيقُ AWS SAA — IAM وَالأَمَان (١٥ سُؤَال)',
              dsa: 'النَّافِذَةُ المُنْزَلِقَة — مَسْأَلَتَان',
              blog: 'المُصَادَقَةُ بِلَا حَالَة مَعَ احْتِسَابِ Redis المُسْبَق — القَضِيَّة',
              build: 'نَقْلُ نَمَطِ JWT + Redis (بِشَكْلٍ مَجْهُولِ المَصْدَر) إِلَى المُسْتَوْدَع',
              adr: 'مُسَوَّدَةُ قَرَار: مِعْمَارِيَّةُ المُصَادَقَة (JWT مَدْعُومٌ بِـRedis)',
              interviewSat: 'اِسْرُدْ ٥ لَحَظَاتٍ مِهْنِيَّةٍ تَسْتَحِقُّ الرِّوَايَة · صَنِّفْ كُلَّ وَاحِدَةٍ ضِمْنَ STAR.',
              interviewSun: 'اِصْقُلِ الأَقْوَى مِنْهَا · تَدَرَّبْ بِصَوْتٍ مَسْمُوع · ضَعِ البَاقِيَ فِي قَائِمَةٍ احْتِيَاطِيَّة.'
            }
          },
          {
            headline: 'أَوَّلُ نُسْخَةٍ قَابِلَةٍ لِلنَّشْر.',
            goals: [
              'تَوْعِيَةُ التَّطْبِيق + Postgres + Redis عَلَى Docker. docker-compose up نَظِيف',
              'AWS SAA: غَوْصٌ فِي الشَّبَكَات + اخْتِبَارُ مُمَارَسَةٍ ١',
              'DDIA الفَصْل ٤ (التَّرْمِيزُ وَالتَّطَوُّر)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا المُؤَشِّرَيْن',
              'مَنْشُورُ مُرَاجَعَةِ الشَّهْرِ الأَوَّل — مَا نَجَحَ، مَا لَمْ يَنْجَح',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · الحَاقَّة + مُرَاجَعَةٌ تَرَاكُمِيَّةٌ لِلشَّهْرِ الأَوَّل'
            ],
            plan: {
              read: 'DDIA الفَصْل ٤ — التَّرْمِيزُ وَالتَّطَوُّر',
              cert: 'AWS SAA: غَوْصٌ فِي الشَّبَكَات (Direct Connect, VPN, Transit Gateway)',
              certPractice: 'اخْتِبَارُ مُمَارَسَةٍ كَامِلٍ لِـAWS SAA ١ (٦٥ سُؤَال، مُؤَقَّت)',
              dsa: 'المُؤَشِّرَان — مَسْأَلَتَان',
              blog: 'مُرَاجَعَةُ الشَّهْرِ الأَوَّل — مَا نَجَحَ، مَا لَمْ يَنْجَح',
              build: 'تَوْعِيَةُ التَّطْبِيق + Postgres + Redis عَلَى Docker (docker-compose up نَظِيف)',
              adr: 'مُلَاحَظَاتُ قَرَار: تَطَوُّرُ المُخَطَّط + طَبَقَاتُ Docker',
              interviewSat: '"لِمَ تَتْرُك / لِمَ هَذِهِ الشَّرِكَة" · صَادِق، تَطَلُّعِيّ، لَا حَرْقَ لِلْجُسُور.',
              interviewSun: 'خَصِّصْ لِثَلَاثَةِ نَمَاذِج · شَرِكَةٌ نَاشِئَةٌ فِي كُوَالَالَامْبُور · بَعِيدٌ عَالَمِيّ · شَرِكَةُ مُنْتَجٍ كَبِيرَة.'
            }
          }
        ]
      },
      {
        tabLabel: 'السَّحَابَة',
        lead: 'السَّحَابَةُ ',
        accent: 'طَبِيعَةٌ ثَانِيَة.',
        thesis: 'اِجْتَزِ الشَّهَادَة. اِنْشُرِ المَشْرُوع. عَامِلِ الدِيفُوبْس كَحِرْفَة.',
        focus: {
          book: 'DDIA — الجُزْءُ الثَّانِي (الفُصُول ٥–٦)',
          cert: 'اخْتِبَارُ AWS SAA — مَحْجُوزٌ وَمُجْتَاز',
          project: 'نَشْرٌ حَيٌّ عَلَى K8s مُدَارَة + Terraform',
          signal: 'شَارَةُ الشَّهَادَة + مَقَالُ "كَيْفَ نَشَرْت"',
          deen: 'المَعَارِج → المُدَّثِّر · مَدِينَة كِتَاب ١ فُصُول ٤–٦'
        },
        weeks: [
          {
            headline: 'كُوبِرْنِيتِس بِلَا تَرَدُّد.',
            goals: [
              'تَوْفِيرُ عُنْقُودِ DOKS / LKE (أَوْفَرُ مِنْ EKS الآن)',
              'مُخَطَّطُ Helm لِلتَّطْبِيق — ingress، أَسْرَار، configmap',
              'AWS SAA: قَوَاعِدُ البَيَانَات (RDS, Aurora, DynamoDB)',
              'DDIA الفَصْل ٥ (النَّسْخُ المُتَمَاثِل)',
              'مَقَالة: "أَوَّلُ أُسْبُوعٍ صَادِقٍ لِمُطَوِّرِ الخَلْفِيَّةِ مَعَ كُوبِرْنِيتِس"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · المَعَارِج · مَدِينَة كِتَاب ١ دَرْس ٤'
            ],
            plan: {
              read: 'DDIA الفَصْل ٥ — النَّسْخُ المُتَمَاثِل',
              cert: 'AWS SAA: قَوَاعِدُ البَيَانَات (RDS, Aurora, DynamoDB, ElastiCache)',
              certPractice: 'تَطْبِيقُ AWS SAA — قَوَاعِدُ البَيَانَات (١٥ سُؤَال)',
              dsa: 'مَزِيجُ خَرِيطَةِ تَجْزِئَة / نَافِذَة مُنْزَلِقَة — مَسْأَلَتَان',
              blog: 'أَوَّلُ أُسْبُوعٍ صَادِقٍ لِمُطَوِّرِ الخَلْفِيَّةِ مَعَ كُوبِرْنِيتِس',
              build: 'تَوْفِيرُ عُنْقُودِ DOKS / LKE + مُخَطَّطُ Helm (ingress، أَسْرَار، configmap)',
              adr: 'مُسَوَّدَةُ قَرَار: اِخْتِيَارُ مُزَوِّدِ K8s المُدَارَة وَتَبْرِيرُ التَّكْلِفَة',
              interviewSat: 'اِخْتَرْ أَقْوَى مَشْرُوعٍ سَابِق · حَدِّدْ STAR + العُمْقَ التِّقْنِيّ · نُسْخَةُ الثَّلَاثِ دَقَائِق.',
              interviewSun: 'تَدَرَّبْ عَلَى عَرْضِ الثَّلَاثِ دَقَائِقَ بِصَوْتٍ مَسْمُوع · سَجِّلْ · اِحْذِفِ الحَشْو.'
            }
          },
          {
            headline: 'البِنْيَةُ التَّحْتِيَّةُ كَكُود، حَقًّا.',
            goals: [
              'Terraform: عُنْقُود + DNS + Postgres مُدَار + Redis',
              'بِيئَتَان (تَجْرِيبِيَّة، إِنْتَاج) عَبْرَ workspaces',
              'AWS SAA: الشَّبَكَاتُ المُتَقَدِّمَة + Route 53',
              'DDIA الفَصْل ٦ (التَّقْسِيم)',
              'مَقَالة: "حَالَةُ Terraform — مَا لَا يُشْرَحُ بِوُضُوح"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · سُورَةُ نُوح · مَدِينَة كِتَاب ١ دَرْس ٥'
            ],
            plan: {
              read: 'DDIA الفَصْل ٦ — التَّقْسِيم',
              cert: 'AWS SAA: الشَّبَكَاتُ المُتَقَدِّمَة + Route 53',
              certPractice: 'تَطْبِيقُ AWS SAA — الشَّبَكَاتُ المُتَقَدِّمَة (١٥ سُؤَال)',
              dsa: 'مَزِيجُ مُؤَشِّرَيْن / نَافِذَة مُنْزَلِقَة — مَسْأَلَتَان',
              blog: 'حَالَةُ Terraform — مَا لَا يُشْرَحُ بِوُضُوح',
              build: 'Terraform: عُنْقُود + DNS + Postgres مُدَار + Redis (workspaces لِلتَّجْرِيبِيَّة وَالإِنْتَاج)',
              adr: 'مُسَوَّدَةُ قَرَار: مُسْتَوْدَعُ حَالَةِ Terraform + هَيْكَلَةُ workspaces',
              interviewSat: 'مُقَايَضَاتُ التَّعَدُّدِيَّة · صَفّ مُقَابِل مُخَطَّط مُقَابِل قَاعِدَةِ بَيَانَات · تَكْلِفَة / تَوَسُّع / دَائِرَةُ الانْفِجَار.',
              interviewSun: 'مُحَاكَاة: "لِمَ اخْتَرْتَ التَّعَدُّدِيَّةَ عَلَى مُسْتَوَى الصَّفّ؟" · دَافِعْ فِي دَقِيقَتَيْن.'
            }
          },
          {
            headline: 'تَكَامُلٌ مُسْتَمِرٌّ لَا يَكْذِب.',
            goals: [
              'GitHub Actions: بِنَاء ← اخْتِبَار ← دَفْعُ الصُّورَة ← نَشْرٌ لِلتَّجْرِيبِيَّة',
              'بَوَّابَةُ مُوَافَقَةٍ يَدَوِيَّةٍ لِلْإِنْتَاج، blue/green بَسِيط',
              'AWS SAA: اخْتِبَارُ مُمَارَسَةٍ كَامِلٍ ٢ + مُرَاجَعَةُ المَنَاطِقِ الضَّعِيفَة',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا اِجْتِيَازِ الرُّسُومِ البَيَانِيَّة (BFS/DFS)',
              'القَرَار ٠٠٠٢: اِسْتِرَاتِيجِيَّةُ النَّشْر',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · الجِنّ → المُزَّمِّل · مَدِينَة كِتَاب ١ دَرْس ٦'
            ],
            plan: {
              read: 'مُلَاحَظَاتُ تَوْطِيدِ DDIA (الجُزْءُ الأَوَّل + بِدَايَةُ الثَّانِي)',
              cert: 'اخْتِبَارُ مُمَارَسَةٍ كَامِلٍ لِـAWS SAA ٢ + مُرَاجَعَةٌ مُسْتَهْدَفَة',
              certPractice: 'تَطْبِيقُ AWS SAA — ٣٠ سُؤَالًا عَبْرَ المَنَاطِقِ الضَّعِيفَة',
              dsa: 'اِجْتِيَازُ رُسُومٍ BFS / DFS — مَسْأَلَتَان',
              blog: 'خَطُّ تَكَامُلٍ بَرَاغْمَاتِيٌّ لِـLaravel (بِنَاء ← اخْتِبَار ← نَشْر)',
              build: 'GitHub Actions: بِنَاء ← اخْتِبَار ← دَفْعُ صُورَة ← نَشْرٌ لِلتَّجْرِيبِيَّة + بَوَّابَةُ مُوَافَقَةٍ لِلْإِنْتَاج',
              adr: 'القَرَار ٠٠٠٢: اِسْتِرَاتِيجِيَّةُ النَّشْر (CI/CD + blue/green بَسِيط)',
              interviewSat: 'اِعْرِضْ مِنَصَّتَكَ السَّحَابِيَّة · أَيْنَ تَعِيشُ الحُوسَبَة · لِمَ K8s مُدَارَة · مَا الذِي وُصِفَ كَكُود.',
              interviewSun: 'مُحَاكَاة: "اِشْرَحْ لِي نَشْرَك" · ٥ دَقَائِقَ تَامَّة.'
            }
          },
          {
            headline: 'اِجْتَزِ الشَّهَادَة. اِغْرِزِ الرَّايَةَ مُجَدَّدًا.',
            goals: [
              'اِجْلِسْ لِاخْتِبَارِ AWS SAA — اِجْتَز',
              'اِنْشُرِ الشَّارَةَ + مَقَالَ الدُّرُوسِ المُسْتَفَادَة',
              'مُلَاحَظَاتُ مُرَاجَعَةِ مُنْتَصَفِ DDIA — اِنْشُرْهَا عَلَنًا',
              'حَدِّثْ سِيرَتَكَ الذَّاتِيَّة وَLinkedIn → "مُهَنْدِسُ خَلْفِيَّةٍ وَسَحَابَة (تَحْتَ التَّدْرِيب)"',
              'أَجِّلِ التَّقْدِيمَاتِ — المَنْتُوجُ لَمْ يَكْتَمِلْ بَعْد',
              'حِفْظ: أُسْبُوعٌ خَفِيفٌ بَعْدَ الشَّهَادَة · المُدَّثِّر + مُرَاجَعَةٌ تَرَاكُمِيَّةٌ لِلشَّهْرِ الثَّانِي'
            ],
            plan: {
              read: 'مُرَاجَعَةُ DDIA الجُزْءَيْنِ الأَوَّلِ وَالثَّانِي (اِنْشُرْ سِلْسِلَةَ الخُلَاصَات)',
              cert: 'اِجْلِسْ لِاخْتِبَارِ AWS SAA — اِجْتَز',
              certPractice: 'مُحَاكَاةٌ نِهَائِيَّةٌ لَيْلَةَ الاخْتِبَار (٤٥ سُؤَال، مُؤَقَّت) + جَوْلَةُ مُرَاجَعَة',
              dsa: 'رَاحَة — أَجِّلِ الخَوَارِزْمِيَّات، تَعَافَ بَعْدَ الاخْتِبَار',
              blog: 'مَا تَعَلَّمْتُ بِاجْتِيَازِ AWS SAA فِي ثَمَانِيَةِ أَسَابِيع',
              build: 'تَحْدِيثُ السِّيرَةِ وَLinkedIn → "مُهَنْدِسُ خَلْفِيَّةٍ وَسَحَابَة (تَحْتَ التَّدْرِيب)"',
              adr: 'فَهْرَسَةُ القَرَارَيْنِ ٠٠٠١ / ٠٠٠٢ فِي README + وَسْمُ الإِصْدَارِ الحَالِيّ',
              interviewSat: 'أَعِدْ كِتَابَةَ ٣ نِقَاطٍ مِنَ السِّيرَةِ بِصِيغَةِ النَّتِيجَة · زَمَنُ الاسْتِجَابَة، التَّكْلِفَة، المَوْثُوقِيَّة · أَرْقَامٌ لَا مَهَامّ.',
              interviewSun: 'أَرْسِلْهَا لِمُهَنْدِسٍ أَقْدَم لِلْمُرَاجَعَة · كَرِّرْ بِنَاءً عَلَى التَّعْلِيقَات.'
            }
          }
        ]
      },
      {
        tabLabel: 'المِعْمَارِيَّة',
        lead: 'مِعْمَارِيَّةٌ ',
        accent: 'مَرْئِيَّة.',
        thesis: 'تَدَفُّقُ الأَحْدَاثِ، CQRS، وَانْضِبَاطُ تَدْوِينِ القَرَارَات.',
        focus: {
          book: 'DDIA — الجُزْءُ الثَّالِث (الفُصُول ٧–٩)',
          cert: '—',
          project: 'تَدَفُّقُ الأَحْدَاث + CQRS فِي سِيَاقٍ مُحَدَّدٍ وَاحِد',
          signal: 'سِلْسِلَةُ قَرَارَاتٍ مِعْمَارِيَّة + مَقَالُ رَسْمِ المِعْمَارِيَّة',
          deen: 'القِيَامَة → النَّبَأ · اِخْتِمْ مَدِينَة كِتَاب ١'
        },
        weeks: [
          {
            headline: 'اِخْتَرِ السِّيَاقَ المُحَدَّد.',
            goals: [
              'حَدِّدْ نِطَاقًا وَاحِدًا فِي الـSaaS لِتَدَفُّقِ الأَحْدَاث (مَثَلًا الاشْتِرَاكَات)',
              'هَيْكَلَةُ Spatie laravel-event-sourcing',
              'DDIA الفَصْل ٧ (المُعَامَلَات) — اِقْرَأْهُ بِعِنَايَة',
              'مَقَالة: "لِمَ أُدِفِّقُ شَيْئًا وَاحِدًا فَقَط — وَلِمَ يَكْفِي ذَلِك"',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا أَسَاسِيَّاتِ البَرْمَجَةِ الدِيْنَامِيكِيَّة',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · القِيَامَة · مَدِينَة كِتَاب ١ دَرْس ٧'
            ],
            plan: {
              read: 'DDIA الفَصْل ٧ — المُعَامَلَات (اِقْرَأْهُ بِعِنَايَة، مُسْتَوَيَاتُ العَزْلِ مُهِمَّة)',
              cert: '—',
              certPractice: '—',
              dsa: 'أَسَاسِيَّاتُ البَرْمَجَةِ الدِيْنَامِيكِيَّة — مَسْأَلَتَان',
              blog: 'لِمَ أُدِفِّقُ شَيْئًا وَاحِدًا فَقَط — وَلِمَ يَكْفِي ذَلِك',
              build: 'هَيْكَلَةُ Spatie laravel-event-sourcing لِسِيَاقِ الاشْتِرَاكَات',
              adr: 'مُسَوَّدَةُ قَرَار: السِّيَاقُ المُحَدَّد + اِخْتِيَارُ مُسْتَوْدَعِ الأَحْدَاث',
              interviewSat: 'اُكْتُبْ سِينَارِيُو جَوْلَةٍ فِي المُسْتَوْدَعِ مُدَّتُهَا ٥ دَقَائِق · README ← مِعْمَارِيَّة ← قَرَارَات ← عَرْض.',
              interviewSun: 'سَجِّلِ الجَوْلَة · شَاهِدْهَا · أَعِدِ التَّسْجِيلَ مَرَّةً وَاحِدَةً إِنْ لَزِم.'
            }
          },
          {
            headline: 'الأَحْدَاثُ أَوَّلًا، الإِسْقَاطَاتُ ثَانِيًا.',
            goals: [
              'اُكْتُبْ خَمْسَةً إِلَى سَبْعَةِ أَحْدَاثٍ نِطَاقِيَّةٍ بِتَسْمِيَةٍ سَلِيمَة',
              'أَوَّلُ إِسْقَاطٍ لِنَمُوذَجِ القِرَاءَة',
              'DDIA الفَصْل ٨ (مَشَاكِلُ الأَنْظِمَةِ المُوَزَّعَة)',
              'القَرَار ٠٠٠٣: حُدُودُ الأَحْدَاثِ مُقَابِلَ الكُتَلِ الكُلِّيَّة',
              'مَقَالة: "أَحْدَاثُ النِّطَاقِ التِي كُنْتُ أَوَدُّ كِتَابَتَهَا أَبْكَر"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · الإِنْسَان · مَدِينَة كِتَاب ١ دَرْس ٨'
            ],
            plan: {
              read: 'DDIA الفَصْل ٨ — مَشَاكِلُ الأَنْظِمَةِ المُوَزَّعَة',
              cert: '—',
              certPractice: '—',
              dsa: 'بَرْمَجَةٌ دِيْنَامِيكِيَّة — مَسْأَلَتَانِ إِضَافِيَّتَان (LIS، تَنْوِيعَاتُ صَرْفِ العُمْلَة)',
              blog: 'أَحْدَاثُ النِّطَاقِ التِي كُنْتُ أَوَدُّ كِتَابَتَهَا أَبْكَر',
              build: 'اُكْتُبْ ٥–٧ أَحْدَاثٍ نِطَاقِيَّةٍ بِتَسْمِيَةٍ سَلِيمَة + أَوَّلُ إِسْقَاطٍ لِنَمُوذَجِ القِرَاءَة',
              adr: 'القَرَار ٠٠٠٣: حُدُودُ الأَحْدَاثِ مُقَابِلَ الكُتَلِ الكُلِّيَّة',
              interviewSat: 'ثَلَاثُ مَسَائِلِ تَقْدِيرٍ تَقْرِيبِيّ · QPS، تَخْزِين، عَرْضُ نِطَاق · تَمَرَّنْ عَلَى الطَّرِيقَة.',
              interviewSun: 'مُحَاكَاة: "صَمِّمْ خَلَاصَةَ إِنْسْتَجْرَام" · لَوْحَةٌ مُنْفَرِدَة أَوْ وَرَق · ٤٥ دَقِيقَة.'
            }
          },
          {
            headline: 'CQRS، بِلَا تَقْلِيدٍ أَعْمَى.',
            goals: [
              'اِفْصِلْ مَسَارَاتِ الأَمْرِ وَالاسْتِعْلَامِ فِي Laravel بِوُضُوح',
              'أَضِفْ إِسْقَاطًا ثَانِيًا (نَمَطٌ تَحْلِيلِيّ)',
              'DDIA الفَصْل ٩ (الاتِّسَاقُ وَالإِجْمَاع) — أَصْعَبُ فَصْل',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا مُكَدِّس / طَابُور',
              'مَقَالة: "CQRS لَيْسَتْ خِدْمَاتٍ مَيْكْرُو — وَتَصْحِيحَاتٌ أُخْرَى"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · المُرْسَلَات · إِنْهَاءُ مَدِينَة كِتَاب ١'
            ],
            plan: {
              read: 'DDIA الفَصْل ٩ — الاتِّسَاقُ وَالإِجْمَاع (أَصْعَبُ فَصْل)',
              cert: '—',
              certPractice: '—',
              dsa: 'مُكَدِّس / طَابُور — مَسْأَلَتَان (مُكَدِّسٌ رَتِيب، مَاكْسُ نَافِذَةٍ مُنْزَلِقَة)',
              blog: 'CQRS لَيْسَتْ خِدْمَاتٍ مَيْكْرُو — وَتَصْحِيحَاتٌ أُخْرَى',
              build: 'اِفْصِلْ مَسَارَاتِ الأَمْرِ وَالاسْتِعْلَامِ فِي Laravel + إِسْقَاطٌ ثَانٍ (تَحْلِيلِيّ)',
              adr: 'مُسَوَّدَةُ قَرَار: اِسْتِرَاتِيجِيَّةُ نَمَاذِجِ القِرَاءَة + تَوَقُّعَاتُ الاتِّسَاق',
              interviewSat: 'لَخِّصْ لِمَ تَدَفُّقُ الأَحْدَاثِ لِلِاشْتِرَاكَات · المُقَايَضَاتُ مُقَابِلَ CRUD التَّقْلِيدِيّ.',
              interviewSun: 'مُحَاكَاة: "مَتَى لَا تَسْتَخْدِمُ تَدَفُّقَ الأَحْدَاث؟" · دَافِعْ عَنِ الحَدّ.'
            }
          },
          {
            headline: 'رَسْمُ المِعْمَارِيَّة، عَلَنًا.',
            goals: [
              'اِبْنِ رَسْمَ C4 حَقِيقِيًّا (مُسْتَوَيَاتُ النِّظَام + الحَاوِيَة + المُكَوِّن)',
              'اِغْرِسْهُ فِي README + مَقَالٍ مُخَصَّص',
              'حَدِّثْ LinkedIn بِالرَّسْمِ كَخَلْفِيَّة',
              'مُرَاجَعَةُ الشَّهْرِ الثَّالِث + تَقْيِيمٌ ذَاتِيٌّ لِمُنْتَصَفِ الطَّرِيق',
              'اِبْدَأْ مُسَوَّدَةَ نِقَاطِ السِّيرَةِ بِصِيغَةِ النَّتِيجَة',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · النَّبَأ · مُرَاجَعَةُ مُنْتَصَفِ الحِفْظ (اخْتِبَارُ اسْتِرْجَاعٍ لِـ١٢ أُسْبُوعًا)'
            ],
            plan: {
              read: 'مُلَاحَظَاتُ تَوْطِيدِ DDIA الجُزْءَيْنِ الثَّانِي وَالثَّالِث (اِنْشُرِ الخُلَاصَات)',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — رَكِّزْ عَلَى صَقْلِ المَنْتُوج',
              blog: 'قِرَاءَةُ مِعْمَارِيَّةِ Saas الخَاصَّةِ بِي فِي ٣٠ ثَانِيَة — جَوْلَةُ C4',
              build: 'اِبْنِ رَسْمَ C4 حَقِيقِيًّا + اِغْرِسْهُ فِي README + خَلْفِيَّةُ LinkedIn',
              adr: 'أَضِفْ رَوَابِطَ رَسْمِ C4 إِلَى فَهْرَسِ القَرَارَات',
              interviewSat: 'تَدَرَّبْ عَلَى قِرَاءَةِ رَسْمِ C4 بِصَوْتٍ مَسْمُوع · نِظَام ← حَاوِيَة ← مُكَوِّن · ٣٠ ثَانِيَةً لِكُلِّ مُسْتَوًى.',
              interviewSun: 'مُحَاكَاة: "اِعْرِضْ مِعْمَارِيَّةَ Saas فِي ٣ دَقَائِق" · أَوْقِفِ السَّاعَة.'
            }
          }
        ]
      },
      {
        tabLabel: 'المُلَاحَظَة',
        lead: 'المُلَاحَظَةُ ',
        accent: 'وَعَيْنُ المُشَغِّل.',
        thesis: 'إِنْ لَمْ تَرَهُ، فَلَا تَمْلِكُه. مَقَايِيسُ حَقِيقِيَّة، آثَار، سِجِلَّات.',
        focus: {
          book: 'أَسَاسِيَّاتُ مِعْمَارِيَّةِ البَرْمَجِيَّات — الجُزْءُ الأَوَّل',
          cert: '—',
          project: 'حُزْمَةُ مُلَاحَظَةٍ كَامِلَة + اخْتِبَارُ حِمْل + لَوْحَةُ تَكْلِفَة',
          signal: 'مَقَالُ تَشْرِيحِ حَادِثَةٍ مَفْتَعَلَةٍ ذَاتِيًّا',
          deen: 'النَّازِعَات → الانْشِقَاق · مَدِينَة كِتَاب ٢ يَبْدَأ'
        },
        weeks: [
          {
            headline: 'ثَلَاثَةُ أَعْمِدَة، بِإِتْقَان.',
            goals: [
              'Prometheus + Grafana عَبْرَ kube-prometheus-stack',
              'مَقَايِيسُ مُسْتَوَى التَّطْبِيق عَبْرَ مُصَدِّرَاتِ Laravel',
              'FoSA الفُصُول ١–٣ (التَّفْكِيرُ المِعْمَارِيّ، النَّمَطِيَّة، الخَصَائِص)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا شَجَرَة',
              'مَقَالة: "الإِشَارَاتُ الذَّهَبِيَّةُ الأَرْبَع، مُطَبَّقَةٌ عَلَى تَطْبِيقِ Laravel"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · النَّازِعَات · مَدِينَة كِتَاب ٢ دَرْس ١'
            ],
            plan: {
              read: 'FoSA الفُصُول ١–٣ — التَّفْكِيرُ المِعْمَارِيّ، النَّمَطِيَّة، الخَصَائِص',
              cert: '—',
              certPractice: '—',
              dsa: 'مَسَائِلُ الشَّجَرَة — مَسْأَلَتَان (DFS / BFS عَلَى الأَشْجَارِ الثُّنَائِيَّة)',
              blog: 'الإِشَارَاتُ الذَّهَبِيَّةُ الأَرْبَع، مُطَبَّقَةٌ عَلَى تَطْبِيقِ Laravel',
              build: 'kube-prometheus-stack (Prometheus + Grafana) + مُصَدِّرَاتُ مَقَايِيسِ Laravel',
              adr: 'مُسَوَّدَةُ قَرَار: أَهْدَافُ SLI / SLO لِكُلِّ فِئَةِ نُقْطَةِ نِهَايَة',
              interviewSat: 'اُكْتُبْ قِصَّةَ مُقَابَلَةٍ لِحَادِثَةِ إِنْتَاجٍ سَتُجْرِيهَا هَذَا الشَّهْر.',
              interviewSun: 'مُحَاكَاة: "حَدِّثْنِي عَنْ حَادِثَةِ إِنْتَاج" · إِجَابَةُ STAR فِي ثَلَاثِ دَقَائِق.'
            }
          },
          {
            headline: 'تَتَبُّعُ مَا لَمْ تَكُنْ تَرَاه.',
            goals: [
              'OpenTelemetry SDK فِي Laravel — آثَارٌ إِلَى Tempo / Grafana Cloud',
              'حَدِّدْ أَبْطَأَ نُقْطَةِ نِهَايَة، أَصْلِحْهَا عَلَى الكَامِيرَا (commit + مَقَال)',
              'FoSA الفُصُول ٤–٥ (خَصَائِصُ المِعْمَارِيَّة، تَحْدِيدُهَا)',
              'القَرَار ٠٠٠٤: حُزْمَةُ المُلَاحَظَة',
              'مَقَالة: "التَّتَبُّعُ المُوَزَّعُ لِتَطْبِيقٍ غَيْرِ مُوَزَّع — يَسْتَحِقُّ ذَلِك"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · عَبَس · مَدِينَة كِتَاب ٢ دَرْس ٢'
            ],
            plan: {
              read: 'FoSA الفُصُول ٤–٥ — خَصَائِصُ المِعْمَارِيَّة، تَحْدِيدُهَا',
              cert: '—',
              certPractice: '—',
              dsa: 'مَسَائِلُ الشَّجَرَة — مَسْأَلَتَانِ إِضَافِيَّتَان (السَّلَفُ المُشْتَرَكُ الأَدْنَى، تَرْتِيبُ المُسْتَوَيَات)',
              blog: 'التَّتَبُّعُ المُوَزَّعُ لِتَطْبِيقٍ غَيْرِ مُوَزَّع — يَسْتَحِقُّ ذَلِك',
              build: 'OpenTelemetry SDK فِي Laravel + آثَارٌ إِلَى Tempo / Grafana Cloud + إِصْلَاحُ أَبْطَأِ نُقْطَةٍ حَيًّا',
              adr: 'القَرَار ٠٠٠٤: حُزْمَةُ المُلَاحَظَة',
              interviewSat: 'احْفَظِ الإِشَارَاتِ الذَّهَبِيَّةَ الأَرْبَع (زَمَن، حَرَكَة، أَخْطَاء، إِشْبَاع) · بِمَقَايِيسِكَ المُحَدَّدَة.',
              interviewSun: 'مُحَاكَاة: "كَيْفَ تَعْرِفُ أَنَّ خِدْمَتَكَ سَلِيمَة؟" · جَوْلَةُ خَمْسِ دَقَائِق.'
            }
          },
          {
            headline: 'اِكْسِرْهَا قَصْدًا.',
            goals: [
              'شَغِّلِ اخْتِبَارَ حِمْلٍ بِـk6 حَتَّى يَنْكَسِرَ شَيْء',
              'وَثِّقْ نَمَطَ الفَشَلِ فِي قَالَبِ تَشْرِيحٍ حَقِيقِيّ',
              'أَضِفْ قَاعِدَةَ تَنْبِيهٍ كَانَتْ سَتَرْصُدُه',
              'FoSA الفُصُول ٦–٧ (القِيَاسُ وَالحَوْكَمَة، النَّمَطِيَّة)',
              'مَقَالة: "كَسَرْتُ مِنَصَّتِي — وَهَذَا التَّشْرِيح"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · التَّكْوِير + الانْفِطَار · مَدِينَة كِتَاب ٢ دَرْس ٣'
            ],
            plan: {
              read: 'FoSA الفُصُول ٦–٧ — القِيَاسُ وَالحَوْكَمَة، النَّمَطِيَّة',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — رَكِّزْ عَلَى أُسْبُوعِ الحَادِثَة',
              blog: 'كَسَرْتُ مِنَصَّتِي — وَهَذَا التَّشْرِيح',
              build: 'اخْتِبَارُ حِمْلٍ بِـk6 حَتَّى يَنْكَسِرَ شَيْء + قَالَبُ تَشْرِيح + قَاعِدَةُ تَنْبِيهٍ كَانَتْ سَتَرْصُدُه',
              adr: 'تَحْدِيثُ قَرَار: سِيَاسَةُ التَّنْبِيهَات + بَدْءُ كِتَابِ الرُّكُض',
              interviewSat: 'حَدِّدْ ٣ مُؤَشِّرَاتٍ لِـSaaS · اِخْتَرْ أَهْدَافًا · دَافِعْ عَنْ مِيزَانِيَّاتِ الأَخْطَاء.',
              interviewSun: 'مُحَاكَاة: "مَا هُوَ SLO لِأَكْثَرِ نُقَاطِكَ اِسْتِخْدَامًا؟" · دِفَاعٌ فِي دَقِيقَتَيْن.'
            }
          },
          {
            headline: 'التَّكْلِفَةُ مَقْيَاسٌ مِنَ الدَّرَجَةِ الأُولَى.',
            goals: [
              'اِبْنِ لَوْحَةَ تَكْلِفَةٍ صَغِيرَة (عُنْقُود + قَاعِدَةُ بَيَانَات + CDN)',
              'صَغِّرْ حَجْمَ شَيْء — اِعْرِضْ قَبْل/بَعْد',
              'مُرَاجَعَةُ FoSA الجُزْءُ الأَوَّل',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا بَحْثٍ ثُنَائِيّ',
              'حَدِّثْ سِيرَتَكَ بِنَتِيجَةٍ جَدِيدَة (زَمَن أَوْ تَكْلِفَة)',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · المُطَفِّفِين → الانْشِقَاق · مُرَاجَعَةُ الشَّهْرِ الرَّابِعِ التَّرَاكُمِيَّة'
            ],
            plan: {
              read: 'مُرَاجَعَةُ FoSA الجُزْءِ الأَوَّل — اِنْشُرْ سِلْسِلَةَ الخُلَاصَات',
              cert: '—',
              certPractice: '—',
              dsa: 'بَحْثٌ ثُنَائِيّ — مَسْأَلَتَان (مَصْفُوفَةٌ مُدَوَّرَة، تَنْوِيعَاتُ مَجَالِ البَحْث)',
              blog: 'التَّكْلِفَةُ مَقْيَاسٌ مِنَ الدَّرَجَةِ الأُولَى',
              build: 'لَوْحَةُ تَكْلِفَة (عُنْقُود + قَاعِدَةُ بَيَانَات + CDN) + تَصْغِيرُ حَجْمِ شَيْءٍ مَعَ أَرْقَامِ قَبْل/بَعْد',
              adr: 'مُسَوَّدَةُ قَرَار: قَرَارُ التَّحْجِيمِ المُنَاسِب + سَقْفُ التَّكْلِفَة',
              interviewSat: 'اُكْتُبْ كِتَابَ رُكُضٍ لِأَكْثَرِ التَّنْبِيهَاتِ شُيُوعًا · نِدَاء ← فَرْز ← حَلّ ← تَشْرِيح.',
              interviewSun: 'مُحَاكَاة: "اِشْرَحْ لِي دَوْرَ المُنَاوَبَة" · إِجَابَةُ خَمْسِ دَقَائِق.'
            }
          }
        ]
      },
      {
        tabLabel: 'الذَّكَاءُ الاصْطِنَاعِيّ',
        lead: 'الذَّكَاءُ الاصْطِنَاعِيُّ ',
        accent: 'مُضَاعِفُ قُوَّة.',
        thesis: 'لَسْتَ مُهَنْدِسَ ذَكَاءٍ اصْطِنَاعِيّ — بَلْ مُهَنْدِسُ خَلْفِيَّةٍ يُتْقِنُ الذَّكَاءَ فِي الإِنْتَاج.',
        focus: {
          book: 'FoSA — الجُزْءُ الثَّانِي',
          cert: '—',
          project: 'مُسَاعِدُ إِدَارَةٍ بِـClaude + خَطُّ تَطْوِيرِ وَكِيل',
          signal: 'مَقَالَانِ عَنِ الذَّكَاءِ فِي الإِنْتَاج بِلَا ضَجِيج',
          deen: 'البُرُوج → الضُّحَى · مَدِينَة كِتَاب ٢ مُنْتَصَف · خُمُسٌ لِلْأُمَّة'
        },
        weeks: [
          {
            headline: 'الذَّكَاءُ الاصْطِنَاعِيُّ فِي دَوْرَةِ تَطْوِيرِك.',
            goals: [
              'CLAUDE.md لِلْمُسْتَوْدَع — أَعْرَافٌ مُقَنَّنَة',
              'سَيْرُ عَمَلِ Plan-mode عَلَى تَذْكِرَةٍ حَقِيقِيَّة — اُكْتُبْهُ',
              'FoSA الفُصُول ٨–١٠ (المُكَوِّنَات، أُسُسُ أَنْمَاطِ المِعْمَارِيَّة)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا تَرَاجُع',
              'مَقَالة: "سَيْرُ عَمَلِي مَعَ الذَّكَاءِ الاصْطِنَاعِيِّ فِي الخَلْفِيَّة، مِنَ البِدَايَةِ لِلنِّهَايَة"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · البُرُوج + الطَّارِق + الأَعْلَى · إِطَارُ خُمُس — أَدِّ زَكَاةَ وَقْتِ الذَّكَاءِ المُحَرَّر'
            ],
            plan: {
              read: 'FoSA الفُصُول ٨–١٠ — المُكَوِّنَات، أُسُسُ أَنْمَاطِ المِعْمَارِيَّة',
              cert: '—',
              certPractice: '—',
              dsa: 'تَرَاجُع — مَسْأَلَتَان (مَجْمُوعَاتٌ فَرْعِيَّة، تَبْدِيلَات)',
              blog: 'سَيْرُ عَمَلِي مَعَ الذَّكَاءِ الاصْطِنَاعِيِّ فِي الخَلْفِيَّة، مِنَ البِدَايَةِ لِلنِّهَايَة',
              build: 'CLAUDE.md لِلْمُسْتَوْدَع (أَعْرَافٌ مُقَنَّنَة) + سَيْرُ Plan-mode عَلَى تَذْكِرَةٍ حَقِيقِيَّة — وَثِّقْهُ',
              adr: 'مُسَوَّدَةُ قَرَار: حَدُّ الذَّكَاءِ الاصْطِنَاعِيِّ فِي التَّطْوِير',
              interviewSat: 'لَخِّصْ سَيْرَ Claude / Cursor · أَيْنَ يَلْمَع، أَيْنَ يَفْشَل، حَدُّك.',
              interviewSun: 'مُحَاكَاة: "كَيْفَ تَسْتَخْدِمُ الذَّكَاءَ فِي عَمَلِك؟" · ثَلَاثُ دَقَائِق · بِلَا كَلِمَاتٍ رَنَّانَة.'
            }
          },
          {
            headline: 'خَطُّ الوَكِيل، اِكْتَمَلَ أَخِيرًا.',
            goals: [
              'أَعِدْ لِـZeroClaw أَوِ اخْتَرْ بَدِيلًا: تَذْكِرَة ← فَرْع ← PR ← مُرَاجَعَة',
              'اِرْبِطْهُ بِمَشْرُوعِكَ الخَاصّ (لَيْسَ BBIL)',
              'FoSA الفُصُول ١١–١٣ (الطَّبَقِيّ، الأُنْبُوبِيّ، نَوَاةٌ صَغِيرَة)',
              'القَرَار ٠٠٠٥: حُدُودُ أَدَوَاتِ الذَّكَاءِ (مَا يَفْعَلُ وَمَا لَا يَفْعَل)',
              'مَقَالة: "وَكِيلُ تَطْوِيرٍ ذَاتِيٌّ أَثِقُ بِه فِعْلًا"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · الغَاشِيَة + الفَجْر · مَدِينَة كِتَاب ٢ مُنْتَصَف'
            ],
            plan: {
              read: 'FoSA الفُصُول ١١–١٣ — الطَّبَقِيّ، الأُنْبُوبِيّ، نَوَاةٌ صَغِيرَة',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — أُسْبُوعُ خَطِّ الوَكِيل',
              blog: 'وَكِيلُ تَطْوِيرٍ ذَاتِيٌّ أَثِقُ بِه فِعْلًا',
              build: 'ZeroClaw أَوْ خَطُّ وَكِيلٍ بَدِيل (تَذْكِرَة ← فَرْع ← PR ← مُرَاجَعَة) مَرْبُوطٌ بِمَشْرُوعِك',
              adr: 'القَرَار ٠٠٠٥: حُدُودُ أَدَوَاتِ الذَّكَاءِ (مَا يَفْعَلُ وَمَا لَا يَفْعَل)',
              interviewSat: 'اِعْرِضْ خَطَّ الوَكِيل · تَذْكِرَة ← فَرْع ← PR ← مُرَاجَعَة · مَا تَثِقُ بِه، وَمَا لَا.',
              interviewSun: 'مُحَاكَاة: "مَا الذِي لَا يَسْتَطِيعُ وَكِيلُكَ فِعْلَه؟" · دَافِعْ عَنِ الحَدّ.'
            }
          },
          {
            headline: 'Claude فِي المُنْتَج، مَعَ حَوَاجِز.',
            goals: [
              'أَضِفْ مُسَاعِدَ إِدَارَةٍ صَغِيرًا فِي SaaS عَبْرَ Anthropic API',
              'طَبِّقْ: تَحْدِيدَ المُعَدَّل، سَقْفَ التَّكْلِفَة، حُزْمَةَ تَقْيِيم، احْتِيَاطًا',
              'FoSA الفُصُول ١٤–١٦ (SOA، خِدْمَاتٌ مَيْكْرُو، اِخْتِيَارُ الأَنْمَاط)',
              'الخَوَارِزْمِيَّات: مَسْأَلَتَا تَصْمِيمٍ نَمَطِيّ',
              'مَقَالة: "وَضْعُ LLM فِي الإِنْتَاجِ بِمَسْؤُولِيَّة"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · البَلَد + الشَّمْس · تَطْبِيقُ الصَّلَاةِ البَطِيءِ بِالآيَاتِ الجَدِيدَة'
            ],
            plan: {
              read: 'FoSA الفُصُول ١٤–١٦ — خِدْمِيّ، مَدْفُوعٌ بِالأَحْدَاث، فَضَائِيّ',
              cert: '—',
              certPractice: '—',
              dsa: 'نَمَطُ تَصْمِيم — مَسْأَلَتَان (ذَاكِرَةُ LRU، تَصْمِيمُ الجَدْوَلِ الزَّمَنِيِّ لِتَوِيتَر)',
              blog: 'وَضْعُ LLM فِي الإِنْتَاجِ بِمَسْؤُولِيَّة',
              build: 'مُسَاعِدُ إِدَارَةٍ عَبْرَ Anthropic API + تَحْدِيدُ مُعَدَّل + سَقْفُ تَكْلِفَة + حُزْمَةُ تَقْيِيم + احْتِيَاط',
              adr: 'مُسَوَّدَةُ قَرَار: سُقُوفُ تَكْلِفَةِ LLM، حُدُودُ المُعَدَّل، سِيَاسَةُ الاحْتِيَاط',
              interviewSat: 'صَفْحَةٌ وَاحِدَة لِلْمُقَارَنَة · Claude مُقَابِل OpenAI مُقَابِل أَوْزَانٍ مَفْتُوحَة · تَكْلِفَة / زَمَن / جُودَة / تَقْيِيد.',
              interviewSun: 'مُحَاكَاة: "لِمَ اخْتَرْتَ Claude؟" · دَافِعْ فِي دَقِيقَتَيْن.'
            }
          },
          {
            headline: 'قَيِّمْ، لَا تَتْبَعِ الهَوَى.',
            goals: [
              'اِبْنِ مَجْمُوعَةَ تَقْيِيمٍ لِلْمُسَاعِدِ — نَجَاح/فَشَل',
              'بَوَّابَةُ CI: تَمْنَعُ النَّشْرَ إِذَا انْخَفَضَ مُعَدَّلُ نَجَاحِ التَّقْيِيم',
              'لَوْحَةُ تَكْلِفَةٍ وَزَمَنٍ لِمَسَارِ LLM',
              'مُلَاحَظَاتُ خَتْمِ FoSA الجُزْءِ الثَّانِي — عَلَنًا',
              'تَحْدِيثُ السِّيرَة — "تَكَامُلُ LLM فِي الإِنْتَاجِ مَعَ تَقْيِيمَاتٍ وَسُقُوفِ تَكْلِفَة"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · اللَّيْل + الضُّحَى + الانْشِرَاح · مُرَاجَعَةُ الشَّهْرِ الخَامِسِ التَّرَاكُمِيَّة'
            ],
            plan: {
              read: 'مُلَاحَظَاتُ خَتْمِ FoSA الجُزْءِ الثَّانِي — اِنْشُرْ',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — أُسْبُوعُ بَوَّابَةِ التَّقْيِيم',
              blog: 'قَيِّمْ، لَا تَتْبَعِ الهَوَى — CI لِلْـLLM بِبَوَّابَةِ تَقْيِيم',
              build: 'مَجْمُوعَةُ تَقْيِيمٍ لِلْمُسَاعِد + بَوَّابَةُ CI (تَمْنَعُ النَّشْرَ عِنْدَ التَّرَاجُع) + لَوْحَةُ تَكْلِفَةٍ وَزَمَنٍ لِـLLM',
              adr: 'تَحْدِيثُ قَرَار: عَتَبَاتُ التَّقْيِيمِ وَسِيَاسَةُ التَّرَاجُع',
              interviewSat: 'وَثِّقْ مَجْمُوعَةَ تَقْيِيمِك، بَوَّابَةَ CI، حُدُودَ المُعَدَّل، سُقُوفَ التَّكْلِفَة، اِسْتِرَاتِيجِيَّةَ الاحْتِيَاط.',
              interviewSun: 'مُحَاكَاة: "كَيْفَ تَمْنَعُ LLM مِنَ الانْفِلَات؟" · إِجَابَةُ خَمْسِ دَقَائِق.'
            }
          }
        ]
      },
      {
        tabLabel: 'العَلَنِيَّة',
        lead: 'عَلَنِيٌّ، ',
        accent: 'وَقَابِلٌ لِلتَّوْظِيف.',
        thesis: 'اِصْقُلِ المَنْتُوجَات. اِفْتَحِ البَاب. أَدِرْ بَحْثَكَ كَمُهَنْدِس.',
        focus: {
          book: 'مُقَابَلَةُ تَصْمِيمِ النِّظَام — مُجَلَّد ١ (فُصُولٌ مُخْتَارَة)',
          cert: '—',
          project: 'صَقْل، فِيدِيُو عَرْض، مِعْمَارِيَّةُ README، دِرَاسَةُ حَالَة',
          signal: 'مَاكِينَةُ تَوَاصُل تَعْمَل. مُقَابَلَاتٌ مَحْجُوزَة.',
          deen: 'اللَّيْل → النَّاس · مُرَاجَعَةُ جُزْءِ ٣٠ التَّرَاكُمِيَّةُ الكَامِلَة'
        },
        weeks: [
          {
            headline: 'اِجْعَلِ المُسْتَوْدَعَ لَا يُفَوَّت.',
            goals: [
              'إِعَادَةُ كِتَابَةِ README: المُشْكِلَة، رَسْمُ المِعْمَارِيَّة، فَهْرَسُ القَرَارَات، gif عَرْض',
              'ثَبِّتْ ثَلَاثَةَ مَنْشُورَاتٍ مُمَيَّزَةٍ فِي قِسْمِ LinkedIn featured',
              'سَجِّلْ فِيدِيُو Loom لِلنِّظَامِ مُدَّتُه ثَلَاثُ دَقَائِق',
              'مُقَابَلَةُ تَصْمِيمِ النِّظَام: الفُصُول ١–٤ (المِقْيَاس، التَّقْدِيرُ التَّقْرِيبِيّ)',
              'مُقَابَلَةُ تَصْمِيمِ نِظَامٍ تَجْرِيبِيَّة — مُنْفَرِدَة، مُسَجَّلَة',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · التِّين → العَادِيَات'
            ],
            plan: {
              read: 'مُقَابَلَةُ تَصْمِيمِ النِّظَام مُجَلَّد ١ — الفُصُول ١–٤ (المِقْيَاس، التَّقْدِيرُ التَّقْرِيبِيّ)',
              cert: '—',
              certPractice: '—',
              dsa: 'تَخْفِيف — مَسْأَلَةٌ مُتَوَسِّطَةٌ وَاحِدَة (مِنْ أَضْعَفِ فِئَاتِك)',
              blog: 'اِجْعَلِ المُسْتَوْدَعَ لَا يُفَوَّت — تَشْرِيحُ README',
              build: 'إِعَادَةُ كِتَابَةِ README + فِيدِيُو Loom ٣ دَقَائِق + تَثْبِيتُ ٣ مَنْشُورَات',
              adr: 'فَهْرَسُ القَرَارَات — تَمْرِيرَةٌ نِهَائِيَّةٌ مَعَ رَوَابِطَ مُتَقَاطِعَة',
              interviewSat: 'حُلَّ مَسْأَلَتَيْنِ مُتَوَسِّطَتَيْنِ حَيًّا · مُسَجَّلَة · بِلَا IDE · وَرَق وَلَوْحَة.',
              interviewSun: 'شَاهِدْ نَفْسَكَ · لَاحِظْ أَيْنَ تَتَوَقَّف · ثَبِّتْ تِلْكَ الأَنْمَاطَ غَدًا.'
            }
          },
          {
            headline: 'السِّيرَةُ وَالحِسَابُ، مَصْقُولَان.',
            goals: [
              'سِيرَةٌ مِنْ صَفْحَةٍ وَاحِدَة، نِقَاطُ نَتَائِجَ فَقَط، مُسْتَوْدَعٌ وَمُدَوَّنَةٌ فَوْقَ الطَّيّ',
              'LinkedIn: عُنْوَانٌ يَعِي كُوَالَالَامْبُور، خَلْفِيَّةٌ = رَسْمُ مِعْمَارِيَّتِك',
              'مِلَفَّاتٌ مُكْتَمِلَة عَلَى Wellfound + Arc',
              'قَائِمَةٌ بِثَلَاثِينَ شَرِكَةً مُسْتَهْدَفَة (مَالِيزِيَا أَوَّلًا، عَالَمِيٌّ بَعِيدٌ ثَانِيًا)',
              'مَقَالة: "سِتَّةُ أَشْهُرٍ عَلَنًا — مَا كُنْتُ سَأَقُولُهُ لِنَفْسِي فِي الأُسْبُوعِ الأَوَّل"',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · القَارِعَة → الكَوْثَر'
            ],
            plan: {
              read: 'مُقَابَلَةُ تَصْمِيمِ النِّظَام مُجَلَّد ١ — الفُصُول ٥–٦ (مُحَدِّدُ المُعَدَّل، التَّجْزِئَةُ المُتَّسِقَة)',
              cert: '—',
              certPractice: '—',
              dsa: 'تَخْفِيف — مَسْأَلَةٌ مُتَوَسِّطَةٌ وَاحِدَة',
              blog: 'سِتَّةُ أَشْهُرٍ عَلَنًا — مَا كُنْتُ سَأَقُولُهُ لِنَفْسِي فِي الأُسْبُوعِ الأَوَّل',
              build: 'سِيرَةٌ مِنْ صَفْحَةٍ + LinkedIn + Wellfound + Arc + قَائِمَةُ ٣٠ شَرِكَة',
              adr: '—',
              interviewSat: 'مَارَاتُونُ أَنْمَاطِ بَرْمَجَة · نَافِذَةٌ مُنْزَلِقَة + مُؤَشِّرَيْن + خَرِيطَةُ تَجْزِئَة · ٣ مَسَائِلَ لِكُلِّ نَمَط · فَكِّرْ بِصَوْتٍ مَسْمُوع.',
              interviewSun: 'مُحَاكَاةٌ مَعَ Pramp أَوْ صَدِيق · جَلْسَةُ بَرْمَجَةٍ ٤٥ دَقِيقَة · خُذِ التَّعْلِيقَات.'
            }
          },
          {
            headline: 'التَّوَاصُلُ كَنِظَام.',
            goals: [
              'عَشَرَةُ تَقْدِيمَاتٍ مُخَصَّصَةٍ هَذَا الأُسْبُوع (لَا مِئَةُ تَقْدِيمٍ مُتَنَاثِر)',
              'خَمْسُ رَسَائِلَ دَافِئَة لِمُدَرَاءِ هَنْدَسَةٍ فِي كُوَالَالَامْبُور',
              'جَلْسَتَا تَصْمِيمِ نِظَامٍ تَجْرِيبِيَّتَان (Pramp / صَدِيق / Discord)',
              'مُقَابَلَةُ تَصْمِيمِ النِّظَام: دِرَاسَتَا حَالَة',
              'تَتَبَّعْ كُلَّ شَيْءٍ فِي جَدْوَلٍ بَسِيط — قِمْعٌ لَا مَشَاعِر',
              'حِفْظ: ٣٠ آيَة جَدِيدَة · الكَافِرُون → الفَلَق + النَّاس · إِنْهَاءُ جُزْءِ ٣٠'
            ],
            plan: {
              read: 'مُقَابَلَةُ تَصْمِيمِ النِّظَام مُجَلَّد ١ — دِرَاسَتَا حَالَة (Twitter timeline + News Feed)',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — تَرْكِيزٌ عَلَى وَتِيرَةِ المُقَابَلَات',
              blog: 'قِمْعُ المُقَابَلَاتِ الذِي أُدِيرُهُ هَذَا الشَّهْر',
              build: '١٠ تَقْدِيمَاتٍ مُخَصَّصَة + ٥ رَسَائِلَ دَافِئَة + جَلْسَتَا تَصْمِيمِ نِظَام',
              adr: '—',
              interviewSat: '٦٠ دَقِيقَةً مِنْ تَصْمِيمِ نِظَامٍ مُنْفَرِد · اِخْتَرْ سِينَارِيُو · لَوْحَة + مُقَايَضَات.',
              interviewSun: 'مُحَاكَاةٌ مَعَ زَمِيلٍ أَوْ Discord · تَعْلِيقَاتٌ قَاسِيَة · كَرِّرْ فِي الأُسْبُوعِ القَادِم.'
            }
          },
          {
            headline: 'تَرَاكَمْ، سَلِّمْ، تَنَفَّسْ.',
            goals: [
              'عَشَرَةُ تَقْدِيمَاتٍ مُخَصَّصَةٍ أُخْرَى + مُتَابَعَةُ الأُولَى',
              'اِنْشُرْ دِرَاسَةَ حَالَةٍ نِهَائِيَّة "مَا بَنَيْتُ"',
              'ضَعْ أَهْدَافَ الرُّبْعِ الثَّالِث: عُمْقٌ فِي نَمَطٍ مِعْمَارِيٍّ، عَرْضٌ مُقَدَّم',
              'اِجْدُلْ أُسْبُوعَ رَاحَةٍ حَقِيقِيًّا — اِسْتَحْقَقْتَه',
              'بِسْمِ اللَّه عَلَى مَا هُوَ آت.',
              'حِفْظ: مُرَاجَعَةُ جُزْءِ ٣٠ التَّرَاكُمِيَّةُ الكَامِلَة · نِيَّةُ جُزْءِ ٢٩ فِي الرُّبْعِ الثَّالِث'
            ],
            plan: {
              read: 'مُقَابَلَةُ تَصْمِيمِ النِّظَام مُجَلَّد ١ — دِرَاسَتَا حَالَةٍ إِضَافِيَّتَان (التَّنْبِيهَات + الدَّرْدَشَة)',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة — أُسْبُوعُ الخِتَام',
              blog: 'سِتَّةُ أَشْهُر، مَا بَنَيْتُ — دِرَاسَةُ حَالَةٍ نِهَائِيَّة',
              build: '١٠ تَقْدِيمَاتٍ إِضَافِيَّة + مُتَابَعَةُ الأُولَى + أَهْدَافُ الرُّبْعِ الثَّالِث + جَدْوَلَةُ أُسْبُوعِ رَاحَة',
              adr: '—',
              interviewSat: 'اِبْحَثْ شَرَائِحَ الرَّوَاتِب (Levels.fyi، RemoteOK، LinkedIn) · ضَعْ حَدَّكَ الأَدْنَى وَالطُّمُوحِيّ.',
              interviewSun: 'تَدَرَّبْ عَلَى عِبَارَاتِ التَّفَاوُض · "أَرَى المَدَى عِنْدَ س — هَلْ نَسْتَكْشِفُ ص؟" · أَمَامَ المِرْآة.'
            }
          }
        ]
      },
      {
        tabLabel: 'المُقَابَلَات',
        lead: 'حَيٌّ، ',
        accent: 'وَمُخْتَار.',
        thesis: 'دِيسَمْبِر · قَدِّمْ، قَابِلْ، فَاوِضْ، اِخْتَرْ. المَنْتُوجُ يَحْمِلُك — اِحْضُرْ مُسْتَرِيحًا.',
        focus: {
          book: 'مُرَاجَعَةُ CTCI نِهَائِيَّة + تَصْمِيمُ النِّظَام مُجَلَّد ١ (آخِرُ الدِّرَاسَات)',
          cert: '—',
          project: 'صَقْلٌ فَقَط · لَا مِيزَاتٍ جَدِيدَة · المَنْتُوجُ كَمَا هُوَ',
          signal: '١٠+ مُقَابَلَاتٍ مَحْجُوزَة · ٣+ مُحَادَثَاتُ عُرُوضٍ فَعَّالَة',
          deen: 'الانْشِرَاح → النَّاس · إِتْقَانُ جُزْءِ ٣٠ · التَّهَجُّدُ مِرْسَاتُك'
        },
        weeks: [
          {
            headline: 'قَدِّمْ بِكَثَافَة.',
            goals: [
              'أَرْسِلْ ١٥ تَقْدِيمًا مُخَصَّصًا عَبْرَ كُوَالَالَامْبُور + عَالَمِيٌّ بَعِيد',
              'تَوَاصَلْ مَعَ ١٠ جِهَاتِ اتِّصَالٍ دَافِئَة (مُدَرَاءُ هَنْدَسَة، زُمَلَاءُ سَابِقُون)',
              'حَدِّثِ السِّيرَة بِنِقَاطِ نَتَائِجِ الشَّهْرِ السَّادِس',
              'اِجْدُلْ مُحَاكَاةً يَوْمِيًّا · مُنْفَرِد، Pramp، أَصْدِقَاء',
              'لَا مِيزَاتٍ جَدِيدَة عَلَى المُسْتَوْدَع · صَقْلٌ فَقَط',
              'حِفْظ: الانْشِرَاح + الضُّحَى · مُرَاجَعَةٌ تَرَاكُمِيَّةٌ خِلَالَ جُزْءِ ٣٠'
            ],
            plan: {
              read: 'CTCI الفُصُول ١–٢ (المَصْفُوفَات، السَّلَاسِل) · مُنَعِّشُ نَمَط',
              cert: '—',
              certPractice: '—',
              dsa: 'سَهْلٌ وَمُتَوَسِّطٌ كُلَّ يَوْم · تَكَلَّمْ بِصَوْتٍ مَسْمُوع',
              blog: 'قَصِير: "مَا أَبْحَثُ عَنْهُ تَالِيًا" · صَادِقٌ وَمُوجَز',
              build: 'صَقْلٌ فَقَط: README، خَلْفِيَّةُ LinkedIn، مَنْشُورَاتٌ مُثَبَّتَة',
              adr: '—',
              interviewSat: 'أَرْسِلْ ١٥ تَقْدِيمًا + ١٠ رَسَائِلَ دَافِئَة + تَمْرِيرَةٌ نِهَائِيَّةٌ لِلسِّيرَة بِنَتَائِجِ الشَّهْرِ السَّادِس.',
              interviewSun: 'مُحَاكَاةُ جَوْلَةٍ كَامِلَةٍ مُنْفَرِدَة · سُلُوكِيّ + تَصْمِيمُ نِظَام + مَسْأَلَةُ بَرْمَجَة · مُسَجَّلَة.'
            }
          },
          {
            headline: 'تَدْرِيبُ المَوْقِع.',
            goals: [
              'شَغِّلْ ٣ مُحَاكَيَاتِ جَوْلَةٍ كَامِلَة (سُلُوكِيّ + تَصْمِيمُ نِظَام + بَرْمَجَة + ثَقَافَة)',
              'اِجْدُلْ فَتَرَاتِ المَوْقِعِ لِلْأُسْبُوعِ ٢٧',
              'أَعِدْ قِرَاءَةَ أَفْضَلِ ٣ قَرَارَاتٍ مِعْمَارِيَّة · كُنْ مُسْتَعِدًّا لِلدِّفَاع',
              'جَهِّزْ ٥ أَسْئِلَةٍ ذَكِيَّةٍ لِلْمُقَابِلِ لِكُلِّ نَمُوذَجِ شَرِكَة',
              'حِفْظ: التِّين + العَادِيَات · مُرَاجَعَةٌ تَرَاكُمِيَّةٌ خِلَالَ جُزْءِ ٣٠',
              'النَّوْمُ وَالعَائِلَةُ مَحْمِيَّان · المُقَابَلَاتُ تَتَطَلَّبُ ذِهْنًا صَافِيًا'
            ],
            plan: {
              read: 'CTCI الفُصُول ٣–٤ (المُكَدِّسَات، الطَّوَابِير، الأَشْجَار) · مُنَعِّشُ نَمَط',
              cert: '—',
              certPractice: '—',
              dsa: 'بَرْمَجَةٌ بِمُسْتَوَى المُحَاكَاة · مَسْأَلَتَانِ مُتَوَسِّطَتَانِ يَوْمِيًّا · بِمُؤَقِّت',
              blog: '—',
              build: 'صَقْلٌ فَقَط · رُدَّ عَلَى مَسَائِلِ المُسْتَوْدَع + رَسَائِلِ LinkedIn',
              adr: '—',
              interviewSat: 'ثَلَاثُ مُحَاكَيَاتِ جَوْلَةٍ كَامِلَة · سُلُوكِيّ + تَصْمِيمُ نِظَام + بَرْمَجَة + ثَقَافَة · مُسَجَّلَة · تَشْرِيحٌ لِكُلٍّ.',
              interviewSun: 'شَاهِدِ الثَّلَاثَة · لَاحِظِ الأَنْمَاط · اِخْتَرْ أَضْعَفَ ثَلَاثِ لَحَظَات · ثَبِّتْهَا تَمَامًا.'
            }
          },
          {
            headline: 'مُقَابَلَاتٌ حَيَّة.',
            goals: [
              'أَجْرِ ٥+ مُقَابَلَاتٍ حَيَّة خِلَالَ الأُسْبُوع',
              'تَشْرِيحٌ فَوْرِيٌّ بَعْدَ كُلِّ مُقَابَلَة',
              'نَمْ ٧ سَاعَاتٍ كُلَّ لَيْلَة · بِلَا اسْتِثْنَاء',
              'لَا تَقْدِيمَاتٍ جَدِيدَةٍ هَذَا الأُسْبُوع · أَدِرِ القِمْعَ الذِي بَنَيْتَ',
              'العَائِلَةُ حَاضِرَة · زَوْجَتُكَ تَعْرِفُ الجَدْوَل · صَلُّوا مَعًا',
              'حِفْظ: القَدْر + البَيِّنَة · حِمْلٌ خَفِيف · لَا تَكْسِرِ التَّتَابُع'
            ],
            plan: {
              read: 'خَفِيف · أَعِدْ قِرَاءَةَ قَرَارَاتِكَ وَREADME',
              cert: '—',
              certPractice: '—',
              dsa: 'مَسْأَلَةُ إِحْمَاءٍ كُلَّ صَبَاح · لَا أَنْمَاطٍ جَدِيدَة',
              blog: '—',
              build: 'لَا تَغْيِيرَاتٍ بَرْمَجِيَّة · مَنْتُوجٌ مُسْتَقِرّ',
              adr: '—',
              interviewSat: 'أَجْرِ مُقَابَلَاتِ السَّبْتِ إِنْ جُدِّلَتْ · تَشْرِيحٌ فَوْرِيّ · دَوِّنِ المُتَابَعَات.',
              interviewSun: 'مُرَاجَعَةُ الأَحَد · مَا نَجَحَ، مَا لَمْ يَنْجَح · جَهِّزْ تَقْوِيمَ الأُسْبُوعِ القَادِم · أَرْسِلِ الشُّكْرَ.'
            }
          },
          {
            headline: 'فَاوِضْ. قَرِّرْ. تَنَفَّسْ.',
            goals: [
              'قَارِنِ العُرُوضَ عَلَى وَرَقَةٍ وَاحِدَة · أَجْر + نُمُوّ + ثَقَافَة + مُلَاءَمَةٌ عَائِلِيَّة',
              'فَاوِضْ مَعَ أَعْلَى ٢ · اِرْفُضِ البَاقِيَ بِلُطْف',
              'اِقْبَلْ وَاحِدًا · اِجْدُلْ أُسْبُوعَ رَاحَةٍ حَقِيقِيًّا قَبْلَ البَدْء',
              'اُكْتُبْ مَقَالَ "مَا اخْتَرْتُ وَلِمَ" · اِنْشُرْ فِي يَنَايِر',
              'ضَعْ أَهْدَافَ الرُّبْعِ الثَّالِث · عُمْقٌ فِي نَمَطٍ مِعْمَارِيٍّ، عَرْضٌ مُقَدَّم',
              'حِفْظ: الزَّلْزَلَة + النَّاس · جُزْءُ ٣٠ تَرَاكُمِيًّا كَامِل · بِسْمِ اللَّه عَلَى مَا يَلِي'
            ],
            plan: {
              read: 'أَعِدْ قِرَاءَةَ فَصْلِكَ المُفَضَّلِ مِنَ الأَشْهُرِ السِّتَّةِ المَاضِيَة · جَوْلَةُ امْتِنَان',
              cert: '—',
              certPractice: '—',
              dsa: 'رَاحَة · أُسْبُوعُ الخِتَام',
              blog: 'سِتَّةُ أَشْهُرٍ عَلَنًا · مَا بَنَيْتُ، مَا اخْتَرْتُ، مَا تَعَلَّمْتُ · اِنْشُرْ فِي يَنَايِر',
              build: 'وَسْمٌ نِهَائِيّ · v1.0 عَلَى المُسْتَوْدَع · مُلَاحَظَةُ خَتْمِ README',
              adr: '—',
              interviewSat: 'قَارِنِ العُرُوضَ عَلَى وَرَقَةٍ وَاحِدَة · أَجْر + نُمُوّ + ثَقَافَة + مُلَاءَمَةٌ عَائِلِيَّة · قَرَارٌ صَادِق.',
              interviewSun: 'فَاوِضْ مَعَ أَعْلَى ٢ · اِقْبَلْ وَاحِدًا · اِرْفُضِ البَاقِيَ بِلُطْف · جَهِّزْ لِلرُّبْعِ الثَّالِث.'
            }
          }
        ]
      }
    ],
    deliverables: [
      { name: 'مُسْتَوْدَعٌ عَامٌّ وَاحِد', desc: 'SaaS مُتَعَدِّدُ المُسْتَأْجِرِين مَعَ تَدَفُّقِ أَحْدَاث، IaC، CI/CD، مُلَاحَظَة.' },
      { name: 'اِثْنَا عَشَرَ+ مَنْشُورًا', desc: 'عَلَى Prophetic Stack — مِعْمَارِيَّة، دِيفُوبْس، ذَكَاءٌ فِي الإِنْتَاج.' },
      { name: 'شَهَادَةُ AWS SAA', desc: 'مُجْتَازَةٌ بِنِهَايَةِ الشَّهْرِ الثَّانِي. مَعْرِفَةٌ سَحَابِيَّةٌ مُثْبَتَة.' },
      { name: 'خَمْسَةُ+ قَرَارَاتٍ مِعْمَارِيَّة', desc: 'قَرَارَاتُ مِعْمَارِيَّةٍ، مَكْتُوبَةٌ عَلَنًا، مُدَافَعٌ عَنْهَا فِي المُقَابَلَات.' },
      { name: 'رَسْمُ C4', desc: 'مِعْمَارِيَّةُ نِظَامٍ تُجِيدُهَا عَلَى لَوْحٍ وَأَنْتَ نَائِم.' },
      { name: 'عَرْضٌ وَدِرَاسَةُ حَالَة', desc: 'Loom مُدَّتُه ثَلَاثُ دَقَائِق + دِرَاسَةُ حَالَةٍ مَكْتُوبَةٌ يَتَصَفَّحُهَا المُوَظِّفُون.' },
      { name: 'سِيرَةٌ ذَاتِيَّةٌ بِالنَّتَائِج', desc: 'أَرْقَامُ زَمَنٍ، تَكْلِفَة، مَوْثُوقِيَّة — لَا مَهَامّ.' },
      { name: 'قِمْعُ مُقَابَلَات', desc: 'ثَلَاثُونَ هَدَفًا، عِشْرُونَ تَقْدِيمًا، مُحَادَثَاتٌ حَقِيقِيَّةٌ جَارِيَة.' },
      { name: 'جُزْءُ ٣٠ فِي صَدْرِك', desc: '≈٧٢٠ آيَةً مَحْفُوظَةً بِمُعَدَّلِ ٥/يَوْم مِنَ الاثْنَيْنِ إِلَى السَّبْت، مَعَ مُرَاجَعَةٍ أُسْبُوعِيَّةٍ تَرَاكُمِيَّة.' },
      { name: 'عَرَبِيَّةٌ وَظِيفِيَّة', desc: 'مَدِينَة كِتَاب ١ وَنِصْفُ ٢ مُدَرَّسٌ بِالكَامِل. طَلَاقَةُ كَلِمَةٍ كَلِمَةٍ فِيمَا حَفِظْتَ.' },
      { name: 'عَرْضٌ مَقْبُول', desc: 'دِيسَمْبِر: ١٠+ مُقَابَلَات، ٣+ مُحَادَثَاتٌ فَعَّالَة، دَوْرٌ وَاحِدٌ مَقْبُول · فَاوَضْتَ، لَا اِسْتَجْدَيْت.' }
    ],
    creed: 'الانْضِبَاطُ ابْنُ الهُوِيَّة. لَسْتَ بَعْدَ اليَوْمِ "مُطَوِّرَ Laravel يُرِيدُ النُّمُوّ." أَنْتَ مِعْمَارِيُّ خَلْفِيَّةٍ تَحْتَ التَّدْرِيب، يَبْنِي عَلَنًا بِمَوْعِدٍ وَضَعْتَه — وَ<em>عَبْدٌ</em> لِلَّه، يَرْعَى وَقْتَ الذَّكَاءِ المُحَرَّرَ <em>أَمَانَةً</em>: المُصْحَفُ قَبْلَ الفَأْرَة، كُلَّ صَبَاح.'
  }
};
