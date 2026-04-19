// ═══════════════════════════════════════
// BODY BLUEPRINT — APP LOGIC
// ═══════════════════════════════════════
// All data comes from hardcoded constants in data.js — no user input is injected into HTML.

const STATE = {
    level: localStorage.getItem('bb_level') || 'beginner',
    filter: 'all',
    selectedDay: null // null = follow real today; number 0-6 = user-picked day
};

// Small DOM helper — creates an element with props/children (avoids innerHTML interpretation)
function h(tag, props, children) {
    const el = document.createElement(tag);
    if (props) {
        for (const k in props) {
            if (k === 'class') el.className = props[k];
            else if (k === 'html') el.innerHTML = props[k]; // trusted constant strings only
            else if (k === 'style') el.setAttribute('style', props[k]);
            else if (k.startsWith('data-')) el.setAttribute(k, props[k]);
            else if (k === 'onclick') el.addEventListener('click', props[k]);
            else el[k] = props[k];
        }
    }
    if (children != null) {
        if (!Array.isArray(children)) children = [children];
        children.forEach(c => {
            if (c == null || c === false) return;
            if (typeof c === 'string' || typeof c === 'number') el.appendChild(document.createTextNode(c));
            else el.appendChild(c);
        });
    }
    return el;
}
const txt = (s) => document.createTextNode(String(s));
const icon = (cls) => h('i', { class: cls });

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderLevels();
    renderSchedule();
    renderChallenge();
    renderToday();
    renderSixPack();
    renderLibraryFilters();
    renderLibrary();
    renderBenchmark();
    renderStats();
    renderPrinciples();
    renderResources();
    initCounters();
    initRamadanToggle();
    initCalorieCalc();
    initTimer();
    initProgress();
    initGrocery();
    initStatsLog();
    initWaterSleep();
});

// ── THEME ──
function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    const ic = document.querySelector('#themeToggle i');
    if (ic) ic.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    document.getElementById('themeToggle').addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        if (ic) ic.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// ── LEVELS ──
function renderLevels() {
    const grid = document.getElementById('levelGrid');
    grid.replaceChildren();
    LEVELS.forEach(l => {
        const active = STATE.level === l.id;
        const card = h('div', {
            class: 'level-card ' + l.color + (active ? ' active' : ''),
            'data-level': l.id,
            onclick: () => {
                STATE.level = l.id;
                localStorage.setItem('bb_level', l.id);
                renderLevels();
                renderSchedule();
                renderToday();
            }
        }, [
            h('div', { class: 'level-icon' }, icon(l.icon)),
            h('div', { class: 'level-head' }, [
                h('span', { class: 'level-sub' }, l.sub),
                h('h3', null, l.name)
            ]),
            h('p', { class: 'level-blurb' }, l.blurb),
            h('div', { class: 'level-meta' }, [
                h('div', null, [h('span', { class: 'meta-k' }, 'FOCUS'), h('span', { class: 'meta-v' }, l.focus)]),
                h('div', null, [h('span', { class: 'meta-k' }, 'PREREQUISITE'), h('span', { class: 'meta-v' }, l.prereq)])
            ]),
            h('button', { class: 'level-select' }, active ? '✓ ACTIVE PHASE' : 'SET AS MY PHASE')
        ]);
        grid.appendChild(card);
    });
}

// ── SCHEDULE ──
function renderSchedule() {
    const grid = document.getElementById('scheduleGrid');
    grid.replaceChildren();
    const todayIdx = getTodayIdx();
    const activeIdx = getActiveDayIdx();
    DAY_FOCUS.forEach((d, i) => {
        const plan = PLAN[STATE.level][i] || [];
        const isToday = i === todayIdx;
        const isActive = i === activeIdx;
        const isRest = d.key === 'rest';
        const classes = 'sched-card'
            + (isToday ? ' today' : '')
            + (isActive && !isToday ? ' selected' : '')
            + (isRest ? ' rest' : '');
        const card = h('div', {
            class: classes,
            style: '--accent:' + d.accent,
            onclick: () => selectDay(i)
        }, [
            h('div', { class: 'sched-top' }, [
                h('span', { class: 'sched-day' }, DAY_NAMES[i].slice(0,3).toUpperCase()),
                isToday ? h('span', { class: 'sched-pill' }, 'TODAY') :
                    (isActive ? h('span', { class: 'sched-pill picked' }, 'VIEWING') : null)
            ]),
            h('div', { class: 'sched-icon' }, icon(d.icon)),
            h('h4', null, d.name),
            h('p', { class: 'sched-sub' }, d.sub),
            h('div', { class: 'sched-count' }, isRest ? 'Active recovery' : plan.length + ' exercises')
        ]);
        grid.appendChild(card);
    });
}

