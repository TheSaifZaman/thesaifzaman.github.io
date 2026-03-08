// X-Day Challenge Planner — script.js

(function () {
    'use strict';

    const STORAGE_KEY = 'challenges_100day';

    // ===== STATE =====
    let challenges = [];
    let currentChallengeId = null;
    let filterState = { search: '', category: 'all', duration: 'all', sort: 'default' };
    let pendingTemplate = null; // for modal flow

    // ===== DOM REFS =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const viewHome = $('#viewHome');
    const viewCreate = $('#viewCreate');
    const viewDashboard = $('#viewDashboard');

    const activeChallengesSection = $('#activeChallengesSection');
    const activePills = $('#activePills');
    const templatesGrid = $('#templatesGrid');
    const archivedSection = $('#archivedSection');
    const archivedList = $('#archivedList');

    const createForm = $('#createForm');
    const inputName = $('#inputName');
    const inputDesc = $('#inputDesc');
    const inputGoal = $('#inputGoal');
    const inputDate = $('#inputDate');
    const createDurationPills = $('#createDurationPills');

    const dashName = $('#dashName');
    const dashDesc = $('#dashDesc');
    const dashGoal = $('#dashGoal');
    const statProgress = $('#statProgress');
    const statStreak = $('#statStreak');
    const statBest = $('#statBest');
    const statRemaining = $('#statRemaining');
    const progressBar = $('#progressBar');
    const dateStart = $('#dateStart');
    const dateEnd = $('#dateEnd');
    const dayGrid = $('#dayGrid');
    const dayTooltip = $('#dayTooltip');
    const noteDay = $('#noteDay');
    const dailyNote = $('#dailyNote');

    const themeToggle = $('#themeToggle');

    // Filter elements
    const searchInput = $('#searchInput');
    const categoryFilters = $('#categoryFilters');
    const durationFilter = $('#durationFilter');
    const sortSelect = $('#sortSelect');
    const resultCount = $('#resultCount');

    // Modal elements
    const durationModal = $('#durationModal');
    const modalClose = $('#modalClose');
    const modalIcon = $('#modalIcon');
    const modalName = $('#modalName');
    const modalDesc = $('#modalDesc');
    const modalDurationPills = $('#modalDurationPills');
    const modalStartDate = $('#modalStartDate');
    const modalCancel = $('#modalCancel');
    const modalStart = $('#modalStart');

    let selectedModalDuration = null;
    let selectedCreateDuration = null;

    // ===== THEME =====
    function initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // ===== STORAGE =====
    function loadChallenges() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            challenges = data ? JSON.parse(data) : [];
            // Migration: add totalDays if missing (old 100-day challenges)
            challenges.forEach(function (c) {
                if (!c.totalDays) c.totalDays = 100;
            });
        } catch (e) {
            challenges = [];
        }
    }

    function saveChallenges() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges));
    }

    // ===== HELPERS =====
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function formatDate(dateStr) {
        var d = new Date(dateStr + 'T00:00:00');
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function addDays(dateStr, n) {
        var d = new Date(dateStr + 'T00:00:00');
        d.setDate(d.getDate() + n);
        return d.toISOString().split('T')[0];
    }

    function getTodayStr() {
        return new Date().toISOString().split('T')[0];
    }

    function getDayNumber(challenge) {
        var start = new Date(challenge.startDate + 'T00:00:00');
        var today = new Date(getTodayStr() + 'T00:00:00');
        var diff = Math.floor((today - start) / 86400000);
        return diff + 1;
    }

    function getDateForDay(challenge, dayNum) {
        return addDays(challenge.startDate, dayNum - 1);
    }

    function escHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ===== STREAK CALCULATION =====
    function calcStreaks(challenge) {
        var total = challenge.totalDays;
        var dayNum = Math.min(getDayNumber(challenge), total);
        var currentStreak = 0;
        var bestStreak = 0;
        var tempStreak = 0;

        for (var i = 1; i <= total; i++) {
            if (challenge.completedDays[i]) {
                tempStreak++;
                if (tempStreak > bestStreak) bestStreak = tempStreak;
            } else {
                tempStreak = 0;
            }
        }

        var checkFrom = Math.max(1, Math.min(dayNum, total));
        for (var i = checkFrom; i >= 1; i--) {
            if (challenge.completedDays[i]) {
                currentStreak++;
            } else {
                break;
            }
        }

        return { currentStreak: currentStreak, bestStreak: bestStreak };
    }

    // ===== VIEW SWITCHING =====
    function showView(viewEl) {
        [viewHome, viewCreate, viewDashboard].forEach(function (v) { v.classList.remove('active'); });
        viewEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== BUILD CATEGORY PILLS =====
    function buildCategoryFilters() {
        categoryFilters.innerHTML = '';
        var allPill = document.createElement('button');
        allPill.className = 'cat-pill active';
        allPill.textContent = 'All';
        allPill.dataset.cat = 'all';
        allPill.addEventListener('click', function () {
            filterState.category = 'all';
            $$('.cat-pill').forEach(function (p) { p.classList.remove('active'); });
            allPill.classList.add('active');
            renderTemplates();
        });
        categoryFilters.appendChild(allPill);

        Object.keys(CHALLENGE_CATEGORIES).forEach(function (key) {
            var cat = CHALLENGE_CATEGORIES[key];
            var pill = document.createElement('button');
            pill.className = 'cat-pill';
            pill.dataset.cat = key;
            pill.innerHTML = '<i class="' + cat.icon + '"></i> ' + cat.label;
            pill.addEventListener('click', function () {
                filterState.category = key;
                $$('.cat-pill').forEach(function (p) { p.classList.remove('active'); });
                pill.classList.add('active');
                renderTemplates();
            });
            categoryFilters.appendChild(pill);
        });
    }

    // ===== BUILD DURATION PILLS (for modal and create form) =====
    function buildDurationPills(container, defaultVal, onSelect) {
        container.innerHTML = '';
        DURATIONS.forEach(function (d) {
            var pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'dur-pill' + (d === defaultVal ? ' active' : '');
            pill.textContent = d + ' Days';
            pill.dataset.dur = d;
            pill.addEventListener('click', function () {
                container.querySelectorAll('.dur-pill').forEach(function (p) { p.classList.remove('active'); });
                pill.classList.add('active');
                onSelect(d);
            });
            container.appendChild(pill);
        });
    }

    // ===== FILTER & SORT TEMPLATES =====
    function getFilteredTemplates() {
        var list = CHALLENGE_TEMPLATES.slice();

        // Search
        if (filterState.search) {
            var q = filterState.search.toLowerCase();
            list = list.filter(function (t) {
                return t.name.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q) ||
                    t.goal.toLowerCase().includes(q) ||
                    (t.tags && t.tags.some(function (tag) { return tag.toLowerCase().includes(q); }));
            });
        }

        // Category
        if (filterState.category !== 'all') {
            list = list.filter(function (t) { return t.category === filterState.category; });
        }

        // Duration
        if (filterState.duration !== 'all') {
            var dur = parseInt(filterState.duration);
            list = list.filter(function (t) { return t.duration === dur; });
        }

        // Sort
        switch (filterState.sort) {
            case 'name-asc':
                list.sort(function (a, b) { return a.name.localeCompare(b.name); });
                break;
            case 'name-desc':
                list.sort(function (a, b) { return b.name.localeCompare(a.name); });
                break;
            case 'duration-asc':
                list.sort(function (a, b) { return a.duration - b.duration; });
                break;
            case 'duration-desc':
                list.sort(function (a, b) { return b.duration - a.duration; });
                break;
        }

        return list;
    }

    // ===== RENDER TEMPLATES =====
    function renderTemplates() {
        var filtered = getFilteredTemplates();
        templatesGrid.innerHTML = '';

        resultCount.textContent = filtered.length + ' challenge' + (filtered.length !== 1 ? 's' : '');

        if (filtered.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = '<i class="fas fa-search"></i><p>No challenges match your filters.</p>';
            templatesGrid.appendChild(empty);
            return;
        }

        filtered.forEach(function (t) {
            var cat = CHALLENGE_CATEGORIES[t.category] || {};
            var card = document.createElement('div');
            card.className = 'template-card';
            card.innerHTML =
                '<div class="template-top">' +
                    '<span class="template-icon">' + t.icon + '</span>' +
                    '<span class="template-duration-badge">' + t.duration + 'd</span>' +
                '</div>' +
                '<div class="template-name">' + escHtml(t.name) + '</div>' +
                '<div class="template-desc">' + escHtml(t.description) + '</div>' +
                '<div class="template-bottom">' +
                    '<span class="template-category" style="color:' + (cat.color || 'var(--text-secondary)') + '">' +
                        '<i class="' + (cat.icon || '') + '"></i> ' + (cat.label || '') +
                    '</span>' +
                    '<span class="template-goal">' + escHtml(t.goal) + '</span>' +
                '</div>';
            card.addEventListener('click', function () { openDurationModal(t); });
            templatesGrid.appendChild(card);
        });
    }

    // ===== RENDER HOME =====
    function renderHome() {
        var active = challenges.filter(function (c) { return !c.archived; });
        var archived = challenges.filter(function (c) { return c.archived; });

        // Active pills
        if (active.length > 0) {
            activeChallengesSection.style.display = '';
            activePills.innerHTML = '';
            active.forEach(function (c) {
                var completedCount = Object.keys(c.completedDays).length;
                var pct = Math.round((completedCount / c.totalDays) * 100);
                var pill = document.createElement('button');
                pill.className = 'challenge-pill';
                pill.innerHTML = '<span class="pill-icon">' + (c.icon || '\uD83C\uDFAF') + '</span> ' +
                    escHtml(c.name) +
                    ' <span class="pill-duration">' + c.totalDays + 'd</span>' +
                    ' <span class="pill-progress">' + pct + '%</span>';
                pill.addEventListener('click', function () { openDashboard(c.id); });
                activePills.appendChild(pill);
            });
        } else {
            activeChallengesSection.style.display = 'none';
        }

        // Templates
        renderTemplates();

        // Archived
        if (archived.length > 0) {
            archivedSection.style.display = '';
            archivedList.innerHTML = '';
            archived.forEach(function (c) {
                var completedCount = Object.keys(c.completedDays).length;
                var pct = Math.round((completedCount / c.totalDays) * 100);
                var item = document.createElement('div');
                item.className = 'archived-item';
                item.innerHTML =
                    '<div class="archived-info">' +
                        '<div class="archived-name">' + (c.icon || '\uD83C\uDFAF') + ' ' + escHtml(c.name) + '</div>' +
                        '<div class="archived-meta">' + pct + '% complete &middot; ' + c.totalDays + ' days &middot; Started ' + formatDate(c.startDate) + '</div>' +
                    '</div>' +
                    '<div class="archived-actions">' +
                        '<button class="btn-restore" title="Restore"><i class="fas fa-undo"></i></button>' +
                        '<button class="btn-del" title="Delete permanently"><i class="fas fa-trash"></i></button>' +
                    '</div>';
                item.querySelector('.btn-restore').addEventListener('click', function () {
                    c.archived = false;
                    saveChallenges();
                    renderHome();
                });
                item.querySelector('.btn-del').addEventListener('click', function () {
                    if (confirm('Permanently delete "' + c.name + '"?')) {
                        challenges = challenges.filter(function (x) { return x.id !== c.id; });
                        saveChallenges();
                        renderHome();
                    }
                });
                archivedList.appendChild(item);
            });
        } else {
            archivedSection.style.display = 'none';
        }
    }

    // ===== DURATION MODAL =====
    function openDurationModal(template) {
        pendingTemplate = template;
        modalIcon.textContent = template.icon;
        modalName.textContent = template.name;
        modalDesc.textContent = template.description;
        modalStartDate.value = getTodayStr();
        selectedModalDuration = template.duration;

        buildDurationPills(modalDurationPills, template.duration, function (d) {
            selectedModalDuration = d;
        });

        durationModal.style.display = 'flex';
    }

    function closeDurationModal() {
        durationModal.style.display = 'none';
        pendingTemplate = null;
    }

    function confirmModalStart() {
        if (!pendingTemplate || !selectedModalDuration) return;
        var t = pendingTemplate;
        var challenge = {
            id: generateId(),
            name: t.name,
            description: t.description,
            goal: t.goal,
            icon: t.icon,
            totalDays: selectedModalDuration,
            startDate: modalStartDate.value || getTodayStr(),
            completedDays: {},
            notes: {},
            archived: false,
            createdAt: new Date().toISOString()
        };
        challenges.push(challenge);
        saveChallenges();
        closeDurationModal();
        openDashboard(challenge.id);
    }

    // ===== CREATE CUSTOM =====
    function handleCreate(e) {
        e.preventDefault();
        var duration = selectedCreateDuration || 30;
        var challenge = {
            id: generateId(),
            name: inputName.value.trim(),
            description: inputDesc.value.trim(),
            goal: inputGoal.value.trim(),
            icon: '\u2728',
            totalDays: duration,
            startDate: inputDate.value,
            completedDays: {},
            notes: {},
            archived: false,
            createdAt: new Date().toISOString()
        };
        challenges.push(challenge);
        saveChallenges();
        openDashboard(challenge.id);
    }

    // ===== OPEN DASHBOARD =====
    function openDashboard(id) {
        currentChallengeId = id;
        renderDashboard();
        showView(viewDashboard);
    }

    // ===== RENDER DASHBOARD =====
    function renderDashboard() {
        var c = challenges.find(function (x) { return x.id === currentChallengeId; });
        if (!c) return showView(viewHome);

        var total = c.totalDays;
        var completedCount = Object.keys(c.completedDays).length;
        var pct = Math.round((completedCount / total) * 100);
        var endDate = addDays(c.startDate, total - 1);
        var dayNum = getDayNumber(c);
        var streaks = calcStreaks(c);
        var remaining = Math.max(0, total - completedCount);

        // Header
        dashName.textContent = (c.icon || '\uD83C\uDFAF') + ' ' + c.name;
        dashDesc.textContent = c.description || '';
        dashGoal.textContent = c.goal || '';

        // Stats
        statProgress.textContent = pct + '%';
        statStreak.textContent = streaks.currentStreak;
        statBest.textContent = streaks.bestStreak;
        statRemaining.textContent = remaining;

        // Progress bar
        progressBar.querySelector('.progress-fill').style.width = pct + '%';
        dateStart.textContent = formatDate(c.startDate);
        dateEnd.textContent = formatDate(endDate);

        // Day grid — adaptive columns
        var cols = (GRID_COLS && GRID_COLS[total]) || 10;
        dayGrid.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
        dayGrid.innerHTML = '';

        for (var i = 1; i <= total; i++) {
            var circle = document.createElement('div');
            circle.className = 'day-circle';
            circle.textContent = i;
            circle.dataset.day = i;

            var isCompleted = !!c.completedDays[i];
            var isToday = i === dayNum;
            var isFuture = i > dayNum;
            var hasNote = !!c.notes[i];

            if (isCompleted) circle.classList.add('completed');
            if (isToday) circle.classList.add('today');
            if (isFuture && !isCompleted) circle.classList.add('future');
            if (hasNote) circle.classList.add('has-note');

            if (!isFuture || isCompleted) {
                (function (day, el) {
                    el.addEventListener('click', function () { toggleDay(c, day, el); });
                })(i, circle);
            }

            (function (day, el) {
                el.addEventListener('mouseenter', function (e) { showTooltip(e, c, day); });
                el.addEventListener('mouseleave', hideTooltip);
            })(i, circle);

            dayGrid.appendChild(circle);
        }

        // Daily note
        var noteForDay = Math.max(1, Math.min(dayNum, total));
        noteDay.textContent = '(Day ' + noteForDay + ')';
        dailyNote.value = c.notes[noteForDay] || '';
        dailyNote.dataset.day = noteForDay;
    }

    // ===== TOGGLE DAY =====
    function toggleDay(challenge, dayNum, circleEl) {
        if (challenge.completedDays[dayNum]) {
            delete challenge.completedDays[dayNum];
        } else {
            challenge.completedDays[dayNum] = getTodayStr();
            circleEl.classList.add('just-completed');
            setTimeout(function () { circleEl.classList.remove('just-completed'); }, 400);
        }
        saveChallenges();
        renderDashboard();
    }

    // ===== TOOLTIP =====
    function showTooltip(e, challenge, dayNum) {
        var dateStr = getDateForDay(challenge, dayNum);
        var isCompleted = !!challenge.completedDays[dayNum];
        var note = challenge.notes[dayNum];

        var html = 'Day ' + dayNum + ' &middot; ' + formatDate(dateStr);
        if (isCompleted) html += ' &middot; <strong>Done</strong>';
        if (note) html += '<span class="tooltip-note">' + escHtml(note) + '</span>';

        dayTooltip.innerHTML = html;
        dayTooltip.classList.add('visible');

        var rect = e.target.getBoundingClientRect();
        dayTooltip.style.left = rect.left + rect.width / 2 - dayTooltip.offsetWidth / 2 + 'px';
        dayTooltip.style.top = rect.top - dayTooltip.offsetHeight - 8 + 'px';
    }

    function hideTooltip() {
        dayTooltip.classList.remove('visible');
    }

    // ===== SAVE NOTE =====
    function handleSaveNote() {
        var c = challenges.find(function (x) { return x.id === currentChallengeId; });
        if (!c) return;
        var day = parseInt(dailyNote.dataset.day);
        var text = dailyNote.value.trim();
        if (text) {
            c.notes[day] = text;
        } else {
            delete c.notes[day];
        }
        saveChallenges();
        renderDashboard();
    }

    // ===== ARCHIVE / DELETE =====
    function handleArchive() {
        var c = challenges.find(function (x) { return x.id === currentChallengeId; });
        if (!c) return;
        c.archived = true;
        saveChallenges();
        showView(viewHome);
        renderHome();
    }

    function handleDelete() {
        var c = challenges.find(function (x) { return x.id === currentChallengeId; });
        if (!c) return;
        if (confirm('Delete "' + c.name + '" permanently? This cannot be undone.')) {
            challenges = challenges.filter(function (x) { return x.id !== c.id; });
            saveChallenges();
            showView(viewHome);
            renderHome();
        }
    }

    // ===== EVENTS =====
    function bindEvents() {
        themeToggle.addEventListener('click', toggleTheme);

        $('#btnBackFromCreate').addEventListener('click', function () {
            showView(viewHome);
            renderHome();
        });

        $('#btnBackFromDash').addEventListener('click', function () {
            showView(viewHome);
            renderHome();
        });

        $('#btnCustomChallenge').addEventListener('click', function () {
            inputName.value = '';
            inputDesc.value = '';
            inputGoal.value = '';
            inputDate.value = getTodayStr();
            selectedCreateDuration = 30;
            buildDurationPills(createDurationPills, 30, function (d) { selectedCreateDuration = d; });
            showView(viewCreate);
        });

        createForm.addEventListener('submit', handleCreate);

        $('#btnArchive').addEventListener('click', handleArchive);
        $('#btnDelete').addEventListener('click', handleDelete);
        $('#btnSaveNote').addEventListener('click', handleSaveNote);

        // Filter events
        searchInput.addEventListener('input', function () {
            filterState.search = searchInput.value.trim();
            renderTemplates();
        });

        durationFilter.addEventListener('change', function () {
            filterState.duration = durationFilter.value;
            renderTemplates();
        });

        sortSelect.addEventListener('change', function () {
            filterState.sort = sortSelect.value;
            renderTemplates();
        });

        // Modal events
        modalClose.addEventListener('click', closeDurationModal);
        modalCancel.addEventListener('click', closeDurationModal);
        modalStart.addEventListener('click', confirmModalStart);

        durationModal.addEventListener('click', function (e) {
            if (e.target === durationModal) closeDurationModal();
        });
    }

    // ===== INIT =====
    function init() {
        initTheme();
        loadChallenges();
        buildCategoryFilters();
        bindEvents();
        inputDate.value = getTodayStr();
        renderHome();
        showView(viewHome);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
