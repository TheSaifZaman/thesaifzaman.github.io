/**
 * Ramadan Spiritual Planner - Navigation Component
 * Dynamic navigation with mobile hamburger menu
 */

const NAV_ITEMS = [
    { href: 'index.html', label: 'Dashboard', icon: '🏠' },
    { href: 'salah-tracker.html', label: 'Salah', icon: '🕌' },
    { href: 'quran-khatam.html', label: 'Khatam', icon: '📖' },
    { href: 'dhikr-tracker.html', label: 'Dhikr', icon: '📿' },
    { href: 'counter.html', label: 'Counter', icon: '🔢' },
    { href: 'dhikr.html', label: 'Adhkar', icon: '✨' },
    { href: 'ramadan-tracker.html', label: 'Ramadan', icon: '🌙' },
    { href: 'https://assunnahfoundation.org/zakat-calculator', label: 'Zakat', icon: '🧮' },
    { href: 'routine.html', label: 'Routine', icon: '⏰' },
    { href: 'goals.html', label: 'Goals', icon: '🎯' }
];

function renderNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navHTML = `
        <nav class="nav">
            <div class="nav-container">
                <a href="index.html" class="nav-brand">
                    <span>🌙</span>
                    Ramadan Planner
                </a>
                <button class="nav-toggle" onclick="toggleMobileMenu()" aria-label="Toggle menu">
                    ☰
                </button>
                <ul class="nav-menu" id="nav-menu">
                    ${NAV_ITEMS.map(item => `
                        <li>
                            <a href="${item.href}" class="nav-link ${currentPage === item.href ? 'active' : ''}">
                                ${item.label}
                            </a>
                        </li>
                    `).join('')}
                    <li>
                        <button class="nav-link" onclick="Theme.toggle()" title="Toggle dark mode">
                            🌓
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

function toggleMobileMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.nav-toggle');

    if (menu && !menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('active');
    }
});

// Render navigation when DOM is ready
document.addEventListener('DOMContentLoaded', renderNavigation);
