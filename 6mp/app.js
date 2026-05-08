/* ──────────────────────────────────────────────────────────────
   The Six-Month Ascent — application logic
   Renders ROUTINE (data.js) into the DOM and persists progress.
   All data fields go through textContent — no HTML injection.
   ────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  var TOTAL_WEEKS = 26;
  var DAYS_PER_MONTH = 28;
  var TOTAL_DAYS = 6 * DAYS_PER_MONTH; // 168
  var STORAGE = {
    theme: 'theme',
    weeks: 'weeksDone',
    days: 'daysDone',
    start: 'startDate',
    calMonth: 'calMonth'
  };

  var activeCalMonth = 0;

  // ─── DOM helpers ───
  function el(tag, opts, children) {
    var node = document.createElement(tag);
    if (opts) {
      if (opts.className) node.className = opts.className;
      if (opts.id) node.id = opts.id;
      if (opts.text != null) node.textContent = opts.text;
      if (opts.title) node.title = opts.title;
      if (opts.href) node.setAttribute('href', opts.href);
      if (opts.style) {
        for (var k in opts.style) if (opts.style.hasOwnProperty(k)) node.style[k] = opts.style[k];
      }
      if (opts.data) {
        for (var d in opts.data) if (opts.data.hasOwnProperty(d)) node.dataset[d] = opts.data[d];
      }
    }
    if (children) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (c == null) continue;
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    }
    return node;
  }

  // ─── Compile date stamp ───
  function stampDate() {
    var opts = { year: 'numeric', month: 'short', day: '2-digit' };
    var stamp = document.getElementById('todayStamp');
    if (stamp) stamp.textContent = 'Compiled ' + new Date().toLocaleDateString('en-US', opts);
  }

  // ─── Theme toggle ───
  function initTheme() {
    var topLine = document.querySelector('.top-line');
    if (!topLine) return;

    var dot = el('span', { className: 'dot' });
    var label = el('span', { id: 'themeLabel', text: 'Day mode' });
    var btn = el('button', { className: 'toggle' }, [dot, label]);
    topLine.appendChild(btn);

    btn.addEventListener('click', function () {
      var cur = document.body.getAttribute('data-theme');
      var next = cur === 'night' ? 'day' : 'night';
      document.body.setAttribute('data-theme', next);
      label.textContent = next === 'night' ? 'Day mode' : 'Night mode';
      try { localStorage.setItem(STORAGE.theme, next); } catch (e) {}
    });

    try {
      var saved = localStorage.getItem(STORAGE.theme);
      if (saved) {
        document.body.setAttribute('data-theme', saved);
        label.textContent = saved === 'night' ? 'Day mode' : 'Night mode';
      }
    } catch (e) {}
  }

  // ─── Weekly timeline ───
  function renderTimeline() {
    var tl = document.getElementById('timeline');
    if (!tl) return;

    ROUTINE.weekly.forEach(function (d, i) {
      var col = el('div', {
        className: 'day-col fade-in' + (d.type === 'rest' ? ' rest' : ''),
        style: { animationDelay: (i * 60) + 'ms' }
      });

      col.appendChild(el('div', { className: 'day-head', text: 'Day ' + String(i + 1).padStart(2, '0') }));
      col.appendChild(el('div', { className: 'day-name', text: d.day }));
      col.appendChild(el('div', { className: 'day-budget', text: d.budget + ' · ' + d.type }));

      d.slots.forEach(function (s) {
        var slot = el('div', { className: 'slot' });
        slot.appendChild(el('div', { className: 'slot-time', text: s.time }));

        var task = el('div', { className: 'slot-task' });
        if (s.tag) task.appendChild(el('span', { className: 'tag', text: s.tag }));
        task.appendChild(document.createTextNode(s.task));
        slot.appendChild(task);

        if (s.detail) slot.appendChild(el('div', { className: 'slot-detail', text: s.detail }));
        if (s.done) {
          var done = el('div', { className: 'slot-done' });
          done.appendChild(el('span', { text: s.done }));
          slot.appendChild(done);
        }
        if (s.detail || s.done) {
          var toggle = el('div', { className: 'slot-toggle' }, [el('span', { className: 'label' })]);
          slot.appendChild(toggle);
        }

        col.appendChild(slot);
      });

      tl.appendChild(col);
    });

    tl.addEventListener('click', function (e) {
      var toggle = e.target.closest('.slot-toggle');
      if (!toggle) return;
      var slot = toggle.closest('.slot');
      if (slot) slot.classList.toggle('open');
    });
  }

  // ─── Sticky month nav ───
  function renderMonthNav() {
    var nav = document.getElementById('monthNav');
    if (!nav) return;
    ROUTINE.months.forEach(function (m, i) {
      nav.appendChild(el('a', {
        href: '#month-' + (i + 1),
        text: 'M' + m.num + ' · ' + m.lead + m.accent,
        data: { monthLink: String(i) }
      }));
    });
  }

  // ─── Months ───
  function buildTitle(m) {
    var title = el('div', { className: 'month-title' });
    title.appendChild(document.createTextNode(m.lead));
    title.appendChild(el('em', { text: m.accent }));
    return title;
  }

  function buildFocusCard(label, value) {
    return el('div', { className: 'focus-card' }, [
      el('div', { className: 'lbl', text: label }),
      el('div', { className: 'val', text: value })
    ]);
  }

  function buildWeek(w, weekIdx) {
    var goalsList = el('ul', { className: 'week-goals' });
    w.goals.forEach(function (g) { goalsList.appendChild(el('li', { text: g })); });

    var num = el('div', { className: 'week-num', text: 'Week' });
    num.appendChild(el('span', { className: 'big', text: String(weekIdx + 1).padStart(2, '0') }));

    return el('div', {
      className: 'week',
      data: { week: String(weekIdx) }
    }, [
      num,
      el('div', { className: 'week-content' }, [
        el('div', { className: 'week-headline', text: w.headline }),
        goalsList
      ]),
      el('div', {
        className: 'week-checkbox',
        title: 'Mark week complete',
        data: { weekCheck: String(weekIdx) }
      })
    ]);
  }

  function renderMonths() {
    var grid = document.getElementById('monthGrid');
    if (!grid) return;

    ROUTINE.months.forEach(function (m, mi) {
      var head = el('header', { className: 'month-header', data: { month: String(mi) } }, [
        el('div', { className: 'month-num', text: m.num }),
        el('div', null, [
          buildTitle(m),
          el('div', { className: 'month-thesis', text: m.thesis })
        ]),
        el('div', { className: 'month-toggle', text: '+' })
      ]);

      var focusRow = el('div', { className: 'focus-row' }, [
        buildFocusCard('Book', m.focus.book),
        buildFocusCard('Cert', m.focus.cert),
        buildFocusCard('Project', m.focus.project),
        buildFocusCard('Signal', m.focus.signal)
      ]);

      var weeksWrap = el('div', { className: 'weeks' });
      m.weeks.forEach(function (w, wi) {
        weeksWrap.appendChild(buildWeek(w, mi * 4 + wi));
      });

      var inner = el('div', { className: 'month-inner' }, [focusRow, weeksWrap]);
      var body = el('div', { className: 'month-body' }, [inner]);

      var monthEl = el('article', { className: 'month', id: 'month-' + (mi + 1) }, [head, body]);
      grid.appendChild(monthEl);
    });

    grid.addEventListener('click', function (e) {
      var head = e.target.closest('.month-header');
      if (head) {
        head.parentElement.classList.toggle('open');
        return;
      }
      var cb = e.target.closest('.week-checkbox');
      if (cb) {
        cb.classList.toggle('done');
        saveProgress();
        updateProgress();
      }
    });

    var first = grid.querySelector('.month');
    if (first) first.classList.add('open');
  }

  // ─── Expand / collapse all months ───
  function bindMonthControls() {
    var expand = document.getElementById('expandAll');
    var collapse = document.getElementById('collapseAll');
    if (expand) expand.addEventListener('click', function () {
      document.querySelectorAll('.month').forEach(function (m) { m.classList.add('open'); });
    });
    if (collapse) collapse.addEventListener('click', function () {
      document.querySelectorAll('.month').forEach(function (m) { m.classList.remove('open'); });
    });
  }

  // ─── Deliverables ───
  function renderDeliverables() {
    var g = document.getElementById('delivGrid');
    if (!g) return;
    ROUTINE.deliverables.forEach(function (d, i) {
      var card = el('div', {
        className: 'deliv fade-in',
        style: { animationDelay: (i * 50) + 'ms' }
      }, [
        el('span', { className: 'icon', text: d.icon }),
        el('div', { className: 'name', text: d.name }),
        el('div', { className: 'desc', text: d.desc })
      ]);
      g.appendChild(card);
    });
  }

  // ─── Progress persistence ───
  function saveProgress() {
    try {
      var done = Array.prototype.slice
        .call(document.querySelectorAll('.week-checkbox.done'))
        .map(function (e) { return +e.dataset.weekCheck; });
      localStorage.setItem(STORAGE.weeks, JSON.stringify(done));
    } catch (e) {}
  }

  function loadProgress() {
    try {
      var done = JSON.parse(localStorage.getItem(STORAGE.weeks) || '[]');
      done.forEach(function (idx) {
        var node = document.querySelector('[data-week-check="' + idx + '"]');
        if (node) node.classList.add('done');
      });
    } catch (e) {}
  }

  function updateProgress() {
    var total = document.querySelectorAll('.week-checkbox').length;
    var done = document.querySelectorAll('.week-checkbox.done').length;
    var pct = total ? Math.round((done / total) * 100) : 0;
    var fill = document.getElementById('progressFill');
    var pctEl = document.getElementById('progressPct');
    var cnt = document.getElementById('progressCount');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
    if (cnt) cnt.textContent = done + ' / ' + total;
  }

  function resetProgress() {
    if (!confirm('Reset all week progress?')) return;
    document.querySelectorAll('.week-checkbox.done').forEach(function (n) {
      n.classList.remove('done');
    });
    saveProgress();
    updateProgress();
  }

  // ─── Day-by-day calendar ───
  function dayInfo(absDay) {
    var monthIdx = Math.floor(absDay / DAYS_PER_MONTH);
    var dayInMonth = absDay % DAYS_PER_MONTH;
    var weekInMonth = Math.floor(dayInMonth / 7);
    var weekday = dayInMonth % 7;
    return {
      absDay: absDay,
      dayInMonth: dayInMonth,
      monthIdx: monthIdx,
      weekInMonth: weekInMonth,
      weekday: weekday,
      month: ROUTINE.months[monthIdx],
      week: ROUTINE.months[monthIdx].weeks[weekInMonth],
      pattern: ROUTINE.weekly[weekday]
    };
  }

  function specialiseTask(slot, weekday, plan) {
    if (!plan) return slot.task;
    var tag = slot.tag;
    switch (tag) {
      case 'Read':
        return plan.read ? plan.read : slot.task;
      case 'Cert':
        if (weekday === 1) return plan.cert || slot.task;          // Tue: video module
        if (weekday === 2) return plan.certPractice || slot.task;  // Wed: practice
        return slot.task;
      case 'DSA':
        return plan.dsa || slot.task;
      case 'Write':
        return plan.blog ? "Draft: '" + plan.blog + "'" : slot.task;
      case 'Build':
        return plan.build || slot.task;
      case 'ADR':
        return plan.adr && plan.adr !== '—' ? plan.adr : slot.task;
      case 'Ship':
        return plan.blog ? "Publish: '" + plan.blog + "'" : slot.task;
      default:
        return slot.task;
    }
  }

  function summariseTasks(slots, weekday, plan) {
    return slots.map(function (s) {
      var t = specialiseTask(s, weekday, plan);
      return (s.tag ? s.tag.toLowerCase() + ': ' : '') + t;
    }).join(' · ');
  }

  function renderCalTabs() {
    var tabs = document.getElementById('calTabs');
    if (!tabs) return;
    tabs.textContent = '';
    ROUTINE.months.forEach(function (m, i) {
      var btn = el('button', {
        className: 'cal-tab' + (i === activeCalMonth ? ' is-active' : ''),
        text: 'Month ' + m.num,
        title: m.lead + m.accent,
        data: { calTab: String(i) }
      });
      btn.setAttribute('type', 'button');
      btn.addEventListener('click', function () { setActiveCalMonth(i); });
      tabs.appendChild(btn);
    });
  }

  function renderCalMeta() {
    var meta = document.getElementById('calMeta');
    if (!meta) return;
    meta.textContent = '';
    var m = ROUTINE.months[activeCalMonth];
    var title = el('div', { className: 'cal-title' });
    title.appendChild(document.createTextNode('Month ' + m.num + ' · ' + m.lead));
    title.appendChild(el('em', { text: m.accent }));
    var thesis = el('div', { className: 'cal-thesis', text: m.thesis });
    meta.appendChild(title);
    meta.appendChild(thesis);
  }

  function buildSlot(s, weekday, plan) {
    var task = el('div', { className: 'x-task' });
    if (s.tag) task.appendChild(el('span', { className: 'ttag', text: s.tag }));
    task.appendChild(document.createTextNode(specialiseTask(s, weekday, plan)));

    var slot = el('div', { className: 'x-slot' }, [
      el('div', { className: 'x-time', text: s.time }),
      task
    ]);
    if (s.detail) slot.appendChild(el('div', { className: 'x-detail', text: s.detail }));
    if (s.done) {
      var done = el('div', { className: 'x-done' });
      done.appendChild(el('span', { text: s.done }));
      slot.appendChild(done);
    }
    return slot;
  }

  function buildExpand(info) {
    var slotsList = el('div', { className: 'slots-list' });
    info.pattern.slots.forEach(function (s) { slotsList.appendChild(buildSlot(s, info.weekday, info.week.plan)); });

    var ctxList = el('ul');
    info.week.goals.forEach(function (g) { ctxList.appendChild(el('li', { text: g })); });

    return el('div', { className: 'dexpand' }, [
      el('div', { className: 'col-slots' }, [
        el('div', { className: 'col-title', text: "Today's slots" }),
        slotsList
      ]),
      el('div', { className: 'week-context' }, [
        el('div', { className: 'col-title', text: 'Week ' + (info.monthIdx * 4 + info.weekInMonth + 1) + ' context' }),
        el('div', { className: 'ctx-headline', text: info.week.headline }),
        ctxList
      ])
    ]);
  }

  function buildDayCard(absDay) {
    var info = dayInfo(absDay);
    var p = info.pattern;
    var primarySlot = p.slots[0];
    var primaryTag = primarySlot && primarySlot.tag ? primarySlot.tag : p.type.toUpperCase();

    var card = el('div', {
      className: 'cal-day' + (p.type === 'rest' ? ' is-rest' : '') + (p.type === 'build' ? ' is-build' : ''),
      data: { absDay: String(absDay), dayInMonth: String(info.dayInMonth) }
    });

    var dnum = el('span', { className: 'dnum', text: 'D' + String(info.dayInMonth + 1).padStart(2, '0') });
    var dname = el('span', { className: 'dname', text: p.day + ' · ' + p.budget });
    card.appendChild(el('div', { className: 'row1' }, [dnum, dname]));
    card.appendChild(el('span', { className: 'dtype', text: primaryTag }));
    card.appendChild(el('div', { className: 'dsummary', text: summariseTasks(p.slots, info.weekday, info.week.plan) }));

    var check = el('div', { className: 'dcheck', title: 'Mark day complete' });
    card.appendChild(check);

    var toggle = el('div', { className: 'dtoggle', title: 'Expand / collapse' });
    card.appendChild(toggle);

    card.appendChild(buildExpand(info));

    return card;
  }

  function renderCalGrid() {
    var grid = document.getElementById('calGrid');
    if (!grid) return;
    grid.textContent = '';
    var base = activeCalMonth * DAYS_PER_MONTH;
    for (var i = 0; i < DAYS_PER_MONTH; i++) {
      grid.appendChild(buildDayCard(base + i));
    }
    loadDaysDone();
    markTodayCell();
  }

  function setActiveCalMonth(i) {
    if (i < 0 || i >= ROUTINE.months.length) return;
    activeCalMonth = i;
    try { localStorage.setItem(STORAGE.calMonth, String(i)); } catch (e) {}
    document.querySelectorAll('#calTabs .cal-tab').forEach(function (b) {
      b.classList.toggle('is-active', +b.dataset.calTab === i);
    });
    renderCalMeta();
    renderCalGrid();
  }

  function bindCalendar() {
    var grid = document.getElementById('calGrid');
    if (!grid) return;

    grid.addEventListener('click', function (e) {
      var card = e.target.closest('.cal-day');
      if (!card) return;

      // Checkbox: mark day done
      if (e.target.closest('.dcheck')) {
        e.stopPropagation();
        card.classList.toggle('is-done');
        saveDaysDone();
        return;
      }

      // Don't collapse when interacting inside the expanded panel
      if (card.classList.contains('is-open') && e.target.closest('.dexpand')) return;

      // Toggle open: close any other first
      var alreadyOpen = card.classList.contains('is-open');
      grid.querySelectorAll('.cal-day.is-open').forEach(function (n) { n.classList.remove('is-open'); });
      if (!alreadyOpen) card.classList.add('is-open');
    });
  }

  function saveDaysDone() {
    try {
      var done = Array.prototype.slice
        .call(document.querySelectorAll('.cal-day.is-done'))
        .map(function (n) { return +n.dataset.absDay; });
      var prev = JSON.parse(localStorage.getItem(STORAGE.days) || '[]');
      var merged = mergeIntoMonth(prev, activeCalMonth, done);
      localStorage.setItem(STORAGE.days, JSON.stringify(merged));
    } catch (e) {}
  }

  function mergeIntoMonth(prev, monthIdx, currentDone) {
    var min = monthIdx * DAYS_PER_MONTH;
    var max = min + DAYS_PER_MONTH;
    var keep = prev.filter(function (d) { return d < min || d >= max; });
    return keep.concat(currentDone).sort(function (a, b) { return a - b; });
  }

  function loadDaysDone() {
    try {
      var done = JSON.parse(localStorage.getItem(STORAGE.days) || '[]');
      done.forEach(function (idx) {
        var node = document.querySelector('.cal-day[data-abs-day="' + idx + '"]');
        if (node) node.classList.add('is-done');
      });
    } catch (e) {}
  }

  // ─── Today card + today cell highlighting ───
  function currentDayIndex() {
    var input = document.getElementById('startDate');
    if (!input || !input.value) return -1;
    var start = new Date(input.value);
    var today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (today < start) return -1;
    var diff = Math.floor((today - start) / 86400000);
    if (diff >= TOTAL_DAYS) return -1;
    return diff;
  }

  function renderTodayCard() {
    var card = document.getElementById('todayCard');
    if (!card) return;
    card.textContent = '';

    var idx = currentDayIndex();
    if (idx < 0) {
      card.hidden = true;
      return;
    }

    var info = dayInfo(idx);
    var p = info.pattern;

    var stamp = el('div', { className: 'stamp' }, [
      el('div', { className: 'day-num', text: 'D' + String(info.dayInMonth + 1).padStart(2, '0') }),
      el('div', { className: 'day-meta', text: 'Month ' + info.month.num + ' · ' + p.day + ' · ' + p.budget + ' · ' + p.type })
    ]);

    var tasks = el('div', { className: 'tasks' });
    p.slots.forEach(function (s) {
      var taskCol = el('div');
      if (s.tag) taskCol.appendChild(el('span', { className: 'ttag', text: s.tag }));
      taskCol.appendChild(document.createTextNode(specialiseTask(s, info.weekday, info.week.plan)));

      tasks.appendChild(el('div', { className: 'tline' }, [
        el('span', { className: 'ttime', text: s.time }),
        taskCol
      ]));
    });

    var body = el('div', { className: 'body' }, [
      el('div', { className: 'headline', text: info.week.headline }),
      tasks
    ]);

    card.appendChild(stamp);
    card.appendChild(body);
    card.hidden = false;
  }

  function markTodayCell() {
    document.querySelectorAll('.cal-day.is-today').forEach(function (n) { n.classList.remove('is-today'); });
    var idx = currentDayIndex();
    if (idx < 0) return;
    var node = document.querySelector('.cal-day[data-abs-day="' + idx + '"]');
    if (node) node.classList.add('is-today');
  }

  function initCalendar() {
    try {
      var savedMonth = localStorage.getItem(STORAGE.calMonth);
      if (savedMonth != null) activeCalMonth = +savedMonth || 0;
    } catch (e) {}

    // If we know today, default to that month
    var today = currentDayIndex();
    if (today >= 0) activeCalMonth = Math.floor(today / DAYS_PER_MONTH);

    renderCalTabs();
    renderCalMeta();
    renderCalGrid();
    bindCalendar();
  }

  // ─── Start date + current-week detection ───
  function initStartDate() {
    var input = document.getElementById('startDate');
    if (!input) return;

    try {
      var saved = localStorage.getItem(STORAGE.start);
      if (saved) input.value = saved;
    } catch (e) {}

    input.addEventListener('change', function () {
      try { localStorage.setItem(STORAGE.start, input.value); } catch (e) {}
      markCurrentWeek();
      var idx = currentDayIndex();
      if (idx >= 0) {
        activeCalMonth = Math.floor(idx / DAYS_PER_MONTH);
        renderCalTabs();
        renderCalMeta();
        renderCalGrid();
      }
      renderTodayCard();
      markTodayCell();
    });

    markCurrentWeek();
    renderTodayCard();
    markTodayCell();
  }

  function markCurrentWeek() {
    var input = document.getElementById('startDate');
    var tag = document.getElementById('currentWeekTag');

    document.querySelectorAll('.week.is-current').forEach(function (n) { n.classList.remove('is-current'); });
    document.querySelectorAll('.month.is-current').forEach(function (n) { n.classList.remove('is-current'); });
    document.querySelectorAll('.month-nav a.is-current').forEach(function (n) { n.classList.remove('is-current'); });

    if (!input || !input.value) {
      if (tag) tag.textContent = 'Set a start date →';
      return;
    }

    var start = new Date(input.value);
    var today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (today < start) {
      if (tag) tag.textContent = 'Starts ' + start.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      return;
    }

    var diffDays = Math.floor((today - start) / 86400000);
    var weekIdx = Math.floor(diffDays / 7);

    if (weekIdx >= TOTAL_WEEKS) {
      if (tag) tag.textContent = 'Plan complete';
      return;
    }

    var weekEl = document.querySelector('[data-week="' + weekIdx + '"]');
    if (weekEl) weekEl.classList.add('is-current');

    var monthIdx = Math.floor(weekIdx / 4);
    var monthEl = document.getElementById('month-' + (monthIdx + 1));
    if (monthEl) monthEl.classList.add('is-current', 'open');

    var navLink = document.querySelector('.month-nav a[data-month-link="' + monthIdx + '"]');
    if (navLink) navLink.classList.add('is-current');

    if (tag) tag.textContent = 'Week ' + (weekIdx + 1) + ' / ' + TOTAL_WEEKS;
  }

  // ─── Boot ───
  document.addEventListener('DOMContentLoaded', function () {
    stampDate();
    initTheme();
    renderTimeline();
    renderMonthNav();
    renderMonths();
    bindMonthControls();
    initCalendar();
    renderDeliverables();
    loadProgress();
    updateProgress();
    initStartDate();

    var resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetProgress);
  });
})();
