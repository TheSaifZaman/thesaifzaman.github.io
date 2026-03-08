/* ============================================
   BARAKAH PLANNER - PDF Exporter
   PDF generation using html2pdf.js
   ============================================ */

(function() {
    'use strict';

    // ===== PDF EXPORTER CLASS =====
    class PdfExporter {
        constructor() {
            this.pdfColors = {};
            this.defaultOptions = {
                margin: [10, 10, 10, 10], // top, left, bottom, right in mm
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            // Initialize colors from CSS variables
            this.updatePdfColors();
        }

        // Update PDF colors from CSS variables
        updatePdfColors() {
            const computedStyle = getComputedStyle(document.documentElement);
            this.pdfColors = {
                text: computedStyle.getPropertyValue('--dark').trim() || '#1a1a1a',
                accent: computedStyle.getPropertyValue('--accent').trim() || '#2a5a3a',
                medium: computedStyle.getPropertyValue('--medium').trim() || '#666666',
                muted: computedStyle.getPropertyValue('--muted').trim() || '#999999',
                border: computedStyle.getPropertyValue('--shade-10').trim() || '#e8e8e8',
                borderLight: computedStyle.getPropertyValue('--shade-5').trim() || '#ddd',
                borderLighter: computedStyle.getPropertyValue('--faint').trim() || '#eee'
            };
        }

        // Export HTML content to PDF
        exportToPDF(htmlContent, filename, options = {}) {
            return new Promise((resolve, reject) => {
                // Check if html2pdf is available
                if (typeof html2pdf === 'undefined') {
                    reject(new Error('html2pdf library is not loaded'));
                    return;
                }

                // Create a temporary container for the content
                const container = document.createElement('div');
                container.className = 'pdf-export-container';
                container.innerHTML = this.wrapContentForPDF(htmlContent);
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.width = '210mm'; // A4 width
                document.body.appendChild(container);

                // Merge options
                const pdfOptions = { ...this.defaultOptions, ...options };

                // Generate PDF
                html2pdf()
                    .set(pdfOptions)
                    .from(container)
                    .save(filename)
                    .then(() => {
                        document.body.removeChild(container);
                        resolve(filename);
                    })
                    .catch((error) => {
                        document.body.removeChild(container);
                        reject(error);
                    });
            });
        }

        // Export an element to PDF
        exportElementToPDF(elementId, filename, options = {}) {
            return new Promise((resolve, reject) => {
                const element = document.getElementById(elementId);
                if (!element) {
                    reject(new Error(`Element with id "${elementId}" not found`));
                    return;
                }

                if (typeof html2pdf === 'undefined') {
                    reject(new Error('html2pdf library is not loaded'));
                    return;
                }

                // Clone the element to avoid modifying the original
                const clone = element.cloneNode(true);

                // Create a temporary container
                const container = document.createElement('div');
                container.className = 'pdf-export-container';
                container.innerHTML = this.wrapContentForPDF(clone.innerHTML);
                container.style.position = 'absolute';
                container.style.left = '-9999px';
                container.style.width = '210mm'; // A4 width
                document.body.appendChild(container);

                // Merge options
                const pdfOptions = { ...this.defaultOptions, ...options };

                // Generate PDF
                html2pdf()
                    .set(pdfOptions)
                    .from(container)
                    .save(filename)
                    .then(() => {
                        document.body.removeChild(container);
                        resolve(filename);
                    })
                    .catch((error) => {
                        document.body.removeChild(container);
                        reject(error);
                    });
            });
        }

        // Wrap content with PDF-specific styling
        wrapContentForPDF(content) {
            return `
                <div style="
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    color: ${this.pdfColors.text};
                    line-height: 1.6;
                    padding: 10mm;
                ">
                    <!-- Islamic decorative header -->
                    <div style="
                        text-align: center;
                        margin-bottom: 10mm;
                        padding-bottom: 5mm;
                        border-bottom: 2px solid ${this.pdfColors.accent};
                    ">
                        <p style="
                            font-family: 'Amiri', serif;
                            font-size: 14pt;
                            color: ${this.pdfColors.accent};
                            margin: 0 0 3pt 0;
                        ">&#65021; In the Name of Allah, the Most Gracious, the Most Merciful</p>
                        <p style="
                            font-size: 10pt;
                            color: ${this.pdfColors.medium};
                            margin: 0;
                        ">Al-hamdulillah — All praise is due to Allah</p>
                    </div>

                    <!-- Main content -->
                    <div>
                        ${content}
                    </div>

                    <!-- Footer -->
                    <div style="
                        margin-top: 10mm;
                        padding-top: 5mm;
                        border-top: 1px solid ${this.pdfColors.border};
                        text-align: center;
                        font-size: 8pt;
                        color: ${this.pdfColors.muted};
                    ">
                        <p>Generated by Barakah Planner — barakahplanner.com</p>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            `;
        }

        // Export chart as image and include in PDF
        exportChartToPDF(chartId, title, filename) {
            return new Promise((resolve, reject) => {
                const canvas = document.getElementById(chartId);
                if (!canvas) {
                    reject(new Error(`Chart canvas with id "${chartId}" not found`));
                    return;
                }

                // Get chart image data
                const imageData = canvas.toDataURL('image/png');

                // Create HTML with the chart image
                const content = `
                    <div style="text-align: center; margin-bottom: 10mm;">
                        <h2 style="color: ${this.pdfColors.accent}; margin-bottom: 5mm;">${title}</h2>
                        <img src="${imageData}" style="max-width: 100%; height: auto;" alt="${title}">
                    </div>
                `;

                this.exportToPDF(content, filename)
                    .then(resolve)
                    .catch(reject);
            });
        }

        // Export multiple charts to a single PDF
        exportMultipleChartsToPDF(charts, filename) {
            return new Promise((resolve, reject) => {
                const content = charts.map(chart => {
                    const canvas = document.getElementById(chart.id);
                    if (!canvas) return '';

                    const imageData = canvas.toDataURL('image/png');
                    return `
                        <div style="text-align: center; margin-bottom: 10mm; page-break-inside: avoid;">
                            <h3 style="color: ${this.pdfColors.accent}; margin-bottom: 3mm;">${chart.title}</h3>
                            <img src="${imageData}" style="max-width: 100%; height: auto;" alt="${chart.title}">
                        </div>
                    `;
                }).join('');

                this.exportToPDF(content, filename)
                    .then(resolve)
                    .catch(reject);
            });
        }

        // Generate and download a complete analytics report
        exportAnalyticsReport(analyticsData, filename) {
            const reportDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const content = `
                <h1 style="color: ${this.pdfColors.accent}; text-align: center; margin-bottom: 5mm;">Barakah Analytics Report</h1>
                <p style="text-align: center; color: ${this.pdfColors.medium}; margin-bottom: 10mm;">${reportDate}</p>

                ${this.generateReportSection('Prayer Consistency', this.formatPrayerData(analyticsData.prayer))}
                ${this.generateReportSection('Habit Streaks', this.formatHabitData(analyticsData.habits))}
                ${this.generateReportSection('Productivity', this.formatProductivityData(analyticsData.productivity))}
                ${this.generateReportSection('Health Trends', this.formatBioData(analyticsData.bioData))}
            `;

            return this.exportToPDF(content, filename);
        }

        // Helper to generate report sections
        generateReportSection(title, content) {
            return `
                <div style="margin-bottom: 8mm; page-break-inside: avoid;">
                    <h2 style="color: ${this.pdfColors.accent}; border-bottom: 1px solid ${this.pdfColors.border}; padding-bottom: 2mm; margin-bottom: 3mm;">${title}</h2>
                    ${content}
                </div>
            `;
        }

        // Format prayer data for report
        formatPrayerData(prayerData) {
            if (!prayerData) return '<p>No data available</p>';

            return `
                <p><strong>Overall Consistency:</strong> ${prayerData.overall || 0}%</p>
                ${prayerData.bestDay && prayerData.bestDay !== '-' ? `<p><strong>Best Day:</strong> ${prayerData.bestDay}</p>` : ''}
                ${prayerData.byPrayer ? `
                    <table style="width: 100%; margin-top: 3mm; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid ${this.pdfColors.borderLight};">
                            <th style="text-align: left; padding: 2mm;">Prayer</th>
                            <th style="text-align: center; padding: 2mm;">Completion</th>
                        </tr>
                        ${Object.entries(prayerData.byPrayer).map(([prayer, rate]) => `
                            <tr style="border-bottom: 1px solid ${this.pdfColors.borderLighter};">
                                <td style="padding: 2mm;">${prayer.charAt(0).toUpperCase() + prayer.slice(1)}</td>
                                <td style="text-align: center; padding: 2mm;">${rate}%</td>
                            </tr>
                        `).join('')}
                    </table>
                ` : ''}
            `;
        }

        // Format habit data for report
        formatHabitData(habitData) {
            if (!habitData || habitData.completionRates?.length === 0) {
                return '<p>No habits tracked</p>';
            }

            return `
                <p><strong>Overall Completion:</strong> ${habitData.overallRate || 0}%</p>
                ${habitData.longestStreaks?.length > 0 ? `<p><strong>Longest Streak:</strong> ${habitData.longestStreaks[0].streak} days (${habitData.longestStreaks[0].habit})</p>` : ''}
                ${habitData.completionRates?.length > 0 ? `
                    <table style="width: 100%; margin-top: 3mm; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid ${this.pdfColors.borderLight};">
                            <th style="text-align: left; padding: 2mm;">Habit</th>
                            <th style="text-align: center; padding: 2mm;">Completion</th>
                            <th style="text-align: center; padding: 2mm;">Current Streak</th>
                        </tr>
                        ${habitData.completionRates.map(habit => {
                            const streak = habitData.currentStreaks?.find(s => s.habit === habit.habit);
                            return `
                                <tr style="border-bottom: 1px solid ${this.pdfColors.borderLighter};">
                                    <td style="padding: 2mm;">${habit.habit || 'Unnamed'}</td>
                                    <td style="text-align: center; padding: 2mm;">${habit.rate}%</td>
                                    <td style="text-align: center; padding: 2mm;">${streak?.streak || 0}d</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                ` : ''}
            `;
        }

        // Format productivity data for report
        formatProductivityData(productivityData) {
            if (!productivityData) return '<p>No data available</p>';

            return `
                <p><strong>Total Deep Work Hours:</strong> ${Math.round((productivityData.totalDeepWorkHours || 0) * 10) / 10}h</p>
                <p><strong>Tasks Completed:</strong> ${productivityData.totalTasksCompleted || 0}</p>
                ${productivityData.peakHours?.length > 0 ? `<p><strong>Peak Hours:</strong> ${productivityData.peakHours.join(', ')}</p>` : ''}
            `;
        }

        // Format bio-data for report
        formatBioData(bioData) {
            if (!bioData || !bioData.averages) return '<p>No data available</p>';

            return `
                <p><strong>Average Hydration:</strong> ${bioData.averages.hydration || 0}/8 glasses daily</p>
                <p><strong>Average Sleep:</strong> ${bioData.averages.sleep || 0} hours</p>
                <p><strong>Movement Consistency:</strong> ${bioData.averages.movementPercentage || 0}% of days</p>
                ${bioData.trends?.hydration ? `
                    <p><strong>Hydration Trend:</strong> ${bioData.trends.hydration.direction === 'up' ? '&#8593; Increasing' : (bioData.trends.hydration.direction === 'down' ? '&#8595; Decreasing' : '&#8594; Stable')}
                    (${Math.abs(bioData.trends.hydration.change)}%)</p>
                ` : ''}
            `;
        }

        // Print directly without PDF
        printContent(htmlContent, title) {
            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                alert('Please allow popups to print reports');
                return;
            }

            const wrappedContent = this.wrapContentForPDF(htmlContent);

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${title}</title>
                    <style>
                        @page { margin: 10mm; }
                        body { font-family: 'Inter', sans-serif; line-height: 1.6; }
                        table { border-collapse: collapse; width: 100%; }
                        th, td { padding: 3mm; text-align: left; }
                        th { border-bottom: 2px solid #2a5a3a; }
                        td { border-bottom: 1px solid #eee; }
                    </style>
                </head>
                <body>${wrappedContent}</body>
                </html>
            `);
            printWindow.document.close();

            // Wait for content to load, then print
            printWindow.onload = function() {
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 250);
            };
        }
    }

    // ===== EXPORT =====
    window.PdfExporter = PdfExporter;

})();
