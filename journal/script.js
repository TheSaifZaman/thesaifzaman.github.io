// --- CONFIG ---
const PRAYER_METHOD = 2; // ISNA by default, can be dynamic
// Simple Prayer Times Calculation (Approximation logic or API)
// For this standalone file, we'll try to use Aladhan API if online, else fallback

const state = {
    currentDate: new Date(),
    // Initialize with defaults to ensure UI is never empty
    prayerTimes: { Fajr: "05:15", Sunrise: "06:30", Dhuhr: "12:00", Asr: "15:15", Sunset: "17:45", Maghrib: "17:45", Isha: "19:00" },
    location: { lat: 23.8103, lng: 90.4125 }, // Default Dhaka, BD
    taskIdCounter: 0,
    tasks: {
        eatTheFrogTasks: [],
        todoListTasks: []
    },
    pomodoro: {
        timeLeft: 25 * 60, // 25 minutes in seconds
        isRunning: false,
        isBreak: false,
        workDuration: 25 * 60,
        breakDuration: 5 * 60,
        interval: null
    }
};

// --- POMODORO TIMER FUNCTIONS ---
function updatePomodoroDisplay() {
    const minutes = Math.floor(state.pomodoro.timeLeft / 60);
    const seconds = state.pomodoro.timeLeft % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const pomodoroDisplay = document.getElementById('pomodoroDisplay');
    const pomodoroStatus = document.getElementById('pomodoroStatus');

    if (pomodoroDisplay) {
        pomodoroDisplay.textContent = display;
    }

    if (pomodoroStatus) {
        pomodoroStatus.textContent = state.pomodoro.isBreak ? 'Break Time' : 'Work Time';
    }
}

function startPomodoro() {
    if (!state.pomodoro.isRunning) {
        state.pomodoro.isRunning = true;
        state.pomodoro.interval = setInterval(() => {
            if (state.pomodoro.timeLeft > 0) {
                state.pomodoro.timeLeft--;
                updatePomodoroDisplay();
            } else {
                // Timer finished
                clearInterval(state.pomodoro.interval);
                state.pomodoro.isRunning = false;

                // Switch between work and break
                state.pomodoro.isBreak = !state.pomodoro.isBreak;
                state.pomodoro.timeLeft = state.pomodoro.isBreak ?
                    state.pomodoro.breakDuration : state.pomodoro.workDuration;

                updatePomodoroDisplay();

                // Play a notification sound or show alert
                alert(state.pomodoro.isBreak ? 'Break time! Take a 5-minute rest.' : 'Work time! Back to focus.');
            }
        }, 1000);

        updatePomodoroDisplay();
    }
}

function stopPomodoro() {
    if (state.pomodoro.isRunning) {
        clearInterval(state.pomodoro.interval);
        state.pomodoro.isRunning = false;
    }
}

function resetPomodoro() {
    stopPomodoro();
    state.pomodoro.timeLeft = state.pomodoro.workDuration;
    state.pomodoro.isBreak = false;
    updatePomodoroDisplay();
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initSchedule();
    initTasks();
    initPomodoro();
    // Render initial state (defaults) immediately
    updatePrayerDisplay(state.prayerTimes);
    updateDailyView(state.currentDate);
    setupAutoSave();

});

function initPomodoro() {
    updatePomodoroDisplay();
}

// --- TASK MANAGEMENT FUNCTIONS ---
function initTasks() {
    // Initialize default tasks
    addTask('eatTheFrogTasks', 'Most Important Task');
    addTask('eatTheFrogTasks', '');
    addTask('eatTheFrogTasks', '');

    addTask('todoListTasks', '');
    addTask('todoListTasks', '');
    addTask('todoListTasks', '');
}

function addTask(containerId, placeholder = '') {
    const taskId = `task_${state.taskIdCounter++}`;
    const task = {
        id: taskId,
        text: placeholder,
        completed: false
    };

    state.tasks[containerId].push(task);
    renderTasks(containerId);
    saveTasks();
}

function deleteTask(containerId, taskId) {
    state.tasks[containerId] = state.tasks[containerId].filter(task => task.id !== taskId);
    renderTasks(containerId);
    saveTasks();
}

