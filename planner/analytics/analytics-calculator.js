/* ============================================
   BARAKAH PLANNER - Analytics Calculator
   Data aggregation and metrics calculation
   ============================================ */

(function() {
    'use strict';

    // ===== ANALYTICS CALCULATOR CLASS =====
    class AnalyticsCalculator {
        constructor() {
            this.storageKey = 'barakah-business-planner';
            this.settingsKey = 'bb-settings';
        }

        // Load all planner data
        loadData() {
            try {
                return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
            } catch { return {}; }
        }

        // Load settings
        loadSettings() {
            try {
                return JSON.parse(localStorage.getItem(this.settingsKey) || '{}');
            } catch { return {}; }
        }

        // Calculate prayer consistency
        calculatePrayerConsistency(startDate, endDate) {
            const data = this.loadData();
            const start = new Date(startDate);
            const end = new Date(endDate);
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

            // Tracking
            const totalPrayers = { overall: 0 };
            const completedPrayers = { overall: 0 };
            const byPrayer = {};
            const byDay = {};
            const dailyTrends = [];

            // Initialize tracking objects
            prayers.forEach(p => {
                byPrayer[p] = { total: 0, completed: 0 };
            });

            // Iterate through each day in range
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
                const dateKey = 'daily-' + dateStr + '-';

                // Track daily completion
                let dayCompleted = 0;
                let dayTotal = 0;

                prayers.forEach(prayer => {
                    const key = dateKey + 'salah-' + prayer;
                    const value = data[key];

                    if (value) {
                        dayTotal++;
                        totalPrayers.overall++;

                        if (byPrayer[prayer]) {
                            byPrayer[prayer].total++;
                        }

                        // Check if marked as completed (has a time value)
                        if (value.trim() !== '') {
                            dayCompleted++;
                            completedPrayers.overall++;

                            if (byPrayer[prayer]) {
                                byPrayer[prayer].completed++;
                            }
                        }
                    }
                });

                // Track by day of week
                if (!byDay[dayName]) {
                    byDay[dayName] = { total: 0, completed: 0 };
                }
                byDay[dayName].total += dayTotal;
                byDay[dayName].completed += dayCompleted;

                // Daily trend
                if (dayTotal > 0) {
                    dailyTrends.push({
                        date: dateStr,
                        percentage: Math.round((dayCompleted / dayTotal) * 100)
                    });
                }
            }

            // Calculate percentages
            const overall = totalPrayers.overall > 0
                ? Math.round((completedPrayers.overall / totalPrayers.overall) * 100)
                : 0;

            const byPrayerPercentages = {};
            Object.keys(byPrayer).forEach(prayer => {
                byPrayerPercentages[prayer] = byPrayer[prayer].total > 0
                    ? Math.round((byPrayer[prayer].completed / byPrayer[prayer].total) * 100)
                    : 0;
            });

            const byDayPercentages = {};
            Object.keys(byDay).forEach(day => {
                byDayPercentages[day] = byDay[day].total > 0
                    ? Math.round((byDay[day].completed / byDay[day].total) * 100)
                    : 0;
            });

            // Find best/worst days
            let bestDay = '-';
            let worstDay = '-';
            let bestPercentage = 0;
            let worstPercentage = 100;

            Object.keys(byDayPercentages).forEach(day => {
                if (byDay[day].total >= 5) { // Only consider days with enough data
                    if (byDayPercentages[day] > bestPercentage) {
                        bestPercentage = byDayPercentages[day];
                        bestDay = day;
                    }
                    if (byDayPercentages[day] < worstPercentage) {
                        worstPercentage = byDayPercentages[day];
                        worstDay = day;
                    }
                }
            });

            return {
                overall,
                byPrayer: byPrayerPercentages,
                byDay: byDayPercentages,
                trends: dailyTrends,
                bestDay,
                worstDay
            };
        }

        // Calculate habit streaks
        calculateHabitStreaks(year, month) {
            const data = this.loadData();
            const monthKey = year + '-' + String(month + 1).padStart(2, '0');
            const habitsKey = 'monthly-' + monthKey + '-habits';

            let habits = [];
            try {
                habits = JSON.parse(data[habitsKey] || '[]');
            } catch {
                habits = [];
            }

            const today = new Date();
            const currentDay = (today.getFullYear() === parseInt(year) && today.getMonth() === month)
                ? today.getDate()
                : 0;

            const results = {
                currentStreaks: [],
                longestStreaks: [],
                completionRates: [],
                totalCompletions: 0,
                totalPossible: 0
            };

            habits.forEach((habit, idx) => {
                if (!habit.name) return;

                // Calculate current streak
                let currentStreak = 0;
                if (currentDay > 0) {
                    for (let d = currentDay - 1; d >= 0; d--) {
                        if (habit.days[d]) currentStreak++;
                        else break;
                    }
                }

                // Calculate longest streak
                let longestStreak = 0;
                let tempStreak = 0;
                for (let d = 0; d < 31; d++) {
                    if (habit.days[d]) {
                        tempStreak++;
                        if (tempStreak > longestStreak) longestStreak = tempStreak;
                    } else {
                        tempStreak = 0;
                    }
                }

                // Calculate completion rate
                const daysToCheck = currentDay > 0 ? currentDay : 31;
                let completed = 0;
                for (let d = 0; d < daysToCheck; d++) {
                    if (habit.days[d]) completed++;
                }
                const completionRate = daysToCheck > 0 ? Math.round((completed / daysToCheck) * 100) : 0;

                results.currentStreaks.push({
                    habit: habit.name,
                    streak: currentStreak
                });

                results.longestStreaks.push({
                    habit: habit.name,
                    streak: longestStreak
                });

                results.completionRates.push({
                    habit: habit.name,
                    rate: completionRate
                });

                results.totalCompletions += completed;
                results.totalPossible += daysToCheck;
            });

            // Overall completion rate
            results.overallRate = results.totalPossible > 0
                ? Math.round((results.totalCompletions / results.totalPossible) * 100)
                : 0;

            return results;
        }

        // Calculate productivity patterns
        calculateProductivityPatterns(startDate, endDate) {
            const data = this.loadData();
            const start = new Date(startDate);
            const end = new Date(endDate);

            const deepWorkHours = [];
            const taskCompletion = [];
            const peakHours = new Array(24).fill(0);

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];

                // Deep Work - check time blocks
                let deepWorkMinutes = 0;
                for (let h = 4; h <= 23; h++) {
                    for (let m = 0; m < 60; m += 30) {
                        const key = 'daily-' + dateStr + '-timeblock-engine-' + h + '-' + m;
                        const task = data[key];
                        if (task && task.toLowerCase().includes('deep')) {
                            deepWorkMinutes += 30;
                            peakHours[h] += 30;
                        }
                    }
                }

                deepWorkHours.push({
                    date: dateStr,
                    hours: Math.round(deepWorkMinutes / 60 * 10) / 10
                });

                // Task completion - check kanban done items
                const doneKey = 'kanban-done-' + dateStr;
                const doneTasks = data[doneKey] || '';
                const completedCount = (doneTasks.match(/\n/g) || []).length + (doneTasks.trim() ? 1 : 0);

                taskCompletion.push({
                    date: dateStr,
                    completed: completedCount
                });
            }

            // Find peak productivity hours
            const topHours = peakHours
                .map((minutes, hour) => ({ hour, minutes }))
                .filter(item => item.minutes > 0)
                .sort((a, b) => b.minutes - a.minutes)
                .slice(0, 3)
                .map(item => {
                    const hour12 = item.hour > 12 ? item.hour - 12 : (item.hour === 0 ? 12 : item.hour);
                    const ampm = item.hour >= 12 ? 'PM' : 'AM';
                    return `${hour12} ${ampm}`;
                });

            return {
                deepWorkHours,
                taskCompletion,
                peakHours: topHours,
                totalDeepWorkHours: deepWorkHours.reduce((sum, item) => sum + item.hours, 0),
                totalTasksCompleted: taskCompletion.reduce((sum, item) => sum + item.completed, 0)
            };
        }

        // Calculate bio-data trends
        calculateBioDataTrends(startDate, endDate) {
            const data = this.loadData();
            const start = new Date(startDate);
            const end = new Date(endDate);

            const hydration = [];
            const sleep = [];
            const movement = [];

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];

                // Hydration (water drops)
                const waterCountKey = 'daily-' + dateStr + '-water-count';
                const waterCount = parseInt(data[waterCountKey] || '0');
                const waterTarget = 8;
                const waterPercentage = waterTarget > 0 ? Math.round((waterCount / waterTarget) * 100) : 0;

                hydration.push({
                    date: dateStr,
                    count: waterCount,
                    percentage: waterPercentage
                });

                // Sleep
                const sleepHoursKey = 'daily-' + dateStr + '-sleep-hours';
                const sleepMinsKey = 'daily-' + dateStr + '-sleep-mins';
                const hours = parseInt(data[sleepHoursKey] || '0');
                const mins = parseInt(data[sleepMinsKey] || '0');
                const totalSleep = hours + (mins / 60);

                sleep.push({
                    date: dateStr,
                    hours: Math.round(totalSleep * 10) / 10
                });

                // Movement
                const movementKey = 'daily-' + dateStr + '-movement';
                const moved = data[movementKey] === '1';

                movement.push({
                    date: dateStr,
                    moved: moved
                });
            }

            // Calculate averages and trends
            const avgHydration = hydration.length > 0
                ? Math.round(hydration.reduce((sum, item) => sum + item.count, 0) / hydration.length * 10) / 10
                : 0;

            const avgSleep = sleep.length > 0
                ? Math.round(sleep.reduce((sum, item) => sum + item.hours, 0) / sleep.length * 10) / 10
                : 0;

            const movementDays = movement.filter(item => item.moved).length;
            const movementPercentage = movement.length > 0
                ? Math.round((movementDays / movement.length) * 100)
                : 0;

            // Calculate trends (compare first half to second half)
            const midPoint = Math.floor(hydration.length / 2);
            const firstHalfHydration = hydration.slice(0, midPoint).reduce((sum, item) => sum + item.count, 0) / (midPoint || 1);
            const secondHalfHydration = hydration.slice(midPoint).reduce((sum, item) => sum + item.count, 0) / (hydration.length - midPoint || 1);
            const hydrationTrend = secondHalfHydration > firstHalfHydration ? 'up' : (secondHalfHydration < firstHalfHydration ? 'down' : 'stable');
            const hydrationChange = Math.round(((secondHalfHydration - firstHalfHydration) / (firstHalfHydration || 1)) * 100);

            return {
                hydration,
                sleep,
                movement,
                averages: {
                    hydration: avgHydration,
                    sleep: avgSleep,
                    movementPercentage
                },
                trends: {
                    hydration: {
                        direction: hydrationTrend,
                        change: hydrationChange
                    }
                }
            };
        }

        // Get key insights summary
        getKeyInsights(startDate, endDate) {
            const prayerData = this.calculatePrayerConsistency(startDate, endDate);
            const habitData = this.calculateHabitStreaks(
                new Date(startDate).getFullYear(),
                new Date(startDate).getMonth()
            );
            const productivityData = this.calculateProductivityPatterns(startDate, endDate);
            const bioData = this.calculateBioDataTrends(startDate, endDate);

            const insights = [];

            // Prayer insights
            if (prayerData.overall > 0) {
                insights.push({
                    type: 'prayer',
                    icon: '&#9745;',
                    text: `Prayer consistency: ${prayerData.overall}%${prayerData.bestDay !== '-' ? ' (Best: ' + prayerData.bestDay + ')' : ''}`
                });
            }

            // Habit insights
            if (habitData.longestStreaks.length > 0) {
                const topStreak = habitData.longestStreaks.sort((a, b) => b.streak - a.streak)[0];
                if (topStreak.streak > 0) {
                    insights.push({
                        type: 'habit',
                        icon: '&#9889;',
                        text: `Longest habit streak: ${topStreak.streak} days (${topStreak.habit})`
                    });
                }
            }

            // Productivity insights
            if (productivityData.peakHours.length > 0) {
                insights.push({
                    type: 'productivity',
                    icon: '&#128200;',
                    text: `Most productive time: ${productivityData.peakHours.join(', ')}`
                });
            }

            if (productivityData.totalDeepWorkHours > 0) {
                insights.push({
                    type: 'productivity',
                    icon: '&#9881;',
                    text: `Deep work total: ${Math.round(productivityData.totalDeepWorkHours * 10) / 10} hours`
                });
            }

            // Health insights
            if (bioData.averages.hydration > 0) {
                const trendSymbol = bioData.trends.hydration.direction === 'up' ? '&#8593;' : (bioData.trends.hydration.direction === 'down' ? '&#8595;' : '&#8594;');
                insights.push({
                    type: 'health',
                    icon: '&#9868;',
                    text: `Avg hydration: ${bioData.averages.hydration}/8 glasses ${trendSymbol} ${Math.abs(bioData.trends.hydration.change)}%`
                });
            }

            if (bioData.averages.sleep > 0) {
                insights.push({
                    type: 'health',
                    icon: '&#128664;',
                    text: `Avg sleep: ${bioData.averages.sleep} hours`
                });
            }

            if (bioData.averages.movementPercentage > 0) {
                insights.push({
                    type: 'health',
                    icon: '&#127939;',
                    text: `Movement days: ${bioData.averages.movementPercentage}%`
                });
            }

            return insights;
        }
    }

    // ===== EXPORT =====
    window.AnalyticsCalculator = AnalyticsCalculator;

})();
