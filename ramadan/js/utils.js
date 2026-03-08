/**
 * Ramadan Spiritual Planner - Utility Functions
 * Shared JavaScript utilities for localStorage and helpers
 */

// === Storage Keys ===
const STORAGE_KEYS = {
    SALAH_TRACKER: 'ramadan-salah-tracker',
    QURAN_JUZ: 'ramadan-quran-juz',
    QURAN_KHATAM: 'ramadan-quran-khatam',
    DHIKR_COUNTER: 'ramadan-dhikr-counter',
    DHIKR_HISTORY: 'ramadan-dhikr-history',
    DHIKR_TRACKER: 'ramadan-dhikr-tracker',
    GOALS: 'ramadan-goals',
    REFLECTIONS: 'ramadan-reflections',
    THEME: 'ramadan-theme',
    SETTINGS: 'ramadan-settings',
    RAMADAN_TRACKER: 'ramadan-daily-tracker'
};

// === Prayers List ===
const PRAYERS = [
    { id: 'fajr', name: 'Fajr', type: 'fard', color: '#f97316' },
    { id: 'ishraq', name: 'Ishraq', type: 'nafl', color: '#fbbf24' },
    { id: 'duha', name: 'Duha', type: 'nafl', color: '#fbbf24' },
    { id: 'dhuhr', name: 'Dhuhr', type: 'fard', color: '#eab308' },
    { id: 'asr', name: 'Asr', type: 'fard', color: '#84cc16' },
    { id: 'maghrib', name: 'Maghrib', type: 'fard', color: '#f43f5e' },
    { id: 'isha', name: 'Isha', type: 'fard', color: '#8b5cf6' },
    { id: 'tarawih', name: 'Tarawih', type: 'sunnah', color: '#06b6d4' },
    { id: 'witr', name: 'Witr', type: 'wajib', color: '#ec4899' },
    { id: 'tahajjud', name: 'Tahajjud', type: 'nafl', color: '#6366f1' },
    { id: 'awwabin', name: 'Awwabin', type: 'nafl', color: '#14b8a6' }
];

// === LocalStorage Helpers ===
const Storage = {
    get(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Storage.get error:', e);
            return defaultValue;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage.set error:', e);
            return false;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage.remove error:', e);
            return false;
        }
    },
    
    clear() {
        try {
            Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
            return true;
        } catch (e) {
            console.error('Storage.clear error:', e);
            return false;
        }
    }
};

// === Salah Tracker Helpers ===
const SalahTracker = {
    getData() {
        return Storage.get(STORAGE_KEYS.SALAH_TRACKER, {});
    },
    
    toggle(day, prayerId) {
        const data = this.getData();
        const key = `${day}-${prayerId}`;
        data[key] = !data[key];
        Storage.set(STORAGE_KEYS.SALAH_TRACKER, data);
        return data[key];
    },
    
    isCompleted(day, prayerId) {
        const data = this.getData();
        return !!data[`${day}-${prayerId}`];
    },
    
    getDayProgress(day) {
        const data = this.getData();
        let completed = 0;
        PRAYERS.forEach(prayer => {
            if (data[`${day}-${prayer.id}`]) completed++;
        });
        return { completed, total: PRAYERS.length, percentage: Math.round((completed / PRAYERS.length) * 100) };
    },
    
    getTotalProgress() {
        const data = this.getData();
        const total = 30 * PRAYERS.length;
        const completed = Object.values(data).filter(v => v).length;
        return { completed, total, percentage: Math.round((completed / total) * 100) };
    },
    
    clear() {
        return Storage.remove(STORAGE_KEYS.SALAH_TRACKER);
    }
};

// === Quran Tracker Helpers ===
const QuranTracker = {
    getData() {
        return Storage.get(STORAGE_KEYS.QURAN_JUZ, {});
    },
    
    toggle(juz) {
        const data = this.getData();
        data[`juz${juz}`] = !data[`juz${juz}`];
        Storage.set(STORAGE_KEYS.QURAN_JUZ, data);
        return data[`juz${juz}`];
    },
    
    isCompleted(juz) {
        const data = this.getData();
        return !!data[`juz${juz}`];
    },
    
    getProgress() {
        const data = this.getData();
        const completed = Object.values(data).filter(v => v).length;
        return { completed, total: 30, percentage: Math.round((completed / 30) * 100) };
    },
    
    clear() {
        return Storage.remove(STORAGE_KEYS.QURAN_JUZ);
    }
};