function toggleTask(containerId, taskId) {
    const task = state.tasks[containerId].find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

function updateTaskText(containerId, taskId, text) {
    const task = state.tasks[containerId].find(task => task.id === taskId);
    if (task) {
        task.text = text;
        saveTasks();
    }
}

function renderTasks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    state.tasks[containerId].forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}
                   onchange="toggleTask('${containerId}', '${task.id}')">
            <input type="text" value="${task.text}"
                   placeholder="${containerId === 'eatTheFrogTasks' ? 'Important task...' : 'Task...'}"
                   onchange="updateTaskText('${containerId}', '${task.id}', this.value)"
                   onfocus="this.select()">
            <div class="task-controls">
                <button class="task-btn delete" onclick="deleteTask('${containerId}', '${task.id}')">🗑️</button>
            </div>
        `;
        container.appendChild(taskDiv);
    });
}

function saveTasks() {
    localStorage.setItem('dailyTasks', JSON.stringify(state.tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('dailyTasks');
    if (saved) {
        try {
            state.tasks = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading tasks:', e);
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const isHidden = sidebar.style.display === 'none';
    sidebar.style.display = isHidden ? 'flex' : 'none';
}

// Initialize mobile sidebar toggle on load
function initializeMobileSidebar() {
    const mobileHeader = document.getElementById('mobileHeader');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

    if (window.innerWidth <= 768) {
        mobileHeader.style.display = 'flex';
        sidebarCloseBtn.style.display = 'block';
    } else {
        mobileHeader.style.display = 'none';
        sidebarCloseBtn.style.display = 'none';
        document.getElementById('sidebar').style.display = 'flex';
    }
}

// Listen for window resize
window.addEventListener('resize', initializeMobileSidebar);
document.addEventListener('DOMContentLoaded', initializeMobileSidebar);

function printSection(id) {
    // Remove previous active classes
    document.querySelectorAll('.page').forEach(p => p.classList.remove('print-active'));
    document.body.classList.add('printing-section');

    // Add active class to target
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('print-active');
        window.print();
    }

    // Cleanup after print (timeout to ensure print dialog captures state)
    setTimeout(() => {
        document.body.classList.remove('printing-section');
        el.classList.remove('print-active');
    }, 1000);
}

// --- CALENDAR LOGIC ---
function initCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const monthLabel = document.getElementById('currentMonthYear');

    const renderCalendar = (date) => {
        calendarDays.innerHTML = '';
        // Add Day Headers
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(d => {
            const h = document.createElement('div');
            h.className = 'calendar-day-header';
            h.innerText = d;
            calendarDays.appendChild(h);
        });

        const year = date.getFullYear();
        const month = date.getMonth();

        monthLabel.innerText = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            const d = document.createElement('div');
            d.className = 'calendar-day empty';
            calendarDays.appendChild(d);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const d = document.createElement('div');
            d.className = 'calendar-day';
            d.innerText = i;

            // Check if this is a Friday
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 5) { // Friday is day 5 (0 = Sunday)
                d.classList.add('friday');
            }

            if (i === state.currentDate.getDate() && month === state.currentDate.getMonth() && year === state.currentDate.getFullYear()) {
                d.classList.add('active');
            }

            d.onclick = () => {
                state.currentDate = new Date(year, month, i);
                renderCalendar(state.currentDate);
                updateDailyView(state.currentDate);
            };

            calendarDays.appendChild(d);
        }
    };

    renderCalendar(state.currentDate);

    // Controls
    document.getElementById('prevMonth').onclick = () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        renderCalendar(state.currentDate);
    };
    document.getElementById('nextMonth').onclick = () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        renderCalendar(state.currentDate);
    };
}

function updateToToday() {
    state.currentDate = new Date();
    initCalendar();
    updateDailyView(state.currentDate);
}

// --- SCHEDULE & PRAYER TIMES ---
async function updateDailyView(date) {
    try {
        // Load tasks
        loadTasks();
        renderTasks('eatTheFrogTasks');
        renderTasks('todoListTasks');

        // Update Headers
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dailyDateEl = document.getElementById('dailyDate');
        if (dailyDateEl) {
            dailyDateEl.value = date.toLocaleDateString('en-US', options);
        }

        // Error source: 'monthInput' does not exist in HTML. Removing or making optional.
        const monthInputEl = document.getElementById('monthInput');
        if (monthInputEl) {
            monthInputEl.value = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        }

        // Fetch Hijri & Prayer Times logic here
        // Mocking Hijri for now or using Intl if available
        const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
        const dailyHijriEl = document.getElementById('dailyHijri');
        if (dailyHijriEl) {
            dailyHijriEl.value = hijriDate;
        }

        await fetchPrayerTimes(date);
        renderEnhancedSchedule(date);
    } catch (err) {
        console.error("Critical Error in updateDailyView:", err);
    }
}

async function fetchPrayerTimes(date) {
    // Proper date formatting DD-MM-YYYY
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    const formattedDate = `${d}-${m}-${y}`;

    const url = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${state.location.lat}&longitude=${state.location.lng}&method=${PRAYER_METHOD}&_=${new Date().getTime()}`;
    console.log('Fetching prayer times from:', url);

    try {
        const res = await fetch(url);
        console.log('API Response status:', res.status);
        const data = await res.json();
        console.log('API Data:', data);

        if (data.code === 200 && data.data && data.data.timings) {
            state.prayerTimes = data.data.timings;
            updatePrayerDisplay(state.prayerTimes);
        } else {
            throw new Error('Invalid API response');
        }
    } catch (e) {
        console.warn("Using offline/default prayer times due to error:", e);
        if (!state.prayerTimes) {
            state.prayerTimes = { Fajr: "05:15", Sunrise: "06:30", Dhuhr: "12:00", Asr: "15:15", Sunset: "17:45", Maghrib: "17:45", Isha: "19:00" };
            updatePrayerDisplay(state.prayerTimes);
        }
    }
}

