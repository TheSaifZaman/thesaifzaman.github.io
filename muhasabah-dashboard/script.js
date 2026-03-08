// ── Theme Toggle ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Constants ──
const STORAGE_KEY = 'muhasabah_reviews';

const SPIRITUAL_LABELS = {
    salah: 'Salah on time & with khushu',
    quran: 'Quran recitation / memorization',
    adhkar: 'Morning & evening adhkar',
    nightPrayer: 'Night prayers (Tahajjud / Qiyam)',
    charity: 'Charity / helping others',
    tongue: 'Controlling tongue',
    gaze: 'Lowering gaze / guarding modesty',
    patience: 'Patience & gratitude'
};

const PERSONAL_LABELS = {
    health: 'Health & fitness',
    learning: 'Learning / seeking knowledge',
    family: 'Family relationships',
    professional: 'Professional growth',
    time: 'Time management',
    financial: 'Financial responsibility'
};

const REFLECTION_LABELS = {
    biggestWin: 'Biggest win',
    repentance: 'Need to repent for',
    gratitude: 'Most grateful for',
    improvement: 'Will improve next week',
    helpedWho: 'Who I helped'
};

// ── Tab Navigation ──
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');

        if (tab === 'history') renderHistory();
        if (tab === 'insights') renderInsights();
    });
});

// ── Star Rating Interaction ──
document.querySelectorAll('.star-rating').forEach(container => {
    const stars = container.querySelectorAll('i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = parseInt(star.dataset.star);
            container.dataset.value = val;
            updateStars(container, val);
        });

        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.dataset.star);
            highlightStars(container, val);
        });
    });

    container.addEventListener('mouseleave', () => {
        const val = parseInt(container.dataset.value);
        updateStars(container, val);
    });
});

function updateStars(container, value) {
    container.querySelectorAll('i').forEach(s => {
        const sv = parseInt(s.dataset.star);
        s.className = sv <= value ? 'fas fa-star' : 'far fa-star';
    });
}

function highlightStars(container, value) {
    container.querySelectorAll('i').forEach(s => {
        const sv = parseInt(s.dataset.star);
        s.className = sv <= value ? 'fas fa-star' : 'far fa-star';
    });
}

// ── Slider ──
const slider = document.getElementById('overallRating');
const sliderValue = document.getElementById('sliderValue');

slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
});

// ── Set default week date to current Monday ──
(function setDefaultDate() {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(now.setDate(diff));
    const yyyy = monday.getFullYear();
    const mm = String(monday.getMonth() + 1).padStart(2, '0');
    const dd = String(monday.getDate()).padStart(2, '0');
    document.getElementById('weekDate').value = `${yyyy}-${mm}-${dd}`;
})();

// ── LocalStorage Helpers ──
function getReviews() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveReviews(reviews) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

// ── Form Submission ──
document.getElementById('reviewForm').addEventListener('submit', e => {
    e.preventDefault();

    const weekDate = document.getElementById('weekDate').value;
    if (!weekDate) return;

    // Gather spiritual ratings
    const spiritual = {};
    document.querySelectorAll('.rating-item[data-category="spiritual"]').forEach(item => {
        const key = item.dataset.key;
        const val = parseInt(item.querySelector('.star-rating').dataset.value);
        spiritual[key] = val;
    });

    // Gather personal ratings
    const personal = {};
    document.querySelectorAll('.rating-item[data-category="personal"]').forEach(item => {
        const key = item.dataset.key;
        const val = parseInt(item.querySelector('.star-rating').dataset.value);
        personal[key] = val;
    });

    // Gather reflections
    const reflections = {};
    document.querySelectorAll('.reflection-item textarea').forEach(ta => {
        reflections[ta.dataset.key] = ta.value.trim();
    });

    const overallRating = parseInt(document.getElementById('overallRating').value);

    const review = {
        id: Date.now().toString(),
        weekDate,
        spiritual,
        personal,
        reflections,
        overallRating,
        timestamp: new Date().toISOString()
    };

    const reviews = getReviews();

    // Replace if same weekDate exists
    const existingIdx = reviews.findIndex(r => r.weekDate === weekDate);
    if (existingIdx !== -1) {
        reviews[existingIdx] = review;
    } else {
        reviews.push(review);
    }

    // Sort by weekDate descending
    reviews.sort((a, b) => b.weekDate.localeCompare(a.weekDate));
    saveReviews(reviews);

    // Show success
    const form = document.getElementById('reviewForm');
    const msg = document.createElement('div');
    msg.className = 'success-msg';
    msg.innerHTML = '<i class="fas fa-check-circle"></i> Review saved successfully!';
    form.parentNode.insertBefore(msg, form);
    form.style.display = 'none';

    setTimeout(() => {
        msg.remove();
        form.style.display = 'block';
        resetForm();
    }, 2000);
});

