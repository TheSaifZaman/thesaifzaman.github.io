// ========== Theme Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ========== Accordion Sections ==========
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        const isActive = card.classList.contains('active');

        // Close all accordion cards
        document.querySelectorAll('.accordion-card').forEach(c => {
            c.classList.remove('active');
        });

        // Open clicked one if it was not already open
        if (!isActive) {
            card.classList.add('active');

            // Scroll into view with offset for navbar
            setTimeout(() => {
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
                const cardTop = card.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top: cardTop, behavior: 'smooth' });
            }, 100);
        }
    });
});

// ========== FAQ Accordion ==========
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(f => {
            f.classList.remove('active');
        });

        // Open clicked one if it was not already open
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