function updatePrayerDisplay(times) {
    const summary = document.getElementById('prayerListSmall');
    if (!summary) return;

    // Update sun times - prefer Sunset key if available, else Maghrib
    document.getElementById('sunriseTime').textContent = times.Sunrise || '--:--';
    document.getElementById('sunsetTime').textContent = times.Sunset || times.Maghrib || '--:--';

    // Update prayer times with icons and better styling
    summary.innerHTML = `
        <div class="prayer-row">
            <span class="prayer-name">🌙 Fajr</span>
            <span class="prayer-time">${times.Fajr}</span>
        </div>
        <div class="prayer-row">
            <span class="prayer-name">☀️ Duha</span>
            <span class="prayer-time">${times.Sunrise}</span>
        </div>
        <div class="prayer-row">
            <span class="prayer-name">☀️ Dhuhr</span>
            <span class="prayer-time">${times.Dhuhr}</span>
        </div>
        <div class="prayer-row">
            <span class="prayer-name">🌅 Asr</span>
            <span class="prayer-time">${times.Asr}</span>
        </div>
        <div class="prayer-row">
            <span class="prayer-name">🌇 Maghrib</span>
            <span class="prayer-time">${times.Maghrib}</span>
        </div>
        <div class="prayer-row">
            <span class="prayer-name">🌙 Isha</span>
            <span class="prayer-time">${times.Isha}</span>
        </div>
    `;
}

function initSchedule() {
    // Initial render
    renderEnhancedSchedule(state.currentDate);
}