function selectDay(idx) {
    const todayIdx = getTodayIdx();
    STATE.selectedDay = idx === todayIdx ? null : idx;
    renderSchedule();
    renderToday();
    // Smooth scroll to the session section
    document.getElementById('today').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getTodayIdx() {
    const js = new Date().getDay();
    return js === 0 ? 6 : js - 1;
}

function getActiveDayIdx() {
    return STATE.selectedDay == null ? getTodayIdx() : STATE.selectedDay;
}

// ── TODAY ──
const LEVEL_REPS = {
    foundation: ['2 × 5', '2 × 8', '2 × 10', '20s hold', '2 × 6', '15s hold', '2 × 30s'],
    beginner:   ['3 × 8', '3 × 10', '3 × 12', '30s hold', '3 × 8', '30s hold', '3 × 45s'],
    intermediate: ['4 × 10', '4 × 12', '4 × 15', '45s hold', '4 × 10', '45s hold', '4 × 60s'],
    advanced:   ['4 × 8 (hard var.)', '5 × 10', '4 × 12', '60s hold', '5 × 8', '60s hold', '5 × 45s'],
    mastery:    ['5 × 5-8 (elite)', '5 × 8', '5 × 10', 'Max hold', '5 × 5', 'Max hold', '5 × 60s+']
};

function prescriptionFor(exerciseId, level) {
    const bank = LEVEL_REPS[level];
    let sum = 0;
    for (let i = 0; i < exerciseId.length; i++) sum += exerciseId.charCodeAt(i);
    return bank[sum % bank.length];
}

function renderToday() {
    const idx = getActiveDayIdx();
    const todayIdx = getTodayIdx();
    const isViewingToday = idx === todayIdx;
    const day = DAY_FOCUS[idx];
    const card = document.getElementById('todayCard');
    card.replaceChildren();
    document.getElementById('todayDayLabel').textContent = isViewingToday ? 'today' : DAY_NAMES[idx];

    // "Back to today" chip when viewing a non-today day
    if (!isViewingToday) {
        const back = h('div', { class: 'day-nav' }, [
            h('span', { class: 'day-nav-label' }, 'VIEWING ' + DAY_NAMES[idx].toUpperCase() + '\'S PLAN'),
            h('button', {
                class: 'day-nav-btn',
                onclick: () => selectDay(todayIdx)
            }, [icon('fas fa-arrow-left'), ' Back to today (', DAY_NAMES[todayIdx], ')'])
        ]);
        card.appendChild(back);
    }

    if (day.key === 'rest') {
        const heading = isViewingToday ? 'Today is Rest Day' : DAY_NAMES[idx] + ' is a Rest Day';
        card.appendChild(
            h('div', { class: 'rest-card' }, [
                h('div', { class: 'rest-icon' }, icon('fas fa-moon')),
                h('h3', null, heading),
                h('p', null, 'Muscle rebuilds when you sleep, not when you train. Drink water. Walk 5-10k steps. Stretch gently. Your next session will be stronger because of today.'),
                h('div', { class: 'rest-check' }, [icon('fas fa-check'), ' Aim for 7-9 hours of sleep']),
                h('div', { class: 'rest-check' }, [icon('fas fa-check'), ' Protein intake stays the same']),
                h('div', { class: 'rest-check' }, [icon('fas fa-check'), ' 10-20 min of easy walking'])
            ])
        );
        return;
    }

    const plan = PLAN[STATE.level][idx] || [];
    const exercises = plan.map(id => EXERCISES.find(e => e.id === id)).filter(Boolean);

    card.appendChild(
        h('div', { class: 'today-hero', style: '--accent:' + day.accent }, [
            h('div', { class: 'today-icon' }, icon(day.icon)),
            h('div', null, [
                h('div', { class: 'today-eyebrow' }, STATE.level.toUpperCase() + ' · ' + DAY_NAMES[idx]),
                h('h3', null, day.name),
                h('p', null, day.sub)
            ]),
            h('div', { class: 'today-time' }, [icon('fas fa-clock'), ' ~ 35-50 min'])
        ])
    );

    card.appendChild(
        h('div', { class: 'today-warmup' }, [
            h('div', { class: 'warmup-head' }, [icon('fas fa-fire'), ' WARM-UP (5 min)']),
            h('p', null, 'Jumping jacks 60s · Arm circles 30s each way · Cat-cow × 10 · Bodyweight squats × 15 · Shoulder dislocates × 10')
        ])
    );

    const exList = h('div', { class: 'today-exercises' });
    exercises.forEach((e, i) => {
        exList.appendChild(buildTodayExercise(e, i, idx));
    });
    card.appendChild(exList);
    updateTodayProgress(idx);

    card.appendChild(
        h('div', { class: 'today-cooldown' }, [
            h('div', { class: 'warmup-head' }, [icon('fas fa-feather'), ' COOL-DOWN (3-5 min)']),
            h('p', null, 'Deep breathing · Forward fold × 30s · Cobra × 30s · Child\'s pose × 30s · Hydrate.')
        ])
    );
}

// ── LIBRARY ──
const FILTER_CATS = [
    { k: 'all', n: 'All', i: 'fas fa-th' },
    { k: 'push', n: 'Push', i: 'fas fa-hand-fist' },
    { k: 'pull', n: 'Pull', i: 'fas fa-hand-back-fist' },
    { k: 'legs', n: 'Legs', i: 'fas fa-person-walking' },
    { k: 'core', n: 'Core', i: 'fas fa-shield-halved' },
    { k: 'flex', n: 'Flexibility', i: 'fas fa-feather' },
    { k: 'skill', n: 'Skills', i: 'fas fa-bolt' },
    { k: 'cardio', n: 'Cardio', i: 'fas fa-heart-pulse' }
];

function renderLibraryFilters() {
    const el = document.getElementById('libraryFilters');
    el.replaceChildren();
    FILTER_CATS.forEach(c => {
        const btn = h('button', {
            class: 'filter-pill' + (STATE.filter === c.k ? ' active' : ''),
            'data-k': c.k,
            onclick: () => {
                STATE.filter = c.k;
                renderLibraryFilters();
                renderLibrary();
            }
        }, [icon(c.i), ' ' + c.n]);
        el.appendChild(btn);
    });
}

function renderLibrary() {
    const list = STATE.filter === 'all' ? EXERCISES : EXERCISES.filter(e => e.cat === STATE.filter);
    const grid = document.getElementById('exerciseGrid');
    grid.replaceChildren();
    list.forEach(e => {
        const dots = h('div', { class: 'ex-dots', title: 'Difficulty' });
        for (let i = 0; i < 5; i++) dots.appendChild(h('span', { class: 'dot' + (i < e.difficulty ? ' on' : '') }));
        grid.appendChild(
            h('div', { class: 'ex-card cat-' + e.cat }, [
                h('div', { class: 'ex-head' }, [
                    h('span', { class: 'ex-cat' }, e.cat.toUpperCase()),
                    dots
                ]),
                h('h4', null, e.name),
                h('div', { class: 'ex-muscles' }, e.muscles.map(m => h('span', null, m))),
                h('p', { class: 'ex-desc' }, e.desc),
                h('p', { class: 'ex-tip' }, [icon('fas fa-lightbulb'), ' ', e.tip]),
                h('a', { href: e.video, target: '_blank', class: 'ex-video' }, [icon('fas fa-play-circle'), ' Watch form video'])
            ])
        );
    });
}

// ── PRINCIPLES + RESOURCES ──
function renderPrinciples() {
    const grid = document.getElementById('principleGrid');
    grid.replaceChildren();
    PRINCIPLES.forEach((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        grid.appendChild(
            h('div', { class: 'principle-card' }, [
                h('span', { class: 'pr-num' }, num),
                h('div', { class: 'pr-icon' }, icon(p.icon)),
                h('h4', null, p.title),
                h('p', null, p.desc)
            ])
        );
    });
}

function renderResources() {
    const grid = document.getElementById('resourceGrid');
    grid.replaceChildren();
    RESOURCES.forEach(r => {
        grid.appendChild(
            h('a', { class: 'res-card', href: r.url, target: '_blank' }, [
                h('div', { class: 'res-icon' }, icon('fab fa-youtube')),
                h('div', { class: 'res-body' }, [
                    h('h4', null, r.name),
                    h('span', { class: 'res-handle' }, r.handle),
                    h('p', null, r.desc),
                    h('span', { class: 'res-vibe' }, r.vibe)
                ]),
                h('i', { class: 'fas fa-arrow-up-right-from-square res-arrow' })
            ])
        );
    });
}

// ── COUNTERS ──
function initCounters() {
    const els = document.querySelectorAll('.stat .n');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                els.forEach(el => {
                    const target = parseInt(el.dataset.target);
                    const dur = 1500;
                    const start = performance.now();
                    function tick(now) {
                        const p = Math.min((now - start) / dur, 1);
                        const eased = 1 - Math.pow(1 - p, 3);
                        el.textContent = Math.floor(eased * target);
                        if (p < 1) requestAnimationFrame(tick);
                        else el.textContent = target;
                    }
                    requestAnimationFrame(tick);
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.3 });
    const bar = document.querySelector('.stats-bar');
    if (bar) obs.observe(bar);
}

// ── CALORIE CALCULATOR ──
function initCalorieCalc() {
    ['calcAge','calcWeight','calcHeight','calcActivity','calcGoal','sexM','sexF'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.addEventListener('change', calculate); el.addEventListener('input', calculate); }
    });
    calculate();
}

