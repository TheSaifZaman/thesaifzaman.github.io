/* ==============================================
   Book Detail Page — Renders individual book content
   Loads book data dynamically via script tag injection
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

    // ── Get Book ID from URL ──
    var params = new URLSearchParams(window.location.search);
    var bookId = params.get('id');

    if (!bookId) {
        showError('No book specified. <a href="index.html">Return to library</a>.');
        return;
    }

    // Find book metadata from catalog
    var bookMeta = null;
    for (var i = 0; i < BOOKS_CATALOG.length; i++) {
        if (BOOKS_CATALOG[i].id === bookId) {
            bookMeta = BOOKS_CATALOG[i];
            break;
        }
    }

    if (!bookMeta) {
        showError('Book not found: "' + bookId + '". <a href="index.html">Return to library</a>.');
        return;
    }

    document.title = bookMeta.title + ' | Book Library';

    // ── Load Book Data ──
    var script = document.createElement('script');
    script.src = 'books/' + bookId + '/data.js';
    script.onload = function () {
        if (typeof BOOK_DATA === 'undefined') {
            showError('Book data is empty. <a href="index.html">Return to library</a>.');
            return;
        }
        renderBook(BOOK_DATA);
    };
    script.onerror = function () {
        showError('Could not load book data. <a href="index.html">Return to library</a>.');
    };
    document.body.appendChild(script);

    // ── Error Display ──
    function showError(msg) {
        document.getElementById('bookRoot').innerHTML =
            '<section class="hero"><div class="error-message"><i class="fas fa-exclamation-circle"></i><p>' + msg + '</p></div></section>';
    }

    // ── Escape HTML ──
    function esc(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Progress Tracking ──
    function getProgress() {
        try {
            return JSON.parse(localStorage.getItem('book-progress-' + bookId)) || { total: 0, read: 0, chapters: {} };
        } catch (e) {
            return { total: 0, read: 0, chapters: {} };
        }
    }

    function saveProgress(progress) {
        localStorage.setItem('book-progress-' + bookId, JSON.stringify(progress));
    }

    // ── Checkbox State ──
    var CHECKBOX_KEY = 'book-checks-' + bookId;

    function getCheckboxState() {
        try { return JSON.parse(localStorage.getItem(CHECKBOX_KEY)) || {}; } catch (e) { return {}; }
    }

    function saveCheckboxState(state) {
        localStorage.setItem(CHECKBOX_KEY, JSON.stringify(state));
    }

    // ── Quiz State ──
    var QUIZ_KEY = 'book-quiz-' + bookId;

    function getQuizState() {
        try { return JSON.parse(localStorage.getItem(QUIZ_KEY)) || {}; } catch (e) { return {}; }
    }

    function saveQuizState(state) {
        localStorage.setItem(QUIZ_KEY, JSON.stringify(state));
    }

    // ── Render Book ──
    function renderBook(data) {
        var root = document.getElementById('bookRoot');
        var chapters = data.chapters || [];

        // Initialize progress
        var progress = getProgress();
        progress.total = chapters.length;
        saveProgress(progress);

        var html = '';

        // ── Book Hero ──
        html += '<section class="hero book-detail-hero">';
        html += '<div class="book-hero-card" style="--book-color:' + (bookMeta.color || '#22c55e') + '">';
        html += '<i class="' + (bookMeta.icon || 'fas fa-book') + '"></i>';
        html += '<h1>' + esc(data.title || bookMeta.title) + '</h1>';
        html += '<p class="book-author-hero">by ' + esc(data.author || bookMeta.author) + '</p>';
        html += '<p class="book-subtitle-hero">' + esc(data.subtitle || bookMeta.subtitle) + '</p>';
        html += '</div>';
        html += '</section>';

        // ── Content Container ──
        html += '<div class="content-container">';

        // ── Fact Check Warning ──
        html += '<div class="fact-check-banner">';
        html += '<i class="fas fa-exclamation-triangle"></i>';
        html += '<div><strong>Fact-Check Notice</strong>';
        html += '<p>' + esc(bookMeta.factCheckNote || 'Verify all references with original sources.') + '</p></div>';
        html += '</div>';

        // ── Progress Overview ──
        var pct = progress.total > 0 ? Math.round(((progress.read || 0) / progress.total) * 100) : 0;
        html += '<div class="book-progress-overview">';
        html += '<div class="progress-header">';
        html += '<span><i class="fas fa-chart-pie"></i> Reading Progress</span>';
        html += '<span class="progress-pct">' + pct + '%</span>';
        html += '</div>';
        html += '<div class="progress-bar-container"><div class="progress-bar-fill" style="width:' + pct + '%"></div></div>';
        html += '<p class="progress-detail">' + (progress.read || 0) + ' of ' + progress.total + ' chapters completed</p>';
        html += '</div>';

        // ── Tab Navigation ──
        html += '<div class="book-tab-nav">';
        html += '<button class="book-tab-btn active" data-tab="chapters"><i class="fas fa-list"></i> Chapters</button>';
        html += '<button class="book-tab-btn" data-tab="mindmap"><i class="fas fa-project-diagram"></i> Mind Maps</button>';
        html += '<button class="book-tab-btn" data-tab="quiz"><i class="fas fa-question-circle"></i> Quizzes</button>';
        html += '<button class="book-tab-btn" data-tab="keypoints"><i class="fas fa-key"></i> Key Points</button>';
        html += '</div>';

        // ── Tab: Chapters ──
        html += '<div class="book-tab-content active" id="tab-chapters">';
        chapters.forEach(function (ch, idx) {
            html += renderChapter(ch, idx);
        });
        html += '</div>';

        // ── Tab: Mind Maps ──
        html += '<div class="book-tab-content" id="tab-mindmap">';
        var hasMindMaps = false;
        chapters.forEach(function (ch) {
            if (ch.mindMap) {
                hasMindMaps = true;
                html += renderMindMap(ch);
            }
        });
        if (!hasMindMaps) {
            html += '<div class="empty-tab"><i class="fas fa-project-diagram"></i><p>Mind maps will be added soon.</p></div>';
        }
        html += '</div>';

        // ── Tab: Quizzes ──
        html += '<div class="book-tab-content" id="tab-quiz">';
        var hasQuizzes = false;
        chapters.forEach(function (ch, idx) {
            if (ch.quiz && ch.quiz.length > 0) {
                hasQuizzes = true;
                html += renderQuizSection(ch, idx);
            }
        });
        if (!hasQuizzes) {
            html += '<div class="empty-tab"><i class="fas fa-question-circle"></i><p>Quizzes will be added soon.</p></div>';
        }
        html += '</div>';

        // ── Tab: Key Points ──
        html += '<div class="book-tab-content" id="tab-keypoints">';
        chapters.forEach(function (ch) {
            if (ch.keyPoints && ch.keyPoints.length > 0) {
                html += '<div class="keypoints-chapter">';
                html += '<h3 class="keypoints-chapter-title">';
                html += '<span class="chapter-num">' + (ch.isAppendix ? '<i class="fas fa-clipboard-list"></i>' : ch.number) + '</span>';
                html += esc(ch.title);
                html += '</h3>';
                html += '<ul class="keypoints-list">';
                ch.keyPoints.forEach(function (kp) {
                    html += '<li>' + kp + '</li>';
                });
                html += '</ul></div>';
            }
        });
        html += '</div>';

        html += '</div>'; // end content-container
        root.innerHTML = html;

        // ── Initialize Interactivity ──
        initTabs();
        initAccordions();
        initCheckboxes();
        initQuizzes();
        initChapterProgress();
    }

    // ── Render Chapter ──
    function renderChapter(ch, idx) {
        var progress = getProgress();
        var isRead = progress.chapters && progress.chapters[idx];

        var html = '<div class="chapter-card' + (isRead ? ' chapter-read' : '') + '" data-chapter-idx="' + idx + '">';
        html += '<div class="chapter-header">';
        html += '<div class="chapter-toggle" role="button" tabindex="0">';
        html += '<span class="chapter-num">' + (ch.isAppendix ? '<i class="fas fa-clipboard-list"></i>' : ch.number) + '</span>';
        html += '<span class="chapter-title">' + esc(ch.title) + '</span>';
        html += '<i class="fas fa-chevron-down toggle-icon"></i>';
        html += '</div>';
        html += '<button class="mark-read-btn" data-idx="' + idx + '" title="' + (isRead ? 'Mark as unread' : 'Mark as read') + '">';
        html += '<i class="fas ' + (isRead ? 'fa-check-circle' : 'fa-circle') + '"></i></button>';
        html += '</div>';
        html += '<div class="chapter-body">';

        // Summary
        if (ch.summary) {
            html += '<div class="summary-block">';
            html += '<h4><i class="fas fa-lightbulb"></i> Summary</h4>';
            html += ch.summary;
            html += '</div>';
        }

        // Key Points
        if (ch.keyPoints && ch.keyPoints.length > 0) {
            html += '<div class="keypoints-block">';
            html += '<h4><i class="fas fa-key"></i> Key Points</h4>';
            html += '<ul>';
            ch.keyPoints.forEach(function (kp) {
                html += '<li>' + kp + '</li>';
            });
            html += '</ul></div>';
        }

        // Real-Life Examples
        if (ch.realLifeExamples && ch.realLifeExamples.length > 0) {
            ch.realLifeExamples.forEach(function (ex) {
                html += '<div class="example-block">';
                html += '<h5><i class="fas fa-user-circle"></i> ' + esc(ex.title || 'Real-Life Example') + '</h5>';
                html += ex.content;
                html += '</div>';
            });
        }

        // Quotes
        if (ch.quotes && ch.quotes.length > 0) {
            ch.quotes.forEach(function (q) {
                html += '<div class="quote-block">';
                html += q.text;
                if (q.source) {
                    html += '<span class="quote-source">&mdash; ' + esc(q.source) + '</span>';
                }
                html += '</div>';
            });
        }

        // Insights
        if (ch.insights && ch.insights.length > 0) {
            ch.insights.forEach(function (ins) {
                html += '<div class="insight-block">';
                html += '<h5><i class="fas fa-brain"></i> ' + esc(ins.title || 'Key Insight') + '</h5>';
                html += ins.content;
                html += '</div>';
            });
        }

        // Action Items
        if (ch.actionItems && ch.actionItems.length > 0) {
            html += '<div class="action-block">';
            html += '<h4><i class="fas fa-tasks"></i> Action Items</h4>';
            ch.actionItems.forEach(function (item, i) {
                var cbId = 'ch' + idx + '-a' + i;
                html += '<label class="check-item"><input type="checkbox" data-cb-id="' + cbId + '"><span>' + item + '</span></label>';
            });
            html += '</div>';
        }

        html += '</div></div>';
        return html;
    }

    // ── Render Mind Map ──
    function renderMindMap(ch) {
        var mm = ch.mindMap;
        var html = '<div class="mindmap-section">';
        html += '<h3 class="mindmap-title">';
        html += '<span class="chapter-num">' + (ch.isAppendix ? '<i class="fas fa-clipboard-list"></i>' : ch.number) + '</span>';
        html += esc(ch.title);
        html += '</h3>';
        html += '<div class="mindmap-tree">';
        html += '<div class="mm-central">' + esc(mm.central) + '</div>';
        html += '<div class="mm-branches">';
        (mm.branches || []).forEach(function (branch) {
            html += '<div class="mm-branch">';
            html += '<div class="mm-branch-label">' + esc(branch.label) + '</div>';
            if (branch.children && branch.children.length > 0) {
                html += '<ul class="mm-children">';
                branch.children.forEach(function (child) {
                    html += '<li>' + esc(child) + '</li>';
                });
                html += '</ul>';
            }
            html += '</div>';
        });
        html += '</div></div></div>';
        return html;
    }

    // ── Render Quiz Section ──
    function renderQuizSection(ch, chIdx) {
        var html = '<div class="quiz-section" data-chapter="' + chIdx + '">';
        html += '<h3 class="quiz-chapter-title">';
        html += '<span class="chapter-num">' + (ch.isAppendix ? '<i class="fas fa-clipboard-list"></i>' : ch.number) + '</span>';
        html += esc(ch.title);
        html += '</h3>';

        ch.quiz.forEach(function (q, qIdx) {
            var qId = 'ch' + chIdx + '-q' + qIdx;
            html += '<div class="quiz-question" data-qid="' + qId + '">';
            html += '<p class="quiz-q-text"><strong>Q' + (qIdx + 1) + ':</strong> ' + esc(q.question) + '</p>';
            html += '<div class="quiz-options">';
            q.options.forEach(function (opt, oIdx) {
                html += '<button class="quiz-option" data-qid="' + qId + '" data-oidx="' + oIdx + '" data-correct="' + q.correctIndex + '">';
                html += '<span class="quiz-opt-letter">' + String.fromCharCode(65 + oIdx) + '</span>';
                html += '<span>' + esc(opt) + '</span>';
                html += '</button>';
            });
            html += '</div>';
            if (q.explanation) {
                html += '<div class="quiz-explanation" data-qid="' + qId + '" style="display:none">';
                html += '<i class="fas fa-info-circle"></i> ' + esc(q.explanation);
                html += '</div>';
            }
            html += '</div>';
        });

        html += '</div>';
        return html;
    }

    // ── Tab Navigation ──
    function initTabs() {
        var tabBtns = document.querySelectorAll('.book-tab-btn');
        var tabContents = document.querySelectorAll('.book-tab-content');
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                tabBtns.forEach(function (b) { b.classList.remove('active'); });
                tabContents.forEach(function (c) { c.classList.remove('active'); });
                btn.classList.add('active');
                document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
            });
        });
    }

    // ── Chapter Accordions ──
    function initAccordions() {
        document.querySelectorAll('.chapter-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var card = toggle.closest('.chapter-card');
                var body = card.querySelector('.chapter-body');

                if (card.classList.contains('open')) {
                    // Collapse: animate from current height to 0
                    body.style.maxHeight = body.scrollHeight + 'px';
                    requestAnimationFrame(function () {
                        body.style.maxHeight = '0px';
                    });
                    card.classList.remove('open');
                } else {
                    // Expand: animate from 0 to scrollHeight
                    card.classList.add('open');
                    body.style.maxHeight = body.scrollHeight + 'px';
                    // After transition, remove inline max-height so content can grow
                    body.addEventListener('transitionend', function handler() {
                        if (card.classList.contains('open')) {
                            body.style.maxHeight = 'none';
                        }
                        body.removeEventListener('transitionend', handler);
                    });
                }
            });

            // Keyboard accessibility
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
            });
        });
    }

    // ── Checkbox Persistence ──
    function initCheckboxes() {
        var saved = getCheckboxState();
        var checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
        checkboxes.forEach(function (cb) {
            var id = cb.dataset.cbId;
            if (saved[id]) cb.checked = true;
            cb.addEventListener('change', function () {
                var state = getCheckboxState();
                if (cb.checked) { state[id] = true; } else { delete state[id]; }
                saveCheckboxState(state);
            });
        });
    }

    // ── Quiz Interactivity ──
    function initQuizzes() {
        var saved = getQuizState();

        // Restore saved answers
        Object.keys(saved).forEach(function (qId) {
            var ansIdx = saved[qId];
            var btn = document.querySelector('.quiz-option[data-qid="' + qId + '"][data-oidx="' + ansIdx + '"]');
            if (btn) {
                var correct = parseInt(btn.dataset.correct);
                btn.classList.add(ansIdx === correct ? 'correct' : 'wrong');
                if (ansIdx !== correct) {
                    var correctBtn = document.querySelector('.quiz-option[data-qid="' + qId + '"][data-oidx="' + correct + '"]');
                    if (correctBtn) correctBtn.classList.add('correct');
                }
                // Disable all options for this question
                document.querySelectorAll('.quiz-option[data-qid="' + qId + '"]').forEach(function (o) {
                    o.disabled = true;
                });
                // Show explanation
                var expl = document.querySelector('.quiz-explanation[data-qid="' + qId + '"]');
                if (expl) expl.style.display = '';
            }
        });

        document.querySelectorAll('.quiz-option').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var qId = btn.dataset.qid;
                var oIdx = parseInt(btn.dataset.oidx);
                var correct = parseInt(btn.dataset.correct);

                // Save answer
                var state = getQuizState();
                state[qId] = oIdx;
                saveQuizState(state);

                // Visual feedback
                btn.classList.add(oIdx === correct ? 'correct' : 'wrong');
                if (oIdx !== correct) {
                    var correctBtn = document.querySelector('.quiz-option[data-qid="' + qId + '"][data-oidx="' + correct + '"]');
                    if (correctBtn) correctBtn.classList.add('correct');
                }

                // Disable all options
                document.querySelectorAll('.quiz-option[data-qid="' + qId + '"]').forEach(function (o) {
                    o.disabled = true;
                });

                // Show explanation
                var expl = document.querySelector('.quiz-explanation[data-qid="' + qId + '"]');
                if (expl) expl.style.display = '';
            });
        });
    }

    // ── Chapter Read Progress ──
    function initChapterProgress() {
        document.querySelectorAll('.mark-read-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var idx = parseInt(btn.dataset.idx);
                var progress = getProgress();
                if (!progress.chapters) progress.chapters = {};

                if (progress.chapters[idx]) {
                    delete progress.chapters[idx];
                    progress.read = Math.max(0, (progress.read || 1) - 1);
                } else {
                    progress.chapters[idx] = true;
                    progress.read = (progress.read || 0) + 1;
                }
                saveProgress(progress);

                // Update UI
                var icon = btn.querySelector('i');
                var card = btn.closest('.chapter-card');
                if (progress.chapters[idx]) {
                    icon.className = 'fas fa-check-circle';
                    card.classList.add('chapter-read');
                    btn.title = 'Mark as unread';
                } else {
                    icon.className = 'fas fa-circle';
                    card.classList.remove('chapter-read');
                    btn.title = 'Mark as read';
                }

                // Update progress bar
                var pct = progress.total > 0 ? Math.round((progress.read / progress.total) * 100) : 0;
                var pctEl = document.querySelector('.progress-pct');
                var barEl = document.querySelector('.progress-bar-fill');
                var detailEl = document.querySelector('.progress-detail');
                if (pctEl) pctEl.textContent = pct + '%';
                if (barEl) barEl.style.width = pct + '%';
                if (detailEl) detailEl.textContent = progress.read + ' of ' + progress.total + ' chapters completed';
            });
        });
    }

})();
