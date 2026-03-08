/* ============================================
   BARAKAH PLANNER - Notification Manager
   Prayer times, fasting reminders, daily reviews, custom reminders
   ============================================ */

(function() {
    'use strict';

    // ===== NOTIFICATION MANAGER CLASS =====
    class NotificationManager {
        constructor() {
            this.permission = 'default';
            this.scheduledNotifications = new Map();
            this.monitoringInterval = null;
            this.settings = {
                prayerEnabled: true,
                prayerOffset: 10, // minutes before prayer
                fastingEnabled: true,
                dailyReviewEnabled: true,
                dailyReviewTime: '20:00',
                soundEnabled: true,
                customReminders: []
            };
            this.loadSettings();
        }

        // Load notification settings from localStorage
        loadSettings() {
            try {
                const saved = localStorage.getItem('bb-notification-settings');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.settings = { ...this.settings, ...parsed };
                }
            } catch (e) {
                console.warn('Failed to load notification settings:', e);
            }
        }

        // Save notification settings to localStorage
        saveSettings() {
            localStorage.setItem('bb-notification-settings', JSON.stringify(this.settings));
        }

        // Request browser notification permission
        async requestPermission() {
            if (!('Notification' in window)) {
                this.showToast('Not Supported', 'Your browser does not support notifications', 'warning');
                return false;
            }

            if (Notification.permission === 'granted') {
                this.permission = 'granted';
                return true;
            }

            if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                this.permission = permission;
                if (permission === 'granted') {
                    this.showToast('Success', 'Notifications enabled!', 'success');
                    return true;
                } else {
                    this.showToast('Blocked', 'Please enable notifications in your browser settings', 'warning');
                    return false;
                }
            }

            this.permission = 'denied';
            this.showToast('Blocked', 'Notifications are blocked. Please enable them in browser settings.', 'warning');
            return false;
        }

        // Schedule notification with options
        schedule(id, title, body, time, data = {}) {
            const notification = {
                id,
                title,
                body,
                time, // ISO string or time string "HH:MM"
                data,
                triggered: false
            };

            this.scheduledNotifications.set(id, notification);
            this.saveScheduledNotifications();
        }

        // Cancel scheduled notification
        cancel(id) {
            if (this.scheduledNotifications.has(id)) {
                this.scheduledNotifications.delete(id);
                this.saveScheduledNotifications();
            }
        }

        // Save scheduled notifications to localStorage
        saveScheduledNotifications() {
            const toSave = Array.from(this.scheduledNotifications.values())
                .filter(n => !n.triggered)
                .map(n => ({
                    id: n.id,
                    title: n.title,
                    body: n.body,
                    time: n.time,
                    data: n.data
                }));
            localStorage.setItem('bb-scheduled-notifications', JSON.stringify(toSave));
        }

        // Load scheduled notifications from localStorage
        loadScheduledNotifications() {
            try {
                const saved = localStorage.getItem('bb-scheduled-notifications');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    parsed.forEach(n => {
                        this.scheduledNotifications.set(n.id, n);
                    });
                }
            } catch (e) {
                console.warn('Failed to load scheduled notifications:', e);
            }
        }

        // Show immediate toast notification
        showToast(title, message, type = 'info', duration = 5000) {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-icon">${this.getToastIcon(type)}</div>
                <div class="toast-content">
                    <div class="toast-title">${this.escapeHtml(title)}</div>
                    <div class="toast-message">${this.escapeHtml(message)}</div>
                </div>
                <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
            `;

            container.appendChild(toast);

            // Trigger animation
            setTimeout(() => toast.classList.add('toast-show'), 10);

            // Auto-remove
            if (duration > 0) {
                setTimeout(() => {
                    toast.classList.remove('toast-show');
                    setTimeout(() => toast.remove(), 300);
                }, duration);
            }
        }

        // Get toast icon based on type
        getToastIcon(type) {
            const icons = {
                info: '&#8505;',
                success: '&#10004;',
                warning: '&#9888;',
                spiritual: '&#9745;',
                prayer: '&#9745;',
                fasting: '&#9832;',
                review: '&#128197;'
            };
            return icons[type] || icons.info;
        }

        // Escape HTML to prevent XSS
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Show browser notification
        showBrowserNotification(title, body, options = {}) {
            if (this.permission !== 'granted') return;

            const notification = new Notification(title, {
                body,
                icon: options.icon || this.getDefaultIcon(),
                badge: options.badge,
                tag: options.tag,
                requireInteraction: options.requireInteraction || false,
                silent: !this.settings.soundEnabled
            });

            notification.onclick = (event) => {
                event.preventDefault();
                window.focus();
                notification.close();
            };
        }

        // Get default notification icon
        getDefaultIcon() {
            // Return a simple Islamic-inspired icon or emoji
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHRleHQgeD0iMzIiIHk9IjQ4IiBmb250LXNpemU9IjQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMmE1YTNhIj7wn5FlPC90ZXh0Pjwvc3ZnPg==';
        }

        // Background monitoring loop
        startMonitoring() {
            // Check every minute
            this.monitoringInterval = setInterval(() => {
                this.checkScheduledNotifications();
                this.checkPrayerTimes();
                this.checkFastingDays();
                this.checkDailyReview();
            }, 60000); // 60 seconds

            // Initial check
            this.checkScheduledNotifications();
            this.schedulePrayerTimesForToday();
        }

        // Stop monitoring
        stopMonitoring() {
            if (this.monitoringInterval) {
                clearInterval(this.monitoringInterval);
                this.monitoringInterval = null;
            }
        }

        // Check scheduled notifications
        checkScheduledNotifications() {
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // HH:MM

            this.scheduledNotifications.forEach((notification, id) => {
                if (notification.triggered) return;

                const notifyTime = notification.time;
                if (notifyTime === currentTime) {
                    this.triggerNotification(notification);
                }
            });
        }

        // Trigger a notification
        triggerNotification(notification) {
            notification.triggered = true;
            this.showToast(notification.title, notification.body, 'info');
            this.showBrowserNotification(notification.title, notification.body);

            // If it's a recurring notification, reschedule
            if (notification.data.recurring) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                notification.time = tomorrow.toTimeString().slice(0, 5);
                notification.triggered = false;
            } else {
                this.scheduledNotifications.delete(notification.id);
            }

            this.saveScheduledNotifications();
        }

        // Check prayer times for notifications
        checkPrayerTimes() {
            if (!this.settings.prayerEnabled) return;

            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);

            // Get today's prayer times from cache
            const today = now.toISOString().split('T')[0];
            const prayerTimes = this.getPrayerTimesForDate(today);

            if (!prayerTimes) return;

            const offsetMinutes = this.settings.prayerOffset || 0;
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

            prayers.forEach(prayer => {
                const prayerTime = prayerTimes[prayer];
                if (!prayerTime) return;

                // Calculate notification time (prayer time - offset)
                const notifyTime = this.subtractMinutes(prayerTime, offsetMinutes);

                if (currentTime === notifyTime) {
                    const prayerName = this.capitalizeFirst(prayer);
                    const message = offsetMinutes > 0
                        ? `${prayerName} time in ${offsetMinutes} minutes`
                        : `${prayerName} time has begun`;

                    this.showToast(
                        `Prayer Time - ${prayerName}`,
                        message,
                        'prayer'
                    );
                    this.showBrowserNotification(
                        `${prayerName} Prayer`,
                        message,
                        { tag: `prayer-${prayer}` }
                    );
                }
            });
        }

        // Schedule prayer times for today
        schedulePrayerTimesForToday() {
            if (!this.settings.prayerEnabled) return;

            const today = new Date().toISOString().split('T')[0];
            const prayerTimes = this.getPrayerTimesForDate(today);

            if (!prayerTimes) return;

            const offsetMinutes = this.settings.prayerOffset || 0;
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

            prayers.forEach(prayer => {
                const prayerTime = prayerTimes[prayer];
                if (!prayerTime) return;

                const notifyTime = this.subtractMinutes(prayerTime, offsetMinutes);
                const prayerName = this.capitalizeFirst(prayer);

                this.schedule(
                    `prayer-${prayer}`,
                    `${prayerName} Prayer`,
                    `${prayerName} time ${offsetMinutes > 0 ? 'in ' + offsetMinutes + ' minutes' : 'now'}`,
                    notifyTime,
                    { type: 'prayer', recurring: true }
                );
            });
        }

        // Get prayer times for a specific date from cache
        getPrayerTimesForDate(date) {
            try {
                const cache = JSON.parse(localStorage.getItem('bb-prayer-times-cache') || '{}');
                // Find matching entry for the date
                const key = Object.keys(cache).find(k => k.startsWith(date));
                return key ? cache[key] : null;
            } catch {
                return null;
            }
        }

        // Check fasting days (Monday & Thursday)
        checkFastingDays() {
            if (!this.settings.fastingEnabled) return;

            const now = new Date();
            const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

            // Check at 6:00 AM
            if (currentTime === '06:00') {
                const settings = this.loadAppSettings();
                const isMonday = dayOfWeek === 1 && settings.fastMon;
                const isThursday = dayOfWeek === 4 && settings.fastThu;

                if (isMonday || isThursday) {
                    const dayName = isMonday ? 'Monday' : 'Thursday';
                    this.showToast(
                        'Fasting Day Reminder',
                        `Today is ${dayName} - a recommended day for Sunnah fasting`,
                        'fasting'
                    );
                    this.showBrowserNotification(
                        'Sunnah Fast Today',
                        `Today is ${dayName} - consider fasting`,
                        { tag: 'fasting-reminder' }
                    );
                }
            }
        }

        // Check daily review reminder
        checkDailyReview() {
            if (!this.settings.dailyReviewEnabled) return;

            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5);
            const reviewTime = this.settings.dailyReviewTime || '20:00';

            if (currentTime === reviewTime) {
                this.showToast(
                    'Daily Review',
                    'Time for your evening daily review',
                    'review'
                );
                this.showBrowserNotification(
                    'Daily Review Time',
                    'Complete your daily review before sleeping',
                    { tag: 'daily-review', requireInteraction: true }
                );
            }
        }

        // Load app settings for fasting preferences
        loadAppSettings() {
            try {
                return JSON.parse(localStorage.getItem('bb-settings') || '{}');
            } catch {
                return {};
            }
        }

        // Helper: Subtract minutes from time string (HH:MM)
        subtractMinutes(timeStr, minutes) {
            const [hours, mins] = timeStr.split(':').map(Number);
            const totalMinutes = hours * 60 + mins - minutes;
            const newHours = Math.floor(totalMinutes / 60);
            const newMins = totalMinutes % 60;
            return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
        }

        // Helper: Capitalize first letter
        capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Update settings
        updateSetting(key, value) {
            this.settings[key] = value;
            this.saveSettings();

            // Restart monitoring if needed
            if (key.includes('Enabled')) {
                this.stopMonitoring();
                this.startMonitoring();
            }
        }

        // Sync Adhan times to time blocks (called from app.js)
        syncAdhanToTimeBlocks() {
            // This will be called from app.js to update time blocks
            // when prayer times are fetched
        }

        // Initialize
        async initialize() {
            this.loadScheduledNotifications();

            // Check permission status
            if ('Notification' in window) {
                this.permission = Notification.permission;

                // If already granted, start monitoring
                if (this.permission === 'granted') {
                    this.startMonitoring();
                    this.schedulePrayerTimesForToday();
                }
            }

            // Show welcome toast on first load
            if (!localStorage.getItem('bb-notification-welcome-shown')) {
                setTimeout(() => {
                    this.showToast(
                        'Notifications Available',
                        'Enable notifications for prayer times and reminders in Settings',
                        'spiritual',
                        8000
                    );
                    localStorage.setItem('bb-notification-welcome-shown', 'true');
                }, 2000);
            }

            return this;
        }
    }

    // ===== EXPORT =====
    window.NotificationManager = NotificationManager;

    // Auto-initialize if app.js is loaded
    if (window.appNotificationManager) {
        // Already initialized
    } else {
        // Will be initialized by app.js
    }

})();