function calculate() {
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const age = parseFloat(document.getElementById('calcAge').value) || 25;
    const weight = parseFloat(document.getElementById('calcWeight').value) || 70;
    const height = parseFloat(document.getElementById('calcHeight').value) || 172;
    const activity = parseFloat(document.getElementById('calcActivity').value) || 1.55;
    const goal = document.getElementById('calcGoal').value;

    const bmr = sex === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const tdee = bmr * activity;
    let target = tdee, deltaNote = 'maintenance';
    if (goal === 'cut') { target = tdee - 500; deltaNote = 'cutting (~0.5 kg/wk fat loss)'; }
    else if (goal === 'lean-bulk') { target = tdee + 300; deltaNote = 'lean bulk (~0.3 kg/wk gain)'; }

    const protein = Math.round(weight * (goal === 'cut' ? 2.2 : 1.8));
    const fat = Math.round(target * 0.25 / 9);
    const carbs = Math.round((target - protein * 4 - fat * 9) / 4);

    const res = document.getElementById('calcResults');
    res.replaceChildren();
    res.appendChild(
        h('div', { class: 'result-row primary' }, [
            h('div', { class: 'result-label' }, 'Daily Target'),
            h('div', { class: 'result-val' }, [txt(String(Math.round(target))), h('span', null, 'kcal')]),
            h('div', { class: 'result-note' }, deltaNote)
        ])
    );
    res.appendChild(
        h('div', { class: 'result-macros' }, [
            h('div', { class: 'macro' }, [h('span', { class: 'm-k' }, 'Protein'), h('span', { class: 'm-v' }, protein + 'g')]),
            h('div', { class: 'macro' }, [h('span', { class: 'm-k' }, 'Carbs'), h('span', { class: 'm-v' }, carbs + 'g')]),
            h('div', { class: 'macro' }, [h('span', { class: 'm-k' }, 'Fat'), h('span', { class: 'm-v' }, fat + 'g')])
        ])
    );
    res.appendChild(
        h('div', { class: 'result-ref' }, [
            h('span', null, 'BMR · ' + Math.round(bmr) + ' kcal'),
            h('span', null, 'TDEE · ' + Math.round(tdee) + ' kcal')
        ])
    );

    renderMealPlan(Math.round(target));
}

function renderMealPlan(targetKcal) {
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const rows = [
        { label: 'Breakfast', time: '7-9 AM', meal: pick(MEALS.breakfast) },
        { label: 'Lunch', time: '12:30-2 PM', meal: pick(MEALS.lunch) },
        { label: 'Snack', time: '4-5 PM', meal: pick(MEALS.snack) },
        { label: 'Dinner', time: '7-8:30 PM', meal: pick(MEALS.dinner) }
    ];
    const total = rows.reduce((s, r) => s + r.meal.kcal, 0);
    const diff = targetKcal - total;

    const container = document.getElementById('mealPlan');
    container.replaceChildren();
    rows.forEach(r => {
        container.appendChild(
            h('div', { class: 'meal-row' }, [
                h('div', { class: 'meal-head' }, [
                    h('span', { class: 'meal-label' }, r.label),
                    h('span', { class: 'meal-time' }, r.time)
                ]),
                h('div', { class: 'meal-name' }, r.meal.name),
                h('p', { class: 'meal-items' }, r.meal.items),
                h('div', { class: 'meal-macros' }, [
                    h('span', null, r.meal.kcal + ' kcal'),
                    h('span', null, 'P: ' + r.meal.p + 'g'),
                    h('span', null, 'C: ' + r.meal.c + 'g'),
                    h('span', null, 'F: ' + r.meal.f + 'g')
                ])
            ])
        );
    });
    const diffText = (diff > 0 ? '+' + diff : String(diff)) + ' vs target';
    container.appendChild(
        h('div', { class: 'meal-total' }, [
            h('span', null, [txt('Day Total: '), h('strong', null, total + ' kcal')]),
            h('span', { class: Math.abs(diff) < 200 ? 'ok' : 'warn' }, diffText),
            h('button', { class: 'btn-shuffle', onclick: calculate }, [icon('fas fa-shuffle'), ' Shuffle'])
        ])
    );
}

