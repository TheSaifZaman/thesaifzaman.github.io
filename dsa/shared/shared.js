/* ==========================================================
   DSA Visualizer – Shared Utilities
   Theme toggle, breadcrumbs, prev/next nav, problem tabs,
   and regex-based syntax highlighting.
   ========================================================== */
(function () {
  'use strict';

  /* --------------------------------------------------
     1. Theme Toggle
     -------------------------------------------------- */
  (function initTheme() {
    var saved = localStorage.getItem('dsa-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    var btn = document.getElementById('themeToggle');
    if (!btn) return;

    function applyIcon(theme) {
      var icon = btn.querySelector('i');
      if (!icon) return;
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    applyIcon(saved);

    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('dsa-theme', next);
      applyIcon(next);
    });
  })();

  /* --------------------------------------------------
     2. Breadcrumbs
     -------------------------------------------------- */
  (function initBreadcrumbs() {
    var el = document.getElementById('breadcrumb');
    if (!el || typeof TOPIC === 'undefined') return;

    el.innerHTML =
      '<a href="../index.html">DSA Hub</a>' +
      ' <span class="sep">/</span> ' +
      '<span>' + TOPIC.category + '</span>' +
      ' <span class="sep">/</span> ' +
      '<span>' + TOPIC.title + '</span>';
  })();

  /* --------------------------------------------------
     3. Prev / Next Navigation
     -------------------------------------------------- */
  (function initTopicNav() {
    var nav = document.getElementById('topicNav');
    if (!nav || typeof DSA_DATA === 'undefined' || typeof TOPIC === 'undefined') return;

    var siblings = DSA_DATA.filter(function (t) {
      return t.category === TOPIC.category;
    });

    var idx = -1;
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i].id === TOPIC.id) { idx = i; break; }
    }

    var prev = idx > 0 ? siblings[idx - 1] : null;
    var next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

    var html = '';

    // Prev link
    if (prev) {
      html += '<a href="../' + prev.href + '"><i class="fas fa-arrow-left"></i> ' + prev.title + '</a>';
    } else {
      html += '<span></span>';
    }

    // Hub link
    html += '<a href="../index.html" class="back-to-hub"><i class="fas fa-th"></i> Hub</a>';

    // Next link
    if (next) {
      html += '<a href="../' + next.href + '">' + next.title + ' <i class="fas fa-arrow-right"></i></a>';
    } else {
      html += '<span></span>';
    }

    nav.innerHTML = html;
  })();

  /* --------------------------------------------------
     4. Problem Tabs (difficulty filter)
     -------------------------------------------------- */
  (function initProblemTabs() {
    var container = document.querySelector('.problems-tabs');
    if (!container) return;

    container.addEventListener('click', function (e) {
      var tab = e.target.closest('.problems-tab');
      if (!tab) return;

      var filter = tab.getAttribute('data-filter');

      // Toggle active class
      var tabs = container.querySelectorAll('.problems-tab');
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
      }
      tab.classList.add('active');

      // Filter rows
      var rows = document.querySelectorAll('.problems-table tbody tr');
      for (var j = 0; j < rows.length; j++) {
        if (filter === 'all' || rows[j].getAttribute('data-difficulty') === filter) {
          rows[j].style.display = '';
        } else {
          rows[j].style.display = 'none';
        }
      }
    });
  })();

  /* --------------------------------------------------
     5. Syntax Highlighting (regex-based)
     -------------------------------------------------- */
  window.highlightCode = function (codeEl) {
    var text = codeEl.textContent;

    // Escape HTML entities first to prevent injection
    text = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    var tokens = [];
    var id = 0;

    // Extract and replace with placeholders to avoid nested matches
    function extract(regex, cls) {
      text = text.replace(regex, function (match) {
        var key = '\x00T' + (id++) + '\x00';
        tokens.push({ key: key, html: '<span class="' + cls + '">' + match + '</span>' });
        return key;
      });
    }

    // Order matters: comments first, then strings, then keywords, then numbers
    extract(/\/\/[^\n]*/g, 'comment');
    extract(/\/\*[\s\S]*?\*\//g, 'comment');
    extract(/(["'])(?:(?!\1|\\).|\\.)*\1/g, 'string');
    extract(/`(?:[^`\\]|\\.)*`/g, 'string');
    extract(/\b(function|return|if|else|for|while|do|switch|case|break|continue|let|const|var|new|this|class|extends|super|import|export|default|typeof|instanceof|in|of|try|catch|finally|throw|async|await|yield|null|undefined|true|false|void|delete)\b/g, 'keyword');
    extract(/\b\d+\.?\d*\b/g, 'number');

    // Restore tokens
    for (var i = 0; i < tokens.length; i++) {
      text = text.replace(tokens[i].key, tokens[i].html);
    }

    // Safe: text was escaped above before any processing;
    // only our own span wrappers are injected as markup.
    codeEl.innerHTML = text;
  };

  // Auto-apply to all code blocks on page
  var codeEls = document.querySelectorAll('.code-block code');
  for (var k = 0; k < codeEls.length; k++) {
    window.highlightCode(codeEls[k]);
  }

})();
