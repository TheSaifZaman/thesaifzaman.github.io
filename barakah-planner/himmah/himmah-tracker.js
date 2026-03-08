/* ============================================================
   HIMMAH TRACKER MODULE — High Aspiration Goal Tracker
   "And that there is not for man except that [good] for which he strives." — Qur'an 53:39
   ============================================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'bb-himmah-goals';
    const STREAK_KEY = 'bb-himmah-streak';

    const propheticQuotes = [
        { text: '"Be in this world as though you were a stranger or a traveler."', source: 'Sahih al-Bukhari' },
        { text: '"The strong believer is better and more beloved to Allah than the weak believer, while there is good in both."', source: 'Sahih Muslim' },
        { text: '"Take advantage of five before five: your youth before your old age, your health before your illness, your wealth before your poverty, your free time before your busyness, and your life before your death."', source: 'Shu\'ab al-Iman' },
        { text: '"Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise."', source: 'Sahih Muslim' },
        { text: '"The best of people are those who are most beneficial to people."', source: 'Sahih al-Jami' },
        { text: '"Verily, with hardship comes ease."', source: 'Qur\'an 94:6' },
        { text: '"When you ask, ask Allah. When you seek help, seek help from Allah."', source: 'Jami at-Tirmidhi' },
        { text: '"Tie your camel and then put your trust in Allah."', source: 'Jami at-Tirmidhi' },
        { text: '"Actions are judged by intentions, and everyone will be rewarded according to what he intended."', source: 'Sahih al-Bukhari' },
        { text: '"Do not belittle any good deed, even meeting your brother with a cheerful face."', source: 'Sahih Muslim' },
    ];

    const categoryLabels = {
        ilm: 'Ilm (Knowledge)',
        ibadah: 'Ibadah (Worship)',
        dawah: 'Dawah (Outreach)',
        health: 'Health & Fitness',
        career: 'Career & Skills',
        ummah: 'Serving the Ummah'
    };

    const categoryColors = {
        ilm: '#3b82f6',
        ibadah: '#22c55e',
        dawah: '#a855f7',
        health: '#f59e0b',
        career: '#06b6d4',
        ummah: '#f43f5e'
    };

    function loadGoals() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch { return []; }
    }

    function saveGoals(goals) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    }

    function loadStreak() {
        try {
            return JSON.parse(localStorage.getItem(STREAK_KEY)) || { count: 0, lastDate: null };
        } catch { return { count: 0, lastDate: null }; }
    }

    function saveStreak(streak) {
        localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
    }

    function generateId() {
        return 'hm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function daysRemaining(deadline) {
        if (!deadline) return null;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const target = new Date(deadline);
        target.setHours(0, 0, 0, 0);
        return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    }

    function updateStreak() {
        const streak = loadStreak();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (streak.lastDate === today) return streak;
        if (streak.lastDate === yesterday) {
            streak.count++;
        } else if (streak.lastDate !== today) {
            streak.count = 1;
        }
        streak.lastDate = today;
        saveStreak(streak);
        return streak;
    }

    function renderHadith() {
        const el = document.getElementById('himmahHadith');
        if (!el) return;
        const q = propheticQuotes[Math.floor(Math.random() * propheticQuotes.length)];
        el.innerHTML = `<p class="hadith-text">${q.text}</p><span class="hadith-source">— ${q.source}</span>`;
    }

    function createGoalCard(goal) {
        const progress = goal.totalMilestones > 0
            ? Math.round((goal.completedMilestones / goal.totalMilestones) * 100)
            : 0;
        const remaining = daysRemaining(goal.deadline);
        const color = categoryColors[goal.category] || '#888';
        const isOverdue = remaining !== null && remaining < 0;

        const card = document.createElement('div');
        card.className = 'himmah-goal-card';
        card.dataset.goalId = goal.id;
        card.dataset.category = goal.category;

        card.innerHTML = `
            <div class="himmah-goal-header">
                <div class="himmah-goal-badge" style="background:${color}20;color:${color}">${categoryLabels[goal.category] || goal.category}</div>
                <div class="himmah-goal-priority priority-${goal.priority}">${goal.priority}</div>
            </div>
            <h3 class="himmah-goal-title">${escapeHtml(goal.title)}</h3>
            ${goal.why ? `<p class="himmah-goal-why">${escapeHtml(goal.why)}</p>` : ''}
            <div class="himmah-progress-bar">
                <div class="himmah-progress-fill" style="width:${progress}%;background:${color}"></div>
            </div>
            <div class="himmah-progress-info">
                <span>${goal.completedMilestones}/${goal.totalMilestones} milestones (${progress}%)</span>
                ${remaining !== null ? `<span class="${isOverdue ? 'overdue' : ''}">${isOverdue ? Math.abs(remaining) + 'd overdue' : remaining + 'd left'}</span>` : ''}
            </div>
            <div class="himmah-milestone-grid" id="milestones-${goal.id}">
                ${renderMilestoneCircles(goal)}
            </div>
            ${goal.dua ? `<div class="himmah-goal-dua"><em>${escapeHtml(goal.dua)}</em></div>` : ''}
            <div class="himmah-goal-actions">
                <button class="btn-sm himmah-btn-note" data-id="${goal.id}" title="Add note">Notes</button>
                ${progress >= 100 ? `<button class="btn-sm himmah-btn-complete" data-id="${goal.id}">Mark Complete</button>` : ''}
                <button class="btn-sm btn-danger himmah-btn-delete" data-id="${goal.id}">Delete</button>
            </div>
            <div class="himmah-notes-area" id="notes-${goal.id}" style="display:none;">
                <textarea class="field-textarea himmah-note-input" id="note-input-${goal.id}" rows="2" placeholder="Add a reflection or update..."></textarea>
                <button class="btn-sm himmah-btn-save-note" data-id="${goal.id}">Save Note</button>
                <div class="himmah-notes-list" id="notes-list-${goal.id}">
                    ${(goal.notes || []).map(n => `<div class="himmah-note-item"><span class="note-date">${formatDate(n.date)}</span><p>${escapeHtml(n.text)}</p></div>`).join('')}
                </div>
            </div>
        `;

        return card;
    }

    function renderMilestoneCircles(goal) {
        let html = '';
        for (let i = 0; i < goal.totalMilestones; i++) {
            const done = i < goal.completedMilestones;
            const color = categoryColors[goal.category] || '#888';
            html += `<span class="himmah-milestone ${done ? 'done' : ''}" data-goal-id="${goal.id}" data-index="${i}" style="${done ? 'background:' + color + ';border-color:' + color : 'border-color:' + color + '40'}" title="Milestone ${i + 1}">${i + 1}</span>`;
        }
        return html;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderGoals() {
        const goals = loadGoals();
        const activeList = document.getElementById('himmahGoalsList');
        const completedList = document.getElementById('himmahCompletedList');
        if (!activeList || !completedList) return;

        const activeCat = document.querySelector('.himmah-cat-btn.active');
        const filter = activeCat ? activeCat.dataset.cat : 'all';

        const activeGoals = goals.filter(g => !g.completed);
        const completedGoals = goals.filter(g => g.completed);

        const filteredActive = filter === 'all' ? activeGoals : activeGoals.filter(g => g.category === filter);
        const filteredCompleted = filter === 'all' ? completedGoals : completedGoals.filter(g => g.category === filter);

        if (filteredActive.length === 0) {
            activeList.innerHTML = '<p class="himmah-empty">No active goals in this category. Set your aspirations above!</p>';
        } else {
            activeList.innerHTML = '';
            filteredActive.forEach(g => activeList.appendChild(createGoalCard(g)));
        }

        if (filteredCompleted.length === 0) {
            completedList.innerHTML = '<p class="himmah-empty">Goals you complete will appear here. Keep striving!</p>';
        } else {
            completedList.innerHTML = '';
            filteredCompleted.forEach(g => {
                const card = createGoalCard(g);
                card.classList.add('completed');
                completedList.appendChild(card);
            });
        }

        updateStats(goals);
    }

    function updateStats(goals) {
        const active = goals.filter(g => !g.completed);
        const completed = goals.filter(g => g.completed);
        const streak = loadStreak();

        const avgProgress = active.length > 0
            ? Math.round(active.reduce((sum, g) => sum + (g.totalMilestones > 0 ? (g.completedMilestones / g.totalMilestones) * 100 : 0), 0) / active.length)
            : 0;

        const el = (id) => document.getElementById(id);
        if (el('himmahActiveCount')) el('himmahActiveCount').textContent = active.length;
        if (el('himmahCompletedCount')) el('himmahCompletedCount').textContent = completed.length;
        if (el('himmahStreakCount')) el('himmahStreakCount').textContent = streak.count;
        if (el('himmahAvgProgress')) el('himmahAvgProgress').textContent = avgProgress + '%';
    }

    function addGoal() {
        const title = document.getElementById('himmahGoalTitle');
        const category = document.getElementById('himmahGoalCategory');
        const priority = document.getElementById('himmahGoalPriority');
        const why = document.getElementById('himmahGoalWhy');
        const deadline = document.getElementById('himmahGoalDeadline');
        const milestones = document.getElementById('himmahGoalMilestones');
        const dua = document.getElementById('himmahGoalDua');

        if (!title || !title.value.trim()) {
            title && title.focus();
            return;
        }

        const goals = loadGoals();
        goals.push({
            id: generateId(),
            title: title.value.trim(),
            category: category ? category.value : 'ilm',
            priority: priority ? priority.value : 'medium',
            why: why ? why.value.trim() : '',
            deadline: deadline ? deadline.value : '',
            totalMilestones: milestones ? parseInt(milestones.value) || 10 : 10,
            completedMilestones: 0,
            dua: dua ? dua.value.trim() : '',
            notes: [],
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null
        });
        saveGoals(goals);

        // Reset form
        title.value = '';
        if (why) why.value = '';
        if (deadline) deadline.value = '';
        if (milestones) milestones.value = '10';
        if (dua) dua.value = '';

        renderGoals();
        updateStreak();
    }

    function toggleMilestone(goalId, index) {
        const goals = loadGoals();
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        const idx = parseInt(index);
        if (idx < goal.completedMilestones) {
            goal.completedMilestones = idx;
        } else {
            goal.completedMilestones = idx + 1;
        }

        saveGoals(goals);
        renderGoals();
        updateStreak();
    }

    function completeGoal(goalId) {
        const goals = loadGoals();
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;
        goal.completed = true;
        goal.completedAt = new Date().toISOString();
        goal.completedMilestones = goal.totalMilestones;
        saveGoals(goals);
        renderGoals();
    }

    function deleteGoal(goalId) {
        if (!confirm('Are you sure you want to delete this goal?')) return;
        const goals = loadGoals().filter(g => g.id !== goalId);
        saveGoals(goals);
        renderGoals();
    }

    function toggleNotes(goalId) {
        const area = document.getElementById('notes-' + goalId);
        if (!area) return;
        area.style.display = area.style.display === 'none' ? 'block' : 'none';
    }

    function saveNote(goalId) {
        const input = document.getElementById('note-input-' + goalId);
        if (!input || !input.value.trim()) return;

        const goals = loadGoals();
        const goal = goals.find(g => g.id === goalId);
        if (!goal) return;

        if (!goal.notes) goal.notes = [];
        goal.notes.unshift({
            date: new Date().toISOString().split('T')[0],
            text: input.value.trim()
        });

        saveGoals(goals);
        input.value = '';
        renderGoals();
        // Re-open notes area after render
        const area = document.getElementById('notes-' + goalId);
        if (area) area.style.display = 'block';
    }

    // Event delegation
    function initEvents() {
        const addBtn = document.getElementById('himmahAddGoal');
        if (addBtn) addBtn.addEventListener('click', addGoal);

        // Category filter
        const catBtns = document.querySelectorAll('.himmah-cat-btn');
        catBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderGoals();
            });
        });

        // Delegate clicks on goals list and completed list
        ['himmahGoalsList', 'himmahCompletedList'].forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.addEventListener('click', (e) => {
                const target = e.target;

                // Milestone circle click
                if (target.classList.contains('himmah-milestone')) {
                    toggleMilestone(target.dataset.goalId, target.dataset.index);
                    return;
                }

                // Complete button
                if (target.classList.contains('himmah-btn-complete')) {
                    completeGoal(target.dataset.id);
                    return;
                }

                // Delete button
                if (target.classList.contains('himmah-btn-delete')) {
                    deleteGoal(target.dataset.id);
                    return;
                }

                // Notes toggle
                if (target.classList.contains('himmah-btn-note')) {
                    toggleNotes(target.dataset.id);
                    return;
                }

                // Save note
                if (target.classList.contains('himmah-btn-save-note')) {
                    saveNote(target.dataset.id);
                    return;
                }
            });
        });

        // Enter key on title input
        const titleInput = document.getElementById('himmahGoalTitle');
        if (titleInput) {
            titleInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addGoal();
                }
            });
        }
    }

    // Initialize when page becomes visible
    function initHimmahTracker() {
        renderHadith();
        renderGoals();
        initEvents();
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHimmahTracker);
    } else {
        initHimmahTracker();
    }

    // Expose for external calls if needed
    window.initHimmahTracker = initHimmahTracker;
})();