// ── REST TIMER ──
let timerInterval = null;
let timerRemaining = 30;
let timerTotal = 30;

function initTimer() {
    document.querySelectorAll('.btn-timer').forEach(b => {
        b.addEventListener('click', () => {
            timerTotal = parseInt(b.dataset.seconds);
            timerRemaining = timerTotal;
            document.querySelectorAll('.btn-timer').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            updateTimerDisplay();
            stopTimer();
        });
    });
    document.getElementById('timerStart').addEventListener('click', toggleTimer);
    document.getElementById('timerReset').addEventListener('click', () => {
        timerRemaining = timerTotal;
        stopTimer();
        updateTimerDisplay();
    });
    const first = document.querySelector('.btn-timer[data-seconds="30"]');
    if (first) first.classList.add('active');
    updateTimerDisplay();
}

function toggleTimer() {
    const btn = document.getElementById('timerStart');
    if (timerInterval) {
        stopTimer();
    } else {
        timerInterval = setInterval(() => {
            timerRemaining--;
            updateTimerDisplay();
            if (timerRemaining <= 0) {
                stopTimer();
                try { navigator.vibrate && navigator.vibrate([200,100,200,100,400]); } catch(_) {}
                playBeep();
                timerRemaining = timerTotal;
                updateTimerDisplay();
            }
        }, 1000);
        btn.replaceChildren(icon('fas fa-pause'), txt(' Pause'));
    }
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
    const btn = document.getElementById('timerStart');
    if (btn) btn.replaceChildren(icon('fas fa-play'), txt(' Start'));
}

function updateTimerDisplay() {
    const m = Math.floor(timerRemaining / 60);
    const s = timerRemaining % 60;
    const display = document.getElementById('timerDisplay');
    display.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    const p = 1 - (timerRemaining / timerTotal);
    display.style.setProperty('--p', p);
}

function playBeep() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.start(); osc.stop(ctx.currentTime + 0.6);
    } catch(_) {}
}

// ── PROGRESS TRACKING ──
function initProgress() {
    renderProgress();
    document.getElementById('logTodayBtn').addEventListener('click', () => {
        const today = new Date().toISOString().slice(0, 10);
        const log = JSON.parse(localStorage.getItem('bb_log') || '[]');
        if (!log.includes(today)) {
            log.push(today);
            localStorage.setItem('bb_log', JSON.stringify(log));
        }
        renderProgress();
    });
}

function renderProgress() {
    const log = JSON.parse(localStorage.getItem('bb_log') || '[]');
    const today = new Date().toISOString().slice(0, 10);
    const hasToday = log.includes(today);

    let streak = 0;
    const d = new Date();
    while (log.includes(d.toISOString().slice(0,10))) {
        streak++;
        d.setDate(d.getDate() - 1);
    }

    const weekStart = new Date();
    const dayOffset = weekStart.getDay() === 0 ? 6 : weekStart.getDay() - 1;
    weekStart.setDate(weekStart.getDate() - dayOffset);
    weekStart.setHours(0,0,0,0);
    const weekCount = log.filter(ds => new Date(ds) >= weekStart).length;

    document.getElementById('progStreak').textContent = streak;
    document.getElementById('progTotal').textContent = log.length;
    document.getElementById('progWeek').textContent = weekCount;

    const btn = document.getElementById('logTodayBtn');
    const note = document.getElementById('logNote');
    btn.replaceChildren();
    if (hasToday) {
        btn.appendChild(icon('fas fa-check-circle'));
        btn.appendChild(txt(' Today Logged ✓'));
        btn.disabled = true;
        note.textContent = 'Session recorded. See you tomorrow.';
    } else {
        btn.appendChild(icon('fas fa-check-circle'));
        btn.appendChild(txt(' Log Today'));
        btn.disabled = false;
        note.textContent = 'Complete today\'s session then log it to grow your streak.';
    }

    const strip = document.getElementById('calendarStrip');
    strip.replaceChildren();
    strip.appendChild(h('div', { class: 'cal-strip-label' }, 'LAST 30 DAYS'));
    const dots = h('div', { class: 'cal-dots' });
    for (let i = 29; i >= 0; i--) {
        const dd = new Date();
        dd.setDate(dd.getDate() - i);
        const iso = dd.toISOString().slice(0,10);
        const done = log.includes(iso);
        const isToday = iso === today;
        dots.appendChild(h('div', {
            class: 'cal-dot' + (done ? ' done' : '') + (isToday ? ' today' : ''),
            title: iso
        }));
    }
    strip.appendChild(dots);
}

// ═══════════════════════════════════════
// INTERACTIVE SET TRACKER (inside Today)
// ═══════════════════════════════════════
function parseSetCount(presc) {
    // "3 × 10" → {sets: 3, mode: 'reps'}; "30s hold" → {sets: 1, mode: 'hold'}
    const m = presc.match(/^(\d+)\s*[×x]/);
    if (m) return { sets: parseInt(m[1]), mode: 'reps' };
    return { sets: 1, mode: 'hold' };
}

function getSetsKey(dayIdx, exerciseId) {
    const today = new Date().toISOString().slice(0, 10);
    return 'bb_sets_' + today + '_' + dayIdx + '_' + exerciseId;
}

function getSetsState(dayIdx, exerciseId, count) {
    const raw = localStorage.getItem(getSetsKey(dayIdx, exerciseId));
    if (!raw) return new Array(count).fill(false);
    try { const arr = JSON.parse(raw); if (arr.length !== count) return new Array(count).fill(false); return arr; }
    catch(_) { return new Array(count).fill(false); }
}

function saveSetsState(dayIdx, exerciseId, state) {
    localStorage.setItem(getSetsKey(dayIdx, exerciseId), JSON.stringify(state));
}

