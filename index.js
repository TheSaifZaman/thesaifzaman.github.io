// ═══════════════════════════════════════
// JSON-Driven Portfolio — Inline Data
// ═══════════════════════════════════════

const DATA = {
  profile: {
    name: "Md. Saif Zaman",
    title: "Software Architect & AI-Native Engineer | ~6 YOE | Building Systems That Pay for Themselves | Research-Driven, Data-Based, Team-First",
    location: "Dhaka, Bangladesh",
    email: "info.saifzaman@gmail.com",
    phone: "+880 1773-691885",
    avatar: "new_avatar.jpg",
    about: [
      "I am a Software Architect and AI-Native Engineer with 6 years of experience designing systems where every decision is backed by data, justified by cost-benefit analysis, and validated through research. I don't pick a stack \u2014 I pick the right tool for the business problem. Go, PHP, Java, Python, or whatever the domain demands. That's what stackless means: zero loyalty to tools, total loyalty to outcomes.",
      "Every system I build starts with three questions: What does the business need? What does the data say? What's the cost of getting it wrong? I've driven 40% reductions in report generation time, architected platforms handling 1,000+ client transactions, and built integrations that eliminate 10+ hours of manual work weekly \u2014 not by chasing elegance, but by measuring pain, quantifying ROI, and shipping solutions that pay for themselves.",
      "I am AI-native, not AI-adjacent. I build with LLMs, train models from scratch, orchestrate multi-agent systems, and design RAG pipelines that turn unstructured knowledge into competitive advantage. I use Claude Code, autonomous coding agents, and agentic workflows as daily force multipliers \u2014 not novelty. This isn't about keeping up with AI; it's about being the engineer who makes AI keep up with the business.",
      "What sets me apart is how I operate in a team. I mentor engineers, run structured 1:1s, lead sprint planning with clarity, and make architectural decisions transparently so the whole team understands the why. The best architecture is the one your team can maintain, extend, and reason about at 2 AM during an incident. Research-driven, data-based, team-first \u2014 that's not a tagline, it's how I ship every single day."
    ],
    social: [
      { name: "LinkedIn", url: "https://linkedin.com/in/thesaifzaman/", icon: "fab fa-linkedin" },
      { name: "GitHub", url: "https://github.com/thesaifzaman", icon: "fab fa-github" },
      { name: "Medium", url: "https://medium.com/@info.saifzaman", icon: "fab fa-medium" },
      { name: "Hashnode", url: "https://hashnode.com/@lazyops", icon: "fab fa-hashnode" },
      { name: "Substack", url: "https://thesaifzaman.substack.com/", icon: "fas fa-newspaper" },
      { name: "LeetCode", url: "https://leetcode.com/u/Nocturnal123/", icon: "fas fa-code" }
    ]
  },
  skills: [
    {
      title: "Distributed Systems & Backend Architecture",
      icon: "fas fa-server",
      items: [
        { label: "Languages", value: "Go, PHP (Laravel/Symfony), Java (Spring Boot), Python (FastAPI), Node.js, TypeScript" },
        { label: "Architecture", value: "Microservices, Event-Driven, Modular Monolith, Serverless, CQRS, Saga Pattern" },
        { label: "Principles", value: "SOLID, DRY, DDD, Clean Architecture, Hexagonal, 12-Factor App" },
        { label: "API Design", value: "REST, gRPC, GraphQL, OpenAPI/Swagger, WebSockets" },
        { label: "Enterprise Patterns", value: "Circuit Breakers, Rate Limiting, Graceful Degradation, Multi-Tenancy, Audit Logging" }
      ]
    },
    {
      title: "Cloud-Native & DevOps Excellence",
      icon: "fas fa-cloud",
      items: [
        { label: "Containerization", value: "Docker, Kubernetes (K8s), Helm, Service Mesh (Istio)" },
        { label: "Cloud Providers", value: "AWS (EC2, S3, Lambda, RDS, EKS, SQS), Google Cloud, DigitalOcean" },
        { label: "IaC & Config", value: "Terraform, Pulumi, Ansible, ArgoCD" },
        { label: "CI/CD", value: "GitHub Actions, Jenkins, GitLab CI, Feature Flags, Blue-Green Deployments" },
        { label: "Observability", value: "Prometheus, Grafana, Loki, Sentry, OpenTelemetry, Distributed Tracing" }
      ]
    },
    {
      title: "Data Engineering & Storage",
      icon: "fas fa-database",
      items: [
        { label: "Relational", value: "MySQL, PostgreSQL (Complex Queries, Optimization, Partitioning)" },
        { label: "NoSQL", value: "MongoDB, Redis (Caching, Pub/Sub, Streams), DynamoDB" },
        { label: "Search & Analytics", value: "Meilisearch, Elasticsearch, ClickHouse" },
        { label: "Message Brokers", value: "Kafka, RabbitMQ, AWS SQS/SNS, NATS" },
        { label: "Data Pipelines", value: "ETL/ELT, CDC (Debezium), Data Lake Patterns, Batch & Stream Processing" }
      ]
    },
    {
      title: "AI, LLM & Agentic Development",
      icon: "fas fa-robot",
      items: [
        { label: "LLM & Generative AI", value: "GPT-*, Claude Opus/Sonnet, Llama 3, Mistral, Gemini, Fine-Tuning, RLHF, DPO" },
        { label: "Agentic Frameworks", value: "LangChain, LangGraph, CrewAI, AutoGen, Claude Agent SDK, MCP Servers, Tool-Use Agents" },
        { label: "Agentic Workflows", value: "Multi-Agent Orchestration, Human-in-the-Loop, Autonomous Coding Agents, Agent Evaluation" },
        { label: "RAG & Knowledge Systems", value: "Retrieval-Augmented Generation, Vector DBs (Pinecone, Weaviate, ChromaDB), Graph-Based RAG" },
        { label: "Prompt/Context Engineering", value: "System Prompts, Few-Shot, Chain-of-Thought, Context Window Optimization, Structured Outputs" }
      ]
    },
    {
      title: "LLM Building & ML Engineering",
      icon: "fas fa-brain",
      items: [
        { label: "Model Training", value: "PyTorch, Transformers, Attention Mechanisms, Pre-Training, Supervised Fine-Tuning" },
        { label: "LLM Architecture", value: "GPT Architecture, Tokenization (BPE), Positional Encoding, Multi-Head Attention" },
        { label: "Alignment & Evaluation", value: "RLHF, DPO, Instruction Tuning, Benchmark Evaluation, Perplexity Analysis" },
        { label: "Inference & Deployment", value: "vLLM, ONNX, Quantization (GPTQ, AWQ), LoRA/QLoRA, Model Serving" },
        { label: "Graph & Knowledge", value: "Neo4j, Knowledge Graphs, Graph Neural Networks, Entity Extraction" }
      ]
    },
    {
      title: "Frontend & UI Engineering",
      icon: "fas fa-palette",
      items: [
        { label: "Languages", value: "Vanilla JavaScript (ES6+), TypeScript, HTML5, CSS3" },
        { label: "Frameworks", value: "Vue.js (3/3.5), Nuxt.js, React (Familiarity), Tailwind CSS, Bootstrap" },
        { label: "Design Principles", value: "Color Theory, Typography, Visual Hierarchy, Responsive Design, Accessibility (a11y)" },
        { label: "Tooling", value: "Vite, Webpack, PostCSS, CSS Variables, Component Libraries" },
        { label: "Patterns", value: "Component Architecture, State Management (Pinia/Vuex), SSR/SSG, Progressive Enhancement" }
      ]
    },
    {
      title: "Testing, Security & Quality",
      icon: "fas fa-shield-alt",
      items: [
        { label: "Testing", value: "Unit (PHPUnit, Jest, PyTest), Integration, E2E (Cypress), TDD, Load Testing (k6)" },
        { label: "Security", value: "OWASP Top 10, JWT/OAuth2, RBAC, Input Validation, SQL Injection Prevention" },
        { label: "Code Quality", value: "Static Analysis, Linting (ESLint, PHPStan), Code Review Standards, SonarQube" },
        { label: "Reliability", value: "Error Budgets, SLIs/SLOs, Chaos Engineering Principles, Post-Mortems" },
        { label: "Compliance", value: "Data Privacy, Audit Trails, Secure SDLC, Dependency Scanning" }
      ]
    },
    {
      title: "Enterprise Software & Architecture",
      icon: "fas fa-building",
      items: [
        { label: "Enterprise Patterns", value: "Multi-Tenancy, Feature Flags, A/B Testing, Canary Releases, Blue-Green" },
        { label: "Integration", value: "ERP/CRM Systems, Payment Gateways, Third-Party APIs, Webhooks, ETL Pipelines" },
        { label: "Documentation", value: "ADRs, RFC Process, API Documentation (OpenAPI), Runbooks, System Design Docs" },
        { label: "Scalability", value: "Horizontal Scaling, Caching Strategies, CDN, Database Sharding, Read Replicas" },
        { label: "Cost Engineering", value: "Cloud Cost Optimization, Right-Sizing, Reserved Instances, FinOps Principles" }
      ]
    },
    {
      title: "Engineering Management & Productivity",
      icon: "fas fa-chess-king",
      items: [
        { label: "Team Leadership", value: "Mentorship, Code Reviews, Technical Hiring, 1:1s, Performance Calibration" },
        { label: "Engineering Process", value: "Agile/Scrum, Sprint Planning, Tech Debt Management, Incident Response" },
        { label: "Project Management", value: "Jira, Linear, Strategic Roadmapping, OKRs, Cross-Team Coordination" },
        { label: "Developer Productivity", value: "AI-Assisted Development, Claude Code, Copilot, DevEx Tooling, Internal Platforms" },
        { label: "Business Alignment", value: "Requirements Analysis, Cloud Cost Optimization, Stakeholder Management" }
      ]
    }
  ],
  experience: [
    {
      company: "Blubird Interactive Ltd.",
      position: "Associate Software Engineer (& Project Lead)",
      period: "Aug 2022 - Present",
      tags: ["System Architecture", "SaaS", "AI/LLM", "Cost Optimization", "Team Leadership"],
      achievements: [
        "Architected a multi-tenant SaaS Real Estate platform from zero to market-ready V2, making every technology choice through cost-benefit analysis \u2014 choosing Laravel + event-driven architecture over microservices after quantifying that it would cut infrastructure cost by 35% at the current scale.",
        "Designed and built the ERP/CRM core handling 1,000+ client transactions with 99.95% uptime, using data-driven capacity planning and load testing to right-size infrastructure before scaling.",
        "Engineered API integrations (QuickBooks, Twilio, Zillow) that eliminated 10+ hours/week of manual data entry \u2014 ROI analysis showed the integration paid for its development cost within 6 weeks.",
        "Introduced AI-assisted development workflows (Claude Code, agentic coding) to the team, increasing feature velocity by 2x while maintaining code quality through structured reviews and pair programming.",
        "Mentored 3 junior engineers through structured 1:1s, code reviews, and architectural decision records (ADRs), building a team culture where every design choice is documented and data-backed."
      ]
    },
    {
      company: "OrangeHRM",
      position: "Consultant Software Engineer",
      period: "May 2022 - July 2022",
      tags: ["Open Source", "Research-Driven Development", "Product Strategy"],
      achievements: [
        "Researched user engagement patterns and competitive landscape before engineering two high-impact modules that became central to the product's go-to-market strategy.",
        "Modules powered 3 major branding campaigns, contributing to a 15% increase in qualified leads \u2014 validated through A/B testing and funnel analytics.",
        "Drove a 20% uplift in user engagement by applying behavioral data insights to feature design, not guesswork."
      ]
    },
    {
      company: "Skylark Soft Ltd.",
      position: "Software Engineer \u2014 Platform & Data",
      period: "Nov 2021 - Apr 2022",
      tags: ["Financial Systems", "ERP Architecture", "Data Accuracy", "Process Automation"],
      achievements: [
        "Drove a 40% reduction in financial report generation time by re-architecting the accounting API layer of an apparel ERP \u2014 identified the bottleneck through query profiling and systematic load analysis.",
        "Improved data accuracy to 99.9% by designing validation pipelines and reconciliation checks, eliminating a class of manual errors that had cost the business hours per month-end cycle.",
        "Built seamless data synchronization between modules, cutting month-end closing time and giving finance teams real-time visibility into operational data."
      ]
    },
    {
      company: "Fleet Bangladesh",
      position: "Software Engineer",
      period: "Dec 2020 - Sep 2021",
      tags: ["Microservices", "API Architecture", "Scalability", "Foundation Building"],
      achievements: [
        "Designed and deployed a RESTful API suite that became the communication backbone for the company's microservices migration \u2014 architecture decisions documented via ADRs and validated through load testing.",
        "Engineered the system to handle a 3x increase in concurrent users without performance degradation, using capacity modeling and stress testing to prove scalability before launch.",
        "Created a standardized API communication layer that accelerated development of 5+ product features, reducing cross-team integration time from days to hours."
      ]
    }
  ],
  whyHire: [
    { icon: "fas fa-chart-line", title: "Business-First Thinking", desc: "Every feature, refactor, and architecture choice starts with a business case. I quantify ROI before touching the keyboard and ship solutions that pay for themselves." },
    { icon: "fas fa-balance-scale", title: "Cost-Benefit Analyst", desc: "Saved 35% on infrastructure by choosing the right architecture at the right scale. I treat engineering budgets like my own money \u2014 every dollar is justified." },
    { icon: "fas fa-flask", title: "Research-Driven Engineer", desc: "I read papers, benchmark alternatives, and prototype before committing. No hype-driven development here \u2014 only evidence-based, validated decisions." },
    { icon: "fas fa-database", title: "Data-Based Decisions", desc: "Query profiling, load testing, A/B validation \u2014 I measure first, build second. Every claim on this page has a real number behind it." },
    { icon: "fas fa-microchip", title: "AI-Native Builder", desc: "I build with LLMs, train models from scratch, orchestrate multi-agent systems, and ship AI-powered features in production \u2014 not just demos." },
    { icon: "fas fa-users", title: "Team Force Multiplier", desc: "I mentor engineers, document ADRs, run clear sprint planning, and make the whole team faster \u2014 not just myself. Code your team can own." }
  ],
  certifications: [
    { title: "DevOps Foundation", issuer: "DevOps Institute", year: "2024", description: "CI/CD pipelines, infrastructure automation, and production reliability engineering" },
    { title: "Google Data Analytics Specialization", issuer: "Google", year: "2023", description: "Data-driven decision making, statistical analysis, visualization, and business intelligence" },
    { title: "Python for Everybody Specialization", issuer: "University of Michigan", year: "2022", description: "Python programming, web scraping, database design, and data processing pipelines" }
  ],
  education: [
    { institution: "Rajshahi University of Engineering & Technology", degree: "B.Sc. (Engr.) in Computer Science & Engineering", year: "Graduated 2021" }
  ],
  leadership: [
    { title: "National Physics Olympiads", description: "Top 20 regional finalist across 3rd, 4th, and 5th National Physics Olympiads \u2014 trained in first-principles thinking, rapid problem decomposition, and analytical reasoning under pressure" },
    { title: "Engineering Mentorship", description: "Mentor junior engineers and CS students through structured guidance on system design, career strategy, and Olympiad preparation \u2014 3+ mentees transitioned into professional engineering roles" },
    { title: "Open Source & Knowledge Sharing", description: "Active technical writer on Medium, Hashnode, and Substack \u2014 publishing research-backed articles on distributed systems, AI engineering, and cloud-native architecture" }
  ],
  projects: [
    { title: "Multi-Tenant Real Estate SaaS Platform", description: "Architected end-to-end SaaS platform with ERP/CRM core, multi-vendor API integrations (QuickBooks, Twilio, Zillow), and event-driven architecture \u2014 serving 1,000+ active transactions", tech: "PHP, Laravel, MySQL, Redis, Docker, REST APIs", link: "https://mybrokercloud.com", linkText: "View Platform" },
    { title: "AI-Powered Visual Book Companion", description: "Built an interactive HTML-based learning platform that transforms non-fiction books into visual study companions with step-through visualizations, mind maps, and interactive exercises", tech: "Vanilla JS, HTML5 Canvas, CSS3 Animations, LocalStorage", link: "visual-books/index.html", linkText: "Explore Books" },
    { title: "Barakah Planner \u2014 Islamic Productivity Suite", description: "Designed and shipped a comprehensive productivity system with Quran memorization tracking, prayer time integration (Aladhan API), habit analytics, and PDF report generation \u2014 all data stored locally for privacy", tech: "Vanilla JS, Chart.js, html2pdf.js, LocalStorage, REST API", link: "https://barakah-planner.vercel.app", linkText: "Try Planner" }
  ],
  blogs: { mediumUsername: "info.saifzaman", hashnodeUsername: "lazyops", substackUsername: "thesaifzaman" },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Projects", href: "#projects" }
  ],
  blogLinks: [
    { label: "Medium", url: "https://medium.com/@info.saifzaman" },
    { label: "LazyOps", url: "https://lazyops.hashnode.dev" },
    { label: "Chronicles of CodeCraft", url: "https://thesaifzaman.substack.com" }
  ]
};

