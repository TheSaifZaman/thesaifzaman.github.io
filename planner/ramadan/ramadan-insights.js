/* ============================================
   RAMADAN INSIGHTS - Enhanced Analytics for Ramadan
   Spiritual momentum | Wellness | Productivity balance
   ============================================ */

(function() {
    'use strict';

    // ===== RAMADAN INSIGHTS CLASS =====
    class RamadanInsights {
        constructor() {
            this.storageKey = 'ramadan-insights';
            this.routineKey = 'ramadan-daily-routine';
            this.spiritualKey = 'spiritual-progress-tracker';
            this.settingsKey = 'bb-settings';
        }

        // Load settings
        loadSettings() {
            try {
                return JSON.parse(localStorage.getItem(this.settingsKey) || '{}');
            } catch { return {}; }
        }

        // Load data from various trackers
        loadData(key) {
            try {
                return JSON.parse(localStorage.getItem(key) || '{}');
            } catch { return {}; }
        }

        // Get today's date string
        getTodayString() {
            return new Date().toISOString().split('T')[0];
        }

        // Get Ramadan day number
        getRamadanDay() {
            const settings = this.loadSettings();
            if (settings.ramadanStartDate) {
                const startDate = new Date(settings.ramadanStartDate);
                const today = new Date();
                const diffTime = Math.abs(today - startDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 0 && diffDays <= 30 ? diffDays : null;
            }
            return null;
        }

        // ===== SPIRITUAL MOMENTUM TRACKING =====
        calculateSpiritualMomentum(days = 7) {
            const routineData = this.loadData(this.routineKey);
            const spiritualData = this.loadData(this.spiritualKey);

            const momentum = {
                trend: 'stable',
                score: 50,
                change: 0,
                insights: []
            };

            const scores = [];
            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                let dayScore = 0;

                // Calculate daily score from routine data
                if (routineData[dateStr]) {
                    const completedItems = Object.keys(routineData[dateStr]).length;
                    dayScore += completedItems * 5;
                }

                // Add spiritual activities
                if (spiritualData[dateStr]) {
                    if (spiritualData[dateStr].tahajjud) dayScore += 15;
                    if (spiritualData[dateStr].tarawih) dayScore += 20;
                    if (spiritualData[dateStr].quranReading) dayScore += 15;
                    if (spiritualData[dateStr].dhikr) dayScore += 10;
                    if (spiritualData[dateStr].duhaPrayer) dayScore += 5;
                    if (spiritualData[dateStr].ishraqPrayer) dayScore += 5;
                    if (spiritualData[dateStr].witrPrayer) dayScore += 5;
                }

                scores.push({ date: dateStr, score: dayScore });
                date.setDate(date.getDate() + 1);
            }

            if (scores.length >= 2) {
                const firstHalf = scores.slice(0, Math.floor(scores.length / 2));
                const secondHalf = scores.slice(Math.floor(scores.length / 2));

                const firstAvg = firstHalf.reduce((sum, s) => sum + s.score, 0) / firstHalf.length;
                const secondAvg = secondHalf.reduce((sum, s) => sum + s.score, 0) / secondHalf.length;

                momentum.change = Math.round(((secondAvg - firstAvg) / (firstAvg || 1)) * 100);

                if (momentum.change > 10) {
                    momentum.trend = 'increasing';
                    momentum.insights.push('Spiritual momentum is building up! Keep going!');
                } else if (momentum.change < -10) {
                    momentum.trend = 'declining';
                    momentum.insights.push('Spiritual momentum is declining. Time to recommit.');
                } else {
                    momentum.insights.push('Spiritual practice is consistent. Good stability!');
                }

                momentum.score = Math.round(secondAvg);
            }

            return { momentum, scores };
        }

        // ===== PHYSICAL WELLNESS DURING FASTING =====
        calculatePhysicalWellness(days = 7) {
            const data = this.loadData('barakah-business-planner');
            const routineData = this.loadData(this.routineKey);

            const wellness = {
                hydrationScore: 0,
                sleepScore: 0,
                energyScore: 0,
                overallScore: 0,
                insights: []
            };

            let hydrationTotal = 0;
            let sleepTotal = 0;
            let suhoorCount = 0;
            let iftarCount = 0;
            let dataDays = 0;

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];

                // Hydration data
                const waterKey = 'daily-' + dateStr + '-water-count';
                const waterCount = parseInt(data[waterKey] || '0');
                hydrationTotal += waterCount;

                // Sleep data
                const sleepHoursKey = 'daily-' + dateStr + '-sleep-hours';
                const sleepMinsKey = 'daily-' + dateStr + '-sleep-mins';
                const hours = parseInt(data[sleepHoursKey] || '0');
                const mins = parseInt(data[sleepMinsKey] || '0');
                sleepTotal += (hours + (mins / 60));

                // Suhoor and Iftar tracking
                if (routineData[dateStr]) {
                    if (routineData[dateStr].suhoor_completed) suhoorCount++;
                    if (routineData[dateStr].iftar_completed) iftarCount++;
                }

                dataDays++;
                date.setDate(date.getDate() + 1);
            }

            // Calculate scores
            const avgHydration = dataDays > 0 ? hydrationTotal / dataDays : 0;
            const avgSleep = dataDays > 0 ? sleepTotal / dataDays : 0;
            const suhoorRate = dataDays > 0 ? (suhoorCount / dataDays) * 100 : 0;
            const iftarRate = dataDays > 0 ? (iftarCount / dataDays) * 100 : 0;

            wellness.hydrationScore = Math.min(Math.round((avgHydration / 8) * 100), 100);
            wellness.sleepScore = Math.min(Math.round((avgSleep / 7) * 100), 100);
            wellness.energyScore = Math.round((suhoorRate + iftarRate) / 2);
            wellness.overallScore = Math.round(
                (wellness.hydrationScore * 0.4 +
                 wellness.sleepScore * 0.3 +
                 wellness.energyScore * 0.3)
            );

            // Generate insights
            if (wellness.hydrationScore < 50) {
                wellness.insights.push('Hydration is low during eating hours. Drink more water at Suhoor and Iftar.');
            } else if (wellness.hydrationScore >= 80) {
                wellness.insights.push('Great hydration! This helps maintain energy during fasting.');
            }

            if (wellness.sleepScore < 50) {
                wellness.insights.push('Sleep is crucial during Ramadan. Try to get more rest at night.');
            } else if (wellness.sleepScore >= 80) {
                wellness.insights.push('Excellent sleep habits! This supports both fasting and worship.');
            }

            if (suhoorRate < 70) {
                wellness.insights.push('Consistent Suhoor helps maintain energy throughout the day.');
            }

            if (wellness.overallScore >= 80) {
                wellness.insights.push('Excellent physical wellness balance during fasting!');
            }

            return wellness;
        }

        // ===== PROFESSIONAL PRODUCTIVITY BALANCE =====
        calculateProductivityBalance(days = 7) {
            const data = this.loadData('barakah-business-planner');
            const routineData = this.loadData(this.routineKey);

            const balance = {
                workCompletion: 0,
                deepWorkHours: 0,
                prayerWorkRatio: 0,
                overallBalance: 0,
                insights: []
            };

            let totalTasksCompleted = 0;
            let deepWorkMinutes = 0;
            let prayersCompleted = 0;
            let workBlocksCompleted = 0;
            let dataDays = 0;

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];

                // Task completion
                const doneKey = 'kanban-done-' + dateStr;
                const doneTasks = data[doneKey] || '';
                const completedCount = (doneTasks.match(/\n/g) || []).length + (doneTasks.trim() ? 1 : 0);
                totalTasksCompleted += completedCount;

                // Deep work tracking
                for (let h = 4; h <= 23; h++) {
                    for (let m = 0; m < 60; m += 30) {
                        const key = 'daily-' + dateStr + '-timeblock-engine-' + h + '-' + m;
                        const task = data[key];
                        if (task && task.toLowerCase().includes('deep')) {
                            deepWorkMinutes += 30;
                        }
                    }
                }

                // Prayer and work block completion
                if (routineData[dateStr]) {
                    if (routineData[dateStr].fajr_prayer_completed) prayersCompleted++;
                    if (routineData[dateStr].dhuhr_prayer_completed) prayersCompleted++;
                    if (routineData[dateStr].asr_prayer_completed) prayersCompleted++;
                    if (routineData[dateStr].maghrib_prayer_completed) prayersCompleted++;
                    if (routineData[dateStr].isha_prayer_completed) prayersCompleted++;

                    if (routineData[dateStr].work_block_1_completed) workBlocksCompleted++;
                    if (routineData[dateStr].work_block_2_completed) workBlocksCompleted++;
                }

                dataDays++;
                date.setDate(date.getDate() + 1);
            }

            balance.workCompletion = Math.round((totalTasksCompleted / dataDays) * 10) / 10;
            balance.deepWorkHours = Math.round((deepWorkMinutes / 60) * 10) / 10;
            balance.prayerWorkRatio = workBlocksCompleted > 0 ? Math.round((prayersCompleted / (workBlocksCompleted * 2)) * 100) : 0;
            balance.overallBalance = Math.round(
                (Math.min(balance.workCompletion * 10, 100) * 0.4 +
                 Math.min(balance.deepWorkHours * 10, 100) * 0.3 +
                 Math.min(balance.prayerWorkRatio, 100) * 0.3)
            );

            // Generate insights
            if (balance.prayerWorkRatio < 50) {
                balance.insights.push('Work is overshadowing worship. Try to maintain prayer times better.');
            } else if (balance.prayerWorkRatio >= 80) {
                balance.insights.push('Excellent work-worship balance! This is the Prophetic way.');
            }

            if (balance.deepWorkHours < 5) {
                balance.insights.push('Deep work is lower during Ramadan. Consider adjusting work hours.');
            } else if (balance.deepWorkHours >= 15) {
                balance.insights.push('Great deep work hours! Productivity is well maintained.');
            }

            if (balance.overallBalance >= 80) {
                balance.insights.push('Outstanding professional-spiritual balance!');
            }

            return balance;
        }

        // ===== NIGHT PRAYER ANALYTICS =====
        calculateNightPrayerAnalytics(days = 7) {
            const spiritualData = this.loadData(this.spiritualKey);

            const analytics = {
                tahajjudRate: 0,
                tarawihRate: 0,
                witrRate: 0,
                nightQuranRate: 0,
                totalNightIbadah: 0,
                consistency: 0,
                insights: []
            };

            let tahajjudDays = 0;
            let tarawihDays = 0;
            let witrDays = 0;
            let quranDays = 0;
            let dataDays = 0;

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = spiritualData[dateStr];

                if (dayData) {
                    if (dayData.tahajjud && dayData.tahajjud.completed) {
                        tahajjudDays++;
                        analytics.totalNightIbadah += (dayData.tahajjud.duration || 20);
                    }

                    if (dayData.tarawih && dayData.tarawih.completed) {
                        tarawihDays++;
                        analytics.totalNightIbadah += 45; // Estimated average
                    }

                    if (dayData.witrPrayer && dayData.witrPrayer.completed) {
                        witrDays++;
                        analytics.totalNightIbadah += 10;
                    }

                    if (dayData.quranReading && dayData.quranReading.totalPages > 0) {
                        quranDays++;
                        analytics.totalNightIbadah += dayData.quranReading.totalPages * 2;
                    }
                }

                dataDays++;
                date.setDate(date.getDate() + 1);
            }

            analytics.tahajjudRate = Math.round((tahajjudDays / dataDays) * 100);
            analytics.tarawihRate = Math.round((tarawihDays / dataDays) * 100);
            analytics.witrRate = Math.round((witrDays / dataDays) * 100);
            analytics.nightQuranRate = Math.round((quranDays / dataDays) * 100);

            // Calculate consistency (all night prayers together)
            let allCompleteDays = 0;
            date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];
                const dayData = spiritualData[dateStr];

                let hasTahajjud = dayData && dayData.tahajjud && dayData.tahajjud.completed;
                let hasTarawih = dayData && dayData.tarawih && dayData.tarawih.completed;
                let hasWitr = dayData && dayData.witrPrayer && dayData.witrPrayer.completed;

                if (hasTahajjud && hasTarawih && hasWitr) {
                    allCompleteDays++;
                }

                date.setDate(date.getDate() + 1);
            }

            analytics.consistency = Math.round((allCompleteDays / dataDays) * 100);

            // Generate insights
            if (analytics.tahajjudRate >= 80) {
                analytics.insights.push('Excellent Tahajjud consistency! You are among the righteous.');
            } else if (analytics.tahajjudRate < 30) {
                analytics.insights.push('Tahajjud is the best prayer. Try to increase consistency.');
            }

            if (analytics.tarawihRate >= 90) {
                analytics.insights.push('Perfect Tarawih attendance! May Allah accept it.');
            } else if (analytics.tarawihRate < 50) {
                analytics.insights.push('Tarawih is Ramadan\'s special prayer. Don\'t miss it!');
            }

            if (analytics.consistency >= 80) {
                analytics.insights.push('Outstanding night worship consistency!');
            }

            return analytics;
        }

        // ===== COMMUNITY & FAMILY ENGAGEMENT =====
        calculateCommunityEngagement(days = 7) {
            const data = this.loadData('barakah-business-planner');
            const routineData = this.loadData(this.routineKey);

            const engagement = {
                familyTimeRate: 0,
                iftarTogether: 0,
                charityCount: 0,
                teachingCount: 0,
                overallEngagement: 0,
                insights: []
            };

            let familyTimeDays = 0;
            let iftarTogetherDays = 0;
            let charityEvents = 0;
            let teachingEvents = 0;
            let dataDays = 0;

            const endDate = new Date();
            let date = new Date();
            date.setDate(date.getDate() - days);

            while (date <= endDate) {
                const dateStr = date.toISOString().split('T')[0];

                // Family time tracking
                if (routineData[dateStr]) {
                    if (routineData[dateStr].family_time_completed) {
                        familyTimeDays++;
                    }
                    if (routineData[dateStr].iftar_completed) {
                        // Could add a field to track if with family
                        iftarTogetherDays++;
                    }
                }

                // Check for charity notes or events
                const gratitudeKey = 'daily-' + dateStr + '-gratitude';
                const gratitude = data[gratitudeKey] || '';
                if (gratitude.toLowerCase().includes('charity') ||
                    gratitude.toLowerCase().includes('sadaqah') ||
                    gratitude.toLowerCase().includes('zakat')) {
                    charityEvents++;
                }

                // Check for teaching mentions
                if (gratitude.toLowerCase().includes('teach') ||
                    gratitude.toLowerCase().includes('share') ||
                    gratitude.toLowerCase().includes('learn')) {
                    teachingEvents++;
                }

                dataDays++;
                date.setDate(date.getDate() + 1);
            }

            engagement.familyTimeRate = Math.round((familyTimeDays / dataDays) * 100);
            engagement.iftarTogether = Math.round((iftarTogetherDays / dataDays) * 100);
            engagement.charityCount = charityEvents;
            engagement.teachingCount = teachingEvents;

            engagement.overallEngagement = Math.round(
                (engagement.familyTimeRate * 0.4 +
                 engagement.iftarTogether * 0.3 +
                 Math.min(charityEvents * 20, 100) * 0.15 +
                 Math.min(teachingEvents * 20, 100) * 0.15)
            );

            // Generate insights
            if (engagement.familyTimeRate < 50) {
                engagement.insights.push('Family time is important in Ramadan. Try to spend more quality time together.');
            } else if (engagement.familyTimeRate >= 80) {
                engagement.insights.push('Excellent family time! The Prophet (PBUH) emphasized family bonds.');
            }

            if (charityEvents === 0) {
                engagement.insights.push('Consider giving charity during Ramadan for multiplied rewards.');
            } else if (charityEvents >= 3) {
                engagement.insights.push('Great generosity! Charity is especially rewarded in Ramadan.');
            }

            if (engagement.overallEngagement >= 80) {
                engagement.insights.push('Outstanding community and family engagement!');
            }

            return engagement;
        }

        // ===== COMPREHENSIVE RAMADAN INSIGHTS =====
        getComprehensiveInsights(days = 7) {
            const spiritualMomentum = this.calculateSpiritualMomentum(days);
            const physicalWellness = this.calculatePhysicalWellness(days);
            const productivityBalance = this.calculateProductivityBalance(days);
            const nightPrayer = this.calculateNightPrayerAnalytics(days);
            const communityEngagement = this.calculateCommunityEngagement(days);

            return {
                spiritualMomentum,
                physicalWellness,
                productivityBalance,
                nightPrayer,
                communityEngagement,
                overall: this.calculateOverallInsight(
                    spiritualMomentum.momentum.score,
                    physicalWellness.overallScore,
                    productivityBalance.overallBalance,
                    nightPrayer.consistency,
                    communityEngagement.overallEngagement
                )
            };
        }

        calculateOverallInsight(spiritual, wellness, productivity, nightPrayer, community) {
            const overallScore = Math.round(
                (spiritual * 0.3 +
                 wellness * 0.2 +
                 productivity * 0.2 +
                 nightPrayer * 0.2 +
                 community * 0.1)
            );

            let level = '';
            let message = '';
            let recommendations = [];

            if (overallScore >= 90) {
                level = 'Exceptional';
                message = 'You are achieving an exceptional Ramadan balance!';
                recommendations = [
                    'Maintain this excellent level',
                    'Help others achieve similar balance',
                    'Focus on deeper spiritual connection',
                    'Share your experience with others'
                ];
            } else if (overallScore >= 75) {
                level = 'Excellent';
                message = 'You are doing excellently in most areas!';
                recommendations = [
                    'Continue your current practices',
                    'Identify areas for improvement',
                    'Increase consistency where needed',
                    'Share knowledge with family'
                ];
            } else if (overallScore >= 60) {
                level = 'Good';
                message = 'You are making good progress in Ramadan.';
                recommendations = [
                    'Focus on weaker areas',
                    'Maintain your strong areas',
                    'Set specific goals for improvement',
                    'Seek knowledge and guidance'
                ];
            } else if (overallScore >= 40) {
                level = 'Fair';
                message = 'There is room for improvement in your Ramadan practice.';
                recommendations = [
                    'Prioritize daily prayers',
                    'Increase Quran reading',
                    'Focus on consistency over quantity',
                    'Seek support and guidance'
                ];
            } else {
                level = 'Needs Attention';
                message = 'Your Ramadan practice needs more attention and focus.';
                recommendations = [
                    'Start with the basics: 5 daily prayers',
                    'Read at least one page of Quran daily',
                    'Make intention to improve',
                    'Seek help from knowledgeable Muslims'
                ];
            }

            return {
                score: overallScore,
                level,
                message,
                recommendations,
                color: this.getScoreColor(overallScore)
            };
        }

        getScoreColor(score) {
            const computedStyle = getComputedStyle(document.documentElement);
            const excellent = computedStyle.getPropertyValue('--score-excellent').trim() || '#10b981';
            const good = computedStyle.getPropertyValue('--score-good').trim() || '#84cc16';
            const average = computedStyle.getPropertyValue('--score-average').trim() || '#f59e0b';
            const poor = computedStyle.getPropertyValue('--score-poor').trim() || '#f97316';
            const critical = computedStyle.getPropertyValue('--score-critical').trim() || '#ef4444';

            if (score >= 90) return excellent;
            if (score >= 75) return good;
            if (score >= 60) return average;
            if (score >= 40) return poor;
            return critical;
        }

        // ===== RENDER INSIGHTS DASHBOARD =====
        renderInsightsDashboard(days = 7) {
            const insights = this.getComprehensiveInsights(days);

            return `
                <div class="ramadan-insights-dashboard">
                    <!-- Overall Score Card -->
                    <div class="overall-insight-card" style="background: linear-gradient(135deg, ${insights.overall.color}40, ${insights.overall.color}20)">
                        <h2>Ramadan Overall Performance</h2>
                        <div class="overall-score">${insights.overall.score}%</div>
                        <div class="overall-level">${insights.overall.level}</div>
                        <p class="overall-message">${insights.overall.message}</p>
                        <div class="recommendations">
                            <h4>Recommendations:</h4>
                            <ul>
                                ${insights.overall.recommendations.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    <!-- Category Cards -->
                    <div class="insights-grid">
                        ${this.renderInsightCard('Spiritual Momentum', insights.spiritualMomentum.momentum, '📈')}
                        ${this.renderInsightCard('Physical Wellness', insights.physicalWellness, '💪')}
                        ${this.renderInsightCard('Productivity Balance', insights.productivityBalance, '⚖️')}
                        ${this.renderInsightCard('Night Prayer', insights.nightPrayer, '🌙')}
                        ${this.renderInsightCard('Community Engagement', insights.communityEngagement, '👨‍👩‍👧‍👦')}
                    </div>
                </div>
            `;
        }

        renderInsightCard(title, data, icon) {
            let score = 0;
            let details = [];
            let insights = [];

            if (title === 'Spiritual Momentum') {
                score = data.score;
                details = [
                    `Trend: ${data.trend}`,
                    `Change: ${data.change > 0 ? '+' : ''}${data.change}%`
                ];
                insights = data.insights;
            } else if (title === 'Physical Wellness') {
                score = data.overallScore;
                details = [
                    `Hydration: ${data.hydrationScore}%`,
                    `Sleep: ${data.sleepScore}%`,
                    `Energy: ${data.energyScore}%`
                ];
                insights = data.insights;
            } else if (title === 'Productivity Balance') {
                score = data.overallBalance;
                details = [
                    `Work Completion: ${data.workCompletion}/day`,
                    `Deep Work: ${data.deepWorkHours} hrs`,
                    `Prayer-Work Ratio: ${data.prayerWorkRatio}%`
                ];
                insights = data.insights;
            } else if (title === 'Night Prayer') {
                score = data.consistency;
                details = [
                    `Tahajjud: ${data.tahajjudRate}%`,
                    `Tarawih: ${data.tarawihRate}%`,
                    `Witr: ${data.witrRate}%`
                ];
                insights = data.insights;
            } else if (title === 'Community Engagement') {
                score = data.overallEngagement;
                details = [
                    `Family Time: ${data.familyTimeRate}%`,
                    `Iftar Together: ${data.iftarTogether}%`,
                    `Charity: ${data.charityCount} times`
                ];
                insights = data.insights;
            }

            return `
                <div class="insight-card">
                    <div class="insight-card-header">
                        <span class="insight-card-icon">${icon}</span>
                        <h3>${title}</h3>
                        <div class="insight-score" style="color: ${this.getScoreColor(score)}">${score}%</div>
                    </div>
                    <div class="insight-details">
                        ${details.map(d => `<div class="detail-item">${d}</div>`).join('')}
                    </div>
                    ${insights.length > 0 ? `
                        <div class="insight-suggestions">
                            <h4>Insights:</h4>
                            <ul>
                                ${insights.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    // ===== EXPORT =====
    window.RamadanInsights = RamadanInsights;

})();
