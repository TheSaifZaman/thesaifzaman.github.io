// Theme toggle
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

// Tab navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).classList.add('active');
        localStorage.setItem('pm-active-tab', target);
    });
});

// Restore last active tab
const savedTab = localStorage.getItem('pm-active-tab');
if (savedTab) {
    const btn = document.querySelector(`[data-tab="${savedTab}"]`);
    if (btn) btn.click();
}

// Chapter accordion toggles
const chapterToggles = document.querySelectorAll('.chapter-toggle');

chapterToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const card = toggle.closest('.chapter-card');
        card.classList.toggle('open');
    });
});

// Checkbox persistence
const STORAGE_KEY = 'pm-checkboxes';

function getCheckboxState() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function saveCheckboxState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');

// Generate a stable ID for each checkbox based on its text content
function getCheckboxId(checkbox) {
    const text = checkbox.closest('.check-item').querySelector('span').textContent.trim();
    return text.substring(0, 60);
}

// Load saved state
const savedState = getCheckboxState();
checkboxes.forEach(cb => {
    const id = getCheckboxId(cb);
    if (savedState[id]) {
        cb.checked = true;
    }
});

// Save on change
checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const state = getCheckboxState();
        const id = getCheckboxId(cb);
        if (cb.checked) {
            state[id] = true;
        } else {
            delete state[id];
        }
        saveCheckboxState(state);
    });
});