// ═══════════════════════════════════════
// Rendering
// ═══════════════════════════════════════

function init() {
    renderAll();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initScrollReveal();
    initNavShadow();
}

function renderAll() {
    renderNav();
    renderHero();
    renderAbout();
    renderWhyHire();
    renderSkills();
    renderExperience();
    renderCertifications();
    renderEducation();
    renderLeadership();
    renderProjects();
    renderContact();
    renderFooter();
    fetchBlogs();
}

// ── Navigation ──
function renderNav() {
    const navLinks = document.getElementById('navLinks');
    const mobileNavLinks = document.getElementById('mobileNavLinks');

    let desktopHTML = '';
    let mobileHTML = '';

    DATA.navigation.forEach(item => {
        desktopHTML += `<a href="${item.href}">${item.label}</a>`;
        mobileHTML += `<li><a href="${item.href}">${item.label}</a></li>`;
    });

    const blogDropdown = `
        <div class="dropdown">
            <button class="dropbtn" aria-haspopup="true" aria-expanded="false">Blogs <i class="fas fa-chevron-down" style="font-size:0.6rem;margin-left:0.2rem"></i></button>
            <div class="dropdown-content">
                ${DATA.blogLinks.map(b => `<a href="${b.url}" target="_blank">${b.label}</a>`).join('')}
            </div>
        </div>`;

    desktopHTML += blogDropdown;
    mobileHTML += `<li>${blogDropdown}</li>`;

    navLinks.innerHTML = desktopHTML;
    mobileNavLinks.innerHTML = mobileHTML;
}

