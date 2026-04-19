/* ============================================================
   Visual Book: The Bullet Journal Method — Shared App Logic
   Content based on "The Bullet Journal Method" by Ryder Carroll,
   (c) 2018 Portfolio/Penguin
   ============================================================ */

const VB = (() => {
  const STORAGE_KEY = 'vb-bullet-journal-method-progress';
  const THEME_KEY   = 'vb-theme';

  // ---------- Progress ----------
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function setChapterProgress(chapterKey, quizScore, quizTotal) {
    const data = loadProgress();
    data[chapterKey] = { quizScore, quizTotal, completed: quizScore >= Math.ceil(quizTotal * 0.6) };
    saveProgress(data);
  }

  function getChapterProgress(chapterKey) {
    return loadProgress()[chapterKey] || null;
  }

  function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = 'index.html';
  }

  // ---------- Theme ----------
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    while (btn.firstChild) btn.removeChild(btn.firstChild);
    const i = document.createElement('i');
    i.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    btn.appendChild(i);
  }

  // ---------- Quiz Engine ----------
  function initQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chapterKey = document.body.dataset.chapter;
    let answered = {};

    function render() {
      while (container.firstChild) container.removeChild(container.firstChild);

      questions.forEach((q, qi) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.id = 'q-' + qi;

        const qText = document.createElement('p');
        qText.className = 'q-text';
        const numSpan = document.createElement('span');
        numSpan.className = 'q-num';
        numSpan.textContent = 'Q' + (qi + 1) + '.';
        qText.appendChild(numSpan);
        qText.appendChild(document.createTextNode(' ' + q.question));
        qDiv.appendChild(qText);

        const opts = document.createElement('div');
        opts.className = 'quiz-options';
        q.options.forEach((opt, oi) => {
          const label = document.createElement('div');
          label.className = 'quiz-option';
          label.dataset.qi = qi;
          label.dataset.oi = oi;
          const optLabel = document.createElement('span');
          optLabel.className = 'opt-label';
          optLabel.textContent = String.fromCharCode(65 + oi);
          const optText = document.createElement('span');
          optText.textContent = opt;
          label.appendChild(optLabel);
          label.appendChild(optText);
          label.addEventListener('click', () => selectOption(qi, oi));
          opts.appendChild(label);
        });
        qDiv.appendChild(opts);
        container.appendChild(qDiv);
      });
    }

    function selectOption(qi, oi) {
      if (answered[qi] !== undefined) return;
      answered[qi] = oi;
      const q = questions[qi];
      const qDiv = document.getElementById('q-' + qi);
      const opts = qDiv.querySelectorAll('.quiz-option');
      opts.forEach((opt, idx) => {
        if (idx === q.answer) opt.classList.add('correct');
        else if (idx === oi && oi !== q.answer) opt.classList.add('wrong');
        opt.classList.add('disabled');
      });
      if (q.explanation) {
        const exp = document.createElement('div');
        exp.className = 'quiz-explanation';
        exp.textContent = q.explanation;
        qDiv.appendChild(exp);
      }
      if (Object.keys(answered).length === questions.length) showScore();
    }

    function showScore() {
      let correct = 0;
      questions.forEach((q, qi) => { if (answered[qi] === q.answer) correct++; });
      const total = questions.length;
      const passed = correct >= Math.ceil(total * 0.6);

      if (chapterKey) setChapterProgress(chapterKey, correct, total);

      const bar = document.createElement('div');
      bar.className = 'quiz-score-bar';
      const scoreText = document.createElement('span');
      scoreText.className = 'score-text';
      scoreText.textContent = 'Score: ' + correct + ' / ' + total;
      const badge = document.createElement('span');
      badge.className = 'score-badge ' + (passed ? 'pass' : 'fail');
      badge.textContent = passed ? 'Passed!' : 'Try Again';
      bar.appendChild(scoreText);
      bar.appendChild(badge);
      container.appendChild(bar);
    }

    render();
  }

  // ---------- Tabs ----------
  function initTabs(barId) {
    const bar = document.getElementById(barId);
    if (!bar) return;
    const btns = bar.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        document.querySelectorAll('.tab-pane').forEach(p => {
          p.classList.toggle('active', p.id === target);
        });
      });
    });
  }

  // ---------- Landing Page Badges ----------
  function updateLandingBadges() {
    const data = loadProgress();
    document.querySelectorAll('.chapter-card').forEach(card => {
      const key = card.dataset.chapter;
      if (key && data[key] && data[key].completed) {
        const existing = card.querySelector('.ch-badge');
        if (!existing) {
          const badge = document.createElement('div');
          badge.className = 'ch-badge';
          const icon = document.createElement('i');
          icon.className = 'fas fa-check-circle';
          badge.appendChild(icon);
          badge.appendChild(document.createTextNode(' Completed'));
          card.querySelector('.ch-content').appendChild(badge);
        }
      }
    });
    // overall progress bar
    const totalChapters = document.querySelectorAll('.chapter-card').length;
    let completed = 0;
    document.querySelectorAll('.chapter-card').forEach(c => {
      const k = c.dataset.chapter;
      if (k && data[k] && data[k].completed) completed++;
    });
    const pct = totalChapters > 0 ? Math.round((completed / totalChapters) * 100) : 0;
    const fill = document.getElementById('progressFill');
    if (fill) fill.style.width = pct + '%';
    const pctText = document.getElementById('progressPct');
    if (pctText) pctText.textContent = pct + '%';
  }

  // ---------- Init ----------
  function init() {
    initTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  }

  return { init, initQuiz, initTabs, updateLandingBadges, resetAllProgress, getChapterProgress, setChapterProgress };
})();

document.addEventListener('DOMContentLoaded', VB.init);
