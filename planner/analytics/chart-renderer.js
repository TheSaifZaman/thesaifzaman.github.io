/* ============================================
   BARAKAH PLANNER - Chart Renderer
   Chart.js integration for analytics visualization
   ============================================ */

(function() {
    'use strict';

    // ===== CHART RENDERER CLASS =====
    class ChartRenderer {
        constructor() {
            this.charts = {};
            this.updateColors();
        }

        // Update colors from CSS variables
        updateColors() {
            const root = document.documentElement;
            const computedStyle = getComputedStyle(root);

            this.colors = {
                primary: computedStyle.getPropertyValue('--accent').trim() || '#2a5a3a',
                primaryLight: computedStyle.getPropertyValue('--accent-light').trim() || '#e8f0eb',
                secondary: computedStyle.getPropertyValue('--medium').trim() || '#666666',
                accent: computedStyle.getPropertyValue('--chart-info').trim() || '#3b82f6',
                success: computedStyle.getPropertyValue('--chart-success').trim() || '#10b981',
                warning: computedStyle.getPropertyValue('--chart-warning').trim() || '#f59e0b',
                danger: computedStyle.getPropertyValue('--chart-danger').trim() || '#ef4444',
                prayer: computedStyle.getPropertyValue('--accent').trim() || '#2a5a3a',
                habit: computedStyle.getPropertyValue('--routine-special').trim() || '#8b5cf6',
                productivity: computedStyle.getPropertyValue('--chart-info').trim() || '#3b82f6',
                health: computedStyle.getPropertyValue('--chart-success').trim() || '#10b981',
                routineRegular: computedStyle.getPropertyValue('--routine-regular').trim() || '#3498db',
                routineSpecial: computedStyle.getPropertyValue('--routine-special').trim() || '#9b59b6',
                routineIslamic: computedStyle.getPropertyValue('--routine-islamic').trim() || '#27ae60'
            };
        }

        // Destroy all charts
        destroyAllCharts() {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.destroy();
            });
            this.charts = {};
        }

        // Render prayer consistency bar chart
        renderPrayerChart(canvasId, prayerData) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;

            // Destroy existing chart if exists
            if (this.charts[canvasId]) {
                this.charts[canvasId].destroy();
            }

            const ctx = canvas.getContext('2d');

            // Prepare data
            const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            const data = prayers.map(p => prayerData.byPrayer[p.toLowerCase()] || 0);

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: prayers,
                    datasets: [{
                        label: 'Completion Rate (%)',
                        data: data,
                        backgroundColor: this.colors.prayer,
                        borderColor: this.colors.prayer,
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y + '% completed';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            this.charts[canvasId] = chart;
            return chart;
        }

        // Render habit streaks line chart
        renderHabitChart(canvasId, habitData) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;

            if (this.charts[canvasId]) {
                this.charts[canvasId].destroy();
            }

            const ctx = canvas.getContext('2d');

            // Take top 5 habits by completion rate
            const topHabits = habitData.completionRates
                .sort((a, b) => b.rate - a.rate)
                .slice(0, 5);

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: topHabits.map(h => h.habit || 'Unnamed'),
                    datasets: [{
                        label: 'Completion Rate (%)',
                        data: topHabits.map(h => h.rate),
                        borderColor: this.colors.habit,
                        backgroundColor: this.colors.habit + '20',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 6,
                        pointBackgroundColor: this.colors.habit
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y + '% completion';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            this.charts[canvasId] = chart;
            return chart;
        }

        // Render productivity patterns chart (bar chart)
        renderProductivityChart(canvasId, productivityData) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;

            if (this.charts[canvasId]) {
                this.charts[canvasId].destroy();
            }

            const ctx = canvas.getContext('2d');

            // Take last 7 days for clarity
            const recentData = productivityData.taskCompletion.slice(-7);
            const labels = recentData.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            });

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Tasks Completed',
                        data: recentData.map(d => d.completed),
                        backgroundColor: this.colors.productivity,
                        borderColor: this.colors.productivity,
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });

            this.charts[canvasId] = chart;
            return chart;
        }

        // Render bio-data trends line chart
        renderBioDataChart(canvasId, bioData) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return null;

            if (this.charts[canvasId]) {
                this.charts[canvasId].destroy();
            }

            const ctx = canvas.getContext('2d');

            // Take last 7 days for clarity
            const recentHydration = bioData.hydration.slice(-7);
            const recentSleep = bioData.sleep.slice(-7);

            const labels = recentHydration.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { weekday: 'short' });
            });

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Hydration (%)',
                            data: recentHydration.map(d => d.percentage),
                            borderColor: this.colors.success,
                            backgroundColor: this.colors.success + '20',
                            yAxisID: 'y',
                            tension: 0.4,
                            fill: false
                        },
                        {
                            label: 'Sleep (hours)',
                            data: recentSleep.map(d => d.hours),
                            borderColor: this.colors.accent,
                            backgroundColor: this.colors.accent + '20',
                            yAxisID: 'y1',
                            tension: 0.4,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Hydration %'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            beginAtZero: true,
                            max: 12,
                            grid: {
                                drawOnChartArea: false,
                            },
                            title: {
                                display: true,
                                text: 'Sleep Hours'
                            }
                        }
                    }
                }
            });

            this.charts[canvasId] = chart;
            return chart;
        }

        // Update all charts with new data
        updateAllCharts(analyticsData) {
            if (analyticsData.prayer) {
                this.renderPrayerChart('prayerChart', analyticsData.prayer);
            }
            if (analyticsData.habits) {
                this.renderHabitChart('habitChart', analyticsData.habits);
            }
            if (analyticsData.productivity) {
                this.renderProductivityChart('productivityChart', analyticsData.productivity);
            }
            if (analyticsData.bioData) {
                this.renderBioDataChart('bioDataChart', analyticsData.bioData);
            }
        }

        // Resize handler for responsive charts
        handleResize() {
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.resize();
            });
        }
    }

    // ===== EXPORT =====
    window.ChartRenderer = ChartRenderer;

})();
