/* ==============================================
   Book Library — Main page logic
   ============================================== */

(function () {
    'use strict';

    // ── Theme Toggle ──
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = themeToggle.querySelector('i');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    setTheme(localStorage.getItem('theme') || 'light');
    themeToggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ── State ──
    var state = {
        search: '',
        category: 'all',
        sort: localStorage.getItem('lib-sort') || 'recent',
        view: localStorage.getItem('lib-view') || 'grid'
    };

    // ── Elements ──
    var searchInput = document.getElementById('searchInput');
    var clearSearch = document.getElementById('clearSearch');
    var sortSelect = document.getElementById('sortSelect');
    var categoryChips = document.getElementById('categoryChips');
    var bookGrid = document.getElementById('bookGrid');
    var emptyState = document.getElementById('emptyState');
    var resultsInfo = document.getElementById('resultsInfo');
    var viewBtns = document.querySelectorAll('.view-btn');

    // ── Initialize Categories ──
    function initCategories() {
        // Find which categories are actually used
        var usedCats = {};
        BOOKS_CATALOG.forEach(function (book) {
            book.categories.forEach(function (c) { usedCats[c] = true; });
        });

        BOOK_CATEGORIES.forEach(function (cat) {
            if (!usedCats[cat.id]) return;
            var btn = document.createElement('button');
            btn.className = 'chip';
            btn.dataset.category = cat.id;
            btn.innerHTML = '<i class="' + cat.icon + '"></i> ' + cat.label;
            btn.style.setProperty('--chip-color', cat.color);
            categoryChips.appendChild(btn);
        });
    }

    // ── Render Books ──
    function getFilteredBooks() {
        var books = BOOKS_CATALOG.slice();

        // Filter by search
        if (state.search) {
            var q = state.search.toLowerCase();
            books = books.filter(function (b) {
                return b.title.toLowerCase().indexOf(q) !== -1 ||
                    b.author.toLowerCase().indexOf(q) !== -1 ||
                    b.subtitle.toLowerCase().indexOf(q) !== -1 ||
                    b.description.toLowerCase().indexOf(q) !== -1 ||
                    b.tags.some(function (t) { return t.toLowerCase().indexOf(q) !== -1; }) ||
                    b.categories.some(function (c) { return c.toLowerCase().indexOf(q) !== -1; });
            });
        }

        // Filter by category
        if (state.category !== 'all') {
            books = books.filter(function (b) {
                return b.categories.indexOf(state.category) !== -1;
            });
        }

        // Sort
        switch (state.sort) {
            case 'title-asc':
                books.sort(function (a, b) { return a.title.localeCompare(b.title); });
                break;
            case 'title-desc':
                books.sort(function (a, b) { return b.title.localeCompare(a.title); });
                break;
            case 'author':
                books.sort(function (a, b) { return a.author.localeCompare(b.author); });
                break;
            case 'chapters':
                books.sort(function (a, b) { return b.chaptersCount - a.chaptersCount; });
                break;
            case 'recent':
            default:
                books.sort(function (a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); });
                break;
        }

        return books;
    }

    function getCategoryLabel(catId) {
        for (var i = 0; i < BOOK_CATEGORIES.length; i++) {
            if (BOOK_CATEGORIES[i].id === catId) return BOOK_CATEGORIES[i];
        }
        return { label: catId, color: '#666', icon: 'fas fa-tag' };
    }

    function getReadProgress(bookId) {
        try {
            var data = JSON.parse(localStorage.getItem('book-progress-' + bookId));
            if (!data) return 0;
            var total = data.total || 1;
            var read = data.read || 0;
            return Math.round((read / total) * 100);
        } catch (e) {
            return 0;
        }
    }

    function renderBooks() {
        var books = getFilteredBooks();
        var isGrid = state.view === 'grid';

        bookGrid.className = isGrid ? 'book-grid' : 'book-grid list-view';

        if (books.length === 0) {
            bookGrid.style.display = 'none';
            emptyState.style.display = 'flex';
            resultsInfo.textContent = 'No books found';
            return;
        }

        bookGrid.style.display = '';
        emptyState.style.display = 'none';
        resultsInfo.textContent = books.length + ' book' + (books.length !== 1 ? 's' : '') +
            (state.category !== 'all' ? ' in ' + getCategoryLabel(state.category).label : '');

        var html = '';
        books.forEach(function (book) {
            var progress = getReadProgress(book.id);
            var statusClass = book.status === 'complete' ? 'status-complete' :
                book.status === 'in-progress' ? 'status-progress' : 'status-coming';
            var statusLabel = book.status === 'complete' ? 'Complete' :
                book.status === 'in-progress' ? 'In Progress' : 'Coming Soon';

            var catBadges = '';
            book.categories.forEach(function (catId) {
                var cat = getCategoryLabel(catId);
                catBadges += '<span class="book-cat-badge" style="--badge-color:' + cat.color + '">' +
                    '<i class="' + cat.icon + '"></i> ' + cat.label + '</span>';
            });

            html += '<a href="book.html?id=' + book.id + '" class="book-card">' +
                '<div class="book-card-icon" style="--book-color:' + book.color + '">' +
                '<i class="' + book.icon + '"></i>' +
                '</div>' +
                '<div class="book-card-body">' +
                '<div class="book-card-header">' +
                '<h3>' + book.title + '</h3>' +
                '<span class="book-status ' + statusClass + '">' + statusLabel + '</span>' +
                '</div>' +
                '<p class="book-author-line">by ' + book.author + '</p>' +
                '<p class="book-subtitle-line">' + book.subtitle + '</p>' +
                '<p class="book-desc">' + book.description + '</p>' +
                '<div class="book-categories">' + catBadges + '</div>' +
                '<div class="book-meta">' +
                '<span><i class="fas fa-list"></i> ' + book.chaptersCount + ' chapters</span>' +
                '<span><i class="fas fa-language"></i> ' + book.language + '</span>' +
                (progress > 0 ? '<span class="progress-badge"><i class="fas fa-check-circle"></i> ' + progress + '% done</span>' : '') +
                '</div>' +
                (progress > 0 ? '<div class="progress-bar-container"><div class="progress-bar-fill" style="width:' + progress + '%"></div></div>' : '') +
                '</div>' +
                '<div class="book-card-arrow"><i class="fas fa-chevron-right"></i></div>' +
                '</a>';
        });

        bookGrid.innerHTML = html;
    }

    // ── Event Handlers ──
    searchInput.addEventListener('input', function () {
        state.search = this.value.trim();
        clearSearch.style.display = state.search ? 'flex' : 'none';
        renderBooks();
    });

    clearSearch.addEventListener('click', function () {
        searchInput.value = '';
        state.search = '';
        clearSearch.style.display = 'none';
        searchInput.focus();
        renderBooks();
    });

    sortSelect.addEventListener('change', function () {
        state.sort = this.value;
        localStorage.setItem('lib-sort', state.sort);
        renderBooks();
    });

    categoryChips.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        categoryChips.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        state.category = chip.dataset.category;
        renderBooks();
    });

    viewBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            viewBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.view = btn.dataset.view;
            localStorage.setItem('lib-view', state.view);
            renderBooks();
        });
    });

    // ── Initialize ──
    sortSelect.value = state.sort;
    viewBtns.forEach(function (btn) {
        btn.classList.toggle('active', btn.dataset.view === state.view);
    });
    initCategories();
    renderBooks();
})();
