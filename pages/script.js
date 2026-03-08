(function () {
    'use strict';

    // ========== Theme Toggle ==========
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ========== State ==========
    let allPages = [];
    let activeCategory = 'All';
    let searchQuery = '';
    let sortMode = 'featured';

    // ========== DOM ==========
    const grid = document.getElementById('pagesGrid');
    const pillsContainer = document.getElementById('categoryPills');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const resultsInfo = document.getElementById('resultsInfo');
    const emptyState = document.getElementById('emptyState');

    // ========== Load Data (from pages-data.js global) ==========
    allPages = (typeof PAGES_DATA !== 'undefined') ? PAGES_DATA : [];
    buildCategoryPills();
    render();

    // ========== Category Pills ==========
    function buildCategoryPills() {
        const categories = ['All', ...new Set(allPages.map(p => p.category))];
        pillsContainer.innerHTML = categories.map(cat =>
            `<button class="cat-pill${cat === activeCategory ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
        ).join('');

        pillsContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('cat-pill')) return;
            activeCategory = e.target.dataset.cat;
            pillsContainer.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            render();
        });
    }

    // ========== Search ==========
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        render();
    });

    // ========== Sort ==========
    sortSelect.addEventListener('change', (e) => {
        sortMode = e.target.value;
        render();
    });

    // ========== Filter + Sort + Render ==========
    function getFilteredPages() {
        let pages = [...allPages];

        // Category filter
        if (activeCategory !== 'All') {
            pages = pages.filter(p => p.category === activeCategory);
        }

        // Search filter
        if (searchQuery) {
            pages = pages.filter(p => {
                const haystack = [p.title, p.description, p.category, ...(p.tags || [])].join(' ').toLowerCase();
                return haystack.includes(searchQuery);
            });
        }

        // Sort
        switch (sortMode) {
            case 'featured':
                pages.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            case 'a-z':
                pages.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                pages.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'category':
                pages.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
                break;
        }

        return pages;
    }

    function render() {
        const pages = getFilteredPages();

        // Results info
        if (searchQuery || activeCategory !== 'All') {
            const parts = [];
            if (activeCategory !== 'All') parts.push(activeCategory);
            if (searchQuery) parts.push(`"${searchQuery}"`);
            resultsInfo.textContent = `${pages.length} page${pages.length !== 1 ? 's' : ''} found${parts.length ? ' for ' + parts.join(' / ') : ''}`;
            resultsInfo.style.display = 'block';
        } else {
            resultsInfo.style.display = 'none';
        }

        // Empty state
        if (pages.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'flex';
            return;
        }
        emptyState.style.display = 'none';

        // Render cards
        grid.innerHTML = pages.map(page => `
            <a href="${page.href}" class="page-card" data-category="${page.category}">
                <div class="card-top">
                    <div class="card-icon ${page.color}">
                        <i class="${page.icon}"></i>
                    </div>
                    <span class="card-category">${page.category}</span>
                </div>
                <h3>${highlightMatch(page.title)}</h3>
                <p>${highlightMatch(page.description)}</p>
                ${page.tags ? `<div class="card-tags">${page.tags.slice(0, 4).map(t => `<span class="card-tag">${t}</span>`).join('')}</div>` : ''}
                <span class="card-arrow">Explore <i class="fas fa-arrow-right"></i></span>
            </a>
        `).join('');
    }

    function highlightMatch(text) {
        if (!searchQuery) return escapeHtml(text);
        const escaped = escapeHtml(text);
        const regex = new RegExp(`(${escapeRegex(searchQuery)})`, 'gi');
        return escaped.replace(regex, '<mark>$1</mark>');
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
})();
