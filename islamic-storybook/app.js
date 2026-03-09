/* =========================================================
   Islamic Storybook — app.js
   ========================================================= */
'use strict';

/* ── State ────────────────────────────────────────────── */
var state = {
    category: 'all',
    search: '',
    ageGroup: 'all',
    difficulty: 'all',
    sortBy: 'featured',
    unreadOnly: false,
    currentStoryId: null,
    quizAnswers: {},       // storyId -> {qIdx: chosenIdx}
    quizSubmitted: {},     // storyId -> bool
    completedStories: {}   // storyId -> bool
};

/* ── DOM Refs ─────────────────────────────────────────── */
var $ = function(id) { return document.getElementById(id); };

/* ── Init ─────────────────────────────────────────────── */
function init() {
    loadProgress();
    applyTheme();
    renderCounts();
    renderHeroStats();
    renderGrid();
    bindEvents();
}

/* ── Persistence ──────────────────────────────────────── */
function loadProgress() {
    try {
        var saved = localStorage.getItem('islamicStoryProgress');
        if (saved) state.completedStories = JSON.parse(saved);
    } catch(e) {}
}
function saveProgress() {
    localStorage.setItem('islamicStoryProgress', JSON.stringify(state.completedStories));
}

/* ── Theme ────────────────────────────────────────────── */
function applyTheme() {
    var saved = localStorage.getItem('islamicStoryTheme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}
function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme') || 'light';
    var next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('islamicStoryTheme', next);
    updateThemeIcon(next);
}
function updateThemeIcon(theme) {
    var btn = $('themeToggle');
    if (btn) btn.querySelector('i').className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ── Category Labels ──────────────────────────────────── */
var CAT_LABELS = {
    'qisas-anbiya': "Qisas al-Anbiya",
    'qisas-quran': "Qisas al-Quran",
    'qisas-sahaba': "Qisas al-Sahaba",
    'islamic-history': "Islamic History",
    'akhira': "Akhira",
    'end-times': "End Times",
    'miracles': "Miracles",
    'motivation': "Motivation",
    'lessons': "Lessons"
};

var CAT_ICONS = {
    'qisas-anbiya': 'fa-star-and-crescent',
    'qisas-quran': 'fa-book',
    'qisas-sahaba': 'fa-users',
    'islamic-history': 'fa-landmark',
    'akhira': 'fa-moon',
    'end-times': 'fa-hourglass-end',
    'miracles': 'fa-magic',
    'motivation': 'fa-heart',
    'lessons': 'fa-lightbulb'
};

/* ── Filter + Sort ────────────────────────────────────── */
function getFilteredStories() {
    var results = STORIES_DATA.slice();

    // Category
    if (state.category !== 'all') {
        results = results.filter(function(s) { return s.category === state.category; });
    }
    // Age
    if (state.ageGroup !== 'all') {
        results = results.filter(function(s) { return s.ageGroup === state.ageGroup || s.ageGroup === 'all'; });
    }
    // Difficulty
    if (state.difficulty !== 'all') {
        results = results.filter(function(s) { return s.difficulty === state.difficulty; });
    }
    // Unread only
    if (state.unreadOnly) {
        results = results.filter(function(s) { return !state.completedStories[s.id]; });
    }
    // Search
    if (state.search) {
        var q = state.search.toLowerCase();
        results = results.filter(function(s) {
            return s.title.toLowerCase().indexOf(q) !== -1
                || s.summary.toLowerCase().indexOf(q) !== -1
                || (s.tags && s.tags.join(' ').toLowerCase().indexOf(q) !== -1)
                || (s.subcategory && s.subcategory.toLowerCase().indexOf(q) !== -1);
        });
    }
    // Sort
    results.sort(function(a, b) {
        if (state.sortBy === 'featured') {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        }
        if (state.sortBy === 'az') return a.title.localeCompare(b.title);
        if (state.sortBy === 'za') return b.title.localeCompare(a.title);
        if (state.sortBy === 'shortest') return (a.readTime||5) - (b.readTime||5);
        if (state.sortBy === 'longest') return (b.readTime||5) - (a.readTime||5);
        return 0;
    });

    return results;
}

/* ── Render Counts ────────────────────────────────────── */
function renderCounts() {
    var allCount = $('count-all');
    if (allCount) allCount.textContent = STORIES_DATA.length;

    var cats = ['qisas-anbiya','qisas-quran','qisas-sahaba','islamic-history','akhira','end-times','miracles','motivation','lessons'];
    cats.forEach(function(cat) {
        var el = $('count-' + cat);
        if (el) {
            var c = STORIES_DATA.filter(function(s){ return s.category === cat; }).length;
            el.textContent = c;
        }
    });
}

/* ── Hero Stats ───────────────────────────────────────── */
function renderHeroStats() {
    var el = $('heroStats');
    if (!el) return;
    var total = STORIES_DATA.length;
    var completed = Object.keys(state.completedStories).filter(function(k){ return state.completedStories[k]; }).length;
    var cats = Object.keys(CAT_LABELS).length;
    el.innerHTML = [
        '<div class="hero-stat"><div class="stat-num">' + total + '</div><div class="stat-label">Stories</div></div>',
        '<div class="hero-stat"><div class="stat-num">' + cats + '</div><div class="stat-label">Categories</div></div>',
        '<div class="hero-stat"><div class="stat-num">' + completed + '</div><div class="stat-label">Read</div></div>'
    ].join('');
}

/* ── Render Grid ──────────────────────────────────────── */
function renderGrid() {
    var grid = $('storiesGrid');
    var empty = $('emptyState');
    var info = $('resultsInfo');
    var stories = getFilteredStories();

    if (info) {
        var total = STORIES_DATA.length;
        if (stories.length === total) {
            info.textContent = 'Showing all ' + total + ' stories';
        } else {
            info.textContent = 'Showing ' + stories.length + ' of ' + total + ' stories';
        }
    }

    if (!stories.length) {
        grid.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');

    grid.innerHTML = stories.map(function(story) {
        return buildCard(story);
    }).join('');

    // Bind card clicks
    grid.querySelectorAll('.story-card').forEach(function(card) {
        card.addEventListener('click', function() {
            openStory(card.dataset.id);
        });
    });
}

function buildCard(story) {
    var completed = state.completedStories[story.id] ? ' completed' : '';
    var featured = story.featured ? ' featured' : '';
    var diffClass = 'badge-' + (story.difficulty || 'easy');
    var diffLabel = { easy: 'Easy', medium: 'Medium', hard: 'Detailed' }[story.difficulty] || 'Easy';
    var ageLabel = { kids: 'Kids', teen: 'Teen', adult: 'Adult', all: 'All Ages' }[story.ageGroup] || 'All Ages';
    var catLabel = CAT_LABELS[story.category] || story.category;
    var catIcon = CAT_ICONS[story.category] || 'fa-book';
    var completeIcon = state.completedStories[story.id]
        ? '<span class="card-complete-icon"><i class="fas fa-check-circle"></i></span>' : '';

    return '<div class="story-card' + completed + featured + '" data-id="' + story.id + '">' +
        '<div class="card-top">' +
            '<span class="card-category cat-badge-' + story.category + '">' +
                '<i class="fas ' + catIcon + '"></i> ' + catLabel +
            '</span>' +
            '<div class="card-title">' + story.title + '</div>' +
            (story.titleAr ? '<div class="card-title-ar">' + story.titleAr + '</div>' : '') +
            '<p class="card-summary">' + story.summary + '</p>' +
        '</div>' +
        '<div class="card-bottom">' +
            '<div class="card-meta">' +
                '<span class="card-badge ' + diffClass + '">' + diffLabel + '</span>' +
                '<span class="card-badge badge-age">' + ageLabel + '</span>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
                '<span class="card-read-time"><i class="fas fa-clock"></i> ' + (story.readTime || 5) + ' min</span>' +
                completeIcon +
            '</div>' +
        '</div>' +
    '</div>';
}

/* ── Open Story ───────────────────────────────────────── */
function openStory(id) {
    var story = STORIES_DATA.find(function(s) { return s.id === id; });
    if (!story) return;
    state.currentStoryId = id;

    var modal = $('storyModal');
    $('storyModalTitle').textContent = story.title;
    $('storyModalTitleAr').textContent = story.titleAr || '';

    // Meta badges
    var catLabel = CAT_LABELS[story.category] || story.category;
    var diffLabel = { easy: 'Easy', medium: 'Medium', hard: 'Detailed' }[story.difficulty] || 'Easy';
    var ageLabel = { kids: 'Kids (6-12)', teen: 'Teen (13-17)', adult: 'Adult (18+)', all: 'All Ages' }[story.ageGroup] || 'All Ages';
    $('storyModalMeta').innerHTML =
        '<span class="card-category cat-badge-' + story.category + '" style="font-size:0.75rem;padding:3px 10px;">' + catLabel + '</span>' +
        '<span class="card-badge badge-' + story.difficulty + '">' + diffLabel + '</span>' +
        '<span class="card-badge badge-age">' + ageLabel + '</span>' +
        '<span class="card-read-time" style="margin-left:auto;"><i class="fas fa-clock"></i> ' + (story.readTime||5) + ' min read</span>';

    // Story text
    var storyHtml = '';
    if (Array.isArray(story.story)) {
        storyHtml = story.story.map(function(p) { return '<p>' + p + '</p>'; }).join('');
    } else {
        storyHtml = '<p>' + (story.story || '').replace(/\n\n/g, '</p><p>') + '</p>';
    }
    $('storyText').innerHTML = storyHtml;
    $('storyReference').innerHTML = '<strong><i class="fas fa-book-open"></i> Source:</strong> ' + (story.reference || 'Holy Quran & Authentic Hadith');

    // Quiz
    renderQuiz(story);

    // Moral
    renderMoral(story);

    // Mark complete button
    updateCompleteBtn(id);

    // Reset to story tab
    switchTab('story');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeStory() {
    $('storyModal').classList.add('hidden');
    document.body.style.overflow = '';
}

/* ── Tabs ─────────────────────────────────────────────── */
function switchTab(tab) {
    document.querySelectorAll('.story-tab').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    ['story','quiz','moral'].forEach(function(t) {
        var el = $('tab' + t.charAt(0).toUpperCase() + t.slice(1));
        if (el) el.classList.toggle('hidden', t !== tab);
    });
}

/* ── Quiz ─────────────────────────────────────────────── */
function renderQuiz(story) {
    var container = $('quizContainer');
    if (!story.quiz || !story.quiz.length) {
        container.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;">No quiz available for this story.</p>';
        return;
    }

    var submitted = state.quizSubmitted[story.id];
    var answers = state.quizAnswers[story.id] || {};

    var html = story.quiz.map(function(q, qi) {
        var optHtml = q.options.map(function(opt, oi) {
            var cls = 'quiz-option';
            if (submitted) {
                if (oi === q.answer) cls += ' correct';
                else if (answers[qi] === oi) cls += ' wrong';
                cls += ' answered';
            } else if (answers[qi] === oi) {
                cls += ' selected';
            }
            return '<button class="' + cls + '" data-qi="' + qi + '" data-oi="' + oi + '">' +
                '<strong>' + String.fromCharCode(65+oi) + '.</strong> ' + opt +
            '</button>';
        }).join('');

        var explanation = submitted && q.explanation
            ? '<div class="quiz-explanation"><strong>Explanation:</strong> ' + q.explanation + '</div>'
            : '';

        return '<div class="quiz-question">' +
            '<p class="quiz-q-text"><span class="quiz-q-num">Q' + (qi+1) + '.</span> ' + q.question + '</p>' +
            '<div class="quiz-options">' + optHtml + '</div>' +
            explanation +
        '</div>';
    }).join('');

    if (submitted) {
        var correct = story.quiz.filter(function(q, qi) { return answers[qi] === q.answer; }).length;
        var total = story.quiz.length;
        var msg = correct === total ? 'Excellent! Perfect score!' : correct >= Math.ceil(total/2) ? 'Good job! Keep learning.' : 'Review the story and try again.';
        html += '<div class="quiz-score">' +
            '<div class="score-num">' + correct + '/' + total + '</div>' +
            '<p>' + msg + '</p>' +
            '<button class="btn-retake" onclick="retakeQuiz()">Retake Quiz</button>' +
        '</div>';
    } else {
        var answered = Object.keys(answers).length;
        if (answered === story.quiz.length) {
            html += '<div style="text-align:center;margin-top:16px;">' +
                '<button class="btn-primary" onclick="submitQuiz()"><i class="fas fa-check"></i> Submit Answers</button>' +
            '</div>';
        }
    }

    container.innerHTML = html;

    if (!submitted) {
        container.querySelectorAll('.quiz-option').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var qi = parseInt(btn.dataset.qi);
                var oi = parseInt(btn.dataset.oi);
                if (!state.quizAnswers[story.id]) state.quizAnswers[story.id] = {};
                state.quizAnswers[story.id][qi] = oi;
                // update visuals
                var group = container.querySelectorAll('[data-qi="' + qi + '"]');
                group.forEach(function(b) { b.classList.remove('selected'); });
                btn.classList.add('selected');
                // re-render to check if all answered
                renderQuiz(story);
            });
        });
    }
}