function buildTodayExercise(e, idx, dayIdx) {
    const presc = prescriptionFor(e.id, STATE.level);
    const info = parseSetCount(presc);
    const state = getSetsState(dayIdx, e.id, info.sets);
    const setsBox = h('div', { class: 'set-tracker' });
    for (let s = 0; s < info.sets; s++) {
        const dot = h('button', {
            class: 'set-dot' + (state[s] ? ' done' : ''),
            title: 'Set ' + (s + 1),
            onclick: () => {
                state[s] = !state[s];
                saveSetsState(dayIdx, e.id, state);
                dot.className = 'set-dot' + (state[s] ? ' done' : '');
                updateTodayProgress(dayIdx);
            }
        }, String(s + 1));
        setsBox.appendChild(dot);
    }

    const swaps = SWAPS[e.id] || [];
    const swapBtn = swaps.length > 0 ? h('button', {
        class: 'swap-btn',
        onclick: (ev) => {
            ev.preventDefault();
            const pop = ev.currentTarget.nextElementSibling;
            if (pop) pop.classList.toggle('open');
        }
    }, [icon('fas fa-shuffle'), ' Swap']) : null;

    const swapPop = swaps.length > 0 ? h('div', { class: 'swap-pop' }, [
        h('span', { class: 'swap-label' }, 'ALTERNATIVES'),
        ...swaps.map(s => {
            const alt = EXERCISES.find(x => x.id === s.id);
            if (!alt) return null;
            return h('a', {
                href: alt.video, target: '_blank', class: 'swap-item'
            }, [
                h('div', { class: 'swap-item-head' }, [
                    h('strong', null, alt.name),
                    h('span', { class: 'swap-reason' }, s.reason)
                ]),
                h('span', { class: 'swap-desc' }, alt.desc.slice(0, 80) + '...')
            ]);
        }).filter(Boolean)
    ]) : null;

    return h('div', { class: 'today-ex', 'data-ex': e.id }, [
        h('div', { class: 'today-ex-num' }, String(idx + 1)),
        h('div', { class: 'today-ex-body' }, [
            h('div', { class: 'today-ex-head' }, [
                h('h4', null, e.name),
                h('span', { class: 'today-presc' }, presc)
            ]),
            setsBox,
            h('div', { class: 'today-ex-muscles' }, e.muscles.map(m => h('span', null, m))),
            h('p', { class: 'today-ex-desc' }, e.desc),
            h('p', { class: 'today-tip' }, [icon('fas fa-lightbulb'), ' ', e.tip]),
            h('div', { class: 'today-ex-actions' }, [
                h('a', { href: e.video, target: '_blank', class: 'today-video' }, [icon('fas fa-play'), ' Form video']),
                swapBtn,
                swapPop
            ])
        ])
    ]);
}

function updateTodayProgress(dayIdx) {
    const card = document.getElementById('todayCard');
    if (!card) return;
    let existing = card.querySelector('.today-progress');
    const heroEl = card.querySelector('.today-hero');
    if (!heroEl) return;

    const plan = PLAN[STATE.level][dayIdx] || [];
    let total = 0, done = 0;
    plan.forEach(id => {
        const info = parseSetCount(prescriptionFor(id, STATE.level));
        total += info.sets;
        const state = getSetsState(dayIdx, id, info.sets);
        done += state.filter(Boolean).length;
    });
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    const bar = h('div', { class: 'today-progress' }, [
        h('div', { class: 'tp-head' }, [
            h('span', null, done + ' / ' + total + ' sets'),
            h('span', null, pct + '%')
        ]),
        h('div', { class: 'tp-track' }, h('div', { class: 'tp-fill', style: 'width:' + pct + '%' }))
    ]);
    if (existing) existing.replaceWith(bar);
    else heroEl.after(bar);
}

// ═══════════════════════════════════════
// WEEKLY CHALLENGE
// ═══════════════════════════════════════
function getIsoWeek() {
    const d = new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return d.getFullYear() + '-W' + week;
}

function renderChallenge() {
    const container = document.getElementById('challengeCard');
    if (!container) return;
    const week = getIsoWeek();
    const weekNum = parseInt(week.split('W')[1]) || 1;
    const ch = CHALLENGES[weekNum % CHALLENGES.length];
    const key = 'bb_ch_' + week;
    const progress = parseInt(localStorage.getItem(key) || '0');
    const pct = Math.min(100, Math.round((progress / ch.goal) * 100));

    container.replaceChildren();
    container.appendChild(
        h('div', { class: 'ch-hero' }, [
            h('div', { class: 'ch-icon' }, icon(ch.icon)),
            h('div', { class: 'ch-info' }, [
                h('div', { class: 'ch-week' }, week.toUpperCase() + ' · CHALLENGE'),
                h('h3', null, ch.title),
                h('p', null, ch.desc)
            ]),
            h('div', { class: 'ch-count' }, [
                h('div', { class: 'ch-count-num' }, progress + ' / ' + ch.goal),
                h('div', { class: 'ch-count-label' }, ch.unit)
            ])
        ])
    );
    container.appendChild(
        h('div', { class: 'ch-bar' }, h('div', { class: 'ch-bar-fill', style: 'width:' + pct + '%' }))
    );
    container.appendChild(
        h('div', { class: 'ch-actions' }, [
            h('button', {
                class: 'ch-btn',
                onclick: () => logChallengeStep(key, ch, 10)
            }, '+10'),
            h('button', {
                class: 'ch-btn',
                onclick: () => logChallengeStep(key, ch, 25)
            }, '+25'),
            h('button', {
                class: 'ch-btn',
                onclick: () => logChallengeStep(key, ch, 50)
            }, '+50'),
            h('button', {
                class: 'ch-btn reset',
                onclick: () => { localStorage.removeItem(key); renderChallenge(); }
            }, [icon('fas fa-rotate-left'), ' Reset'])
        ])
    );
}

function logChallengeStep(key, ch, amount) {
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, String(Math.min(ch.goal + amount, current + amount)));
    renderChallenge();
}

// ═══════════════════════════════════════
// 6-PACK PROTOCOL
// ═══════════════════════════════════════
let sixpackInterval = null;
let sixpackIdx = 0;
let sixpackRemaining = 0;

