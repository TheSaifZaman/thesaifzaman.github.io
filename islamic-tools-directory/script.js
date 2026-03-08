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

// ========== Category Filter ==========
const filterPills = document.querySelectorAll('.filter-pill');
const toolCards = document.querySelectorAll('.tool-card');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');

let activeCategory = 'all';

function filterAndSearch() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    toolCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();

        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = !query || title.includes(query) || description.includes(query);

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0) {
        noResults.classList.add('visible');
    } else {
        noResults.classList.remove('visible');
    }
}

filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.getAttribute('data-category');
        filterAndSearch();
    });
});

// ========== Search ==========
searchInput.addEventListener('input', filterAndSearch);
