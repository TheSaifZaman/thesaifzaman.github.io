/* ═══════════════════════════════════════
   Hijri Calendar - Core Application Logic
   ═══════════════════════════════════════ */

(function () {
    'use strict';

    // ── Hijri Month Names ──
    var HIJRI_MONTHS = [
        { en: 'Muharram', ar: 'مُحَرَّم' },
        { en: 'Safar', ar: 'صَفَر' },
        { en: "Rabi' al-Awwal", ar: 'رَبِيع الأَوَّل' },
        { en: "Rabi' al-Thani", ar: 'رَبِيع الثَّانِي' },
        { en: 'Jumada al-Ula', ar: 'جُمَادَى الأُولَى' },
        { en: 'Jumada al-Thani', ar: 'جُمَادَى الثَّانِية' },
        { en: 'Rajab', ar: 'رَجَب' },
        { en: "Sha'ban", ar: 'شَعْبَان' },
        { en: 'Ramadan', ar: 'رَمَضَان' },
        { en: 'Shawwal', ar: 'شَوَّال' },
        { en: 'Dhul Qi\'dah', ar: 'ذُو القَعْدَة' },
        { en: 'Dhul Hijjah', ar: 'ذُو الحِجَّة' }
    ];

    var GREG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    var GREG_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // ── State ──
    var state = {
        currentHijriMonth: 1,
        currentHijriYear: 1446,
        adjustment: 0,
        monthAdjustments: {}, // per-month adjustments keyed by month number (1-12)
        filters: {
            battle: true, historical: true, birth: true, death: true,
            revelation: true, miracle: true, fasting: true, worship: true,
            celebration: true, treaty: true
        },
        showJummah: true,
        showAyyam: true,
        showMonThu: true
    };

    // ── DOM References ──
    var $ = function (id) { return document.getElementById(id); };
    var elCalendarDays = $('calendarDays');
    var elHijriMonthYear = $('hijriMonthYear');
    var elHijriMonthArabic = $('hijriMonthArabic');
    var elGregorianRange = $('gregorianRange');
    var elTooltip = $('tooltip');
    var elTooltipContent = $('tooltipContent');
    var elEventPanel = $('eventPanel');
    var elEventPanelTitle = $('eventPanelTitle');
    var elEventPanelBody = $('eventPanelBody');
    var elMonthEventsList = $('monthEventsList');
    var elSettingsModal = $('settingsModal');
    var elAdjustValue = $('adjustValue');

    // ── Hijri Date Conversion using Intl API ──

    // ── Hijri-Gregorian conversion cache ──
    var _hijriCache = {};

    function _getAdjustment(hijriMonth) {
        // Per-month adjustment takes priority, falls back to global
        if (hijriMonth && state.monthAdjustments[hijriMonth] !== undefined) {
            return state.monthAdjustments[hijriMonth];
        }
        return state.adjustment;
    }

    function gregorianToHijri(date, useAdjustment) {
        var adjusted = new Date(date);
        if (useAdjustment !== false) {
            adjusted.setDate(adjusted.getDate() + state.adjustment);
        }
        try {
            var formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                day: 'numeric', month: 'numeric', year: 'numeric'
            });
            var parts = formatter.formatToParts(adjusted);
            var day = 1, month = 1, year = 1446;
            parts.forEach(function (p) {
                if (p.type === 'day') day = parseInt(p.value);
                if (p.type === 'month') month = parseInt(p.value);
                if (p.type === 'year') year = parseInt(p.value);
            });
            return { day: day, month: month, year: year, gregorian: adjusted };
        } catch (e) {
            return { day: 1, month: 1, year: 1446, gregorian: adjusted };
        }
    }

    function findGregorianForHijri(hijriMonth, hijriYear, hijriDay) {
        var cacheKey = hijriYear + '-' + hijriMonth + '-' + (hijriDay || 1) + '-' + state.adjustment;
        if (_hijriCache[cacheKey]) return new Date(_hijriCache[cacheKey]);

        // Hijri epoch: July 19, 622 CE (Gregorian proleptic)
        // Each Hijri year ≈ 354.36667 days, each month ≈ 29.53056 days
        var epochMs = new Date(622, 6, 19).getTime(); // July 19, 622
        var totalDays = (hijriYear - 1) * 354.36667 + (hijriMonth - 1) * 29.53056 + ((hijriDay || 1) - 1);
        var approxMs = epochMs + totalDays * 86400000;
        var searchDate = new Date(approxMs);
        // Back up 15 days to account for approximation error
        searchDate.setDate(searchDate.getDate() - 15);

        for (var i = 0; i < 45; i++) {
            var h = gregorianToHijri(searchDate, true);
            if (h.year === hijriYear && h.month === hijriMonth && h.day === (hijriDay || 1)) {
                _hijriCache[cacheKey] = searchDate.getTime();
                return new Date(searchDate);
            }
            searchDate.setDate(searchDate.getDate() + 1);
        }
        // Fallback: return the approximate date
        return new Date(approxMs);
    }

    function getDaysInHijriMonth(hijriMonth, hijriYear) {
        var firstOfMonth = findGregorianForHijri(hijriMonth, hijriYear, 1);
        var nextMonth = hijriMonth === 12 ? 1 : hijriMonth + 1;
        var nextYear = hijriMonth === 12 ? hijriYear + 1 : hijriYear;
        var firstOfNext = findGregorianForHijri(nextMonth, nextYear, 1);
        var diff = Math.round((firstOfNext - firstOfMonth) / 86400000);
        return diff > 0 && diff <= 30 ? diff : 30;
    }

    function getDayOfWeek(hijriMonth, hijriYear, hijriDay) {
        var greg = findGregorianForHijri(hijriMonth, hijriYear, hijriDay);
        return greg.getDay(); // 0=Sunday
    }

    function getGregorianForDay(hijriMonth, hijriYear, hijriDay) {
        var firstGreg = findGregorianForHijri(hijriMonth, hijriYear, 1);
        var d = new Date(firstGreg);
        d.setDate(d.getDate() + hijriDay - 1);
        return d;
    }

    function formatGregorianShort(date) {
        return GREG_MONTHS[date.getMonth()].substring(0, 3) + ' ' + date.getDate();
    }

    function formatGregorianFull(date) {
        return GREG_MONTHS[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    // ── Event Lookup ──

    function getEventsForDay(month, day) {
        if (typeof HIJRI_EVENTS === 'undefined') return [];
        var key = month + '-' + day;
        var events = HIJRI_EVENTS[key] || [];
        // Filter by user settings
        return events.filter(function (ev) {
            return state.filters[ev.category] !== false;
        });
    }

    function getRecurringMarkers(month, day, dayOfWeek) {
        var markers = [];
        // Jumu'ah
        if (state.showJummah && dayOfWeek === 5) {
            markers.push({ type: 'jummah', label: "Jumu'ah" });
        }
        // Ayyam al-Beed
        if (state.showAyyam && (day === 13 || day === 14 || day === 15)) {
            markers.push({ type: 'fasting', label: 'Ayyam al-Beed (White Days) — Recommended fasting' });
        }
        // Monday/Thursday fasting
        if (state.showMonThu && (dayOfWeek === 1 || dayOfWeek === 4)) {
            markers.push({ type: 'sunnah', label: 'Sunnah fasting day (' + (dayOfWeek === 1 ? 'Monday' : 'Thursday') + ')' });
        }
        return markers;
    }

    // ── Rendering ──

    function renderCalendar() {
        var month = state.currentHijriMonth;
        var year = state.currentHijriYear;
        var monthData = HIJRI_MONTHS[month - 1];

        // Header
        elHijriMonthYear.textContent = monthData.en + ' ' + year + ' AH';
        elHijriMonthArabic.textContent = monthData.ar;

        // Gregorian range
        var firstGreg = findGregorianForHijri(month, year, 1);
        var daysInMonth = getDaysInHijriMonth(month, year);
        var lastGreg = new Date(firstGreg);
        lastGreg.setDate(lastGreg.getDate() + daysInMonth - 1);
        elGregorianRange.textContent =
            formatGregorianFull(firstGreg) + ' — ' + formatGregorianFull(lastGreg);

        // Today's Hijri date
        var todayHijri = gregorianToHijri(new Date());

        // First day of month - what weekday?
        var firstDayOfWeek = firstGreg.getDay(); // 0=Sunday

        // Build grid
        var html = '';

        // Empty cells before first day
        for (var e = 0; e < firstDayOfWeek; e++) {
            html += '<div class="day-cell empty"></div>';
        }

        // Day cells
        for (var d = 1; d <= daysInMonth; d++) {
            var gregDate = getGregorianForDay(month, year, d);
            var dow = (firstDayOfWeek + d - 1) % 7;
            var isToday = todayHijri.year === year && todayHijri.month === month && todayHijri.day === d;
            var isJummah = dow === 5;

            var events = getEventsForDay(month, d);
            var recurring = getRecurringMarkers(month, d, dow);

            var classes = 'day-cell';
            if (isToday) classes += ' today';
            if (isJummah) classes += ' jummah';

            html += '<div class="' + classes + '" data-day="' + d + '" data-dow="' + dow + '">';
            html += '<span class="day-number">' + d + '</span>';
            html += '<span class="day-gregorian">' + gregDate.getDate() + ' ' + GREG_MONTHS[gregDate.getMonth()].substring(0, 3) + '</span>';

            // Dots
            if (events.length > 0 || recurring.length > 0) {
                html += '<div class="day-dots">';
                // Show up to 5 dots for events
                var dotCount = 0;
                var seenCats = {};
                for (var ei = 0; ei < events.length && dotCount < 5; ei++) {
                    var cat = events[ei].category;
                    if (!seenCats[cat]) {
                        html += '<span class="day-dot" style="background:var(--color-' + cat + ')"></span>';
                        seenCats[cat] = true;
                        dotCount++;
                    }
                }
                for (var ri = 0; ri < recurring.length && dotCount < 6; ri++) {
                    html += '<span class="day-dot" style="background:var(--color-' + recurring[ri].type + ')"></span>';
                    dotCount++;
                }
                html += '</div>';
                if (events.length > 3) {
                    html += '<span class="day-event-count">+' + events.length + '</span>';
                }
            }

            html += '</div>';
        }

        elCalendarDays.innerHTML = html;

        // Attach events
        var cells = elCalendarDays.querySelectorAll('.day-cell:not(.empty)');
        cells.forEach(function (cell) {
            cell.addEventListener('mouseenter', onDayHover);
            cell.addEventListener('mouseleave', onDayLeave);
            cell.addEventListener('click', onDayClick);
        });

        // Render month summary
        renderMonthSummary(month, daysInMonth);
    }

    function renderMonthSummary(month, daysInMonth) {
        var allEvents = [];
        for (var d = 1; d <= daysInMonth; d++) {
            var events = getEventsForDay(month, d);
            events.forEach(function (ev) {
                allEvents.push({ day: d, event: ev });
            });
        }

        if (allEvents.length === 0) {
            elMonthEventsList.innerHTML = '<div class="no-events-msg">No special events this month</div>';
            return;
        }

        var html = '';
        allEvents.forEach(function (item) {
            var ev = item.event;
            var gregDate = getGregorianForDay(month, state.currentHijriYear, item.day);
            html += '<div class="month-event-item" data-day="' + item.day + '">';
            html += '<div class="month-event-day" style="color:var(--color-' + ev.category + ')">' + item.day + '<br><span style="font-size:0.55rem;color:var(--text-muted)">' + formatGregorianShort(gregDate) + '</span></div>';
            html += '<div class="month-event-info">';
            html += '<div class="month-event-name">';
            html += '<span class="dot dot-' + ev.category + '" style="margin-right:6px"></span>';
            html += ev.name;
            if (ev.nameAr) html += ' <span style="font-family:var(--font-arabic);color:var(--text-muted);font-size:0.8rem">' + ev.nameAr + '</span>';
            html += '</div>';
            html += '<div class="month-event-desc">' + ev.description.substring(0, 150) + (ev.description.length > 150 ? '...' : '') + '</div>';
            html += '</div>';
            html += '</div>';
        });

        elMonthEventsList.innerHTML = html;

        // Click to scroll to day
        elMonthEventsList.querySelectorAll('.month-event-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var day = this.getAttribute('data-day');
                var cell = elCalendarDays.querySelector('[data-day="' + day + '"]');
                if (cell) {
                    cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    cell.style.outline = '2px solid var(--color-today)';
                    setTimeout(function () { cell.style.outline = ''; }, 2000);
                    // Also show event panel on mobile
                    showEventPanel(parseInt(day));
                }
            });
        });
    }

    // ── Tooltip ──

    function buildEventHTML(events, recurring, day) {
        var month = state.currentHijriMonth;
        var year = state.currentHijriYear;
        var monthData = HIJRI_MONTHS[month - 1];
        var gregDate = getGregorianForDay(month, year, day);

        var html = '<div class="tooltip-date">' + day + ' ' + monthData.en + ' ' + year + ' AH' +
            ' <span class="arabic">' + monthData.ar + '</span>' +
            '<br><span style="font-size:0.8rem;color:var(--text-muted);font-weight:400">' +
            formatGregorianFull(gregDate) + '</span></div>';

        // Recurring markers
        recurring.forEach(function (r) {
            html += '<div class="tooltip-event">';
            html += '<div class="tooltip-event-header">';
            html += '<span class="dot dot-' + r.type + '"></span>';
            html += '<span class="tooltip-event-name">' + r.label + '</span>';
            html += '</div>';
            html += '</div>';
        });

        // Events
        events.forEach(function (ev) {
            html += '<div class="tooltip-event">';
            html += '<div class="tooltip-event-header">';
            html += '<span class="tooltip-event-cat cat-' + ev.category + '">' + ev.category + '</span>';
            html += '<span class="tooltip-event-name">' + ev.name + '</span>';
            html += '</div>';
            if (ev.nameAr) {
                html += '<div class="tooltip-event-name-ar">' + ev.nameAr + '</div>';
            }
            if (ev.year) {
                html += '<div class="tooltip-event-year">' + ev.year + ' AH</div>';
            }
            html += '<div class="tooltip-event-desc">' + ev.description + '</div>';
            if (ev.reference) {
                html += '<div class="tooltip-event-ref">' + ev.reference + '</div>';
            }
            html += '</div>';
        });

        if (events.length === 0 && recurring.length === 0) {
            html += '<div class="tooltip-event"><div class="tooltip-event-desc" style="color:var(--text-muted)">No special events on this day.</div></div>';
        }

        return html;
    }

    function onDayHover(e) {
        var cell = e.currentTarget;
        var day = parseInt(cell.getAttribute('data-day'));
        var dow = parseInt(cell.getAttribute('data-dow'));
        var events = getEventsForDay(state.currentHijriMonth, day);
        var recurring = getRecurringMarkers(state.currentHijriMonth, day, dow);

        elTooltipContent.innerHTML = buildEventHTML(events, recurring, day);
        elTooltip.classList.remove('hidden');

        positionTooltip(cell);
    }

    function positionTooltip(cell) {
        var rect = cell.getBoundingClientRect();
        var ttRect = elTooltip.getBoundingClientRect();
        var vw = window.innerWidth;
        var vh = window.innerHeight;

        var left = rect.right + 12;
        var top = rect.top;

        // If tooltip would go off right edge, show on left
        if (left + ttRect.width > vw - 20) {
            left = rect.left - ttRect.width - 12;
        }
        // If still off screen, center below
        if (left < 20) {
            left = Math.max(20, rect.left + rect.width / 2 - ttRect.width / 2);
            top = rect.bottom + 12;
        }
        // Don't go off bottom
        if (top + ttRect.height > vh - 20) {
            top = vh - ttRect.height - 20;
        }
        if (top < 20) top = 20;

        elTooltip.style.left = left + 'px';
        elTooltip.style.top = top + 'px';
    }

    function onDayLeave() {
        elTooltip.classList.add('hidden');
    }

    function onDayClick(e) {
        var cell = e.currentTarget;
        var day = parseInt(cell.getAttribute('data-day'));
        showEventPanel(day);
    }

    function showEventPanel(day) {
        var dow = getDayOfWeek(state.currentHijriMonth, state.currentHijriYear, day);
        var events = getEventsForDay(state.currentHijriMonth, day);
        var recurring = getRecurringMarkers(state.currentHijriMonth, day, dow);
        var monthData = HIJRI_MONTHS[state.currentHijriMonth - 1];

        var gregDate = getGregorianForDay(state.currentHijriMonth, state.currentHijriYear, day);
        elEventPanelTitle.innerHTML = day + ' ' + monthData.en + ' ' + state.currentHijriYear + ' AH' +
            ' <span style="font-size:0.8rem;color:var(--text-muted);font-weight:400">(' + formatGregorianFull(gregDate) + ')</span>';
        elEventPanelBody.innerHTML = buildEventHTML(events, recurring, day);
        elEventPanel.classList.remove('hidden');
        elEventPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ── Navigation ──

    function prevMonth() {
        if (state.currentHijriMonth === 1) {
            state.currentHijriMonth = 12;
            state.currentHijriYear--;
        } else {
            state.currentHijriMonth--;
        }
        renderCalendar();
    }

    function nextMonth() {
        if (state.currentHijriMonth === 12) {
            state.currentHijriMonth = 1;
            state.currentHijriYear++;
        } else {
            state.currentHijriMonth++;
        }
        renderCalendar();
    }

    function goToday() {
        var today = gregorianToHijri(new Date());
        state.currentHijriMonth = today.month;
        state.currentHijriYear = today.year;
        renderCalendar();
    }

    // ── Settings ──

    function loadSettings() {
        try {
            var saved = localStorage.getItem('hijriCalendarSettings');
            if (saved) {
                var s = JSON.parse(saved);
                state.adjustment = s.adjustment || 0;
                state.monthAdjustments = s.monthAdjustments || {};
                state.filters = s.filters || state.filters;
                state.showJummah = s.showJummah !== false;
                state.showAyyam = s.showAyyam !== false;
                state.showMonThu = s.showMonThu !== false;
            }
        } catch (e) { /* ignore */ }
    }

    function saveSettings() {
        try {
            localStorage.setItem('hijriCalendarSettings', JSON.stringify({
                adjustment: state.adjustment,
                monthAdjustments: state.monthAdjustments,
                filters: state.filters,
                showJummah: state.showJummah,
                showAyyam: state.showAyyam,
                showMonThu: state.showMonThu
            }));
        } catch (e) { /* ignore */ }
    }

    function renderMonthAdjustments() {
        var container = $('monthAdjustments');
        var html = '';
        for (var m = 0; m < 12; m++) {
            var monthNum = m + 1;
            var val = state.monthAdjustments[monthNum] || 0;
            html += '<div class="month-adj-item">';
            html += '<span class="month-adj-name">' + HIJRI_MONTHS[m].en + '</span>';
            html += '<div class="month-adj-controls">';
            html += '<button class="adj-btn adj-btn-sm" data-month-adj="' + monthNum + '" data-dir="-1"><i class="fas fa-minus"></i></button>';
            html += '<span class="adj-value-sm" id="monthAdj' + monthNum + '">' + val + '</span>';
            html += '<button class="adj-btn adj-btn-sm" data-month-adj="' + monthNum + '" data-dir="1"><i class="fas fa-plus"></i></button>';
            html += '</div>';
            html += '</div>';
        }
        container.innerHTML = html;

        // Attach listeners
        container.querySelectorAll('[data-month-adj]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var m = parseInt(this.getAttribute('data-month-adj'));
                var dir = parseInt(this.getAttribute('data-dir'));
                var el = $('monthAdj' + m);
                var val = parseInt(el.textContent) || 0;
                val += dir;
                if (val >= -3 && val <= 3) el.textContent = val;
            });
        });
    }

    function openSettings() {
        // Populate UI from state
        elAdjustValue.textContent = state.adjustment;

        document.querySelectorAll('[data-filter]').forEach(function (cb) {
            cb.checked = state.filters[cb.getAttribute('data-filter')] !== false;
        });
        $('chkJummah').checked = state.showJummah;
        $('chkAyyam').checked = state.showAyyam;
        $('chkMonThu').checked = state.showMonThu;

        renderMonthAdjustments();

        elSettingsModal.classList.remove('hidden');
    }

    function closeSettings() {
        elSettingsModal.classList.add('hidden');
    }

    function applySettings() {
        state.adjustment = parseInt(elAdjustValue.textContent) || 0;

        // Read per-month adjustments
        state.monthAdjustments = {};
        for (var m = 1; m <= 12; m++) {
            var el = $('monthAdj' + m);
            if (el) {
                var val = parseInt(el.textContent) || 0;
                if (val !== 0) state.monthAdjustments[m] = val;
            }
        }

        document.querySelectorAll('[data-filter]').forEach(function (cb) {
            state.filters[cb.getAttribute('data-filter')] = cb.checked;
        });
        state.showJummah = $('chkJummah').checked;
        state.showAyyam = $('chkAyyam').checked;
        state.showMonThu = $('chkMonThu').checked;

        // Clear conversion cache since adjustment changed
        _hijriCache = {};

        saveSettings();
        closeSettings();
        goToday();
    }

    function resetSettings() {
        state.adjustment = 0;
        state.monthAdjustments = {};
        state.filters = {
            battle: true, historical: true, birth: true, death: true,
            revelation: true, miracle: true, fasting: true, worship: true,
            celebration: true, treaty: true
        };
        state.showJummah = true;
        state.showAyyam = true;
        state.showMonThu = true;
        _hijriCache = {};
        saveSettings();
        openSettings(); // Refresh UI
    }

    // ── Theme ──

    function initTheme() {
        var saved = localStorage.getItem('theme') || 'light';
        setTheme(saved);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        var icon = $('themeToggle').querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    // ── Initialize ──

    function init() {
        initTheme();
        loadSettings();

        // Set to today's Hijri date
        var today = gregorianToHijri(new Date());
        state.currentHijriMonth = today.month;
        state.currentHijriYear = today.year;

        // Sync quick filter pills with loaded state
        document.querySelectorAll('.filter-pill[data-cat]').forEach(function (pill) {
            var cat = pill.getAttribute('data-cat');
            if (cat !== 'all') {
                pill.classList.toggle('active', state.filters[cat] !== false);
            }
        });
        var allActive = Object.keys(state.filters).every(function (k) { return state.filters[k]; });
        var allPill = document.querySelector('.filter-pill[data-cat="all"]');
        if (allPill) allPill.classList.toggle('active', allActive);

        // Event listeners
        $('btnPrevMonth').addEventListener('click', prevMonth);
        $('btnNextMonth').addEventListener('click', nextMonth);
        $('btnToday').addEventListener('click', goToday);
        $('themeToggle').addEventListener('click', toggleTheme);
        $('btnSettings').addEventListener('click', openSettings);
        $('btnCloseSettings').addEventListener('click', closeSettings);
        $('btnSaveSettings').addEventListener('click', applySettings);
        $('btnResetSettings').addEventListener('click', resetSettings);
        $('btnClosePanel').addEventListener('click', function () {
            elEventPanel.classList.add('hidden');
        });

        // Adjustment buttons
        $('btnAdjustMinus').addEventListener('click', function () {
            var val = parseInt(elAdjustValue.textContent) || 0;
            if (val > -3) elAdjustValue.textContent = val - 1;
        });
        $('btnAdjustPlus').addEventListener('click', function () {
            var val = parseInt(elAdjustValue.textContent) || 0;
            if (val < 3) elAdjustValue.textContent = val + 1;
        });

        // Close modal on overlay click
        elSettingsModal.addEventListener('click', function (e) {
            if (e.target === elSettingsModal) closeSettings();
        });

        // Quick category filter pills
        document.querySelectorAll('.filter-pill[data-cat]').forEach(function (pill) {
            pill.addEventListener('click', function () {
                var cat = this.getAttribute('data-cat');
                if (cat === 'all') {
                    // Toggle all on/off
                    var allActive = Object.keys(state.filters).every(function (k) { return state.filters[k]; });
                    var newVal = !allActive;
                    Object.keys(state.filters).forEach(function (k) { state.filters[k] = newVal; });
                    document.querySelectorAll('.filter-pill[data-cat]').forEach(function (p) {
                        p.classList.toggle('active', newVal);
                    });
                } else {
                    state.filters[cat] = !state.filters[cat];
                    this.classList.toggle('active', state.filters[cat]);
                    // Update "All" pill
                    var allActive = Object.keys(state.filters).every(function (k) { return state.filters[k]; });
                    document.querySelector('.filter-pill[data-cat="all"]').classList.toggle('active', allActive);
                }
                saveSettings();
                renderCalendar();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (elSettingsModal.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') prevMonth();
                else if (e.key === 'ArrowRight') nextMonth();
                else if (e.key === 't' || e.key === 'T') goToday();
            } else if (e.key === 'Escape') {
                closeSettings();
            }
        });

        renderCalendar();
    }

    // Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