function renderSixPack() {
    const card = document.getElementById('sixpackCard');
    if (!card) return;
    card.replaceChildren();
    card.appendChild(
        h('div', { class: 'sp-head' }, [
            h('h3', null, SIXPACK.title),
            h('p', null, SIXPACK.intro),
            h('p', { class: 'sp-note' }, [icon('fas fa-apple-whole'), ' ', SIXPACK.note])
        ])
    );
    const circ = h('ol', { class: 'sp-circuit' });
    SIXPACK.circuit.forEach((ex, i) => {
        circ.appendChild(
            h('li', { class: 'sp-item', 'data-i': String(i) }, [
                h('div', { class: 'sp-i-num' }, String(i + 1)),
                h('div', { class: 'sp-i-body' }, [
                    h('div', { class: 'sp-i-head' }, [
                        h('strong', null, ex.name),
                        h('span', { class: 'sp-i-time' }, ex.time + 's')
                    ]),
                    h('p', null, ex.desc),
                    h('a', { href: ex.video, target: '_blank', class: 'sp-i-video' }, [icon('fas fa-play'), ' Form'])
                ])
            ])
        );
    });
    card.appendChild(circ);
    card.appendChild(
        h('div', { class: 'sp-runner' }, [
            h('div', { class: 'sp-runner-display', id: 'spDisplay' }, 'Ready'),
            h('div', { class: 'sp-runner-label', id: 'spLabel' }, 'Press Start to begin'),
            h('div', { class: 'sp-actions' }, [
                h('button', {
                    class: 'btn btn-primary',
                    id: 'spStart',
                    onclick: toggleSixPackRunner
                }, [icon('fas fa-play'), ' Start 5-Min Circuit']),
                h('button', {
                    class: 'btn btn-outline',
                    onclick: stopSixPackRunner
                }, [icon('fas fa-stop'), ' Stop'])
            ])
        ])
    );
}

function toggleSixPackRunner() {
    const btn = document.getElementById('spStart');
    if (sixpackInterval) {
        clearInterval(sixpackInterval);
        sixpackInterval = null;
        btn.replaceChildren(icon('fas fa-play'), txt(' Resume'));
        return;
    }
    if (sixpackIdx >= SIXPACK.circuit.length) { sixpackIdx = 0; }
    if (sixpackRemaining <= 0) sixpackRemaining = SIXPACK.circuit[sixpackIdx].time;
    btn.replaceChildren(icon('fas fa-pause'), txt(' Pause'));
    updateSixPackUI();
    sixpackInterval = setInterval(() => {
        sixpackRemaining--;
        if (sixpackRemaining <= 0) {
            playBeep();
            try { navigator.vibrate && navigator.vibrate([150,80,150]); } catch(_) {}
            sixpackIdx++;
            if (sixpackIdx >= SIXPACK.circuit.length) {
                stopSixPackRunner(true);
                return;
            }
            sixpackRemaining = SIXPACK.circuit[sixpackIdx].time;
        }
        updateSixPackUI();
    }, 1000);
}

function stopSixPackRunner(completed) {
    if (sixpackInterval) clearInterval(sixpackInterval);
    sixpackInterval = null;
    sixpackIdx = 0;
    sixpackRemaining = 0;
    const disp = document.getElementById('spDisplay');
    const label = document.getElementById('spLabel');
    const btn = document.getElementById('spStart');
    if (disp) disp.textContent = completed ? '✓ Done' : 'Ready';
    if (label) label.textContent = completed ? 'Core circuit complete. Nice work.' : 'Press Start to begin';
    if (btn) btn.replaceChildren(icon('fas fa-play'), txt(' Start 5-Min Circuit'));
    document.querySelectorAll('.sp-item').forEach(it => it.classList.remove('active'));
}

function updateSixPackUI() {
    const ex = SIXPACK.circuit[sixpackIdx];
    const disp = document.getElementById('spDisplay');
    const label = document.getElementById('spLabel');
    if (disp) disp.textContent = sixpackRemaining + 's';
    if (label) label.textContent = 'NOW: ' + ex.name + ' · ' + (sixpackIdx + 1) + ' of ' + SIXPACK.circuit.length;
    document.querySelectorAll('.sp-item').forEach((it, i) => {
        it.classList.toggle('active', i === sixpackIdx);
    });
}

// ═══════════════════════════════════════
// BENCHMARK ASSESSMENT
// ═══════════════════════════════════════
function renderBenchmark() {
    const card = document.getElementById('benchmarkCard');
    if (!card) return;
    const checked = JSON.parse(localStorage.getItem('bb_bench') || '[]');
    card.replaceChildren();
    const list = h('div', { class: 'bm-list' });
    BENCHMARKS.forEach(b => {
        const isChecked = checked.includes(b.id);
        const item = h('label', {
            class: 'bm-item' + (isChecked ? ' checked' : '')
        }, [
            h('input', {
                type: 'checkbox',
                checked: isChecked,
                onclick: (ev) => {
                    const all = JSON.parse(localStorage.getItem('bb_bench') || '[]');
                    const i = all.indexOf(b.id);
                    if (ev.target.checked && i < 0) all.push(b.id);
                    else if (!ev.target.checked && i >= 0) all.splice(i, 1);
                    localStorage.setItem('bb_bench', JSON.stringify(all));
                    renderBenchmark();
                }
            }),
            h('span', { class: 'bm-tick' }, icon('fas fa-check')),
            h('span', { class: 'bm-text' }, b.label),
            h('span', { class: 'bm-unlock' }, 'unlocks ' + b.unlocks)
        ]);
        list.appendChild(item);
    });
    card.appendChild(list);

    // Suggestion
    const counts = { foundation: 0, beginner: 0, intermediate: 0, advanced: 0, mastery: 0 };
    BENCHMARKS.forEach(b => {
        if (checked.includes(b.id)) counts[b.unlocks]++;
    });
    const totals = { beginner: 4, intermediate: 4, advanced: 4, mastery: 4 };
    let recommend = 'foundation';
    if (counts.beginner >= 3) recommend = 'beginner';
    if (counts.beginner >= 3 && counts.intermediate >= 2) recommend = 'intermediate';
    if (counts.intermediate >= 3 && counts.advanced >= 2) recommend = 'advanced';
    if (counts.advanced >= 3 && counts.mastery >= 2) recommend = 'mastery';

    const rec = LEVELS.find(l => l.id === recommend);
    const isCurrent = STATE.level === recommend;
    card.appendChild(
        h('div', { class: 'bm-result' }, [
            h('div', { class: 'bm-result-head' }, [icon('fas fa-bullseye'), ' RECOMMENDED PHASE']),
            h('div', { class: 'bm-result-phase' }, [
                h('strong', null, rec.name),
                h('span', null, ' — ' + rec.sub)
            ]),
            h('p', null, rec.blurb),
            isCurrent
                ? h('div', { class: 'bm-current' }, [icon('fas fa-check'), ' You are on this phase.'])
                : h('button', {
                    class: 'btn btn-primary',
                    onclick: () => {
                        STATE.level = recommend;
                        localStorage.setItem('bb_level', recommend);
                        renderLevels();
                        renderSchedule();
                        renderToday();
                        renderBenchmark();
                    }
                }, [icon('fas fa-arrow-right'), ' Switch to ' + rec.name])
        ])
    );
}