// ── Hero ──
function renderHero() {
    const p = DATA.profile;
    document.getElementById('heroName').textContent = p.name;
    document.getElementById('heroAvatar').src = p.avatar;
    document.getElementById('heroAvatar').alt = p.name;

    // Typing effect for the title
    const titleEl = document.getElementById('heroTitle');
    titleEl.textContent = '';
    titleEl.classList.add('typing-cursor');
    let i = 0;
    function typeTitle() {
        if (i < p.title.length) {
            titleEl.textContent += p.title.charAt(i);
            i++;
            setTimeout(typeTitle, 22);
        } else {
            titleEl.classList.remove('typing-cursor');
        }
    }
    setTimeout(typeTitle, 600);

    document.getElementById('heroMeta').innerHTML = `
        <div class="hero-meta-item"><i class="fas fa-map-marker-alt"></i><span>${p.location}</span></div>
        <div class="hero-meta-item"><i class="fas fa-envelope"></i><span>${p.email}</span></div>`;

    renderSocialLinks('heroSocialLinks', p.social);
    renderSocialLinks('mobileSocialLinks', p.social);
}

function renderSocialLinks(id, links) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = links.map(s =>
        `<a href="${s.url}" target="_blank" aria-label="${s.name}"><i class="${s.icon}"></i></a>`
    ).join('');
}

