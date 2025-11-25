// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-links a');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.main-nav');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Theme Toggle Functionality
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Initialize Theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

// Mobile Menu Functionality
function toggleMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Spy & Active Link
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Header Shadow on Scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow)';
        header.style.height = '80px';
    } else {
        header.style.boxShadow = 'none';
        header.style.height = 'var(--nav-height)';
    }
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Typing Effect for Hero Title
const heroTitle = document.querySelector('.profile-info .title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 500);
}

// Blog Fetching
const blogContainer = document.getElementById('blog-container');

async function fetchBlogs() {
    if (!blogContainer) return;

    const mediumUsername = 'info.saifzaman';
    const hashnodeUsername = 'lazyops';
    const substackUsername = 'thesaifzaman';

    const mediumUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUsername}`;
    const hashnodeUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://${hashnodeUsername}.hashnode.dev/rss.xml`;
    // Substack often blocks rss2json, but we'll try. Alternatively, we can just link to it.
    const substackUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://${substackUsername}.substack.com/feed`;

    let posts = [];

    try {
        const [mediumRes, hashnodeRes, substackRes] = await Promise.allSettled([
            fetch(mediumUrl).then(res => res.json()),
            fetch(hashnodeUrl).then(res => res.json()),
            fetch(substackUrl).then(res => res.json())
        ]);

        if (mediumRes.status === 'fulfilled' && mediumRes.value.items) {
            posts.push(...mediumRes.value.items.map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate),
                platform: 'Medium',
                icon: 'fab fa-medium'
            })));
        }

        if (hashnodeRes.status === 'fulfilled' && hashnodeRes.value.items) {
            posts.push(...hashnodeRes.value.items.map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate),
                platform: 'Hashnode',
                icon: 'fab fa-hashnode'
            })));
        }

        if (substackRes.status === 'fulfilled' && substackRes.value.items) {
            posts.push(...substackRes.value.items.map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate),
                platform: 'Substack',
                icon: 'fas fa-newspaper'
            })));
        }

        // Sort by date descending
        posts.sort((a, b) => b.date - a.date);

        // Take top 6
        const topPosts = posts.slice(0, 6);

        renderBlogs(topPosts);

    } catch (error) {
        console.error('Error fetching blogs:', error);
        blogContainer.innerHTML = '<div class="blog-card glass"><h3>Unable to load articles at this time.</h3></div>';
    }
}

function renderBlogs(posts) {
    if (posts.length === 0) {
        blogContainer.innerHTML = '<div class="blog-card glass"><h3>No articles found.</h3></div>';
        return;
    }

    blogContainer.innerHTML = posts.map(post => `
        <div class="blog-card glass">
            <div class="blog-meta">
                <span class="blog-platform"><i class="${post.icon}"></i> ${post.platform}</span>
                <span class="blog-date">${post.date.toLocaleDateString()}</span>
            </div>
            <h3>${post.title}</h3>
            <a href="${post.link}" target="_blank" class="blog-link">Read Article <i class="fas fa-arrow-right"></i></a>
        </div>
    `).join('');
}

// Initialize Blog Fetching
document.addEventListener('DOMContentLoaded', fetchBlogs);