// === Dhikr Counter Helpers ===
const DhikrCounter = {
    getData() {
        return Storage.get(STORAGE_KEYS.DHIKR_COUNTER, { current: 0, target: 33, dhikr: 'SubhanAllah' });
    },
    
    increment() {
        const data = this.getData();
        data.current++;
        Storage.set(STORAGE_KEYS.DHIKR_COUNTER, data);
        return data;
    },
    
    reset() {
        const data = this.getData();
        data.current = 0;
        Storage.set(STORAGE_KEYS.DHIKR_COUNTER, data);
        return data;
    },
    
    setTarget(target) {
        const data = this.getData();
        data.target = target;
        Storage.set(STORAGE_KEYS.DHIKR_COUNTER, data);
        return data;
    },
    
    setDhikr(dhikr) {
        const data = this.getData();
        data.dhikr = dhikr;
        data.current = 0;
        Storage.set(STORAGE_KEYS.DHIKR_COUNTER, data);
        return data;
    },
    
    saveToHistory() {
        const data = this.getData();
        const history = Storage.get(STORAGE_KEYS.DHIKR_HISTORY, []);
        history.push({
            dhikr: data.dhikr,
            count: data.current,
            target: data.target,
            date: new Date().toISOString()
        });
        Storage.set(STORAGE_KEYS.DHIKR_HISTORY, history);
        return history;
    },
    
    getHistory() {
        return Storage.get(STORAGE_KEYS.DHIKR_HISTORY, []);
    },
    
    getTodayTotal() {
        const history = this.getHistory();
        const today = new Date().toDateString();
        return history
            .filter(h => new Date(h.date).toDateString() === today)
            .reduce((sum, h) => sum + h.count, 0);
    }
};

// === Theme Helpers ===
const Theme = {
    get() {
        return Storage.get(STORAGE_KEYS.THEME, 'light');
    },
    
    set(theme) {
        Storage.set(STORAGE_KEYS.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
        return theme;
    },
    
    toggle() {
        const current = this.get();
        return this.set(current === 'light' ? 'dark' : 'light');
    },
    
    init() {
        const theme = this.get();
        document.documentElement.setAttribute('data-theme', theme);
    }
};

// === Date Helpers ===
const DateUtils = {
    getRamadanDay() {
        // For demo purposes, return a calculated day
        // In production, use a proper Hijri calendar library
        const ramadanStart = new Date('2026-02-28'); // Approximate start
        const today = new Date();
        const diff = Math.floor((today - ramadanStart) / (1000 * 60 * 60 * 24)) + 1;
        return Math.max(1, Math.min(30, diff));
    },
    
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    }
};

// === Enhanced Quran Khatam Tracker ===
const QuranKhatam = {
    getData() {
        return Storage.get(STORAGE_KEYS.QURAN_KHATAM, {
            juz: {},
            notes: {},
            readingPlan: [],
            khatamCount: 0,
            currentKhatamStart: null
        });
    },

    updateJuz(juzNum, data) {
        const khatamData = this.getData();
        if (!khatamData.juz[juzNum]) {
            khatamData.juz[juzNum] = { completed: false, pages: {}, date: null };
        }
        Object.assign(khatamData.juz[juzNum], data);
        Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        return khatamData;
    },

    toggleJuz(juzNum) {
        const khatamData = this.getData();
        if (!khatamData.juz[juzNum]) {
            khatamData.juz[juzNum] = { completed: false, pages: {}, date: null };
        }
        khatamData.juz[juzNum].completed = !khatamData.juz[juzNum].completed;
        khatamData.juz[juzNum].date = khatamData.juz[juzNum].completed ? new Date().toISOString() : null;

        // Check for khatam completion
        const allCompleted = Object.values(khatamData.juz).filter(j => j.completed).length;
        if (allCompleted === 30) {
            khatamData.khatamCount++;
            khatamData.currentKhatamStart = null;
            // Reset for new khatam
            khatamData.juz = {};
        }

        Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        return khatamData;
    },

    updatePages(juzNum, pagesRead) {
        const khatamData = this.getData();
        if (!khatamData.juz[juzNum]) {
            khatamData.juz[juzNum] = { completed: false, pages: {}, date: null };
        }
        khatamData.juz[juzNum].pages = pagesRead;
        Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        return khatamData;
    },

    addNote(juzNum, note) {
        const khatamData = this.getData();
        if (!khatamData.notes[juzNum]) {
            khatamData.notes[juzNum] = [];
        }
        khatamData.notes[juzNum].push({
            text: note,
            date: new Date().toISOString(),
            id: Date.now()
        });
        Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        return khatamData;
    },

    deleteNote(juzNum, noteId) {
        const khatamData = this.getData();
        if (khatamData.notes[juzNum]) {
            khatamData.notes[juzNum] = khatamData.notes[juzNum].filter(n => n.id !== noteId);
            Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        }
        return khatamData;
    },

    setReadingPlan(plan) {
        const khatamData = this.getData();
        khatamData.readingPlan = plan;
        Storage.set(STORAGE_KEYS.QURAN_KHATAM, khatamData);
        return khatamData;
    },

    getProgress() {
        const khatamData = this.getData();
        const completed = Object.values(khatamData.juz).filter(j => j.completed).length;
        const totalPages = Object.values(khatamData.juz).reduce((sum, j) => {
            return sum + Object.keys(j.pages || {}).length;
        }, 0);

        return {
            completed,
            total: 30,
            percentage: Math.round((completed / 30) * 100),
            totalPages,
            khatamCount: khatamData.khatamCount || 0
        };
    },

    clear() {
        return Storage.remove(STORAGE_KEYS.QURAN_KHATAM);
    }
};