// ── About ──
function renderAbout() {
    document.getElementById('aboutContent').innerHTML =
        DATA.profile.about.map(p => `<p>${p}</p>`).join('');
}

// ── Why Hire Me ──
function renderWhyHire() {
    const grid = document.getElementById('hireGrid');
    if (!grid || !DATA.whyHire) return;
    grid.innerHTML = DATA.whyHire.map(item => `
        <div class="hire-card">
            <div class="hire-icon"><i class="${item.icon}"></i></div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

// ── Skills ──
function renderSkills() {
    document.getElementById('skillsGrid').innerHTML = DATA.skills.map(cat => `
        <div class="skill-card">
            <div class="skill-card-header">
                <i class="${cat.icon}"></i>
                <h3>${cat.title}</h3>
            </div>
            ${cat.items.map(item => `
                <div class="skill-item">
                    <span class="skill-label">${item.label}</span>
                    <span class="skill-value">${item.value}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// ── Experience ──
function renderExperience() {
    document.getElementById('experienceTimeline').innerHTML = DATA.experience.map((exp, idx) => {
        const hasMore = exp.achievements.length > 2;
        const visible = exp.achievements.slice(0, 2);
        const hidden = exp.achievements.slice(2);
        return `
        <div class="timeline-item">
            <h3 class="timeline-company">${exp.company}</h3>
            <div class="timeline-meta">
                <span class="timeline-position">${exp.position}</span>
                <span class="timeline-period">${exp.period}</span>
            </div>
            <div class="timeline-tags">
                ${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <ul class="timeline-achievements">
                ${visible.map(a => `<li>${a}</li>`).join('')}
                ${hasMore ? `<div class="achievements-hidden" id="exp-hidden-${idx}" style="display:none">
                    ${hidden.map(a => `<li>${a}</li>`).join('')}
                </div>
                <li class="expand-toggle" data-idx="${idx}"><span class="expand-btn">Show ${hidden.length} more <i class="fas fa-chevron-down"></i></span></li>` : ''}
            </ul>
        </div>`;
    }).join('');

    document.querySelectorAll('.expand-toggle').forEach(el => {
        el.addEventListener('click', function() {
            const idx = this.dataset.idx;
            const hidden = document.getElementById('exp-hidden-' + idx);
            const isOpen = hidden.style.display !== 'none';
            hidden.style.display = isOpen ? 'none' : 'contents';
            const count = hidden.querySelectorAll('li').length;
            this.querySelector('.expand-btn').innerHTML = isOpen
                ? 'Show ' + count + ' more <i class="fas fa-chevron-down"></i>'
                : 'Show less <i class="fas fa-chevron-up"></i>';
        });
    });
}

// ── Certifications ──
function renderCertifications() {
    document.getElementById('certificationsGrid').innerHTML = DATA.certifications.map(cert => `
        <div class="card">
            <h3>${cert.title}</h3>
            <span class="card-subtitle">${cert.issuer}</span>
            <span class="card-date">${cert.year}</span>
            <p class="card-desc">${cert.description}</p>
        </div>
    `).join('');
}

// ── Education ──
function renderEducation() {
    document.getElementById('educationContent').innerHTML = DATA.education.map(edu => `
        <div class="education-card">
            <div class="education-icon"><i class="fas fa-graduation-cap"></i></div>
            <div class="education-info">
                <h3>${edu.institution}</h3>
                <p class="degree">${edu.degree}</p>
                <span class="year">${edu.year}</span>
            </div>
        </div>
    `).join('');
}

// ── Leadership ──
function renderLeadership() {
    document.getElementById('leadershipGrid').innerHTML = DATA.leadership.map(item => `
        <div class="card">
            <h3>${item.title}</h3>
            <p class="card-desc">${item.description}</p>
        </div>
    `).join('');
}

// ── Projects ──
function renderProjects() {
    document.getElementById('projectsGrid').innerHTML = DATA.projects.map(proj => `
        <div class="card">
            <h3>${proj.title}</h3>
            <p class="card-desc">${proj.description}</p>
            <span class="card-tech">${proj.tech}</span>
            ${proj.link ? `<a href="${proj.link}" class="card-link" target="_blank"><i class="fas fa-external-link-alt"></i> ${proj.linkText || 'View'}</a>` : ''}
        </div>
    `).join('');
}

// ── Contact ──
function renderContact() {
    const el = document.getElementById('contactEmail');
    el.href = `mailto:${DATA.profile.email}`;
}

// ── Footer ──
function renderFooter() {
    const p = DATA.profile;

    document.getElementById('footerContact').innerHTML = `
        <li><i class="fas fa-envelope"></i> ${p.email}</li>
        <li><i class="fas fa-phone"></i> ${p.phone}</li>
        <li><i class="fas fa-map-marker-alt"></i> ${p.location}</li>`;

    const quickLinks = [
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
        { href: 'pages/index.html', label: 'Pages' }
    ];
    document.getElementById('footerLinks').innerHTML = quickLinks.map(({ href, label }) =>
        `<li><a href="${href}">${label}</a></li>`
    ).join('');

    renderSocialLinks('footerSocialLinks', p.social.slice(0, 3));
}

// ── Blogs ──
async function fetchBlogs() {
    const container = document.getElementById('blogContainer');
    if (!container || !DATA.blogs) return;

    const { mediumUsername, hashnodeUsername, substackUsername } = DATA.blogs;
    const feeds = [
        { url: `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`, platform: 'Medium', icon: 'fab fa-medium' },
        { url: `https://api.rss2json.com/v1/api.json?rss_url=https://${hashnodeUsername}.hashnode.dev/rss.xml`, platform: 'Hashnode', icon: 'fab fa-hashnode' },
        { url: `https://api.rss2json.com/v1/api.json?rss_url=https://${substackUsername}.substack.com/feed`, platform: 'Substack', icon: 'fas fa-newspaper' }
    ];

    let posts = [];
    try {
        const results = await Promise.allSettled(
            feeds.map(f => fetch(f.url).then(r => r.json()).then(data => ({ ...f, items: data.items || [] })))
        );
        results.forEach(r => {
            if (r.status === 'fulfilled') {
                posts.push(...r.value.items.map(item => ({
                    title: item.title,
                    link: item.link,
                    date: new Date(item.pubDate),
                    platform: r.value.platform,
                    icon: r.value.icon
                })));
            }
        });
        posts.sort((a, b) => b.date - a.date);
        const top = posts.slice(0, 6);

        if (top.length === 0) {
            container.innerHTML = '<div class="card"><h3>No articles found.</h3></div>';
            return;
        }
        container.innerHTML = top.map(post => `
            <div class="card">
                <div class="blog-meta">
                    <span><i class="${post.icon}"></i> ${post.platform}</span>
                    <span>${post.date.toLocaleDateString()}</span>
                </div>
                <h3>${post.title}</h3>
                <a href="${post.link}" target="_blank" class="card-link">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
        `).join('');
    } catch (e) {
        container.innerHTML = '<div class="card"><h3>Unable to load articles.</h3></div>';
    }
}

// ═══════════════════════════════════════
// Interactivity
// ═══════════════════════════════════════

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const icon = toggle?.querySelector('i');
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved, icon);

    toggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, icon);
        localStorage.setItem('theme', next);
    });
}

