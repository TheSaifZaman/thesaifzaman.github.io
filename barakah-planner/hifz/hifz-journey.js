/* ============================================
   BARAKAH PLANNER - Hifz Journey
   Quran memorization tracking and planning
   ============================================ */

(function() {
    'use strict';

    // ===== QURAN DATA (Surah information) =====
    const QURAN_DATA = {
        totalVerses: 6236,
        totalJuz: 30,
        surahs: [
            { number: 1, name: "Al-Fatihah", englishName: "The Opening", verses: 7, juz: 1 },
            { number: 2, name: "Al-Baqarah", englishName: "The Cow", verses: 286, juz: 1, juzEnd: 3 },
            { number: 3, name: "Ali 'Imran", englishName: "Family of Imran", verses: 200, juz: 3, juzEnd: 4 },
            { number: 4, name: "An-Nisa", englishName: "The Women", verses: 176, juz: 4, juzEnd: 6 },
            { number: 5, name: "Al-Ma'idah", englishName: "The Table Spread", verses: 120, juz: 6, juzEnd: 7 },
            { number: 6, name: "Al-An'am", englishName: "The Cattle", verses: 165, juz: 7, juzEnd: 8 },
            { number: 7, name: "Al-A'raf", englishName: "The Heights", verses: 206, juz: 8, juzEnd: 9 },
            { number: 8, name: "Al-Anfal", englishName: "The Spoils of War", verses: 75, juz: 9, juzEnd: 10 },
            { number: 9, name: "At-Tawbah", englishName: "The Repentance", verses: 129, juz: 10, juzEnd: 11 },
            { number: 10, name: "Yunus", englishName: "Jonah", verses: 109, juz: 11 },
            { number: 11, name: "Hud", englishName: "Hud", verses: 123, juz: 11, juzEnd: 12 },
            { number: 12, name: "Yusuf", englishName: "Joseph", verses: 111, juz: 12, juzEnd: 13 },
            { number: 13, name: "Ar-Ra'd", englishName: "The Thunder", verses: 43, juz: 13 },
            { number: 14, name: "Ibrahim", englishName: "Abraham", verses: 52, juz: 13 },
            { number: 15, name: "Al-Hijr", englishName: "The Rocky Tract", verses: 99, juz: 13, juzEnd: 14 },
            { number: 16, name: "An-Nahl", englishName: "The Bee", verses: 128, juz: 14 },
            { number: 17, name: "Al-Isra", englishName: "The Night Journey", verses: 111, juz: 15 },
            { number: 18, name: "Al-Kahf", englishName: "The Cave", verses: 110, juz: 15, juzEnd: 16 },
            { number: 19, name: "Maryam", englishName: "Mary", verses: 98, juz: 16 },
            { number: 20, name: "Ta-Ha", englishName: "Ta-Ha", verses: 135, juz: 16 },
            { number: 21, name: "Al-Anbiya", englishName: "The Prophets", verses: 112, juz: 17 },
            { number: 22, name: "Al-Hajj", englishName: "The Pilgrimage", verses: 78, juz: 17 },
            { number: 23, name: "Al-Mu'minun", englishName: "The Believers", verses: 118, juz: 18 },
            { number: 24, name: "An-Nur", englishName: "The Light", verses: 64, juz: 18 },
            { number: 25, name: "Al-Furqan", englishName: "The Criterion", verses: 77, juz: 18, juzEnd: 19 },
            { number: 26, name: "Ash-Shu'ara", englishName: "The Poets", verses: 227, juz: 19 },
            { number: 27, name: "An-Naml", englishName: "The Ant", verses: 93, juz: 19, juzEnd: 20 },
            { number: 28, name: "Al-Qasas", englishName: "The Stories", verses: 88, juz: 20 },
            { number: 29, name: "Al-Ankabut", englishName: "The Spider", verses: 69, juz: 20, juzEnd: 21 },
            { number: 30, name: "Ar-Rum", englishName: "The Romans", verses: 60, juz: 21 },
            { number: 31, name: "Luqman", englishName: "Luqman", verses: 34, juz: 21 },
            { number: 32, name: "As-Sajdah", englishName: "The Prostration", verses: 30, juz: 21 },
            { number: 33, name: "Al-Ahzab", englishName: "The Combined Forces", verses: 73, juz: 21, juzEnd: 22 },
            { number: 34, name: "Saba", englishName: "Sheba", verses: 54, juz: 22 },
            { number: 35, name: "Fatir", englishName: "Originator", verses: 45, juz: 22 },
            { number: 36, name: "Ya-Sin", englishName: "Ya Sin", verses: 83, juz: 22, juzEnd: 23 },
            { number: 37, name: "As-Saffat", englishName: "Those who set the Ranks", verses: 182, juz: 23 },
            { number: 38, name: "Sad", englishName: "The Letter Saad", verses: 88, juz: 23, juzEnd: 24 },
            { number: 39, name: "Az-Zumar", englishName: "The Troops", verses: 75, juz: 24, juzEnd: 25 },
            { number: 40, name: "Ghafir", englishName: "The Forgiver", verses: 85, juz: 24, juzEnd: 25 },
            { number: 41, name: "Fussilat", englishName: "Explained in Detail", verses: 54, juz: 25 },
            { number: 42, name: "Ash-Shura", englishName: "The Consultation", verses: 53, juz: 25 },
            { number: 43, name: "Az-Zukhruf", englishName: "The Ornaments of Gold", verses: 89, juz: 25, juzEnd: 26 },
            { number: 44, name: "Ad-Dukhan", englishName: "The Smoke", verses: 59, juz: 26 },
            { number: 45, name: "Al-Jathiyah", englishName: "The Crouching", verses: 37, juz: 26 },
            { number: 46, name: "Al-Ahqaf", englishName: "The Wind-Curved Sandhills", verses: 35, juz: 26 },
            { number: 47, name: "Muhammad", englishName: "Muhammad", verses: 38, juz: 26 },
            { number: 48, name: "Al-Fath", englishName: "The Victory", verses: 29, juz: 26 },
            { number: 49, name: "Al-Hujurat", englishName: "The Rooms", verses: 18, juz: 26 },
            { number: 50, name: "Qaf", englishName: "The Letter Qaf", verses: 45, juz: 26 },
            { number: 51, name: "Adh-Dhariyat", englishName: "The Winnowing Winds", verses: 60, juz: 26, juzEnd: 27 },
            { number: 52, name: "At-Tur", englishName: "The Mount", verses: 49, juz: 27 },
            { number: 53, name: "An-Najm", englishName: "The Star", verses: 62, juz: 27 },
            { number: 54, name: "Al-Qamar", englishName: "The Moon", verses: 55, juz: 27 },
            { number: 55, name: "Ar-Rahman", englishName: "The Beneficent", verses: 78, juz: 27 },
            { number: 56, name: "Al-Waqi'ah", englishName: "The Inevitable", verses: 96, juz: 27 },
            { number: 57, name: "Al-Hadid", englishName: "The Iron", verses: 29, juz: 27 },
            { number: 58, name: "Al-Mujadila", englishName: "The Pleading Woman", verses: 22, juz: 28 },
            { number: 59, name: "Al-Hashr", englishName: "The Exile", verses: 24, juz: 28 },
            { number: 60, name: "Al-Mumtahanah", englishName: "She that is to be examined", verses: 13, juz: 28 },
            { number: 61, name: "As-Saff", englishName: "The Ranks", verses: 14, juz: 28 },
            { number: 62, name: "Al-Jumu'ah", englishName: "The Congregation", verses: 11, juz: 28 },
            { number: 63, name: "Al-Munafiqun", englishName: "The Hypocrites", verses: 11, juz: 28 },
            { number: 64, name: "At-Taghabun", englishName: "The Mutual Disillusion", verses: 18, juz: 28 },
            { number: 65, name: "At-Talaq", englishName: "The Divorce", verses: 12, juz: 28 },
            { number: 66, name: "At-Tahrim", englishName: "The Prohibition", verses: 12, juz: 28 },
            { number: 67, name: "Al-Mulk", englishName: "The Sovereignty", verses: 30, juz: 29 },
            { number: 68, name: "Al-Qalam", englishName: "The Pen", verses: 52, juz: 29 },
            { number: 69, name: "Al-Haqqah", englishName: "The Reality", verses: 52, juz: 29 },
            { number: 70, name: "Al-Ma'arij", englishName: "The Ascending Stairways", verses: 44, juz: 29 },
            { number: 71, name: "Nuh", englishName: "Noah", verses: 28, juz: 29 },
            { number: 72, name: "Al-Jinn", englishName: "The Jinn", verses: 28, juz: 29 },
            { number: 73, name: "Al-Muzzammil", englishName: "The Enshrouded One", verses: 20, juz: 29 },
            { number: 74, name: "Al-Muddaththir", englishName: "The Cloaked One", verses: 56, juz: 29 },
            { number: 75, name: "Al-Qiyamah", englishName: "The Resurrection", verses: 40, juz: 29 },
            { number: 76, name: "Al-Insan", englishName: "The Man", verses: 31, juz: 29 },
            { number: 77, name: "Al-Mursalat", englishName: "The Emissaries", verses: 50, juz: 29 },
            { number: 78, name: "An-Naba", englishName: "The Tidings", verses: 40, juz: 30 },
            { number: 79, name: "An-Nazi'at", englishName: "Those who drag forth", verses: 46, juz: 30 },
            { number: 80, name: "Abasa", englishName: "He Frowned", verses: 42, juz: 30 },
            { number: 81, name: "At-Takwir", englishName: "The Overthrowing", verses: 29, juz: 30 },
            { number: 82, name: "Al-Infitar", englishName: "The Cleaving", verses: 19, juz: 30 },
            { number: 83, name: "Al-Mutaffifin", englishName: "The Defrauding", verses: 36, juz: 30 },
            { number: 84, name: "Al-Inshiqaq", englishName: "The Splitting Open", verses: 25, juz: 30 },
            { number: 85, name: "Al-Buruj", englishName: "The Mansions of the Stars", verses: 22, juz: 30 },
            { number: 86, name: "At-Tariq", englishName: "The Nightcommer", verses: 17, juz: 30 },
            { number: 87, name: "Al-A'la", englishName: "The Most High", verses: 19, juz: 30 },
            { number: 88, name: "Al-Ghashiyah", englishName: "The Overwhelming", verses: 26, juz: 30 },
            { number: 89, name: "Al-Fajr", englishName: "The Dawn", verses: 30, juz: 30 },
            { number: 90, name: "Al-Balad", englishName: "The City", verses: 20, juz: 30 },
            { number: 91, name: "Ash-Shams", englishName: "The Sun", verses: 15, juz: 30 },
            { number: 92, name: "Al-Layl", englishName: "The Night", verses: 21, juz: 30 },
            { number: 93, name: "Ad-Duhaa", englishName: "The Morning Hours", verses: 11, juz: 30 },
            { number: 94, name: "Ash-Sharh", englishName: "The Relief", verses: 8, juz: 30 },
            { number: 95, name: "At-Tin", englishName: "The Fig", verses: 8, juz: 30 },
            { number: 96, name: "Al-Alaq", englishName: "The Clot", verses: 19, juz: 30 },
            { number: 97, name: "Al-Qadr", englishName: "The Power", verses: 5, juz: 30 },
            { number: 98, name: "Al-Bayyinah", englishName: "The Clear Proof", verses: 8, juz: 30 },
            { number: 99, name: "Az-Zalzalah", englishName: "The Earthquake", verses: 8, juz: 30 },
            { number: 100, name: "Al-Adiyat", englishName: "The Courser", verses: 11, juz: 30 },
            { number: 101, name: "Al-Qari'ah", englishName: "The Calamity", verses: 11, juz: 30 },
            { number: 102, name: "At-Takathur", englishName: "The Rivalry in world increase", verses: 8, juz: 30 },
            { number: 103, name: "Al-Asr", englishName: "The Declining Day", verses: 3, juz: 30 },
            { number: 104, name: "Al-Humazah", englishName: "The Traducer", verses: 9, juz: 30 },
            { number: 105, name: "Al-Fil", englishName: "The Elephant", verses: 5, juz: 30 },
            { number: 106, name: "Quraysh", englishName: "Quraysh", verses: 4, juz: 30 },
            { number: 107, name: "Al-Ma'un", englishName: "The Small kindnesses", verses: 7, juz: 30 },
            { number: 108, name: "Al-Kawthar", englishName: "The Abundance", verses: 3, juz: 30 },
            { number: 109, name: "Al-Kafirun", englishName: "The Disbelievers", verses: 6, juz: 30 },
            { number: 110, name: "An-Nasr", englishName: "The Divine Support", verses: 3, juz: 30 },
            { number: 111, name: "Al-Masad", englishName: "The Palm Fiber", verses: 5, juz: 30 },
            { number: 112, name: "Al-Ikhlas", englishName: "The Sincerity", verses: 4, juz: 30 },
            { number: 113, name: "Al-Falaq", englishName: "The Daybreak", verses: 5, juz: 30 },
            { number: 114, name: "An-Nas", englishName: "Mankind", verses: 6, juz: 30 }
        ]
    };

    // ===== HIFZ JOURNEY CLASS =====
    class HifzJourney {
        constructor() {
            this.storageKey = 'hifz-journey';
            this.entriesKey = 'hifz-entries';
            this.progressKey = 'hifz-progress';
            this.entries = [];
            this.progress = {
                surahProgress: {},
                totalMemorized: 0,
                juzCompleted: [],
                streak: 0,
                lastEntryDate: null
            };
            this.currentPage = null;
        }

        // Initialize the module
        init() {
            this.loadData();
            this.cacheElements();
            this.bindEvents();
            this.renderAll();
        }

        // Cache DOM elements
        cacheElements() {
            this.elements = {
                addEntryBtn: document.getElementById('hifzAddEntryBtn'),
                backDateInput: document.getElementById('hifzBackDate'),
                entriesContainer: document.getElementById('hifzEntriesContainer'),
                emptyState: document.getElementById('hifzEmptyState'),
                totalVerses: document.getElementById('hifzTotalVerses'),
                juzCount: document.getElementById('hifzJuzCount'),
                streak: document.getElementById('hifzStreak'),
                totalProgressCircle: document.getElementById('totalProgressCircle'),
                totalProgressPercent: document.getElementById('totalProgressPercent'),
                juzGrid: document.getElementById('hifzJuzGrid'),
                surahGrid: document.getElementById('hifzSurahGrid'),
                tabs: document.querySelectorAll('.hifz-tab'),
                tabContents: document.querySelectorAll('.hifz-tab-content')
            };
        }

        // Bind event listeners
        bindEvents() {
            if (this.elements.addEntryBtn) {
                this.elements.addEntryBtn.addEventListener('click', () => this.showEntryModal());
            }

            // Tab switching
            this.elements.tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const targetTab = e.target.dataset.tab;
                    this.switchTab(targetTab);
                });
            });

            // Calculator inputs
            this.bindCalculatorEvents();
            this.bindPlannerEvents();
        }

        // Load data from localStorage
        loadData() {
            try {
                const entriesData = localStorage.getItem(this.entriesKey);
                this.entries = entriesData ? JSON.parse(entriesData) : [];

                const progressData = localStorage.getItem(this.progressKey);
                this.progress = progressData ? JSON.parse(progressData) : {
                    surahProgress: {},
                    totalMemorized: 0,
                    juzCompleted: [],
                    streak: 0,
                    lastEntryDate: null
                };
            } catch (error) {
                console.error('Error loading Hifz data:', error);
                this.entries = [];
                this.progress = {
                    surahProgress: {},
                    totalMemorized: 0,
                    juzCompleted: [],
                    streak: 0,
                    lastEntryDate: null
                };
            }
        }

        // Save data to localStorage
        saveData() {
            localStorage.setItem(this.entriesKey, JSON.stringify(this.entries));
            localStorage.setItem(this.progressKey, JSON.stringify(this.progress));
        }

        // Render all components
        renderAll() {
            this.renderProgressOverview();
            this.renderEntries();
            this.renderSurahGrid();
            this.renderJuzGrid();
            this.updateMilestones();
        }

        // Render progress overview
        renderProgressOverview() {
            if (!this.elements.totalVerses) return;

            // Animate the total verses count
            this.animateValue(this.elements.totalVerses, 0, this.progress.totalMemorized, 1000);

            // Update Juz count
            if (this.elements.juzCount) {
                this.elements.juzCount.textContent = this.progress.juzCompleted.length;
            }

            // Update streak
            if (this.elements.streak) {
                this.elements.streak.textContent = this.progress.streak;
            }

            // Update progress circle
            this.updateProgressCircle();
        }

        // Animate value
        animateValue(element, start, end, duration) {
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                element.textContent = current;
                if (current === end) {
                    clearInterval(timer);
                }
            }, Math.max(stepTime, 10));
        }

        // Update progress circle
        updateProgressCircle() {
            if (!this.elements.totalProgressCircle) return;

            const percent = Math.min((this.progress.totalMemorized / QURAN_DATA.totalVerses) * 100, 100);
            const circumference = 2 * Math.PI * 35;
            const offset = circumference - (percent / 100) * circumference;

            this.elements.totalProgressCircle.style.strokeDashoffset = offset;
            this.elements.totalProgressPercent.textContent = Math.round(percent) + '%';
        }

        // Render journal entries
        renderEntries() {
            if (!this.elements.entriesContainer) return;

            // Sort entries by date (newest first)
            const sortedEntries = [...this.entries].sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            if (sortedEntries.length === 0) {
                this.elements.emptyState.style.display = 'block';
                return;
            }

            this.elements.emptyState.style.display = 'none';
            this.elements.entriesContainer.innerHTML = '';

            sortedEntries.forEach((entry, index) => {
                const entryElement = this.createEntryElement(entry, index);
                this.elements.entriesContainer.appendChild(entryElement);
            });
        }

        // Create entry element
        createEntryElement(entry, index) {
            const div = document.createElement('div');
            div.className = 'hifz-entry-card';
            div.style.animationDelay = `${index * 0.05}s`;

            const surah = QURAN_DATA.surahs.find(s => s.number === entry.surahNumber);
            const surahName = surah ? `${surah.number}. ${surah.name}` : 'Unknown';

            div.innerHTML = `
                <div class="hifz-entry-header">
                    <div class="hifz-entry-date">
                        <span class="hifz-date-icon">📅</span>
                        <span>${this.formatDate(entry.date)}</span>
                    </div>
                    <div class="hifz-entry-actions">
                        <button class="hifz-entry-edit" data-id="${entry.id}">✏️</button>
                        <button class="hifz-entry-delete" data-id="${entry.id}">🗑️</button>
                    </div>
                </div>
                <div class="hifz-entry-content">
                    <div class="hifz-entry-surah">
                        <span class="hifz-surah-badge">${surahName}</span>
                        <span class="hifz-verses-range">Verse ${entry.startVerse} - ${entry.endVerse}</span>
                    </div>
                    <div class="hifz-entry-stats">
                        <div class="hifz-stat">
                            <span class="hifz-stat-icon">📖</span>
                            <span>${entry.versesMemorized || (entry.endVerse - entry.startVerse + 1)} verses</span>
                        </div>
                        <div class="hifz-stat">
                            <span class="hifz-stat-icon">⏱️</span>
                            <span>${entry.timeSpent || 'N/A'}</span>
                        </div>
                    </div>
                    ${entry.notes ? `<div class="hifz-entry-notes">${entry.notes}</div>` : ''}
                    ${entry.reflection ? `<div class="hifz-entry-reflection"><strong>Reflection:</strong> ${entry.reflection}</div>` : ''}
                </div>
            `;

            // Add event listeners for edit and delete
            const editBtn = div.querySelector('.hifz-entry-edit');
            const deleteBtn = div.querySelector('.hifz-entry-delete');

            editBtn.addEventListener('click', () => this.editEntry(entry.id));
            deleteBtn.addEventListener('click', () => this.deleteEntry(entry.id));

            return div;
        }

        // Format date
        formatDate(dateString) {
            const date = new Date(dateString);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            if (date.toDateString() === today.toDateString()) {
                return 'Today';
            } else if (date.toDateString() === yesterday.toDateString()) {
                return 'Yesterday';
            } else {
                return date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        }

        // Show entry modal
        showEntryModal(entryId = null) {
            const entry = entryId ? this.entries.find(e => e.id === entryId) : null;
            const backDate = this.elements.backDateInput?.value || new Date().toISOString().split('T')[0];

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'hifz-modal-overlay';
            modal.innerHTML = `
                <div class="hifz-modal">
                    <div class="hifz-modal-header">
                        <h2>${entry ? 'Edit Entry' : 'Add New Entry'}</h2>
                        <button class="hifz-modal-close">&times;</button>
                    </div>
                    <div class="hifz-modal-body">
                        <div class="hifz-form-group">
                            <label>Date</label>
                            <input type="date" class="hifz-form-input" id="hifzEntryDate" value="${entry?.date || backDate}">
                        </div>
                        <div class="hifz-form-group">
                            <label>Surah</label>
                            <select class="hifz-form-select" id="hifzSurahSelect">
                                <option value="">Select Surah</option>
                                ${QURAN_DATA.surahs.map(s => `
                                    <option value="${s.number}" ${entry?.surahNumber === s.number ? 'selected' : ''}>
                                        ${s.number}. ${s.name} (${s.englishName}) - ${s.verses} verses
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="hifz-form-row">
                            <div class="hifz-form-group">
                                <label>Start Verse</label>
                                <input type="number" class="hifz-form-input" id="hifzStartVerse" value="${entry?.startVerse || 1}" min="1">
                            </div>
                            <div class="hifz-form-group">
                                <label>End Verse</label>
                                <input type="number" class="hifz-form-input" id="hifzEndVerse" value="${entry?.endVerse || 1}" min="1">
                            </div>
                        </div>
                        <div class="hifz-form-group">
                            <label>Review Quality</label>
                            <select class="hifz-form-select" id="hifzReviewQuality">
                                <option value="excellent" ${entry?.reviewQuality === 'excellent' ? 'selected' : ''}>Excellent - No mistakes</option>
                                <option value="good" ${entry?.reviewQuality === 'good' || !entry?.reviewQuality ? 'selected' : ''}>Good - Minor mistakes</option>
                                <option value="fair" ${entry?.reviewQuality === 'fair' ? 'selected' : ''}>Fair - Some mistakes</option>
                                <option value="poor" ${entry?.reviewQuality === 'poor' ? 'selected' : ''}>Poor - Needs review</option>
                            </select>
                        </div>
                        <div class="hifz-form-row">
                            <div class="hifz-form-group">
                                <label>Time Spent (minutes)</label>
                                <input type="number" class="hifz-form-input" id="hifzTimeSpent" value="${entry?.timeSpent || ''}" placeholder="e.g., 30">
                            </div>
                            <div class="hifz-form-group">
                                <label>Repetitions</label>
                                <input type="number" class="hifz-form-input" id="hifzRepetitions" value="${entry?.repetitions || ''}" placeholder="e.g., 5">
                            </div>
                        </div>
                        <div class="hifz-form-group">
                            <label>Notes</label>
                            <textarea class="hifz-form-textarea" id="hifzNotes" placeholder="Any notes about this session...">${entry?.notes || ''}</textarea>
                        </div>
                        <div class="hifz-form-group">
                            <label>Reflection</label>
                            <textarea class="hifz-form-textarea" id="hifzReflection" placeholder="How did you feel? Any challenges?">${entry?.reflection || ''}</textarea>
                        </div>
                    </div>
                    <div class="hifz-modal-footer">
                        <button class="hifz-btn hifz-btn-secondary" id="hifzCancelBtn">Cancel</button>
                        <button class="hifz-btn hifz-btn-primary" id="hifzSaveBtn">Save Entry</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Update verse range when surah is selected
            const surahSelect = modal.querySelector('#hifzSurahSelect');
            const startVerse = modal.querySelector('#hifzStartVerse');
            const endVerse = modal.querySelector('#hifzEndVerse');

            surahSelect.addEventListener('change', () => {
                const surah = QURAN_DATA.surahs.find(s => s.number === parseInt(surahSelect.value));
                if (surah) {
                    startVerse.max = surah.verses;
                    endVerse.max = surah.verses;
                    startVerse.value = 1;
                    endVerse.value = 1;
                }
            });

            // Set initial values if editing
            if (entry && surahSelect.value) {
                const surah = QURAN_DATA.surahs.find(s => s.number === parseInt(surahSelect.value));
                if (surah) {
                    startVerse.max = surah.verses;
                    endVerse.max = surah.verses;
                }
            }

            // Close button
            modal.querySelector('.hifz-modal-close').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            modal.querySelector('#hifzCancelBtn').addEventListener('click', () => {
                document.body.removeChild(modal);
            });

            // Save button
            modal.querySelector('#hifzSaveBtn').addEventListener('click', () => {
                this.saveEntry(modal, entryId);
            });
        }

        // Save entry
        saveEntry(modal, entryId = null) {
            const surahNumber = parseInt(modal.querySelector('#hifzSurahSelect').value);
            const startVerse = parseInt(modal.querySelector('#hifzStartVerse').value);
            const endVerse = parseInt(modal.querySelector('#hifzEndVerse').value);
            const date = modal.querySelector('#hifzEntryDate').value;

            if (!surahNumber || !startVerse || !endVerse || !date) {
                alert('Please fill in all required fields');
                return;
            }

            const surah = QURAN_DATA.surahs.find(s => s.number === surahNumber);
            const versesMemorized = endVerse - startVerse + 1;

            const entryData = {
                id: entryId || Date.now().toString(),
                date,
                surahNumber,
                startVerse,
                endVerse,
                versesMemorized,
                reviewQuality: modal.querySelector('#hifzReviewQuality').value,
                timeSpent: modal.querySelector('#hifzTimeSpent').value,
                repetitions: modal.querySelector('#hifzRepetitions').value,
                notes: modal.querySelector('#hifzNotes').value,
                reflection: modal.querySelector('#hifzReflection').value
            };

            if (entryId) {
                const index = this.entries.findIndex(e => e.id === entryId);
                if (index !== -1) {
                    this.entries[index] = entryData;
                }
            } else {
                this.entries.push(entryData);
            }

            this.updateProgress();
            this.saveData();
            this.renderAll();

            document.body.removeChild(modal);

            // Clear back date input
            if (this.elements.backDateInput) {
                this.elements.backDateInput.value = '';
            }
        }

        // Edit entry
        editEntry(entryId) {
            this.showEntryModal(entryId);
        }

        // Delete entry
        deleteEntry(entryId) {
            if (!confirm('Are you sure you want to delete this entry?')) return;

            this.entries = this.entries.filter(e => e.id !== entryId);
            this.updateProgress();
            this.saveData();
            this.renderAll();
        }

        // Update progress based on entries
        updateProgress() {
            // Calculate total memorized verses
            const uniqueVerses = new Set();
            const surahProgress = {};

            this.entries.forEach(entry => {
                const key = `${entry.surahNumber}-${entry.startVerse}-${entry.endVerse}`;
                uniqueVerses.add(key);

                // Update surah progress
                if (!surahProgress[entry.surahNumber]) {
                    surahProgress[entry.surahNumber] = {
                        memorized: 0,
                        total: 0,
                        lastEntry: entry.date
                    };
                }
                surahProgress[entry.surahNumber].memorized += entry.versesMemorized;
                surahProgress[entry.surahNumber].lastEntry = entry.date;
            });

            // Get total unique verses
            this.progress.totalMemorized = this.calculateUniqueVerses();
            this.progress.surahProgress = surahProgress;

            // Calculate Juz completed
            this.progress.juzCompleted = this.calculateJuzCompleted();

            // Calculate streak
            this.progress.streak = this.calculateStreak();

            // Update last entry date
            if (this.entries.length > 0) {
                const sortedEntries = [...this.entries].sort((a, b) => new Date(b.date) - new Date(a.date));
                this.progress.lastEntryDate = sortedEntries[0].date;
            }
        }

        // Calculate unique verses memorized
        calculateUniqueVerses() {
            const verseSet = new Set();

            this.entries.forEach(entry => {
                for (let i = entry.startVerse; i <= entry.endVerse; i++) {
                    verseSet.add(`${entry.surahNumber}:${i}`);
                }
            });

            return verseSet.size;
        }

        // Calculate completed Juz
        calculateJuzCompleted() {
            const juzVerses = {};
            const juzCompleted = [];

            // Initialize juz verse tracking
            for (let i = 1; i <= QURAN_DATA.totalJuz; i++) {
                juzVerses[i] = new Set();
            }

            // Track memorized verses per juz
            this.entries.forEach(entry => {
                const surah = QURAN_DATA.surahs.find(s => s.number === entry.surahNumber);
                if (surah) {
                    const startJuz = surah.juz;
                    const endJuz = surah.juzEnd || surah.juz;

                    for (let juz = startJuz; juz <= endJuz; juz++) {
                        for (let verse = entry.startVerse; verse <= entry.endVerse; verse++) {
                            juzVerses[juz].add(`${entry.surahNumber}:${verse}`);
                        }
                    }
                }
            });

            // Check which juz are complete (approximate: ~200 verses per juz)
            for (let juz = 1; juz <= QURAN_DATA.totalJuz; juz++) {
                // For Juz 30, it's about 564 verses
                // For Juz 1, it's about 255 verses
                // Other juz are typically around 200 verses
                const expectedVerses = juz === 30 ? 564 : (juz === 1 ? 255 : 200);

                if (juzVerses[juz].size >= expectedVerses * 0.95) { // 95% threshold
                    juzCompleted.push(juz);
                }
            }

            return juzCompleted;
        }

        // Calculate streak
        calculateStreak() {
            if (this.entries.length === 0) return 0;

            const dates = [...new Set(this.entries.map(e => e.date))];
            dates.sort((a, b) => new Date(b) - new Date(a));

            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            for (let i = 0; i < dates.length; i++) {
                const entryDate = new Date(dates[i]);
                entryDate.setHours(0, 0, 0, 0);

                const expectedDate = new Date(today);
                expectedDate.setDate(expectedDate.getDate() - i);

                if (entryDate.getTime() === expectedDate.getTime()) {
                    streak++;
                } else {
                    break;
                }
            }

            return streak;
        }

        // Render Juz grid
        renderJuzGrid() {
            if (!this.elements.juzGrid) return;

            this.elements.juzGrid.innerHTML = '';

            for (let i = 1; i <= QURAN_DATA.totalJuz; i++) {
                const isCompleted = this.progress.juzCompleted.includes(i);
                const div = document.createElement('div');
                div.className = `hifz-juz-cell ${isCompleted ? 'completed' : ''}`;
                div.textContent = i;
                div.title = `Juz ${i}`;
                this.elements.juzGrid.appendChild(div);
            }
        }

        // Render Surah grid
        renderSurahGrid() {
            if (!this.elements.surahGrid) return;

            const filter = document.getElementById('hifzSurahFilter')?.value || 'all';

            let filteredSurahs = QURAN_DATA.surahs;

            if (filter === 'memorized') {
                filteredSurahs = QURAN_DATA.surahs.filter(s => this.progress.surahProgress[s.number]?.memorized >= s.verses);
            } else if (filter === 'in-progress') {
                filteredSurahs = QURAN_DATA.surahs.filter(s => {
                    const progress = this.progress.surahProgress[s.number];
                    return progress && progress.memorized > 0 && progress.memorized < s.verses;
                });
            } else if (filter === 'not-started') {
                filteredSurahs = QURAN_DATA.surahs.filter(s => !this.progress.surahProgress[s.number]?.memorized);
            }

            this.elements.surahGrid.innerHTML = '';

            filteredSurahs.forEach(surah => {
                const progress = this.progress.surahProgress[surah.number] || { memorized: 0 };
                const percent = Math.min((progress.memorized / surah.verses) * 100, 100);
                const status = percent === 0 ? 'not-started' : (percent === 100 ? 'memorized' : 'in-progress');

                const div = document.createElement('div');
                div.className = `hifz-surah-card ${status}`;
                div.innerHTML = `
                    <div class="hifz-surah-header">
                        <span class="hifz-surah-number">${surah.number}</span>
                        <span class="hifz-surah-name">${surah.name}</span>
                    </div>
                    <div class="hifz-surah-info">${surah.englishName}</div>
                    <div class="hifz-surah-progress">
                        <div class="hifz-surah-bar">
                            <div class="hifz-surah-fill" style="width: ${percent}%"></div>
                        </div>
                        <div class="hifz-surah-stats">
                            <span>${progress.memorized}/${surah.verses}</span>
                            <span>${Math.round(percent)}%</span>
                        </div>
                    </div>
                `;
                this.elements.surahGrid.appendChild(div);
            });
        }

        // Update milestones
        updateMilestones() {
            const milestones = document.querySelectorAll('.hifz-milestone-card');
            const milestonesData = {
                1: 564,
                5: 1128,
                10: 1692,
                15: 3118,
                30: 6236
            };

            milestones.forEach(milestone => {
                const target = parseInt(milestone.dataset.milestone);
                const targetVerses = milestonesData[target];
                const percent = Math.min((this.progress.totalMemorized / targetVerses) * 100, 100);
                const bar = milestone.querySelector('.hifz-milestone-bar');
                if (bar) {
                    bar.style.width = `${percent}%`;
                }
            });
        }

        // Switch tab
        switchTab(tabName) {
            this.elements.tabs.forEach(tab => {
                tab.classList.toggle('active', tab.dataset.tab === tabName);
            });
            this.elements.tabContents.forEach(content => {
                content.classList.toggle('active', content.id === `tab-${tabName}`);
            });
        }

        // Bind calculator events
        bindCalculatorEvents() {
            const versesPerDay = document.getElementById('calcVersesPerDay');
            const daysPerWeek = document.getElementById('calcDaysPerWeek');
            const juzPerMonth = document.getElementById('calcJuzPerMonth');
            const targetDate = document.getElementById('calcTargetDate');
            const memorized = document.getElementById('calcMemorized');

            if (versesPerDay && daysPerWeek) {
                const calculate = () => {
                    const vpd = parseInt(versesPerDay.value) || 0;
                    const dpw = parseInt(daysPerWeek.value) || 0;
                    const remaining = QURAN_DATA.totalVerses - (parseInt(memorized?.value) || 0);

                    if (vpd > 0 && dpw > 0) {
                        const versesPerWeek = vpd * dpw;
                        const weeksNeeded = remaining / versesPerWeek;
                        const years = weeksNeeded / 52;
                        document.getElementById('calcYears').textContent = years.toFixed(1);
                    }
                };

                versesPerDay.addEventListener('input', calculate);
                daysPerWeek.addEventListener('input', calculate);
            }

            if (juzPerMonth) {
                juzPerMonth.addEventListener('input', () => {
                    const jpm = parseFloat(juzPerMonth.value) || 0;
                    const juzRemaining = QURAN_DATA.totalJuz - this.progress.juzCompleted.length;
                    const monthsNeeded = jpm > 0 ? juzRemaining / jpm : 0;
                    const years = monthsNeeded / 12;
                    document.getElementById('calcJuzYears').textContent = years.toFixed(1);
                });
            }

            if (targetDate) {
                targetDate.addEventListener('input', () => {
                    const target = new Date(targetDate.value);
                    const today = new Date();
                    const daysRemaining = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
                    const remaining = QURAN_DATA.totalVerses - this.progress.totalMemorized;
                    const dailyNeeded = daysRemaining > 0 ? remaining / daysRemaining : 0;
                    document.getElementById('calcDailyNeeded').textContent = dailyNeeded.toFixed(1);
                });
            }

            if (memorized) {
                memorized.addEventListener('input', () => {
                    const mem = parseInt(memorized.value) || 0;
                    const remaining = QURAN_DATA.totalVerses - mem;
                    document.getElementById('calcRemaining').textContent = remaining.toLocaleString();
                });
            }
        }

        // Bind planner events
        bindPlannerEvents() {
            const dailyTarget = document.getElementById('hifzDailyTarget');
            const weeklyTarget = document.getElementById('hifzWeeklyTarget');
            const monthlyTarget = document.getElementById('hifzMonthlyTarget');
            const customVerses = document.getElementById('hifzCustomVerses');
            const customDate = document.getElementById('hifzCustomDate');

            if (dailyTarget) {
                dailyTarget.addEventListener('input', () => {
                    const vpd = parseInt(dailyTarget.value) || 1;
                    const remaining = QURAN_DATA.totalVerses - this.progress.totalMemorized;
                    const days = remaining / vpd;
                    const years = days / 365;
                    document.querySelector('#dailyResult .hifz-result-value').textContent = `~${years.toFixed(1)} years`;
                });
            }

            if (weeklyTarget) {
                weeklyTarget.addEventListener('input', () => {
                    const vpw = parseInt(weeklyTarget.value) || 1;
                    const remaining = QURAN_DATA.totalVerses - this.progress.totalMemorized;
                    const weeks = remaining / vpw;
                    const years = weeks / 52;
                    document.querySelector('#weeklyResult .hifz-result-value').textContent = `~${years.toFixed(1)} years`;
                });
            }

            if (monthlyTarget) {
                monthlyTarget.addEventListener('input', () => {
                    const vpm = parseInt(monthlyTarget.value) || 1;
                    const remaining = QURAN_DATA.totalVerses - this.progress.totalMemorized;
                    const months = remaining / vpm;
                    const years = months / 12;
                    document.querySelector('#monthlyResult .hifz-result-value').textContent = `~${years.toFixed(1)} years`;
                });
            }

            if (customVerses && customDate) {
                const updateCustom = () => {
                    const target = parseInt(customVerses.value) || 0;
                    const date = customDate.value ? new Date(customDate.value) : null;
                    const today = new Date();

                    if (target > 0 && date) {
                        const daysRemaining = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
                        const dailyNeeded = daysRemaining > 0 ? (target - this.progress.totalMemorized) / daysRemaining : 0;
                        document.querySelector('#customResult .hifz-result-value').textContent = `~${dailyNeeded.toFixed(1)} verses/day`;
                    }
                };

                customVerses.addEventListener('input', updateCustom);
                customDate.addEventListener('input', updateCustom);
            }
        }

        // Get analytics data for Insights page
        getAnalyticsData() {
            return {
                totalMemorized: this.progress.totalMemorized,
                totalVerses: QURAN_DATA.totalVerses,
                percentComplete: (this.progress.totalMemorized / QURAN_DATA.totalVerses) * 100,
                juzCompleted: this.progress.juzCompleted.length,
                totalJuz: QURAN_DATA.totalJuz,
                streak: this.progress.streak,
                totalEntries: this.entries.length,
                lastEntryDate: this.progress.lastEntryDate
            };
        }
    }

    // ===== EXPORT =====
    window.HifzJourney = HifzJourney;

    // ===== AUTO-INIT =====
    let hifzJourneyInstance = null;

    document.addEventListener('DOMContentLoaded', () => {
        hifzJourneyInstance = new HifzJourney();
    });

    // Initialize when Hifz page is activated
    function renderHifzJourney() {
        if (!hifzJourneyInstance) {
            hifzJourneyInstance = new HifzJourney();
        }
        hifzJourneyInstance.init();
    }

    // Expose globally for app.js
    window.renderHifzJourney = renderHifzJourney;

})();