function submitQuiz() {
    if (!state.currentStoryId) return;
    state.quizSubmitted[state.currentStoryId] = true;
    var story = STORIES_DATA.find(function(s){ return s.id === state.currentStoryId; });
    if (story) renderQuiz(story);
}

function retakeQuiz() {
    if (!state.currentStoryId) return;
    delete state.quizAnswers[state.currentStoryId];
    delete state.quizSubmitted[state.currentStoryId];
    var story = STORIES_DATA.find(function(s){ return s.id === state.currentStoryId; });
    if (story) renderQuiz(story);
}

/* ── Moral ────────────────────────────────────────────── */
function renderMoral(story) {
    var container = $('moralContent');
    var html = '';
    if (story.moral) {
        if (Array.isArray(story.moral)) {
            html += '<div class="moral-section"><h3><i class="fas fa-lightbulb" style="color:var(--cat-anbiya);margin-right:6px;"></i>Lessons Learned</h3>' +
                '<ul class="moral-list">' + story.moral.map(function(m){ return '<li>' + m + '</li>'; }).join('') + '</ul></div>';
        } else {
            html += '<div class="moral-section"><h3><i class="fas fa-lightbulb" style="color:var(--cat-anbiya);margin-right:6px;"></i>Lesson</h3>' +
                '<p style="font-size:0.9rem;color:var(--text-muted);line-height:1.65;">' + story.moral + '</p></div>';
        }
    }
    if (story.dua) {
        html += '<div class="moral-section">' +
            '<h3><i class="fas fa-hands" style="color:var(--cat-quran);margin-right:6px;"></i>Dua / Remembrance</h3>' +
            '<div style="background:rgba(5,150,105,0.08);border-radius:10px;padding:14px;border-left:3px solid var(--cat-quran);">' +
            '<p style="font-family:var(--font-arabic);font-size:1.1rem;color:var(--text);margin-bottom:8px;direction:rtl;">' + story.dua.arabic + '</p>' +
            '<p style="font-size:0.85rem;color:var(--text-muted);">' + story.dua.translation + '</p>' +
            '</div></div>';
    }
    container.innerHTML = html || '<p style="color:var(--text-muted);font-size:0.9rem;">No lessons notes available.</p>';
}

