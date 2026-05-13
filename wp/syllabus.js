(function () {
  var data = window.SYLLABUS_DATA;
  if (!data) return;

  document.title = data.pageTitle;

  // ── tiny DOM helpers ──────────────────────────────────────────
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      for (var k in props) {
        if (k === 'class') node.className = props[k];
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

  // Parse minimal markup (em + strong only) into DOM nodes, no innerHTML.
  function rich(str) {
    if (str == null) return [];
    var nodes = [];
    var rest = String(str);
    var re = /<(em|strong)>([\s\S]*?)<\/\1>/;
    while (rest.length) {
      var m = rest.match(re);
      if (!m) {
        nodes.push(document.createTextNode(rest));
        break;
      }
      var before = rest.slice(0, m.index);
      if (before) nodes.push(document.createTextNode(before));
      nodes.push(el(m[1], null, [m[2]]));
      rest = rest.slice(m.index + m[0].length);
    }
    return nodes;
  }

  function setRich(node, str) {
    while (node.firstChild) node.removeChild(node.firstChild);
    rich(str).forEach(function (n) { node.appendChild(n); });
  }

  function arSpan(klass, text, opts) {
    if (!text) return null;
    var tag = opts && opts.tag ? opts.tag : 'span';
    var node = el(tag, { class: 'syl-arabic ' + (klass || ''), lang: 'ar', dir: 'rtl' });
    if (opts && opts.rich) {
      rich(text).forEach(function (n) { node.appendChild(n); });
    } else {
      node.appendChild(document.createTextNode(text));
    }
    return node;
  }

  // ── header ────────────────────────────────────────────────────
  function renderHeader() {
    var titleEl = document.getElementById('syl-title');
    setRich(titleEl, data.header.title);
    if (data.header.titleAr) {
      titleEl.appendChild(arSpan('syl-arabic-title', data.header.titleAr, { rich: true }));
    }

    var subtitleEl = document.getElementById('syl-subtitle');
    subtitleEl.textContent = data.header.subtitle;
    if (data.header.subtitleAr) {
      subtitleEl.parentNode.insertBefore(
        arSpan('syl-arabic-subtitle', data.header.subtitleAr, { tag: 'p' }),
        subtitleEl.nextSibling
      );
    }

    var accentEl = document.getElementById('syl-accent');
    accentEl.textContent = data.header.accentLine;
    if (data.header.accentLineAr) {
      accentEl.parentNode.insertBefore(
        arSpan('syl-arabic-accent', data.header.accentLineAr, { tag: 'p' }),
        accentEl.nextSibling
      );
    }

    var stats = document.getElementById('syl-stats');
    data.stats.forEach(function (s) {
      var statChildren = [
        el('div', { class: 'syl-stat-num' }, [s.num]),
        el('div', { class: 'syl-stat-lbl' }, [s.lbl])
      ];
      if (s.lblAr) statChildren.push(arSpan('syl-arabic-stat-lbl', s.lblAr, { tag: 'div' }));
      stats.appendChild(el('div', { class: 'syl-stat' }, statChildren));
    });

    var pactEl = document.getElementById('syl-pact');
    setRich(pactEl, data.pact);
    if (data.pactAr) {
      pactEl.parentNode.appendChild(arSpan('syl-arabic-pact', data.pactAr, { tag: 'p', rich: true }));
    }
  }

  // ── time windows ──────────────────────────────────────────────
  function renderWindows() {
    var wrap = document.getElementById('syl-windows');
    data.windows.forEach(function (w) {
      var card = el('div', { class: 'window-card window-tone-' + (w.tone || 'muted') }, [
        el('div', { class: 'window-meta' }, [
          el('span', { class: 'window-day' }, [w.day]),
          el('span', { class: 'window-time' }, [w.time]),
          el('span', { class: 'window-total' }, [w.total])
        ]),
        el('div', { class: 'window-name' }, [w.name]),
        w.nameAr ? arSpan('syl-arabic-window-name', w.nameAr, { tag: 'div' }) : null,
        el('div', { class: 'window-use' }, [w.use]),
        w.useAr ? arSpan('syl-arabic-window-use', w.useAr, { tag: 'div' }) : null
      ]);
      wrap.appendChild(card);
    });
  }

  // ── tracks ────────────────────────────────────────────────────
  function buildTrackPanel(track, trackIdx) {
    var monthTabs = el('div', { class: 'syl-month-tabs', role: 'tablist' });
    var monthPanels = el('div', { class: 'syl-month-panels' });

    var months = track.months || [];
    if (months.length === 0) {
      monthPanels.appendChild(
        el('div', { class: 'syl-empty' }, [
          el('p', null, ['Months for ' + track.label + ' will appear once the data file is loaded.']),
          el('p', null, ['أَشْهُرُ ' + (track.labelAr || track.label) + ' سَتَظْهَرُ بَعْدَ تَحْمِيلِ بَيَانَاتِ المَسَار.'])
        ])
      );
    }

    months.forEach(function (m, mi) {
      var tabChildren = [
        el('span', { class: 'syl-month-tab-num' }, ['M' + m.num]),
        el('span', { class: 'syl-month-tab-label' }, [m.tabLabel || m.theme])
      ];
      if (m.tabLabelAr || m.themeAr) {
        tabChildren.push(arSpan('syl-arabic-month-tab-label', m.tabLabelAr || m.themeAr, { tag: 'span' }));
      }
      monthTabs.appendChild(
        el('button', {
          class: 'syl-month-tab' + (mi === 0 ? ' active' : ''),
          type: 'button',
          dataset: { month: String(mi) }
        }, tabChildren)
      );
      monthPanels.appendChild(buildMonthPanel(track, m, mi));
    });

    return el('div', {
      class: 'syl-track-panel' + (trackIdx === 0 ? ' active' : ''),
      dataset: { track: track.key }
    }, [
      el('div', { class: 'track-summary' }, [
        el('div', { class: 'track-summary-desc' }, [track.desc]),
        track.descAr ? arSpan('syl-arabic-track-desc', track.descAr, { tag: 'div' }) : null,
        el('div', { class: 'track-summary-slot' }, [
          el('span', { class: 'track-summary-slot-label' }, ['Time slot · ']),
          track.slot
        ]),
        track.slotAr ? arSpan('syl-arabic-track-slot', track.slotAr, { tag: 'div' }) : null,
        el('div', { class: 'track-summary-rot' }, [
          el('span', { class: 'track-summary-slot-label' }, ['Rotation · ']),
          track.rotation.map(function (r) { return r.label; }).join(' · ')
        ]),
        track.rotation[0].labelAr ? arSpan('syl-arabic-track-rot', track.rotation.map(function (r) { return r.labelAr || r.label; }).join(' · '), { tag: 'div' }) : null
      ]),
      el('div', { class: 'syl-month-tabs-strip' }, [monthTabs]),
      monthPanels
    ]);
  }

  function buildMonthPanel(track, month, monthIdx) {
    var headerChildren = [
      el('div', { class: 'month-head-top' }, [
        el('span', { class: 'syl-month-num' }, ['M' + month.num]),
        el('h3', { class: 'syl-month-title' }, [month.theme || ''])
      ]),
      month.themeAr ? arSpan('syl-arabic-month-theme', month.themeAr, { tag: 'div' }) : null
    ];

    if (month.thesis) headerChildren.push(el('p', { class: 'syl-month-thesis' }, [month.thesis]));
    if (month.thesisAr) headerChildren.push(arSpan('syl-arabic-month-thesis', month.thesisAr, { tag: 'p' }));

    if (month.focus) {
      var focusPills = el('div', { class: 'syl-focus-pills' });
      track.rotation.forEach(function (r) {
        if (!month.focus[r.code] && !month.focus[r.code + 'Ar']) return;
        var labelChildren = [r.label];
        if (r.labelAr) labelChildren.push(arSpan('syl-arabic-inline-label', ' · ' + r.labelAr));
        var valChildren = [month.focus[r.code] || ''];
        if (month.focus[r.code + 'Ar']) {
          valChildren.push(arSpan('syl-arabic-pill-value', month.focus[r.code + 'Ar'], { tag: 'div' }));
        }
        focusPills.appendChild(
          el('span', { class: 'syl-focus-pill' }, [
            el('span', { class: 'syl-focus-pill-label' }, labelChildren),
            el('span', { class: 'syl-focus-pill-value' }, valChildren)
          ])
        );
      });
      headerChildren.push(focusPills);
    }

    var selectorWrap = el('div', { class: 'day-selector-wrap' });
    var label = el('label', { class: 'day-selector-label', for: 'day-select-' + track.key + '-' + monthIdx }, ['Day ·']);
    if (month.days && month.days[0] && month.days[0].topicAr) {
      label.appendChild(arSpan('syl-arabic-day-label', 'اليَوْم ·'));
    }
    var select = el('select', {
      class: 'day-select',
      id: 'day-select-' + track.key + '-' + monthIdx,
      dataset: { track: track.key, month: String(monthIdx) }
    });
    (month.days || []).forEach(function (d, di) {
      var phaseTag = d.phase === 'revise' ? '↻ revise' : '· learn';
      var subLabel = d.subLabel || (function () {
        for (var i = 0; i < track.rotation.length; i++) {
          if (track.rotation[i].code === d.sub) return track.rotation[i].label;
        }
        return d.sub || '';
      })();
      select.appendChild(
        el('option', { value: String(di) }, [
          'Day ' + d.num + ' · ' + subLabel + ' · ' + (d.topic || '') + '  ' + phaseTag
        ])
      );
    });
    selectorWrap.appendChild(label);
    selectorWrap.appendChild(select);

    var detailWrap = el('div', { class: 'day-detail-wrap', id: 'day-detail-' + track.key + '-' + monthIdx });
    headerChildren.push(selectorWrap);

    var panel = el('div', {
      class: 'syl-month-panel' + (monthIdx === 0 ? ' active' : ''),
      dataset: { month: String(monthIdx) }
    }, [
      el('header', { class: 'syl-month-panel-head' }, headerChildren),
      detailWrap
    ]);

    if (month.days && month.days.length > 0) {
      detailWrap.appendChild(buildDayDetail(track, month, month.days[0], 0));
    } else {
      detailWrap.appendChild(
        el('div', { class: 'syl-empty' }, [
          el('p', null, ['No days defined yet for this month.']),
          el('p', null, ['لَا أَيَّامَ مُعَرَّفَةً لِهَذَا الشَّهْرِ بَعْدُ.'])
        ])
      );
    }

    select.addEventListener('change', function () {
      var idx = parseInt(select.value, 10);
      while (detailWrap.firstChild) detailWrap.removeChild(detailWrap.firstChild);
      detailWrap.appendChild(buildDayDetail(track, month, month.days[idx], idx));
    });

    return panel;
  }

  function buildDayDetail(track, month, day, dayIdx) {
    if (!day) return el('div', null, ['(missing day data)']);

    var subLabel = day.subLabel;
    var subLabelAr = day.subLabelAr;
    if (!subLabel) {
      for (var i = 0; i < track.rotation.length; i++) {
        if (track.rotation[i].code === day.sub) {
          subLabel = track.rotation[i].label;
          subLabelAr = track.rotation[i].labelAr;
          break;
        }
      }
    }

    var headChildren = [
      el('div', { class: 'day-num' }, ['Day ' + day.num]),
      el('div', { class: 'day-sub-discipline' }, [subLabel || (day.sub || '')]),
      subLabelAr ? arSpan('syl-arabic-day-sub', subLabelAr, { tag: 'div' }) : null,
      el('h3', { class: 'day-topic' }, [day.topic || '']),
      day.topicAr ? arSpan('syl-arabic-day-topic', day.topicAr, { tag: 'h4' }) : null
    ];

    var phaseBadge = el('span', { class: 'day-phase day-phase-' + (day.phase || 'learn') }, [
      day.phase === 'revise' ? '↻ Revision' : '· Learning'
    ]);
    var slotBadge = day.slot ? el('span', { class: 'day-slot-anchor' }, [day.slot]) : null;
    var metaRow = el('div', { class: 'day-meta-row' }, [phaseBadge, slotBadge]);
    if (day.slotAr) metaRow.appendChild(arSpan('syl-arabic-day-slot', day.slotAr));

    var body = el('div', { class: 'day-body' });

    function addBlock(labelEn, labelAr, en, ar, isList) {
      if (!en && !ar) return;
      var block = el('div', { class: 'day-block' }, [
        el('div', { class: 'day-block-label' }, [labelEn]),
        labelAr ? arSpan('syl-arabic-day-block-label', labelAr) : null
      ]);
      if (isList && Array.isArray(en)) {
        var ol = el('ol', { class: 'day-block-list' });
        en.forEach(function (it) { ol.appendChild(el('li', null, [it])); });
        block.appendChild(ol);
        if (Array.isArray(ar)) {
          var ola = el('ol', { class: 'day-block-list syl-arabic-list', lang: 'ar', dir: 'rtl' });
          ar.forEach(function (it) { ola.appendChild(el('li', null, [it])); });
          block.appendChild(ola);
        }
      } else {
        if (en) block.appendChild(el('p', { class: 'day-block-text' }, [en]));
        if (ar) block.appendChild(arSpan('syl-arabic-day-block-text', ar, { tag: 'p' }));
      }
      body.appendChild(block);
    }

    addBlock('Objective', 'الهَدَف', day.objective, day.objectiveAr);
    addBlock('Source', 'المَصْدَر', day.source, day.sourceAr);
    addBlock('Plan', 'الخُطَّة', day.plan, day.planAr, true);
    addBlock('Deliverable', 'النَّاتِج', day.deliverable, day.deliverableAr);
    if (day.crossLink || day.crossLinkAr) addBlock('Cross-link', 'رَابِطٌ مُتَقَاطِع', day.crossLink, day.crossLinkAr);
    if (day.dua || day.duaAr) addBlock('Dua', 'دُعَاء', day.dua, day.duaAr);

    return el('article', { class: 'day-detail day-detail-phase-' + (day.phase || 'learn') }, [
      el('header', { class: 'day-detail-head' }, headChildren),
      metaRow,
      body
    ]);
  }

  function renderTracks() {
    var tabsEl = document.getElementById('track-tabs');
    var panelsEl = document.getElementById('track-panels');

    data.tracks.forEach(function (track, ti) {
      var tabChildren = [
        el('span', { class: 'track-tab-icon' }, [track.icon || '·']),
        el('span', { class: 'track-tab-label' }, [track.label])
      ];
      if (track.labelAr) tabChildren.push(arSpan('syl-arabic-track-label', track.labelAr, { tag: 'span' }));
      tabsEl.appendChild(
        el('button', {
          class: 'track-tab track-tab-' + track.tone + (ti === 0 ? ' active' : ''),
          type: 'button',
          dataset: { track: track.key }
        }, tabChildren)
      );
      panelsEl.appendChild(buildTrackPanel(track, ti));
    });

    var trackTabs = document.querySelectorAll('.track-tab');
    var trackPanels = document.querySelectorAll('.syl-track-panel');
    trackTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.dataset.track;
        trackTabs.forEach(function (t) { t.classList.remove('active'); });
        trackPanels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        var panel = document.querySelector('.syl-track-panel[data-track="' + key + '"]');
        if (panel) panel.classList.add('active');
      });
    });

    document.querySelectorAll('.syl-track-panel').forEach(function (trackPanel) {
      var monthTabs = trackPanel.querySelectorAll('.syl-month-tab');
      var monthPanels = trackPanel.querySelectorAll('.syl-month-panel');
      monthTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var idx = tab.dataset.month;
          monthTabs.forEach(function (t) { t.classList.remove('active'); });
          monthPanels.forEach(function (p) { p.classList.remove('active'); });
          tab.classList.add('active');
          var panel = trackPanel.querySelector('.syl-month-panel[data-month="' + idx + '"]');
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  function renderCreed() {
    var creedEl = document.getElementById('syl-creed');
    setRich(creedEl, data.creed);
    if (data.creedAr) {
      creedEl.parentNode.insertBefore(
        arSpan('syl-arabic-creed', data.creedAr, { tag: 'p', rich: true }),
        creedEl.nextSibling
      );
    }
  }

  renderHeader();
  renderWindows();
  renderTracks();
  renderCreed();
})();