function resetForm() {
    document.querySelectorAll('.star-rating').forEach(c => {
        c.dataset.value = '0';
        updateStars(c, 0);
    });
    document.querySelectorAll('.reflection-item textarea').forEach(ta => {
        ta.value = '';
    });
    document.getElementById('overallRating').value = 5;
    sliderValue.textContent = '5';
}

// ── History Rendering ──
function renderHistory() {
    const list = document.getElementById('historyList');
    const reviews = getReviews();

    if (reviews.length === 0) {
        list.innerHTML = '<p class="empty-state">No reviews yet. Complete your first weekly review to see it here.</p>';
        return;
    }

    list.innerHTML = reviews.map((review, idx) => {
        const prevReview = reviews[idx + 1] || null; // next in array = previous week
        const dateStr = formatDate(review.weekDate);
        return `
            <div class="history-item" data-id="${review.id}">
                <div class="history-header" onclick="toggleDetail('${review.id}')">
                    <div class="history-left">
                        <span class="history-date">Week of ${dateStr}</span>
                        <span class="history-overall">Overall: ${review.overallRating}/10</span>
                    </div>
                    <div class="history-actions">
                        <button class="history-expand" id="expand-${review.id}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <button class="history-delete" onclick="event.stopPropagation(); deleteReview('${review.id}')" title="Delete review">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="history-detail" id="detail-${review.id}">
                    ${renderReviewDetail(review, prevReview)}
                </div>
            </div>
        `;
    }).join('');
}

function renderReviewDetail(review, prevReview) {
    let html = '';

    // Spiritual
    html += '<div class="history-section"><h4>Spiritual Self-Check</h4><div class="history-ratings">';
    for (const [key, label] of Object.entries(SPIRITUAL_LABELS)) {
        const val = review.spiritual[key] || 0;
        const prevVal = prevReview ? (prevReview.spiritual[key] || 0) : null;
        html += renderRatingRow(label, val, prevVal);
    }
    html += '</div></div>';

    // Personal
    html += '<div class="history-section"><h4>Personal Growth</h4><div class="history-ratings">';
    for (const [key, label] of Object.entries(PERSONAL_LABELS)) {
        const val = review.personal[key] || 0;
        const prevVal = prevReview ? (prevReview.personal[key] || 0) : null;
        html += renderRatingRow(label, val, prevVal);
    }
    html += '</div></div>';

    // Reflections
    html += '<div class="history-section"><h4>Reflections</h4>';
    for (const [key, label] of Object.entries(REFLECTION_LABELS)) {
        const text = review.reflections[key];
        if (text) {
            html += `<div class="history-reflection"><strong>${label}:</strong> ${escapeHtml(text)}</div>`;
        }
    }
    html += '</div>';

    return html;
}

function renderRatingRow(label, value, prevValue) {
    let trend = '';
    if (prevValue !== null) {
        if (value > prevValue) {
            trend = '<i class="fas fa-arrow-up trend-up"></i>';
        } else if (value < prevValue) {
            trend = '<i class="fas fa-arrow-down trend-down"></i>';
        } else {
            trend = '<i class="fas fa-minus trend-same"></i>';
        }
    }

    const starsHtml = renderStarsHtml(value);
    return `<div class="history-rating-row">
        <span class="label">${label}</span>
        <span class="value">${starsHtml} ${trend}</span>
    </div>`;
}

