/* ============================================
   BARAKAH PLANNER v2.0 — App Logic (Upgraded)
   Unified Daily Engine | Dynamic Lists | Settings | Goals Cascade
   All new logic from plan implemented
   ============================================ */

// Test that script is loading
console.log('App.js loaded successfully!');

(function () {
    'use strict';
    console.log('IIFE started');

    // ===== CONSTANTS =====
    const STORAGE_KEY = 'barakah-business-planner';
    const SETTINGS_KEY = 'bb-settings';

    // Theme presets
    const THEME_PRESETS = {
        'default':       { accent: '#2a5a3a', accentLight: '#e8f0eb' },
        'islamic-green': { accent: '#1b7a3d', accentLight: '#e2f4e8' },
        'ocean-blue':    { accent: '#1a5276', accentLight: '#dde8f0' },
        'warm-sand':     { accent: '#8b6914', accentLight: '#f5f0e0' },
        'royal-purple':  { accent: '#5b2c6f', accentLight: '#ede4f2' },
        'rose-gold':     { accent: '#8b3a4a', accentLight: '#f5e4e8' }
    };

    // ===== STATE =====
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentDailyDate = new Date().toISOString().split('T')[0];
    let settings = loadSettings();

    // Apply theme immediately (before DOM ready to prevent flash)
    (function earlyTheme() {
        const s = settings;
        const darkMode = s.darkMode || false;
        if (darkMode) document.documentElement.setAttribute('data-theme', 'dark');
        const customAccent = s.customAccent || null;
        const themeName = s.theme || 'default';
        const PRESETS = {
            'default': '#2a5a3a', 'islamic-green': '#1b7a3d', 'ocean-blue': '#1a5276',
            'warm-sand': '#8b6914', 'royal-purple': '#5b2c6f', 'rose-gold': '#8b3a4a'
        };
        const accent = customAccent || PRESETS[themeName] || '#2a5a3a';
        document.documentElement.style.setProperty('--accent', accent);
    })();

    // Day reminders data with enhanced Islamic content
    const DAY_REMINDERS = {
        1: { title: "Monday — Day of Revelation", body: "The Prophet \uFDFA was born on Monday and revelation began on this day. <strong>Recommended:</strong> Fast (Sunnah), increase Salawat upon the Prophet \uFDFA, make du'a for guidance." },
        2: { title: "Tuesday — Day of Labor", body: "Allah created labor on Tuesday. <strong>Recommended:</strong> Work hard with barakah, begin challenging tasks, seek Allah's help in your work." },
        3: { title: "Wednesday — Day of Light", body: "Allah created light on Wednesday. <strong>Recommended:</strong> Increase dhikr of 'Ya Noor' (O Light), reflect on the Noor of the Qur'an, seek spiritual illumination." },
        4: { title: "Thursday — Deeds Presented to Allah", body: "Deeds are presented to Allah on Thursday. <strong>Recommended:</strong> Fast (Sunnah), give charity, increase istighfar, review your week's deeds." },
        5: { title: "Jumu'ah Mubarak!", body: "The best day the sun rises upon. <strong>Recommended:</strong> Ghusl, read Surah Al-Kahf, abundant Salawat, du'a in the last hour before Maghrib, attend Jumu'ah early." },
        6: { title: "Saturday — Salutation of the Prophet \uFDFA", body: "A day to increase in sending salutations upon the Prophet \uFDFA. <strong>Recommended:</strong> Recite Salawat abundantly, spend time with family, reflect on Seerah." },
        0: { title: "Sunday — Day of Reflection", body: "Allah created mountains on Sunday. <strong>Recommended:</strong> Reflect on Allah's creation, practice gratitude, plan the upcoming week, spend time in nature." }
    };

    // Prayer rakat display
    const PRAYER_RAKAT = { fajr: 2, dhuhr: 4, asr: 4, maghrib: 3, isha: 4 };

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded - Initializing Planner');
        try {
            applyTheme();
            initNavigation();
            initYearLabel();
            initYearlyEvents();
            initCalendar();
            initHabitMatrix();
            initDailyEngine();
            initTimeBlocks();
            initWaterDrops();
            initKanban();
            initDotGridCanvas();
            initQadhaTracker();
            initSettings();
            initRichTextEditor();
            initDynamicLists();
            initIstighfarCounters();
            initRevenueTracking();
            initSalahTracking();
            initGratitudeTracking();
            initWeeklyPage();
            initNotTodoList();
            initProjectPlanner();
            initMeetingNotesPage();
            initIstekharaPlanner();
            initReviewTabs();
            loadAllData();
            bindAutoSave();
            bindResetButton();
            bindPrintButton();
            initAuth();
            initRamadanPlanner();
            initDailyDua();
            initNotificationManager();
            initRamadanAnalytics();
            console.log('Planner initialization complete');
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    });

    // ===== SETTINGS =====
    function loadSettings() {
        try {
            return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
        } catch { return {}; }
    }

    function saveSettings() {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    }

    function getSettingVal(key, def) {
        return settings[key] !== undefined ? settings[key] : def;
    }

    function initSettings() {
        const modal = document.getElementById('settingsModal');
        const btnOpen = document.getElementById('navSettings');
        const btnClose = document.getElementById('settingsClose');

        if (!modal || !btnOpen) return;

        btnOpen.addEventListener('click', (e) => {
            e.preventDefault();
            populateSettingsUI();
            modal.style.display = 'flex';
        });
        btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });

        // Name
        const nameInput = document.getElementById('settingName');
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                settings.name = e.target.value;
                saveSettings();
                updatePersonalization();
            });
        }

        // Madhab
        const madhabSelect = document.getElementById('settingMadhab');
        if (madhabSelect) {
            madhabSelect.addEventListener('change', (e) => {
                settings.madhab = e.target.value;
                saveSettings();
                updateWitrHint();
                autoFillSalahTimes();
            });
        }

        // Calculation Method
        const calcMethodSelect = document.getElementById('settingCalcMethod');
        if (calcMethodSelect) {
            calcMethodSelect.addEventListener('change', (e) => {
                settings.calcMethod = e.target.value;
                saveSettings();
                autoFillSalahTimes();
            });
        }

        // City search
        initCitySearch();

        // Time format
        document.querySelectorAll('[name="settingTimeFormat"]').forEach(r => {
            r.addEventListener('change', (e) => {
                settings.timeFormat = e.target.value;
                saveSettings();
                updateTimeFormat();
            });
        });

        // Hijri adjustment
        const hijriInput = document.getElementById('settingHijriAdj');
        if (hijriInput) {
            hijriInput.addEventListener('change', (e) => {
                settings.hijriAdj = parseInt(e.target.value) || 0;
                saveSettings();
                updateDailyLayout();
            });
        }

        // Fasting days
        const fastMon = document.getElementById('settingFastMon');
        const fastThu = document.getElementById('settingFastThu');
        if (fastMon) {
            fastMon.addEventListener('change', (e) => {
                settings.fastMon = e.target.checked;
                saveSettings();
            });
        }
        if (fastThu) {
            fastThu.addEventListener('change', (e) => {
                settings.fastThu = e.target.checked;
                saveSettings();
            });
        }

        // Weekend days
        const weekendCheckboxes = document.querySelectorAll('.weekend-day-checkbox');
        weekendCheckboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const day = parseInt(e.target.dataset.day);
                if (!settings.weekendDays) settings.weekendDays = [6, 0]; // Default: Sat, Sun

                if (e.target.checked) {
                    if (!settings.weekendDays.includes(day)) {
                        settings.weekendDays.push(day);
                    }
                } else {
                    settings.weekendDays = settings.weekendDays.filter(d => d !== day);
                }
                saveSettings();
                updateDailyLayout();
            });
        });

        // Section toggles
        document.querySelectorAll('.setting-section-toggle').forEach(cb => {
            cb.addEventListener('change', () => {
                const section = cb.dataset.section;
                settings['show_' + section] = cb.checked;
                saveSettings();
                applySectionVisibility();
            });
        });

        // Export
        const exportBtn = document.getElementById('btnExportData');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const allData = {
                    planner: loadData(),
                    settings: loadSettings(),
                    exportDate: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'barakah-planner-backup-' + new Date().toISOString().split('T')[0] + '.json';
                a.click();
                URL.revokeObjectURL(url);
            });
        }

        // Import
        const fileInput = document.getElementById('importFileInput');
        const importBtn = document.getElementById('btnImportData');
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => { fileInput.click(); });
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const imported = JSON.parse(ev.target.result);
                        if (imported.planner) {
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(imported.planner));
                        }
                        if (imported.settings) {
                            localStorage.setItem(SETTINGS_KEY, JSON.stringify(imported.settings));
                            settings = imported.settings;
                        }
                        alert('Data imported successfully! Reloading...');
                        location.reload();
                    } catch {
                        alert('Invalid JSON file. Please check the file format.');
                    }
                };
                reader.readAsText(file);
                fileInput.value = '';
            });
        }

        // Clear All
        const clearBtn = document.getElementById('btnClearAllData');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (!confirm('This will permanently delete ALL planner data. Are you sure?')) return;
                if (!confirm('This cannot be undone. Really clear everything?')) return;
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(SETTINGS_KEY);
                location.reload();
            });
        }

        // Notification Settings
        initNotificationSettings();

        // === Theme / Appearance listeners ===
        // Preset buttons
        document.querySelectorAll('#themePresetGrid .theme-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const themeName = btn.dataset.theme;
                settings.theme = themeName;
                settings.customAccent = null;
                saveSettings();
                applyTheme();
                // Update UI active state
                document.querySelectorAll('#themePresetGrid .theme-preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // Reset color picker to preset
                const preset = THEME_PRESETS[themeName];
                const picker = document.getElementById('customAccentPicker');
                const hexDisp = document.getElementById('customAccentHex');
                if (picker && preset) picker.value = preset.accent;
                if (hexDisp && preset) hexDisp.textContent = preset.accent;
            });
        });

        // Custom color picker
        const colorPicker = document.getElementById('customAccentPicker');
        const colorHex = document.getElementById('customAccentHex');
        if (colorPicker) {
            colorPicker.addEventListener('input', () => {
                if (colorHex) colorHex.textContent = colorPicker.value;
            });
        }

        // Apply custom color button
        const applyColorBtn = document.getElementById('btnApplyCustomColor');
        if (applyColorBtn && colorPicker) {
            applyColorBtn.addEventListener('click', () => {
                settings.customAccent = colorPicker.value;
                settings.theme = 'custom';
                saveSettings();
                applyTheme();
                // Deactivate preset buttons
                document.querySelectorAll('#themePresetGrid .theme-preset-btn').forEach(b => b.classList.remove('active'));
            });
        }

        // Dark mode toggle
        const darkToggle = document.getElementById('darkModeToggle');
        if (darkToggle) {
            darkToggle.addEventListener('change', () => {
                settings.darkMode = darkToggle.checked;
                saveSettings();
                applyTheme();
            });
        }

        updateWitrHint();
        applySectionVisibility();
        updatePersonalization();
    }

    function populateSettingsUI() {
        const nameInput = document.getElementById('settingName');
        const madhabSelect = document.getElementById('settingMadhab');
        const hijriInput = document.getElementById('settingHijriAdj');
        const fastMon = document.getElementById('settingFastMon');
        const fastThu = document.getElementById('settingFastThu');

        if (nameInput) nameInput.value = getSettingVal('name', '');
        if (madhabSelect) madhabSelect.value = getSettingVal('madhab', 'hanafi');
        if (hijriInput) hijriInput.value = getSettingVal('hijriAdj', 0);
        if (fastMon) fastMon.checked = getSettingVal('fastMon', true);
        if (fastThu) fastThu.checked = getSettingVal('fastThu', true);

        // Location settings
        const cityInput = document.getElementById('settingCity');
        const latInput = document.getElementById('settingLat');
        const lngInput = document.getElementById('settingLng');
        const calcMethodSelect = document.getElementById('settingCalcMethod');
        if (cityInput) cityInput.value = getSettingVal('city', '');
        if (latInput) latInput.value = getSettingVal('lat', '');
        if (lngInput) lngInput.value = getSettingVal('lng', '');
        if (calcMethodSelect) calcMethodSelect.value = getSettingVal('calcMethod', '1');

        const tf = getSettingVal('timeFormat', '12h');
        document.querySelectorAll('[name="settingTimeFormat"]').forEach(r => { r.checked = r.value === tf; });

        // Weekend days
        const weekendDays = getSettingVal('weekendDays', [6, 0]); // Default: Sat(6), Sun(0)
        document.querySelectorAll('.weekend-day-checkbox').forEach(cb => {
            const day = parseInt(cb.dataset.day);
            cb.checked = weekendDays.includes(day);
        });

        document.querySelectorAll('.setting-section-toggle').forEach(cb => {
            cb.checked = getSettingVal('show_' + cb.dataset.section, true);
        });

        // Theme / Appearance
        const savedTheme = getSettingVal('theme', 'default');
        const savedCustom = getSettingVal('customAccent', null);
        document.querySelectorAll('#themePresetGrid .theme-preset-btn').forEach(b => {
            b.classList.toggle('active', !savedCustom && b.dataset.theme === savedTheme);
        });
        const picker = document.getElementById('customAccentPicker');
        const hexDisp = document.getElementById('customAccentHex');
        if (picker) {
            const currentAccent = savedCustom || (THEME_PRESETS[savedTheme] || THEME_PRESETS['default']).accent;
            picker.value = currentAccent;
            if (hexDisp) hexDisp.textContent = currentAccent;
        }
        const darkToggle = document.getElementById('darkModeToggle');
        if (darkToggle) darkToggle.checked = getSettingVal('darkMode', false);
    }

    function applySectionVisibility() {
        const sections = ['kanban', 'deepwork', 'pt-zone', 'engineer-brain', 'meeting-log', 'family', 'bio-data', 'goals-cascade'];
        sections.forEach(s => {
            const show = getSettingVal('show_' + s, true);
            document.querySelectorAll('[data-section="' + s + '"]').forEach(el => {
                el.style.display = show ? '' : 'none';
            });
        });
    }

    function updateWitrHint() {
        const madhab = getSettingVal('madhab', 'hanafi');
        const hint = document.getElementById('witrRakatHint');
        if (hint) {
            hint.textContent = madhab === 'hanafi' ? '3r' : '1-11r';
        }
    }

    function updatePersonalization() {
        const name = getSettingVal('name', '');
        // Could use name for personalized messages throughout
    }

    function updateTimeFormat() {
        const format = getSettingVal('timeFormat', '12h');
        // Update time displays if needed
    }

    // ===== THEME SYSTEM =====
    function hexToAccentLight(hex) {
        // Convert hex to a light tint (mix with white at ~90%)
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const mix = 0.88;
        const lr = Math.round(r + (255 - r) * mix);
        const lg = Math.round(g + (255 - g) * mix);
        const lb = Math.round(b + (255 - b) * mix);
        return '#' + [lr, lg, lb].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    function applyTheme() {
        const themeName = getSettingVal('theme', 'default');
        const customAccent = getSettingVal('customAccent', null);
        const darkMode = getSettingVal('darkMode', false);

        // Set accent color
        let accent, accentLight;
        if (customAccent) {
            accent = customAccent;
            accentLight = hexToAccentLight(customAccent);
        } else {
            const preset = THEME_PRESETS[themeName] || THEME_PRESETS['default'];
            accent = preset.accent;
            accentLight = preset.accentLight;
        }

        document.documentElement.style.setProperty('--accent', accent);
        document.documentElement.style.setProperty('--accent-light', accentLight);

        // Dark mode
        if (darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    // ===== PRAYER TIME AUTO-FILL =====
    const PRAYER_TIMES_CACHE_KEY = 'bb-prayer-times-cache';

    function getPrayerTimesCache() {
        try {
            return JSON.parse(localStorage.getItem(PRAYER_TIMES_CACHE_KEY) || '{}');
        } catch { return {}; }
    }

    function setPrayerTimesCache(cache) {
        localStorage.setItem(PRAYER_TIMES_CACHE_KEY, JSON.stringify(cache));
    }

    async function fetchPrayerTimes(date, lat, lng, method, madhab) {
        // date is YYYY-MM-DD, convert to DD-MM-YYYY for API
        const parts = date.split('-');
        const apiDate = parts[2] + '-' + parts[1] + '-' + parts[0];
        const school = (madhab === 'hanafi') ? 1 : 0;

        // Check cache
        const cacheKey = date + '|' + lat + '|' + lng + '|' + method + '|' + school;
        const cache = getPrayerTimesCache();
        if (cache[cacheKey]) return cache[cacheKey];

        try {
            const url = 'https://api.aladhan.com/v1/timings/' + apiDate +
                '?latitude=' + encodeURIComponent(lat) +
                '&longitude=' + encodeURIComponent(lng) +
                '&method=' + encodeURIComponent(method) +
                '&school=' + school;
            const resp = await fetch(url);
            if (!resp.ok) return null;
            const json = await resp.json();
            if (json.code !== 200 || !json.data || !json.data.timings) return null;

            const t = json.data.timings;
            const result = {
                fajr: convertTo24h(t.Fajr),
                dhuhr: convertTo24h(t.Dhuhr),
                asr: convertTo24h(t.Asr),
                maghrib: convertTo24h(t.Maghrib),
                isha: convertTo24h(t.Isha)
            };

            // Cache the result
            cache[cacheKey] = result;
            // Limit cache size: keep last 60 entries
            const keys = Object.keys(cache);
            if (keys.length > 60) {
                delete cache[keys[0]];
            }
            setPrayerTimesCache(cache);
            return result;
        } catch (err) {
            console.error('Failed to fetch prayer times:', err);
            return null;
        }
    }

    function convertTo24h(timeStr) {
        // Aladhan returns times like "05:23" or "05:23 (PKT)" — strip timezone
        if (!timeStr) return '';
        return timeStr.replace(/\s*\(.*\)/, '').trim();
    }

    async function autoFillSalahTimes() {
        const lat = getSettingVal('lat', '');
        const lng = getSettingVal('lng', '');
        if (!lat || !lng) return;

        const method = getSettingVal('calcMethod', '1');
        const madhab = getSettingVal('madhab', 'hanafi');

        const times = await fetchPrayerTimes(currentDailyDate, lat, lng, method, madhab);
        if (!times) return;

        const data = loadData();
        const datePrefix = 'daily-' + currentDailyDate + '-';
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

        prayers.forEach(prayer => {
            const time = times[prayer];
            if (!time) return;

            // Fill Adhan if not manually edited for this date
            const adhanKey = datePrefix + prayer + '-adhan';
            const adhanEditedKey = datePrefix + prayer + '-adhan-edited';
            if (!data[adhanEditedKey]) {
                data[adhanKey] = time;
                const adhanInput = document.querySelector('.adhan-time[data-prayer="' + prayer + '"]');
                if (adhanInput) adhanInput.value = time;
            }

            // Fill Salah Time if not manually edited for this date
            const salahKey = datePrefix + prayer + '-salah';
            const salahEditedKey = datePrefix + prayer + '-salah-edited';
            if (!data[salahEditedKey]) {
                data[salahKey] = time;
                const salahInput = document.querySelector('.salah-time[data-prayer="' + prayer + '"]');
                if (salahInput) salahInput.value = time;
            }
        });

        saveData(data);
        syncAdhanToTimeBlocks();
    }

    // ===== CITY SEARCH =====
    const MAJOR_CITIES = [
        { name: "Makkah, Saudi Arabia", lat: 21.4225, lng: 39.8262 },
        { name: "Madinah, Saudi Arabia", lat: 24.4672, lng: 39.6112 },
        { name: "Dhaka, Bangladesh", lat: 23.8103, lng: 90.4125 },
        { name: "Chittagong, Bangladesh", lat: 22.3569, lng: 91.7832 },
        { name: "Sylhet, Bangladesh", lat: 24.8949, lng: 91.8687 },
        { name: "Rajshahi, Bangladesh", lat: 24.3636, lng: 88.6241 },
        { name: "Khulna, Bangladesh", lat: 22.8456, lng: 89.5403 },
        { name: "Karachi, Pakistan", lat: 24.8607, lng: 67.0011 },
        { name: "Lahore, Pakistan", lat: 31.5204, lng: 74.3587 },
        { name: "Islamabad, Pakistan", lat: 33.6844, lng: 73.0479 },
        { name: "Istanbul, Turkey", lat: 41.0082, lng: 28.9784 },
        { name: "Ankara, Turkey", lat: 39.9334, lng: 32.8597 },
        { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357 },
        { name: "Alexandria, Egypt", lat: 31.2001, lng: 29.9187 },
        { name: "Jakarta, Indonesia", lat: -6.2088, lng: 106.8456 },
        { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lng: 101.6869 },
        { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
        { name: "Abu Dhabi, UAE", lat: 24.4539, lng: 54.3773 },
        { name: "Riyadh, Saudi Arabia", lat: 24.7136, lng: 46.6753 },
        { name: "Jeddah, Saudi Arabia", lat: 21.4858, lng: 39.1925 },
        { name: "Doha, Qatar", lat: 25.2854, lng: 51.5310 },
        { name: "Kuwait City, Kuwait", lat: 29.3759, lng: 47.9774 },
        { name: "Muscat, Oman", lat: 23.5880, lng: 58.3829 },
        { name: "Manama, Bahrain", lat: 26.2285, lng: 50.5860 },
        { name: "Tehran, Iran", lat: 35.6892, lng: 51.3890 },
        { name: "Baghdad, Iraq", lat: 33.3152, lng: 44.3661 },
        { name: "Amman, Jordan", lat: 31.9454, lng: 35.9284 },
        { name: "Beirut, Lebanon", lat: 33.8938, lng: 35.5018 },
        { name: "Damascus, Syria", lat: 33.5138, lng: 36.2765 },
        { name: "Casablanca, Morocco", lat: 33.5731, lng: -7.5898 },
        { name: "Tunis, Tunisia", lat: 36.8065, lng: 10.1815 },
        { name: "Algiers, Algeria", lat: 36.7538, lng: 3.0588 },
        { name: "Tripoli, Libya", lat: 32.8872, lng: 13.1913 },
        { name: "Khartoum, Sudan", lat: 15.5007, lng: 32.5599 },
        { name: "Mogadishu, Somalia", lat: 2.0469, lng: 45.3182 },
        { name: "London, UK", lat: 51.5074, lng: -0.1278 },
        { name: "Birmingham, UK", lat: 52.4862, lng: -1.8904 },
        { name: "Manchester, UK", lat: 53.4808, lng: -2.2426 },
        { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
        { name: "Berlin, Germany", lat: 52.5200, lng: 13.4050 },
        { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
        { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437 },
        { name: "Chicago, USA", lat: 41.8781, lng: -87.6298 },
        { name: "Houston, USA", lat: 29.7604, lng: -95.3698 },
        { name: "Dallas, USA", lat: 32.7767, lng: -96.7970 },
        { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832 },
        { name: "Montreal, Canada", lat: 45.5017, lng: -73.5673 },
        { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
        { name: "Melbourne, Australia", lat: -37.8136, lng: 144.9631 },
        { name: "Singapore", lat: 1.3521, lng: 103.8198 },
        { name: "Delhi, India", lat: 28.7041, lng: 77.1025 },
        { name: "Mumbai, India", lat: 19.0760, lng: 72.8777 },
        { name: "Hyderabad, India", lat: 17.3850, lng: 78.4867 },
        { name: "Bangalore, India", lat: 12.9716, lng: 77.5946 },
        { name: "Kolkata, India", lat: 22.5726, lng: 88.3639 },
        { name: "Chennai, India", lat: 13.0827, lng: 80.2707 },
        { name: "Lucknow, India", lat: 26.8467, lng: 80.9462 },
        { name: "Lagos, Nigeria", lat: 6.5244, lng: 3.3792 },
        { name: "Abuja, Nigeria", lat: 9.0765, lng: 7.3986 },
        { name: "Nairobi, Kenya", lat: -1.2921, lng: 36.8219 },
        { name: "Dar es Salaam, Tanzania", lat: -6.7924, lng: 39.2083 },
        { name: "Johannesburg, South Africa", lat: -26.2041, lng: 28.0473 },
        { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241 },
        { name: "Tashkent, Uzbekistan", lat: 41.2995, lng: 69.2401 },
        { name: "Baku, Azerbaijan", lat: 40.4093, lng: 49.8671 },
        { name: "Kabul, Afghanistan", lat: 34.5553, lng: 69.2075 },
        { name: "Colombo, Sri Lanka", lat: 6.9271, lng: 79.8612 },
        { name: "Male, Maldives", lat: 4.1755, lng: 73.5093 },
        { name: "Sarajevo, Bosnia", lat: 43.8563, lng: 18.4131 },
        { name: "Tirana, Albania", lat: 41.3275, lng: 19.8187 },
        { name: "Brussels, Belgium", lat: 50.8503, lng: 4.3517 },
        { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041 },
        { name: "Rome, Italy", lat: 41.9028, lng: 12.4964 },
        { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038 },
        { name: "Moscow, Russia", lat: 55.7558, lng: 37.6173 },
        { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503 },
        { name: "Seoul, South Korea", lat: 37.5665, lng: 126.9780 },
        { name: "Beijing, China", lat: 39.9042, lng: 116.4074 },
        { name: "Bangkok, Thailand", lat: 13.7563, lng: 100.5018 },
        { name: "Colombo, Sri Lanka", lat: 6.9271, lng: 79.8612 }
    ];

    function initCitySearch() {
        const input = document.getElementById('settingCity');
        const dropdown = document.getElementById('citySearchDropdown');
        if (!input || !dropdown) return;

        input.addEventListener('input', () => {
            const query = input.value.trim().toLowerCase();
            dropdown.innerHTML = '';
            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            const matches = MAJOR_CITIES.filter(c =>
                c.name.toLowerCase().includes(query)
            ).slice(0, 8);

            if (matches.length === 0) {
                dropdown.style.display = 'none';
                return;
            }

            matches.forEach(city => {
                const item = document.createElement('div');
                item.className = 'city-search-item';
                item.textContent = city.name;
                item.addEventListener('click', () => {
                    input.value = city.name;
                    document.getElementById('settingLat').value = city.lat;
                    document.getElementById('settingLng').value = city.lng;
                    settings.city = city.name;
                    settings.lat = city.lat;
                    settings.lng = city.lng;
                    saveSettings();
                    dropdown.style.display = 'none';
                    autoFillSalahTimes();
                });
                dropdown.appendChild(item);
            });
            dropdown.style.display = 'block';
        });

        // Hide dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.city-search-wrapper')) {
                dropdown.style.display = 'none';
            }
        });
    }

    // ===== NAVIGATION =====
    function initNavigation() {
        const links = document.querySelectorAll('.nav-link');
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        const overlay = document.getElementById('sidebarOverlay');

        console.log('Navigation init: Found', links.length, 'nav links');
        console.log('Sidebar element:', sidebar);
        console.log('Toggle element:', toggle);
        console.log('Overlay element:', overlay);

        // Helper function to close mobile sidebar
        function closeMobileSidebar() {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('expanded');
                if (overlay) overlay.classList.remove('active');
            }
        }

        // Helper function to open mobile sidebar
        function openMobileSidebar() {
            if (window.innerWidth <= 900) {
                sidebar.classList.add('expanded');
                if (overlay) overlay.classList.add('active');
            }
        }

        // Helper function to toggle mobile sidebar
        function toggleMobileSidebar() {
            if (sidebar.classList.contains('expanded')) {
                closeMobileSidebar();
            } else {
                openMobileSidebar();
            }
        }

        // Navigation link clicks
        links.forEach((link, index) => {
            console.log('Link', index, ':', link.dataset.page);
            link.addEventListener('click', (e) => {
                console.log('Link clicked:', link.dataset.page);
                e.preventDefault();
                e.stopPropagation();

                const pageId = link.dataset.page;
                if (!pageId) {
                    console.error('No page ID found for link:', link);
                    return;
                }

                // Remove active class from all links
                links.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');

                // Hide all pages
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

                // Show target page
                const target = document.getElementById('page-' + pageId);
                if (target) {
                    target.classList.add('active');
                    console.log('Showing page:', 'page-' + pageId);
                } else {
                    console.error('Page not found:', 'page-' + pageId);
                }

                // Persist active page
                localStorage.setItem('bb-active-page', pageId);

                if (pageId === 'daily-engine') {
                    updateDailyLayout();
                    refreshGoalsCascade();
                    syncAdhanToTimeBlocks();
                }

                if (pageId === 'daily-dua') {
                    renderDuaSections();
                }

                if (pageId === 'ramadan') {
                    loadRamadanDailyData(currentRamadanDay);
                    updateRamadanStats();
                    renderJuzGrid();
                    updateQuranProgress();
                    renderAllDhikrLists();
                    updateDhikrSummary();
                }

                if (pageId === 'analytics') {
                    initAnalyticsPage();
                }

                if (pageId === 'reports') {
                    initReportsPage();
                }

                // Close sidebar on mobile after navigation
                closeMobileSidebar();
            });
        });

        // Toggle button click handler
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Toggle clicked, window width:', window.innerWidth);
                console.log('Sidebar classes before toggle:', sidebar.className);

                if (window.innerWidth <= 900) {
                    // Mobile: toggle expanded state with overlay
                    toggleMobileSidebar();
                    console.log('Sidebar classes after toggle:', sidebar.className);
                } else {
                    // Desktop: toggle collapsed state
                    sidebar.classList.toggle('collapsed');
                    console.log('Sidebar classes after toggle:', sidebar.className);
                    // Also update main content margin immediately
                    const mainContent = document.querySelector('.main-content');
                    if (mainContent) {
                        if (sidebar.classList.contains('collapsed')) {
                            mainContent.style.marginLeft = 'var(--sidebar-w-collapsed)';
                        } else {
                            mainContent.style.marginLeft = 'var(--sidebar-w)';
                        }
                    }
                }
            });
        } else {
            console.error('Toggle button not found!');
        }

        // Overlay click handler - close sidebar when clicking outside
        if (overlay) {
            overlay.addEventListener('click', () => {
                closeMobileSidebar();
            });
        }

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('expanded')) {
                closeMobileSidebar();
            }
        });

        // Handle window resize - cleanup mobile state when switching to desktop
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 900) {
                    // Switched to desktop - remove mobile-specific states
                    sidebar.classList.remove('expanded');
                    if (overlay) overlay.classList.remove('active');

                    // Ensure main content margin is correct
                    const mainContent = document.querySelector('.main-content');
                    if (mainContent) {
                        if (sidebar.classList.contains('collapsed')) {
                            mainContent.style.marginLeft = 'var(--sidebar-w-collapsed)';
                        } else {
                            mainContent.style.marginLeft = 'var(--sidebar-w)';
                        }
                    }
                }
            }, 250);
        });

        // Restore persisted active page
        const savedPage = localStorage.getItem('bb-active-page');
        if (savedPage) {
            const savedLink = document.querySelector('.nav-link[data-page="' + savedPage + '"]');
            const savedTarget = document.getElementById('page-' + savedPage);
            if (savedLink && savedTarget) {
                links.forEach(l => l.classList.remove('active'));
                savedLink.classList.add('active');
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                savedTarget.classList.add('active');
                if (savedPage === 'daily-engine') {
                    updateDailyLayout();
                    refreshGoalsCascade();
                    syncAdhanToTimeBlocks();
                }
            }
        }

        // === Bottom Navigation Bar ===
        const bottomNav = document.getElementById('bottomNav');
        const bottomNavItems = bottomNav ? bottomNav.querySelectorAll('.bottom-nav-item[data-page]') : [];
        const bottomNavMore = document.getElementById('bottomNavMore');

        function syncBottomNav(pageId) {
            if (!bottomNav) return;
            bottomNav.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
            const match = bottomNav.querySelector('.bottom-nav-item[data-page="' + pageId + '"]');
            if (match) match.classList.add('active');
        }

        // Sync on initial load
        syncBottomNav(savedPage || 'yearly');

        bottomNavItems.forEach(btn => {
            btn.addEventListener('click', () => {
                const pageId = btn.dataset.page;
                if (!pageId) return;

                // Switch sidebar active state
                links.forEach(l => l.classList.remove('active'));
                const sidebarLink = document.querySelector('.nav-link[data-page="' + pageId + '"]');
                if (sidebarLink) sidebarLink.classList.add('active');

                // Switch pages
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                const target = document.getElementById('page-' + pageId);
                if (target) target.classList.add('active');
                localStorage.setItem('bb-active-page', pageId);

                if (pageId === 'daily-engine') { updateDailyLayout(); refreshGoalsCascade(); syncAdhanToTimeBlocks(); }
                if (pageId === 'ramadan') { loadRamadanDailyData(currentRamadanDay); updateRamadanStats(); renderJuzGrid(); updateQuranProgress(); renderAllDhikrLists(); updateDhikrSummary(); }
                if (pageId === 'analytics') { initAnalyticsPage(); }
                if (pageId === 'reports') { initReportsPage(); }

                syncBottomNav(pageId);
            });
        });

        // "More" button opens sidebar overlay
        if (bottomNavMore) {
            bottomNavMore.addEventListener('click', () => {
                openMobileSidebar();
            });
        }

        // Also sync bottom nav when sidebar links are clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                const pageId = link.dataset.page;
                if (pageId) syncBottomNav(pageId);
            });
        });
    }

    // ===== YEAR LABEL =====
    function initYearLabel() {
        const el = document.getElementById('yearLabel');
        if (el) el.textContent = new Date().getFullYear() + ' / ' + getHijriYear();
    }

    // ===== YEARLY EVENTS =====
    function initYearlyEvents() {
        const addBtn = document.getElementById('btnAddYearlyEvent');
        const list = document.getElementById('yearlyEventsList');

        if (!addBtn || !list) return;

        // Add new event button
        addBtn.addEventListener('click', () => {
            const events = getYearlyEvents();
            events.push({
                id: Date.now().toString(),
                date: '',
                title: '',
                category: 'personal',
                notes: '',
                tracked: false
            });
            saveYearlyEvents(events);
            renderYearlyEvents();
        });

        // Track preset buttons
        document.querySelectorAll('.btn-track-preset').forEach(btn => {
            btn.addEventListener('click', () => {
                const dateInput = document.querySelector('[data-key="yearly-preset-' + btn.dataset.preset + '"]');
                if (!dateInput || !dateInput.value) {
                    alert('Please select a date first');
                    return;
                }

                const events = getYearlyEvents();
                const existingIndex = events.findIndex(e =>
                    e.title === btn.dataset.title && e.date === dateInput.value
                );

                if (existingIndex >= 0) {
                    events[existingIndex].tracked = true;
                } else {
                    events.push({
                        id: Date.now().toString(),
                        date: dateInput.value,
                        title: btn.dataset.title,
                        category: btn.dataset.category,
                        notes: '',
                        tracked: true
                    });
                }
                saveYearlyEvents(events);
                renderYearlyEvents();
                btn.textContent = '✓ Tracked';
                btn.disabled = true;
            });
        });

        // Preset date change handlers
        document.querySelectorAll('[data-key^="yearly-preset-"]').forEach(input => {
            input.addEventListener('change', updatePresetButtons);
        });

        // Initial render
        renderYearlyEvents();

        // Update preset buttons based on existing events
        updatePresetButtons();
    }

    function getYearlyEvents() {
        const data = loadData();
        try {
            return JSON.parse(data['yearly-events'] || '[]');
        } catch { return []; }
    }

    function saveYearlyEvents(events) {
        saveField('yearly-events', JSON.stringify(events));
        updatePresetButtons();
    }

    function renderYearlyEvents() {
        const list = document.getElementById('yearlyEventsList');
        if (!list) return;

        const events = getYearlyEvents();
        list.innerHTML = '';

        events.sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date) - new Date(b.date);
        });

        events.forEach(evt => {
            const item = document.createElement('div');
            item.className = 'yearly-event-item category-' + evt.category;
            item.innerHTML = `
                <button class="yearly-event-remove" data-id="${evt.id}">&times;</button>
                <div class="yearly-event-header">
                    <input type="date" class="field-input-sm" data-event-id="${evt.id}" data-event-field="date" value="${evt.date || ''}">
                    <input type="text" class="field-input" data-event-id="${evt.id}" data-event-field="title" value="${escapeHtml(evt.title || '')}" placeholder="Event title" style="flex:1">
                    <select class="field-select" data-event-id="${evt.id}" data-event-field="category" style="min-width:100px">
                        <option value="islamic" ${evt.category === 'islamic' ? 'selected' : ''}>Islamic</option>
                        <option value="professional" ${evt.category === 'professional' ? 'selected' : ''}>Professional</option>
                        <option value="personal" ${evt.category === 'personal' ? 'selected' : ''}>Personal</option>
                        <option value="family" ${evt.category === 'family' ? 'selected' : ''}>Family</option>
                    </select>
                    <button class="yearly-event-track ${evt.tracked ? 'tracked' : ''}" data-id="${evt.id}">
                        ${evt.tracked ? '✓ Tracked' : 'Track Event'}
                    </button>
                </div>
                <input type="text" class="field-input yearly-event-notes" data-event-id="${evt.id}" data-event-field="notes" value="${escapeHtml(evt.notes || '')}" placeholder="Notes (optional)" style="font-size:0.8rem;font-style:italic;">
            `;
            list.appendChild(item);
        });

        // Event delegation
        list.onclick = (e) => {
            // Remove button
            if (e.target.classList.contains('yearly-event-remove')) {
                const id = e.target.dataset.id;
                const events = getYearlyEvents();
                const idx = events.findIndex(ev => ev.id === id);
                if (idx >= 0) {
                    events.splice(idx, 1);
                    saveYearlyEvents(events);
                    renderYearlyEvents();
                }
                return;
            }

            // Track toggle button
            if (e.target.classList.contains('yearly-event-track')) {
                const id = e.target.dataset.id;
                const events = getYearlyEvents();
                const evt = events.find(ev => ev.id === id);
                if (evt) {
                    evt.tracked = !evt.tracked;
                    saveYearlyEvents(events);
                    renderYearlyEvents();
                }
                return;
            }
        };

        list.onchange = (e) => {
            if (e.target.dataset.eventId && e.target.dataset.eventField) {
                const id = e.target.dataset.eventId;
                const field = e.target.dataset.eventField;
                const events = getYearlyEvents();
                const evt = events.find(ev => ev.id === id);
                if (evt) {
                    evt[field] = e.target.value;
                    saveYearlyEvents(events);
                    // Re-render to update category class
                    if (field === 'category') {
                        renderYearlyEvents();
                    }
                }
            }
        };
    }

    function updatePresetButtons() {
        const events = getYearlyEvents();
        const presets = [
            'muharram1', 'ashura',
            'mawlid',
            'isra',
            'shaban15',
            'ramadan', 'badr', 'fath', 'qadr',
            'eidfitr', 'shawwal6',
            'hijjah1', 'tarwiyah', 'arafah', 'eidadha', 'tashriq'
        ];

        presets.forEach(preset => {
            const btn = document.querySelector(`.btn-track-preset[data-preset="${preset}"]`);
            const dateInput = document.querySelector(`[data-key="yearly-preset-${preset}"]`);
            if (!btn) return;

            const hasTrackedEvent = events.some(e =>
                e.title === btn.dataset.title && e.tracked && e.date === (dateInput ? dateInput.value : '')
            );

            if (hasTrackedEvent) {
                btn.textContent = '✓ Tracked';
                btn.disabled = true;
            } else {
                btn.textContent = 'Track Event';
                btn.disabled = false;
            }
        });
    }

    function getTrackedEventsForDate(date) {
        const events = getYearlyEvents();
        return events.filter(e => e.tracked && e.date === date);
    }

    // ===== HIJRI DATE =====
    function getHijriDate(date) {
        try {
            const adj = getSettingVal('hijriAdj', 0);
            const d = new Date(date);
            d.setDate(d.getDate() + adj);
            const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', {
                day: 'numeric', month: 'long', year: 'numeric'
            });
            return formatter.format(d);
        } catch { return ''; }
    }

    function getHijriYear() {
        try {
            const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', { year: 'numeric' });
            return formatter.format(new Date()).replace(/\s*AH/, ' AH');
        } catch { return ''; }
    }

    function getHijriDay(date) {
        try {
            const adj = getSettingVal('hijriAdj', 0);
            const d = new Date(date);
            d.setDate(d.getDate() + adj);
            const formatter = new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric' });
            return parseInt(formatter.format(d));
        } catch { return null; }
    }

    // ===== REVIEW TABS =====
    function initReviewTabs() {
        document.querySelectorAll('.review-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.reviewTab;
                document.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                document.querySelectorAll('.review-tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById('review-tab-' + tabName).classList.add('active');
            });
        });
    }

    // ===== UNIFIED DAILY ENGINE =====
    function initDailyEngine() {
        const dateInput = document.getElementById('dailyEngineDate');
        if (!dateInput) return;

        dateInput.value = currentDailyDate;
        dateInput.addEventListener('change', () => {
            currentDailyDate = dateInput.value;
            updateDailyLayout();
            loadDailyData();
            refreshGoalsCascade();
            autoFillSalahTimes();
        });

        updateDailyLayout();
        loadDailyData();
        autoFillSalahTimes();

        // Goals cascade toggle
        const toggle = document.getElementById('goalsCascadeToggle');
        const body = document.getElementById('goalsCascadeBody');
        if (toggle && body) {
            toggle.addEventListener('click', () => {
                body.classList.toggle('collapsed');
                const arrow = body.classList.contains('collapsed') ? '\u25B6' : '\u25BC';
                const title = toggle.querySelector('.subsection-title');
                if (title) title.innerHTML = arrow + ' Goals Dashboard';
            });
        }
    }

    function updateDailyLayout() {
        const dateInput = document.getElementById('dailyEngineDate');
        if (!dateInput || !dateInput.value) return;

        const date = new Date(dateInput.value + 'T12:00:00');
        const dayOfWeek = date.getDay();
        const dayName = date.toLocaleDateString('en', { weekday: 'long' });

        // Get custom weekend days from settings
        const weekendDays = getSettingVal('weekendDays', [6, 0]); // Default: Sat(6), Sun(0)
        const isWeekend = weekendDays.includes(dayOfWeek);
        const isSunday = dayOfWeek === 0; // Keep Sunday-specific logic for review

        // Update header
        const hijriEl = document.getElementById('dailyEngineHijri');
        const dayEl = document.getElementById('dailyEngineDay');
        const badgeEl = document.getElementById('dailyEngineBadge');

        if (hijriEl) hijriEl.textContent = getHijriDate(date);
        if (dayEl) dayEl.textContent = dayName;

        // Badge
        if (badgeEl) {
            if (dayOfWeek === 5) {
                badgeEl.textContent = '\u262A Jumu\'ah Mubarak';
                badgeEl.className = 'day-badge jumuah-badge';
            } else if (isWeekend) {
                badgeEl.textContent = 'Weekend Edition';
                badgeEl.className = 'day-badge weekend-badge';
            } else {
                badgeEl.textContent = '';
                badgeEl.className = 'day-badge';
            }
        }

        // Day reminder
        const reminderBox = document.getElementById('dayReminderBox');
        if (reminderBox) {
            const reminder = DAY_REMINDERS[dayOfWeek];
            if (reminder) {
                reminderBox.innerHTML = '<div class="reminder-title">' + reminder.title + '</div>' + reminder.body;
            }
        }

        // Show/hide day-specific sections
        const isJumuah = dayOfWeek === 5;

        // Jumu'ah sections
        document.querySelectorAll('[data-day-section="jumuah"]').forEach(el => {
            el.style.display = isJumuah ? '' : 'none';
        });
        document.querySelectorAll('[data-day-section="jumuah-work"]').forEach(el => {
            el.style.display = isJumuah ? '' : 'none';
        });

        // Weekend sections
        document.querySelectorAll('[data-day-section="weekend"]').forEach(el => {
            el.style.display = isWeekend ? '' : 'none';
        });

        // Sunday review (only on actual Sunday, regardless of weekend settings)
        document.querySelectorAll('[data-day-section="sunday-review"]').forEach(el => {
            el.style.display = isSunday ? '' : 'none';
        });

        // Standard work sections (show on non-Jumuah, non-weekend days)
        document.querySelectorAll('[data-day-section="standard-work"]').forEach(el => {
            el.style.display = (!isJumuah && !isWeekend) ? '' : 'none';
        });

        // Update tracked events display
        updateTrackedEventsDisplay();

        // Update print visibility - store current day type on body for CSS targeting
        document.body.classList.remove('print-jumuah', 'print-weekend', 'print-standard');
        if (isJumuah) {
            document.body.classList.add('print-jumuah');
        } else if (isWeekend) {
            document.body.classList.add('print-weekend');
        } else {
            document.body.classList.add('print-standard');
        }
    }

    function updateTrackedEventsDisplay() {
        const container = document.getElementById('trackedEventsDisplay');
        if (!container) return;

        const events = getTrackedEventsForDate(currentDailyDate);
        if (events.length === 0) {
            container.innerHTML = '';
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        container.innerHTML = '<h3 class="subsection-title">&#9733; Tracked Events</h3>';
        events.forEach(evt => {
            const categoryIcon = {
                islamic: '&#9770;',
                professional: '&#128188;',
                personal: '&#9829;',
                family: '&#128106;'
            }[evt.category] || '&#8226;';

            const item = document.createElement('div');
            item.className = 'tracked-event-item category-' + evt.category;
            item.innerHTML = `
                <span class="tracked-event-icon">${categoryIcon}</span>
                <span class="tracked-event-title">${escapeHtml(evt.title)}</span>
                ${evt.notes ? `<span class="tracked-event-notes">${escapeHtml(evt.notes)}</span>` : ''}
            `;
            container.appendChild(item);
        });
    }

    // ===== DAILY DATA (date-scoped) =====
    function dailyKey(field) {
        return 'daily-' + currentDailyDate + '-' + field;
    }

    function saveDailyField(field, value) {
        saveField(dailyKey(field), value);
    }

    function loadDailyData() {
        const data = loadData();
        const datePrefix = 'daily-' + currentDailyDate + '-';

        // Load all daily-field elements
        document.querySelectorAll('.daily-field').forEach(el => {
            const field = el.dataset.field;
            if (!field) return;
            const key = datePrefix + field;
            const val = data[key];

            if (el.type === 'checkbox') {
                el.checked = val === '1' || val === true;
            } else if (el.type === 'radio') {
                el.checked = (val === el.value);
            } else if (el.tagName === 'SELECT') {
                el.value = val || '';
            } else if (el.tagName === 'BUTTON') {
                // Istighfar counters
                el.textContent = val || '0';
            } else {
                el.value = val || '';
            }
        });

        // Load water drops
        const waterKey = datePrefix + 'water-count';
        const waterCount = parseInt(data[waterKey] || '0');
        const waterContainer = document.getElementById('waterDropsEngine');
        if (waterContainer) updateWaterDisplay(waterContainer, waterCount);

        // Load rich text editor content
        const richEditor = document.getElementById('richTextEditor');
        if (richEditor) {
            richEditor.innerHTML = data[datePrefix + 'rich-notes'] || '';
        }

        // Load dynamic lists
        loadDynamicDeepWork();
        loadDynamicPTActions();
        loadDynamicMeetings();
        loadDynamicDailyChecklist('lightwork', 'lightWorkList', 3, 'Task');
        loadDynamicDailyChecklist('household', 'householdList', 3, 'e.g., Fix sink');
        loadDynamicDailyChecklist('daily-goals', 'dailyGoalsList', 3, "Today's goal");
        loadDynamicDailyChecklist('gratitude', 'gratitudeList', 3, 'Alhamdulillah for...');
        loadDynamicDailyChecklist('tomorrow', 'tomorrowList', 3, 'Priority');

        // Load kanban done items
        loadKanbanDone();

        // Update revenue display
        updateRevenueDisplay();

        // Sync adhan times
        syncAdhanToTimeBlocks();

        // Load time block tasks
        loadTimeBlockTasks();

        // Load energy levels
        loadEnergyLevels();

        // Update tracked events display
        updateTrackedEventsDisplay();
    }

    // ===== ENHANCED SALAH TRACKING =====
    function initSalahTracking() {
        // Calculate daily salah completion percentage
        const salahTable = document.getElementById('salahTable');
        if (salahTable) {
            // Add change listener for salah tracking
            salahTable.addEventListener('change', (e) => {
                if (e.target.classList.contains('daily-field') && e.target.dataset.field) {
                    // Update salah completion stats
                    updateSalahCompletion();
                }
            });
        }
    }

    function updateSalahCompletion() {
        const data = loadData();
        const datePrefix = 'daily-' + currentDailyDate + '-';
        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        let completed = 0;
        let total = prayers.length;

        prayers.forEach(prayer => {
            if (data[datePrefix + prayer + '-fard']) completed++;
        });

        // Could display completion percentage somewhere
    }

    // ===== GRATITUDE TRACKING =====
    function initGratitudeTracking() {
        // Auto-save gratitude entries with debouncing
        const gratitudeInputs = document.querySelectorAll('[data-field^="gratitude-"]');
        let debounceTimer;

        gratitudeInputs.forEach(input => {
            input.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    // Trigger a small celebration when all 3 are filled
                    const allFilled = Array.from(gratitudeInputs).every(i => i.value.trim());
                    if (allFilled) {
                        // Could add a subtle visual feedback
                    }
                }, 500);
            });
        });
    }

    // ===== ADHAN → TIME BLOCK INTEGRATION =====
    function syncAdhanToTimeBlocks() {
        const container = document.getElementById('timeBlockEngine');
        if (!container) return;

        // Clear previous prayer windows
        container.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('prayer-window');
        });

        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const prayerNames = { fajr: 'Fajr Prayer', dhuhr: 'Dhuhr Prayer', asr: 'Asr Prayer', maghrib: 'Maghrib Prayer', isha: 'Isha Prayer' };

        const data = loadData();
        const datePrefix = 'daily-' + currentDailyDate + '-';

        prayers.forEach(prayer => {
            const adhanTime = data[datePrefix + prayer + '-adhan'];
            if (!adhanTime) return;

            const [hours, minutes] = adhanTime.split(':').map(Number);
            const adhanMinutes = hours * 60 + minutes;

            // Find matching time slots (1-hour block starting from adhan time)
            container.querySelectorAll('.time-slot').forEach(slot => {
                const taskInput = slot.querySelector('.time-slot-task');
                if (!taskInput) return;

                const key = taskInput.dataset.key;
                if (!key) return;

                // Parse slot time from key: timeblock-engine-{h}-{m}
                const parts = key.split('-');
                const slotH = parseInt(parts[2]);
                const slotM = parseInt(parts[3]);
                const slotMinutes = slotH * 60 + slotM;

                if (slotMinutes >= adhanMinutes && slotMinutes < adhanMinutes + 60) {
                    slot.classList.add('prayer-window');
                    const scopedKey = datePrefix + key;
                    const taskValue = data[scopedKey];
                    if (!taskValue || taskValue === prayerNames[prayer]) {
                        taskInput.value = prayerNames[prayer];
                        saveField(scopedKey, prayerNames[prayer]);
                    }
                }
            });
        });
    }

    // ===== CALENDAR =====
    function initCalendar() {
        renderCalendar();
        renderMonthlyCalendar(); // Render enhanced monthly calendar
        document.getElementById('monthPrev').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderCalendar();
            renderMonthlyCalendar();
            initHabitMatrix();
            loadAllData();
        });
        document.getElementById('monthNext').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            renderCalendar();
            renderMonthlyCalendar();
            initHabitMatrix();
            loadAllData();
        });
    }

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        if (!grid) return; // Skip if not on monthly page

        const label = document.getElementById('monthLabel');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        if (label) label.textContent = monthNames[currentMonth] + ' ' + currentYear;

        const headers = grid.querySelectorAll('.cal-header');
        grid.innerHTML = '';
        headers.forEach(h => grid.appendChild(h));

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'cal-day empty';
            grid.appendChild(empty);
        }

        // Get fasting preferences
        const fastMon = getSettingVal('fastMon', true);
        const fastThu = getSettingVal('fastThu', true);

        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            const dayOfWeek = date.getDay();
            const hijriDay = getHijriDay(date);
            const cell = document.createElement('div');
            cell.className = 'cal-day';

            if ((fastMon && dayOfWeek === 1) || (fastThu && dayOfWeek === 4)) cell.classList.add('fasting');
            if (dayOfWeek === 5) cell.classList.add('jumuah');
            if (hijriDay >= 13 && hijriDay <= 15) cell.classList.add('white-day');

            const noteKey = 'cal-' + currentYear + '-' + currentMonth + '-' + d;
            cell.innerHTML = '<div class="cal-day-num">' + d + '</div>' +
                '<div class="cal-day-hijri">' + (getHijriDate(date).split(',')[0] || '') + '</div>' +
                '<textarea class="cal-day-note" data-key="' + noteKey + '" placeholder="..."></textarea>';
            grid.appendChild(cell);
        }

        const data = loadData();
        grid.querySelectorAll('.cal-day-note').forEach(ta => {
            const key = ta.dataset.key;
            if (data[key]) ta.value = data[key];
            ta.addEventListener('input', () => { saveField(key, ta.value); });
        });
    }

    // ===== ENHANCED MONTHLY CALENDAR =====
    function renderMonthlyCalendar() {
        const grid = document.getElementById('monthlyCalendarGrid');
        if (!grid) return; // Skip if on habit matrix page

        const label = document.getElementById('monthLabel');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        if (label) label.textContent = monthNames[currentMonth] + ' ' + currentYear;

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        // Get tracked events
        const trackedEvents = getYearlyEvents().filter(e => e.tracked);

        // Get fasting preferences
        const fastMon = getSettingVal('fastMon', true);
        const fastThu = getSettingVal('fastThu', true);
        const weekendDays = getSettingVal('weekendDays', [6, 0]);

        grid.innerHTML = '';

        // Empty cells for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'monthly-cal-cell empty';
            grid.appendChild(empty);
        }

        // Create day cells
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(currentYear, currentMonth, d);
            const dayOfWeek = date.getDay();
            const hijriDay = getHijriDay(date);
            const dateString = currentYear + '-' + String(currentMonth + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');

            const cell = document.createElement('div');
            cell.className = 'monthly-cal-cell';

            // Add special day classes
            if ((fastMon && dayOfWeek === 1) || (fastThu && dayOfWeek === 4)) cell.classList.add('fasting');
            if (dayOfWeek === 5) cell.classList.add('jumuah');
            if (weekendDays.includes(dayOfWeek)) cell.classList.add('weekend');
            if (hijriDay >= 13 && hijriDay <= 15) cell.classList.add('white-day');
            if (isCurrentMonth && d === today.getDate()) cell.classList.add('today');

            // Get events for this date
            const dayEvents = trackedEvents.filter(e => e.date === dateString);

            // Build events HTML
            let eventsHtml = '';
            if (dayEvents.length > 0) {
                eventsHtml = '<div class="monthly-cal-events">';
                dayEvents.forEach(evt => {
                    eventsHtml += '<span class="monthly-cal-event-dot category-' + evt.category + '" title="' + escapeHtml(evt.title) + '"></span>';
                });
                eventsHtml += '</div>';
            }

            const noteKey = 'monthly-note-' + dateString;

            cell.innerHTML = `
                <div class="monthly-cal-day-header-row">
                    <span class="monthly-cal-day-num">${d}</span>
                    <span class="monthly-cal-hijri">${getHijriDate(date).split(',')[0] || ''}</span>
                </div>
                ${eventsHtml}
                <textarea class="monthly-cal-note" data-key="${noteKey}" placeholder="Quick note..."></textarea>
            `;

            grid.appendChild(cell);
        }

        // Load saved notes and add event listeners
        const data = loadData();
        grid.querySelectorAll('.monthly-cal-note').forEach(ta => {
            const key = ta.dataset.key;
            if (data[key]) ta.value = data[key];
            ta.addEventListener('input', () => { saveField(key, ta.value); });
        });
    }

    // ===== DYNAMIC HABIT MATRIX =====
    function initHabitMatrix() {
        const container = document.getElementById('habitMatrix');
        if (!container) return;

        renderHabitMatrix();

        const addBtn = document.getElementById('btnAddHabit');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const habits = getHabitsData();
                habits.push({ name: '', days: new Array(31).fill(false) });
                saveHabitsData(habits);
                renderHabitMatrix();
            });
        }
    }

    function getMonthKey() {
        return currentYear + '-' + String(currentMonth + 1).padStart(2, '0');
    }

    function getHabitsData() {
        const data = loadData();
        const key = 'monthly-' + getMonthKey() + '-habits';
        try {
            return JSON.parse(data[key] || '[]');
        } catch { return []; }
    }

    function saveHabitsData(habits) {
        saveField('monthly-' + getMonthKey() + '-habits', JSON.stringify(habits));
    }

    function renderHabitMatrix() {
        const container = document.getElementById('habitMatrix');
        if (!container) return;

        let habits = getHabitsData();
        if (habits.length === 0) {
            habits = [
                { name: '', days: new Array(31).fill(false) },
                { name: '', days: new Array(31).fill(false) },
                { name: '', days: new Array(31).fill(false) }
            ];
            saveHabitsData(habits);
        }

        const today = new Date();
        const currentDay = (today.getFullYear() === currentYear && today.getMonth() === currentMonth) ? today.getDate() : 0;

        let html = '<table><thead><tr><th class="habit-name-cell">Habit</th>';
        for (let d = 1; d <= 31; d++) {
            html += '<th>' + d + '</th>';
        }
        html += '<th>Streak</th></tr></thead><tbody>';

        habits.forEach((habit, idx) => {
            const streak = calcStreak(habit.days, currentDay);
            const streakClass = streak >= 3 ? ' habit-streak-active' : '';
            html += '<tr><td class="habit-name-cell' + streakClass + '">' +
                '<input type="text" class="habit-name-input" data-habit-idx="' + idx + '" value="' + escapeHtml(habit.name) + '" placeholder="Habit ' + (idx + 1) + '">' +
                '<button class="habit-remove-btn" data-habit-idx="' + idx + '" title="Remove">&times;</button></td>';
            for (let d = 1; d <= 31; d++) {
                const checked = habit.days[d - 1] ? ' checked' : '';
                html += '<td><input type="checkbox" class="day-check" data-habit-idx="' + idx + '" data-day="' + (d - 1) + '"' + checked + '></td>';
            }
            html += '<td class="streak-badge">' + (streak > 0 ? streak + 'd' : '-') + '</td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;

        // Bind events via delegation
        container.removeEventListener('input', handleHabitInput);
        container.removeEventListener('change', handleHabitChange);
        container.removeEventListener('click', handleHabitClick);
        container.addEventListener('input', handleHabitInput);
        container.addEventListener('change', handleHabitChange);
        container.addEventListener('click', handleHabitClick);
    }

    function handleHabitInput(e) {
        if (e.target.classList.contains('habit-name-input')) {
            const idx = parseInt(e.target.dataset.habitIdx);
            const habits = getHabitsData();
            if (habits[idx]) {
                habits[idx].name = e.target.value;
                saveHabitsData(habits);
            }
        }
    }

    function handleHabitChange(e) {
        if (e.target.classList.contains('day-check') && e.target.dataset.habitIdx !== undefined) {
            const idx = parseInt(e.target.dataset.habitIdx);
            const day = parseInt(e.target.dataset.day);
            const habits = getHabitsData();
            if (habits[idx]) {
                habits[idx].days[day] = e.target.checked;
                saveHabitsData(habits);
                // Update streak display
                const today = new Date();
                const currentDay = (today.getFullYear() === currentYear && today.getMonth() === currentMonth) ? today.getDate() : 0;
                const streak = calcStreak(habits[idx].days, currentDay);
                const row = e.target.closest('tr');
                if (row) {
                    const streakCell = row.querySelector('.streak-badge');
                    if (streakCell) streakCell.textContent = streak > 0 ? streak + 'd' : '-';
                    const nameCell = row.querySelector('.habit-name-cell');
                    if (nameCell) {
                        nameCell.classList.toggle('habit-streak-active', streak >= 3);
                    }
                }
            }
        }
    }

    function handleHabitClick(e) {
        if (e.target.classList.contains('habit-remove-btn')) {
            const idx = parseInt(e.target.dataset.habitIdx);
            const habits = getHabitsData();
            if (habits.length <= 1) return;
            habits.splice(idx, 1);
            saveHabitsData(habits);
            renderHabitMatrix();
        }
    }

    function calcStreak(days, currentDay) {
        if (currentDay <= 0) return 0;
        let streak = 0;
        for (let d = currentDay - 1; d >= 0; d--) {
            if (days[d]) streak++;
            else break;
        }
        return streak;
    }

    // ===== TIME BLOCKS =====
    function initTimeBlocks() {
        const container = document.getElementById('timeBlockEngine');
        if (!container) return;

        let html = '';
        for (let h = 4; h <= 23; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                const ampm = h >= 12 ? 'PM' : 'AM';
                const timeStr = hour12 + ':' + (m === 0 ? '00' : '30') + ' ' + ampm;
                const key = 'timeblock-engine-' + h + '-' + m;
                const energyKey = 'energy-engine-' + h + '-' + m;

                html += '<div class="time-slot">' +
                    '<span class="time-slot-time">' + timeStr + '</span>' +
                    '<span class="time-slot-energy" data-key="' + energyKey + '" title="Click to toggle energy level">&#9675;</span>' +
                    '<input type="text" class="time-slot-task" data-key="' + key + '" placeholder="">' +
                    '</div>';
            }
        }
        container.innerHTML = html;

        // Helper to get date-scoped key for time blocks
        function tbKey(baseKey) {
            return 'daily-' + currentDailyDate + '-' + baseKey;
        }

        // Energy toggle
        container.querySelectorAll('.time-slot-energy').forEach(el => {
            el.addEventListener('click', () => {
                const states = ['&#9675;', '&#9650;', '&#9660;'];
                const labels = ['', 'High Energy', 'Low Energy'];
                let idx = parseInt(el.dataset.state || '0');
                idx = (idx + 1) % 3;
                el.dataset.state = idx;
                el.innerHTML = states[idx];
                el.title = labels[idx] || 'Click to toggle';
                saveField(tbKey(el.dataset.key), idx.toString());
            });
        });

        // Auto-save time block tasks
        container.addEventListener('input', (e) => {
            if (e.target.classList.contains('time-slot-task')) {
                saveField(tbKey(e.target.dataset.key), e.target.value);
            }
        });
    }

    function loadTimeBlocksForDate() {
        const data = loadData();
        const prefix = 'daily-' + currentDailyDate + '-';
        document.querySelectorAll('.time-slot-task').forEach(el => {
            el.value = data[prefix + el.dataset.key] || '';
        });
        const states = ['&#9675;', '&#9650;', '&#9660;'];
        document.querySelectorAll('.time-slot-energy').forEach(el => {
            const idx = parseInt(data[prefix + el.dataset.key] || '0');
            el.dataset.state = idx;
            el.innerHTML = states[idx] || states[0];
        });
    }

    function loadTimeBlockTasks() {
        loadTimeBlocksForDate();
    }

    function loadEnergyLevels() {
        loadTimeBlocksForDate();
    }

    // ===== WATER DROPS =====
    function initWaterDrops() {
        document.querySelectorAll('.water-drops').forEach(container => {
            container.querySelectorAll('.water-drop').forEach(drop => {
                drop.addEventListener('click', () => {
                    const idx = parseInt(drop.dataset.index);
                    const waterKey = dailyKey('water-count');
                    const data = loadData();
                    let current = parseInt(data[waterKey] || '0');

                    if (current === idx) {
                        current = idx - 1;
                    } else {
                        current = idx;
                    }

                    saveField(waterKey, current.toString());
                    updateWaterDisplay(container, current);
                });
            });
        });
    }

    function updateWaterDisplay(container, count) {
        container.querySelectorAll('.water-drop').forEach(drop => {
            const idx = parseInt(drop.dataset.index);
            drop.classList.toggle('filled', idx <= count);
        });
    }

    // ===== KANBAN =====
    function initKanban() {
        const input = document.getElementById('kanbanNewInput');
        if (!input) return;
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                addKanbanDoneItem(input.value.trim());
                input.value = '';
                e.preventDefault();
            }
        });
    }

    function addKanbanDoneItem(text, checked) {
        const list = document.getElementById('kanbanDoneList');
        if (!list) return;

        const item = document.createElement('div');
        item.className = 'kanban-done-item' + (checked ? ' checked' : '');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = !!checked;
        cb.addEventListener('change', () => {
            item.classList.toggle('checked', cb.checked);
            saveKanbanDone();
        });
        const span = document.createElement('span');
        span.textContent = text;
        const del = document.createElement('button');
        del.textContent = '\u00d7';
        del.className = 'btn-sm';
        del.style.cssText = 'padding:0 0.3rem;font-size:0.8rem;border:none;cursor:pointer;color:var(--muted);';
        del.addEventListener('click', () => {
            item.remove();
            saveKanbanDone();
        });

        item.appendChild(cb);
        item.appendChild(span);
        item.appendChild(del);
        list.appendChild(item);
        saveKanbanDone();
    }

    function saveKanbanDone() {
        const list = document.getElementById('kanbanDoneList');
        if (!list) return;
        const items = [];
        list.querySelectorAll('.kanban-done-item').forEach(item => {
            items.push({
                text: item.querySelector('span').textContent,
                checked: item.querySelector('input').checked
            });
        });
        saveField(dailyKey('kanban-done'), JSON.stringify(items));
    }

    function loadKanbanDone() {
        const list = document.getElementById('kanbanDoneList');
        if (!list) return;
        list.innerHTML = '';

        const data = loadData();
        const raw = data[dailyKey('kanban-done')];
        if (raw) {
            try {
                JSON.parse(raw).forEach(it => addKanbanDoneItem(it.text, it.checked));
            } catch { /* ignore */ }
        }
    }

    // ===== DYNAMIC LISTS =====
    function initDynamicLists() {
        // Deep Work
        const addDW = document.getElementById('btnAddDeepWork');
        if (addDW) {
            addDW.addEventListener('click', () => {
                const sessions = getDynamicData('deepwork-sessions');
                sessions.push({ start: '', end: '', task: '' });
                saveDynamicData('deepwork-sessions', sessions);
                renderDeepWork(sessions);
            });
        }

        // PT Actions
        const addPT = document.getElementById('btnAddPTAction');
        if (addPT) {
            addPT.addEventListener('click', () => {
                const actions = getDynamicData('pt-actions');
                actions.push({ text: '' });
                saveDynamicData('pt-actions', actions);
                renderPTActions(actions);
            });
        }

        // Meetings
        const addMeeting = document.getElementById('btnAddMeeting');
        if (addMeeting) {
            addMeeting.addEventListener('click', () => {
                const meetings = getDynamicData('meetings');
                meetings.push({ title: '', time: '', attendees: '', notes: '', actionItems: [] });
                saveDynamicData('meetings', meetings);
                renderMeetings(meetings);
            });
        }

        // Generic daily checklists
        initDailyChecklistBtn('btnAddLightWork', 'lightwork', 'lightWorkList', 'Task');
        initDailyChecklistBtn('btnAddHousehold', 'household', 'householdList', 'e.g., Fix sink');
        initDailyChecklistBtn('btnAddDailyGoal', 'daily-goals', 'dailyGoalsList', "Today's goal");
        initDailyChecklistBtn('btnAddGratitude', 'gratitude', 'gratitudeList', 'Alhamdulillah for...');
        initDailyChecklistBtn('btnAddTomorrow', 'tomorrow', 'tomorrowList', 'Priority');
    }

    // Generic daily dynamic checklist (checkbox + text + remove)
    function initDailyChecklistBtn(btnId, storageField, containerId, placeholder) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                const items = getDynamicData(storageField);
                items.push({ text: '', done: false });
                saveDynamicData(storageField, items);
                renderDailyChecklist(storageField, containerId, placeholder);
            });
        }
    }

    function loadDynamicDailyChecklist(storageField, containerId, defaultCount, placeholder) {
        let items = getDynamicData(storageField);
        if (items.length === 0) {
            items = Array.from({ length: defaultCount }, () => ({ text: '', done: false }));
            saveDynamicData(storageField, items);
        }
        renderDailyChecklist(storageField, containerId, placeholder);
    }

    function renderDailyChecklist(storageField, containerId, placeholder) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const items = getDynamicData(storageField);
        container.innerHTML = '';

        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'dynamic-item-check';
            div.innerHTML = '<input type="checkbox" data-dcl-field="' + storageField + '" data-dcl-idx="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-dcl-field="' + storageField + '" data-dcl-idx="' + idx + '" value="' + escapeHtml(item.text) + '" placeholder="' + (idx + 1) + '. ' + placeholder + '">' +
                '<button class="btn-remove" data-dcl-field="' + storageField + '" data-dcl-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getDynamicData(e.target.dataset.dclField);
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.dclIdx), 1);
                saveDynamicData(e.target.dataset.dclField, arr);
                renderDailyChecklist(e.target.dataset.dclField, containerId, placeholder);
            }
        };
        container.oninput = (e) => {
            if (e.target.type === 'text' && e.target.dataset.dclField) {
                const arr = getDynamicData(e.target.dataset.dclField);
                const i = parseInt(e.target.dataset.dclIdx);
                if (arr[i]) { arr[i].text = e.target.value; saveDynamicData(e.target.dataset.dclField, arr); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.dclField) {
                const arr = getDynamicData(e.target.dataset.dclField);
                const i = parseInt(e.target.dataset.dclIdx);
                if (arr[i]) { arr[i].done = e.target.checked; saveDynamicData(e.target.dataset.dclField, arr); }
            }
        };
    }

    function getDynamicData(field) {
        const data = loadData();
        try {
            return JSON.parse(data[dailyKey(field)] || '[]');
        } catch { return []; }
    }

    function saveDynamicData(field, arr) {
        saveField(dailyKey(field), JSON.stringify(arr));
    }

    // Deep Work
    function loadDynamicDeepWork() {
        let sessions = getDynamicData('deepwork-sessions');
        if (sessions.length === 0) {
            sessions = [{ start: '', end: '', task: '' }];
            saveDynamicData('deepwork-sessions', sessions);
        }
        renderDeepWork(sessions);
    }

    function renderDeepWork(sessions) {
        const container = document.getElementById('deepWorkList');
        if (!container) return;
        container.innerHTML = '';

        sessions.forEach((s, idx) => {
            const item = document.createElement('div');
            item.className = 'dynamic-item dw-session';
            item.innerHTML = '<label>Session ' + (idx + 1) + ':</label>' +
                '<input type="time" class="field-input-sm" data-dw-idx="' + idx + '" data-dw-field="start" value="' + (s.start || '') + '"> to ' +
                '<input type="time" class="field-input-sm" data-dw-idx="' + idx + '" data-dw-field="end" value="' + (s.end || '') + '">' +
                '<input type="text" class="field-input" data-dw-idx="' + idx + '" data-dw-field="task" value="' + escapeHtml(s.task || '') + '" placeholder="Task" style="flex:1">' +
                '<button class="btn-remove" data-dw-idx="' + idx + '">&times;</button>';
            container.appendChild(item);
        });

        // Event delegation
        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const idx = parseInt(e.target.dataset.dwIdx);
                const arr = getDynamicData('deepwork-sessions');
                if (arr.length <= 1) return;
                arr.splice(idx, 1);
                saveDynamicData('deepwork-sessions', arr);
                renderDeepWork(arr);
            }
        };
        container.oninput = (e) => {
            const idx = parseInt(e.target.dataset.dwIdx);
            const field = e.target.dataset.dwField;
            if (idx === undefined || !field) return;
            const arr = getDynamicData('deepwork-sessions');
            if (arr[idx]) {
                arr[idx][field] = e.target.value;
                saveDynamicData('deepwork-sessions', arr);
            }
        };
    }

    // PT Actions
    function loadDynamicPTActions() {
        let actions = getDynamicData('pt-actions');
        if (actions.length === 0) {
            actions = [{ text: '' }, { text: '' }, { text: '' }];
            saveDynamicData('pt-actions', actions);
        }
        renderPTActions(actions);
    }

    function renderPTActions(actions) {
        const container = document.getElementById('ptActionsList');
        if (!container) return;
        container.innerHTML = '';

        actions.forEach((a, idx) => {
            const item = document.createElement('div');
            item.className = 'dynamic-item';
            const isChecked = a.checked ? 'checked' : '';
            item.innerHTML = '<input type="checkbox" data-pt-check="' + idx + '" ' + isChecked + '>' +
                '<input type="text" class="field-input" data-pt-idx="' + idx + '" value="' + escapeHtml(a.text || '') + '" placeholder="' + (idx + 1) + '. Action">' +
                '<button class="btn-remove" data-pt-idx="' + idx + '">&times;</button>';
            container.appendChild(item);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const idx = parseInt(e.target.dataset.ptIdx);
                const arr = getDynamicData('pt-actions');
                if (arr.length <= 1) return;
                arr.splice(idx, 1);
                saveDynamicData('pt-actions', arr);
                renderPTActions(arr);
            }
        };
        container.onchange = (e) => {
            if (e.target.dataset.ptCheck !== undefined) {
                const idx = parseInt(e.target.dataset.ptCheck);
                const arr = getDynamicData('pt-actions');
                if (arr[idx]) {
                    arr[idx].checked = e.target.checked;
                    saveDynamicData('pt-actions', arr);
                }
            }
        };
        container.oninput = (e) => {
            if (e.target.dataset.ptIdx !== undefined) {
                const idx = parseInt(e.target.dataset.ptIdx);
                const arr = getDynamicData('pt-actions');
                if (arr[idx]) {
                    arr[idx].text = e.target.value;
                    saveDynamicData('pt-actions', arr);
                }
            }
        };
    }

    // Meetings
    function loadDynamicMeetings() {
        let meetings = getDynamicData('meetings');
        if (meetings.length === 0) {
            meetings = [];
            saveDynamicData('meetings', meetings);
        }
        renderMeetings(meetings);
    }

    function renderMeetings(meetings) {
        const container = document.getElementById('meetingsList');
        if (!container) return;
        container.innerHTML = '';

        meetings.forEach((m, idx) => {
            const item = document.createElement('div');
            item.className = 'meeting-item';

            const actionItemsHtml = (m.actionItems || []).map((ai, aiIdx) => {
                return '<div class="meeting-action-item">' +
                    '<input type="checkbox" data-mtg-idx="' + idx + '" data-ai-idx="' + aiIdx + '" data-ai-field="done"' + (ai.done ? ' checked' : '') + '>' +
                    '<input type="text" class="field-input" data-mtg-idx="' + idx + '" data-ai-idx="' + aiIdx + '" data-ai-field="text" value="' + escapeHtml(ai.text || '') + '" placeholder="Action item">' +
                    '<button class="btn-remove" data-mtg-idx="' + idx + '" data-ai-idx="' + aiIdx + '" data-ai-remove="1">&times;</button></div>';
            }).join('');

            item.innerHTML = '<div class="meeting-item-header">' +
                '<input type="text" data-mtg-idx="' + idx + '" data-mtg-field="title" value="' + escapeHtml(m.title || '') + '" placeholder="Meeting title">' +
                '<input type="time" class="field-input-sm" data-mtg-idx="' + idx + '" data-mtg-field="time" value="' + (m.time || '') + '">' +
                '<button class="meeting-toggle" data-mtg-idx="' + idx + '">&#9660;</button>' +
                '<button class="btn-remove" data-mtg-remove="' + idx + '">&times;</button></div>' +
                '<div class="meeting-item-body" id="meetingBody' + idx + '">' +
                '<label class="field-label">Attendees</label>' +
                '<input type="text" class="field-input" data-mtg-idx="' + idx + '" data-mtg-field="attendees" value="' + escapeHtml(m.attendees || '') + '" placeholder="Names...">' +
                '<label class="field-label">Notes</label>' +
                '<textarea class="field-textarea" data-mtg-idx="' + idx + '" data-mtg-field="notes" rows="3" placeholder="Discussion notes...">' + escapeHtml(m.notes || '') + '</textarea>' +
                '<label class="field-label">Action Items</label>' +
                '<div class="meeting-actions-list" data-mtg-actions="' + idx + '">' + actionItemsHtml + '</div>' +
                '<button class="btn-sm" data-add-action="' + idx + '">+ Action Item</button></div>';

            container.appendChild(item);
        });

        // Event delegation
        container.onclick = (e) => {
            // Toggle meeting expand
            if (e.target.classList.contains('meeting-toggle')) {
                const idx = e.target.dataset.mtgIdx;
                const body = document.getElementById('meetingBody' + idx);
                if (body) body.classList.toggle('expanded');
                return;
            }
            // Remove meeting
            if (e.target.dataset.mtgRemove !== undefined) {
                const idx = parseInt(e.target.dataset.mtgRemove);
                const arr = getDynamicData('meetings');
                arr.splice(idx, 1);
                saveDynamicData('meetings', arr);
                renderMeetings(arr);
                return;
            }
            // Remove action item
            if (e.target.dataset.aiRemove) {
                const mtgIdx = parseInt(e.target.dataset.mtgIdx);
                const aiIdx = parseInt(e.target.dataset.aiIdx);
                const arr = getDynamicData('meetings');
                if (arr[mtgIdx] && arr[mtgIdx].actionItems) {
                    arr[mtgIdx].actionItems.splice(aiIdx, 1);
                    saveDynamicData('meetings', arr);
                    renderMeetings(arr);
                }
                return;
            }
            // Add action item
            if (e.target.dataset.addAction !== undefined) {
                const mtgIdx = parseInt(e.target.dataset.addAction);
                const arr = getDynamicData('meetings');
                if (arr[mtgIdx]) {
                    if (!arr[mtgIdx].actionItems) arr[mtgIdx].actionItems = [];
                    arr[mtgIdx].actionItems.push({ text: '', done: false });
                    saveDynamicData('meetings', arr);
                    renderMeetings(arr);
                    // Auto-expand
                    const body = document.getElementById('meetingBody' + mtgIdx);
                    if (body) body.classList.add('expanded');
                }
            }
        };

        container.oninput = (e) => {
            const el = e.target;
            const mtgIdx = parseInt(el.dataset.mtgIdx);
            if (isNaN(mtgIdx)) return;
            const arr = getDynamicData('meetings');

            // Meeting field
            if (el.dataset.mtgField) {
                if (arr[mtgIdx]) {
                    arr[mtgIdx][el.dataset.mtgField] = el.value;
                    saveDynamicData('meetings', arr);
                }
                return;
            }

            // Action item field
            if (el.dataset.aiField) {
                const aiIdx = parseInt(el.dataset.aiIdx);
                if (arr[mtgIdx] && arr[mtgIdx].actionItems && arr[mtgIdx].actionItems[aiIdx]) {
                    arr[mtgIdx].actionItems[aiIdx][el.dataset.aiField] = el.value;
                    saveDynamicData('meetings', arr);
                }
            }
        };

        container.onchange = (e) => {
            const el = e.target;
            if (el.type === 'checkbox' && el.dataset.aiField === 'done') {
                const mtgIdx = parseInt(el.dataset.mtgIdx);
                const aiIdx = parseInt(el.dataset.aiIdx);
                const arr = getDynamicData('meetings');
                if (arr[mtgIdx] && arr[mtgIdx].actionItems && arr[mtgIdx].actionItems[aiIdx]) {
                    arr[mtgIdx].actionItems[aiIdx].done = el.checked;
                    saveDynamicData('meetings', arr);
                }
            }
        };
    }

    // ===== ISTIGHFAR COUNTERS =====
    function initIstighfarCounters() {
        const mainBtn = document.getElementById('istighfarBtn');
        const reviewBtn = document.getElementById('istighfarReviewBtn');

        if (mainBtn) {
            mainBtn.addEventListener('click', function () {
                let count = parseInt(this.textContent) || 0;
                count++;
                this.textContent = count;
                saveDailyField('istighfar-count', count.toString());
                // Sync with review counter
                if (reviewBtn) reviewBtn.textContent = count;
            });
        }

        if (reviewBtn) {
            reviewBtn.addEventListener('click', function () {
                let count = parseInt(this.textContent) || 0;
                count++;
                this.textContent = count;
                saveDailyField('istighfar-count', count.toString());
                // Sync with main counter
                if (mainBtn) mainBtn.textContent = count;
            });
        }
    }

    // ===== REVENUE TRACKING =====
    function initRevenueTracking() {
        const startEl = document.querySelector('[data-field="pt-start"]');
        const endEl = document.querySelector('[data-field="pt-end"]');
        const rateEl = document.querySelector('[data-field="pt-rate"]');

        [startEl, endEl, rateEl].forEach(el => {
            if (el) {
                el.addEventListener('change', updateRevenueDisplay);
                el.addEventListener('input', updateRevenueDisplay);
            }
        });
    }

    function updateRevenueDisplay() {
        const startEl = document.querySelector('[data-field="pt-start"]');
        const endEl = document.querySelector('[data-field="pt-end"]');
        const rateEl = document.querySelector('[data-field="pt-rate"]');
        const hoursDisplay = document.getElementById('ptHoursDisplay');
        const revenueDisplay = document.getElementById('ptRevenueDisplay');

        if (!startEl || !endEl || !hoursDisplay || !revenueDisplay) return;

        let hours = 0;
        if (startEl.value && endEl.value) {
            const [sh, sm] = startEl.value.split(':').map(Number);
            const [eh, em] = endEl.value.split(':').map(Number);
            hours = (eh * 60 + em - sh * 60 - sm) / 60;
            if (hours < 0) hours += 24;
        }

        hoursDisplay.textContent = hours.toFixed(1);

        const rate = parseFloat(rateEl ? rateEl.value : 0) || 0;
        revenueDisplay.textContent = (hours * rate).toFixed(2);
    }

    // ===== RICH TEXT EDITOR =====
    function initRichTextEditor() {
        const toolbar = document.getElementById('richTextToolbar');
        const editor = document.getElementById('richTextEditor');
        const resizeHandle = document.getElementById('richTextResize');

        if (!toolbar || !editor) return;

        // Placeholder handling
        const placeholder = editor.getAttribute('placeholder');
        if (placeholder && !editor.innerHTML) {
            editor.innerHTML = '<span style="color:#999;">' + placeholder + '</span>';
        }

        editor.addEventListener('focus', function() {
            if (this.innerHTML.includes('style="color:#999;"')) {
                this.innerHTML = '';
            }
        });

        editor.addEventListener('blur', function() {
            if (!this.innerHTML.trim()) {
                this.innerHTML = '<span style="color:#999;">' + placeholder + '</span>';
            }
        });

        // Toolbar buttons
        toolbar.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = btn.dataset.cmd;
                const val = btn.dataset.value || null;
                document.execCommand(cmd, false, val);
                editor.focus();
            });
        });

        // Debounced auto-save
        let saveTimer;
        editor.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                const content = editor.innerHTML.includes('style="color:#999;"') ? '' : editor.innerHTML;
                saveDailyField('rich-notes', content);
            }, 500);
        });

        // Resize handle
        if (resizeHandle) {
            let startY, startH;
            const onMouseMove = (e) => {
                const newH = startH + (e.clientY - startY);
                if (newH >= 80 && newH <= 600) {
                    editor.style.minHeight = newH + 'px';
                }
            };
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            resizeHandle.addEventListener('mousedown', (e) => {
                startY = e.clientY;
                startH = editor.offsetHeight;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }
    }

    // ===== GOALS CASCADE =====
    function refreshGoalsCascade() {
        const data = loadData();
        const yearlyEl = document.getElementById('cascadeYearly');
        const monthlyEl = document.getElementById('cascadeMonthly');
        const weeklyEl = document.getElementById('cascadeWeekly');

        if (!yearlyEl || !monthlyEl || !weeklyEl) return;

        // Yearly goals
        const yearlyKeys = [
            ['yearly-deen-hifdh', 'Hifdh'],
            ['yearly-deen-knowledge', 'Knowledge'],
            ['yearly-deen-spiritual', 'Spiritual'],
            ['yearly-dunya-ft', 'Full-Time'],
            ['yearly-dunya-pt', 'Part-Time'],
            ['yearly-dunya-skill', 'Skill'],
            ['yearly-dunya-finance', 'Financial'],
            ['yearly-family-vacation', 'Family Trip'],
            ['yearly-health-weight', 'Fitness'],
            ['yearly-health-habit', 'Habit']
        ];
        yearlyEl.innerHTML = yearlyKeys
            .filter(([k]) => data[k])
            .map(([k, label]) => '<div class="cascade-item"><strong>' + label + ':</strong> ' + escapeHtml(data[k]) + '</div>')
            .join('') || '<div style="color:var(--light);font-style:italic;">No yearly goals set</div>';

        // Monthly goals
        const monthlyItems = [];
        if (data['monthly-finance-ft']) monthlyItems.push('FT Income: ' + data['monthly-finance-ft']);
        if (data['monthly-finance-pt']) monthlyItems.push('PT Income: ' + data['monthly-finance-pt']);
        const habits = getHabitsData();
        habits.forEach(h => {
            if (h.name) monthlyItems.push('Habit: ' + h.name);
        });
        monthlyEl.innerHTML = monthlyItems.length > 0
            ? monthlyItems.map(i => '<div class="cascade-item">' + escapeHtml(i) + '</div>').join('')
            : '<div style="color:var(--light);font-style:italic;">No monthly data</div>';

        // Weekly priorities (from dynamic list)
        const weeklyItems = [];
        const wpKey = 'weekly-' + getWeekKey() + '-priorities';
        try {
            const wpArr = JSON.parse(data[wpKey] || '[]');
            wpArr.forEach(item => { if (item.text) weeklyItems.push(item.text); });
        } catch {}
        // Fallback: try old static keys
        if (weeklyItems.length === 0) {
            for (let i = 1; i <= 3; i++) {
                const v = data['weekly-priority-' + i];
                if (v) weeklyItems.push(v);
            }
        }
        weeklyEl.innerHTML = weeklyItems.length > 0
            ? weeklyItems.map(i => '<div class="cascade-item">' + escapeHtml(i) + '</div>').join('')
            : '<div style="color:var(--light);font-style:italic;">No weekly priorities set</div>';
    }

    // ===== DOT GRID CANVAS =====
    function initDotGridCanvas() {
        const canvas = document.getElementById('drawingCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let drawing = false;
        let lastX = 0, lastY = 0;

        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width || 700;
        canvas.height = 900;

        drawDotGrid(ctx, canvas.width, canvas.height);

        const data = loadData();
        if (data['canvas-drawing']) {
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0);
            img.src = data['canvas-drawing'];
        }

        canvas.addEventListener('mousedown', (e) => {
            drawing = true;
            [lastX, lastY] = getCanvasCoords(e, canvas);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (!drawing) return;
            const [x, y] = getCanvasCoords(e, canvas);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = document.getElementById('canvasColor').value;
            ctx.lineWidth = parseInt(document.getElementById('canvasSize').value);
            ctx.lineCap = 'round';
            ctx.stroke();
            [lastX, lastY] = [x, y];
        });
        canvas.addEventListener('mouseup', () => {
            drawing = false;
            saveField('canvas-drawing', canvas.toDataURL());
        });
        canvas.addEventListener('mouseleave', () => {
            if (drawing) {
                drawing = false;
                saveField('canvas-drawing', canvas.toDataURL());
            }
        });

        // Touch support
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            drawing = true;
            [lastX, lastY] = getCanvasCoords(e.touches[0], canvas);
        });
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!drawing) return;
            const [x, y] = getCanvasCoords(e.touches[0], canvas);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = document.getElementById('canvasColor').value;
            ctx.lineWidth = parseInt(document.getElementById('canvasSize').value);
            ctx.lineCap = 'round';
            ctx.stroke();
            [lastX, lastY] = [x, y];
        });
        canvas.addEventListener('touchend', () => {
            drawing = false;
            saveField('canvas-drawing', canvas.toDataURL());
        });

        const clearBtn = document.getElementById('canvasClear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawDotGrid(ctx, canvas.width, canvas.height);
                saveField('canvas-drawing', '');
            });
        }
    }

    function getCanvasCoords(e, canvas) {
        const rect = canvas.getBoundingClientRect();
        return [
            (e.clientX - rect.left) * (canvas.width / rect.width),
            (e.clientY - rect.top) * (canvas.height / rect.height)
        ];
    }

    function drawDotGrid(ctx, w, h) {
        ctx.fillStyle = '#ccc';
        for (let x = 20; x < w; x += 20) {
            for (let y = 20; y < h; y += 20) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // ===== QADHA TRACKER =====
    function initQadhaTracker() {
        renderQadhaGrid();
        const calcBtn = document.getElementById('qadhaCalculate');
        if (calcBtn) {
            calcBtn.addEventListener('click', () => {
                const missed = parseInt(document.getElementById('qadhaMissedYears').value) || 0;
                const totalDays = missed * 365;
                const result = document.getElementById('qadhaResult');
                result.innerHTML = '<strong>Estimated Qadha Prayers:</strong><br>' +
                    'Fajr: ' + totalDays + ' | Dhuhr: ' + totalDays + ' | Asr: ' + totalDays + ' | Maghrib: ' + totalDays + ' | Isha: ' + totalDays + ' | Witr: ' + totalDays + '<br>' +
                    '<strong>Total: ' + (totalDays * 6) + ' prayers</strong><br>' +
                    '<em>If you pray 1 qadha per salah daily, it will take ~' + missed + ' years to complete.</em><br>' +
                    '<em>If you pray 2 qadha per salah daily, it will take ~' + Math.ceil(missed / 2) + ' years.</em>';
                result.classList.add('visible');
            });
        }
    }

    function renderQadhaGrid() {
        const grid = document.getElementById('qadhaGrid');
        if (!grid) return;

        const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Witr'];
        let html = '<table><thead><tr><th class="row-num">#</th>';
        prayers.forEach(p => { html += '<th>' + p + '</th>'; });
        html += '</tr></thead><tbody>';

        for (let r = 1; r <= 30; r++) {
            html += '<tr><td class="row-num">' + r + '</td>';
            prayers.forEach(p => {
                const key = 'qadha-' + r + '-' + p.toLowerCase();
                html += '<td><input type="checkbox" class="day-check qadha-check" data-key="' + key + '" data-prayer="' + p.toLowerCase() + '"></td>';
            });
            html += '</tr>';
        }
        html += '</tbody></table>';
        grid.innerHTML = html;

        grid.querySelectorAll('.qadha-check').forEach(cb => {
            cb.addEventListener('change', () => {
                saveField(cb.dataset.key, cb.checked ? '1' : '');
                updateQadhaCounts();
            });
        });
    }

    function updateQadhaCounts() {
        ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'witr'].forEach(p => {
            const count = document.querySelectorAll('.qadha-check[data-prayer="' + p + '"]:checked').length;
            const el = document.getElementById('qadha' + p.charAt(0).toUpperCase() + p.slice(1) + 'Count');
            if (el) el.textContent = count;
        });
    }

    // ===== DATA PERSISTENCE =====
    function loadData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        } catch { return {}; }
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function saveField(key, value) {
        const data = loadData();
        data[key] = value;
        saveData(data);
    }

    function loadAllData() {
        const data = loadData();

        // Static data-key elements (non-daily, exclude date-scoped time blocks)
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.dataset.key;
            if (key.startsWith('timeblock-engine-') || key.startsWith('energy-engine-')) return;
            if (!(key in data)) return;

            if (el.type === 'checkbox') {
                el.checked = data[key] === '1' || data[key] === true;
            } else if (el.type === 'radio') {
                el.checked = (data[key] === el.value);
            } else if (el.tagName === 'SELECT') {
                el.value = data[key] || '';
            } else {
                el.value = data[key] || '';
            }
        });

        // Load daily data
        loadDailyData();

        // Qadha counts
        updateQadhaCounts();

        // Goals cascade
        refreshGoalsCascade();
    }

    function bindAutoSave() {
        // Static data-key auto save
        document.addEventListener('input', (e) => {
            const el = e.target;

            // Static data-key fields
            if (el.dataset && el.dataset.key) {
                if (el.type === 'checkbox') {
                    saveField(el.dataset.key, el.checked ? '1' : '');
                } else if (el.type === 'radio') {
                    if (el.checked) saveField(el.dataset.key, el.value);
                } else {
                    saveField(el.dataset.key, el.value);
                }
                return;
            }

            // Daily fields
            if (el.classList && el.classList.contains('daily-field') && el.dataset.field) {
                if (el.type === 'checkbox') {
                    saveDailyField(el.dataset.field, el.checked ? '1' : '');
                } else if (el.type === 'radio') {
                    if (el.checked) saveDailyField(el.dataset.field, el.value);
                } else if (el.tagName !== 'BUTTON') {
                    saveDailyField(el.dataset.field, el.value);
                }
            }
        });

        document.addEventListener('change', (e) => {
            const el = e.target;

            if (el.dataset && el.dataset.key) {
                if (el.type === 'checkbox') {
                    saveField(el.dataset.key, el.checked ? '1' : '');
                } else if (el.type === 'radio') {
                    if (el.checked) saveField(el.dataset.key, el.value);
                } else if (el.tagName === 'SELECT') {
                    saveField(el.dataset.key, el.value);
                } else {
                    saveField(el.dataset.key, el.value);
                }
                return;
            }

            if (el.classList && el.classList.contains('daily-field') && el.dataset.field) {
                if (el.type === 'checkbox') {
                    saveDailyField(el.dataset.field, el.checked ? '1' : '');
                } else if (el.type === 'radio') {
                    if (el.checked) saveDailyField(el.dataset.field, el.value);
                } else if (el.tagName === 'SELECT') {
                    saveDailyField(el.dataset.field, el.value);
                } else {
                    saveDailyField(el.dataset.field, el.value);
                }

                // Re-sync adhan times on change
                if (el.classList.contains('adhan-time')) {
                    // Mark as manually edited so auto-fill won't overwrite
                    saveDailyField(el.dataset.field + '-edited', '1');
                    syncAdhanToTimeBlocks();
                }

                // Mark salah time as manually edited
                if (el.classList.contains('salah-time')) {
                    saveDailyField(el.dataset.field + '-edited', '1');
                }
            }
        });
    }

    // ===== RESET =====
    function bindResetButton() {
        const resetBtn = document.getElementById('btnResetAll');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (!confirm('Clear all fields on the current page? Data will be lost.')) return;

                const activePage = document.querySelector('.page.active');
                if (!activePage) return;

                const data = loadData();

                // Reset static data-key elements
                activePage.querySelectorAll('[data-key]').forEach(el => {
                    const key = el.dataset.key;
                    if (el.type === 'checkbox' || el.type === 'radio') {
                        el.checked = false;
                    } else {
                        el.value = '';
                    }
                    delete data[key];
                });

                // Reset daily-field elements (if on daily engine)
                if (activePage.id === 'page-daily-engine') {
                    const prefix = 'daily-' + currentDailyDate + '-';
                    Object.keys(data).forEach(k => {
                        if (k.startsWith(prefix)) delete data[k];
                    });

                    activePage.querySelectorAll('.daily-field').forEach(el => {
                        if (el.type === 'checkbox' || el.type === 'radio') {
                            el.checked = false;
                        } else if (el.tagName === 'BUTTON') {
                            el.textContent = '0';
                        } else {
                            el.value = '';
                        }
                    });

                    // Reset rich text editor
                    const editor = document.getElementById('richTextEditor');
                    if (editor) editor.innerHTML = '';

                    // Reset kanban done
                    const doneList = document.getElementById('kanbanDoneList');
                    if (doneList) doneList.innerHTML = '';

                    // Re-render dynamic lists
                    loadDynamicDeepWork();
                    loadDynamicPTActions();
                    loadDynamicMeetings();
                    loadDynamicDailyChecklist('lightwork', 'lightWorkList', 3, 'Task');
                    loadDynamicDailyChecklist('household', 'householdList', 3, 'e.g., Fix sink');
                    loadDynamicDailyChecklist('daily-goals', 'dailyGoalsList', 3, "Today's goal");
                    loadDynamicDailyChecklist('gratitude', 'gratitudeList', 3, 'Alhamdulillah for...');
                    loadDynamicDailyChecklist('tomorrow', 'tomorrowList', 3, 'Priority');
                }

                // Reset water drops
                activePage.querySelectorAll('.water-drops').forEach(container => {
                    updateWaterDisplay(container, 0);
                });

                // Reset energy icons
                activePage.querySelectorAll('.time-slot-energy').forEach(el => {
                    el.innerHTML = '&#9675;';
                    el.dataset.state = '0';
                });

                // Reset weekly-scoped fields and dynamic lists
                if (activePage.id === 'page-weekly') {
                    const weekPrefix = 'weekly-' + getWeekKey() + '-';
                    Object.keys(data).forEach(k => {
                        if (k.startsWith(weekPrefix)) delete data[k];
                    });
                    activePage.querySelectorAll('.weekly-scoped').forEach(el => {
                        if (el.type === 'checkbox') el.checked = false;
                        else el.value = '';
                    });
                }

                // Reset monthly not-to-do dynamic list
                if (activePage.id === 'page-monthly') {
                    delete data['monthly-' + getMonthKey() + '-nottodo'];
                }

                saveData(data);

                // Re-render dynamic lists after data reset
                if (activePage.id === 'page-weekly') {
                    loadWeeklyPageData();
                }
                if (activePage.id === 'page-monthly') {
                    renderNotTodoList();
                }
            });
        }
    }

    // ===== PRINT =====
    function bindPrintButton() {
        const printBtn = document.getElementById('btnPrint');
        if (printBtn) {
            printBtn.addEventListener('click', () => { window.print(); });
        }
    }

    // ===== AUTH (Mock localStorage-based) =====
    function initAuth() {
        renderAuth();

        // Check if user is authenticated
        const user = getAuthUser();
        if (!user) {
            // Show initial auth screen
            showInitialAuthScreen();
        } else {
            // User is authenticated, show content
            showContent();
        }
    }

    function getAuthUser() {
        try {
            return JSON.parse(localStorage.getItem('bb-auth'));
        } catch { return null; }
    }

    function showInitialAuthScreen() {
        // Create a full-screen auth overlay
        const overlay = document.createElement('div');
        overlay.id = 'initialAuthOverlay';
        overlay.className = 'auth-initial-overlay';
        overlay.innerHTML =
            '<div class="auth-initial-container">' +
                '<div class="auth-initial-logo">BP</div>' +
                '<h1 class="auth-initial-title">Barakah Planner</h1>' +
                '<p class="auth-initial-subtitle">The Ultimate Islamic Professional Planner</p>' +
                '<div class="auth-initial-tabs">' +
                    '<button class="auth-tab active" data-mode="login">Login</button>' +
                    '<button class="auth-tab" data-mode="register">Register</button>' +
                '</div>' +
                '<form id="initialAuthForm" class="auth-initial-form">' +
                    '<div class="auth-form-group">' +
                        '<label class="field-label">Username</label>' +
                        '<input type="text" class="field-input" id="authUsername" placeholder="Enter username" autocomplete="username" required>' +
                    '</div>' +
                    '<div class="auth-form-group">' +
                        '<label class="field-label">Password</label>' +
                        '<input type="password" class="field-input" id="authPassword" placeholder="Enter password" autocomplete="' + (overlay.querySelector('.auth-tab.active')?.dataset.mode === 'register' ? 'new-password' : 'current-password') + '" required>' +
                    '</div>' +
                    '<div class="auth-error" id="authError"></div>' +
                    '<button type="submit" class="auth-submit-btn" id="authSubmit">Login</button>' +
                '</form>' +
                '<p class="auth-initial-hint">Enter your credentials to access your planner</p>' +
            '</div>';

        document.body.appendChild(overlay);

        // Prevent any interaction with the background
        document.body.classList.add('auth-locked');

        const form = overlay.querySelector('#initialAuthForm');
        const usernameInput = overlay.querySelector('#authUsername');
        const passwordInput = overlay.querySelector('#authPassword');
        const errorEl = overlay.querySelector('#authError');
        const submitBtn = overlay.querySelector('#authSubmit');
        const tabs = overlay.querySelectorAll('.auth-tab');

        let currentMode = 'login';

        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentMode = tab.dataset.mode;
                submitBtn.textContent = currentMode === 'login' ? 'Login' : 'Register';
                passwordInput.placeholder = currentMode === 'login' ? 'Enter password' : 'Create a password';
                passwordInput.setAttribute('autocomplete', currentMode === 'login' ? 'current-password' : 'new-password');
                errorEl.style.display = 'none';
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            if (!username || !password) {
                errorEl.textContent = 'Please fill in all fields.';
                errorEl.style.display = 'block';
                return;
            }

            if (currentMode === 'register') {
                // Registration
                const existing = localStorage.getItem('bb-user-' + username);
                if (existing) {
                    errorEl.textContent = 'Username already exists. Please choose another or login.';
                    errorEl.style.display = 'block';
                    return;
                }
                localStorage.setItem('bb-user-' + username, password);
                localStorage.setItem('bb-auth', JSON.stringify({ username: username }));
                onAuthSuccess();
            } else {
                // Login
                const stored = localStorage.getItem('bb-user-' + username);
                if (stored !== password) {
                    errorEl.textContent = 'Invalid username or password. If you\'re new, please register first.';
                    errorEl.style.display = 'block';
                    return;
                }
                localStorage.setItem('bb-auth', JSON.stringify({ username: username }));
                onAuthSuccess();
            }
        });

        function onAuthSuccess() {
            document.body.classList.remove('auth-locked');
            overlay.remove();
            renderAuth();
            showContent();
        }
    }

    function showContent() {
        // Show the main content area
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.visibility = 'visible';
            mainContent.style.pointerEvents = 'auto';
        }
    }

    function hideContent() {
        // Hide the main content area
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.visibility = 'hidden';
            mainContent.style.pointerEvents = 'none';
        }
    }

    function renderAuth() {
        const container = document.getElementById('sidebarAuth');
        if (!container) return;
        const user = getAuthUser();

        if (user) {
            container.innerHTML =
                '<div class="auth-user">' +
                    '<span class="auth-icon">&#9775;</span>' +
                    '<span class="auth-username">' + escapeHtml(user.username) + '</span>' +
                '</div>' +
                '<div class="auth-buttons">' +
                    '<button class="auth-btn" id="btnLogout">' +
                        '<span class="auth-btn-icon">&#10145;</span>' +
                        '<span class="auth-btn-text">Logout</span>' +
                    '</button>' +
                '</div>';
            document.getElementById('btnLogout').addEventListener('click', doLogout);
        } else {
            container.innerHTML =
                '<div class="auth-buttons">' +
                    '<button class="auth-btn auth-btn-primary" id="btnLogin">' +
                        '<span class="auth-btn-icon">&#9654;</span>' +
                        '<span class="auth-btn-text">Login</span>' +
                    '</button>' +
                    '<button class="auth-btn" id="btnRegister">' +
                        '<span class="auth-btn-icon">&#10010;</span>' +
                        '<span class="auth-btn-text">Register</span>' +
                    '</button>' +
                '</div>';
            document.getElementById('btnLogin').addEventListener('click', () => showAuthModal('login'));
            document.getElementById('btnRegister').addEventListener('click', () => showAuthModal('register'));
        }
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function showAuthModal(mode) {
        const title = mode === 'login' ? 'Login' : 'Register';
        const overlay = document.createElement('div');
        overlay.className = 'auth-modal-overlay';
        overlay.innerHTML =
            '<div class="auth-modal">' +
                '<h2>' + title + '</h2>' +
                '<label class="field-label">Username</label>' +
                '<input type="text" class="field-input" id="authUsername" placeholder="Enter username" autocomplete="username">' +
                '<label class="field-label">Password</label>' +
                '<input type="password" class="field-input" id="authPassword" placeholder="Enter password" autocomplete="current-password">' +
                '<div class="auth-error" id="authError"></div>' +
                '<div class="auth-modal-buttons">' +
                    '<button class="btn-auth-cancel" id="authCancel">Cancel</button>' +
                    '<button class="btn-auth-submit" id="authSubmit">' + title + '</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        overlay.querySelector('#authCancel').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

        const submitBtn = overlay.querySelector('#authSubmit');
        const usernameInput = overlay.querySelector('#authUsername');
        const passwordInput = overlay.querySelector('#authPassword');
        const errorEl = overlay.querySelector('#authError');

        function submit() {
            const username = usernameInput.value.trim();
            const password = passwordInput.value;
            if (!username || !password) {
                errorEl.textContent = 'Please fill in all fields.';
                errorEl.style.display = 'block';
                return;
            }
            if (mode === 'register') {
                const existing = localStorage.getItem('bb-user-' + username);
                if (existing) {
                    errorEl.textContent = 'Username already exists.';
                    errorEl.style.display = 'block';
                    return;
                }
                localStorage.setItem('bb-user-' + username, password);
                localStorage.setItem('bb-auth', JSON.stringify({ username: username }));
                overlay.remove();
                renderAuth();
                showContent();
            } else {
                const stored = localStorage.getItem('bb-user-' + username);
                if (stored !== password) {
                    errorEl.textContent = 'Invalid username or password.';
                    errorEl.style.display = 'block';
                    return;
                }
                localStorage.setItem('bb-auth', JSON.stringify({ username: username }));
                overlay.remove();
                renderAuth();
                showContent();
            }
        }

        submitBtn.addEventListener('click', submit);
        passwordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
        usernameInput.focus();
    }

    function doLogout() {
        localStorage.removeItem('bb-auth');
        renderAuth();
        hideContent();
        showInitialAuthScreen();
    }

    // ===== RAMADAN PLANNER =====
    let currentRamadanDay = 1;
    let ramadanData = {
        daily: {},
        quran: { juz: {}, notes: {}, readingPlan: null, khatamCount: 0 },
        dhikr: { morning: [], afterSleep: [], throughout: [], evening: [], beforeSleep: [] }
    };

    // Preset adhkar
    const DHIKR_PRESETS = {
        morning: [
            { arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ', transliteration: 'A\'udhu bi-kalimātillāhi', translation: 'I seek refuge in Allah\'s perfect words', target: 3 },
            { arabic: 'بِسْمِ اللهِ', transliteration: 'Bismillāh', translation: 'In the name of Allah', target: 3 }
        ],
        afterSleep: [
            { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Al-ḥamdu lillāh', translation: 'All praise is due to Allah', target: 1 }
        ],
        throughout: [
            { arabic: 'سُبْحَانَ اللهِ', transliteration: 'SubḥānAllāh', translation: 'Glory be to Allah', target: 100 },
            { arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alḥamdulillāh', translation: 'All praise is due to Allah', target: 100 },
            { arabic: 'اللهُ أَكْبَرُ', transliteration: 'Allāhu Akbar', translation: 'Allah is the Greatest', target: 100 },
            { arabic: 'لَا إِلَٰهَ إِلَّا اللهُ', transliteration: 'Lā ilāha illallāh', translation: 'There is no god but Allah', target: 100 }
        ],
        evening: [
            { arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ', transliteration: 'A\'udhu bi-kalimātillāhi', translation: 'I seek refuge in Allah\'s perfect words', target: 3 }
        ],
        beforeSleep: [
            { arabic: 'اللَّهُمَّ بِاسْمِكَ', transliteration: 'Allāhumma bismika', translation: 'O Allah, in Your name', target: 1 }
        ]
    };

    function initRamadanPlanner() {
        console.log('Initializing Ramadan Planner...');

        // Initialize tab switching
        document.querySelectorAll('.ramadan-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                console.log('Switching to tab:', tabName);
                switchRamadanTab(tabName);
            });
        });

        // Load saved data
        loadRamadanData();

        // Initialize default dhikr if empty
        if (!ramadanData.dhikr || Object.keys(ramadanData.dhikr).length === 0) {
            console.log('Initializing default dhikr items...');
            initializeDefaultDhikr();
        }

        // Initialize UI
        updateRamadanDayDisplay();
        updateRamadanStats();
        renderJuzGrid();
        loadJuzSelect();
        renderAllDhikrLists();
        updateDhikrSummary();

        // Load current day's data when Ramadan page is active
        const ramadanLink = document.querySelector('[data-page="ramadan"]');
        if (ramadanLink) {
            ramadanLink.addEventListener('click', () => {
                console.log('Ramadan page clicked, loading day data...');
                loadRamadanDailyData(currentRamadanDay);
            });
        }

        console.log('Ramadan Planner initialized successfully');
    }

    function initializeDefaultDhikr() {
        ramadanData.dhikr = {
            morning: [
                { id: 1, arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ', transliteration: 'A\'udhu bi-kalimātillāhi t-tāmmāt', translation: 'I seek refuge in the perfect words of Allah', target: 3, current: 0 },
                { id: 2, arabic: 'بِسْمِ اللهِ', transliteration: 'Bismillāh', translation: 'In the name of Allah', target: 3, current: 0 }
            ],
            afterSleep: [
                { id: 3, arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Al-ḥamdu lillāh', translation: 'All praise is due to Allah who gave us life', target: 1, current: 0 }
            ],
            throughout: [
                { id: 4, arabic: 'سُبْحَانَ اللهِ', transliteration: 'SubḥānAllāh', translation: 'Glory be to Allah', target: 100, current: 0 },
                { id: 5, arabic: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alḥamdulillāh', translation: 'All praise is due to Allah', target: 100, current: 0 },
                { id: 6, arabic: 'اللهُ أَكْبَرُ', transliteration: 'Allāhu Akbar', translation: 'Allah is the Greatest', target: 100, current: 0 },
                { id: 7, arabic: 'لَا إِلَٰهَ إِلَّا اللهُ', transliteration: 'Lā ilāha illallāh', translation: 'There is no god but Allah', target: 100, current: 0 },
                { id: 8, arabic: 'أَسْتَغفِرُ اللهَ', transliteration: 'Astaghfirullāh', translation: 'I seek forgiveness from Allah', target: 100, current: 0 }
            ],
            evening: [
                { id: 9, arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ', transliteration: 'A\'udhu bi-kalimātillāhi t-tāmmāt', translation: 'I seek refuge in the perfect words of Allah', target: 3, current: 0 }
            ],
            beforeSleep: [
                { id: 10, arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ', transliteration: 'Allāhumma bismika amūtu', translation: 'O Allah, in Your name I die and I live', target: 1, current: 0 }
            ]
        };
        saveRamadanData();
    }

    function loadRamadanData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY + '-ramadan');
            if (saved) {
                ramadanData = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error loading Ramadan data:', e);
        }
    }

    function saveRamadanData() {
        try {
            localStorage.setItem(STORAGE_KEY + '-ramadan', JSON.stringify(ramadanData));
        } catch (e) {
            console.error('Error saving Ramadan data:', e);
        }
    }

    function switchRamadanTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.ramadan-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.ramadan-tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).classList.add('active');

        // Refresh data
        if (tabName === 'daily') {
            loadRamadanDailyData(currentRamadanDay);
        } else if (tabName === 'quran') {
            renderJuzGrid();
            updateQuranProgress();
        } else if (tabName === 'dhikr') {
            renderAllDhikrLists();
            updateDhikrSummary();
        }
    }

    function changeRamadanDay(delta) {
        const newDay = currentRamadanDay + delta;
        if (newDay >= 1 && newDay <= 30) {
            currentRamadanDay = newDay;
            loadRamadanDailyData(currentRamadanDay);
            updateRamadanDayDisplay();
            updateRamadanStats();
        }
    }

    function loadRamadanDailyData(day) {
        const dayData = ramadanData.daily[day] || {
            fast: false, suhoor: false, iftar: false, tarawih: 0, witr: false,
            quranPages: 0, juz: 0, extraIbadah: [], notes: ''
        };

        // Update checkboxes
        document.getElementById('ramadanFast').checked = dayData.fast;
        document.getElementById('ramadanSuhoor').checked = dayData.suhoor;
        document.getElementById('ramadanIftar').checked = dayData.iftar;
        document.getElementById('ramadanWitr').checked = dayData.witr;

        // Update inputs
        document.getElementById('ramadanTarawih').value = dayData.tarawih || 0;
        document.getElementById('ramadanQuranPages').value = dayData.quranPages || 0;
        document.getElementById('ramadanJuz').value = dayData.juz || 0;
        document.getElementById('ramadanNotes').value = dayData.notes || '';

        // Update extra ibadah
        const ibadahList = dayData.extraIbadah || [];
        document.querySelectorAll('.ramadan-ibadah-check').forEach(checkbox => {
            const key = checkbox.getAttribute('data-key').replace('ramadan-day-1-', '');
            checkbox.checked = ibadahList.includes(key);
        });

        // Set up data keys for auto-save
        setupRamadanAutoSave(day);
    }

    function setupRamadanAutoSave(day) {
        const keys = [
            'ramadan-day-1-fast', 'ramadan-day-1-suhoor', 'ramadan-day-1-iftar',
            'ramadan-day-1-witr', 'ramadan-day-1-tarawih', 'ramadan-day-1-quran-pages',
            'ramadan-day-1-juz', 'ramadan-day-1-notes'
        ];

        keys.forEach(key => {
            const el = document.querySelector(`[data-key="${key}"]`);
            if (el) {
                el.setAttribute('data-key', `ramadan-day-${day}-${key.replace('ramadan-day-1-', '')}`);
            }
        });

        // Also update ibadah checkboxes
        document.querySelectorAll('.ramadan-ibadah-check').forEach(checkbox => {
            const originalKey = checkbox.getAttribute('data-key');
            checkbox.setAttribute('data-key', `ramadan-day-${day}-${originalKey.replace('ramadan-day-1-', '')}`);
        });
    }

    function updateRamadanDayDisplay() {
        document.getElementById('currentRamadanDay').textContent = currentRamadanDay;

        // Update navigation buttons
        document.getElementById('prevRamadanDay').disabled = currentRamadanDay <= 1;
        document.getElementById('nextRamadanDay').disabled = currentRamadanDay >= 30;
    }

    function updateRamadanStats() {
        let fastsCompleted = 0;
        let tarawihTotal = 0;
        let streak = 0;

        // Count fasts and tarawih
        for (let i = 1; i <= 30; i++) {
            const dayData = ramadanData.daily[i];
            if (dayData) {
                if (dayData.fast) fastsCompleted++;
                tarawihTotal += dayData.tarawih || 0;
            }
        }

        // Calculate streak
        for (let i = currentRamadanDay; i >= 1; i--) {
            const dayData = ramadanData.daily[i];
            if (dayData && dayData.fast) {
                streak++;
            } else if (i < currentRamadanDay) {
                break;
            }
        }

        document.getElementById('fastsCompleted').textContent = fastsCompleted;
        document.getElementById('tarawihTotal').textContent = tarawihTotal;
        document.getElementById('fastingStreak').textContent = streak;
    }

    // ===== QURAN KHATAM FUNCTIONS =====
    function renderJuzGrid() {
        const grid = document.getElementById('ramadanJuzGrid');
        if (!grid) return;

        grid.innerHTML = '';
        for (let i = 1; i <= 30; i++) {
            const juzData = ramadanData.quran.juz[i] || { completed: false };
            const div = document.createElement('div');
            div.className = 'juz-item' + (juzData.completed ? ' completed' : '');
            div.textContent = i;
            div.onclick = () => toggleJuz(i);
            grid.appendChild(div);
        }
    }

    function toggleJuz(juz) {
        if (!ramadanData.quran.juz[juz]) {
            ramadanData.quran.juz[juz] = { completed: false };
        }
        ramadanData.quran.juz[juz].completed = !ramadanData.quran.juz[juz].completed;

        // Check for khatam
        if (ramadanData.quran.juz[juz].completed) {
            const completed = Object.values(ramadanData.quran.juz).filter(j => j.completed).length;
            if (completed === 30) {
                ramadanData.quran.khatamCount++;
                // Reset for new khatam
                ramadanData.quran.juz = {};
            }
        }

        saveRamadanData();
        renderJuzGrid();
        updateQuranProgress();
    }

    function updateQuranProgress() {
        const completed = Object.values(ramadanData.quran.juz).filter(j => j.completed).length;
        const percentage = Math.round((completed / 30) * 100);

        document.getElementById('juzCompletedCount').textContent = completed;

        const circle = document.getElementById('quranProgressCircle');
        if (circle) {
            const circumference = 2 * Math.PI * 70;
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
        }
    }

    function loadJuzSelect() {
        const select = document.getElementById('juzSelect');
        if (!select) return;

        for (let i = 1; i <= 30; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Juz ${i}`;
            select.appendChild(option);
        }
    }

    function loadJuzDetails() {
        const juz = parseInt(document.getElementById('juzSelect').value);
        if (!juz) return;

        const juzData = ramadanData.quran.juz[juz] || { completed: false, pages: {} };
        const notes = ramadanData.quran.notes[juz] || [];

        // Display pages
        const pagesArray = Object.keys(juzData.pages || {});
        document.getElementById('juzPages').value = pagesArray.join(', ');

        // Display notes
        renderJuzNotes(notes);
    }

    function saveJuzDetails() {
        const juz = parseInt(document.getElementById('juzSelect').value);
        if (!juz) return;

        // Parse pages
        const pagesText = document.getElementById('juzPages').value;
        const pagesObj = {};
        if (pagesText) {
            pagesText.split(',').forEach(part => {
                part = part.trim();
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    for (let i = start; i <= end; i++) {
                        if (i >= 1 && i <= 20) pagesObj[i] = true;
                    }
                } else {
                    const page = Number(part);
                    if (page >= 1 && page <= 20) pagesObj[page] = true;
                }
            });
        }

        // Save juz data
        if (!ramadanData.quran.juz[juz]) {
            ramadanData.quran.juz[juz] = {};
        }
        ramadanData.quran.juz[juz].pages = pagesObj;

        saveRamadanData();
        alert('Juz details saved!');
    }

    function renderJuzNotes(notes) {
        const container = document.getElementById('juzNotesList');
        if (!container) return;

        if (notes.length === 0) {
            container.innerHTML = '<p class="text-muted">No notes yet.</p>';
            return;
        }

        container.innerHTML = notes.map(note => `
            <div class="note-item">
                <button class="note-delete" onclick="deleteJuzNote('${note.id}')">&times;</button>
                <p>${note.text}</p>
                <small class="text-muted">${new Date(note.date).toLocaleDateString()}</small>
            </div>
        `).join('');
    }

    function saveReadingPlan() {
        const target = parseFloat(document.getElementById('dailyQuranTarget').value);
        ramadanData.quran.readingPlan = { dailyTarget: target };
        saveRamadanData();
        updateReadingPlanDisplay();
    }

    function updateReadingPlanDisplay() {
        const plan = ramadanData.quran.readingPlan;
        const display = document.getElementById('readingPlanDisplay');
        if (!display) return;

        if (plan && plan.dailyTarget) {
            display.innerHTML = `<p class="text-muted">Daily Target: ${plan.dailyTarget} Juz</p>`;
        } else {
            display.innerHTML = '<p class="text-muted">No reading plan set</p>';
        }
    }

    // ===== DHIKR TRACKER FUNCTIONS =====
    function renderAllDhikrLists() {
        ['morning', 'afterSleep', 'throughout', 'evening', 'beforeSleep'].forEach(category => {
            renderDhikrList(category);
        });
    }

    function renderDhikrList(category) {
        const container = document.getElementById(`${category}DhikrList`);
        if (!container) {
            console.log(`Container not found for category: ${category}`);
            return;
        }

        const dhikrList = ramadanData.dhikr[category] || [];
        console.log(`Rendering ${category} dhikr list:`, dhikrList.length, 'items');

        if (dhikrList.length === 0) {
            container.innerHTML = '<p class="text-muted">No dhikr added yet. Click the button below to add your first dhikr!</p>';
            return;
        }

        container.innerHTML = dhikrList.map(dhikr => {
            const progress = Math.min(100, Math.round((dhikr.current / dhikr.target) * 100));
            const isComplete = dhikr.current >= dhikr.target;
            return `
                <div class="dhikr-item">
                    <div class="dhikr-item-header">
                        <button class="btn-sm" onclick="deleteDhikr('${category}', ${dhikr.id})">&times;</button>
                    </div>
                    ${dhikr.arabic ? `<div class="dhikr-arabic" dir="rtl">${dhikr.arabic}</div>` : ''}
                    <div class="dhikr-transliteration">${dhikr.transliteration}</div>
                    <div class="dhikr-translation">${dhikr.translation}</div>
                    <div class="dhikr-counter" style="${isComplete ? 'background: var(--success-light);' : ''}">
                        <button class="dhikr-counter-btn" onclick="decrementDhikr('${category}', ${dhikr.id})">-</button>
                        <div class="dhikr-count">${dhikr.current}</div>
                        <button class="dhikr-counter-btn" onclick="incrementDhikr('${category}', ${dhikr.id})">+</button>
                        <span class="dhikr-target">/${dhikr.target}</span>
                        <button class="dhikr-counter-btn" onclick="resetDhikr('${category}', ${dhikr.id})">↺</button>
                    </div>
                    ${isComplete ? '<div class="text-small text-primary" style="margin-top:0.5rem;">✓ Target reached!</div>' : ''}
                </div>
            `;
        }).join('');
    }

    function showAddDhikrModal(category) {
        const modal = document.getElementById('dhikrModal');
        if (!modal) {
            console.error('Dhikr modal not found');
            return;
        }

        document.getElementById('dhikrModalTitle').textContent = `Add ${formatCategoryName(category)} Dhikr`;
        document.getElementById('dhikrCategory').value = category;
        document.getElementById('dhikrId').value = '';

        // Clear form
        document.getElementById('dhikrArabic').value = '';
        document.getElementById('dhikrTransliteration').value = '';
        document.getElementById('dhikrTranslation').value = '';
        document.getElementById('dhikrTarget').value = 33;

        // Render presets
        renderPresetChips(category);

        modal.style.display = 'flex';

        // Set up event listeners for buttons
        const saveBtn = document.getElementById('saveDhikrBtn');
        const cancelBtn = document.getElementById('cancelDhikrBtn');
        const closeBtn = document.getElementById('dhikrModalClose');

        if (saveBtn) saveBtn.onclick = saveDhikr;
        if (cancelBtn) cancelBtn.onclick = closeDhikrModal;
        if (closeBtn) closeBtn.onclick = closeDhikrModal;

        // Close on overlay click
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeDhikrModal();
            }
        };
    }

    function closeDhikrModal() {
        const modal = document.getElementById('dhikrModal');
        if (modal) {
            modal.style.display = 'none';
            modal.onclick = null;
        }
    }

    function renderPresetChips(category) {
        const container = document.getElementById('presetChips');
        if (!container) return;

        const presets = DHIKR_PRESETS[category] || [];
        if (presets.length === 0) {
            container.innerHTML = '<p class="text-muted">No presets available</p>';
            return;
        }

        container.innerHTML = presets.map((preset, index) => `
            <span class="preset-chip" onclick="selectPreset(${index})">${preset.transliteration}</span>
        `).join('');
    }

    function selectPreset(index) {
        const category = document.getElementById('dhikrCategory').value;
        const preset = DHIKR_PRESETS[category][index];
        document.getElementById('dhikrArabic').value = preset.arabic;
        document.getElementById('dhikrTransliteration').value = preset.transliteration;
        document.getElementById('dhikrTranslation').value = preset.translation;
        document.getElementById('dhikrTarget').value = preset.target;
    }

    function saveDhikr() {
        const categoryEl = document.getElementById('dhikrCategory');
        const arabicEl = document.getElementById('dhikrArabic');
        const transliterationEl = document.getElementById('dhikrTransliteration');
        const translationEl = document.getElementById('dhikrTranslation');
        const targetEl = document.getElementById('dhikrTarget');
        const idEl = document.getElementById('dhikrId');

        if (!categoryEl || !transliterationEl || !translationEl || !targetEl) {
            console.error('Required elements not found');
            alert('Error: Required form elements not found');
            return;
        }

        const category = categoryEl.value;
        const id = idEl ? idEl.value : null;

        const dhikrData = {
            id: id ? parseInt(id) : Date.now(),
            arabic: arabicEl ? arabicEl.value : '',
            transliteration: transliterationEl.value.trim(),
            translation: translationEl.value.trim(),
            target: parseInt(targetEl.value) || 33,
            current: 0
        };

        // Validation
        if (!dhikrData.transliteration) {
            alert('Please enter a transliteration');
            return;
        }
        if (!dhikrData.translation) {
            alert('Please enter a translation');
            return;
        }

        // Initialize category array if needed
        if (!ramadanData.dhikr[category]) {
            ramadanData.dhikr[category] = [];
        }

        if (id) {
            // Update existing
            const index = ramadanData.dhikr[category].findIndex(d => d.id === parseInt(id));
            if (index > -1) {
                ramadanData.dhikr[category][index] = { ...ramadanData.dhikr[category][index], ...dhikrData, current: ramadanData.dhikr[category][index].current };
            }
        } else {
            // Add new
            ramadanData.dhikr[category].push(dhikrData);
        }

        saveRamadanData();
        renderDhikrList(category);
        updateDhikrSummary();
        closeDhikrModal();
    }

    function deleteDhikr(category, id) {
        if (confirm('Delete this dhikr?')) {
            ramadanData.dhikr[category] = ramadanData.dhikr[category].filter(d => d.id !== id);
            saveRamadanData();
            renderDhikrList(category);
            updateDhikrSummary();
        }
    }

    function incrementDhikr(category, id) {
        const dhikr = ramadanData.dhikr[category].find(d => d.id === id);
        if (dhikr) {
            dhikr.current++;
            saveRamadanData();
            renderDhikrList(category);
            updateDhikrSummary();
        }
    }

    function decrementDhikr(category, id) {
        const dhikr = ramadanData.dhikr[category].find(d => d.id === id);
        if (dhikr && dhikr.current > 0) {
            dhikr.current--;
            saveRamadanData();
            renderDhikrList(category);
            updateDhikrSummary();
        }
    }

    function resetDhikr(category, id) {
        const dhikr = ramadanData.dhikr[category].find(d => d.id === id);
        if (dhikr) {
            dhikr.current = 0;
            saveRamadanData();
            renderDhikrList(category);
            updateDhikrSummary();
        }
    }

    function updateDhikrSummary() {
        const container = document.getElementById('dhikrSummary');
        if (!container) return;

        let total = 0;
        let completed = 0;

        Object.values(ramadanData.dhikr).forEach(category => {
            category.forEach(dhikr => {
                total += dhikr.current;
                if (dhikr.current >= dhikr.target) completed++;
            });
        });

        container.innerHTML = `
            <div class="dhikr-summary-item">
                <span>Total Today</span>
                <strong>${total}</strong>
            </div>
            <div class="dhikr-summary-item">
                <span>Completed</span>
                <strong>${completed}</strong>
            </div>
        `;
    }

    function formatCategoryName(category) {
        const names = {
            morning: 'Morning',
            afterSleep: 'Upon Waking',
            throughout: 'Daily',
            evening: 'Evening',
            beforeSleep: 'Before Sleep'
        };
        return names[category] || category;
    }

    // ===== WEEKLY PAGE — WEEK SCOPING & DYNAMIC LISTS =====

    let currentWeekStart = getMonday(new Date());

    function getMonday(d) {
        const dt = new Date(d);
        const day = dt.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        dt.setDate(dt.getDate() + diff);
        return dt.toISOString().split('T')[0];
    }

    function getWeekKey() {
        return currentWeekStart;
    }

    function weeklyStorageKey(field) {
        return 'weekly-' + getWeekKey() + '-' + field;
    }

    function getWeeklyDynamic(field) {
        const data = loadData();
        const key = weeklyStorageKey(field);
        try { return JSON.parse(data[key] || '[]'); }
        catch { return []; }
    }

    function saveWeeklyDynamic(field, arr) {
        saveField(weeklyStorageKey(field), JSON.stringify(arr));
    }

    function formatWeekRange(mondayStr) {
        const mon = new Date(mondayStr + 'T00:00:00');
        const sun = new Date(mon);
        sun.setDate(sun.getDate() + 6);
        const opts = { weekday: 'short', month: 'short', day: 'numeric' };
        const monFmt = mon.toLocaleDateString('en-US', opts);
        const sunOpts = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const sunFmt = sun.toLocaleDateString('en-US', sunOpts);
        return monFmt + ' — ' + sunFmt;
    }

    function initWeekSelector() {
        const dateInput = document.getElementById('weekDate');
        const rangeLabel = document.getElementById('weekRangeLabel');
        const prevBtn = document.getElementById('weekPrev');
        const nextBtn = document.getElementById('weekNext');

        if (!dateInput) return;

        function updateWeekDisplay() {
            dateInput.value = currentWeekStart;
            if (rangeLabel) rangeLabel.textContent = formatWeekRange(currentWeekStart);
            loadWeeklyPageData();
        }

        dateInput.addEventListener('change', () => {
            if (dateInput.value) {
                currentWeekStart = getMonday(new Date(dateInput.value + 'T00:00:00'));
                updateWeekDisplay();
            }
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const d = new Date(currentWeekStart + 'T00:00:00');
                d.setDate(d.getDate() - 7);
                currentWeekStart = d.toISOString().split('T')[0];
                updateWeekDisplay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const d = new Date(currentWeekStart + 'T00:00:00');
                d.setDate(d.getDate() + 7);
                currentWeekStart = d.toISOString().split('T')[0];
                updateWeekDisplay();
            });
        }

        updateWeekDisplay();
    }

    // Load all weekly-scoped static fields + dynamic lists
    function loadWeeklyPageData() {
        const data = loadData();

        // Load weekly-scoped static fields (data-wkey)
        document.querySelectorAll('.weekly-scoped').forEach(el => {
            const wkey = el.dataset.wkey;
            if (!wkey) return;
            const key = weeklyStorageKey(wkey);
            if (el.type === 'checkbox') {
                el.checked = data[key] === '1' || data[key] === true;
            } else {
                el.value = data[key] || '';
            }
        });

        // Render all dynamic lists
        renderAllWeeklyGoals();
        renderMealPrep();
        renderLearningFocus();
        renderHoneyDoList();
        renderWeeklyPriorities();
    }

    // Bind auto-save for weekly-scoped fields
    function bindWeeklyScopedAutoSave() {
        document.addEventListener('input', (e) => {
            const el = e.target;
            if (el.classList && el.classList.contains('weekly-scoped') && el.dataset.wkey) {
                if (el.type === 'checkbox') {
                    saveField(weeklyStorageKey(el.dataset.wkey), el.checked ? '1' : '');
                } else {
                    saveField(weeklyStorageKey(el.dataset.wkey), el.value);
                }
            }
        });
        document.addEventListener('change', (e) => {
            const el = e.target;
            if (el.classList && el.classList.contains('weekly-scoped') && el.dataset.wkey) {
                if (el.type === 'checkbox') {
                    saveField(weeklyStorageKey(el.dataset.wkey), el.checked ? '1' : '');
                } else {
                    saveField(weeklyStorageKey(el.dataset.wkey), el.value);
                }
            }
        });
    }

    // ===== WEEKLY GOALS (5 categories) =====
    const GOAL_CATEGORIES = ['professional', 'islamic', 'health', 'family', 'business'];

    function renderWeeklyGoalCategory(category) {
        const container = document.getElementById('weeklyGoals' + category.charAt(0).toUpperCase() + category.slice(1));
        if (!container) return;
        let items = getWeeklyDynamic('goals-' + category);
        if (items.length === 0) {
            items = [{ id: Date.now(), text: '', done: false }];
            saveWeeklyDynamic('goals-' + category, items);
        }
        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'dynamic-item-check';
            div.innerHTML = '<input type="checkbox" data-gc="' + category + '" data-gi="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-gc="' + category + '" data-gi="' + idx + '" value="' + escapeHtml(item.text) + '" placeholder="Goal...">' +
                '<button class="btn-remove" data-gc="' + category + '" data-gi="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getWeeklyDynamic('goals-' + e.target.dataset.gc);
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.gi), 1);
                saveWeeklyDynamic('goals-' + e.target.dataset.gc, arr);
                renderWeeklyGoalCategory(e.target.dataset.gc);
            }
        };
        container.oninput = (e) => {
            if (e.target.type === 'text' && e.target.dataset.gc) {
                const arr = getWeeklyDynamic('goals-' + e.target.dataset.gc);
                const i = parseInt(e.target.dataset.gi);
                if (arr[i]) { arr[i].text = e.target.value; saveWeeklyDynamic('goals-' + e.target.dataset.gc, arr); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.gc) {
                const arr = getWeeklyDynamic('goals-' + e.target.dataset.gc);
                const i = parseInt(e.target.dataset.gi);
                if (arr[i]) { arr[i].done = e.target.checked; saveWeeklyDynamic('goals-' + e.target.dataset.gc, arr); }
            }
        };
    }

    function renderAllWeeklyGoals() {
        GOAL_CATEGORIES.forEach(cat => renderWeeklyGoalCategory(cat));
    }

    function initWeeklyGoals() {
        GOAL_CATEGORIES.forEach(cat => {
            const btn = document.getElementById('btnAddGoal' + cat.charAt(0).toUpperCase() + cat.slice(1));
            if (btn) {
                btn.addEventListener('click', () => {
                    const items = getWeeklyDynamic('goals-' + cat);
                    items.push({ id: Date.now(), text: '', done: false });
                    saveWeeklyDynamic('goals-' + cat, items);
                    renderWeeklyGoalCategory(cat);
                });
            }
        });
    }

    // ===== MEAL PREP (dynamic) =====
    function renderMealPrep() {
        const container = document.getElementById('mealPrepList');
        if (!container) return;
        let items = getWeeklyDynamic('mealprep');
        if (items.length === 0) {
            items = [{ id: Date.now(), day: '', suhoor: '', iftar: '' }];
            saveWeeklyDynamic('mealprep', items);
        }
        container.innerHTML = '';
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'meal-prep-item';
            let dayOpts = '<option value="">Day</option>' + days.map(d => '<option value="' + d + '"' + (item.day === d ? ' selected' : '') + '>' + d + '</option>').join('');
            div.innerHTML = '<select class="field-select" data-mp-idx="' + idx + '" data-mp-field="day">' + dayOpts + '</select>' +
                '<input type="text" class="field-input" data-mp-idx="' + idx + '" data-mp-field="suhoor" value="' + escapeHtml(item.suhoor) + '" placeholder="Suhoor">' +
                '<input type="text" class="field-input" data-mp-idx="' + idx + '" data-mp-field="iftar" value="' + escapeHtml(item.iftar) + '" placeholder="Iftar">' +
                '<button class="btn-remove" data-mp-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getWeeklyDynamic('mealprep');
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.mpIdx), 1);
                saveWeeklyDynamic('mealprep', arr);
                renderMealPrep();
            }
        };
        container.oninput = (e) => {
            const idx = e.target.dataset.mpIdx;
            const field = e.target.dataset.mpField;
            if (idx !== undefined && field) {
                const arr = getWeeklyDynamic('mealprep');
                if (arr[idx]) { arr[idx][field] = e.target.value; saveWeeklyDynamic('mealprep', arr); }
            }
        };
        container.onchange = (e) => {
            const idx = e.target.dataset.mpIdx;
            const field = e.target.dataset.mpField;
            if (idx !== undefined && field && e.target.tagName === 'SELECT') {
                const arr = getWeeklyDynamic('mealprep');
                if (arr[idx]) { arr[idx][field] = e.target.value; saveWeeklyDynamic('mealprep', arr); }
            }
        };
    }

    // ===== LEARNING FOCUS (typed dynamic) =====
    function renderLearningFocus() {
        const container = document.getElementById('learningFocusList');
        if (!container) return;
        let items = getWeeklyDynamic('learning');
        if (items.length === 0) {
            items = [{ id: Date.now(), type: 'quran', topic: '', notes: '' }];
            saveWeeklyDynamic('learning', items);
        }
        container.innerHTML = '';
        const types = ['quran', 'hadith', 'book', 'course', 'other'];
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'learning-item';
            let typeOpts = types.map(t => '<option value="' + t + '"' + (item.type === t ? ' selected' : '') + '>' + t.charAt(0).toUpperCase() + t.slice(1) + '</option>').join('');
            div.innerHTML = '<div class="learning-item-row">' +
                '<select class="field-select" data-lf-idx="' + idx + '" data-lf-field="type">' + typeOpts + '</select>' +
                '<input type="text" class="field-input" data-lf-idx="' + idx + '" data-lf-field="topic" value="' + escapeHtml(item.topic) + '" placeholder="Topic / Surah">' +
                '<button class="btn-remove" data-lf-idx="' + idx + '">&times;</button></div>' +
                '<textarea class="field-textarea" data-lf-idx="' + idx + '" data-lf-field="notes" rows="2" placeholder="Key takeaways...">' + escapeHtml(item.notes) + '</textarea>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getWeeklyDynamic('learning');
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.lfIdx), 1);
                saveWeeklyDynamic('learning', arr);
                renderLearningFocus();
            }
        };
        const saveHandler = (e) => {
            const idx = e.target.dataset.lfIdx;
            const field = e.target.dataset.lfField;
            if (idx !== undefined && field) {
                const arr = getWeeklyDynamic('learning');
                if (arr[idx]) { arr[idx][field] = e.target.value; saveWeeklyDynamic('learning', arr); }
            }
        };
        container.oninput = saveHandler;
        container.onchange = saveHandler;
    }

    // ===== HONEY-DO LIST (dynamic with checkbox) =====
    function renderHoneyDoList() {
        const container = document.getElementById('honeyDoList');
        if (!container) return;
        let items = getWeeklyDynamic('honeydo');
        if (items.length === 0) {
            items = [
                { id: Date.now(), text: '', done: false },
                { id: Date.now() + 1, text: '', done: false },
                { id: Date.now() + 2, text: '', done: false }
            ];
            saveWeeklyDynamic('honeydo', items);
        }
        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'dynamic-item-check';
            div.innerHTML = '<input type="checkbox" data-hd-idx="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-hd-idx="' + idx + '" value="' + escapeHtml(item.text) + '" placeholder="' + (idx + 1) + '. Task">' +
                '<button class="btn-remove" data-hd-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getWeeklyDynamic('honeydo');
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.hdIdx), 1);
                saveWeeklyDynamic('honeydo', arr);
                renderHoneyDoList();
            }
        };
        container.oninput = (e) => {
            if (e.target.type === 'text' && e.target.dataset.hdIdx !== undefined) {
                const arr = getWeeklyDynamic('honeydo');
                const i = parseInt(e.target.dataset.hdIdx);
                if (arr[i]) { arr[i].text = e.target.value; saveWeeklyDynamic('honeydo', arr); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.hdIdx !== undefined) {
                const arr = getWeeklyDynamic('honeydo');
                const i = parseInt(e.target.dataset.hdIdx);
                if (arr[i]) { arr[i].done = e.target.checked; saveWeeklyDynamic('honeydo', arr); }
            }
        };
    }

    // ===== WEEKLY PRIORITIES (dynamic with checkbox) =====
    function renderWeeklyPriorities() {
        const container = document.getElementById('weeklyPrioritiesList');
        if (!container) return;
        let items = getWeeklyDynamic('priorities');
        if (items.length === 0) {
            items = [
                { id: Date.now(), text: '', done: false },
                { id: Date.now() + 1, text: '', done: false },
                { id: Date.now() + 2, text: '', done: false }
            ];
            saveWeeklyDynamic('priorities', items);
        }
        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'dynamic-item-check';
            div.innerHTML = '<input type="checkbox" data-wp-idx="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-wp-idx="' + idx + '" value="' + escapeHtml(item.text) + '" placeholder="' + (idx + 1) + '. Must get done">' +
                '<button class="btn-remove" data-wp-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getWeeklyDynamic('priorities');
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.wpIdx), 1);
                saveWeeklyDynamic('priorities', arr);
                renderWeeklyPriorities();
                refreshGoalsCascade();
            }
        };
        container.oninput = (e) => {
            if (e.target.type === 'text' && e.target.dataset.wpIdx !== undefined) {
                const arr = getWeeklyDynamic('priorities');
                const i = parseInt(e.target.dataset.wpIdx);
                if (arr[i]) { arr[i].text = e.target.value; saveWeeklyDynamic('priorities', arr); refreshGoalsCascade(); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.wpIdx !== undefined) {
                const arr = getWeeklyDynamic('priorities');
                const i = parseInt(e.target.dataset.wpIdx);
                if (arr[i]) { arr[i].done = e.target.checked; saveWeeklyDynamic('priorities', arr); }
            }
        };
    }

    // ===== MONTHLY NOT-TO-DO (dynamic) =====
    function getNotTodoData() {
        const data = loadData();
        const key = 'monthly-' + getMonthKey() + '-nottodo';
        try { return JSON.parse(data[key] || '[]'); }
        catch { return []; }
    }

    function saveNotTodoData(items) {
        saveField('monthly-' + getMonthKey() + '-nottodo', JSON.stringify(items));
    }

    function renderNotTodoList() {
        const container = document.getElementById('notTodoList');
        if (!container) return;
        let items = getNotTodoData();

        // Migrate old static data on first load
        if (items.length === 0) {
            const data = loadData();
            const migrated = [];
            for (let i = 1; i <= 5; i++) {
                const val = data['monthly-nottodo-' + i];
                if (val) migrated.push({ id: Date.now() + i, text: val });
            }
            if (migrated.length > 0) {
                items = migrated;
            } else {
                items = [
                    { id: Date.now(), text: '' },
                    { id: Date.now() + 1, text: '' },
                    { id: Date.now() + 2, text: '' }
                ];
            }
            saveNotTodoData(items);
        }

        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'dynamic-item';
            div.innerHTML = '<input type="text" class="field-input" data-nt-idx="' + idx + '" value="' + escapeHtml(item.text) + '" placeholder="' + (idx + 1) + '. Stop...">' +
                '<button class="btn-remove" data-nt-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getNotTodoData();
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.ntIdx), 1);
                saveNotTodoData(arr);
                renderNotTodoList();
            }
        };
        container.oninput = (e) => {
            if (e.target.dataset.ntIdx !== undefined) {
                const arr = getNotTodoData();
                const i = parseInt(e.target.dataset.ntIdx);
                if (arr[i]) { arr[i].text = e.target.value; saveNotTodoData(arr); }
            }
        };
    }

    function initNotTodoList() {
        const btn = document.getElementById('btnAddNotTodo');
        if (btn) {
            btn.addEventListener('click', () => {
                const items = getNotTodoData();
                items.push({ id: Date.now(), text: '' });
                saveNotTodoData(items);
                renderNotTodoList();
            });
        }
        renderNotTodoList();
    }

    // ===== INIT WEEKLY PAGE =====
    function initWeeklyPage() {
        initWeekSelector();
        initWeeklyGoals();
        bindWeeklyScopedAutoSave();

        // Meal prep add button
        const addMP = document.getElementById('btnAddMealPrep');
        if (addMP) {
            addMP.addEventListener('click', () => {
                const items = getWeeklyDynamic('mealprep');
                items.push({ id: Date.now(), day: '', suhoor: '', iftar: '' });
                saveWeeklyDynamic('mealprep', items);
                renderMealPrep();
            });
        }

        // Learning add button
        const addLF = document.getElementById('btnAddLearning');
        if (addLF) {
            addLF.addEventListener('click', () => {
                const items = getWeeklyDynamic('learning');
                items.push({ id: Date.now(), type: 'quran', topic: '', notes: '' });
                saveWeeklyDynamic('learning', items);
                renderLearningFocus();
            });
        }

        // Honey-do add button
        const addHD = document.getElementById('btnAddHoneyDo');
        if (addHD) {
            addHD.addEventListener('click', () => {
                const items = getWeeklyDynamic('honeydo');
                items.push({ id: Date.now(), text: '', done: false });
                saveWeeklyDynamic('honeydo', items);
                renderHoneyDoList();
            });
        }

        // Priorities add button
        const addWP = document.getElementById('btnAddPriority');
        if (addWP) {
            addWP.addEventListener('click', () => {
                const items = getWeeklyDynamic('priorities');
                items.push({ id: Date.now(), text: '', done: false });
                saveWeeklyDynamic('priorities', items);
                renderWeeklyPriorities();
            });
        }
    }

    // ===== MULTI-PROJECT PLANNER =====
    let currentProjectId = null;

    function getProjectList() {
        const data = loadData();
        try { return JSON.parse(data['project-list'] || '[]'); }
        catch { return []; }
    }

    function saveProjectList(list) {
        saveField('project-list', JSON.stringify(list));
    }

    function projectKey(field) {
        return 'project-' + currentProjectId + '-' + field;
    }

    function initProjectPlanner() {
        const selector = document.getElementById('projectSelector');
        const addBtn = document.getElementById('btnAddProject');
        const delBtn = document.getElementById('btnDeleteProject');
        const addMsBtn = document.getElementById('btnAddMilestone');
        if (!selector) return;

        // Migrate old single-project data
        let projects = getProjectList();
        if (projects.length === 0) {
            const data = loadData();
            const oldName = data['project-name'];
            const id = Date.now();
            const proj = { id: id, name: oldName || 'Project 1' };
            projects = [proj];
            saveProjectList(projects);
            // Migrate old keys
            const migrateKeys = ['name', 'start', 'deadline', 'client', 'objective', 'tasks', 'risks', 'notes'];
            migrateKeys.forEach(k => {
                const oldVal = data['project-' + k];
                if (oldVal) saveField('project-' + id + '-' + k, oldVal);
            });
            // Migrate milestones
            const milestones = [];
            for (let i = 1; i <= 5; i++) {
                const text = data['project-ms' + i] || '';
                const done = data['project-ms' + i + '-done'] === '1';
                const date = data['project-ms' + i + '-date'] || '';
                if (text || done || date) milestones.push({ text, done, date });
            }
            if (milestones.length > 0) {
                saveField('project-' + id + '-milestones', JSON.stringify(milestones));
            }
        }

        currentProjectId = projects[0].id;
        renderProjectSelector();
        loadProjectData();
        initProjectFilterSort();

        addBtn.addEventListener('click', () => {
            const list = getProjectList();
            const id = Date.now();
            list.push({ id, name: 'New Project' });
            saveProjectList(list);
            currentProjectId = id;
            renderProjectSelector();
            loadProjectData();
        });

        delBtn.addEventListener('click', () => {
            const list = getProjectList();
            if (list.length <= 1) { alert('Cannot delete the only project.'); return; }
            if (!confirm('Delete this project permanently?')) return;
            const data = loadData();
            // Remove all keys for this project
            const prefix = 'project-' + currentProjectId + '-';
            Object.keys(data).forEach(k => { if (k.startsWith(prefix)) delete data[k]; });
            saveData(data);
            const idx = list.findIndex(p => p.id === currentProjectId);
            list.splice(idx, 1);
            saveProjectList(list);
            currentProjectId = list[0].id;
            renderProjectSelector();
            loadProjectData();
        });

        selector.addEventListener('change', () => {
            currentProjectId = parseInt(selector.value);
            loadProjectData();
        });

        if (addMsBtn) {
            addMsBtn.addEventListener('click', () => {
                const ms = getProjectMilestones();
                ms.push({ text: '', done: false, date: '' });
                saveField(projectKey('milestones'), JSON.stringify(ms));
                renderProjectMilestones();
            });
        }

        // Auto-save project fields
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('project-field') && e.target.dataset.pfield && currentProjectId) {
                const val = e.target.type === 'checkbox' ? (e.target.checked ? '1' : '') : e.target.value;
                saveField(projectKey(e.target.dataset.pfield), val);
                // Update name in selector
                if (e.target.dataset.pfield === 'name') {
                    const list = getProjectList();
                    const proj = list.find(p => p.id === currentProjectId);
                    if (proj) { proj.name = e.target.value || 'Untitled'; saveProjectList(list); }
                    const opt = document.querySelector('#projectSelector option[value="' + currentProjectId + '"]');
                    if (opt) opt.textContent = e.target.value || 'Untitled';
                }
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('project-field') && e.target.dataset.pfield && currentProjectId) {
                const val = e.target.type === 'checkbox' ? (e.target.checked ? '1' : '') : e.target.value;
                saveField(projectKey(e.target.dataset.pfield), val);
            }
        });
    }

    function renderProjectSelector() {
        const selector = document.getElementById('projectSelector');
        if (!selector) return;
        const list = getFilteredSortedProjects();
        selector.innerHTML = list.map(p => '<option value="' + p.id + '"' + (p.id === currentProjectId ? ' selected' : '') + '>' + escapeHtml(p.name) + '</option>').join('');
    }

    function loadProjectData() {
        const data = loadData();
        document.querySelectorAll('.project-field').forEach(el => {
            const key = projectKey(el.dataset.pfield);
            if (el.type === 'checkbox') {
                el.checked = data[key] === '1';
            } else {
                el.value = data[key] || '';
            }
        });
        renderProjectMilestones();
    }

    function getProjectMilestones() {
        const data = loadData();
        try { return JSON.parse(data[projectKey('milestones')] || '[]'); }
        catch { return []; }
    }

    function renderProjectMilestones() {
        const container = document.getElementById('projectMilestonesList');
        if (!container) return;
        let items = getProjectMilestones();
        if (items.length === 0) {
            items = Array.from({ length: 3 }, () => ({ text: '', done: false, date: '' }));
            saveField(projectKey('milestones'), JSON.stringify(items));
        }
        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'milestone-row';
            div.innerHTML = '<input type="checkbox" data-pms-idx="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-pms-idx="' + idx + '" data-pms-field="text" value="' + escapeHtml(item.text) + '" placeholder="Milestone ' + (idx + 1) + '" style="flex:1">' +
                '<input type="date" class="field-input-sm" data-pms-idx="' + idx + '" data-pms-field="date" value="' + (item.date || '') + '">' +
                '<button class="btn-remove" data-pms-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getProjectMilestones();
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.pmsIdx), 1);
                saveField(projectKey('milestones'), JSON.stringify(arr));
                renderProjectMilestones();
            }
        };
        container.oninput = (e) => {
            if (e.target.dataset.pmsIdx !== undefined && e.target.dataset.pmsField) {
                const arr = getProjectMilestones();
                const i = parseInt(e.target.dataset.pmsIdx);
                if (arr[i]) { arr[i][e.target.dataset.pmsField] = e.target.value; saveField(projectKey('milestones'), JSON.stringify(arr)); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.pmsIdx !== undefined) {
                const arr = getProjectMilestones();
                const i = parseInt(e.target.dataset.pmsIdx);
                if (arr[i]) { arr[i].done = e.target.checked; saveField(projectKey('milestones'), JSON.stringify(arr)); }
            }
        };
    }

    function initProjectFilterSort() {
        const searchInput = document.getElementById('projectSearch');
        const filterStatus = document.getElementById('projectFilterStatus');
        const sortBy = document.getElementById('projectSortBy');

        const applyFilterSort = () => {
            renderProjectSelector();
        };

        if (searchInput) searchInput.addEventListener('input', applyFilterSort);
        if (filterStatus) filterStatus.addEventListener('change', applyFilterSort);
        if (sortBy) sortBy.addEventListener('change', applyFilterSort);
    }

    function getFilteredSortedProjects() {
        const searchTerm = document.getElementById('projectSearch')?.value.toLowerCase() || '';
        const filterStatus = document.getElementById('projectFilterStatus')?.value || 'all';
        const sortBy = document.getElementById('projectSortBy')?.value || 'date-desc';
        const data = loadData();

        let filtered = getProjectList().filter(project => {
            // Search filter
            if (searchTerm && !project.name.toLowerCase().includes(searchTerm)) {
                return false;
            }
            // Status filter (based on deadlines or custom status field)
            if (filterStatus !== 'all') {
                // Simple logic: if deadline passed = completed, else active
                // Can be extended with explicit status field
                const deadline = data['project-' + project.id + '-deadline'];
                if (filterStatus === 'completed' && deadline && new Date(deadline) > new Date()) return false;
                if (filterStatus === 'active' && deadline && new Date(deadline) < new Date()) return false;
            }
            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return b.id - a.id;
                case 'date-asc':
                    return a.id - b.id;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'deadline':
                    const dateA = data['project-' + a.id + '-deadline'];
                    const dateB = data['project-' + b.id + '-deadline'];
                    if (!dateA) return 1;
                    if (!dateB) return -1;
                    return new Date(dateA) - new Date(dateB);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // ===== MULTI-MEETING NOTES =====
    let currentMeetingNoteId = null;

    // ===== ISTEKHARA PLANNER =====
    let currentIstekharaId = null;

    function getMeetingNoteList() {
        const data = loadData();
        try { return JSON.parse(data['meetingnote-list'] || '[]'); }
        catch { return []; }
    }

    function saveMeetingNoteList(list) {
        saveField('meetingnote-list', JSON.stringify(list));
    }

    function mnKey(field) {
        return 'mn-' + currentMeetingNoteId + '-' + field;
    }

    function initMeetingNotesPage() {
        const selector = document.getElementById('meetingNoteSelector');
        const addBtn = document.getElementById('btnAddMeetingNote');
        const delBtn = document.getElementById('btnDeleteMeetingNote');
        const addActionBtn = document.getElementById('btnAddMeetingNoteAction');
        if (!selector) return;

        // Migrate old single-meeting data
        let notes = getMeetingNoteList();
        if (notes.length === 0) {
            const data = loadData();
            const oldTitle = data['meeting-title'];
            const id = Date.now();
            const note = { id, title: oldTitle || 'Meeting 1' };
            notes = [note];
            saveMeetingNoteList(notes);
            // Migrate old keys
            const migrateKeys = ['date', 'time', 'duration', 'title', 'attendees', 'agenda', 'notes-content', 'followup'];
            migrateKeys.forEach(k => {
                const oldKey = 'meeting-' + k;
                const oldVal = data[oldKey];
                if (oldVal) saveField('mn-' + id + '-' + k, oldVal);
            });
            // Migrate old action items
            const actions = [];
            for (let i = 1; i <= 5; i++) {
                const text = data['meeting-action' + i] || '';
                const done = data['meeting-action' + i + '-done'] === '1';
                const owner = data['meeting-action' + i + '-owner'] || '';
                const due = data['meeting-action' + i + '-due'] || '';
                if (text || done || owner || due) actions.push({ text, done, owner, due });
            }
            if (actions.length > 0) {
                saveField('mn-' + id + '-actions', JSON.stringify(actions));
            }
        }

        currentMeetingNoteId = notes[0].id;
        renderMeetingNoteSelector();
        loadMeetingNoteData();
        initMeetingFilterSort();

        addBtn.addEventListener('click', () => {
            const list = getMeetingNoteList();
            const id = Date.now();
            list.push({ id, title: 'New Meeting' });
            saveMeetingNoteList(list);
            currentMeetingNoteId = id;
            renderMeetingNoteSelector();
            loadMeetingNoteData();
        });

        delBtn.addEventListener('click', () => {
            const list = getMeetingNoteList();
            if (list.length <= 1) { alert('Cannot delete the only meeting note.'); return; }
            if (!confirm('Delete this meeting note permanently?')) return;
            const data = loadData();
            const prefix = 'mn-' + currentMeetingNoteId + '-';
            Object.keys(data).forEach(k => { if (k.startsWith(prefix)) delete data[k]; });
            saveData(data);
            const idx = list.findIndex(m => m.id === currentMeetingNoteId);
            list.splice(idx, 1);
            saveMeetingNoteList(list);
            currentMeetingNoteId = list[0].id;
            renderMeetingNoteSelector();
            loadMeetingNoteData();
        });

        selector.addEventListener('change', () => {
            currentMeetingNoteId = parseInt(selector.value);
            loadMeetingNoteData();
        });

        if (addActionBtn) {
            addActionBtn.addEventListener('click', () => {
                const actions = getMeetingNoteActions();
                actions.push({ text: '', done: false, owner: '', due: '' });
                saveField(mnKey('actions'), JSON.stringify(actions));
                renderMeetingNoteActions();
            });
        }

        // Auto-save meeting note fields
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('mn-field') && e.target.dataset.mnfield && currentMeetingNoteId) {
                saveField(mnKey(e.target.dataset.mnfield), e.target.value);
                if (e.target.dataset.mnfield === 'title') {
                    const list = getMeetingNoteList();
                    const note = list.find(m => m.id === currentMeetingNoteId);
                    if (note) { note.title = e.target.value || 'Untitled'; saveMeetingNoteList(list); }
                    const opt = document.querySelector('#meetingNoteSelector option[value="' + currentMeetingNoteId + '"]');
                    if (opt) opt.textContent = e.target.value || 'Untitled';
                }
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('mn-field') && e.target.dataset.mnfield && currentMeetingNoteId) {
                saveField(mnKey(e.target.dataset.mnfield), e.target.value);
            }
        });
    }

    function renderMeetingNoteSelector() {
        const selector = document.getElementById('meetingNoteSelector');
        if (!selector) return;
        const list = getFilteredSortedMeetings();
        selector.innerHTML = list.map(m => '<option value="' + m.id + '"' + (m.id === currentMeetingNoteId ? ' selected' : '') + '>' + escapeHtml(m.title) + '</option>').join('');
    }

    function loadMeetingNoteData() {
        const data = loadData();
        document.querySelectorAll('.mn-field').forEach(el => {
            const key = mnKey(el.dataset.mnfield);
            el.value = data[key] || '';
        });
        renderMeetingNoteActions();
    }

    function getMeetingNoteActions() {
        const data = loadData();
        try { return JSON.parse(data[mnKey('actions')] || '[]'); }
        catch { return []; }
    }

    function renderMeetingNoteActions() {
        const container = document.getElementById('meetingNoteActionsList');
        if (!container) return;
        let items = getMeetingNoteActions();
        if (items.length === 0) {
            items = Array.from({ length: 3 }, () => ({ text: '', done: false, owner: '', due: '' }));
            saveField(mnKey('actions'), JSON.stringify(items));
        }
        container.innerHTML = '';
        items.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'action-row';
            div.innerHTML = '<input type="checkbox" data-mna-idx="' + idx + '"' + (item.done ? ' checked' : '') + '>' +
                '<input type="text" class="field-input" data-mna-idx="' + idx + '" data-mna-field="text" value="' + escapeHtml(item.text) + '" style="flex:1" placeholder="Action item">' +
                '<input type="text" class="field-input-sm" data-mna-idx="' + idx + '" data-mna-field="owner" value="' + escapeHtml(item.owner) + '" placeholder="Owner">' +
                '<input type="date" class="field-input-sm" data-mna-idx="' + idx + '" data-mna-field="due" value="' + (item.due || '') + '">' +
                '<button class="btn-remove" data-mna-idx="' + idx + '">&times;</button>';
            container.appendChild(div);
        });

        container.onclick = (e) => {
            if (e.target.classList.contains('btn-remove')) {
                const arr = getMeetingNoteActions();
                if (arr.length <= 1) return;
                arr.splice(parseInt(e.target.dataset.mnaIdx), 1);
                saveField(mnKey('actions'), JSON.stringify(arr));
                renderMeetingNoteActions();
            }
        };
        container.oninput = (e) => {
            if (e.target.dataset.mnaIdx !== undefined && e.target.dataset.mnaField) {
                const arr = getMeetingNoteActions();
                const i = parseInt(e.target.dataset.mnaIdx);
                if (arr[i]) { arr[i][e.target.dataset.mnaField] = e.target.value; saveField(mnKey('actions'), JSON.stringify(arr)); }
            }
        };
        container.onchange = (e) => {
            if (e.target.type === 'checkbox' && e.target.dataset.mnaIdx !== undefined) {
                const arr = getMeetingNoteActions();
                const i = parseInt(e.target.dataset.mnaIdx);
                if (arr[i]) { arr[i].done = e.target.checked; saveField(mnKey('actions'), JSON.stringify(arr)); }
            }
        };
    }

    function initMeetingFilterSort() {
        const searchInput = document.getElementById('meetingSearch');
        const filterYear = document.getElementById('meetingFilterYear');
        const sortBy = document.getElementById('meetingSortBy');

        const applyFilterSort = () => {
            renderMeetingNoteSelector();
        };

        if (searchInput) searchInput.addEventListener('input', applyFilterSort);
        if (filterYear) filterYear.addEventListener('change', applyFilterSort);
        if (sortBy) sortBy.addEventListener('change', applyFilterSort);
    }

    function getFilteredSortedMeetings() {
        const searchTerm = document.getElementById('meetingSearch')?.value.toLowerCase() || '';
        const filterYear = document.getElementById('meetingFilterYear')?.value || 'all';
        const sortBy = document.getElementById('meetingSortBy')?.value || 'date-desc';
        const data = loadData();

        let filtered = getMeetingNoteList().filter(meeting => {
            // Search filter
            if (searchTerm && !meeting.title.toLowerCase().includes(searchTerm)) {
                return false;
            }
            // Year filter
            if (filterYear !== 'all') {
                const date = data['mn-' + meeting.id + '-date'];
                if (date && !date.startsWith(filterYear)) return false;
            }
            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return b.id - a.id;
                case 'date-asc':
                    return a.id - b.id;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // ===== ISTEKHARA PLANNER =====

    function getIstekharaList() {
        const data = loadData();
        try { return JSON.parse(data['istekhara-list'] || '[]'); }
        catch { return []; }
    }

    function saveIstekharaList(list) {
        saveField('istekhara-list', JSON.stringify(list));
    }

    function istekharaKey(field) {
        return 'istekhara-' + currentIstekharaId + '-' + field;
    }

    function istekharaRawKey(id, field) {
        return 'istekhara-' + id + '-' + field;
    }

    function initIstekharaPlanner() {
        const selector = document.getElementById('istekharaSelector');
        const addBtn = document.getElementById('btnAddIstekhara');
        const delBtn = document.getElementById('btnDeleteIstekhara');
        if (!selector) return;

        // Initialize with one entry if empty
        let entries = getIstekharaList();
        if (entries.length === 0) {
            const id = Date.now();
            entries = [{ id, title: 'My First Istekhara' }];
            saveIstekharaList(entries);
        }

        currentIstekharaId = entries[0].id;
        renderIstekharaSelector();
        loadIstekharaData();
        initIstekharaFilterSort();

        addBtn.addEventListener('click', () => {
            const list = getIstekharaList();
            const id = Date.now();
            list.push({ id, title: 'New Istekhara' });
            saveIstekharaList(list);
            currentIstekharaId = id;
            renderIstekharaSelector();
            loadIstekharaData();
        });

        delBtn.addEventListener('click', () => {
            const list = getIstekharaList();
            if (list.length <= 1) { alert('Cannot delete the only entry.'); return; }
            if (!confirm('Delete this istekhara entry permanently?')) return;
            const data = loadData();
            const prefix = 'istekhara-' + currentIstekharaId + '-';
            Object.keys(data).forEach(k => { if (k.startsWith(prefix)) delete data[k]; });
            saveData(data);
            const idx = list.findIndex(e => e.id === currentIstekharaId);
            list.splice(idx, 1);
            saveIstekharaList(list);
            currentIstekharaId = list[0].id;
            renderIstekharaSelector();
            loadIstekharaData();
        });

        selector.addEventListener('change', () => {
            currentIstekharaId = parseInt(selector.value);
            loadIstekharaData();
        });

        // Auto-save istekhara fields
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('istekhara-field') && e.target.dataset.istekharafield && currentIstekharaId) {
                saveField(istekharaKey(e.target.dataset.istekharafield), e.target.value);
                if (e.target.dataset.istekharafield === 'title') {
                    const list = getIstekharaList();
                    const entry = list.find(e => e.id === currentIstekharaId);
                    if (entry) { entry.title = e.target.value || 'Untitled'; saveIstekharaList(list); }
                    const opt = document.querySelector('#istekharaSelector option[value="' + currentIstekharaId + '"]');
                    if (opt) opt.textContent = e.target.value || 'Untitled';
                }
            }
        });
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('istekhara-field') && e.target.dataset.istekharafield && currentIstekharaId) {
                saveField(istekharaKey(e.target.dataset.istekharafield), e.target.value);
            }
        });
    }

    function renderIstekharaSelector() {
        const selector = document.getElementById('istekharaSelector');
        if (!selector) return;
        const list = getFilteredSortedIstekhara();
        selector.innerHTML = list.map(e => '<option value="' + e.id + '"' + (e.id === currentIstekharaId ? ' selected' : '') + '>' + escapeHtml(e.title) + '</option>').join('');
    }

    function loadIstekharaData() {
        const data = loadData();
        document.querySelectorAll('.istekhara-field').forEach(el => {
            const key = istekharaKey(el.dataset.istekharafield);
            el.value = data[key] || '';
        });
    }

    function initIstekharaFilterSort() {
        const searchInput = document.getElementById('istekharaSearch');
        const filterStatus = document.getElementById('istekharaFilterStatus');
        const sortBy = document.getElementById('istekharaSortBy');

        const applyFilterSort = () => {
            renderIstekharaSelector();
        };

        searchInput.addEventListener('input', applyFilterSort);
        filterStatus.addEventListener('change', applyFilterSort);
        sortBy.addEventListener('change', applyFilterSort);
    }

    function getFilteredSortedIstekhara() {
        const searchTerm = document.getElementById('istekharaSearch')?.value.toLowerCase() || '';
        const filterStatus = document.getElementById('istekharaFilterStatus')?.value || 'all';
        const sortBy = document.getElementById('istekharaSortBy')?.value || 'date-desc';
        const data = loadData();

        let filtered = getIstekharaList().filter(entry => {
            // Search filter
            if (searchTerm && !entry.title.toLowerCase().includes(searchTerm)) {
                return false;
            }
            // Status filter
            if (filterStatus !== 'all') {
                const status = data[istekharaRawKey(entry.id, 'status')] || 'pending';
                if (status !== filterStatus) return false;
            }
            return true;
        });

        // Sorting
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'date-desc':
                    return b.id - a.id; // Newest first (by timestamp)
                case 'date-asc':
                    return a.id - b.id; // Oldest first
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // ===== UTILITY =====
    function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ===== EXPOSE RAMADAN FUNCTIONS TO GLOBAL SCOPE =====
    window.changeRamadanDay = changeRamadanDay;
    window.toggleJuz = toggleJuz;
    window.loadJuzDetails = loadJuzDetails;
    window.saveJuzDetails = saveJuzDetails;
    window.deleteJuzNote = function(id) {
        const juz = parseInt(document.getElementById('juzSelect').value);
        if (!juz) return;
        const notes = ramadanData.quran.notes[juz] || [];
        ramadanData.quran.notes[juz] = notes.filter(n => n.id !== id);
        saveRamadanData();
        loadJuzDetails();
    };
    window.saveReadingPlan = saveReadingPlan;
    window.showAddDhikrModal = showAddDhikrModal;
    window.closeDhikrModal = closeDhikrModal;
    window.selectPreset = selectPreset;
    window.saveDhikr = saveDhikr;
    window.deleteDhikr = deleteDhikr;
    window.incrementDhikr = incrementDhikr;
    window.decrementDhikr = decrementDhikr;
    window.resetDhikr = resetDhikr;

    // ===== NOTIFICATION SYSTEM =====
    let notificationManager = null;

    function initNotificationManager() {
        if (typeof NotificationManager !== 'undefined') {
            notificationManager = new NotificationManager();
            notificationManager.initialize();
        } else {
            console.warn('NotificationManager not available');
        }
    }

    function initNotificationSettings() {
        const enableBtn = document.getElementById('btnEnableNotifications');
        const notifSettings = document.getElementById('notificationSettings');

        if (enableBtn && notifSettings) {
            enableBtn.addEventListener('click', async () => {
                if (!notificationManager) {
                    notificationManager = new NotificationManager();
                }

                const granted = await notificationManager.requestPermission();
                if (granted) {
                    notifSettings.style.display = 'block';
                    enableBtn.textContent = 'Notifications Enabled';
                    enableBtn.disabled = true;
                    populateNotificationSettings();
                }
            });
        }

        // Check if already enabled
        if (notificationManager && notificationManager.permission === 'granted') {
            notifSettings.style.display = 'block';
            if (enableBtn) {
                enableBtn.textContent = 'Notifications Enabled';
                enableBtn.disabled = true;
            }
            populateNotificationSettings();
        }

        // Bind notification setting controls
        bindNotificationControls();
    }

    function populateNotificationSettings() {
        if (!notificationManager) return;

        const settings = notificationManager.settings;

        const prayerEnabled = document.getElementById('notifPrayerEnabled');
        const prayerOffset = document.getElementById('notifPrayerOffset');
        const fastingEnabled = document.getElementById('notifFastingEnabled');
        const dailyReviewEnabled = document.getElementById('notifDailyReviewEnabled');
        const dailyReviewTime = document.getElementById('notifDailyReviewTime');
        const soundEnabled = document.getElementById('notifSoundEnabled');

        if (prayerEnabled) prayerEnabled.checked = settings.prayerEnabled;
        if (prayerOffset) prayerOffset.value = settings.prayerOffset;
        if (fastingEnabled) fastingEnabled.checked = settings.fastingEnabled;
        if (dailyReviewEnabled) dailyReviewEnabled.checked = settings.dailyReviewEnabled;
        if (dailyReviewTime) dailyReviewTime.value = settings.dailyReviewTime;
        if (soundEnabled) soundEnabled.checked = settings.soundEnabled;
    }

    function bindNotificationControls() {
        if (!notificationManager) return;

        const prayerEnabled = document.getElementById('notifPrayerEnabled');
        const prayerOffset = document.getElementById('notifPrayerOffset');
        const fastingEnabled = document.getElementById('notifFastingEnabled');
        const dailyReviewEnabled = document.getElementById('notifDailyReviewEnabled');
        const dailyReviewTime = document.getElementById('notifDailyReviewTime');
        const soundEnabled = document.getElementById('notifSoundEnabled');

        if (prayerEnabled) {
            prayerEnabled.addEventListener('change', (e) => {
                notificationManager.updateSetting('prayerEnabled', e.target.checked);
            });
        }

        if (prayerOffset) {
            prayerOffset.addEventListener('change', (e) => {
                notificationManager.updateSetting('prayerOffset', parseInt(e.target.value) || 0);
            });
        }

        if (fastingEnabled) {
            fastingEnabled.addEventListener('change', (e) => {
                notificationManager.updateSetting('fastingEnabled', e.target.checked);
            });
        }

        if (dailyReviewEnabled) {
            dailyReviewEnabled.addEventListener('change', (e) => {
                notificationManager.updateSetting('dailyReviewEnabled', e.target.checked);
            });
        }

        if (dailyReviewTime) {
            dailyReviewTime.addEventListener('change', (e) => {
                notificationManager.updateSetting('dailyReviewTime', e.target.value);
            });
        }

        if (soundEnabled) {
            soundEnabled.addEventListener('change', (e) => {
                notificationManager.updateSetting('soundEnabled', e.target.checked);
            });
        }
    }

    // ===== ANALYTICS & REPORTS NAVIGATION =====
    // Note: Navigation is handled by main initNavigation() function
    // These functions are called when analytics/reports pages are shown

    function initAnalyticsPage() {
        console.log('Initializing Analytics page...');
        if (window.AnalyticsCalculator && window.ChartRenderer) {
            const calculator = new AnalyticsCalculator();
            const renderer = new ChartRenderer();

            // Set default time range (week)
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);

            // Load analytics data
            loadAndRenderAnalytics(calculator, renderer, startDate, endDate);

            // Bind time range buttons
            bindAnalyticsControls(calculator, renderer);

            // Bind Hifz Journey link
            const hifzViewLink = document.querySelector('.hifz-view-link');
            if (hifzViewLink) {
                hifzViewLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const hifzPage = document.querySelector('[data-page="hifz-journey"]');
                    if (hifzPage) {
                        hifzPage.click();
                    }
                });
            }

            // Bind export button
            const exportBtn = document.getElementById('exportAnalyticsBtn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    if (window.PdfExporter) {
                        const exporter = new PdfExporter();
                        exporter.exportToPDF(
                            document.getElementById('keyInsightsList').innerHTML,
                            'barakah-analytics-' + new Date().toISOString().split('T')[0] + '.pdf'
                        );
                    }
                });
            }
        }
    }

    function loadAndRenderAnalytics(calculator, renderer, startDate, endDate) {
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        // Calculate analytics
        const prayerData = calculator.calculatePrayerConsistency(startDateStr, endDateStr);
        const habitData = calculator.calculateHabitStreaks(startDate.getFullYear(), startDate.getMonth());
        const productivityData = calculator.calculateProductivityPatterns(startDateStr, endDateStr);
        const bioData = calculator.calculateBioDataTrends(startDateStr, endDateStr);

        // Render charts
        renderer.renderPrayerChart('prayerChart', prayerData);
        renderer.renderHabitChart('habitChart', habitData);
        renderer.renderProductivityChart('productivityChart', productivityData);
        renderer.renderBioDataChart('bioDataChart', bioData);

        // Update insights
        updateKeyInsights(calculator, startDateStr, endDateStr);

        // Update Hifz Journey widget
        updateHifzJourneyWidget();
    }

    function updateHifzJourneyWidget() {
        const hifzTotal = document.getElementById('hifzAnalyticsTotal');
        const hifzPercent = document.getElementById('hifzAnalyticsPercent');
        const hifzJuz = document.getElementById('hifzAnalyticsJuz');
        const hifzStreak = document.getElementById('hifzAnalyticsStreak');
        const hifzBar = document.getElementById('hifzAnalyticsBar');

        if (!hifzTotal) return;

        try {
            const hifzProgress = JSON.parse(localStorage.getItem('hifz-progress') || '{}');
            const totalMemorized = hifzProgress.totalMemorized || 0;
            const juzCompleted = hifzProgress.juzCompleted?.length || 0;
            const streak = hifzProgress.streak || 0;
            const percent = Math.min((totalMemorized / 6236) * 100, 100);

            if (hifzTotal) hifzTotal.textContent = totalMemorized.toLocaleString();
            if (hifzPercent) hifzPercent.textContent = Math.round(percent) + '%';
            if (hifzJuz) hifzJuz.textContent = juzCompleted;
            if (hifzStreak) hifzStreak.textContent = streak;
            if (hifzBar) hifzBar.style.width = percent + '%';
        } catch (error) {
            console.error('Error loading Hifz data:', error);
        }
    }

    function updateKeyInsights(calculator, startDate, endDate) {
        const insightsList = document.getElementById('keyInsightsList');
        if (!insightsList) return;

        const insights = calculator.getKeyInsights(startDate, endDate);

        if (insights.length === 0) {
            insightsList.innerHTML = `
                <div class="insight-item">
                    <span class="insight-icon">&#128300;</span>
                    <span class="insight-text">No data available for the selected time range. Start tracking to see insights!</span>
                </div>
            `;
            return;
        }

        insightsList.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <span class="insight-icon">${insight.icon}</span>
                <span class="insight-text">${insight.text}</span>
            </div>
        `).join('');
    }

    function bindAnalyticsControls(calculator, renderer) {
        const timeRangeBtns = document.querySelectorAll('.time-range-btn');
        const customDateRange = document.getElementById('customDateRange');
        const startDateInput = document.getElementById('analyticsStartDate');
        const endDateInput = document.getElementById('analyticsEndDate');
        const applyBtn = document.getElementById('applyCustomRange');

        timeRangeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                timeRangeBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const range = e.target.dataset.range;
                let startDate, endDate;

                switch (range) {
                    case 'week':
                        endDate = new Date();
                        startDate = new Date();
                        startDate.setDate(startDate.getDate() - 7);
                        customDateRange.style.display = 'none';
                        break;
                    case 'month':
                        endDate = new Date();
                        startDate = new Date();
                        startDate.setMonth(startDate.getMonth() - 1);
                        customDateRange.style.display = 'none';
                        break;
                    case 'quarter':
                        endDate = new Date();
                        startDate = new Date();
                        startDate.setMonth(startDate.getMonth() - 3);
                        customDateRange.style.display = 'none';
                        break;
                    case 'custom':
                        customDateRange.style.display = 'flex';
                        return; // Don't reload yet
                }

                loadAndRenderAnalytics(calculator, renderer, startDate, endDate);
            });
        });

        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                const startDate = new Date(startDateInput.value);
                const endDate = new Date(endDateInput.value);

                if (startDate && endDate && startDate <= endDate) {
                    loadAndRenderAnalytics(calculator, renderer, startDate, endDate);
                } else {
                    alert('Please select a valid date range');
                }
            });
        }

        // Set default custom range values
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        if (startDateInput) startDateInput.value = weekAgo.toISOString().split('T')[0];
        if (endDateInput) endDateInput.value = today.toISOString().split('T')[0];
    }

    function initReportsPage() {
        console.log('Initializing Reports page...');
        if (window.ReportGenerator && window.PdfExporter) {
            const generator = new ReportGenerator();
            const exporter = new PdfExporter();

            // Set default dates
            setDefaultReportDates();

            // Bind report generation buttons
            bindReportControls(generator, exporter);
        }
    }

    function setDefaultReportDates() {
        // Set week start to most recent Monday
        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const thisMonday = new Date(today);
        thisMonday.setDate(today.getDate() + mondayOffset);

        const weekStartInput = document.getElementById('reportWeekStart');
        if (weekStartInput) {
            weekStartInput.value = thisMonday.toISOString().split('T')[0];
        }

        // Set month to current month
        const currentMonth = new Date();
        const monthStr = currentMonth.toISOString().slice(0, 7); // YYYY-MM

        const monthInput = document.getElementById('reportMonth');
        if (monthInput) {
            monthInput.value = monthStr;
        }

        // Set custom range defaults
        const startDateInput = document.getElementById('reportCustomStart');
        const endDateInput = document.getElementById('reportCustomEnd');
        if (startDateInput) startDateInput.value = thisMonday.toISOString().split('T')[0];
        if (endDateInput) endDateInput.value = today.toISOString().split('T')[0];
    }

    function bindReportControls(generator, exporter) {
        const weeklyBtn = document.getElementById('generateWeeklyReport');
        const monthlyBtn = document.getElementById('generateMonthlyReport');
        const customBtn = document.getElementById('generateCustomReport');
        const exportPdfBtn = document.getElementById('exportPdfBtn');

        if (weeklyBtn) {
            weeklyBtn.addEventListener('click', () => {
                const weekStart = document.getElementById('reportWeekStart').value;
                if (weekStart) {
                    const report = generator.generateWeeklyReport(weekStart);
                    displayReport(report);
                }
            });
        }

        if (monthlyBtn) {
            monthlyBtn.addEventListener('click', () => {
                const month = document.getElementById('reportMonth').value;
                if (month) {
                    const [year, monthNum] = month.split('-');
                    const report = generator.generateMonthlyReport(year, monthNum);
                    displayReport(report);
                }
            });
        }

        if (customBtn) {
            customBtn.addEventListener('click', () => {
                const start = document.getElementById('reportCustomStart').value;
                const end = document.getElementById('reportCustomEnd').value;
                if (start && end) {
                    const report = generator.generateCustomReport(start, end);
                    displayReport(report);
                }
            });
        }

        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                const reportContent = document.getElementById('reportContent');
                const reportTitle = document.getElementById('reportTitle');
                if (reportContent && reportTitle) {
                    const filename = 'barakah-' + reportTitle.textContent.toLowerCase().replace(/\s+/g, '-') + '.pdf';
                    exporter.exportToPDF(reportContent.innerHTML, filename);
                }
            });
        }

        // Print button
        const printBtn = document.getElementById('printReportBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                const reportContent = document.getElementById('reportContent');
                const reportTitle = document.getElementById('reportTitle');
                if (reportContent && reportTitle && exporter) {
                    exporter.printContent(reportContent.innerHTML, reportTitle.textContent);
                }
            });
        }

        // Report type selector
        document.querySelectorAll('.report-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.report-type-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const type = e.target.dataset.type;
                document.getElementById('reportDateSelector').style.display = type === 'weekly' ? 'flex' : 'none';
                document.getElementById('reportMonthSelector').style.display = type === 'monthly' ? 'flex' : 'none';
                document.getElementById('reportCustomSelector').style.display = type === 'custom' ? 'flex' : 'none';
            });
        });

        // Quick report buttons
        const thisWeekBtn = document.getElementById('thisWeekReportBtn');
        const lastWeekBtn = document.getElementById('lastWeekReportBtn');
        const thisMonthBtn = document.getElementById('thisMonthReportBtn');
        const lastMonthBtn = document.getElementById('lastMonthReportBtn');

        if (thisWeekBtn) {
            thisWeekBtn.addEventListener('click', () => {
                const today = new Date();
                const dayOfWeek = today.getDay();
                const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                const thisMonday = new Date(today);
                thisMonday.setDate(today.getDate() + mondayOffset);

                const report = generator.generateWeeklyReport(thisMonday.toISOString().split('T')[0]);
                displayReport(report);
            });
        }

        if (lastWeekBtn) {
            lastWeekBtn.addEventListener('click', () => {
                const today = new Date();
                const dayOfWeek = today.getDay();
                const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                const lastMonday = new Date(today);
                lastMonday.setDate(today.getDate() + mondayOffset - 7);

                const report = generator.generateWeeklyReport(lastMonday.toISOString().split('T')[0]);
                displayReport(report);
            });
        }

        if (thisMonthBtn) {
            thisMonthBtn.addEventListener('click', () => {
                const now = new Date();
                const report = generator.generateMonthlyReport(now.getFullYear(), now.getMonth() + 1);
                displayReport(report);
            });
        }

        if (lastMonthBtn) {
            lastMonthBtn.addEventListener('click', () => {
                const now = new Date();
                const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const report = generator.generateMonthlyReport(lastMonth.getFullYear(), lastMonth.getMonth() + 1);
                displayReport(report);
            });
        }
    }

    function displayReport(report) {
        const preview = document.getElementById('reportPreview');
        const content = document.getElementById('reportContent');
        const title = document.getElementById('reportTitle');

        if (preview && content) {
            // Handle both report object and raw HTML
            if (typeof report === 'object' && report.title && report.content) {
                if (title) title.textContent = report.title;
                content.innerHTML = report.content;
            } else {
                content.innerHTML = report;
            }
            preview.style.display = 'block';
        }
    }

    // Note: Analytics and Reports pages are initialized via initNavigation() when clicked

    // ===== DAILY DUA TRACKER =====
    const DAILY_DUAS = [
        // Upon Waking
        { id: 'dua-1', time: 'Upon Waking', label: 'Waking Supplication', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur', translation: 'Praise be to Allah who gave us life after death and unto Him is the resurrection', target: 1, reference: 'Bukhari 6312' },
        { id: 'dua-2', time: 'Upon Waking', label: 'Morning Shahada', arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir', translation: 'There is no god but Allah alone with no partner; His is the dominion, His is the praise, and He has power over all things', target: 1, reference: 'Bukhari 6306' },
        { id: 'dua-3', time: 'Upon Waking', label: 'Gratitude for Health', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ', transliteration: 'Alhamdu lillahil-ladhi \'afani fi jasadi wa radda \'alayya ruhi wa adhina li bi-dhikrih', translation: 'Praise be to Allah who restored my body, returned my soul, and permitted me to remember Him', target: 1, reference: 'Tirmidhi 3401' },
        { id: 'dua-4', time: 'Upon Waking', label: 'Ayat al-Kursi (Morning)', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum... (Ayat al-Kursi)', translation: 'Allah — there is no god except Him, the Ever-Living, the Sustainer of existence (2:255)', target: 1, reference: 'Bukhari 5010' },
        { id: 'dua-5', time: 'Upon Waking', label: 'Three Quls (Morning)', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ / قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Surah Al-Ikhlas, Al-Falaq, An-Nas — blow on hands and wipe body', translation: 'Recite the three Quls, blow into palms, and wipe over body', target: 3, reference: 'Bukhari 5017' },

        // After Fajr / Morning Adhkar
        { id: 'dua-6', time: 'Morning Adhkar', label: 'SubhanAllahi wa bihamdihi', arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllahi wa bihamdihi', translation: 'Glory and praise be to Allah', target: 100, reference: 'Muslim 2692' },
        { id: 'dua-7', time: 'Morning Adhkar', label: 'Tahlil', arabic: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir', translation: 'None has the right to be worshipped but Allah alone, no partner has He...', target: 10, reference: 'Bukhari 6403' },
        { id: 'dua-8', time: 'Morning Adhkar', label: 'Post-Salah Tasbih', arabic: 'سُبْحَانَ اللهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللهُ أَكْبَرُ (٣٤)', transliteration: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (34)', translation: 'Glory be to Allah, Praise be to Allah, Allah is the Greatest', target: 1, reference: 'Muslim 597' },
        { id: 'dua-9', time: 'Morning Adhkar', label: 'Beneficial Knowledge', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا', transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an wa rizqan tayyiban wa \'amalan mutaqabbala', translation: 'O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds', target: 1, reference: 'Ibn Majah 925' },
        { id: 'dua-10', time: 'Morning Adhkar', label: 'Protection from Worry', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ', transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan wal-\'ajzi wal-kasal', translation: 'O Allah, I seek refuge in You from worry, grief, weakness, and laziness', target: 1, reference: 'Abu Dawud 1555' },
        { id: 'dua-11', time: 'Morning Adhkar', label: 'Allah is Sufficient', arabic: 'حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', transliteration: 'Hasbiyallahu la ilaha illa huwa \'alayhi tawakkaltu wa huwa rabbul-\'arshil-\'azim', translation: 'Allah is sufficient for me; there is no god but Him. I put my trust in Him, He is Lord of the Mighty Throne', target: 7, reference: 'Abu Dawud 5081' },
        { id: 'dua-12', time: 'Morning Adhkar', label: 'Post-Salah Istighfar', arabic: 'أَسْتَغْفِرُ اللهَ', transliteration: 'Astaghfirullah', translation: 'I seek forgiveness from Allah', target: 3, reference: 'Muslim 591' },
        { id: 'dua-13', time: 'Morning Adhkar', label: 'Protection from Harm', arabic: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim', translation: 'In the name of Allah with whose name nothing on earth or in heaven can harm, and He is the All-Hearing, the All-Knowing', target: 3, reference: 'Abu Dawud 5088' },
        { id: 'dua-14', time: 'Morning Adhkar', label: 'Pleased with Allah', arabic: 'رَضِيتُ بِاللهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ نَبِيًّا', transliteration: 'Raditu billahi rabba, wa bil-islami dina, wa bi-Muhammadin nabiyya', translation: 'I am pleased with Allah as Lord, Islam as religion, and Muhammad as Prophet', target: 3, reference: 'Abu Dawud 5072' },
        { id: 'dua-15', time: 'Morning Adhkar', label: 'Salawat (Morning)', arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', transliteration: 'Allahumma salli wa sallim \'ala nabiyyina Muhammad', translation: 'O Allah, send blessings and peace upon our Prophet Muhammad ﷺ', target: 10, reference: 'Tabarani' },

        // Before/After Meals
        { id: 'dua-16', time: 'Meals', label: 'Before Eating', arabic: 'بِسْمِ اللهِ', transliteration: 'Bismillah', translation: 'In the name of Allah', target: 1, reference: 'Abu Dawud 3767' },
        { id: 'dua-17', time: 'Meals', label: 'After Eating', arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', transliteration: 'Alhamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin', translation: 'Praise be to Allah who fed us, gave us drink, and made us Muslims', target: 1, reference: 'Tirmidhi 3457' },
        { id: 'dua-18', time: 'Meals', label: 'Barakah in Food', arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', transliteration: 'Allahumma barik lana fima razaqtana wa qina \'adhaban-nar', translation: 'O Allah, bless us in what You have provided and protect us from the Fire', target: 1, reference: 'Abu Dawud' },

        // Throughout the Day
        { id: 'dua-19', time: 'Throughout Day', label: 'Heavy on Scales', arabic: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ', transliteration: 'SubhanAllahi wa bihamdihi, SubhanAllahil-\'Azim', translation: 'Glory and praise be to Allah, glory be to Allah the Almighty — two words heavy on the scales', target: 100, reference: 'Bukhari 6406' },
        { id: 'dua-20', time: 'Throughout Day', label: 'Treasure of Jannah', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ', transliteration: 'La hawla wa la quwwata illa billah', translation: 'There is no power nor strength except with Allah — a treasure from the treasures of Jannah', target: 10, reference: 'Bukhari 4205' },
        { id: 'dua-21', time: 'Throughout Day', label: 'Seeking Forgiveness', arabic: 'أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ', transliteration: 'Astaghfirullaha wa atubu ilayh', translation: 'I seek forgiveness from Allah and repent to Him', target: 100, reference: 'Bukhari 6307' },
        { id: 'dua-22', time: 'Throughout Day', label: 'Salawat (Day)', arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', transliteration: 'Allahumma salli wa sallim \'ala nabiyyina Muhammad', translation: 'O Allah, send blessings and peace upon our Prophet Muhammad ﷺ', target: 10, reference: 'Tirmidhi 2457' },

        // Evening Adhkar
        { id: 'dua-23', time: 'Evening Adhkar', label: 'Evening Supplication', arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', transliteration: 'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilaykal-masir', translation: 'O Allah, by You we enter the evening, by You we enter the morning, by You we live and die, and to You is the return', target: 1, reference: 'Abu Dawud 5068' },
        { id: 'dua-24', time: 'Evening Adhkar', label: 'Protection from Evil', arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', transliteration: 'A\'udhu bi-kalimatillahit-tammati min sharri ma khalaq', translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created', target: 3, reference: 'Muslim 2709' },
        { id: 'dua-25', time: 'Evening Adhkar', label: 'Knower of the Unseen', arabic: 'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ', transliteration: 'Allahumma \'alimal-ghaybi wash-shahadati fatiras-samawati wal-ard', translation: 'O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth', target: 1, reference: 'Tirmidhi 3392' },
        { id: 'dua-26', time: 'Evening Adhkar', label: 'Surah Al-Mulk', arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', transliteration: 'Surah Al-Mulk (67) — full recitation', translation: 'Blessed is He in whose hand is the dominion, and He has power over all things', target: 1, reference: 'Tirmidhi 2891' },
        { id: 'dua-27', time: 'Evening Adhkar', label: 'Protection from Deeds', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ', transliteration: 'Allahumma inni a\'udhu bika min sharri ma \'amiltu wa min sharri ma lam a\'mal', translation: 'O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done', target: 1, reference: 'Muslim 2716' },

        // Before Sleep
        { id: 'dua-28', time: 'Before Sleep', label: 'Sleep Supplication', arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', transliteration: 'Bismika Allahumma amutu wa ahya', translation: 'In Your name, O Allah, I die and I live', target: 1, reference: 'Bukhari 6312' },
        { id: 'dua-29', time: 'Before Sleep', label: 'Protection from Punishment', arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', transliteration: 'Allahumma qini \'adhabaka yawma tab\'athu \'ibadak', translation: 'O Allah, save me from Your punishment on the Day You resurrect Your servants', target: 1, reference: 'Abu Dawud 5045' },
        { id: 'dua-30', time: 'Before Sleep', label: 'Three Quls (Night)', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ / قُلْ أَعُوذُ بِرَبِّ النَّاسِ', transliteration: 'Surah Al-Ikhlas, Al-Falaq, An-Nas — blow on hands and wipe body', translation: 'Recite the three Quls, blow into palms, and wipe over body', target: 3, reference: 'Bukhari 5017' },
        { id: 'dua-31', time: 'Before Sleep', label: 'Ayat al-Kursi (Night)', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum... (Ayat al-Kursi)', translation: 'Allah — there is no god except Him, the Ever-Living, the Sustainer — protection through the night', target: 1, reference: 'Bukhari 5010' },
        { id: 'dua-32', time: 'Before Sleep', label: 'Sleep Tasbih', arabic: 'سُبْحَانَ اللهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللهُ أَكْبَرُ (٣٤)', transliteration: 'SubhanAllah (33), Alhamdulillah (33), Allahu Akbar (34)', translation: 'Glory be to Allah, Praise be to Allah, Allah is the Greatest — before sleep tasbih', target: 1, reference: 'Bukhari 5362' }
    ];

    const TIME_ICONS = {
        'Upon Waking': '\u{1F31F}',
        'Morning Adhkar': '\u2600\uFE0F',
        'Meals': '\u{1F372}',
        'Throughout Day': '\u{1F4FF}',
        'Evening Adhkar': '\u{1F319}',
        'Before Sleep': '\u{1F303}'
    };

    let currentDuaDate = new Date();

    function formatDuaDateKey(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return y + '-' + m + '-' + d;
    }

    function formatDuaDateLabel(date) {
        const today = new Date();
        const todayKey = formatDuaDateKey(today);
        const dateKey = formatDuaDateKey(date);
        if (dateKey === todayKey) return 'Today — ' + date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }

    function loadDuaData(dateKey) {
        try {
            const all = JSON.parse(localStorage.getItem(STORAGE_KEY + '-duas') || '{}');
            return all[dateKey] || {};
        } catch { return {}; }
    }

    function saveDuaData(dateKey, counts) {
        try {
            const all = JSON.parse(localStorage.getItem(STORAGE_KEY + '-duas') || '{}');
            all[dateKey] = counts;
            localStorage.setItem(STORAGE_KEY + '-duas', JSON.stringify(all));
        } catch (e) {
            console.error('Error saving dua data:', e);
        }
    }

    function renderDuaSections() {
        const container = document.getElementById('duaSections');
        if (!container) return;

        const dateKey = formatDuaDateKey(currentDuaDate);
        const counts = loadDuaData(dateKey);

        // Group duas by time
        const groups = {};
        DAILY_DUAS.forEach(dua => {
            if (!groups[dua.time]) groups[dua.time] = [];
            groups[dua.time].push(dua);
        });

        let completedCount = 0;
        const totalCount = DAILY_DUAS.length;

        let html = '';
        const timeOrder = ['Upon Waking', 'Morning Adhkar', 'Meals', 'Throughout Day', 'Evening Adhkar', 'Before Sleep'];

        timeOrder.forEach(time => {
            const duas = groups[time];
            if (!duas) return;
            const icon = TIME_ICONS[time] || '';

            html += '<div class="dua-time-section">';
            html += '<h2 class="dua-time-title">' + icon + ' ' + time + '</h2>';

            duas.forEach(dua => {
                const current = counts[dua.id] || 0;
                const isComplete = current >= dua.target;
                if (isComplete) completedCount++;

                html += '<div class="dua-card' + (isComplete ? ' completed' : '') + '">';
                html += '<div class="dua-arabic" dir="rtl">' + dua.arabic + '</div>';
                html += '<div class="dua-transliteration">' + dua.transliteration + '</div>';
                html += '<div class="dua-translation">' + dua.translation + '</div>';
                html += '<div class="dua-reference">' + dua.reference + '</div>';
                html += '<div class="dua-counter-row">';
                html += '<button class="dua-counter-btn" onclick="duaDecrement(\'' + dua.id + '\')">−</button>';
                html += '<span class="dua-count">' + current + '</span>';
                html += '<span class="dua-target">/ ' + dua.target + '</span>';
                html += '<button class="dua-counter-btn" onclick="duaIncrement(\'' + dua.id + '\')">+</button>';
                html += '<button class="dua-counter-btn" onclick="duaReset(\'' + dua.id + '\')" title="Reset">\u21BA</button>';
                html += '</div>';
                if (isComplete) {
                    html += '<div class="dua-card-check">\u2713 Target reached!</div>';
                }
                html += '</div>';
            });

            html += '</div>';
        });

        container.innerHTML = html;

        // Update progress
        const progressText = document.getElementById('duaProgressText');
        const progressFill = document.getElementById('duaProgressFill');
        if (progressText) progressText.textContent = completedCount + ' / ' + totalCount + ' completed';
        if (progressFill) progressFill.style.width = Math.round((completedCount / totalCount) * 100) + '%';

        // Update date label
        const dateLabel = document.getElementById('duaDateLabel');
        if (dateLabel) dateLabel.textContent = formatDuaDateLabel(currentDuaDate);
    }

    function duaIncrement(id) {
        const dateKey = formatDuaDateKey(currentDuaDate);
        const counts = loadDuaData(dateKey);
        const dua = DAILY_DUAS.find(d => d.id === id);
        if (!dua) return;
        counts[id] = Math.min((counts[id] || 0) + 1, dua.target * 10);
        saveDuaData(dateKey, counts);
        renderDuaSections();
    }

    function duaDecrement(id) {
        const dateKey = formatDuaDateKey(currentDuaDate);
        const counts = loadDuaData(dateKey);
        counts[id] = Math.max((counts[id] || 0) - 1, 0);
        saveDuaData(dateKey, counts);
        renderDuaSections();
    }

    function duaReset(id) {
        const dateKey = formatDuaDateKey(currentDuaDate);
        const counts = loadDuaData(dateKey);
        counts[id] = 0;
        saveDuaData(dateKey, counts);
        renderDuaSections();
    }

    function initDailyDua() {
        console.log('Initializing Daily Dua Tracker...');

        const prevBtn = document.getElementById('duaPrevDay');
        const nextBtn = document.getElementById('duaNextDay');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentDuaDate.setDate(currentDuaDate.getDate() - 1);
                renderDuaSections();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentDuaDate.setDate(currentDuaDate.getDate() + 1);
                renderDuaSections();
            });
        }

        renderDuaSections();
        console.log('Daily Dua Tracker initialized successfully');
    }

    // Expose dua functions globally for onclick handlers
    window.duaIncrement = duaIncrement;
    window.duaDecrement = duaDecrement;
    window.duaReset = duaReset;

    // ===== RAMADAN ANALYTICS INITIALIZATION =====
    function initRamadanAnalytics() {
        console.log('Initializing Ramadan Analytics...');

        // Initialize trackers
        const dailyRoutine = new RamadanDailyRoutine();
        const spiritualTracker = new SpiritualProgressTracker();
        const ramadanInsights = new RamadanInsights();

        // Make them globally accessible
        window.ramadanDailyRoutine = dailyRoutine;
        window.spiritualProgressTracker = spiritualTracker;
        window.ramadanInsights = ramadanInsights;

        // Initialize tab switching for Ramadan analytics
        const tabButtons = document.querySelectorAll('.ramadan-tab-btn');
        const tabContents = {
            routine: document.getElementById('routineTab'),
            progress: document.getElementById('progressTab'),
            insights: document.getElementById('insightsTab')
        };

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;

                // Update active button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show corresponding content
                Object.keys(tabContents).forEach(key => {
                    if (tabContents[key]) {
                        tabContents[key].style.display = key === tabName ? 'block' : 'none';
                    }
                });

                // Render content based on tab
                renderRamadanTabContent(tabName);
            });
        });

        // Initialize routine checkbox handlers
        initRoutineCheckboxHandlers();

        // Initial render
        renderRamadanTabContent('routine');

        console.log('Ramadan Analytics initialized successfully');
    }

    function renderRamadanTabContent(tabName) {
        const dailyRoutine = window.ramadanDailyRoutine;
        const spiritualTracker = window.spiritualProgressTracker;
        const ramadanInsights = window.ramadanInsights;

        if (!dailyRoutine || !spiritualTracker || !ramadanInsights) {
            console.warn('Ramadan trackers not initialized yet');
            return;
        }

        switch(tabName) {
            case 'routine':
                const timelineContainer = document.getElementById('ramadanTimelineContainer');
                if (timelineContainer) {
                    timelineContainer.innerHTML = dailyRoutine.renderFullTimeline();
                }
                break;

            case 'progress':
                const progressContainer = document.getElementById('spiritualProgressContainer');
                if (progressContainer) {
                    progressContainer.innerHTML = spiritualTracker.renderProgressDashboard();
                }
                break;

            case 'insights':
                const insightsContainer = document.getElementById('ramadanInsightsContainer');
                if (insightsContainer) {
                    insightsContainer.innerHTML = ramadanInsights.renderInsightsDashboard();
                }
                break;
        }

        // Re-initialize checkbox handlers after rendering
        initRoutineCheckboxHandlers();
    }

    function initRoutineCheckboxHandlers() {
        const dailyRoutine = window.ramadanDailyRoutine;
        if (!dailyRoutine) return;

        const checkboxes = document.querySelectorAll('.routine-check-btn');
        checkboxes.forEach(checkbox => {
            // Remove existing listeners to prevent duplicates
            checkbox.replaceWith(checkbox.cloneNode(true));
        });

        // Re-select after cloning
        const newCheckboxes = document.querySelectorAll('.routine-check-btn');
        newCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                const itemId = checkbox.dataset.itemId;
                const isComplete = dailyRoutine.isRoutineItemComplete(itemId);

                if (isComplete) {
                    dailyRoutine.markRoutineItemIncomplete(itemId);
                    checkbox.classList.remove('completed');
                    checkbox.innerHTML = '○';
                } else {
                    dailyRoutine.markRoutineItemComplete(itemId);
                    checkbox.classList.add('completed');
                    checkbox.innerHTML = '✓';
                }

                // Update section progress
                updateSectionProgress();
            });
        });
    }

    function updateSectionProgress() {
        const dailyRoutine = window.ramadanDailyRoutine;
        if (!dailyRoutine) return;

        const sections = document.querySelectorAll('.routine-section');
        sections.forEach(section => {
            const progressBar = section.querySelector('.progress-fill');
            const progressText = section.querySelector('.progress-text');
            const items = section.querySelectorAll('.routine-check-btn');

            if (items.length > 0) {
                let completed = 0;
                items.forEach(item => {
                    if (item.classList.contains('completed')) {
                        completed++;
                    }
                });

                const percentage = Math.round((completed / items.length) * 100);
                if (progressBar) {
                    progressBar.style.width = percentage + '%';
                }
                if (progressText) {
                    progressText.textContent = percentage + '%';
                }
            }
        });
    }

    // Expose Ramadan analytics functions globally
    window.renderRamadanTabContent = renderRamadanTabContent;
    window.updateSectionProgress = updateSectionProgress;

    // ===== PROPHETIC DAILY ROUTINE INITIALIZATION =====
    let propheticRoutineInstance = null;
    let selectedPropheticDate = new Date();

    function initPropheticRoutinePage() {
        console.log('Initializing Prophetic Routine page...');

        // Ensure selectedPropheticDate is set
        if (!selectedPropheticDate) {
            selectedPropheticDate = new Date();
        }

        // Initialize PropheticDailyRoutine
        if (window.PropheticDailyRoutine) {
            propheticRoutineInstance = new window.PropheticDailyRoutine();
            window.propheticRoutineInstance = propheticRoutineInstance; // Make globally accessible
            console.log('Prophetic routine instance created:', propheticRoutineInstance);
        } else {
            console.error('PropheticDailyRoutine class not found!');
            return;
        }

        // Set date input to today
        const dateInput = document.getElementById('propheticDateInput');
        if (dateInput) {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            dateInput.value = dateStr;
            selectedPropheticDate = today;
            console.log('Date input set to:', dateStr);

            // Store the event handler function to avoid duplicates
            if (!dateInput._propheticDateHandlerAttached) {
                dateInput._propheticDateHandlerAttached = true;

                // Use 'input' event for instant feedback as user types/changes
                dateInput.addEventListener('input', (e) => {
                    console.log('Date input event triggered, value:', e.target.value);
                    if (e.target.value) {
                        selectedPropheticDate = new Date(e.target.value + 'T12:00:00');
                        console.log('Date changed to:', selectedPropheticDate);
                        renderPropheticRoutine();
                    }
                });

                // Also listen for change event as backup
                dateInput.addEventListener('change', (e) => {
                    console.log('Date change event triggered, value:', e.target.value);
                    if (e.target.value) {
                        selectedPropheticDate = new Date(e.target.value + 'T12:00:00');
                        console.log('Date changed to:', selectedPropheticDate);
                        renderPropheticRoutine();
                    }
                });
            }
        } else {
            console.log('Date input element not found');
        }

        // Today button
        const todayBtn = document.getElementById('propheticTodayBtn');
        if (todayBtn) {
            // Store the event handler function to avoid duplicates
            if (!todayBtn._propheticTodayHandlerAttached) {
                todayBtn._propheticTodayHandlerAttached = true;

                todayBtn.addEventListener('click', () => {
                    console.log('Today button clicked');
                    selectedPropheticDate = new Date();
                    const dateInput = document.getElementById('propheticDateInput');
                    if (dateInput) {
                        const dateStr = selectedPropheticDate.toISOString().split('T')[0];
                        dateInput.value = dateStr;
                    }
                    console.log('Today button clicked, date reset to:', selectedPropheticDate);
                    renderPropheticRoutine();
                });
            }
        } else {
            console.log('Today button not found');
        }

        // Initial render
        console.log('Calling initial render');
        renderPropheticRoutine();

        // Initialize checkbox handlers
        initPropheticCheckboxHandlers();

        // Set up interval for updating current recommendation
        setInterval(updateCurrentRecommendation, 60000); // Every minute
    }

    function renderPropheticRoutine() {
        console.log('renderPropheticRoutine called');

        // Ensure instance is initialized
        if (!propheticRoutineInstance) {
            console.log('Prophetic routine instance not initialized, creating...');
            if (window.PropheticDailyRoutine) {
                propheticRoutineInstance = new window.PropheticDailyRoutine();
                window.propheticRoutineInstance = propheticRoutineInstance;
                console.log('Prophetic routine instance created:', propheticRoutineInstance);
            } else {
                console.error('PropheticDailyRoutine class not found!');
                return;
            }
        }

        // Ensure selectedPropheticDate is valid
        if (!selectedPropheticDate || !(selectedPropheticDate instanceof Date)) {
            selectedPropheticDate = new Date();
        }

        console.log('Rendering routine for date:', selectedPropheticDate);

        const routineType = propheticRoutineInstance.getRoutineType(selectedPropheticDate);
        const islamicDate = propheticRoutineInstance.getIslamicDate(selectedPropheticDate);

        console.log('Routine type:', routineType.type, 'Islamic date:', islamicDate.formatted);

        // Update date display
        const dateDisplay = document.getElementById('propheticDateDisplay');
        if (dateDisplay) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateDisplay.textContent = selectedPropheticDate.toLocaleDateString('en-US', options);
        } else {
            console.log('Date display element not found');
        }

        // Update Islamic date display
        const islamicDateDisplay = document.getElementById('propheticIslamicDate');
        if (islamicDateDisplay) {
            islamicDateDisplay.textContent = islamicDate.formatted;
        } else {
            console.log('Islamic date display element not found');
        }

        // Update routine type badge
        const badge = document.getElementById('propheticRoutineTypeBadge');
        if (badge) {
            badge.innerHTML = `
                <span class="routine-type-icon">${routineType.icon}</span>
                <span class="routine-type-label">${routineType.label}</span>
            `;
        } else {
            console.log('Routine type badge element not found');
        }

        // Update current recommendation card
        updateCurrentRecommendation();

        // Render timeline
        const timelineContainer = document.getElementById('propheticRoutineTimeline');
        if (timelineContainer) {
            try {
                console.log('About to render timeline...');
                const timelineHTML = propheticRoutineInstance.renderFullTimeline(null, selectedPropheticDate);
                if (timelineHTML && timelineHTML.length > 0) {
                    timelineContainer.innerHTML = timelineHTML;
                    console.log('Timeline rendered successfully, length:', timelineHTML.length);

                    // Re-initialize checkbox handlers after rendering
                    setTimeout(() => {
                        initPropheticCheckboxHandlers();
                    }, 50);
                } else {
                    timelineContainer.innerHTML = '<p style="padding: 1rem; color: var(--medium);">Loading routine...</p>';
                    console.log('Timeline HTML is empty');
                }
            } catch (error) {
                console.error('Error rendering timeline:', error);
                timelineContainer.innerHTML = '<p style="padding: 1rem; color: var(--medium);">Error loading routine. Please try again.</p>';
            }
        } else {
            console.log('Timeline container not found');
        }
    }

    function updateCurrentRecommendation() {
        if (!propheticRoutineInstance) return;

        const recommendation = propheticRoutineInstance.getCurrentRecommendation();
        const card = document.getElementById('currentRecommendationCard');

        if (card && recommendation) {
            card.innerHTML = `
                <div class="recommendation-header">
                    <span class="recommendation-title">Current Recommendation</span>
                    <span class="recommendation-icon">${recommendation.icon}</span>
                </div>
                <div class="recommendation-content">
                    <h4>${recommendation.name}</h4>
                    <p>${recommendation.time} • ${recommendation.duration}</p>
                </div>
            `;
        } else if (card) {
            card.style.display = 'none';
        }
    }

    function initPropheticCheckboxHandlers() {
        if (!propheticRoutineInstance) return;

        const checkboxes = document.querySelectorAll('#propheticRoutineTimeline .routine-check-btn');
        checkboxes.forEach(checkbox => {
            // Remove existing listeners to prevent duplicates
            checkbox.replaceWith(checkbox.cloneNode(true));
        });

        // Re-select after cloning
        const newCheckboxes = document.querySelectorAll('#propheticRoutineTimeline .routine-check-btn');
        newCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                const itemId = checkbox.dataset.itemId;
                const isComplete = propheticRoutineInstance.isComplete(itemId, selectedPropheticDate);

                if (isComplete) {
                    propheticRoutineInstance.markIncomplete(itemId, selectedPropheticDate);
                    checkbox.classList.remove('completed');
                    checkbox.innerHTML = '○';
                } else {
                    propheticRoutineInstance.markComplete(itemId, selectedPropheticDate);
                    checkbox.classList.add('completed');
                    checkbox.innerHTML = '✓';
                }

                // Update section progress
                updatePropheticSectionProgress();
            });
        });
    }

    function updatePropheticSectionProgress() {
        const sections = document.querySelectorAll('#propheticRoutineTimeline .routine-section');
        sections.forEach(section => {
            const progressBar = section.querySelector('.progress-fill');
            const progressText = section.querySelector('.progress-text');
            const items = section.querySelectorAll('.routine-check-btn');

            if (items.length > 0) {
                let completed = 0;
                items.forEach(item => {
                    if (item.classList.contains('completed')) {
                        completed++;
                    }
                });

                const percentage = Math.round((completed / items.length) * 100);
                if (progressBar) {
                    progressBar.style.width = percentage + '%';
                }
                if (progressText) {
                    progressText.textContent = percentage + '%';
                }
            }
        });
    }

    // Add Prophetic Routine page link handler
    const propheticLink = document.querySelector('[data-page="prophetic-routine"]');
    if (propheticLink) {
        propheticLink.addEventListener('click', () => {
            console.log('Prophetic Routine page clicked, initializing...');
            // Delay initialization slightly to ensure page is visible
            setTimeout(() => {
                // Ensure selectedPropheticDate is set
                if (!selectedPropheticDate) {
                    selectedPropheticDate = new Date();
                }
                initPropheticRoutinePage();
            }, 100);
        });
    }

    // Also initialize if prophetic routine page is the active page on load
    const propheticPage = document.getElementById('page-prophetic-routine');
    if (propheticPage && propheticPage.classList.contains('active')) {
        console.log('Prophetic Routine page is active on load, initializing...');
        setTimeout(() => {
            if (!selectedPropheticDate) {
                selectedPropheticDate = new Date();
            }
            initPropheticRoutinePage();
        }, 200);
    }

    // Also listen for page changes to initialize prophetic routine when navigated to
    const pageObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.id === 'page-prophetic-routine' && target.classList.contains('active')) {
                    console.log('Prophetic Routine page activated via observer');
                    setTimeout(() => {
                        if (!selectedPropheticDate) {
                            selectedPropheticDate = new Date();
                        }
                        initPropheticRoutinePage();
                    }, 100);
                }
            }
        });
    });

    // Start observing the prophetic routine page
    if (propheticPage) {
        pageObserver.observe(propheticPage, { attributes: true });
    }

    // Expose Prophetic Routine functions globally
    window.initPropheticRoutinePage = initPropheticRoutinePage;
    window.renderPropheticRoutine = renderPropheticRoutine;

    // ===== HIFZ JOURNEY PAGE INITIALIZATION =====
    function initHifzJourneyPage() {
        console.log('Initializing Hifz Journey page...');
        if (typeof window.renderHifzJourney === 'function') {
            window.renderHifzJourney();
        }
    }

    // Add Hifz Journey page link handler
    const hifzLink = document.querySelector('[data-page="hifz-journey"]');
    if (hifzLink) {
        hifzLink.addEventListener('click', () => {
            console.log('Hifz Journey page clicked, initializing...');
            setTimeout(() => {
                initHifzJourneyPage();
            }, 100);
        });
    }

    // Also initialize if hifz journey page is the active page on load
    const hifzPage = document.getElementById('page-hifz-journey');
    if (hifzPage && hifzPage.classList.contains('active')) {
        console.log('Hifz Journey page is active on load, initializing...');
        setTimeout(() => {
            initHifzJourneyPage();
        }, 200);
    }

    // Listen for page changes to initialize hifz journey when navigated to
    const hifzObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.id === 'page-hifz-journey' && target.classList.contains('active')) {
                    console.log('Hifz Journey page activated via observer');
                    setTimeout(() => {
                        initHifzJourneyPage();
                    }, 100);
                }
            }
        });
    });

    // Start observing the hifz journey page
    if (hifzPage) {
        hifzObserver.observe(hifzPage, { attributes: true });
    }

    // Expose Hifz Journey functions globally
    window.initHifzJourneyPage = initHifzJourneyPage;

})();
