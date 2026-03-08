// ═══════════════════════════════════════
// JSON-Driven Portfolio — Inline Data
// ═══════════════════════════════════════

const DATA = {
  profile: {
    name: "Md. Saif Zaman",
    title: "Business-Driven Cloud-Native Software Engineer | AI & Agentic Systems Builder | Driving Scalable Systems, DevOps Excellence & Cloud Cost Efficiency",
    location: "Dhaka, Bangladesh",
    email: "info.saifzaman@gmail.com",
    phone: "+880 1773-691885",
    avatar: "new_avatar.jpg",
    about: [
      "I am a Business-Driven Cloud-Native Software Engineer and Platform Architect with over 5 years of experience building scalable, resilient digital ecosystems. My expertise lies in prioritizing core business objectives and leveraging a \"stackless\" approach to deliver strategically impactful solutions using Go, PHP, Java, and Python.",
      "Specializing in DevOps Excellence, Cloud Cost Efficiency, and AI-powered systems, I drive the transformation of how teams build, test, and deploy applications. I am deeply committed to bridging technology with strategy, mentoring teams, and fostering a culture of continuous learning to ensure engineering efforts directly translate into business success.",
      "By embracing Agentic Development, RAG pipelines, and LLM-driven workflows, I have transformed my engineering output \u2014 automating complex tasks, accelerating code generation, and building intelligent systems that multiply productivity. This AI-first approach makes me a 10x engineer in practice: shipping faster, solving harder problems, and staying ahead in a landscape where the ability to orchestrate AI agents and design effective prompts is the defining competitive edge."
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
      title: "AI, LLM & Agentic Development",
      icon: "fas fa-robot",
      items: [
        { label: "LLM & Generative AI", value: "GPT, Claude, Llama, Mistral, Fine-Tuning, RLHF" },
        { label: "RAG Systems", value: "Retrieval-Augmented Generation, Vector DBs (Pinecone, Weaviate, ChromaDB)" },
        { label: "Agentic Development", value: "LangChain, LangGraph, CrewAI, AutoGen, Tool-Use Agents" },
        { label: "Prompt/Context Engineering", value: "System Prompts, Few-Shot, Chain-of-Thought, Context Window Optimization" },
        { label: "Graph Databases", value: "Neo4j, Knowledge Graphs, Graph-Based RAG" }
      ]
    },
    {
      title: "Distributed Systems & Backend Architecture",
      icon: "fas fa-server",
      items: [
        { label: "Languages", value: "Go, PHP (Laravel/Symfony), Java (Spring Boot), Python (FastAPI)" },
        { label: "Architecture", value: "Microservices, Event-Driven, Modular Monolith, Serverless" },
        { label: "Principles", value: "SOLID, DRY, DDD, Clean Architecture, 12-Factor App" },
        { label: "API Design", value: "REST, gRPC, GraphQL, OpenAPI/Swagger" }
      ]
    },
    {
      title: "Cloud-Native & DevOps Excellence",
      icon: "fas fa-cloud",
      items: [
        { label: "Containerization", value: "Docker, Kubernetes (K8s), Helm" },
        { label: "Cloud Providers", value: "AWS (EC2, S3, Lambda, RDS), Google Cloud" },
        { label: "IaC", value: "Terraform, Pulumi" },
        { label: "CI/CD", value: "GitHub Actions, Jenkins, GitLab CI" },
        { label: "Observability", value: "Prometheus, Grafana, Loki, Sentry" }
      ]
    },
    {
      title: "Data Engineering & Storage",
      icon: "fas fa-database",
      items: [
        { label: "Relational", value: "MySQL, PostgreSQL (Complex Queries, Optimization)" },
        { label: "NoSQL", value: "MongoDB, Redis (Caching & Pub/Sub)" },
        { label: "Search", value: "Meilisearch, Elasticsearch" },
        { label: "Message Brokers", value: "Kafka, RabbitMQ" }
      ]
    },
    {
      title: "Leadership & Strategy",
      icon: "fas fa-chess-king",
      items: [
        { label: "Team Leadership", value: "Mentorship, Code Reviews, Technical Hiring" },
        { label: "Project Management", value: "Agile/Scrum, Jira, Strategic Roadmapping" },
        { label: "Business Alignment", value: "Requirements Analysis, Cost Optimization, Stakeholder Management" }
      ]
    }
  ],
  experience: [
    {
      company: "Blubird Interactive Ltd.",
      position: "Associate Software Engineer (Backend)",
      period: "Aug 2022 - Present",
      tags: ["PHP (Laravel)", "SaaS", "ERP/CRM", "API Integration"],
      achievements: [
        "Spearheaded the end-to-end development of a top-tier SaaS Real Estate platform, taking it from concept to a market-ready V2 release.",
        "Architected core ERP/CRM features, enabling management of 1,000+ client transactions.",
        "Engineered API integrations with QuickBooks, Twilio, and Zillow, reducing manual data entry by 10+ hours per week."
      ]
    },
    {
      company: "OrangeHRM",
      position: "Consultant Software Engineer",
      period: "May 2022 - July 2022",
      tags: ["Open Source", "Module Development"],
      achievements: [
        "Engineered two high-impact modules for a core open-source system that became central to the product's marketing and user acquisition strategy.",
        "Delivered new functionality that powered 3 major branding campaigns, contributing to a 15% increase in qualified leads.",
        "Drove a 20% uplift in user engagement for the new modules."
      ]
    },
    {
      company: "Skylark Soft Ltd.",
      position: "Software Engineer",
      period: "Nov 2021 - Apr 2022",
      tags: ["Accounting Modules", "ERP", "API"],
      achievements: [
        "Drove a 40% reduction in financial report generation time and eliminated manual reconciliation errors by engineering a suite of APIs for the core accounting modules of an apparel ERP.",
        "Improved data accuracy to 99.9%, virtually eliminating manual reconciliation tasks.",
        "Improved the efficiency of month-end closing procedures through seamless data synchronization."
      ]
    },
    {
      company: "Fleet Bangladesh",
      position: "Junior Software Engineer",
      period: "Dec 2020 - Sep 2021",
      tags: ["RESTful API", "Microservices"],
      achievements: [
        "Architected and deployed a RESTful API suite, establishing a robust communication layer for a new microservices-based architecture.",
        "Improved system scalability to handle a 3x increase in concurrent users without performance degradation.",
        "Accelerated the development lifecycle for 5+ new product features by creating a standardized communication layer."
      ]
    }
  ],
  certifications: [
    { title: "DevOps Foundation", issuer: "DevOps Institute", year: "2024", description: "DevOps principles, practices, and tools" },
    { title: "Google Data Analytics Specialization", issuer: "Google", year: "2023", description: "Advanced data analysis techniques, data visualization, and business intelligence" },
    { title: "Python for Everybody Specialization", issuer: "University of Michigan", year: "2022", description: "Python programming fundamentals, web data, databases, and web applications" }
  ],
  education: [
    { institution: "Rajshahi University of Engineering & Technology", degree: "B.Sc. (Engr.) in Computer Science & Engineering", year: "Graduated 2021" }
  ],
  leadership: [
    { title: "National Physics Olympiads", description: "Consistently ranked within the top 20 at the regional level (3rd, 4th, and 5th Olympiads)" },
    { title: "Mentorship", description: "Mentor and guide aspiring students in Olympiad preparation and early-stage career development" }
  ],
  projects: [
    { title: "Real Estate Management System", description: "Full-stack application for property management with ERP integration", tech: "PHP, Laravel, MySQL, Docker", link: "https://mybrokercloud.com", linkText: "View Project" }
  ],
  blogs: { mediumUsername: "info.saifzaman", hashnodeUsername: "lazyops", substackUsername: "thesaifzaman" },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Projects", href: "#projects" },
    { label: "Pages", href: "pages/index.html" }
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
    document.getElementById('heroTitle').textContent = p.title;
    document.getElementById('heroAvatar').src = p.avatar;
    document.getElementById('heroAvatar').alt = p.name;

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
    document.getElementById('experienceTimeline').innerHTML = DATA.experience.map(exp => `
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
                ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>
    `).join('');
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

    const quickLinks = ['#about', '#experience', '#skills', '#certifications', '#projects', '#contact'];
    document.getElementById('footerLinks').innerHTML = quickLinks.map(href => {
        const label = href.replace('#', '');
        return `<li><a href="${href}">${label.charAt(0).toUpperCase() + label.slice(1)}</a></li>`;
    }).join('');

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
}

// ── Start ──
document.addEventListener('DOMContentLoaded', init);