function applyTheme(theme, icon) {
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function initMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const open = document.getElementById('menuToggle');
    const close = document.getElementById('closeMenu');

    function toggle() {
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }
    open?.addEventListener('click', toggle);
    close?.addEventListener('click', toggle);
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('active');
        document.body.style.overflow = '';
    }));
    menu?.querySelectorAll('.dropbtn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.dropdown').classList.toggle('open');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const pos = target.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 160;
        sections.forEach(s => {
            if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.clientHeight) {
                current = s.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });
}

function initNavShadow() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(s => {
        s.classList.add('fade-in');
        observer.observe(s);
    });

    // Stagger children within grids
    document.querySelectorAll('.skills-grid, .cards-grid').forEach(grid => {
        const childObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, i) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            child.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                    childObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        childObs.observe(grid);
    });
}

// ── Animated Counters ──
function initCounters() {
    const bar = document.getElementById('impactBar');
    if (!bar) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bar.querySelectorAll('.impact-number').forEach(el => {
                    const target = parseInt(el.dataset.target);
                    const duration = 1800;
                    const start = performance.now();
                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target);
                        if (progress < 1) requestAnimationFrame(tick);
                        else el.textContent = target;
                    }
                    requestAnimationFrame(tick);
                });
                bar.classList.add('visible');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(bar);
}

// ── Skill Card Active State ──
function initSkillInteraction() {
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('skill-active'));
            this.classList.add('skill-active');
        });
    });
}

// ── Start ──
document.addEventListener('DOMContentLoaded', () => {
    init();
    initCounters();
    initSkillInteraction();
});
