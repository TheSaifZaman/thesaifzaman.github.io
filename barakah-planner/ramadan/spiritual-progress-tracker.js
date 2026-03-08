/* ============================================
   SPIRITUAL PROGRESS TRACKER - Ramadan Edition
   Track Tahajjud, Tarawih, Quran, Dhikr, Duha, Witr
   ============================================ */

(function() {
    'use strict';

    // ===== SPIRITUAL PROGRESS TRACKER CLASS =====
    class SpiritualProgressTracker {
        constructor() {
            this.storageKey = 'spiritual-progress-tracker';
            this.settingsKey = 'bb-settings';
            this.currentData = null;
        }

        // Load settings
        loadSettings() {
            try {
                return JSON.parse(localStorage.getItem(this.settingsKey) || '{}');
            } catch { return {}; }
        }

        // Load progress data
        loadProgressData() {
            try {
                return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            } catch { return {}; }
        }

        // Save progress data
        saveProgressData(data) {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }

        // Get today's date string
        getTodayString() {
            return new Date().toISOString().split('T')[0];
        }

        // Get current Ramadan day
        getRamadanDay() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;

            // You would need to implement actual Ramadan date calculation
            // For now, this is a placeholder
            const settings = this.loadSettings();
            if (settings.ramadanStartDate) {
                const startDate = new Date(settings.ramadanStartDate);
                const diffTime = Math.abs(today - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 0 && diffDays <= 30 ? diffDays : null;
            }
            return null;
        }

        // ===== TAHAJJUD TRACKING =====
        logTahajjud(rakats, duration, duaFocus) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].tahajjud = {
                completed: true,
                rakats: rakats || 2,
                duration: duration || 0, // minutes
                duaFocus: duaFocus || '',
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].tahajjud;
        }

        getTahajjudStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                totalRakats: 0,
                totalDuration: 0,
                completionRate: 0,
                streak: 0
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            let completedDays = 0;
            let currentStreak = 0;
            let inStreak = true;

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                if (dayData && dayData.tahajjud && dayData.tahajjud.completed) {
                    stats.totalRakats += dayData.tahajjud.rakats || 0;
                    stats.totalDuration += dayData.tahajjud.duration || 0;
                    completedDays++;

                    if (inStreak) currentStreak++;
                } else {
                    inStreak = false;
                }

                date.setDate(date.getDate() + 1);
            }

            stats.completionRate = Math.round((completedDays / days) * 100);
            stats.streak = currentStreak;

            return stats;
        }

        // ===== TARAWIH TRACKING =====
        logTarawih(rakats, surahsRecited, mosquePrayer) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].tarawih = {
                completed: true,
                rakats: rakats || 8,
                surahsRecited: surahsRecited || 0,
                mosquePrayer: mosquePrayer || false,
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].tarawih;
        }

        getTarawihStats(ramadanDays = 30) {
            const data = this.loadProgressData();
            const stats = {
                totalRakats: 0,
                totalSurahs: 0,
                mosqueDays: 0,
                completionRate: 0,
                averageRakats: 0
            };

            let completedDays = 0;

            for (let i = 1; i <= ramadanDays; i++) {
                // Calculate date for Ramadan day i
                const settings = this.loadSettings();
                if (settings.ramadanStartDate) {
                    const startDate = new Date(settings.ramadanStartDate);
                    const targetDate = new Date(startDate);
                    targetDate.setDate(targetDate.getDate() + i - 1);
                    const dateStr = targetDate.toISOString().split('T')[0];

                    const dayData = data[dateStr];
                    if (dayData && dayData.tarawih && dayData.tarawih.completed) {
                        stats.totalRakats += dayData.tarawih.rakats || 0;
                        stats.totalSurahs += dayData.tarawih.surahsRecited || 0;
                        if (dayData.tarawih.mosquePrayer) {
                            stats.mosqueDays++;
                        }
                        completedDays++;
                    }
                }
            }

            stats.completionRate = Math.round((completedDays / ramadanDays) * 100);
            stats.averageRakats = completedDays > 0 ? Math.round(stats.totalRakats / completedDays) : 0;

            return stats;
        }

        // ===== QURAN READING TRACKING =====
        logQuranReading(pages, surah, ayahs, notes) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            if (!data[today].quranReading) {
                data[today].quranReading = {
                    totalPages: 0,
                    entries: []
                };
            }

            data[today].quranReading.totalPages += pages || 0;
            data[today].quranReading.entries.push({
                pages: pages || 0,
                surah: surah || '',
                ayahs: ayahs || 0,
                notes: notes || '',
                timestamp: new Date().toISOString()
            });

            this.saveProgressData(data);
            return data[today].quranReading;
        }

        getQuranStats(ramadanDays = 30) {
            const data = this.loadProgressData();
            const stats = {
                totalPages: 0,
                percentageComplete: 0,
                dailyAverage: 0,
                readingDays: 0,
                currentSurah: '',
                currentJuz: 0
            };

            const pagesPerJuz = 20; // Approximately
            const totalQuranPages = 604; // Standard page count

            let readingDays = 0;
            let lastEntry = null;

            for (let i = 1; i <= ramadanDays; i++) {
                const settings = this.loadSettings();
                if (settings.ramadanStartDate) {
                    const startDate = new Date(settings.ramadanStartDate);
                    const targetDate = new Date(startDate);
                    targetDate.setDate(targetDate.getDate() + i - 1);
                    const dateStr = targetDate.toISOString().split('T')[0];

                    const dayData = data[dateStr];
                    if (dayData && dayData.quranReading) {
                        stats.totalPages += dayData.quranReading.totalPages || 0;
                        readingDays++;

                        // Get last entry for current position
                        if (dayData.quranReading.entries.length > 0) {
                            const entries = dayData.quranReading.entries;
                            lastEntry = entries[entries.length - 1];
                        }
                    }
                }
            }

            stats.readingDays = readingDays;
            stats.percentageComplete = Math.round((stats.totalPages / totalQuranPages) * 100);
            stats.dailyAverage = readingDays > 0 ? Math.round(stats.totalPages / readingDays) : 0;
            stats.currentJuz = Math.ceil(stats.totalPages / pagesPerJuz);

            if (lastEntry) {
                stats.currentSurah = lastEntry.surah;
            }

            return stats;
        }

        // ===== DHIKR COUNTERS =====
        logDhikr(type, count = 1) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            if (!data[today].dhikr) {
                data[today].dhikr = {
                    subhanAllah: 0,
                    alhamdulillah: 0,
                    allahuAkbar: 0,
                    laIlahaIllallah: 0,
                    astaghfirullah: 0,
                    salawat: 0,
                    timestamp: new Date().toISOString()
                };
            }

            const dhikrTypes = ['subhanAllah', 'alhamdulillah', 'allahuAkbar', 'laIlahaIllallah', 'astaghfirullah', 'salawat'];

            if (dhikrTypes.includes(type)) {
                data[today].dhikr[type] += count;
                this.saveProgressData(data);
                return data[today].dhikr[type];
            }

            return null;
        }

        getDhikrStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                subhanAllah: 0,
                alhamdulillah: 0,
                allahuAkbar: 0,
                laIlahaIllallah: 0,
                astaghfirullah: 0,
                salawat: 0,
                totalDhikr: 0,
                dailyAverage: 0
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            let daysWithData = 0;

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                if (dayData && dayData.dhikr) {
                    stats.subhanAllah += dayData.dhikr.subhanAllah || 0;
                    stats.alhamdulillah += dayData.dhikr.alhamdulillah || 0;
                    stats.allahuAkbar += dayData.dhikr.allahuAkbar || 0;
                    stats.laIlahaIllallah += dayData.dhikr.laIlahaIllallah || 0;
                    stats.astaghfirullah += dayData.dhikr.astaghfirullah || 0;
                    stats.salawat += dayData.dhikr.salawat || 0;
                    daysWithData++;
                }

                date.setDate(date.getDate() + 1);
            }

            stats.totalDhikr = stats.subhanAllah + stats.alhamdulillah + stats.allahuAkbar +
                              stats.laIlahaIllallah + stats.astaghfirullah + stats.salawat;
            stats.dailyAverage = daysWithData > 0 ? Math.round(stats.totalDhikr / daysWithData) : 0;

            return stats;
        }

        // ===== DUHA PRAYER TRACKING =====
        logDuhaPrayer(rakats) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].duhaPrayer = {
                completed: true,
                rakats: rakats || 2,
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].duhaPrayer;
        }

        getDuhaStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                totalRakats: 0,
                completionDays: 0,
                completionRate: 0,
                streak: 0
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            let currentStreak = 0;
            let inStreak = true;

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                if (dayData && dayData.duhaPrayer && dayData.duhaPrayer.completed) {
                    stats.totalRakats += dayData.duhaPrayer.rakats || 0;
                    stats.completionDays++;

                    if (inStreak) currentStreak++;
                } else {
                    inStreak = false;
                }

                date.setDate(date.getDate() + 1);
            }

            stats.completionRate = Math.round((stats.completionDays / days) * 100);
            stats.streak = currentStreak;

            return stats;
        }

        // ===== ISHRAQ PRAYER TRACKING =====
        logIshraqPrayer(rakats) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].ishraqPrayer = {
                completed: true,
                rakats: rakats || 2,
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].ishraqPrayer;
        }

        getIshraqStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                totalRakats: 0,
                completionDays: 0,
                completionRate: 0,
                streak: 0
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            let currentStreak = 0;
            let inStreak = true;

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                if (dayData && dayData.ishraqPrayer && dayData.ishraqPrayer.completed) {
                    stats.totalRakats += dayData.ishraqPrayer.rakats || 0;
                    stats.completionDays++;

                    if (inStreak) currentStreak++;
                } else {
                    inStreak = false;
                }

                date.setDate(date.getDate() + 1);
            }

            stats.completionRate = Math.round((stats.completionDays / days) * 100);
            stats.streak = currentStreak;

            return stats;
        }

        // ===== WITR PRAYER TRACKING =====
        logWitrPrayer(rakats, duaQunut) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].witrPrayer = {
                completed: true,
                rakats: rakats || 3,
                duaQunut: duaQunut || false,
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].witrPrayer;
        }

        getWitrStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                totalRakats: 0,
                completionDays: 0,
                qunutDays: 0,
                completionRate: 0
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                if (dayData && dayData.witrPrayer && dayData.witrPrayer.completed) {
                    stats.totalRakats += dayData.witrPrayer.rakats || 0;
                    stats.completionDays++;
                    if (dayData.witrPrayer.duaQunut) {
                        stats.qunutDays++;
                    }
                }

                date.setDate(date.getDate() + 1);
            }

            stats.completionRate = Math.round((stats.completionDays / days) * 100);

            return stats;
        }

        // ===== SUHOOR & IFTAR TRACKING =====
        logSuhoor(meal, time) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].suhoor = {
                completed: true,
                meal: meal || '',
                time: time || new Date().toISOString(),
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].suhoor;
        }

        logIftar(meal, time) {
            const today = this.getTodayString();
            const data = this.loadProgressData();

            if (!data[today]) {
                data[today] = {};
            }

            data[today].iftar = {
                completed: true,
                meal: meal || '',
                time: time || new Date().toISOString(),
                timestamp: new Date().toISOString()
            };

            this.saveProgressData(data);
            return data[today].iftar;
        }

        getSuhoorIftarStats(days = 7) {
            const data = this.loadProgressData();
            const stats = {
                suhoorDays: 0,
                iftarDays: 0,
                bothDays: 0,
                averageSuhoorTime: null,
                averageIftarTime: null
            };

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            let suhoorTimes = [];
            let iftarTimes = [];

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = data[dateStr];

                const hasSuhoor = dayData && dayData.suhoor && dayData.suhoor.completed;
                const hasIftar = dayData && dayData.iftar && dayData.iftar.completed;

                if (hasSuhoor) {
                    stats.suhoorDays++;
                    if (dayData.suhoor.time) {
                        suhoorTimes.push(new Date(dayData.suhoor.time));
                    }
                }

                if (hasIftar) {
                    stats.iftarDays++;
                    if (dayData.iftar.time) {
                        iftarTimes.push(new Date(dayData.iftar.time));
                    }
                }

                if (hasSuhoor && hasIftar) {
                    stats.bothDays++;
                }

                date.setDate(date.getDate() + 1);
            }

            // Calculate average times
            if (suhoorTimes.length > 0) {
                const totalSuhoorMinutes = suhoorTimes.reduce((sum, time) => {
                    return sum + time.getHours() * 60 + time.getMinutes();
                }, 0);
                const avgSuhoorMinutes = totalSuhoorMinutes / suhoorTimes.length;
                const avgSuhoorHour = Math.floor(avgSuhoorMinutes / 60);
                const avgSuhoorMin = Math.round(avgSuhoorMinutes % 60);
                stats.averageSuhoorTime = `${avgSuhoorHour}:${avgSuhoorMin.toString().padStart(2, '0')}`;
            }

            if (iftarTimes.length > 0) {
                const totalIftarMinutes = iftarTimes.reduce((sum, time) => {
                    return sum + time.getHours() * 60 + time.getMinutes();
                }, 0);
                const avgIftarMinutes = totalIftarMinutes / iftarTimes.length;
                const avgIftarHour = Math.floor(avgIftarMinutes / 60);
                const avgIftarMin = Math.round(avgIftarMinutes % 60);
                stats.averageIftarTime = `${avgIftarHour}:${avgIftarMin.toString().padStart(2, '0')}`;
            }

            return stats;
        }

        // ===== OVERALL SPIRITUAL SCORE =====
        calculateOverallScore(days = 7) {
            const tahajjudStats = this.getTahajjudStats(days);
            const tarawihStats = this.getTarawihStats(days);
            const quranStats = this.getQuranStats(days);
            const dhikrStats = this.getDhikrStats(days);
            const duhaStats = this.getDuhaStats(days);
            const ishraqStats = this.getIshraqStats(days);
            const witrStats = this.getWitrStats(days);
            const suhoorIftarStats = this.getSuhoorIftarStats(days);

            // Weighted scoring
            const scores = {
                tahajjud: tahajjudStats.completionRate * 0.15,
                tarawih: tarawihStats.completionRate * 0.20,
                quran: Math.min(quranStats.percentageComplete * 2, 100) * 0.20,
                dhikr: Math.min(dhikrStats.dailyAverage / 100, 1) * 100 * 0.10,
                duha: duhaStats.completionRate * 0.10,
                ishraq: ishraqStats.completionRate * 0.10,
                witr: witrStats.completionRate * 0.10,
                suhoorIftar: suhoorIftarStats.bothDays / days * 100 * 0.05
            };

            const totalScore = Math.round(
                scores.tahajjud + scores.tarawih + scores.quran + scores.dhikr +
                scores.duha + scores.ishraq + scores.witr + scores.suhoorIftar
            );

            return {
                totalScore,
                scores,
                level: this.getSpiritualLevel(totalScore),
                breakdown: {
                    tahajjud: tahajjudStats,
                    tarawih: tarawihStats,
                    quran: quranStats,
                    dhikr: dhikrStats,
                    duha: duhaStats,
                    ishraq: ishraqStats,
                    witr: witrStats,
                    suhoorIftar: suhoorIftarStats
                }
            };
        }

        getSpiritualLevel(score) {
            const computedStyle = getComputedStyle(document.documentElement);
            const exalted = computedStyle.getPropertyValue('--score-exalted').trim() || '#ffd700';
            const excellent = computedStyle.getPropertyValue('--score-excellent').trim() || '#10b981';
            const good = computedStyle.getPropertyValue('--score-good').trim() || '#84cc16';
            const average = computedStyle.getPropertyValue('--score-average').trim() || '#f59e0b';
            const poor = computedStyle.getPropertyValue('--score-poor').trim() || '#f97316';
            const beginning = computedStyle.getPropertyValue('--medium').trim() || '#9e9e9e';

            if (score >= 90) return { name: 'Exalted', color: exalted, icon: '👑' };
            if (score >= 75) return { name: 'Righteous', color: good, icon: '🌟' };
            if (score >= 60) return { name: 'Devoted', color: average, icon: '📿' };
            if (score >= 40) return { name: 'Seeking', color: poor, icon: '🌱' };
            return { name: 'Beginning', color: beginning, icon: '🌤️' };
        }

        // ===== RENDER PROGRESS DASHBOARD =====
        renderProgressDashboard() {
            const score = this.calculateOverallScore(7);
            const level = this.getSpiritualLevel(score.totalScore);

            return `
                <div class="spiritual-progress-dashboard">
                    <div class="spiritual-score-card" style="background: linear-gradient(135deg, ${level.color}40, ${level.color}20)">
                        <div class="score-icon">${level.icon}</div>
                        <div class="score-content">
                            <h3>Spiritual Level: ${level.name}</h3>
                            <div class="score-value">${score.totalScore}%</div>
                            <div class="score-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${score.totalScore}%; background: ${level.color}"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="progress-categories">
                        ${this.renderProgressCategory('Tahajjud', score.scores.tahajjud, '🌙', score.breakdown.tahajjud)}
                        ${this.renderProgressCategory('Tarawih', score.scores.tarawih, '🕌', score.breakdown.tarawih)}
                        ${this.renderProgressCategory('Quran', score.scores.quran, '📖', score.breakdown.quran)}
                        ${this.renderProgressCategory('Dhikr', score.scores.dhikr, '🤲', score.breakdown.dhikr)}
                        ${this.renderProgressCategory('Duha', score.scores.duha, '☀️', score.breakdown.duha)}
                        ${this.renderProgressCategory('Ishraq', score.scores.ishraq, '🌅', score.breakdown.ishraq)}
                        ${this.renderProgressCategory('Witr', score.scores.witr, '🌙', score.breakdown.witr)}
                        ${this.renderProgressCategory('Suhoor/Iftar', score.scores.suhoorIftar, '🍽️', score.breakdown.suhoorIftar)}
                    </div>
                </div>
            `;
        }

        renderProgressCategory(title, score, icon, breakdown) {
            const roundedScore = Math.round(score);
            let details = '';

            // Add specific details based on category
            if (title === 'Tahajjud') {
                details = `${breakdown.streak} day streak • ${breakdown.totalRakats} rakats`;
            } else if (title === 'Tarawih') {
                details = `${breakdown.mosqueDays} mosque days • ${breakdown.averageRakats} avg rakats`;
            } else if (title === 'Quran') {
                details = `${breakdown.totalPages} pages • Juz ${breakdown.currentJuz} • ${breakdown.readingDays} days`;
            } else if (title === 'Dhikr') {
                details = `${breakdown.totalDhikr} total • ${breakdown.dailyAverage} avg/day`;
            } else if (title === 'Duha' || title === 'Ishraq') {
                details = `${breakdown.streak} day streak • ${breakdown.totalRakats} rakats`;
            } else if (title === 'Witr') {
                details = `${breakdown.completionDays} days • ${breakdown.qunutDays} with qunut`;
            } else if (title === 'Suhoor/Iftar') {
                details = `${breakdown.bothDays} both • ${breakdown.suhoorDays} suhoor • ${breakdown.iftarDays} iftar`;
            }

            return `
                <div class="progress-category">
                    <div class="category-header">
                        <span class="category-icon">${icon}</span>
                        <span class="category-title">${title}</span>
                        <span class="category-score">${roundedScore}%</span>
                    </div>
                    <div class="category-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${roundedScore}%"></div>
                        </div>
                    </div>
                    <div class="category-details">${details}</div>
                </div>
            `;
        }
    }

    // ===== EXPORT =====
    window.SpiritualProgressTracker = SpiritualProgressTracker;

})();