/* ── Mark Complete ────────────────────────────────────── */
function updateCompleteBtn(id) {
    var btn = $('btnMarkComplete');
    if (!btn) return;
    var done = state.completedStories[id];
    btn.innerHTML = done
        ? '<i class="fas fa-check-circle"></i> Completed'
        : '<i class="far fa-circle"></i> Mark as Read';
    btn.className = 'btn-complete' + (done ? ' completed' : '');
}

function toggleComplete() {
    var id = state.currentStoryId;
    if (!id) return;
    state.completedStories[id] = !state.completedStories[id];
    if (!state.completedStories[id]) delete state.completedStories[id];
    saveProgress();
    updateCompleteBtn(id);
    renderHeroStats();
    renderGrid();
}

/* ── Navigate Between Stories ─────────────────────────── */
function navigateStory(dir) {
    var filtered = getFilteredStories();
    var idx = filtered.findIndex(function(s){ return s.id === state.currentStoryId; });
    if (idx === -1) return;
    var nextIdx = idx + dir;
    if (nextIdx < 0 || nextIdx >= filtered.length) return;
    openStory(filtered[nextIdx].id);
}

/* ── Progress Modal ───────────────────────────────────── */
function openProgressModal() {
    var total = STORIES_DATA.length;
    var completed = Object.keys(state.completedStories).filter(function(k){ return state.completedStories[k]; }).length;
    var pct = total ? Math.round(completed/total*100) : 0;

    var cats = Object.keys(CAT_LABELS);
    var catRows = cats.map(function(cat) {
        var catTotal = STORIES_DATA.filter(function(s){ return s.category === cat; }).length;
        var catDone = STORIES_DATA.filter(function(s){ return s.category === cat && state.completedStories[s.id]; }).length;
        return '<div class="progress-cat-item">' +
            '<div class="cat-name">' + CAT_LABELS[cat] + '</div>' +
            '<div class="cat-progress">' + catDone + '/' + catTotal + '</div>' +
        '</div>';
    }).join('');

    $('progressBody').innerHTML =
        '<div class="progress-section">' +
            '<h3>Overall Progress</h3>' +
            '<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<p class="progress-label">' + completed + ' of ' + total + ' stories read (' + pct + '%)</p>' +
        '</div>' +
        '<div class="progress-section"><h3>By Category</h3><div class="progress-cats">' + catRows + '</div></div>';

    $('progressModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProgressModal() {
    $('progressModal').classList.add('hidden');
    document.body.style.overflow = '';
}

function resetProgressConfirm() {
    if (confirm('Reset all reading progress? This cannot be undone.')) {
        state.completedStories = {};
        saveProgress();
        renderHeroStats();
        renderGrid();
        closeProgressModal();
    }
}

/* ── Expose for inline onclick ────────────────────────── */
window.resetFilters = function() {
    state.category = 'all';
    state.search = '';
    state.ageGroup = 'all';
    state.difficulty = 'all';
    state.sortBy = 'featured';
    state.unreadOnly = false;
    $('searchInput').value = '';
    $('btnClearSearch').classList.add('hidden');
    // Reset age pills
    document.querySelectorAll('[data-group="age"] .fpill').forEach(function(b){ b.classList.toggle('active', b.dataset.val === 'all'); });
    // Reset difficulty pills
    document.querySelectorAll('[data-group="difficulty"] .fpill').forEach(function(b){ b.classList.toggle('active', b.dataset.val === 'all'); });
    // Reset sort pills
    document.querySelectorAll('#sortBtns .fpill').forEach(function(b){ b.classList.toggle('active', b.dataset.sort === 'featured'); });
    // Reset unread toggle
    var unreadBtn = $('btnUnreadOnly');
    if (unreadBtn) { unreadBtn.classList.remove('active'); unreadBtn.innerHTML = '<i class="far fa-circle"></i> Unread Only'; }
    // Reset category pills
    document.querySelectorAll('.cat-pill').forEach(function(p){ p.classList.toggle('active', p.dataset.cat === 'all'); });
    renderGrid();
};
window.submitQuiz = submitQuiz;
window.retakeQuiz = retakeQuiz;

/* ── Bind Events ──────────────────────────────────────── */
function bindEvents() {
    // Theme
    $('themeToggle').addEventListener('click', toggleTheme);

    // Search
    var searchInput = $('searchInput');
    var clearBtn = $('btnClearSearch');
    searchInput.addEventListener('input', function() {
        state.search = this.value.trim();
        clearBtn.classList.toggle('hidden', !state.search);
        renderGrid();
    });
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        state.search = '';
        clearBtn.classList.add('hidden');
        renderGrid();
    });

    // Age filter pills
    document.querySelectorAll('[data-group="age"] .fpill').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-group="age"] .fpill').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
            state.ageGroup = btn.dataset.val;
            renderGrid();
        });
    });

    // Difficulty filter pills
    document.querySelectorAll('[data-group="difficulty"] .fpill').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('[data-group="difficulty"] .fpill').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
            state.difficulty = btn.dataset.val;
            renderGrid();
        });
    });

    // Sort pills
    document.querySelectorAll('#sortBtns .fpill').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#sortBtns .fpill').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
            state.sortBy = btn.dataset.sort;
            renderGrid();
        });
    });

    // Unread only toggle
    $('btnUnreadOnly').addEventListener('click', function() {
        state.unreadOnly = !state.unreadOnly;
        this.dataset.active = state.unreadOnly ? 'true' : 'false';
        this.classList.toggle('active', state.unreadOnly);
        this.innerHTML = state.unreadOnly
            ? '<i class="fas fa-check-circle"></i> Unread Only'
            : '<i class="far fa-circle"></i> Unread Only';
        renderGrid();
    });

    // Category pills
    document.querySelectorAll('.cat-pill').forEach(function(pill) {
        pill.addEventListener('click', function() {
            state.category = pill.dataset.cat;
            document.querySelectorAll('.cat-pill').forEach(function(p) {
                p.classList.toggle('active', p.dataset.cat === state.category);
            });
            renderGrid();
        });
    });

    // Story modal
    $('btnCloseStory').addEventListener('click', closeStory);
    $('btnMarkComplete').addEventListener('click', toggleComplete);
    $('btnPrevStory').addEventListener('click', function() { navigateStory(-1); });
    $('btnNextStory').addEventListener('click', function() { navigateStory(1); });

    // Tabs
    document.querySelectorAll('.story-tab').forEach(function(btn) {
        btn.addEventListener('click', function() { switchTab(btn.dataset.tab); });
    });

    // Progress
    $('btnProgress').addEventListener('click', openProgressModal);
    $('btnCloseProgress').addEventListener('click', closeProgressModal);
    $('btnResetProgress').addEventListener('click', resetProgressConfirm);

    // Close on overlay click
    $('storyModal').addEventListener('click', function(e) { if (e.target === this) closeStory(); });
    $('progressModal').addEventListener('click', function(e) { if (e.target === this) closeProgressModal(); });

    // Keyboard
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closeStory(); closeProgressModal(); }
        if (e.key === 'ArrowLeft' && state.currentStoryId && !$('storyModal').classList.contains('hidden')) navigateStory(-1);
        if (e.key === 'ArrowRight' && state.currentStoryId && !$('storyModal').classList.contains('hidden')) navigateStory(1);
    });
}

/* ── Boot ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', init);