function renderEnhancedSchedule(date) {
    const container = document.getElementById('scheduleContainer');
    container.innerHTML = '';

    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const prayerMarkers = state.prayerTimes ? {
        Fajr: state.prayerTimes.Fajr,
        Sunrise: state.prayerTimes.Sunrise,
        Dhuhr: state.prayerTimes.Dhuhr,
        Asr: state.prayerTimes.Asr,
        Maghrib: state.prayerTimes.Maghrib,
        Isha: state.prayerTimes.Isha
    } : {};

    // Helper function to get prayer time in minutes
    const getPrayerMinutes = (timeStr) => {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(':').map(Number);
        return h * 60 + m;
    };

    for (let i = 4; i < 28; i++) { // 4 AM to 4 AM next day
        let displayHour = i % 24;
        let displayTime = displayHour.toString().padStart(2, '0') + ":00";
        let isPrayerTime = false;
        let prayerInfo = "";
        let placeholder = "";
        let rowClass = "schedule-row";

        // Check for prayer times
        for (const [prayerName, prayerTime] of Object.entries(prayerMarkers)) {
            if (prayerTime) {
                const prayerHour = parseInt(prayerTime.split(':')[0]);
                const prayerMinute = parseInt(prayerTime.split(':')[1]);

                if (prayerHour === displayHour ||
                    (displayHour === 5 && prayerName === 'Fajr' && prayerHour < 5) ||
                    (displayHour === 18 && prayerName === 'Maghrib' && prayerHour >= 18)) {

                    isPrayerTime = true;
                    prayerInfo = `${prayerName} (${prayerTime})`;
                    rowClass = "schedule-row prayer-time";
                    break;
                }
            }
        }

        // Dynamic scheduling based on day of week
        if (dayOfWeek >= 3 && dayOfWeek <= 6) { // Wednesday to Saturday
            if (displayHour === 6 && displayHour < 7) {
                placeholder = "Morning Class (6:30-7:30)";
                rowClass = "schedule-row prayer-time";
            }
        }

        // Qailulah time (after Fajr until sunrise)
        if (prayerMarkers.Fajr && prayerMarkers.Sunrise) {
            const fajrMinutes = getPrayerMinutes(prayerMarkers.Fajr);
            const sunriseMinutes = getPrayerMinutes(prayerMarkers.Sunrise);
            const currentMinutes = displayHour * 60;

            if (currentMinutes >= fajrMinutes && currentMinutes < sunriseMinutes) {
                if (displayHour === parseInt(prayerMarkers.Fajr.split(':')[0]) ||
                    (displayHour > parseInt(prayerMarkers.Fajr.split(':')[0]) &&
                        displayHour < parseInt(prayerMarkers.Sunrise.split(':')[0]))) {
                    placeholder = "⏰ Qailulah Time (Recommended Duha)";
                    rowClass = "schedule-row prayer-time";
                }
            }
        }

        // Office time (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
            if (displayHour >= 9 && displayHour < 18) {
                placeholder = "Office Hours";
                if (!isPrayerTime) rowClass = "schedule-row";
            }
        }

        // General placeholders
        if (!placeholder) {
            if (displayHour === 5) placeholder = "Wake up & Fajr preparation";
            else if (displayHour === 7) placeholder = "Breakfast & family time";
            else if (displayHour === 8) placeholder = "Commute / Prepare for work";
            else if (displayHour === 12) placeholder = "Lunch break & Dhuhr";
            else if (displayHour === 13) placeholder = "Afternoon work";
            else if (displayHour === 15) placeholder = "Asr break";
            else if (displayHour === 19) placeholder = "Dinner & family time";
            else if (displayHour === 20) placeholder = "Evening activities";
            else if (displayHour === 21) placeholder = "Relaxation & Isha";
            else if (displayHour === 22) placeholder = "Wind down routine";
            else if (displayHour === 23) placeholder = "Sleep preparation";
        }

        // Create row
        const row = document.createElement('div');
        row.className = rowClass;

        const prayerLabel = isPrayerTime ? ` 🕌 ${prayerInfo}` : '';

        // Generate a unique ID for the schedule input based on date and hour
        const scheduleKey = `schedule-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${displayHour}`;

        row.innerHTML = `
            <div class="time-col">${displayTime}</div>
            <div class="task-col">
                <input type="text"
                       id="${scheduleKey}"
                       class="schedule-input"
                       data-key="${scheduleKey}"
                       placeholder="${placeholder}${prayerLabel}"
                       ${isPrayerTime ? 'style="font-weight: 600; color: var(--secondary);"' : ''}
                       onchange="saveScheduleInput('${scheduleKey}', this.value)">
            </div>
        `;
        container.appendChild(row);
    }
    // Restore values after rendering
    loadScheduleInputs();
}

function saveScheduleInput(key, value) {
    const data = JSON.parse(localStorage.getItem('journalSchedule') || '{}');
    data[key] = value;
    localStorage.setItem('journalSchedule', JSON.stringify(data));
}

function loadScheduleInputs() {
    const data = JSON.parse(localStorage.getItem('journalSchedule') || '{}');
    document.querySelectorAll('.schedule-input').forEach(input => {
        const key = input.getAttribute('data-key');
        if (data[key]) {
            input.value = data[key];
        }
    });
}

// Generic Text Input Saver
function setupAutoSave() {
    const ids = ['dailyIntention', 'reflectionLearned', 'reflectionHealth', 'reflectionConnection', 'reflectionGratitude', 'reflectionImprovement'];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // Load
            const saved = localStorage.getItem('journal_' + id);
            if (saved) el.value = saved;

            // Save
            el.addEventListener('input', () => {
                localStorage.setItem('journal_' + id, el.value);
            });
        }
    });
}