// ═══════════════════════════════════════
// BODY STATS TRACKER
// ═══════════════════════════════════════
function getStats() {
    try { return JSON.parse(localStorage.getItem('bb_stats') || '[]'); } catch(_) { return []; }
}

function initStatsLog() {
    const btn = document.getElementById('statsLog');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const w = parseFloat(document.getElementById('statsWeight').value);
        const wa = parseFloat(document.getElementById('statsWaist').value);
        if (!w && !wa) return;
        const stats = getStats();
        stats.push({
            date: new Date().toISOString().slice(0, 10),
            weight: w || null,
            waist: wa || null
        });
        localStorage.setItem('bb_stats', JSON.stringify(stats));
        document.getElementById('statsWeight').value = '';
        document.getElementById('statsWaist').value = '';
        renderStats();
    });
}

function renderStats() {
    const card = document.getElementById('statsTrendCard');
    if (!card) return;
    card.replaceChildren();
    const stats = getStats();
    if (stats.length === 0) {
        card.appendChild(
            h('div', { class: 'stats-empty' }, [
                icon('fas fa-chart-line'),
                h('p', null, 'Log your first entry. See the trend once you have 2+ entries.')
            ])
        );
        return;
    }

    const weights = stats.filter(s => s.weight != null).map(s => ({ date: s.date, v: s.weight }));
    const waists = stats.filter(s => s.waist != null).map(s => ({ date: s.date, v: s.waist }));

    card.appendChild(
        buildTrendRow('Weight', 'kg', weights)
    );
    card.appendChild(
        buildTrendRow('Waist', 'cm', waists)
    );

    // History list (last 10)
    const history = h('div', { class: 'stats-history' });
    history.appendChild(h('div', { class: 'stats-h-head' }, 'RECENT ENTRIES'));
    stats.slice(-10).reverse().forEach(s => {
        history.appendChild(
            h('div', { class: 'stats-h-row' }, [
                h('span', { class: 'stats-h-date' }, s.date),
                h('span', null, (s.weight != null ? s.weight + ' kg' : '—') + ' · ' + (s.waist != null ? s.waist + ' cm' : '—'))
            ])
        );
    });
    card.appendChild(history);
}

function buildTrendRow(name, unit, data) {
    if (data.length === 0) {
        return h('div', { class: 'trend-row empty' }, [
            h('span', { class: 'trend-name' }, name),
            h('span', { class: 'trend-val muted' }, '—')
        ]);
    }
    const latest = data[data.length - 1].v;
    const first = data[0].v;
    const delta = latest - first;
    const deltaClass = delta < 0 ? 'down' : (delta > 0 ? 'up' : 'same');
    const deltaText = (delta > 0 ? '+' : '') + delta.toFixed(1) + ' ' + unit;

    return h('div', { class: 'trend-row' }, [
        h('div', { class: 'trend-header' }, [
            h('span', { class: 'trend-name' }, name),
            h('span', { class: 'trend-val' }, latest + ' ' + unit),
            h('span', { class: 'trend-delta ' + deltaClass }, deltaText)
        ]),
        buildSparkline(data.map(d => d.v))
    ]);
}

function buildSparkline(values) {
    if (values.length < 2) {
        return h('div', { class: 'sparkline empty' }, 'Need 2+ entries for trend');
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const W = 200, H = 40;
    const stepX = W / (values.length - 1);
    let points = '';
    values.forEach((v, i) => {
        const x = (i * stepX).toFixed(1);
        const y = (H - ((v - min) / range) * (H - 6) - 3).toFixed(1);
        points += x + ',' + y + ' ';
    });
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'sparkline-svg');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');
    const poly = document.createElementNS(svgNS, 'polyline');
    poly.setAttribute('points', points.trim());
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', 'currentColor');
    poly.setAttribute('stroke-width', '1.5');
    poly.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(poly);
    // last point dot
    const lastX = ((values.length - 1) * stepX).toFixed(1);
    const lastY = (H - ((values[values.length - 1] - min) / range) * (H - 6) - 3).toFixed(1);
    const dot = document.createElementNS(svgNS, 'circle');
    dot.setAttribute('cx', lastX);
    dot.setAttribute('cy', lastY);
    dot.setAttribute('r', '2.5');
    dot.setAttribute('fill', 'currentColor');
    svg.appendChild(dot);
    return svg;
}

// ═══════════════════════════════════════
// RAMADAN MODE
// ═══════════════════════════════════════
function initRamadanToggle() {
    const toggle = document.getElementById('ramadanToggle');
    if (!toggle) return;
    toggle.checked = localStorage.getItem('bb_ramadan') === '1';
    toggle.addEventListener('change', () => {
        localStorage.setItem('bb_ramadan', toggle.checked ? '1' : '0');
        calculate();
    });
}

// Override renderMealPlan to respect Ramadan mode
const _origRows = ['Breakfast','Lunch','Snack','Dinner'];
function ramadanLabelFor(key) {
    return RAMADAN_MEAL_LABELS[key] || { label: key, time: '' };
}

