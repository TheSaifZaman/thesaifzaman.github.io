(function () {
  var data = window.SIX_MONTH_DATA;
  var ar = data.arabic || {};
  document.title = data.pageTitle;

  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      for (var k in props) {
        if (k === 'class') node.className = props[k];
        else if (k === 'html') node.innerHTML = props[k];
        else if (k === 'dataset') {
          for (var d in props.dataset) node.dataset[d] = props.dataset[d];
        } else if (k === 'style') node.setAttribute('style', props[k]);
        else node.setAttribute(k, props[k]);
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

  function arSpan(klass, text, opts) {
    if (!text) return null;
    var tag = opts && opts.tag ? opts.tag : 'span';
    var props = { class: 'sm-arabic ' + (klass || ''), lang: 'ar', dir: 'rtl' };
    if (opts && opts.html) props.html = text;
    return el(tag, props, opts && opts.html ? null : [text]);
  }

  function renderHeader() {
    var titleEl = document.getElementById('sm-title');
    titleEl.innerHTML = data.header.title;
    if (ar.header && ar.header.title) {
      titleEl.appendChild(arSpan('sm-arabic-title', ar.header.title, { html: true }));
    }

    var subtitleEl = document.getElementById('sm-subtitle');
    subtitleEl.textContent = data.header.subtitle;
    if (ar.header && ar.header.subtitle) {
      subtitleEl.parentNode.insertBefore(
        arSpan('sm-arabic-subtitle', ar.header.subtitle, { tag: 'p' }),
        subtitleEl.nextSibling
      );
    }

    var accentEl = document.getElementById('sm-accent');
    accentEl.textContent = data.header.accentLine;
    if (ar.header && ar.header.accentLine) {
      accentEl.parentNode.insertBefore(
        arSpan('sm-arabic-accent', ar.header.accentLine, { tag: 'p' }),
        accentEl.nextSibling
      );
    }

    var stats = document.getElementById('sm-stats');
    data.stats.forEach(function (s, idx) {
      var arLbl = ar.stats && ar.stats[idx];
      var statChildren = [
        el('div', { class: 'sm-stat-num' }, [s.num]),
        el('div', { class: 'sm-stat-lbl' }, [s.lbl])
      ];
      if (arLbl) {
        statChildren.push(arSpan('sm-arabic-stat-lbl', arLbl, { tag: 'div' }));
      }
      stats.appendChild(el('div', { class: 'sm-stat' }, statChildren));
    });

    var pactEl = document.getElementById('sm-pact');
    pactEl.innerHTML = data.pact;
    if (ar.pact) {
      pactEl.parentNode.appendChild(arSpan('sm-arabic-pact', ar.pact, { tag: 'p', html: true }));
    }
  }

  function renderSectionLabels() {
    if (!ar.sections) return;
    var sectionHeads = document.querySelectorAll('.sm-section-head');
    if (sectionHeads[0]) {
      sectionHeads[0].appendChild(
        el('h2', { class: 'sm-arabic sm-arabic-h2', lang: 'ar', dir: 'rtl', html: ar.sections.movementsTitle })
      );
      sectionHeads[0].appendChild(
        arSpan('sm-arabic-section-tag', ar.sections.movementsTag)
      );
    }
    if (sectionHeads[1]) {
      sectionHeads[1].appendChild(
        el('h2', { class: 'sm-arabic sm-arabic-h2', lang: 'ar', dir: 'rtl', html: ar.sections.ownTitle })
      );
      sectionHeads[1].appendChild(
        arSpan('sm-arabic-section-tag', ar.sections.ownTag)
      );
    }
  }

  function renderFocus(focus, arFocus) {
    var wrap = el('div', { class: 'focus-pills' });
    var order = ['book', 'cert', 'project', 'signal', 'deen'];
    order.forEach(function (k) {
      var v = focus[k];
      if (!v || v === '—') return;
      var arLabel = ar.focusLabels && ar.focusLabels[k];
      var arValue = arFocus && arFocus[k];
      var labelChildren = [data.focusLabels[k]];
      if (arLabel) {
        labelChildren.push(arSpan('sm-arabic-inline-label', ' · ' + arLabel));
      }
      var valueChildren = [v];
      if (arValue && arValue !== '—') {
        valueChildren.push(arSpan('sm-arabic-pill-value', arValue, { tag: 'div' }));
      }
      wrap.appendChild(
        el('span', { class: 'focus-pill focus-' + k }, [
          el('span', { class: 'focus-pill-label' }, labelChildren),
          el('span', { class: 'focus-pill-value' }, valueChildren)
        ])
      );
    });
    return wrap;
  }

  function resolveSlotTask(week, slot, arWeek, arSlot) {
    if (slot.source) {
      var v = (week.plan[slot.source] || '').trim();
      if (!v || v === '—') {
        return {
          en: slot.fallback || '— (no work scheduled this slot this week)',
          ar: (arSlot && arSlot.fallback) ? arSlot.fallback : null
        };
      }
      var enText = (slot.prefix || '') + v + (slot.suffix || '');
      var arText = null;
      if (arWeek && arWeek.plan && arWeek.plan[slot.source]) {
        var av = (arWeek.plan[slot.source] || '').trim();
        if (av && av !== '—') {
          var arPre = arSlot && arSlot.prefix !== undefined ? arSlot.prefix : '';
          var arSuf = arSlot && arSlot.suffix !== undefined ? arSlot.suffix : '';
          arText = arPre + av + arSuf;
        }
      }
      return { en: enText, ar: arText };
    }
    return { en: slot.task, ar: arSlot ? arSlot.task : null };
  }

  function renderDayRow(week, dayTpl, arWeek, arDayTpl) {
    var slotsWrap = el('div', { class: 'day-slots' });
    dayTpl.slots.forEach(function (slot, slotIdx) {
      var tagInfo = data.slotTags[slot.tag] || { label: slot.tag, color: 'muted' };
      var arSlotEntry = null;
      if (arDayTpl && arDayTpl.slots) {
        var arRaw = arDayTpl.slots[slotIdx];
        if (typeof arRaw === 'string') {
          arSlotEntry = slot.source ? { prefix: arRaw } : { task: arRaw };
        } else if (arRaw) {
          arSlotEntry = arRaw;
        }
      }
      var taskPair = resolveSlotTask(week, slot, arWeek, arSlotEntry);
      var arTagLabel = ar.slotTags && ar.slotTags[slot.tag];
      var tagChildren = [tagInfo.label];
      if (arTagLabel) {
        tagChildren.push(arSpan('sm-arabic-tag', ' · ' + arTagLabel));
      }
      var taskChildren = [taskPair.en];
      if (taskPair.ar) {
        taskChildren.push(arSpan('sm-arabic-task', taskPair.ar, { tag: 'div' }));
      }
      slotsWrap.appendChild(
        el('div', { class: 'day-slot' }, [
          el('span', { class: 'day-slot-time' }, [slot.time]),
          el('span', { class: 'day-slot-tag day-slot-tag-' + tagInfo.color }, tagChildren),
          el('span', { class: 'day-slot-task' }, taskChildren)
        ])
      );
    });
    var dayLabelChildren = [
      el('div', { class: 'day-name' }, [dayTpl.day]),
      el('div', { class: 'day-budget' }, [dayTpl.budget])
    ];
    if (arDayTpl && arDayTpl.day) {
      dayLabelChildren.push(arSpan('sm-arabic-day-name', arDayTpl.day, { tag: 'div' }));
    }
    if (arDayTpl && arDayTpl.budget) {
      dayLabelChildren.push(arSpan('sm-arabic-day-budget', arDayTpl.budget, { tag: 'div' }));
    }
    return el('div', { class: 'day-row day-row-' + dayTpl.tone }, [
      el('div', { class: 'day-label' }, dayLabelChildren),
      slotsWrap
    ]);
  }

  function renderWeekPanel(month, week, weekIdx, arMonth) {
    var arWeek = arMonth && arMonth.weeks && arMonth.weeks[weekIdx];
    var goals = el('ul', { class: 'goals-list' });
    week.goals.forEach(function (g, i) {
      var goalChildren = [g];
      var arGoal = arWeek && arWeek.goals && arWeek.goals[i];
      if (arGoal) {
        goalChildren.push(arSpan('sm-arabic-goal', arGoal, { tag: 'div' }));
      }
      goals.appendChild(el('li', null, goalChildren));
    });

    var days = el('div', { class: 'week-days' });
    data.weekTemplate.forEach(function (dt, dayIdx) {
      var arDt = ar.weekTemplate && ar.weekTemplate[dayIdx];
      days.appendChild(renderDayRow(week, dt, arWeek, arDt));
    });

    var goalsSectionChildren = [
      el('div', { class: 'week-section-label' }, ['Goals this week'])
    ];
    if (ar.sections && ar.sections.goalsThisWeek) {
      goalsSectionChildren.push(arSpan('sm-arabic-section-sublabel', ar.sections.goalsThisWeek, { tag: 'div' }));
    }
    goalsSectionChildren.push(goals);

    var daysSectionChildren = [
      el('div', { class: 'week-section-label' }, ['Day by day · 10h tech · 5h deen'])
    ];
    if (ar.sections && ar.sections.dayByDay) {
      daysSectionChildren.push(arSpan('sm-arabic-section-sublabel', ar.sections.dayByDay, { tag: 'div' }));
    }
    daysSectionChildren.push(days);

    var headlineChildren = [
      el('span', { class: 'week-panel-num' }, ['Week ' + (weekIdx + 1) + ' · Month ' + month.num]),
      el('h3', { class: 'week-panel-headline' }, [week.headline])
    ];
    if (arWeek && arWeek.headline) {
      headlineChildren.push(arSpan('sm-arabic-headline', arWeek.headline, { tag: 'div' }));
    }

    return el('div', {
      class: 'week-panel' + (weekIdx === 0 ? ' active' : ''),
      dataset: { week: String(weekIdx) }
    }, [
      el('header', { class: 'week-panel-head' }, headlineChildren),
      el('div', { class: 'week-panel-body' }, [
        el('div', { class: 'week-panel-section week-goals-section' }, goalsSectionChildren),
        el('div', { class: 'week-panel-section week-days-section' }, daysSectionChildren)
      ])
    ]);
  }

  function renderMonthPanel(month, monthIdx) {
    var arMonth = ar.months && ar.months[monthIdx];
    var weekTabs = el('div', { class: 'week-tabs', role: 'tablist' });
    var weekPanels = el('div', { class: 'week-panels' });

    month.weeks.forEach(function (w, i) {
      var arWeek = arMonth && arMonth.weeks && arMonth.weeks[i];
      var tabChildren = [
        el('span', { class: 'week-tab-num' }, ['Wk ' + (i + 1)]),
        el('span', { class: 'week-tab-sub' }, [w.headline])
      ];
      if (arWeek && arWeek.headline) {
        tabChildren.push(arSpan('sm-arabic-tab-sub', arWeek.headline, { tag: 'span' }));
      }
      weekTabs.appendChild(
        el('button', {
          class: 'week-tab' + (i === 0 ? ' active' : ''),
          type: 'button',
          dataset: { week: String(i) }
        }, tabChildren)
      );
      weekPanels.appendChild(renderWeekPanel(month, w, i, arMonth));
    });

    var monthTitleHtml = month.lead + '<em>' + month.accent + '</em>';
    var arTitleHtml = null;
    if (arMonth && arMonth.lead && arMonth.accent) {
      arTitleHtml = arMonth.lead + '<em>' + arMonth.accent + '</em>';
    }
    var monthHeadChildren = [
      el('div', { class: 'month-head-top' }, [
        el('span', { class: 'month-num' }, ['M' + month.num]),
        el('h3', { class: 'month-title', html: monthTitleHtml })
      ]),
      el('p', { class: 'month-thesis' }, [month.thesis])
    ];
    if (arTitleHtml) {
      monthHeadChildren.push(
        el('h3', { class: 'sm-arabic sm-arabic-month-title', lang: 'ar', dir: 'rtl', html: arTitleHtml })
      );
    }
    if (arMonth && arMonth.thesis) {
      monthHeadChildren.push(arSpan('sm-arabic-month-thesis', arMonth.thesis, { tag: 'p' }));
    }
    monthHeadChildren.push(renderFocus(month.focus, arMonth && arMonth.focus));

    return el('div', {
      class: 'month-panel' + (monthIdx === 0 ? ' active' : ''),
      dataset: { month: month.num }
    }, [
      el('header', { class: 'month-panel-head' }, monthHeadChildren),
      weekTabs,
      weekPanels
    ]);
  }

  function renderMonths() {
    var tabsEl = document.getElementById('month-tabs');
    var panelsEl = document.getElementById('month-panels');
    data.months.forEach(function (m, i) {
      var arMonth = ar.months && ar.months[i];
      var tabChildren = [
        el('span', { class: 'month-tab-num' }, ['M' + m.num]),
        el('span', { class: 'month-tab-label' }, [m.tabLabel || m.accent])
      ];
      if (arMonth && arMonth.tabLabel) {
        tabChildren.push(arSpan('sm-arabic-tab-label', arMonth.tabLabel, { tag: 'span' }));
      }
      tabsEl.appendChild(
        el('button', {
          class: 'month-tab' + (i === 0 ? ' active' : ''),
          type: 'button',
          dataset: { month: m.num }
        }, tabChildren)
      );
      panelsEl.appendChild(renderMonthPanel(m, i));
    });
  }

  function renderDeliverables() {
    var wrap = document.getElementById('deliverables-wrap');
    data.deliverables.forEach(function (d, i) {
      var arD = ar.deliverables && ar.deliverables[i];
      var bodyChildren = [
        el('h4', { class: 'deliverable-name' }, [d.name]),
        el('p', { class: 'deliverable-desc' }, [d.desc])
      ];
      if (arD && arD.name) {
        bodyChildren.push(arSpan('sm-arabic-deliverable-name', arD.name, { tag: 'div' }));
      }
      if (arD && arD.desc) {
        bodyChildren.push(arSpan('sm-arabic-deliverable-desc', arD.desc, { tag: 'p' }));
      }
      wrap.appendChild(
        el('div', { class: 'deliverable-card' }, [
          el('span', { class: 'deliverable-icon' }, [d.icon]),
          el('div', { class: 'deliverable-body' }, bodyChildren)
        ])
      );
    });
  }

  function renderCreed() {
    var creedEl = document.getElementById('sm-creed');
    creedEl.innerHTML = data.creed;
    if (ar.creed) {
      creedEl.parentNode.insertBefore(
        arSpan('sm-arabic-creed', ar.creed, { tag: 'p', html: true }),
        creedEl.nextSibling
      );
    }
    if (ar.sections && ar.sections.footerMeta) {
      var metaEl = document.querySelector('.sm-footer-meta');
      if (metaEl) {
        metaEl.parentNode.insertBefore(
          arSpan('sm-arabic-footer-meta', ar.sections.footerMeta, { tag: 'p' }),
          metaEl.nextSibling
        );
      }
    }
  }

  function wireTabs() {
    var monthTabs = document.querySelectorAll('.month-tab');
    var monthPanels = document.querySelectorAll('.month-panel');

    monthTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var month = tab.dataset.month;
        monthTabs.forEach(function (t) { t.classList.remove('active'); });
        monthPanels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.querySelector('.month-panel[data-month="' + month + '"]');
        if (panel) {
          panel.classList.add('active');
          window.scrollTo({ top: document.getElementById('month-tabs-wrap').offsetTop - 12, behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('.week-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var panel = tab.closest('.month-panel');
        if (!panel) return;
        var weekIdx = tab.dataset.week;
        panel.querySelectorAll('.week-tab').forEach(function (t) { t.classList.remove('active'); });
        panel.querySelectorAll('.week-panel').forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var weekPanel = panel.querySelector('.week-panel[data-week="' + weekIdx + '"]');
        if (weekPanel) weekPanel.classList.add('active');
      });
    });
  }

  renderHeader();
  renderMonths();
  renderSectionLabels();
  renderDeliverables();
  renderCreed();
  wireTabs();
})();
