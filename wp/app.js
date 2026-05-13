(function () {
  var data = window.WEEKLY_PLAN_DATA;
  var typeMap = data.typeMap;

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

  function renderHeader() {
    document.getElementById('title').innerHTML = data.header.title;
    document.getElementById('subtitle').textContent = data.header.subtitle;

    var legend = document.getElementById('legend');
    data.legend.forEach(function (item) {
      legend.appendChild(
        el('span', { class: 'legend-item' }, [
          el('span', { class: 'dot ' + item.dot }),
          ' ' + item.label
        ])
      );
    });
  }

  function renderTabs() {
    var tabs = document.getElementById('tabs');
    data.days.forEach(function (day, idx) {
      var btn = el('button', {
        class: 'tab' + (idx === 0 ? ' active' : ''),
        dataset: { day: day.key }
      }, [
        day.label,
        el('span', { class: 'tab-tag' }, [day.tag])
      ]);
      tabs.appendChild(btn);
    });
  }

  function renderRow(row) {
    var t = typeMap[row.type] || { color: 'var(--muted)', bg: '' };
    var activityChildren = [
      el('span', { class: 'tag', style: 'background:' + t.color }),
      el('span', { class: 'name' }, [row.activity])
    ];
    var activityArabic = (data.arabicMap || {})[row.activity];
    if (activityArabic) {
      activityChildren.push(el('span', { class: 'arabic activity-arabic', lang: 'ar', dir: 'rtl' }, [activityArabic]));
    }
    if (row.note) {
      activityChildren.push(el('span', { class: 'note' }, [row.note]));
      var noteArabic = (data.notesMap || {})[row.note];
      if (noteArabic) {
        activityChildren.push(el('span', { class: 'arabic note-arabic', lang: 'ar', dir: 'rtl' }, [noteArabic]));
      }
    }

    var details = (data.detailsMap || {})[row.activity];
    var toggle = null;
    if (details) {
      toggle = el('button', {
        class: 'details-toggle',
        type: 'button',
        'aria-expanded': 'false'
      }, [
        el('span', { class: 'details-toggle-label' }, ['Plan']),
        el('span', { class: 'chev' }, ['▾'])
      ]);
      activityChildren.push(toggle);
    }

    var mainRow = el('tr', { class: t.bg }, [
      el('td', { class: 'time' }, [row.time]),
      el('td', { class: 'activity' }, activityChildren)
    ]);

    if (!details) return [mainRow];

    var enList = el('ol', { class: 'details-list details-en' });
    details.en.forEach(function (step) { enList.appendChild(el('li', null, [step])); });
    var arList = el('ol', { class: 'details-list details-ar', lang: 'ar', dir: 'rtl' });
    details.ar.forEach(function (step) { arList.appendChild(el('li', null, [step])); });

    var detailsRow = el('tr', { class: 'details-row ' + (t.bg || '') }, [
      el('td', { colspan: '2' }, [
        el('div', { class: 'details-panel' }, [
          el('div', { class: 'details-col details-col-en' }, [
            el('div', { class: 'details-label' }, ['Step-by-step']),
            enList
          ]),
          el('div', { class: 'details-col details-col-ar' }, [
            el('div', { class: 'details-label details-label-ar' }, ['الخُطُوَات']),
            arList
          ])
        ])
      ])
    ]);

    toggle.addEventListener('click', function () {
      var open = detailsRow.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.classList.toggle('open', open);
    });

    return [mainRow, detailsRow];
  }

  function renderPanels() {
    var panels = document.getElementById('panels');
    data.days.forEach(function (day, idx) {
      var table = el('table');
      day.schedule.forEach(function (row) {
        renderRow(row).forEach(function (tr) { table.appendChild(tr); });
      });

      var summary = el('div', { class: 'summary' });
      day.summary.forEach(function (s) {
        summary.appendChild(
          el('span', { class: 'summary-item', html: '<strong>' + s.label + ':</strong> ' + s.value })
        );
      });

      var panel = el('div', {
        class: 'day-panel' + (idx === 0 ? ' active' : ''),
        dataset: { day: day.key }
      }, [
        el('div', { class: 'day-header' }, [
          el('span', { class: 'day-name' }, [day.name]),
          el('span', { class: 'day-focus' }, [day.focus])
        ]),
        table,
        summary
      ]);
      panels.appendChild(panel);
    });
  }

  function renderPrinciples() {
    var box = document.getElementById('principles');
    box.appendChild(el('h2', null, [data.principles.title]));
    var ul = el('ul');
    data.principles.items.forEach(function (item) {
      ul.appendChild(el('li', { html: '<strong>' + item.strong + '</strong> ' + item.body }));
    });
    box.appendChild(ul);
  }

  function renderFooter() {
    document.getElementById('footer').appendChild(el('p', null, [data.footer]));
  }

  function wireTabs() {
    var tabs = document.querySelectorAll('.tab');
    var panels = document.querySelectorAll('.day-panel');

    function activate(day) {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      var tab = document.querySelector('.tab[data-day="' + day + '"]');
      var panel = document.querySelector('.day-panel[data-day="' + day + '"]');
      if (tab) tab.classList.add('active');
      if (panel) panel.classList.add('active');
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab.dataset.day); });
    });

    var dayMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var today = dayMap[new Date().getDay()];
    if (document.querySelector('.tab[data-day="' + today + '"]')) activate(today);
  }

  renderHeader();
  renderTabs();
  renderPanels();
  renderPrinciples();
  renderFooter();
  wireTabs();
})();
