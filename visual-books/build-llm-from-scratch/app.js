/* ============================================================
   Visual Book: Build an LLM From Scratch — Shared App Logic
   ============================================================ */

const VB = (() => {
  const STORAGE_KEY = 'vb-llm-progress';
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
    if (btn) btn.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  // ---------- Quiz Engine ----------
  function initQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chapterKey = document.body.dataset.chapter;
    let answered = {}; // questionIndex → chosenOptionIndex

    function render() {
      container.innerHTML = '';
      questions.forEach((q, qi) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'quiz-question';
        qDiv.id = `q-${qi}`;

        const qText = document.createElement('p');
        qText.className = 'q-text';
        qText.innerHTML = `<span class="q-num">Q${qi + 1}.</span> ${q.question}`;
        qDiv.appendChild(qText);

        const opts = document.createElement('div');
        opts.className = 'quiz-options';
        q.options.forEach((opt, oi) => {
          const label = document.createElement('div');
          label.className = 'quiz-option';
          label.dataset.qi = qi;
          label.dataset.oi = oi;
          label.innerHTML = `<span class="opt-label">${String.fromCharCode(65 + oi)}</span><span>${opt}</span>`;
          label.addEventListener('click', () => selectOption(qi, oi));
          opts.appendChild(label);
        });
        qDiv.appendChild(opts);

        const expl = document.createElement('div');
        expl.className = 'q-explanation';
        expl.id = `expl-${qi}`;
        qDiv.appendChild(expl);

        container.appendChild(qDiv);
      });

      // Actions row
      const actions = document.createElement('div');
      actions.className = 'quiz-actions';

      const submitBtn = document.createElement('button');
      submitBtn.className = 'btn btn-primary';
      submitBtn.id = 'quizSubmit';
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submit Quiz';
      submitBtn.addEventListener('click', submitQuiz);
      actions.appendChild(submitBtn);

      const retakeBtn = document.createElement('button');
      retakeBtn.className = 'btn btn-ghost';
      retakeBtn.id = 'quizRetake';
      retakeBtn.style.display = 'none';
      retakeBtn.innerHTML = '<i class="fas fa-redo"></i> Retake Quiz';
      retakeBtn.addEventListener('click', retakeQuiz);
      actions.appendChild(retakeBtn);

      const scoreEl = document.createElement('span');
      scoreEl.className = 'quiz-score';
      scoreEl.id = 'quizScore';
      actions.appendChild(scoreEl);

      container.appendChild(actions);

      // Restore saved state
      const saved = getChapterProgress(chapterKey);
      if (saved && saved.submitted) {
        answered = saved.answered || {};
        restoreSubmittedState();
      }
    }

    function selectOption(qi, oi) {
      if (answered[qi] !== undefined && answered[qi] !== -1) return; // locked after submit
      const opts = container.querySelectorAll(`.quiz-option[data-qi="${qi}"]`);
      opts.forEach(o => o.classList.remove('selected'));
      opts[oi].classList.add('selected');
      answered[qi] = oi;
    }

    function submitQuiz() {
      let score = 0;
      questions.forEach((q, qi) => {
        const chosen = answered[qi];
        const opts = container.querySelectorAll(`.quiz-option[data-qi="${qi}"]`);
        opts.forEach(o => o.classList.add('locked'));
        opts.forEach((o, oi) => {
          o.classList.remove('selected');
          if (oi === q.correct) o.classList.add('correct');
          else if (oi === chosen && chosen !== q.correct) o.classList.add('wrong');
        });
        if (chosen === q.correct) score++;

        const expl = document.getElementById(`expl-${qi}`);
        if (expl && q.explanation) {
          expl.textContent = q.explanation;
          expl.classList.add('visible');
        }
      });

      const pct = Math.round((score / questions.length) * 100);
      const scoreEl = document.getElementById('quizScore');
      if (scoreEl) {
        scoreEl.textContent = `${score} / ${questions.length} (${pct}%)`;
        scoreEl.classList.add('visible');
        scoreEl.classList.add(pct >= 70 ? 'excellent' : 'needs-work');
      }

      const submitBtn = document.getElementById('quizSubmit');
      if (submitBtn) submitBtn.style.display = 'none';
      const retakeBtn = document.getElementById('quizRetake');
      if (retakeBtn) retakeBtn.style.display = 'inline-flex';

      if (chapterKey) setChapterProgress(chapterKey, score, questions.length);
    }

    function restoreSubmittedState() {
      submitQuiz();
    }

    function retakeQuiz() {
      answered = {};
      const prog = loadProgress();
      if (chapterKey && prog[chapterKey]) {
        delete prog[chapterKey].submitted;
        delete prog[chapterKey].answered;
        saveProgress(prog);
      }
      render();
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
        document.querySelectorAll('.tab-panel').forEach(p => {
          p.classList.toggle('active', p.id === target);
        });
      });
    });
  }

  // ---------- Progress Bar ----------
  function initProgressBar(totalLessons) {
    const fill = document.querySelector('.chapter-progress-fill');
    if (!fill) return;
    const chapterKey = document.body.dataset.chapter;
    const saved = getChapterProgress(chapterKey);
    const pct = saved && saved.completed ? 100 : (saved ? 60 : 0);
    fill.style.width = pct + '%';
  }

  // ---------- Landing Stats ----------
  function renderLandingStats() {
    const chapters = ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','app-a','app-b','app-c','app-d','app-e'];
    const progress = loadProgress();
    let totalScore = 0, totalQ = 0, completed = 0;
    chapters.forEach(k => {
      const p = progress[k];
      if (p) {
        totalScore += p.quizScore || 0;
        totalQ     += p.quizTotal || 0;
        if (p.completed) completed++;
      }
    });

    const elCompleted = document.getElementById('statCompleted');
    const elScore     = document.getElementById('statScore');
    const elPct       = document.getElementById('statPct');
    if (elCompleted) elCompleted.textContent = completed;
    if (elScore)     elScore.textContent = `${totalScore}/${totalQ}`;
    if (elPct)       elPct.textContent   = totalQ ? Math.round((totalScore/totalQ)*100) + '%' : '—';

    // Update chapter cards
    chapters.forEach(k => {
      const card = document.querySelector(`[data-chapter-key="${k}"]`);
      if (!card) return;
      const p = progress[k];
      const statusEl = card.querySelector('.card-status');
      if (!statusEl) return;
      if (p && p.completed) {
        statusEl.textContent = `✓ ${p.quizScore}/${p.quizTotal}`;
        statusEl.className = 'card-status completed';
      } else if (p && p.quizScore !== undefined) {
        statusEl.textContent = `${p.quizScore}/${p.quizTotal}`;
        statusEl.className = 'card-status in-progress';
      }
    });
  }

  // ---------- Reset Modal ----------
  function initResetModal() {
    const openBtn  = document.getElementById('resetAllBtn');
    const overlay  = document.getElementById('resetModal');
    const cancelBtn = document.getElementById('resetCancel');
    const confirmBtn = document.getElementById('resetConfirm');

    if (!openBtn || !overlay) return;

    openBtn.addEventListener('click', () => overlay.classList.add('open'));
    if (cancelBtn) cancelBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
    if (confirmBtn) confirmBtn.addEventListener('click', () => resetAllProgress());
  }

  // ---------- Copy Buttons ----------
  function initCopyButtons() {
    document.querySelectorAll('.code-block').forEach(block => {
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.addEventListener('click', () => {
        const code = block.innerText.replace('Copy', '').trim();
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        });
      });
      block.appendChild(btn);
    });
  }

  // ---------- Auto-init ----------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    initCopyButtons();
    if (document.getElementById('statCompleted')) renderLandingStats();
    initResetModal();
    const progressFill = document.querySelector('.chapter-progress-fill');
    if (progressFill) initProgressBar();
  });

  // ---------- Public API ----------
  return { initQuiz, initTabs, initProgressBar, renderLandingStats, resetAllProgress, toggleTheme, getChapterProgress, setChapterProgress };
})();
