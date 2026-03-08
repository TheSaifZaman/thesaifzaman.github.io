/* ============================================
   BARAKAH PLANNER - Report Generator
   Weekly, monthly, and custom report generation
   ============================================ */

(function() {
    'use strict';

    // ===== REPORT GENERATOR CLASS =====
    class ReportGenerator {
        constructor() {
            this.storageKey = 'barakah-business-planner';
            this.settingsKey = 'bb-settings';
            this.calculator = null;
            this.reportColors = {};

            // Initialize analytics calculator if available
            if (window.AnalyticsCalculator) {
                this.calculator = new AnalyticsCalculator();
            }

            // Initialize colors from CSS variables
            this.updateReportColors();
        }

        // Update report colors from CSS variables
        updateReportColors() {
            const computedStyle = getComputedStyle(document.documentElement);
            this.reportColors = {
                medium: computedStyle.getPropertyValue('--medium').trim() || '#666666',
                success: computedStyle.getPropertyValue('--success').trim() || '#10b981',
                border: computedStyle.getPropertyValue('--shade-10').trim() || '#ddd',
                borderLight: computedStyle.getPropertyValue('--shade-5').trim() || '#eee'
            };
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

        // Get Hijri date (simplified - uses Intl API)
        getHijriDate(date) {
            return new Intl.DateTimeFormat('en-US-u-ca-islamic', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(date);
        }

        // Generate weekly report
        generateWeeklyReport(weekStartStr) {
            const weekStart = new Date(weekStartStr);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const startDate = weekStart.toISOString().split('T')[0];
            const endDate = weekEnd.toISOString().split('T')[0];

            // Get analytics data
            let prayerData = { overall: 0, bestDay: '-', worstDay: '-' };
            let habitData = { overallRate: 0, longestStreaks: [], currentStreaks: [] };
            let productivityData = { totalDeepWorkHours: 0, totalTasksCompleted: 0, peakHours: [] };
            let bioData = { averages: { hydration: 0, sleep: 0, movementPercentage: 0 } };

            if (this.calculator) {
                prayerData = this.calculator.calculatePrayerConsistency(startDate, endDate);
                habitData = this.calculator.calculateHabitStreaks(weekStart.getFullYear(), weekStart.getMonth());
                productivityData = this.calculator.calculateProductivityPatterns(startDate, endDate);
                bioData = this.calculator.calculateBioDataTrends(startDate, endDate);
            }

            // Get weekly review data (from Sunday)
            const sundayDate = new Date(weekEnd);
            const reviewData = this.getWeeklyReviewData(sundayDate);

            // Get fasting data
            const fastingData = this.getFastingData(weekStart, weekEnd);

            // Generate HTML report
            const reportHTML = `
                <div class="report-section">
                    <h3 class="report-section-title">&#9745; Spiritual Summary</h3>
                    <p><strong>Prayer Completion:</strong> ${prayerData.overall}% ${prayerData.overall > 0 ? (prayerData.overall >= 85 ? '&#10003; Excellent' : (prayerData.overall >= 70 ? '&#128151; Good' : '&#128533; Needs improvement')) : ''}</p>
                    <p><strong>Fasted:</strong> ${fastingData.monday ? 'Monday &#10003;' : 'Monday &#10007;'} ${fastingData.thursday ? 'Thursday &#10003;' : 'Thursday &#10007;'}</p>
                    <p><strong>Habit Completion:</strong> ${habitData.overallRate}% overall</p>
                    ${habitData.longestStreaks.length > 0 ? `<p><strong>Best Streak:</strong> ${habitData.longestStreaks[0].streak} days (${habitData.longestStreaks[0].habit})</p>` : ''}
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#128200; Productivity Summary</h3>
                    <p><strong>Deep Work Hours:</strong> ${Math.round(productivityData.totalDeepWorkHours * 10) / 10}h</p>
                    <p><strong>Tasks Completed:</strong> ${productivityData.totalTasksCompleted}</p>
                    ${productivityData.peakHours.length > 0 ? `<p><strong>Peak Hours:</strong> ${productivityData.peakHours.join(', ')}</p>` : ''}
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#9868; Health Summary</h3>
                    <p><strong>Avg Water:</strong> ${bioData.averages.hydration}/8 glasses</p>
                    <p><strong>Avg Sleep:</strong> ${bioData.averages.sleep} hours</p>
                    <p><strong>Movement Days:</strong> ${bioData.averages.movementPercentage}%</p>
                </div>

                ${reviewData ? `
                <div class="report-section">
                    <h3 class="report-section-title">&#128196; Weekly Review</h3>
                    <div class="review-responses">
                        ${reviewData}
                    </div>
                </div>
                ` : ''}

                <div class="report-footer">
                    <p style="font-size: 0.85rem; color: ${this.reportColors.medium};">
                        Generated on ${new Date().toLocaleDateString()} | Hijri: ${this.getHijriDate(new Date())}
                    </p>
                </div>
            `;

            return {
                title: `Weekly Summary - Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                content: reportHTML,
                startDate,
                endDate
            };
        }

        // Generate monthly report
        generateMonthlyReport(year, month) {
            const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
            const endDate = new Date(year, month, 0).toISOString().split('T')[0];

            // Get analytics data for the month
            let prayerData = { overall: 0, bestDay: '-', worstDay: '-', byPrayer: {} };
            let habitData = { overallRate: 0, longestStreaks: [], currentStreaks: [], completionRates: [] };
            let productivityData = { totalDeepWorkHours: 0, totalTasksCompleted: 0, peakHours: [] };
            let bioData = { averages: { hydration: 0, sleep: 0, movementPercentage: 0 } };

            if (this.calculator) {
                prayerData = this.calculator.calculatePrayerConsistency(startDate, endDate);
                habitData = this.calculator.calculateHabitStreaks(year, month - 1);
                productivityData = this.calculator.calculateProductivityPatterns(startDate, endDate);
                bioData = this.calculator.calculateBioDataTrends(startDate, endDate);
            }

            // Get monthly goals progress
            const goalsProgress = this.getMonthlyGoalsProgress(year, month);

            // Generate HTML report
            const monthName = new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            const reportHTML = `
                <div class="report-section">
                    <h3 class="report-section-title">&#9745; Spiritual Summary</h3>
                    <p><strong>Overall Prayer Consistency:</strong> ${prayerData.overall}%</p>
                    ${prayerData.bestDay !== '-' ? `<p><strong>Best Prayer Day:</strong> ${prayerData.bestDay} (${prayerData.byDay ? prayerData.byDay[prayerData.bestDay] || 0 : 0}%)</p>` : ''}
                    <p><strong>Habit Completion Rate:</strong> ${habitData.overallRate}%</p>
                    ${habitData.longestStreaks.length > 0 ? `<p><strong>Longest Streak:</strong> ${habitData.longestStreaks[0].streak} days (${habitData.longestStreaks[0].habit})</p>` : ''}
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#128200; Productivity Summary</h3>
                    <p><strong>Total Deep Work Hours:</strong> ${Math.round(productivityData.totalDeepWorkHours * 10) / 10}h</p>
                    <p><strong>Total Tasks Completed:</strong> ${productivityData.totalTasksCompleted}</p>
                    ${productivityData.peakHours.length > 0 ? `<p><strong>Peak Productivity Hours:</strong> ${productivityData.peakHours.slice(0, 3).join(', ')}</p>` : ''}
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#9868; Health Summary</h3>
                    <p><strong>Average Hydration:</strong> ${bioData.averages.hydration}/8 glasses daily</p>
                    <p><strong>Average Sleep:</strong> ${bioData.averages.sleep} hours</p>
                    <p><strong>Movement Consistency:</strong> ${bioData.averages.movementPercentage}% of days</p>
                </div>

                ${goalsProgress ? `
                <div class="report-section">
                    <h3 class="report-section-title">&#128200; Monthly Goals Progress</h3>
                    ${goalsProgress}
                </div>
                ` : ''}

                <div class="report-section">
                    <h3 class="report-section-title">&#9889; Habit Matrix Summary</h3>
                    ${this.generateHabitMatrixSummary(habitData)}
                </div>

                <div class="report-footer">
                    <p style="font-size: 0.85rem; color: ${this.reportColors.medium};">
                        Generated on ${new Date().toLocaleDateString()} | Hijri: ${this.getHijriDate(new Date())}
                    </p>
                </div>
            `;

            return {
                title: `Monthly Report - ${monthName}`,
                content: reportHTML,
                startDate,
                endDate
            };
        }

        // Generate custom report
        generateCustomReport(startDateStr, endDateStr) {
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);

            // Get analytics data
            let prayerData = { overall: 0, bestDay: '-' };
            let habitData = { overallRate: 0, longestStreaks: [] };
            let productivityData = { totalDeepWorkHours: 0, totalTasksCompleted: 0 };
            let bioData = { averages: { hydration: 0, sleep: 0 } };

            if (this.calculator) {
                prayerData = this.calculator.calculatePrayerConsistency(startDateStr, endDateStr);
                habitData = this.calculator.calculateHabitStreaks(startDate.getFullYear(), startDate.getMonth());
                productivityData = this.calculator.calculateProductivityPatterns(startDateStr, endDateStr);
                bioData = this.calculator.calculateBioDataTrends(startDateStr, endDateStr);
            }

            const daysInRange = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            // Generate HTML report
            const reportHTML = `
                <div class="report-section">
                    <h3 class="report-section-title">&#9745; Spiritual Summary</h3>
                    <p><strong>Period:</strong> ${daysInRange} days (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})</p>
                    <p><strong>Prayer Consistency:</strong> ${prayerData.overall}%</p>
                    ${prayerData.bestDay !== '-' ? `<p><strong>Best Prayer Day:</strong> ${prayerData.bestDay}</p>` : ''}
                    <p><strong>Habit Completion:</strong> ${habitData.overallRate}%</p>
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#128200; Productivity Summary</h3>
                    <p><strong>Deep Work Hours:</strong> ${Math.round(productivityData.totalDeepWorkHours * 10) / 10}h</p>
                    <p><strong>Tasks Completed:</strong> ${productivityData.totalTasksCompleted}</p>
                </div>

                <div class="report-section">
                    <h3 class="report-section-title">&#9868; Health Summary</h3>
                    <p><strong>Avg Hydration:</strong> ${bioData.averages.hydration}/8 glasses</p>
                    <p><strong>Avg Sleep:</strong> ${bioData.averages.sleep} hours</p>
                </div>

                <div class="report-footer">
                    <p style="font-size: 0.85rem; color: ${this.reportColors.medium};">
                        Generated on ${new Date().toLocaleDateString()} | Hijri: ${this.getHijriDate(new Date())}
                    </p>
                </div>
            `;

            return {
                title: `Custom Report - ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`,
                content: reportHTML,
                startDate: startDateStr,
                endDate: endDateStr
            };
        }

        // Get weekly review data
        getWeeklyReviewData(sundayDate) {
            const data = this.loadData();
            const dateStr = sundayDate.toISOString().split('T')[0];
            const prefix = 'daily-' + dateStr + '-';

            const questions = [
                'What went well this week?',
                'What challenges did you face?',
                'What did you learn?',
                'What will you improve next week?',
                'Top 3 priorities for next week'
            ];

            let reviewHTML = '';
            let hasReview = false;

            questions.forEach((question, index) => {
                const key = prefix + 'weekly-review-q' + (index + 1);
                const answer = data[key];
                if (answer) {
                    hasReview = true;
                    reviewHTML += `<p style="margin-bottom: 0.75rem;"><strong>${question}</strong><br>${answer}</p>`;
                }
            });

            return hasReview ? reviewHTML : null;
        }

        // Get fasting data for the week
        getFastingData(weekStart, weekEnd) {
            const data = this.loadData();
            const settings = this.loadSettings();

            const fastingMonday = settings.fastMon;
            const fastingThursday = settings.fastThu;

            const monday = new Date(weekStart);
            monday.setDate(monday.getDate() + ((1 + 7 - monday.getDay()) % 7 || 7) - 1);

            const thursday = new Date(weekStart);
            thursday.setDate(thursday.getDate() + ((4 + 7 - thursday.getDay()) % 7 || 7) - 1);

            const mondayStr = monday.toISOString().split('T')[0];
            const thursdayStr = thursday.toISOString().split('T')[0];

            // Check if fasting was recorded
            const mondayFast = data['daily-' + mondayStr + '-fast'] === '1';
            const thursdayFast = data['daily-' + thursdayStr + '-fast'] === '1';

            return {
                monday: fastingMonday && monday.toISOString().split('T')[0] <= weekEnd.toISOString().split('T')[0],
                thursday: fastingThursday && thursday.toISOString().split('T')[0] <= weekEnd.toISOString().split('T')[0]
            };
        }

        // Get monthly goals progress
        getMonthlyGoalsProgress(year, month) {
            const data = this.loadData();
            const monthKey = year + '-' + String(month).padStart(2, '0');
            const goalsKey = 'monthly-' + monthKey + '-goals';

            let goals = [];
            try {
                goals = JSON.parse(data[goalsKey] || '[]');
            } catch {
                goals = [];
            }

            if (goals.length === 0) return `<p style="color: ${this.reportColors.medium};">No goals set for this month.</p>`;

            let html = '';
            goals.forEach((goal, index) => {
                const completed = goal.status === 'completed';
                const icon = completed ? '&#10003;' : '&#9898;';
                const statusClass = completed ? `color: ${this.reportColors.success};` : `color: ${this.reportColors.medium};`;
                html += `<p style="${statusClass}">${icon} ${goal.text || 'Goal ' + (index + 1)}</p>`;
            });

            return html;
        }

        // Generate habit matrix summary
        generateHabitMatrixSummary(habitData) {
            if (habitData.completionRates.length === 0) {
                return `<p style="color: ${this.reportColors.medium};">No habits tracked this month.</p>`;
            }

            let html = '<table style="width: 100%; border-collapse: collapse;">';
            html += `<tr style="border-bottom: 1px solid ${this.reportColors.border};"><th style="text-align: left; padding: 0.5rem;">Habit</th><th style="text-align: center; padding: 0.5rem;">Completion</th><th style="text-align: center; padding: 0.5rem;">Streak</th></tr>`;

            habitData.completionRates.forEach(habit => {
                const currentStreak = habitData.currentStreaks.find(s => s.habit === habit.habit);
                const streak = currentStreak ? currentStreak.streak : 0;
                html += `<tr style="border-bottom: 1px solid ${this.reportColors.borderLight};">
                    <td style="padding: 0.5rem;">${habit.habit || 'Unnamed'}</td>
                    <td style="text-align: center; padding: 0.5rem;">${habit.rate}%</td>
                    <td style="text-align: center; padding: 0.5rem;">${streak}d</td>
                </tr>`;
            });

            html += '</table>';
            return html;
        }
    }

    // ===== EXPORT =====
    window.ReportGenerator = ReportGenerator;

})();
