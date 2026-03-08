(() => {
  'use strict';

  // -- State --
  let manifest = [];
  let currentDay = null;
  let currentSlide = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwiping = false;

  // -- DOM refs --
  const $ = id => document.getElementById(id);
  const homeView = $('homeView');
  const slideView = $('slideView');
  const daysGrid = $('daysGrid');
  const slideImage = $('slideImage');
  const slideLoader = $('slideLoader');
  const slideCounter = $('slideCounter');
  const topbarTitle = $('topbarTitle');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');
  const backBtn = $('backBtn');
  const themeToggle = $('themeToggle');
  const fullscreenBtn = $('fullscreenBtn');
  const gridToggle = $('gridToggle');
  const gridOverlay = $('gridOverlay');
  const gridContainer = $('gridContainer');
  const thumbTrack = $('thumbTrack');
  const slideProgressFill = $('slideProgressFill');
  const slideStage = $('slideStage');

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

  // -- Load manifest --
  async function loadManifest() {
    try {
      const resp = await fetch('manifest.json?v=' + Date.now());
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      manifest = await resp.json();
    } catch (err) {
      // Fallback: try loading via script tag for file:// protocol
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'manifest.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        manifest = window.__MANIFEST__ || [];
      } catch {
        daysGrid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px;">
          Could not load slides. Serve via a local server or run <code>bash generate-manifest.sh</code>.</p>`;
        return;
      }
    }
    renderHome();
    handleDeepLink();
  }

  // -- Render home --
  function renderHome() {
    daysGrid.innerHTML = '';
    manifest.forEach((day, idx) => {
      const card = document.createElement('div');
      card.className = 'day-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${day.title} slides`);

      const previewSrc = day.slides[0] || '';
      card.innerHTML = `
        <div class="day-card-preview">
          <img src="${encodeURI(previewSrc)}" alt="${day.title} preview" loading="lazy">
          <div class="day-card-overlay">
            <span class="day-card-day">Day ${String(day.day).padStart(2, '0')}</span>
          </div>
        </div>
        <div class="day-card-body">
          <div class="day-card-title">${day.title}</div>
          <div class="day-card-meta">${day.slides.length} slides</div>
        </div>
        <div class="day-card-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      `;

      card.addEventListener('click', () => openDay(idx));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDay(idx); }
      });

      daysGrid.appendChild(card);
    });

    // Workbook card
    const wb = document.createElement('a');
    wb.href = 'workbook.html';
    wb.className = 'day-card workbook-card';
    wb.setAttribute('aria-label', 'Open interactive workbook');
    wb.innerHTML = `
      <div class="day-card-preview">
        <img src="images/workbook.png" alt="Workbook preview" loading="lazy">
      </div>
      <div class="day-card-body">
        <div class="day-card-title">Interactive Workbook</div>
        <div class="day-card-meta">12 exercises across 3 days</div>
      </div>
      <div class="day-card-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
    daysGrid.appendChild(wb);

    // Resources card
    const res = document.createElement('a');
    res.href = 'resources.html';
    res.className = 'day-card resources-card';
    res.setAttribute('aria-label', 'Browse free resources');
    res.innerHTML = `
      <div class="day-card-preview resources-preview">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </div>
      <div class="day-card-body">
        <div class="day-card-title">Resources</div>
        <div class="day-card-meta">Free downloads, courses & more</div>
      </div>
      <div class="day-card-arrow">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
    daysGrid.appendChild(res);
  }

  // -- Open a day's slides --
  function openDay(dayIndex) {
    currentDay = dayIndex;
    currentSlide = 0;
    document.body.classList.add('in-slides');
    topbarTitle.textContent = manifest[dayIndex].title;
    buildThumbnails();
    showSlide(0);
    closeGrid();
    updateURL();
  }

  // -- Close slides --
  function closeSlides() {
    document.body.classList.remove('in-slides');
    topbarTitle.textContent = 'Annual Intentions Reset';
    currentDay = null;
    closeGrid();
    history.pushState(null, '', window.location.pathname);
  }

  // -- Build thumbnails --
  function buildThumbnails() {
    const day = manifest[currentDay];
    thumbTrack.innerHTML = '';
    gridContainer.innerHTML = '';

    day.slides.forEach((src, i) => {
      // Thumb strip
      const thumb = document.createElement('div');
      thumb.className = 'thumb-item';
      thumb.innerHTML = `<img src="${encodeURI(src)}" alt="Slide ${i + 1}" loading="lazy">`;
      thumb.addEventListener('click', () => showSlide(i));
      thumbTrack.appendChild(thumb);

      // Grid
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      gridItem.innerHTML = `<img src="${encodeURI(src)}" alt="Slide ${i + 1}" loading="lazy">
        <span class="grid-item-num">${i + 1}</span>`;
      gridItem.addEventListener('click', () => { showSlide(i); closeGrid(); });
      gridContainer.appendChild(gridItem);
    });
  }

  // -- Show slide --
  function showSlide(index) {
    const day = manifest[currentDay];
    if (!day || index < 0 || index >= day.slides.length) return;

    currentSlide = index;
    const src = encodeURI(day.slides[index]);

    // Loading state
    slideImage.classList.add('loading');
    slideLoader.classList.add('active');

    const img = new Image();
    img.onload = () => {
      slideImage.src = src;
      slideImage.classList.remove('loading');
      slideLoader.classList.remove('active');
    };
    img.onerror = () => {
      slideImage.src = src;
      slideImage.classList.remove('loading');
      slideLoader.classList.remove('active');
    };
    img.src = src;

    // Counter
    slideCounter.textContent = `${index + 1} / ${day.slides.length}`;

    // Progress
    const pct = day.slides.length > 1 ? ((index) / (day.slides.length - 1)) * 100 : 100;
    slideProgressFill.style.width = pct + '%';

    // Nav buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === day.slides.length - 1;

    // Active thumbnail
    thumbTrack.querySelectorAll('.thumb-item').forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
    gridContainer.querySelectorAll('.grid-item').forEach((g, i) => {
      g.classList.toggle('active', i === index);
    });

    // Scroll active thumb into view
    const activeThumb = thumbTrack.children[index];
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    updateURL();
  }

  function nextSlide() {
    if (currentDay === null) return;
    const day = manifest[currentDay];
    if (currentSlide < day.slides.length - 1) showSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentDay === null) return;
    if (currentSlide > 0) showSlide(currentSlide - 1);
  }

  // -- Grid overlay --
  function toggleGrid() {
    gridOverlay.classList.toggle('active');
  }
  function closeGrid() {
    gridOverlay.classList.remove('active');
  }

  // -- Fullscreen --
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  // -- Deep linking --
  function updateURL() {
    if (currentDay === null) return;
    const day = manifest[currentDay];
    const hash = `#day-${day.day}/slide-${currentSlide + 1}`;
    history.replaceState(null, '', hash);
  }

  function handleDeepLink() {
    const hash = window.location.hash;
    const match = hash.match(/^#day-(\d+)(?:\/slide-(\d+))?$/);
    if (match) {
      const dayNum = parseInt(match[1]);
      const slideNum = parseInt(match[2] || '1');
      const dayIdx = manifest.findIndex(d => d.day === dayNum);
      if (dayIdx !== -1) {
        currentDay = dayIdx;
        document.body.classList.add('in-slides');
        topbarTitle.textContent = manifest[dayIdx].title;
        buildThumbnails();
        showSlide(Math.min(slideNum - 1, manifest[dayIdx].slides.length - 1));
      }
    }
  }

  // -- Keyboard --
  document.addEventListener('keydown', e => {
    // Close mega menu on Escape from any state
    if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
      closeMegaMenu();
      e.preventDefault();
      return;
    }

    if (currentDay === null) return;

    if (gridOverlay.classList.contains('active')) {
      if (e.key === 'Escape') { closeGrid(); e.preventDefault(); }
      return;
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextSlide();
        e.preventDefault();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        prevSlide();
        e.preventDefault();
        break;
      case 'Escape':
        closeSlides();
        e.preventDefault();
        break;
      case 'f':
      case 'F':
        if (!e.metaKey && !e.ctrlKey) toggleFullscreen();
        break;
      case 'g':
      case 'G':
        if (!e.metaKey && !e.ctrlKey) toggleGrid();
        break;
      case 'Home':
        showSlide(0);
        e.preventDefault();
        break;
      case 'End':
        showSlide(manifest[currentDay].slides.length - 1);
        e.preventDefault();
        break;
    }
  });

  // -- Touch / Swipe --
  slideStage.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = false;
    document.body.classList.add('no-select');
  }, { passive: true });

  slideStage.addEventListener('touchmove', e => {
    if (!touchStartX) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping = true;
    }
  }, { passive: true });

  slideStage.addEventListener('touchend', e => {
    document.body.classList.remove('no-select');
    if (!isSwiping) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    touchStartX = 0;
    isSwiping = false;
  }, { passive: true });

  // -- Mega menu --
  const megaMenu = $('megaMenu');
  const megaBackdrop = $('megaBackdrop');
  const megaMenuToggle = $('megaMenuToggle');
  const megaMenuClose = $('megaMenuClose');

  function openMegaMenu() {
    megaMenu.classList.add('open');
    megaBackdrop.classList.add('open');
  }
  function closeMegaMenu() {
    megaMenu.classList.remove('open');
    megaBackdrop.classList.remove('open');
  }

  megaMenuToggle.addEventListener('click', () => {
    megaMenu.classList.contains('open') ? closeMegaMenu() : openMegaMenu();
  });
  megaMenuClose.addEventListener('click', closeMegaMenu);
  megaBackdrop.addEventListener('click', closeMegaMenu);

  // -- Button listeners --
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  backBtn.addEventListener('click', closeSlides);
  themeToggle.addEventListener('click', toggleTheme);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  gridToggle.addEventListener('click', toggleGrid);

  // -- Browser back button --
  window.addEventListener('popstate', () => {
    if (currentDay !== null && !window.location.hash) {
      closeSlides();
    } else {
      handleDeepLink();
    }
  });

  // -- Auto-show modal on every page load --
  function autoShowModal() {
    // Small delay so page renders first
    setTimeout(() => {
      openMegaMenu();
    }, 400);
  }

  // -- Init --
  initTheme();
  loadManifest();
  autoShowModal();

})();