function renderStarsHtml(value) {
    let html = '<span class="stars-display">';
    for (let i = 1; i <= 5; i++) {
        html += i <= value
            ? '<i class="fas fa-star"></i>'
            : '<i class="far fa-star empty"></i>';
    }
    html += '</span>';
    return html;
}

function toggleDetail(id) {
    const detail = document.getElementById('detail-' + id);
    const expand = document.getElementById('expand-' + id);
    detail.classList.toggle('show');
    expand.classList.toggle('expanded');
}

function deleteReview(id) {
    if (!confirm('Delete this review?')) return;
    let reviews = getReviews();
    reviews = reviews.filter(r => r.id !== id);
    saveReviews(reviews);
    renderHistory();
}

function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ── Insights Rendering ──
function renderInsights() {
    const reviews = getReviews();
    const recent = reviews.slice(0, 4); // last 4 weeks (already sorted desc)

    // Streak
    document.getElementById('streakValue').textContent = calcStreak(reviews);

    if (recent.length === 0) {
        document.getElementById('avgSpiritual').textContent = '--';
        document.getElementById('avgPersonal').textContent = '--';
        document.getElementById('avgOverall').textContent = '--';
        document.getElementById('highestArea').textContent = '--';
        document.getElementById('highestScore').textContent = '';
        document.getElementById('lowestArea').textContent = '--';
        document.getElementById('lowestScore').textContent = '';
        return;
    }

    // Average spiritual
    const avgSp = avgCategoryScore(recent, 'spiritual');
    document.getElementById('avgSpiritual').textContent = avgSp.toFixed(1);

    // Average personal
    const avgPe = avgCategoryScore(recent, 'personal');
    document.getElementById('avgPersonal').textContent = avgPe.toFixed(1);

    // Average overall
    const avgOv = recent.reduce((s, r) => s + r.overallRating, 0) / recent.length;
    document.getElementById('avgOverall').textContent = avgOv.toFixed(1);

    // Highest and lowest areas (across all categories, all recent reviews)
    const allAreas = {};
    const allLabels = { ...SPIRITUAL_LABELS, ...PERSONAL_LABELS };

    for (const [key, label] of Object.entries(SPIRITUAL_LABELS)) {
        const vals = recent.map(r => r.spiritual[key] || 0);
        allAreas[key] = { label, avg: vals.reduce((a, b) => a + b, 0) / vals.length };
    }
    for (const [key, label] of Object.entries(PERSONAL_LABELS)) {
        const vals = recent.map(r => r.personal[key] || 0);
        allAreas[key] = { label, avg: vals.reduce((a, b) => a + b, 0) / vals.length };
    }

    const sorted = Object.values(allAreas).sort((a, b) => b.avg - a.avg);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    document.getElementById('highestArea').textContent = highest.label;
    document.getElementById('highestScore').textContent = highest.avg.toFixed(1) + ' / 5.0 avg';
    document.getElementById('lowestArea').textContent = lowest.label;
    document.getElementById('lowestScore').textContent = lowest.avg.toFixed(1) + ' / 5.0 avg';
}

function avgCategoryScore(reviews, category) {
    let total = 0;
    let count = 0;
    reviews.forEach(r => {
        const data = r[category];
        if (data) {
            for (const val of Object.values(data)) {
                total += val || 0;
                count++;
            }
        }
    });
    return count > 0 ? total / count : 0;
}

function calcStreak(reviews) {
    if (reviews.length === 0) return 0;

    // reviews are sorted by weekDate descending
    // Check consecutive weeks from the most recent
    let streak = 1;
    for (let i = 0; i < reviews.length - 1; i++) {
        const curr = new Date(reviews[i].weekDate + 'T00:00:00');
        const prev = new Date(reviews[i + 1].weekDate + 'T00:00:00');
        const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
        if (diffDays >= 5 && diffDays <= 9) {
            // roughly one week apart
            streak++;
        } else {
            break;
        }
    }
    return streak;
}