// Monkey-patch renderMealPlan to use Ramadan labels when on
const _originalRenderMealPlan = renderMealPlan;
renderMealPlan = function(targetKcal) {
    const ramadan = localStorage.getItem('bb_ramadan') === '1';
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const rows = ramadan ? [
        { key: 'breakfast', meal: pick(MEALS.breakfast) },
        { key: 'lunch',     meal: pick(MEALS.lunch) },
        { key: 'snack',     meal: pick(MEALS.snack) },
        { key: 'dinner',    meal: pick(MEALS.dinner) }
    ] : [
        { label: 'Breakfast', time: '7-9 AM', meal: pick(MEALS.breakfast) },
        { label: 'Lunch', time: '12:30-2 PM', meal: pick(MEALS.lunch) },
        { label: 'Snack', time: '4-5 PM', meal: pick(MEALS.snack) },
        { label: 'Dinner', time: '7-8:30 PM', meal: pick(MEALS.dinner) }
    ];
    const total = rows.reduce((s, r) => s + r.meal.kcal, 0);
    const diff = targetKcal - total;
    const container = document.getElementById('mealPlan');
    container.replaceChildren();
    if (ramadan) {
        container.appendChild(
            h('div', { class: 'ramadan-banner' }, [icon('fas fa-moon'), ' Ramadan timing · Train 30 min before Iftar (fasted) or 90 min after Iftar.'])
        );
    }
    rows.forEach(r => {
        const info = ramadan ? ramadanLabelFor(r.key) : { label: r.label, time: r.time };
        container.appendChild(
            h('div', { class: 'meal-row' }, [
                h('div', { class: 'meal-head' }, [
                    h('span', { class: 'meal-label' }, info.label),
                    h('span', { class: 'meal-time' }, info.time)
                ]),
                h('div', { class: 'meal-name' }, r.meal.name),
                h('p', { class: 'meal-items' }, r.meal.items),
                h('div', { class: 'meal-macros' }, [
                    h('span', null, r.meal.kcal + ' kcal'),
                    h('span', null, 'P: ' + r.meal.p + 'g'),
                    h('span', null, 'C: ' + r.meal.c + 'g'),
                    h('span', null, 'F: ' + r.meal.f + 'g')
                ])
            ])
        );
    });
    const diffText = (diff > 0 ? '+' + diff : String(diff)) + ' vs target';
    container.appendChild(
        h('div', { class: 'meal-total' }, [
            h('span', null, [txt('Day Total: '), h('strong', null, total + ' kcal')]),
            h('span', { class: Math.abs(diff) < 200 ? 'ok' : 'warn' }, diffText),
            h('button', { class: 'btn-shuffle', onclick: calculate }, [icon('fas fa-shuffle'), ' Shuffle'])
        ])
    );
};

// ═══════════════════════════════════════
// GROCERY LIST
// ═══════════════════════════════════════
function initGrocery() {
    const btn = document.getElementById('groceryToggle');
    const body = document.getElementById('groceryBody');
    if (!btn || !body) return;
    btn.addEventListener('click', () => {
        const showing = !body.hidden;
        if (showing) {
            body.hidden = true;
            btn.replaceChildren(icon('fas fa-list-check'), txt(' Show List'));
        } else {
            renderGrocery();
            body.hidden = false;
            btn.replaceChildren(icon('fas fa-eye-slash'), txt(' Hide List'));
        }
    });
}

function renderGrocery() {
    const body = document.getElementById('groceryBody');
    body.replaceChildren();
    body.appendChild(h('p', { class: 'grocery-intro' },
        'Stock this once a week. Covers 5 workout days + 2 rest days of the desi meal plan. Adjust quantities to your kcal target.'
    ));
    Object.keys(GROCERY).forEach(cat => {
        const col = h('div', { class: 'grocery-col' }, [
            h('h4', null, cat),
            h('ul', null, GROCERY[cat].map(item => h('li', null, [
                h('label', { class: 'grocery-item' }, [
                    h('input', { type: 'checkbox' }),
                    h('span', null, item)
                ])
            ])))
        ]);
        body.appendChild(col);
    });
}

// ═══════════════════════════════════════
// WATER + SLEEP CHECK-INS
// ═══════════════════════════════════════
function initWaterSleep() {
    const today = new Date().toISOString().slice(0, 10);
    // Water
    const waterKey = 'bb_water_' + today;
    const wrap = document.getElementById('waterCups');
    if (wrap) {
        const current = parseInt(localStorage.getItem(waterKey) || '0');
        wrap.replaceChildren();
        for (let i = 0; i < 8; i++) {
            const cup = h('button', {
                class: 'water-cup' + (i < current ? ' filled' : ''),
                onclick: () => {
                    const newVal = i + 1 === current ? i : i + 1;
                    localStorage.setItem(waterKey, String(newVal));
                    initWaterSleep();
                }
            }, icon('fas fa-glass-water'));
            wrap.appendChild(cup);
        }
    }
    // Sleep
    const sleepKey = 'bb_sleep_' + today;
    const input = document.getElementById('sleepHours');
    const status = document.getElementById('sleepStatus');
    if (input && status) {
        const saved = localStorage.getItem(sleepKey);
        if (saved && !input.dataset.bound) input.value = saved;
        if (!input.dataset.bound) {
            input.dataset.bound = '1';
            input.addEventListener('input', () => {
                localStorage.setItem(sleepKey, input.value);
                updateSleepStatus(parseFloat(input.value));
            });
        }
        updateSleepStatus(parseFloat(input.value));
    }
}

function updateSleepStatus(hours) {
    const el = document.getElementById('sleepStatus');
    if (!el) return;
    if (!hours) { el.textContent = 'Log your hours; 7–9 is the sweet spot.'; el.className = 'sleep-status'; return; }
    if (hours < 6) { el.textContent = '🚨 Low — recovery compromised.'; el.className = 'sleep-status warn'; }
    else if (hours < 7) { el.textContent = '⚠️ Below target. Aim for 7–9 hours.'; el.className = 'sleep-status warn'; }
    else if (hours <= 9) { el.textContent = '✓ In the zone. Prime recovery.'; el.className = 'sleep-status ok'; }
    else { el.textContent = '⚠️ Oversleep can also hurt. 7–9 is ideal.'; el.className = 'sleep-status warn'; }
}