// === Dhikr Tracker by Time ===
const DhikrTracker = {
    getData() {
        return Storage.get(STORAGE_KEYS.DHIKR_TRACKER, {
            morning: [],
            evening: [],
            beforeSleep: [],
            afterSleep: [],
            throughout: []
        });
    },

    addDhikr(category, dhikr) {
        const data = this.getData();
        const newDhikr = {
            id: Date.now(),
            arabic: dhikr.arabic || '',
            transliteration: dhikr.transliteration || '',
            translation: dhikr.translation || '',
            target: dhikr.target || 33,
            current: 0,
            createdAt: new Date().toISOString()
        };
        data[category].push(newDhikr);
        Storage.set(STORAGE_KEYS.DHIKR_TRACKER, data);
        return newDhikr;
    },

    updateDhikr(category, id, updates) {
        const data = this.getData();
        const dhikr = data[category].find(d => d.id === id);
        if (dhikr) {
            Object.assign(dhikr, updates);
            Storage.set(STORAGE_KEYS.DHIKR_TRACKER, data);
        }
        return data;
    },

    deleteDhikr(category, id) {
        const data = this.getData();
        data[category] = data[category].filter(d => d.id !== id);
        Storage.set(STORAGE_KEYS.DHIKR_TRACKER, data);
        return data;
    },

    incrementCount(category, id) {
        const data = this.getData();
        const dhikr = data[category].find(d => d.id === id);
        if (dhikr) {
            dhikr.current++;
            Storage.set(STORAGE_KEYS.DHIKR_TRACKER, data);
        }
        return dhikr;
    },

    resetCount(category, id) {
        const data = this.getData();
        const dhikr = data[category].find(d => d.id === id);
        if (dhikr) {
            dhikr.current = 0;
            Storage.set(STORAGE_KEYS.DHIKR_TRACKER, data);
        }
        return dhikr;
    },

    getTodayProgress(category) {
        const data = this.getData();
        return data[category].map(dhikr => ({
            ...dhikr,
            completed: dhikr.current >= dhikr.target,
            percentage: Math.round((dhikr.current / dhikr.target) * 100)
        }));
    },

    clear() {
        return Storage.remove(STORAGE_KEYS.DHIKR_TRACKER);
    }
};

// === Ramadan Daily Tracker ===
const RamadanTracker = {
    getData() {
        return Storage.get(STORAGE_KEYS.RAMADAN_TRACKER, {});
    },

    updateDay(day, updates) {
        const data = this.getData();
        if (!data[day]) {
            data[day] = {
                fast: false,
                suhoor: false,
                iftar: false,
                tarawih: 0,
                quranReading: '',
                extraIbadah: [],
                notes: '',
                date: new Date().toISOString()
            };
        }
        Object.assign(data[day], updates, { lastUpdated: new Date().toISOString() });
        Storage.set(STORAGE_KEYS.RAMADAN_TRACKER, data);
        return data[day];
    },

    getDay(day) {
        const data = this.getData();
        return data[day] || {
            fast: false,
            suhoor: false,
            iftar: false,
            tarawih: 0,
            quranReading: '',
            extraIbadah: [],
            notes: ''
        };
    },

    getSummary() {
        const data = this.getData();
        const days = Object.keys(data).length;
        const fastsCompleted = Object.values(data).filter(d => d.fast).length;
        const totalTarawih = Object.values(data).reduce((sum, d) => sum + (d.tarawih || 0), 0);

        return {
            days,
            fastsCompleted,
            totalTarawih,
            completionRate: days > 0 ? Math.round((fastsCompleted / days) * 100) : 0
        };
    },

    clear() {
        return Storage.remove(STORAGE_KEYS.RAMADAN_TRACKER);
    }
};

// === DOM Helpers ===
const DOM = {
    $(selector) {
        return document.querySelector(selector);
    },
    
    $$(selector) {
        return document.querySelectorAll(selector);
    },
    
    create(tag, attrs = {}, children = []) {
        const el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => {
            if (key === 'className') el.className = value;
            else if (key === 'innerHTML') el.innerHTML = value;
            else if (key === 'textContent') el.textContent = value;
            else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
            else el.setAttribute(key, value);
        });
        children.forEach(child => {
            if (typeof child === 'string') el.appendChild(document.createTextNode(child));
            else el.appendChild(child);
        });
        return el;
    }
};

// === Initialize Theme on Load ===
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
});
