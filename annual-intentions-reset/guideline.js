(() => {
  'use strict';

  // -- DOM refs --
  const themeToggle = document.getElementById('themeToggle');
  const tocToggle = document.getElementById('tocToggle');
  const tocSidebar = document.getElementById('tocSidebar');
  const tocBackdrop = document.getElementById('tocBackdrop');
  const tocClose = document.getElementById('tocClose');
  const tocList = document.getElementById('tocList');
  const scrollProgress = document.getElementById('scrollProgress');
  const panelToggle = document.getElementById('panelToggle');
  const panelCloseBtn = document.getElementById('panelCloseBtn');
  const splitLayout = document.getElementById('splitLayout');
  const panelSections = document.querySelectorAll('.panel-section');

  const STORAGE_PREFIX = 'guide-';

  // -- Theme --
  function initTheme() {
    const saved = localStorage.getItem('ar-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ar-theme', next);
  }

  // -- Scroll Progress --
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }

  // -- Table of Contents --
  function buildTOC() {
    const sections = document.querySelectorAll('.guide-section');
    sections.forEach(section => {
      const id = section.id;
      const title = section.querySelector('.section-title');
      const number = section.querySelector('.section-number');
      if (!title || !id) return;

      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + id;
      a.dataset.section = id;
      a.textContent = (number ? number.textContent + '  ' : '') + title.textContent;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth' });
        closeTOC();
      });
      li.appendChild(a);
      tocList.appendChild(li);
    });
  }

  function openTOC() {
    tocSidebar.classList.add('open');
    tocBackdrop.classList.add('open');
  }

  function closeTOC() {
    tocSidebar.classList.remove('open');
    tocBackdrop.classList.remove('open');
  }

  // -- Interactive Panel --
  function openPanel() {
    splitLayout.classList.add('panel-open');
    panelToggle.classList.add('active');
    localStorage.setItem(STORAGE_PREFIX + 'panel', 'open');
  }

  function closePanel() {
    splitLayout.classList.remove('panel-open');
    panelToggle.classList.remove('active');
    localStorage.setItem(STORAGE_PREFIX + 'panel', 'closed');
  }

  function togglePanel() {
    if (splitLayout.classList.contains('panel-open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  const interactPanel = document.getElementById('interactPanel');

  function showPanelSection(sectionId) {
    panelSections.forEach(ps => {
      ps.classList.toggle('active', ps.dataset.for === sectionId);
    });
    // Scroll panel to top so content is at eye level
    if (interactPanel) {
      interactPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // -- Active section tracking --
  let currentSection = '';

  function updateActiveSection() {
    const sections = document.querySelectorAll('.guide-section');
    const links = tocList.querySelectorAll('a');
    let found = '';

    // Find the section most visible in viewport (top third of screen)
    const trigger = window.innerHeight * 0.35;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= trigger) {
        found = section.id;
      }
    });

    // If scrolled to very top (hero area), show foundation
    if (!found && window.scrollY < 200) {
      found = 'foundation';
    }

    if (found && found !== currentSection) {
      currentSection = found;
      showPanelSection(found);
    }

    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  }

  // -- Scroll handler (throttled) --
  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateActiveSection();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  // -- Assessment Sliders --
  function initAssessment() {
    const sliders = document.querySelectorAll('.assess-slider');
    sliders.forEach(slider => {
      const key = slider.dataset.assess;
      const saved = localStorage.getItem(STORAGE_PREFIX + 'assess-' + key);
      if (saved) slider.value = saved;
      document.getElementById('val-' + key).textContent = slider.value;

      slider.addEventListener('input', () => {
        document.getElementById('val-' + key).textContent = slider.value;
        localStorage.setItem(STORAGE_PREFIX + 'assess-' + key, slider.value);
        updateProductivityScore();
      });
    });
    updateProductivityScore();
  }

  function updateProductivityScore() {
    const faith = parseInt(document.querySelector('[data-assess="faith"]').value);
    const focus = parseInt(document.querySelector('[data-assess="focus"]').value);
    const fitness = parseInt(document.querySelector('[data-assess="fitness"]').value);
    const score = faith * focus * fitness;
    document.getElementById('assessScore').textContent = score;
  }

  // -- Checklists --
  function initChecklists() {
    const groups = [
      { selector: '[data-check="barakah"]', countId: 'barakahCount', progressId: 'barakahProgress', storageKey: 'barakah-checks' },
      { selector: '[data-check="monthly"]', countId: 'monthlyCount', progressId: 'monthlyProgress', storageKey: 'monthly-checks' },
      { selector: '[data-check="weekly"]', countId: null, progressId: null, storageKey: 'weekly-checks' },
      { selector: '[data-check="daily"]', countId: 'dailyCount', progressId: 'dailyProgress', storageKey: 'daily-checks' },
      { selector: '[data-check="pro"]', countId: 'proCount', progressId: 'proProgress', storageKey: 'pro-checks' },
    ];

    groups.forEach(group => {
      const checks = document.querySelectorAll(group.selector);
      const saved = JSON.parse(localStorage.getItem(STORAGE_PREFIX + group.storageKey) || '[]');

      checks.forEach((cb, i) => {
        if (saved[i]) cb.checked = true;

        cb.addEventListener('change', () => {
          const states = [];
          checks.forEach(c => states.push(c.checked));
          localStorage.setItem(STORAGE_PREFIX + group.storageKey, JSON.stringify(states));
          updateChecklistProgress(checks, group.countId, group.progressId);
        });
      });

      updateChecklistProgress(checks, group.countId, group.progressId);
    });
  }

  function updateChecklistProgress(checks, countId, progressId) {
    const total = checks.length;
    let checked = 0;
    checks.forEach(c => { if (c.checked) checked++; });
    if (countId) document.getElementById(countId).textContent = checked;
    if (progressId) document.getElementById(progressId).style.width = (total > 0 ? (checked / total) * 100 : 0) + '%';
  }

  // -- Intention Fields --
  function initIntentions() {
    const fields = document.querySelectorAll('.intention-input');
    fields.forEach(f => {
      const key = STORAGE_PREFIX + 'intention-' + f.dataset.domain;
      const saved = localStorage.getItem(key);
      if (saved) f.value = saved;
    });

    document.getElementById('saveIntentions').addEventListener('click', () => {
      fields.forEach(f => {
        localStorage.setItem(STORAGE_PREFIX + 'intention-' + f.dataset.domain, f.value);
      });
      showFeedback('intentionFeedback', 'Intentions saved');
    });
  }

  // -- Weekly Priorities --
  function initWeeklyPriorities() {
    const inputs = document.querySelectorAll('.priority-input');
    inputs.forEach(inp => {
      const key = STORAGE_PREFIX + 'priority-' + inp.dataset.priority;
      const saved = localStorage.getItem(key);
      if (saved) inp.value = saved;
    });

    document.getElementById('saveWeekly').addEventListener('click', () => {
      inputs.forEach(inp => {
        localStorage.setItem(STORAGE_PREFIX + 'priority-' + inp.dataset.priority, inp.value);
      });
      showFeedback('weeklyFeedback', 'Weekly plan saved');
    });
  }

  // -- Monthly Reflection --
  function initMonthlyReflection() {
    const textarea = document.getElementById('monthlyReflection');
    const saved = localStorage.getItem(STORAGE_PREFIX + 'monthly-reflection');
    if (saved) textarea.value = saved;

    document.getElementById('saveMonthly').addEventListener('click', () => {
      localStorage.setItem(STORAGE_PREFIX + 'monthly-reflection', textarea.value);
      showFeedback('monthlyFeedback', 'Reflection saved');
    });
  }

  // -- Quick Niyyah --
  function initQuickNiyyah() {
    const textarea = document.getElementById('quickNiyyah');
    const saved = localStorage.getItem(STORAGE_PREFIX + 'quick-niyyah');
    if (saved) textarea.value = saved;

    textarea.addEventListener('input', () => {
      localStorage.setItem(STORAGE_PREFIX + 'quick-niyyah', textarea.value);
    });
  }

  // -- Habit Tracker --
  function initHabitTracker() {
    const cells = document.querySelectorAll('.ht-cell');
    const saved = JSON.parse(localStorage.getItem(STORAGE_PREFIX + 'habit-tracker') || '{}');

    cells.forEach(cell => {
      const row = cell.closest('.habit-tracker-row');
      const habit = row.dataset.habit;
      const day = cell.dataset.day;
      const key = habit + '-' + day;

      if (saved[key]) cell.classList.add('checked');

      cell.addEventListener('click', () => {
        cell.classList.toggle('checked');
        const states = {};
        document.querySelectorAll('.ht-cell').forEach(c => {
          const r = c.closest('.habit-tracker-row');
          const k = r.dataset.habit + '-' + c.dataset.day;
          if (c.classList.contains('checked')) states[k] = true;
        });
        localStorage.setItem(STORAGE_PREFIX + 'habit-tracker', JSON.stringify(states));
        updateHabitStats();
      });
    });

    document.getElementById('resetHabits').addEventListener('click', () => {
      cells.forEach(c => c.classList.remove('checked'));
      localStorage.removeItem(STORAGE_PREFIX + 'habit-tracker');
      updateHabitStats();
    });

    updateHabitStats();
  }

  function updateHabitStats() {
    const cells = document.querySelectorAll('.ht-cell');
    let total = cells.length;
    let checked = 0;
    cells.forEach(c => { if (c.classList.contains('checked')) checked++; });
    document.getElementById('habitTotal').textContent = checked;
    document.getElementById('habitPercent').textContent = (total > 0 ? Math.round((checked / total) * 100) : 0) + '%';
  }

  // -- Feedback --
  function showFeedback(elId, message) {
    const el = document.getElementById(elId);
    el.textContent = message;
    setTimeout(() => { el.textContent = ''; }, 2500);
  }

  // -- Keyboard --
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (tocSidebar.classList.contains('open')) {
        closeTOC();
        e.preventDefault();
      }
    }
  });

  // -- Event listeners --
  themeToggle.addEventListener('click', toggleTheme);
  tocToggle.addEventListener('click', () => {
    tocSidebar.classList.contains('open') ? closeTOC() : openTOC();
  });
  tocClose.addEventListener('click', closeTOC);
  tocBackdrop.addEventListener('click', closeTOC);
  panelToggle.addEventListener('click', togglePanel);
  panelCloseBtn.addEventListener('click', closePanel);
  window.addEventListener('scroll', onScroll, { passive: true });

  // -- Init --
  initTheme();
  buildTOC();
  updateScrollProgress();
  initAssessment();
  initChecklists();
  initIntentions();
  initWeeklyPriorities();
  initMonthlyReflection();
  initQuickNiyyah();
  initHabitTracker();

  // On mobile/tablet, restore panel state; on desktop panel is always visible via CSS
  if (window.innerWidth <= 1024) {
    const panelState = localStorage.getItem(STORAGE_PREFIX + 'panel');
    if (panelState === 'open') {
      openPanel();
    }
  }

  // Show first section's panel by default
  updateActiveSection();
  if (!currentSection) {
    showPanelSection('foundation');
  }

  // Mark panel as JS-ready so CSS fallback stops
  document.querySelector('.panel-inner').classList.add('js-ready');
})();
